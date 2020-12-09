<template>
  <div class="content_box">
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>快速认证</el-breadcrumb-item>
      </el-breadcrumb>
      <!--顶部检索-->
      <div class="search_box">
        <div class="search_on">
          <span>ID：</span>
          <el-input placeholder="输入ID" v-model="uid" clearable></el-input>
        </div>
        <div class="search_on search_left">
          <span>昵称：</span>
          <el-input
            placeholder="输入昵称"
            v-model="nickname"
            clearable
          ></el-input>
        </div>
        <div class="search_on search_left">
          <span>状态：</span>
          <el-select v-model="state" placeholder="全部">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search_on search_left">
          <el-button type="primary" @click="search"
            >搜索</el-button
          >
          <el-button @click="Reset()">重置</el-button>
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
          prop="uid"
          label="用户ID"
          min-width="14%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称"
          min-width="12%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="real_name"
          label="真实姓名"
          min-width="8%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="car_no"
          label="身份证号码"
          min-width="18%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="addtime"
          label="申请时间"
          min-width="16%"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" min-width="8%" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.status == 1
                  ? 'info'
                  : scope.row.status == 2
                  ? 'success'
                  : 'danger'
              "
              >{{
                scope.row.status == 1
                  ? "未审核"
                  : scope.row.status == 2
                  ? "审核通过"
                  : "审核未通过"
              }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="uptime"
          label="操作时间"
          min-width="16%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operator"
          label="操作人"
          min-width="8%"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn_operation"
              size="mini"
              type="success"
              @click="adoptStatus(scope.row.uid, 2, 1)"
              >通过</el-button
            >
            <el-button
              class="btn_operation"
              size="mini"
              type="danger"
              @click="refuseStatus(scope.row.uid, 3, 1)"
              >拒绝</el-button
            >
            <el-button
              class="btn_operation"
              size="mini"
              type="info"
              @click="editUser(scope.row.uid, 2)"
              >编辑</el-button
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
        @pagination="userReal"
      />
    </el-card>

    <!--编辑的操作 -->
    <el-dialog title="实名信息" :visible.sync="dialogVisible">
      <UserReal  v-if="dialogVisible" :editid="editId" @func="userUpdate()"></UserReal>
    </el-dialog>
    <!---->
  </div>
</template>
<script>
import { userRealList, userRealEdit, userRealDetails } from "@/api/user";
import Pagination from "@/components/Pagination";
import untilsTime from "@/utils/Datetime";
import UserReal from "@/components/user/UserReal";

export default {
  props: [],
  components: {
    Pagination,
    UserReal,
  },
  data() {
    return {
      // form: { status: "", reason: ""},
      uid: "", //ID所搜
      nickname: "", //昵称搜索
      state: "", // 头部状态，
      reason: "", //输入理由
      type: "", //判断获取通过，拒绝，编辑的id
      realId: "", //通过拒绝id
      editId: "", // 修改的用户ID
      status: "", // 通过拒绝状态，
      dialogVisible: false,
      listQuery: {
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        searchStatus: false,
        total: 0, // 总条数
      },
      list: [], // 用户列表
      statusList: [
        {
          label: "未审核",
          value: 1,
        },
        {
          label: "审核通过",
          value: 2,
        },
        {
          label: "审核未通过",
          value: 3,
        },
      ],
    };
  },
  created() {
    this.userReal();
  },
  methods: {
    // 列表
    userReal() {
      userRealList(this).then((res) => {
        // 申请时间 操作时间转换
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].addtime = untilsTime.formateDate(
            res.data.list[i].addtime
          );
          res.data.list[i].uptime = untilsTime.formateDate(
            res.data.list[i].uptime
          );
        }
        this.list = res.data.list;
        this.listQuery.total = res.data.total_count;
      });
    },
    //头部搜索
    search() {
        this.userReal();
    
    },
    //重置
    Reset() {
      this.uid = "";
      this.nickname = "";
      this.listQuery.page = 1;
      this.listQuery.limit = 10;
      this.state="";
      this.userReal();
    },
    // 通过
    adoptStatus(uid, status, type) {
      this.type = type;
      this.realId = uid;
      console.log(status);
      this.status = status;
      userRealEdit(this).then((res) => {
        this.userReal();
      });
    },
    // 拒绝
    refuseStatus(uid, status, type) {
      this.type = type;
      console.log(uid);
      console.log(status);
      this.realId = uid;
      this.status = status;
      this.$prompt("请输入拒绝理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /(?!^\s*$)/g,
        inputErrorMessage: "理由不能为空！",
      })
        .then(({ value }) => {
          this.reason = value;
          console.log(value);
          userRealEdit(this).then((res) => {
            this.userReal();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 编辑操作
    editUser(uid, type) {
      this.type = type;
      this.dialogVisible = true;
      this.editId = uid;
    },
    // 关闭模态框
    userUpdate() {
      this.dialogVisible = false;
      this.userReal();
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
.btn_operation {
  margin-top: 4px;
}
</style>