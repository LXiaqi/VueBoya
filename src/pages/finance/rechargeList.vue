<template>
  <div class="warp">
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值规则</el-breadcrumb-item>
      </el-breadcrumb>
      <!--顶部检索-->
      <div class="search_box">
        <el-button type="primary" @click="addRecharge">添加</el-button>
      </div>
      <!--表格-->
      <el-table
        :data="list"
        style="width: 100%"
        class="table_box"
        :height-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
      >
        <el-table-column
          prop="id"
          label="ID"
          min-width="8%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="12%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="money"
          label="安卓价格"
          min-width="10%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="money_ios"
          label="苹果价格"
          min-width="8%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="coin"
          label="安卓丫币"
          min-width="12%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="coin_ios"
          label="苹果丫币"
          min-width="10%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="addtime"
          label="发布时间"
          min-width="13%"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn_operation"
              size="mini"
              type="info"
              @click="editrecharge(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              class="btn_operation"
              size="mini"
              type="danger"
              @click="deleterecharge(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <pagination
        v-show="listQuery.total > 0"
        :total="listQuery.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="recharge"
      />
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="stat == 0 ? '充值规则添加' : '充值规则编辑'"
    >
      <RechargeDetail
        :editId="editId"
        :stat="stat"
        @close="close"
        @recharge="recharge"
      ></RechargeDetail>
    </el-dialog>
  </div>
</template>
<script>
import { rechargeList, rechargeDelete } from "@/api/finance";
import Pagination from "@/components/Pagination";
import untilsTime from "@/utils/Datetime";
import RechargeDetail from "@/components/finance/rechargeDetail";
export default {
  props: [],
  components: {
    Pagination,
    RechargeDetail,
  },
  data() {
    return {
      list: [], // 主播标签列表
      listQuery: {
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        searchStatus: false,
        total: 0, // 总条数
      },
      dialogVisible: false, // 编辑的模态框隐藏
      editId: "",
      deleteId: "",
      stat: "", //1为编辑状态，0为添加状态
    };
  },
  methods: {
    // 列表
    recharge() {
      rechargeList(this).then((res) => {
        //时间转换
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].addtime = untilsTime.formateDate(
            res.data.list[i].addtime
          );
        }
        this.list = res.data.list;
        this.listQuery.total = res.data.total_count;
      });
    },
    // 编辑操作
    editrecharge(id) {
      this.stat = 1;
      this.dialogVisible = true;
      this.editId = id;
    },
    close() {
      this.dialogVisible = false;
    },
    // 删除操作
    deleterecharge(id) {
      this.deleteId = id;
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rechargeDelete(this).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.recharge();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加标签名称
    addRecharge() {
      this.stat = 0;
      this.dialogVisible = true;
    },
    // 表格居中
    thStyleFun() {
      return "text-align:center";
    },
    // 表格居中
    cellStyleFun() {
      return "text-align:center";
    },
  },
  watch: {
    dialogVisible: function (val) {
      console.log(val);
      if (val == false) {
        this.editId = "";
      }
    },
  },
  mounted() {
    this.recharge();
  },

  computed: {},
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.btn_operation {
  margin-top: 4px;
}
.warp /deep/ .el-dialog {
  border-radius: 16px;
}

.warp /deep/ .el-form-item .el-input__inner {
  width: 400px;
}
.warp /deep/ .el-form-item {
  margin-bottom: 30px;
}
</style>