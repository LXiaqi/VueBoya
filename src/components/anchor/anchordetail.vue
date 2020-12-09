<template>
  <div>
    <div v-if="stat == 1">
      
      <el-form ref="form" label-width="100px">
        <el-form-item label="图标：">
          
          <el-upload class="avatar-uploader" :action="api+'?token='+upToken" :show-file-list="false" :on-success="handleAvatarSuccessEdit">
                <img v-if="form.icon" :src="form.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        
        <el-form-item label="标签描述：">
          <el-input v-model="form.auth_desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="anchorEdit" 
            >立即修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp">
        <el-form ref="form" label-width="100px">
          <el-form-item label="图标：">
            <el-upload class="avatar-uploader" :action="api+'?token='+upToken" :show-file-list="false" :on-success="handleAvatarSuccessAdd">
                <img v-if="addForm.icon" :src="addForm.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称：">
            <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
            <el-input v-model="addForm.desc"></el-input>
        </el-form-item>
        
        <el-form-item label="标签描述：">
            <el-input v-model="addForm.auth_desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="anchorAdd">立即添加</el-button>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import { anchorEdit, anchordetails, anchorAdd } from "@/api/anchor";
import {
    qiniuToken
} from '@/api/Qiniuyun'
export default {
  name: "AnchorDetails",
  props: ["editId", "stat"],
  data() {
    return {
      form: {},
      iconEdit: '', //编辑图片上传
      iconAdd:"",   //添加图片上传
      api:"",   //图片上传地址前缀
      upToken:"", //七牛云token
      addForm:{
          name:"",
          desc:"",
          icon:'',
          auth_desc:""
      }
    };
  },
  mounted() {
    console.log(this.editId);
  },
  watch: {
        editId: function (val) {
            console.log(val)
            if (val != '') {
                this.info();
            }
        }
    },
  created() {
    this.info();
  },
  methods: {
    info() {
      anchordetails(this).then((res) => {
        this.form = res.data;
      });
      // 获取七牛云token
            qiniuToken(this).then(res => {
                console.log(res);
                this.upToken = res.data.token;
                this.api = res.data.up_host;
            })
    },
    //修改用户信息
    anchorEdit() {
      this.form.icon = this.iconEdit
      anchorEdit(this).then((res) => { 
        this.$emit('close')  //修改后关闭编辑框
        this.$emit('anchor') //修改后重新请求列表
      });
    },
    // 添加
    anchorAdd() {
        this.addForm.icon = this.iconAdd
      anchorAdd(this).then((res) => {
        //   清空添加框
          this.addForm={
               name:"",
                desc:"",
                icon:'',
                auth_desc:""
          }
        this.$emit('close')  //添加后关闭添加框
        this.$emit('anchor') //添加后重新请求列表
      });
    },
    handleAvatarSuccessEdit(res,file){
      this.iconEdit = res.key;
      this.form.icon = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccessAdd(res,file){
      this.iconAdd = res.key;
      this.addForm.icon = URL.createObjectURL(file.raw);
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/dialog.css");


</style>
