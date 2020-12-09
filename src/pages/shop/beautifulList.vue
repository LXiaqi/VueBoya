<template>
  <div class="warp">
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>靓号管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出售中" name="nosell">
          <Nosell v-if="activeName=='nosell'"></Nosell>
        </el-tab-pane>
        <el-tab-pane label="已出售" name="sell">
          <Sell v-if="activeName=='sell'"></Sell>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
  </div>
</template>
<script>
import Sell from "@/components/beautyno/sell"
import Nosell from "@/components/beautyno/nosell"

export default {
  props: [],
  components: {
    
    Sell,
    Nosell,
    

  },
  data() {
    return {
      activeName: 'nosell',
     
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