<template>
  <div>
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值记录</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索 -->
      <div class="search_box">
        <div class="search_on search_left search_status">
          <span>订单状态：</span>
          <el-select v-model="state" placeholder="全部">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search_on search_time">
          <span>提交时间：</span>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div class="search_on">
          <span>用户ID：</span>
          <el-input
            placeholder="请输入用户ID"
            v-model="uid"
            clearable
          ></el-input>
        </div>
        <div class="search_on">
          <span>关键字:</span>
          <el-input
          class="tradeinput"
            placeholder="请输入订单号"
            v-model="trade_no"
            clearable
          ></el-input>
        </div>
        <div class="search_on search_left">
          <el-button type="primary" @click="numberQuery()">搜索</el-button>
          <el-button @click="Reset()">重置</el-button>
        </div>
        <div>
          <p>人民币金额统计：{{listQuery.total_money}}元 (根据筛选条件统计)</p>
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
          min-width="4%"
          align="center"
        ></el-table-column>
        <el-table-column label="会员" min-width="10%" align="center">
          <template slot-scope="scope">
            <span
              >{{ scope.row.nickname }}
              <i class="uid">({{ scope.row.uid }})</i>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额"
          min-width="8%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="coin"
          label="丫币"
          min-width="7%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="charge_type"
          label="充值类型"
          min-width="6%"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag effect="plain">
              {{ scope.row.charge_type == 0 ? "直充" : "代充" }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="orderno"
          label="商户订单号"
          min-width="12%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="支付类型"
          min-width="6%"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.type == 1 ? 'primary' : 'success'">{{
              scope.row.type == 1 ? "支付宝" : "微信"
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="trade_no"
          label="第三方支付订单号"
          min-width="12%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          min-width="6%"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == 0 ? 'danger' : 'success'">{{
              scope.row.status == 0 ? " 待支付" : "支付成功"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="12%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="addtime"
          label="提交时间"
          min-width="12%"
          align="center"
        >
        </el-table-column>
      </el-table>
      <!--分页-->
      <pagination
        v-show="listQuery.total > 0"
        :total="listQuery.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="record"
      />
    </el-card>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { recordList } from "@/api/finance";
import untilsTime from "@/utils/Datetime";

export default {
  props: [],
  components: {
    Pagination,
  },
  data() {
    return {
      list: [], // 充值记录列表
      listQuery: {
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        searchStatus: false,
        total: 0, // 总条数
        total_money:0 //总金额
      },

      state: "", //查询的下拉状态
      uid: "", //查询输入的id
      start_time: "", //查询开始时间
      end_time: "", //查询结束时间
      trade_no:"",//查询订单号
      value2: "",

      statusList: [
        {
          label: "未支付",
          value: 0,
        },
        {
          label: "已完成",
          value: 1,
        },
      ], // 状态列表的下拉
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    // 列表
    record() {
      recordList(this).then((res) => {
        //时间转换
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].addtime = untilsTime.formateDate(
            res.data.list[i].addtime
          );
          res.data.list[i].create_time = untilsTime.formateDate(
            res.data.list[i].create_time
          );
        }
        this.list = res.data.list;
        this.listQuery.total = res.data.total_count;
        this.listQuery.total_money = res.data.total_money;

      });
    },

    numberQuery() {
      if (this.value2) {
        this.start_time = this.value2[0].getTime() / 1000;
        this.end_time = this.value2[1].getTime() / 1000;
      }

      this.record();
    },
    // 重置
    Reset() {
      this.state = "";
      this.uid = "";
      this.start_time = "";
      this.end_time = "";
      this.trade_no="";
      this.value2 = "";
      this.record();
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
  mounted() {
    this.record();
  },
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.search_on {
  margin-left: 50px;
}
.search_on /deep/ .el-input__inner {
  width: 220px;
}
.search_num {
  margin-left: 70px;
}
.search_status {
  margin-left: 0;
}
.uid {
  font-style: normal;
  color: #999;
}
.search_time {
  margin-left: 70px;
}
.search_time .el-input__inner {
  width: 300px;
}

.el-input--suffix{
  width: 200px;
}
</style>