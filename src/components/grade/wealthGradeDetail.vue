<template>
  <div>
    <div v-if="stat == 1">
      <el-form ref="form" label-width="110px">
        <el-form-item label="图标：">
          
          <el-upload class="avatar-uploader" :action="api+'?token='+upToken" :show-file-list="false" :on-success="handleAvatarSuccessEdit">
                <img v-if="form.thumb" :src="form.thumb" class="avatarImg" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="等级：">
          <el-input v-model="form.level_id"></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="form.level_name"></el-input>
        </el-form-item>
        <el-form-item label="等级经验上限：">
          <el-input v-model="form.level_up"></el-input>
        </el-form-item>
        
        
        <el-form-item>
          <el-button type="primary" @click="wealthGradeEdit" 
            >立即修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp">
        <el-form ref="form" label-width="110px">
          <el-form-item label="图标：">
          
          <el-upload class="avatar-uploader" :action="api+'?token='+upToken" :show-file-list="false" :on-success="handleAvatarSuccessAdd">
                <img v-if="addForm.thumb" :src="addForm.thumb" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="等级：">
          <el-input v-model="addForm.level_id"></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="addForm.level_name"></el-input>
        </el-form-item>
        <el-form-item label="等级经验上限：">
          <el-input v-model="addForm.level_up"></el-input>
        </el-form-item>
        
        
        <el-form-item>
          <el-button type="primary" @click="wealthGradeAdd" 
            >立即添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { wealthGradeEdit, wealthGradeDetails, wealthGradeAdd } from "@/api/grade";
import {
    qiniuToken
} from '@/api/Qiniuyun'
export default {
  name: "gradeDetail",
  props: ["editId", "stat"],
  data() {
    return {
      form: {},
      iconEdit: '', //编辑图片上传
      iconAdd:"",   //添加图片上传
      api:"",   //图片上传地址前缀
      upToken:"", //七牛云token
      addForm:{
          level_id:"",
          level_name:"",
          level_up:"",
          thumb:'',
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
      wealthGradeDetails(this).then((res) => {
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
    wealthGradeEdit() {
      this.form.thumb = this.iconEdit
      wealthGradeEdit(this).then((res) => { 
        this.$emit('close')  //修改后关闭编辑框
        this.$emit('grade') //修改后重新请求列表
      });
    },
    // 添加
    wealthGradeAdd() {
      this.addForm.thumb = this.iconAdd
      wealthGradeAdd(this).then((res) => {
        //   清空添加框
        this.addForm={
          level_id:"",
          level_name:"",
          level_up:"",
          thumb:'',
      }
        this.$emit('close')  //添加后关闭添加框
        this.$emit('grade') //添加后重新请求列表
      });
    },
    handleAvatarSuccessEdit(res,file){
      this.iconEdit = res.key;
      this.form.thumb = URL.createObjectURL(file.raw);
    },

    handleAvatarSuccessAdd(res,file){
      this.iconAdd = res.key;
      this.addForm.thumb = URL.createObjectURL(file.raw);
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/dialog.css");
 .avatarImg {
    width: 60px;
    height: 30px ;
    margin-top: 5px;
   
}
</style>
