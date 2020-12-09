<template>
<div class="content_box">
    <el-card class="card">
        <!--面包屑-->
        <el-breadcrumb separator="/" class="bread_box">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--顶部检索-->
        <div class="search_box">
            <div class="search_on">
                <span>ID：</span>
                <el-input placeholder="输入ID" v-model="userId" clearable></el-input>
            </div>
            <div class="search_on search_left">
                <span>昵称：</span>
                <el-input placeholder="输入昵称" v-model="nickname" clearable></el-input>
            </div>
            <div class="search_on search_left">
                <span>认证状态：</span>
                <el-select v-model="status" placeholder="全部">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="search_on search_left">
                <span>渠道：</span>
                <el-select v-model="status" placeholder="全部">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="search_on search_left">
                <el-button type="primary" @click="userQuery()">查询</el-button>
                <el-button @click="Reset()">重置</el-button>
            </div>
        </div>
        <!--表格-->
        <el-table :data="list" style="width: 100%" class="table_box" :height-cell-style="thStyleFun" :cell-style="cellStyleFun" v-loading="loading">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="消费丫币">
                            <span>{{scope.row.consumption }}</span>
                        </el-form-item>
                        <el-form-item label="当前丫币">
                            <span>{{scope.row.coin}}</span>
                        </el-form-item>
                        <el-form-item label="消费丫粮">
                            <span>{{scope.row.spend_votes }}</span>
                        </el-form-item>
                        <el-form-item label="当前丫粮">
                            <span>{{scope.row.votes }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" min-width="8%" align="center"></el-table-column>
            <el-table-column label="头像" align="center" min-width="6%">
                <template slot-scope="scope">
                    <img class="avatar_img" v-lazy="scope.row.avatar" alt="" />
                </template>
            </el-table-column>
            <el-table-column prop="user_nicename" label="昵称" min-width="12%" align="center"></el-table-column>
            <el-table-column label="魅力等级" min-width="8%" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.charm_level}}级</span>
                </template>
            </el-table-column>
            <el-table-column label="财富等级" min-width="8%" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.wealth_level}}级</span>
                </template>
            </el-table-column>
            <el-table-column prop="last_login_time" label="上次登录" min-width="15%" align="center">
            </el-table-column>
            <el-table-column prop="remark" label="备注" min-width="8%" align="center"></el-table-column>
            <el-table-column prop="channel_name" label="渠道" min-width="8%" align="center"></el-table-column>
            <el-table-column label="状态" min-width="8%" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.user_status == '1' ? 'success':'danger'">{{scope.row.user_status == '1' ? '正常':'已封号'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="20%" align="center">
                <template slot-scope="scope">
                    <el-button class="btn_operation" size="mini" :type="scope.row.user_status == 0 ? 'success' : 'warning'" @click="userDisable(scope.row.id,scope.row.user_status)">{{scope.row.user_status == 0 ? '启用': '封号'}}</el-button>
                    <el-button class="btn_operation" size="mini" type="danger">封禁设备</el-button>
                    <el-button class="btn_operation" size="mini" type="danger">封禁IP</el-button>
                    <el-button class="btn_operation" size="mini" type="success" @click="setMark(scope.row)">设置标识</el-button>
                    <el-button class="btn_operation" size="mini" type="primary" @click="agent(scope.row.id,scope.row.is_agent)">{{scope.row.is_agent == 0 ? '设置代理' :'取消代理'}}</el-button>
                    <el-button class="btn_operation" size="mini" type="info" @click="editUser(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="user" />
    </el-card>
    <!--编辑的操作 -->
    <el-dialog title="用户资料" :visible.sync="dialogVisible">
        <UserDetails :editid="editId" @func="userUpdate()"></UserDetails>
    </el-dialog>
    <!--设置标识-->
    <el-dialog title="设置标识" :visible.sync="setTabType">
        <UserSetTab v-if="setTabType" :userTab="userTab" @func="tabLive()"></UserSetTab>
    </el-dialog>
</div>
</template>

<script>
import {
    userList,
    setAgent
} from '@/api/user'
import Pagination from "@/components/Pagination";
import untilsTime from '@/utils/Datetime';
import UserDetails from "@/components/user/UserDetails";
import UserSetTab from "@/components/user/userSetTab";

export default {
    components: {
        Pagination,
        UserDetails,
        UserSetTab
    },
    data() {
        return {
            loading: false, //加载状态
            clickBtnType: '', // 通过状态来判断请求的传值（设置代理是1/封号2）
            disableState: '', // 封号前的选择的用户状态
            disableId: '', // 封号ID
            agentState: '', // 代理前选中的用户代理状态
            agentId: '', // 点击代理设置的用户id
            userId: '', // 用户ID
            nickname: '', //昵称
            list: [], // 用户列表
            status: '', // 选中的认证状态，
            statusList: [{
                    label: "普通用户",
                    value: 0
                },
                {
                    label: "官方认证主播",
                    value: 1
                },
                {
                    label: "星耀主播",
                    value: 2
                }
            ], // 认证列表的下拉
            listQuery: {
                page: 1, // 当前页码
                limit: 10, // 表格一页的数量
                searchStatus: false,
                total: 0, // 总条数
            },
            dialogVisible: false, // 编辑的模态框隐藏
            editId: '', // 修改的用户ID
            setTabType: false,
            userTab: {}
        }
    },
    created() {
        this.user()
    },
    methods: {
        // 检索
        userQuery() {
            this.user();
        },
        //重置
        Reset() {
            this.userId = '';
            this.nickname = '';
            this.listQuery.page = 1;
            this.listQuery.limit = 10
            this.user();
        },
        // 列表
        user() {
            this.loading = true;
            userList(this).then(res => {
                for (let i = 0; i < res.data.list.length; i++) {
                    res.data.list[i].last_login_time = untilsTime.formateDate(res.data.list[i].last_login_time);
                }
                this.list = res.data.list;
                this.listQuery.total = res.data.total_count;
                this.loading = false;
            })
        },
        // 设置代理
        agent(id, state) {
            this.clickBtnType = '1';
            this.agentId = id;
            let tips = '';
            if (state == 0) {
                this.agentState = 1;
                tips = '是否确认给该用户设置代理'
            } else {
                tips = '是否取消该用户的代理'
                this.agentState = 0;
            }
            const that = this;
            this.$confirm(tips + '?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                setAgent(that).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '设置成功!'
                    });
                    that.user();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 封号
        userDisable(id, state) {
            this.clickBtnType = '2';
            const that = this;
            this.$confirm('是否确认禁用该用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.disableId = id;
                if (state == 0) {
                    that.disableState = 1;
                } else {
                    that.disableState = 0;
                }
                setAgent(that).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '设置成功!'
                    });
                    that.user();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 设置标识
        setMark(user) {
            this.setTabType = true;
            this.userTab = user;
        },
        tabLive() {
            this.setTabType = false;
            this.user();
        },
        // 编辑操作
        editUser(id) {
            this.dialogVisible = true;
            this.editId = id;
        },
        // 关闭模态框
        userUpdate() {
            this.dialogVisible = false;
            this.user();
        },
        // 表格居中
        thStyleFun() {
            return 'text-align:center'
        },
        // 表格居中
        cellStyleFun() {
            return 'text-align:center'
        },
    },
    watch: {
        dialogVisible: function (val) {
            if (val == false) {
                this.editId = '';
            }
        }
    },
}
</script>

<style scoped>
@import url("./../../assets/css/card.css");

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
}

.btn_operation {
    margin-top: 4px;
}
</style>
