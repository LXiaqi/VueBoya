<template>
<div>
    <el-form ref="form" label-width="100px">
        <el-form-item label="头像：">
            <el-upload class="avatar-uploader" :action="api+'?token='+upToken" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="昵称：" class="form_item">
            <el-input class="dialog_ipt" v-model="form.user_nicename"></el-input>
        </el-form-item>
        <el-form-item label="城市：" class="form_item">
            <el-input class="dialog_ipt" v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="手机：" class="form_item">
            <el-input class="dialog_ipt" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注：" class="form_item">
            <el-input class="dialog_ipt" v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item label="性别：" class="form_item item_width">
            <el-radio-group v-model="form.sex">
                <el-radio label="0">保密</el-radio>
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="代理：" class="form_item item_width">
            <el-radio-group v-model="form.is_agent">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="实名：" class="form_item item_width">
            <el-radio-group v-model="form.is_auth">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="签名：">
            <el-input type="textarea" class="dialog_ipt" v-model="form.signature"></el-input>
        </el-form-item>
        <el-form-item label="IP：" class="form_item">
            <span>{{form.last_login_ip}}</span>
        </el-form-item>
        <el-form-item label="注册时间：" class="form_item">
            <span>{{form.create_time}}</span>
        </el-form-item>
        <el-form-item class="form_btn">
            <el-button class="dialog_ipt" type="primary" @click="editUser()">立即修改</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    userdetails,
    userEdit,
} from '@/api/user'
import {
    qiniuToken
} from '@/api/Qiniuyun'
import untilsTime from '@/utils/Datetime';
export default {
    name: 'UserDetails',
    props: ['editid'],
    data() {
        return {
            imgUrl: '',
            upToken: '',
            api: '',
            form: {}
        }
    },
    mounted() {
        console.log(this.editid);
    },
    watch: {
        editid: function (val) {
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
            userdetails(this).then(res => {
                res.data.sex = res.data.sex.toString();
                res.data.is_auth = res.data.is_auth.toString();
                res.data.is_agent = res.data.is_agent.toString();
                res.data.create_time = untilsTime.formateDate(res.data.create_time);
                this.form = res.data;
            });
            // 获取七牛云token
            qiniuToken(this).then(res => {
                console.log(res);
                this.upToken = res.data.token;
                this.api = res.data.up_host;
            })
        },
        // 头像
        handleAvatarSuccess(res, file) {
            this.imgUrl = res.key;
            this.form.avatar = URL.createObjectURL(file.raw);

        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === "image/jpeg";
            // const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isLt2M) {
            //     this.$message.error("上传头像图片大小不能超过 2MB!");
            // }
            // return isJPG && isLt2M;
        },
        //修改用户信息
        editUser() {
            this.form.avatar = this.imgUrl
            userEdit(this).then(res => {
                this.$emit('func');
            })

        }
    },

}
</script>

<style scoped>
@import url("../../assets/css/dialog.css");
</style>
