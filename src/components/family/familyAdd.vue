<template>
  <div class="warp">
    <div v-if="stat == 1">
      <el-form ref="form" label-width="110px">
        <el-form-item label="家族名称：" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="nosellEdit" 
            >立即修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp">
         <el-form ref="form" label-width="110px">
        <el-form-item label="家族长ID：" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="家族名称：" required>
          <el-input v-model="addForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="家族简介：" required>
          <el-input v-model="addForm.expire"></el-input>
          <span class="notice">注：单位天 0代表永久</span>
        </el-form-item>
        <el-form-item label="家族头像：" required>
          <el-upload class="avatar-uploader" :action="api+'?token='+upToken" :show-file-list="false" :on-success="handleAvatarSuccessAdd">
                <img v-if="addForm.thumb" :src="addForm.thumb" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-ite label="对接运营：" required>
            <el-select v-model="addForm.type" placeholder="admin">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-ite>
        <el-form-item>
          <el-button type="primary" @click="nosellAdd" 
            >立即添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { nosellEdit, nosellDetails, nosellAdd } from "@/api/beautyno";

export default {
  name: "nosellDetail",
  props: ["editId", "stat"],
  data() {
    return {
      form: {}, 
      //  iconEdit: '', //编辑图片上传
      iconAdd:"",   //添加图片上传
      api:"",   //图片上传地址前缀
      upToken:"", //七牛云token  
      addForm:{
          uid:"",
          name:"",
          type:1,
          expire:'',
          coin:""
      },
      
      typeList: [{
                    label: "推荐",
                    value: 1
                },
                {
                    label: "极品",
                    value: 2
                },
                {
                    label: "豹子",
                    value: 3
                },
                {
                    label: "情侣",
                    value: 4
                }
            ], // 类型列表的下拉
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
      nosellDetails(this).then((res) => {
        this.form = res.data;
      });
      qiniuToken(this).then(res => {
                console.log(res);
                this.upToken = res.data.token;
                this.api = res.data.up_host;
            })
    },
    //修改用户信息
    nosellEdit() {
      this.form.thumb = this.iconEdit
      nosellEdit(this).then((res) => { 
        this.$emit('close')  //修改后关闭编辑框
        this.$emit('beautyno') //修改后重新请求列表
      });
    },
    // 添加
    nosellAdd() {
      nosellAdd(this).then((res) => {
        //   清空添加框
        this.addForm={
          uid:"",
          name:"",
          type:"",
          expire:'',
          coin:""
      }
        this.$emit('close')  //添加后关闭添加框
        this.$emit('beautyno') //添加后重新请求列表
      });
    },

    // handleAvatarSuccessEdit(res,file){
    //   this.iconEdit = res.key;
    //   this.form.thumb = URL.createObjectURL(file.raw);
    // },

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
.notice {
    color: red;
}
.btn_operation {
  margin-top: 4px;
}
.warp /deep/ .el-form-item .el-input__inner {
    width: 320px;
}
.warp /deep/ .el-form-item {
    margin-bottom: 30px;
}
</style>
