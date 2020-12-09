<template>
  <div class="warp">
    <!-- 添加 -->
    <div class="search_box">
      <el-button type="primary" @click="headAdd">添加</el-button>
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
        prop="title"
        label="名称"
        min-width="10%"
        align="center"
      ></el-table-column>
      <el-table-column prop="type" label="类型" min-width="8%" align="center">
        <template slot-scope="scope">
          <span>{{
            scope.row.type == 1 ? "活动" : scope.row.type == 2 ? "豪华" : "梦幻"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图标" min-width="8%" align="center">
        <template slot-scope="scope">
          <img class="icon" :src="scope.row.pic" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="丫币" min-width="12%" align="center">
      </el-table-column>
      <el-table-column prop="is_up" label="状态" min-width="8%" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_up == "1" ? "上架" : "下架" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="overdue"
        label="生效时长"
        min-width="10%"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.overdue == 0 ? 'success' : 'danger'">{{
            scope.row.overdue == 0 ? "永久" : scope.row.overdue + "天"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="发布时间"
        min-width="15%"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
        <template slot-scope="scope">
          <el-button
            class="btn_operation"
            size="mini"
            :type="scope.row.is_up == 0 ? 'success' : 'warning'"
            @click="moveHead(scope.row.id, 1, scope.row.is_up)"
            >{{ scope.row.is_up == 1 ? "下架" : "上架" }}</el-button
          >
          <el-button
            class="btn_operation"
            size="mini"
            type="info"
            @click="headEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            class="btn_operation"
            size="mini"
            type="danger"
            @click="headDelete(scope.row.id)"
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
      @pagination="head"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      :title="stat == 1 ? '头像编辑' : '头像添加'"
    >
      <HeadListDetail
        :editid="editId"
        :stat="stat"
        @func="close"
        @head="head"
      ></HeadListDetail>
    </el-dialog>
  </div>
</template>
<script>
import untilsTime from "@/utils/Datetime";
import { headList, headDelete, headEdit } from "@/api/shop";
import Pagination from "@/components/Pagination";
import HeadListDetail from "@/components/shop/HeadListDetail";
export default {
  props: [],
  components: {
    Pagination,
    HeadListDetail,
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
      outId: "", //下架id
      editId: "", //编辑id
      deleteId: "", //删除id
      stat: "", //1为编辑状态，0为添加状态
      type: "", //判断获取下架和编辑的id
      is_up: "", //状态 1上架 2下架
    };
  },
  methods: {
    // 列表
    head() {
      headList(this).then((res) => {
        //时间转换
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].create_time = untilsTime.formateDate(
            res.data.list[i].create_time
          );
        }
        this.list = res.data.list;
        this.listQuery.total = res.data.total_count;
      });
    },
    // 下架
    moveHead(id, type, is_up) {
      this.outId = id;
      this.type = type;
      this.is_up = is_up;
      if (is_up == 1) {
        this.is_up = 2;
      } else {
        this.is_up = 1;
      }
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          headEdit(this).then((res) => {
            this.head();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架",
          });
        });
    },
    // 编辑操作
    headEdit(id) {
      this.stat = 1;
      this.dialogVisible = true;
      this.editId = id;
    },
    close() {
      this.dialogVisible = false;
    },
    // 删除操作
    headDelete(id) {
      this.deleteId = id;
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          headDelete(this).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.head();
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
    headAdd() {
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
    this.head();
  },

  computed: {},
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.icon {
  width: 55px;
  height: 52px;
  border-radius: 50%;
}
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