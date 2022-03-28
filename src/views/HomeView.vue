<template>
  <div class="home">
    <el-container>
      <el-aside class="aside">
        <el-menu
          background-color="rgb(50, 64, 87)"
          text-color="#bfcbd9"
          default-active="homeindex"
          router
        >
          <el-menu-item index="homeindex">
            <i class="el-icon-menu"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document-remove"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="2-1"> 用户列表 </el-menu-item>
            <el-menu-item index="2-2"> 商家列表 </el-menu-item>
            <el-menu-item index="2-3"> 食品列表 </el-menu-item>
            <el-menu-item index="2-4"> 订单列表 </el-menu-item>
            <el-menu-item index="2-5"> 管理员列表 </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>添加数据</span>
            </template>
            <el-menu-item index="3-1"> 添加用户 </el-menu-item>
            <el-menu-item index="3-2"> 添加商品 </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>图标</span>
            </template>
            <el-menu-item index="4-1"> 用户分布 </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>编辑</span>
            </template>
            <el-menu-item index="5-1"> 文本编辑 </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="6-1"> 管理员设置 </el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span>说明</span>
            </template>
            <el-menu-item index="7-1"> 说明 </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(item, index) in this.$route.meta"
                :key="index"
                >{{ item }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <div>
            <el-dropdown>
              <el-avatar :size="40">
                <img src="@/assets/logo.png" />
              </el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
.el-menu {
  height: 100vh;
}
.main {
  height: calc(100vh - 60px);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eff2f7;
}
</style>
