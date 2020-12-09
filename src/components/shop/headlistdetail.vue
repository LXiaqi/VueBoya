<template>
  <div class="warp">
    <!-- stat == 1为编辑 -->
    <div v-if="stat == 1">
      <el-form ref="form" label-width="110px">
        <el-form-item label="名称：" required>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类型：" class="form_item item_width" required>
          <el-radio-group v-model="form.type">
            <el-radio label="1">活动</el-radio>
            <el-radio label="2">豪华</el-radio>
            <el-radio label="3">梦幻</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="丫币：" required>
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="图标：" required>
          <el-upload
            class="avatar-uploader"
            :action="api + '?token=' + upToken"
            :show-file-list="false"
            :on-success="handleAvatarSuccessEdit"
          >
            <img v-if="form.pic" :src="form.pic" class="avatarImg" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="生效时长：" required>
          <el-input v-model="form.overdue"></el-input>
          <p class="notice">注:单位天 0代表永久</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="headEdit">编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp">
      <el-form ref="form" label-width="110px">
        <el-form-item label="名称：" required>
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="类型：" class="form_item item_width" required>
          <el-radio-group v-model="addForm.type">
            <el-radio label="1">活动</el-radio>
            <el-radio label="2">豪华</el-radio>
            <el-radio label="3">梦幻</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="丫币：" required>
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="图标：" required>
          <el-upload
            class="avatar-uploader"
            :action="api + '?token=' + upToken"
            :show-file-list="false"
            :on-success="handleAvatarSuccessAdd"
          >
            <img v-if="addForm.pic" :src="addForm.pic" class="avatarImg" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="生效时长：" required>
          <el-input v-model="addForm.overdue"></el-input>
          <p class="notice">注:单位天 0代表永久</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="headlistAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { headEdit, headAdd, headDetails } from "@/api/shop";
import { qiniuToken } from "@/api/Qiniuyun";
export default {
  name: "headListDetail",
  props: ["editid", "stat"],
  data() {
    return {
      form: {},
      picEdit: "", //编辑图片上传
      picAdd: "", //添加图片上传
      api: "", //图片上传地址前缀
      upToken: "", //七牛云token
      addForm: {
        title: "",
        type: "",
        price: "",
        pic: "",
        overdue: "",
      },
    };
  },
  mounted() {
    console.log(this.editid);
  },
  watch: {
    editid: function (val) {
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
      if (this.stat == 1) {
        headDetails(this).then((res) => {
          res.data.type = res.data.type.toString();
          this.form = res.data;
        });
      }

      // 获取七牛云token
      qiniuToken(this).then((res) => {
        console.log(res);
        this.upToken = res.data.token;
        this.api = res.data.up_host;
      });
    },
    //修改用户信息
    headEdit() {
      this.form.pic = this.picEdit;
      headEdit(this).then((res) => {
        this.$emit("func"); //修改后关闭编辑框
        this.$emit("head"); //修改后重新请求列表
      });
    },
    // 添加
    headlistAdd() {
      this.addForm.pic = this.picAdd;
      headAdd(this).then((res) => {
        //   清空添加框
        (this.addForm = {
          title: "",
          type: "",
          price: "",
          pic: "",
          overdue: "",
        }),
          this.$emit("func"); //添加后关闭添加框
        this.$emit("head"); //添加后重新请求列表
      });
    },
    handleAvatarSuccessEdit(res, file) {
      this.picEdit = res.key;
      this.form.pic = URL.createObjectURL(file.raw);
    },

    handleAvatarSuccessAdd(res, file) {
      this.picAdd = res.key;
      this.addForm.pic = URL.createObjectURL(file.raw);
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/dialog.css");
.avatarImg {
  width: 80px;
  /* height: 80px; */
  margin-top: 5px;
  border-radius: 50%;
}
.notice {
  color: red;
  margin: 0;
  line-height: 25px;

}
</style>
