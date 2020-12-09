<template>
<div class="fullscreen">
    <div>
        <div class="conent_box">
            <div class="iog_box">
                <img src="./../assets/login/logo.png" alt="" />
                <div class="title">账号密码登录</div>
                <div>
                    <el-input class="ipts" placeholder="请输入内容" prefix-icon="el-icon-user-solid" v-model="username">
                    </el-input>
                    <el-input class="ipts" placeholder="请输入密码" v-model="password" prefix-icon="el-icon-lock" show-password></el-input>
                    <div class="forget">忘记密码？</div>
                </div>
                <el-button class="login_btn" @click.prevent="handleLogin" v-loading="isLoging">登 录</el-button>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    name: "login",
    data() {
        return {
            username: "admin",
            password: "boya1818",
            isLoging: false,
            author: window.APP_INFO.author,
            version: window.APP_INFO.version,
            appName: window.APP_INFO.appName,
        };
    },
    methods: {
        ...mapActions(["login"]),
        handleLogin() {
            if (!this.username || !this.password) {
                return this.$message.warning("用户名和密码不能为空");
            }
            this.isLoging = true;
            this.login({
                username: this.username,
                password: this.password,
            }).then((res) => {
                this.$message.success("登录成功");
                this.$router.push({
                    name: "home",
                });
                this.isLoging = false;
            });
        },
    },
};
</script>

<style scoped>
.m-list-group {
    border-radius: 3px;
    padding: 0;
    margin: 0 0 20px;
}

.m-list-group .m-list-group-item {
    position: relative;
    display: block;
    padding: 6px 10px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #e7ecee;
}

.m-list-group .m-list-group-item:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.m-list-group .m-list-group-item:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}

.fullscreen {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f4f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("./../assets/login/bg.png") no-repeat;
}

@media (max-width: 768px) {
    .login-box {
        width: auto;
    }
}

.conent_box {
    text-align: center;
    width: 945px;
    height: 491px;
    background: url("./../assets/login/img.png") no-repeat;
    background-size: 100%;
    position: relative;
}

.conent_box .iog_box {
    position: absolute;
    right: 121px;
    top: 40px;
}

.iog_box img {
    width: 192px;
    height: 111px;
}

.title {
    margin: 32px 0px 8px 0px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #121212;
}

.ipts {
    width: 270px;
    height: 40px;
    display: block;
    margin-top: 16px;
}

.ipts /deep/ input {
    border-radius: 14px;
}

.ipts /deep/ .el-input__inner:focus-within {

    border: 1px solid #FF5369;
}

.forget {
    text-align: right;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FF5369;
    margin-top: 8px;
}

.login_btn {
    width: 270px;
    height: 40px;
    border-radius: 14px;
    margin-top: 56px;
    background: #FF5369;
    color: #fff;
}
</style>
