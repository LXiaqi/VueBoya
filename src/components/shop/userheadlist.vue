<template>
  <div class="warp">
    <!--顶部检索-->
    <div class="search_box">
      <div class="search_on">
        <span>ID：</span>
        <el-input placeholder="输入ID" v-model="uid" clearable></el-input>
      </div>
      <div class="search_on search_left">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="Reset()">重置</el-button>

        <el-button type="success" @click="dialogFormVisible = true"
          >赠送头像</el-button
        >
        <el-dialog title="赠送头像" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item
              label="头像ID："
              :label-width="formLabelWidth"
              required
            >
              <el-input v-model="form.head_id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              label="用户ID："
              :label-width="formLabelWidth"
              required
            >
              <el-input v-model="form.uid" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendpic">确 定</el-button>
          </div>
        </el-dialog>
      </div>
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
        label="拥有者"
        min-width="12%"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}
            <i class="picuid">({{ scope.row.uid }})</i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="头像名称"
        min-width="12%"
        align="center"
      >
      </el-table-column>
      <el-table-column label="图标" min-width="8%" align="center">
        <template slot-scope="scope">
          <img class="icon" :src="scope.row.pic" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="获取时间"
        min-width="15%"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="expire"
        label="剩余生效时间"
        min-width="15%"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.expire == '永久'
                ? 'success'
                : scope.row.expire == '已过期'
                ? 'info'
                : 'danger'
            "
            >{{ scope.row.expire }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
        <template slot-scope="scope">
          <el-button
            class="btn_operation"
            size="small"
            type="danger"
            @click="recovery(scope.row.id)"
            >强制回收</el-button
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
      @pagination="userHead"
    />
  </div>
</template>
<script>
import untilsTime from "@/utils/Datetime";
import { userHeadList, sendHead, headRecovery } from "@/api/shop";
import Pagination from "@/components/Pagination";
export default {
  props: [],
  components: {
    Pagination,
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
      uid: "", //查询输入ID
      recoveryId: "", //回收id
      dialogFormVisible: false, //赠送头像的dialog
      form: {
        head_id: "",
        uid: "",
      }, //赠送头像
      formLabelWidth: "120px",
    };
  },
  methods: {
    // 列表
    userHead() {
      userHeadList(this).then((res) => {
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
    // 头部搜索
    search() {
      this.userHead();
    },
    //重置
    Reset() {
      this.uid = "";
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.userHead();
    },
    close() {
      this.dialogVisible = false;
    },
    // 强制回收
    recovery(id) {
      this.recoveryId = id;
      this.$confirm("确定回收吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          headRecovery(this).then((res) => {
            this.$message({
              type: "success",
              message: "回收成功!",
            });
            this.userHead();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 赠送
    sendpic() {
      if (this.form.head_id.length == 0) {
        this.$message({
          type: "info",
          message: "头像id不能为空",
        });
      } else if (this.form.uid.length == 0) {
        this.$message({
          type: "info",
          message: "用户id不能为空",
        });
      } else {
        this.$confirm("您确定要执行此操作吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            sendHead(this).then((res) => {});
            this.form = {
              head_id: "",
              uid: "",
            };
            this.dialogFormVisible = false;
            this.userHead();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
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
    this.userHead();
  },

  computed: {},
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.icon {
  width: 55px;
  /* height: 55px; */
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
.table_box /deep/ .picuid{
  font-style: normal;
  color: #999;
}
</style>