<template>
  <div class="login">
    <div class="container">
      <div class="title">seec3后台管理系统</div>
      <el-form class="form" :model="form" :rules="rules">
        <el-form-item prop="user">
          <el-input
            type="text"
            v-model="form.user"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            type="password"
            v-model="form.pwd"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newsubmitfn">登录</el-button>
        </el-form-item>
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import instance from "@/request/api";
export default {
  name: "mylogin",
  data() {
    let checkUser = (rule, value, callback) => {
      let reg = /^\w{5,10}$/;
      if (!value) return callback(new Error("用户名不能为空"));
      if (!reg.test(value))
        return callback(new Error("请输入6-10个字符,不能包含特殊符号"));
      callback();
    };
    let checkPwd = (rule, value, callback) => {
      let reg = /^\w{6,10}$/;
      if (!value) return callback(new Error("用户名不能为空"));
      if (!reg.test(value))
        return callback(new Error("请输入6-10个字符,不能包含特殊符号"));
      callback();
    };
    return {
      form: {
        user: "",
        pwd: "",
      },
      rules: {
        user: [{ validator: checkUser, trigger: "blur" }],
        pwd: [{ validator: checkPwd, trigger: "blur" }],
      },
      submitfn: null,
    };
  },
  created() {
    this.submitfn = this.debouncefn(this.fnlogin, 1000);
  },
  methods: {
    newsubmitfn(){
      this.submitfn()
    },
    async fnlogin() {
      let user = this.form.user;
      let pwd = this.form.pwd;
      let { data } = await instance.post("/login", { user, pwd });
      if (data.message === "fail") return this.$message.error("登录失败");
      if (data.message === "success") {
        localStorage.setItem("token", data.data.token);
        return this.$message({
          type: "success",
          message: "登录成功",
          duration: 1000,
          onClose: () => {
            this.$router.push({ path: "homeindex" });
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #324057;
}
.container {
  width: 375px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.container .title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 34px;
  color: #fff;
}
.container .el-form {
  background: #fff;
  padding: 25px;
  border-radius: 4px;
  padding-bottom: 10px;
}
.container .el-form .el-button {
  width: 100%;
}
.container .el-form .tip {
  font-size: 12px;
  color: red;
  text-align: center;
}
</style>