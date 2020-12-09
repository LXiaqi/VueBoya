<template>
  <div class="warp">
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>等级管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="财富等级" name="wealth">
          <WealthGrade v-if="activeName=='wealth'"></WealthGrade>
        </el-tab-pane>
        <el-tab-pane label="魅力等级" name="charm">
          <CharmGrade v-if="activeName=='charm'"></CharmGrade>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
  </div>
</template>
<script>
import WealthGrade from "@/components/grade/wealthGrade"
import CharmGrade from "@/components/grade/CharmGrade"

export default {
  props: [],
  components: {
    
    WealthGrade,
    CharmGrade

  },
  data() {
    return {
      activeName: 'wealth',
     
    };
  },
  methods: {
      handleClick(){
      },
   
  },
 


  computed: {},
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
</style>