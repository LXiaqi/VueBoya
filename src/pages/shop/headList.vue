<template>
  <div class="warp">
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>头像管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="头像列表" name="headlist">
          <HeadList v-if="activeName == 'headlist'"></HeadList>
        </el-tab-pane>
        <el-tab-pane label="用户头像列表" name="userheadlist">
          <UserHeadList v-if="activeName == 'userheadlist'"></UserHeadList>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import HeadList from "@/components/shop/HeadList";
import UserHeadList from "@/components/shop/UserHeadList";

export default {
  props: [],
  components: {
    HeadList,
    UserHeadList,
  },
  data() {
    return {
      activeName: "headlist",
    };
  },
  methods: {
    handleClick() {},
  },

  computed: {},
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
</style>