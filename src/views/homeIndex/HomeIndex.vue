<template>
  <div>
    <el-table :data="arrs">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="text" label="文本"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 增加按钮 -->
    <el-button type="primary" class="addbtn" @click="addfn(1)"
      >增加用户</el-button
    >
    <!-- 弹窗 -->
    <el-dialog
      :title="i == 1 ? '添加用户' : '编辑'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文本" :label-width="formLabelWidth">
          <el-input v-model="form.text" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="fnsure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import instance from "@/request/api";
export default {
  name: "homeIndex",
  data() {
    return {
      arrs: null,
      debounceedit: null,
      debouncedelete: null,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        id: 0,
        name: "张三",
        text: "吴谢可击",
      },
      i: 0, //是不是添加业务还是修改业务
    };
  },
  methods: {
    // 添加
    addfn(i) {
      console.log(i);
      this.i = i;
      this.form.name = "";
      this.form.text = "";
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 编辑行为
    fnsure() {
      this.dialogFormVisible = false;
      if (this.i === 1) return this.handleAdd(); //添加业务
      this.editHomeIndex(); //修改业务
    },
    // 获取
    async getHomeIndex() {
      let { data } = await instance.get("/homeindex");
      this.arrs = data;
      console.log(data);
    },
    async handleAdd() {
      // 添加业务
      let name = this.form.name;
      let text = this.form.text;
      let { data } = await instance.post("/homeindex", { name, text });
      console.log(data);
      this.getHomeIndex();
    },

    handleEdit(index, row) {
      console.log(index, row);
      // 用户行为
      this.i = 0;
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form.name = row.name;
      this.form.text = row.text;
      this.form.id = row.id;
    },
    handleDelete(index, row) {
      console.log(index, row);

      // 用户行为
      this.$confirm("您确定删除该条信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 您删除了
          console.log("删除了");
          this.deleteHomeIndex(index);
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {
          console.log("你取消了");
        });
    },
    // 删除业务
    async deleteHomeIndex(index) {
      let { data } = await instance.delete("/homeindex/" + index);
      this.getHomeIndex();
      console.log(data);
    },
    // 编辑业务
    async editHomeIndex() {
      let name = this.form.name;
      let text = this.form.text;
      let id = this.form.id;
      let { data } = await instance.put("/homeindex/edit/" + id, {
        name,
        text,
      });
      console.log(data);
      this.getHomeIndex();
    },
  },
  created() {
    this.getHomeIndex();
  },
};
</script>

<style>
</style>