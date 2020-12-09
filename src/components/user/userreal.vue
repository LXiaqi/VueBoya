<template>
  <div class="warp_box">
    <el-form ref="form" label-width="100px">
      <el-form-item label="用户昵称：" class="form_item item_width">
        <span>{{ form.nickname }}</span>
      </el-form-item>
      <el-form-item label="真实姓名：" class="form_item item_width">
        <span>{{ form.real_name }}</span>
      </el-form-item>
      <el-form-item label="身份证号：" class="form_item item_width">
        <span>{{ form.car_no }}</span>
      </el-form-item>
      <el-form-item label="申请时间：" class="form_item item_width">
        <span>{{ form.addtime }}</span>
      </el-form-item>
      <el-form-item label="正面照：" class="form_item item_width">
        <img class="img" v-image-preview :src="form.front_view" alt="" />
      </el-form-item>
      <el-form-item label="反面照：" class="form_item item_width">
        <img class="img" v-image-preview :src="form.back_view" alt="" />
      </el-form-item>
      <el-form-item label="手持照：" class="form_item item_width">
        <img class="img" v-image-preview :src="form.handset_view" alt="" />
      </el-form-item>
      <div>
     
      <el-form-item label="状态：" class="form_item item_width" required>
        <el-radio-group v-model="form.status">
          <el-radio label="1">未审核</el-radio>
          <el-radio label="2">审核通过</el-radio>
          <el-radio label="3">审核未通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="理由：" class="form_item item_width" required>
        <el-input class="dialog_ipt" v-model="form.reason"></el-input>
      </el-form-item>
       </div>
      <el-form-item label="操作时间：" class="form_item item_width">
        <span>{{ form.uptime }}</span>
      </el-form-item>
      <el-form-item label="操作人：" class="form_item item_width">
        <span>{{ form.operator }}</span>
      </el-form-item>
      <el-form-item class="form_btn">
        <el-button class="dialog_ipt" type="primary" @click="editUser()"
          >确定修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userRealDetails, userRealEdit, userRealList } from "@/api/user";
import { qiniuToken } from "@/api/Qiniuyun";
import untilsTime from "@/utils/Datetime";
export default {
  name: "userRealDetails",
  props: ["editid"],
  data() {
    return {
      form: {},
    };
  },
  mounted() {},
  created() {
    this.info();
  },
  methods: {
    info() {
      userRealDetails(this).then((res) => {
        res.data.status = res.data.status.toString();
        res.data.uptime = untilsTime.formateDate(res.data.uptime);
        res.data.addtime = untilsTime.formateDate(res.data.addtime);
        this.form = res.data;
      });
    },

    //修改用户信息
    editUser() {
      if (this.form.reason.length == "" || this.form.reason.length == 0) {
        this.$confirm("请输入理由", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        userRealEdit(this).then((res) => {
          this.$emit("func");
        });
      }
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/dialog.css");
.img {
  width: 200px;
  height: 100px;
}
.box /deep/ .el-dialog{
  border-radius:20px;
}
.warp_box /deep/ .el-form-item .el-input__inner {
  width: 320px;
}
.vue-directive-image-previewer-img{
  width: 500px;
  height: 400px;
}
</style>
