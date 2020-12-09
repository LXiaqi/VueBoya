<template>
<div class="content_box">
    <el-card class="card">
        <!--面包屑-->
        <el-breadcrumb separator="/" class="bread_box">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>道具配置</el-breadcrumb-item>
            <el-breadcrumb-item>礼物列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="list" style="width: 100%" class="table_box" :height-cell-style="thStyleFun" :cell-style="cellStyleFun" v-loading="loading">
            <el-table-column prop="id" label="ID" min-width="4%" align="center">
            </el-table-column>
            <el-table-column label="类型" min-width="6%" align="center">
                <template slot-scope="scope">
                    <span>
                        {{scope.row.type == 0 ? '普通礼物' : '豪华礼物'}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="mark" label="标识" min-width="5%" align="center">
            </el-table-column>
            <el-table-column prop="gift_name" label="名称" min-width="10%" align="center">
            </el-table-column>
            <el-table-column prop="need_coin" label="价格" min-width="8%" align="center">
                <template slot-scope="scope">
                    <span class="color">
                        {{scope.row.need_coin}}
                    </span>
                    <span>丫币</span>
                </template>
            </el-table-column>
            <el-table-column label="图片" min-width="5%" align="center">
                <template slot-scope="scope">
                    <img class="gift_img" :src="scope.row.gift_icon" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="swf_type" label="动画类型" min-width="5%" align="center">
                <template slot-scope="scope">
                    <span class="color">
                        {{scope.row.swf_type == 0 ? 'GIF': 'SVGA'}}
                    </span>

                </template>
            </el-table-column>
            <el-table-column prop="swf" label="动画地址" min-width="18%" align="center">
            </el-table-column>
            <el-table-column label="状态" min-width="5%" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 0? 'danger' : 'success'">{{scope.row.status == 0 ? '下架' : '上架'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="addtime" label="发布时间" min-width="10%" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="20%" align="center">
                <template slot-scope="scope">
                    <el-button :type="scope.row.status == 0 ?'success':'warning'" size="mini" @click="upDown(scope.row.id,scope.row.status)">{{scope.row.status == 0 ?'上架':'下架'}}</el-button>
                    <el-button type="primary" size="mini" @click="setprize(scope.row.id)">奖池</el-button>
                    <el-button type="info" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini" @click="Delete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="listQuery.total>0" :total="listQuery.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="gift" />
    </el-card>
    <!--奖池周期配置-->
    <el-dialog title="奖池配置" :visible.sync="dialogVisible">
        <PrizeInfo v-if="dialogVisible" :giftinfo="giftinfo"></PrizeInfo>
    </el-dialog>
</div>
</template>

<script>
import Pagination from "@/components/Pagination";
import untilsTime from '@/utils/Datetime';
import PrizeInfo from "@/components/gift/PrizeInfo";
import {
    giftList,
    giftDelete,
    giftUp,
    giftDetails
} from '@/api/gift'
export default {
    components: {
        Pagination,
        PrizeInfo
    },
    data() {
        return {
            list: [], // 列表数据
            deleteId: '', // 要删除的礼物ID
            upStatus: '', // 上架下架状态
            upID: '', // 上架下架的礼物ID
            setprizeId: '', // 更改奖池的礼物id
            giftinfo: {}, // 礼物周期
            loading: false, //加载状态
            listQuery: {
                page: 1, // 当前页码
                limit: 10, // 表格一页的数量
                searchStatus: false,
                total: 0, // 总条数
            },
            dialogVisible: false
        }
    },
    created() {
        this.gift();
    },
    methods: {
        // 列表数据
        gift() {
            giftList(this).then(res => {
                console.log(res);
                for (let i = 0; i < res.data.list.length; i++) {
                    res.data.list[i].addtime = untilsTime.formateDate(res.data.list[i].addtime);
                    if (res.data.list[i].mark == 0) {
                        res.data.list[i].mark = '普通'
                    }
                    if (res.data.list[i].mark == 1) {
                        res.data.list[i].mark = '热门'
                    }
                    if (res.data.list[i].mark == 2) {
                        res.data.list[i].mark = '守护'
                    }
                    if (res.data.list[i].mark == 3) {
                        res.data.list[i].mark = '幸运'
                    }
                }
                this.list = res.data.list
                this.listQuery.total = res.data.total_count
            })
        },
        // 上架下架操作
        upDown(id, status) {
            this.upID = id;
            let title = '';
            if (status == 0) {
                this.upStatus = 1;
                title = '是否确认上架该礼物?'
            }
            if (status == 1) {
                this.upStatus = 0;
                title = '是否确认下架该礼物?'
            }
            const _this = this;
            this.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                giftUp(_this).then(res => {
                    _this.gift();
                })
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 奖池设置
        setprize(id, ) {
            this.setprizeId = id;
            giftDetails(this).then(res => {
                this.giftinfo = res.data.info;
                this.dialogVisible = true;
            })

        },
        // 删除操作
        Delete(id) {
            const _this = this;
            this.$confirm('是否确认删除该礼物?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.deleteId = id;
                giftDelete(_this).then(res => {
                    _this.gift();
                })
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 表格居中
        thStyleFun() {
            return 'text-align:center'
        },
        // 表格居中
        cellStyleFun() {
            return 'text-align:center'
        },
    }
}
</script>

<style scoped>
@import url("./../../assets/css/card.css");

.color {
    color: red;
}

.gift_img {
    width: 26px;
    height: 26px;
}
</style>>
