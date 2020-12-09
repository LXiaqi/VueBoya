<template>
  <div class="warp_box">
    <!-- 1为编辑状态，0为添加状态 -->
    <div v-if="pop == 1">
      <el-form ref="form" label-width="100px">
         <el-form-item label="图标：" required>
          <el-upload
            class="avatar-uploader"
            :action="api + '?token=' + upToken"
            :show-file-list="false"
            :on-success="handleAvatarSuccessEdit"
          >
            <img v-if="form.thumb" :src="form.thumb" class="upimg" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议尺寸： 200 X 200</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：" class="form_item item_width" required>
          <el-radio-group v-model="form.type">
            <el-radio label="1">福利</el-radio>
            <el-radio label="2">豪华</el-radio>
            <el-radio label="3">梦幻</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="累充领取：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="form.need_coin"></el-input>
        </el-form-item>
        <el-form-item label="状态：" class="form_item item_width" required>
          <el-radio-group v-model="form.status">
            <el-radio label="0">下架</el-radio>
            <el-radio label="1">上架</el-radio>
          </el-radio-group>
        </el-form-item>
       
        <el-form-item label="动画类型：" class="form_item item_width" required>
          <el-radio-group v-model="form.swf_type">
            <el-radio label="1">SVGA</el-radio>
            <el-radio label="2">GIF</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片：" required>
          <el-upload
            class="avatar-uploader"
            :action="api + '?token=' + upToken"
            :show-file-list="false"
            :on-success="handleAvatarSvgaEdit"
          >
            <img v-if="form.swf" :src="form.swf" class="upimg" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议尺寸： 200 X 200</div>

          </el-upload>
        </el-form-item>
        
        <el-form-item label="动画时长：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="form.swf_time"></el-input>
          <p class="notice">秒 精度：小数点后两位</p>
        </el-form-item>
        <el-form-item label="进场话术：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="form.words"></el-input>
          <p class="notice">注：实际效果为 用户昵称+进场话术</p>
        </el-form-item>
        <el-form-item label="生效时长：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="form.expire"> </el-input>
          <p class="notice">注：单位天 0代表永久</p>
        </el-form-item>
        <el-form-item class="form_btn">
          <el-button class="dialog_ipt" type="primary" @click="editUser()"
            >编辑</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp_box">
      <el-form ref="form" label-width="100px">
        <el-form-item label="图标：" required>
          <el-upload
            class="avatar-uploader"
            :action="api + '?token=' + upToken"
            :show-file-list="false"
            :on-success="handleAvatarSuccessAdd"
          >
            <img v-if="addForm.thumb" :src="addForm.thumb" class="upimg" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议尺寸： 200 X 200</div>

          </el-upload>
        </el-form-item>
        <el-form-item label="名称：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：" class="form_item item_width" required>
          <el-radio-group v-model="addForm.type">
            <el-radio label="1">福利</el-radio>
            <el-radio label="2">豪华</el-radio>
            <el-radio label="3">梦幻</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="累充领取：" class="form_item" required>
          <el-input
            class="dialog_ipt"
            v-model="addForm.need_coin"
            required
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态：" class="form_item item_width" required>
          <el-radio-group v-model="addForm.status">
            <el-radio label="0">下架</el-radio>
            <el-radio label="1">上架</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <div>
          <el-form-item label="动画类型：" class="form_item item_width" required>
          <el-radio-group v-model="addForm.swf_type">
            <el-radio label="1">SVGA</el-radio>
            <el-radio label="2">GIF</el-radio>
          </el-radio-group>
        </el-form-item>

        </div>
       
        <el-form-item label="图片：" required>
          <el-upload
            class="avatar-uploader"
            :action="api + '?token=' + upToken"
            :show-file-list="false"
            :on-success="handleAvatarSvgaAdd"
          >
            <img v-if="addForm.swf" :src="addForm.swf" class="upimg" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">建议尺寸： 200 X 200</div>

          </el-upload>
        </el-form-item>
        
        <el-form-item label="动画时长：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="addForm.swf_time"></el-input>
          <p class="notice">秒 精度：小数点后两位</p>
        </el-form-item>
        <el-form-item label="进场话术：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="addForm.words"></el-input>
          <p class="notice">注：实际效果为 用户昵称+进场话术</p>
        </el-form-item>
        <el-form-item label="生效时长：" class="form_item" required>
          <el-input class="dialog_ipt" v-model="addForm.expire"> </el-input>
          <p class="notice">注：单位天 0代表永久</p>
        </el-form-item>
        <el-form-item class="form_btn">
          <el-button class="dialog_ipt" type="primary" @click="addMount()"
            >立即添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mountEdit, mountDetails, mountAdd } from "@/api/shop";
import { qiniuToken } from "@/api/Qiniuyun";
import untilsTime from "@/utils/Datetime";
export default {
  name: "MountDetails",
  props: ["editid", "pop"],
  data() {
    return {
      form: {},
      thumbEdit: "", //编辑图标上传
      thumbAdd: "", //添加图标上传
      thumSvgEdit: "",//编辑图片上传
      thumSvgAdd:"",//添加图片上传
      api: "", //图片上传地址前缀
      upToken: "", //七牛云token
      addForm: {
        name: "",
        type: "",
        thumb: "",
        need_coin: "",
        swf_type: "",
        swf: "",
        status: "",
        words: "",
        expire: "",
      },
    };
  },
  mounted() {
    console.log(this.editid);
  },

  created() {
    this.info();
  },
  methods: {
    info() {
      if (this.pop == 1) {
        mountDetails(this).then((res) => {
          res.data.type = res.data.type.toString();
          res.data.swf_type = res.data.swf_type.toString();
          res.data.status = res.data.status.toString();
          res.data.addtime = untilsTime.formateDate(res.data.addtime);
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
    editUser() {
      this.form.thumb = this.thumbEdit;
      this.form.swf = this.thumSvgEdit;
      mountEdit(this).then((res) => {
        this.$emit("func");
      });
    },
    //添加
    addMount() {
      this.addForm.thumb = this.thumbAdd;
      this.addForm.swf = this.thumSvgAdd;
      mountAdd(this).then((res) => {
        //清空添加框
        this.addForm = {
          name: "",
          type: "",
          thumb: "",
          need_coin: "",
          swft_ype: "",
          swf: "",
          status: "",
          words: "",
          expire: "",
        };
        this.$emit("func"); //添加后关闭添加框
        this.$emit("mount"); //添加后重新请求列表
      });
    },

    handleAvatarSvgaEdit(res, file) {
      this.thumSvgEdit = res.key;
      this.form.swf = URL.createObjectURL(file.raw);
    },
    handleAvatarSvgaAdd(res, file) {
      this.thumSvgAdd = res.key;
      this.addForm.swf = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccessEdit(res, file) {
      this.thumbEdit = res.key;
      this.form.thumb = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccessAdd(res, file) {
      this.thumbAdd = res.key;
      this.addForm.thumb = URL.createObjectURL(file.raw);
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/dialog.css");
.upimg {
  width: 100px;
  height: 100px;
}
.notice {
  color: red;
  margin: 0;
  line-height: 25px;
}
.warp_box /deep/ .el-form-item .el-input__inner {
  width: 320px;
}
</style>
