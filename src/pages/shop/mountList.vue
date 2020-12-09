<template>
  <div class="warp">
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>坐骑管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!--顶部检索-->
      <div class="search_box">
        <el-button type="primary" @click="addMount">添加</el-button>
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
          min-width="10%"
          align="center"
        ></el-table-column>
        <el-table-column prop="type" label="类型" min-width="8%" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.type == 1
                ? "福利"
                : scope.row.type == 2
                ? "豪华"
                : "梦幻"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="need_coin"
          label="累充领取"
          min-width="12%"
          align="center"
        ></el-table-column>
        <el-table-column label="图标" min-width="8%" align="center">
          <template slot-scope="scope">
            <img class="icon" :src="scope.row.thumb" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="8%"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == 0 ? 'info' : 'primary'">{{
              scope.row.status == 0 ? "下架" : "上架"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="expire"
          label="生效时长"
          min-width="8%"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.expire == 0 ? 'success' : 'danger'">{{
              scope.row.expire == 0 ? "永久" : scope.row.expire+'天'
            }}</el-tag>
          </template>
        </el-table-column>
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
              :type="scope.row.status == 0 ? 'success' : 'warning'"
              @click="moveMount(scope.row.id, 1, scope.row.status)"
              >{{ scope.row.status == 0 ? "上架" : "下架" }}</el-button
            >
            <el-button
              class="btn_operation"
              size="mini"
              type="info"
              @click="editMount(scope.row.id, 2)"
              >编辑</el-button
            >
            <el-button
              class="btn_operation"
              size="mini"
              type="danger"
              @click="deleteMount(scope.row.id)"
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
        @pagination="mount"
      />
    </el-card>
    <el-dialog :visible.sync="dialogVisible">
      <MountDetails v-if="dialogVisible"
        :editid="editId"
        :pop="pop"
        @func="userUpdate()"
        @mount="mount"
      ></MountDetails>
    </el-dialog>
  </div>
</template>
<script>
import { mountList, mountDelete, mountAdd, mountEdit } from "@/api/shop";
import Pagination from "@/components/Pagination";
import untilsTime from "@/utils/Datetime";
import MountDetails from "@/components/shop/MountDetails";

export default {
  props: [],
  components: {
    Pagination,
    MountDetails,
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
      type: "", //判断获取下架和编辑的id
      status: "", //状态 0 下架 1 上架
      pop: "", //1为编辑状态，0为添加状态
    };
  },
  created() {
    this.mount();
  },
  methods: {
    // 列表
    mount() {
      mountList(this).then((res) => {
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].addtime = untilsTime.formateDate(
            res.data.list[i].addtime
          );
        }
        this.list = res.data.list;
        this.listQuery.total = res.data.total_count;
      });
    },
    // 下架
    moveMount(id, type, status) {
      this.outId = id;
      this.type = type;
      this.status = status;
      if (status == 0) {
        this.status = 1;
      } else {
        this.status = 0;
      }
      this.$confirm("您确定要执行此操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          mountEdit(this).then((res) => {
            this.mount();
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
    editMount(id, type) {
      this.pop = 1;
      this.dialogVisible = true;
      this.editId = id;
      this.type = type;
    },
    // 删除操作
    deleteMount(id) {
      this.deleteId = id;
      this.$confirm("是否删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          mountDelete(this).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.mount();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加
    addMount() {
      this.pop = 0;
      this.dialogVisible = true;
    },
    // 关闭模态框
    userUpdate() {
      this.dialogVisible = false;
      this.mount();
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
  mounted() {},
  watch: {},
  computed: {},
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.icon {
  width: 60px;
  height: 60px;
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