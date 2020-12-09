<template>
  <div>
    <!--1为编辑状态，0为添加状态 -->
    <div v-if="stat == 1">
      <el-form ref="form" label-width="100px">
        <el-form-item label="名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="状态：" required>
          <el-select v-model="form.status" placeholder="全部">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="liveEdit">立即修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp">
      <el-form ref="form" label-width="110px">
        <el-form-item label="名称" :label-width="formLabelWidth" required>
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nameAdd">立即添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { liveEdit, liveDetails, liveAdd } from "@/api/live";
import { qiniuToken } from "@/api/Qiniuyun";
export default {
  name: "LiveDetails",
  props: ["editId", "stat"],
  data() {
    return {
      form: {},
      addForm: {
        name: "",
      },
      typeList: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "停用",
          value: 2,
        },
      ], // 类型列表的下拉
      formLabelWidth: "120px",
    };
  },
  mounted() {
    console.log(this.editId);
  },
  created() {
    this.info();
  },
  methods: {
    
    info() {
      liveDetails(this).then((res) => {
        this.form = res.data;
      });
    },
    //修改用户信息
    liveEdit() {
      liveEdit(this).then((res) => {
        this.$emit("close"); //修改后关闭编辑框
        this.$emit("live"); //修改后重新请求列表
      });
    },
    // 添加
    nameAdd() {
      if (this.addForm.name.length == 0) {
        this.$message({
          type: "info",
          message: "名称不能为空",
        });
      } else {
        liveAdd(this).then((res) => {
          //   清空添加框
          this.addForm = {
            name: "",
          };
          this.$emit("close"); //添加后关闭添加框
          this.$emit("live"); //添加后重新请求列表
        });
      }
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/dialog.css");
</style>
