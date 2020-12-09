<template>
  <div class="warp">
    <div v-if="stat == 1">
      <el-form ref="form" label-width="110px">
        <el-form-item label="靓号：" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="生效时长：" required>
          <el-input v-model="form.expire"></el-input>
          <span class="notice">注：单位天 0代表永久</span>
        </el-form-item>
        <el-form-item label="金币：">
          <el-input v-model="form.coin"></el-input>
        </el-form-item>
        <el-form-item label="类型：" required>
            <el-select v-model="form.type" placeholder="全部">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
      
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nosellEdit" 
            >立即修改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="warp">
         <el-form ref="form" label-width="110px">
        <el-form-item label="靓号：" required>
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户ID：">
          <el-input v-model="addForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="生效时长：" required>
          <el-input v-model="addForm.expire"></el-input>
          <span class="notice">注：单位天 0代表永久</span>
        </el-form-item>
        <el-form-item label="金币：">
          <el-input v-model="addForm.coin"></el-input>
        </el-form-item>
        <el-form-item label="类型：" required>
            <el-select v-model="addForm.type" placeholder="全部">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
       
        </el-form-item>
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
