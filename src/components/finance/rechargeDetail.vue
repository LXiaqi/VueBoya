<template>
  <div>
    <div v-if="stat == 1">
      <el-form ref="form" label-width="100px">
        <el-form-item label="名称：" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="安卓价格：" required>
          <el-input v-model="form.money"></el-input>
        </el-form-item>

        <el-form-item label="苹果价格：" required>
          <el-input v-model="form.money_ios"></el-input>
        </el-form-item>
        <el-form-item label="安卓丫币：" required>
          <el-input v-model="form.coin"></el-input>
        </el-form-item>
        <el-form-item label="苹果丫币：" required>
          <el-input v-model="form.coin_ios"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="rechargeEdit">立即修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp">
      <el-form ref="form" label-width="100px">
        <el-form-item label="名称：" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="安卓价格：" required>
          <el-input v-model="addForm.money"></el-input>
        </el-form-item>
        <el-form-item label="苹果价格：" required>
          <el-input v-model="addForm.money_ios"></el-input>
        </el-form-item>
        <el-form-item label="安卓丫币：" required>
          <el-input v-model="addForm.coin"></el-input>
        </el-form-item>
        <el-form-item label="苹果丫币：" required>
          <el-input v-model="addForm.coin_ios"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="rechargeAdd">立即添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { rechargeEdit, rechargeDetails, rechargeAdd } from "@/api/finance";

export default {
  name: "RechargeDetail",
  props: ["editId", "stat"],
  data() {
    return {
      form: {},
      addForm: {
        name: "",
        money: "",
        money_ios: "",
        coin: "",
        coin_ios: "",
      },
    };
  },
  mounted() {
    console.log(this.editId);
  },
  watch: {
    editId: function (val) {
      console.log(val);
      if (val != "") {
        this.info();
      }
    },
  },
  created() {
    this.info();
  },
  methods: {
    info() {
      rechargeDetails(this).then((res) => {
        this.form = res.data;
      });
    },
    //修改用户信息
    rechargeEdit() {
      rechargeEdit(this).then((res) => {
        this.$emit("close"); //修改后关闭编辑框
        this.$emit("recharge"); //修改后重新请求列表
      });
    },
    // 添加
    rechargeAdd() {
      rechargeAdd(this).then((res) => {
        //   清空添加框
        this.addForm = {
          name: "",
          money: "",
          money_ios: "",
          coin: "",
          coin_ios: "",
        };
        this.$emit("close"); //添加后关闭添加框
        this.$emit("recharge"); //添加后重新请求列表
      });
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/dialog.css");
</style>
