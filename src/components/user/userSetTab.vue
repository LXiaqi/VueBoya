<template>
<div>
    <div class="userinfo_box">
        <span class="avatar_span">头像：</span>
        <img :src="userTab.avatar" alt="" />
    </div>
    <div class="userinfo_box">
        <span>ID：</span>
        <span>{{userTab.id}}</span>
    </div>
    <div class="userinfo_box">
        <span>昵称：</span>
        <span>{{userTab.user_nicename}}</span>
    </div>
    <div class="userinfo_box">
        <span>家族：</span>
        <span>{{userTab.family_name == ''? '暂无家族' : userTab.family_name}}</span>
    </div>
    <div class="userinfo_box">
        <span>标识：</span>
        <el-select v-model="Livetab" placeholder="请选择">
            <el-option v-for="item in liveTabList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
    </div>
    <div class="userinfo_box">
        <el-button type="primary" @click="passLiveTab()">确认</el-button>
    </div>
</div>
</template>

<script>
import {
    anchorLabel,
    setLiveTab
} from "@/api/anchor";
export default {
    name: 'UserSetTab',
    props: ['userTab'],
    data() {
        return {
            listQuery: {
                page: 1,
                limit: 10
            },
            Livetab: '',
            liveTabList: []
        }
    },
    mounted() {

    },

    created() {
        this.info();
    },
    methods: {
        info() {
            anchorLabel(this).then(res => {
                console.log(res);
                this.liveTabList = res.data.list;
            })
        },
        passLiveTab() {
            setLiveTab(this).then(res => {
                this.$emit('func')
            })
        }
    },

}
</script>

<style scoped>
.userinfo_box {
    margin-left: 50px;
    margin-bottom: 40px;
    font-size: 16px;
}

.userinfo_box img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    vertical-align: middle;
}

.avatar_span {
    vertical-align: middle;

}
</style>
