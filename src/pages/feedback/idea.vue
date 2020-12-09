<template>
  <div>
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>反馈管理</el-breadcrumb-item>
        <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索 -->
      <div class="search_box">
        <div class="search_on search_left search_status">
          <span>状态：</span>
          <el-select v-model="status" placeholder="全部">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search_on">
          <span>会员：</span>
          <el-input
            placeholder="输入会员ID"
            v-model="uid"
            clearable
          ></el-input>
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

        <div class="search_on search_left">
          <el-button type="primary" @click="numberQuery()">查询</el-button>
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
          prop="id"
          label="ID"
          min-width="4%"
          align="center"
        ></el-table-column>
        <el-table-column label="会员" min-width="16%" align="center">
          <template slot-scope="scope">
            <span
              >{{ scope.row.nickname }}
              <i class="uid">({{ scope.row.uid }})</i>
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="version"
          label="系统版本"
          min-width="7%"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="model" label="手机型号" min-width="7%" align="center">
        </el-table-column>
        <el-table-column
          prop="content"
          label="反馈信息"
          min-width="32%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="thumb"
          label="图片"
          min-width="10%"
          align="center"
        >
        <template slot-scope="scope">
            <img :src="scope.row.thumb" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          min-width="6%"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == 0 ? 'warning' : scope.row.status == 1 ?'success':'danger'">{{
              scope.row.status == 0 ? "待处理" : scope.row.status == 1 ?"已处理":"驳回"
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="addtime"
          label="提交时间"
          min-width="12%"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="处理时间"
          min-width="12%"
          align="center"
        >
        <template slot-scope="scope">
            <span>{{scope.row.status==0?"处理中":scope.row.uptime}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="13%" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==0"
              class="btn_operation"
              size="mini"
              type="info"
              @click="feedbackEdit(scope.row.id)"
              >标记处理</el-button
            >
            <el-button
              class="btn_operation"
              size="mini"
              type="danger"
              @click="feedbackDelete(scope.row.id)"
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
        @pagination="feedbackList"
      />
    </el-card>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { feedbackList, feedbackEdit, feedbackDelete } from "@/api/feedback";
import untilsTime from "@/utils/Datetime";

export default {
  props: [],
  components: {
    Pagination,
  },
  data() {
    return {
      // form: {},
      type: 1,
      list: [], // 主播标签列表
      listQuery: {
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        searchStatus: false,
        total: 0, // 总条数
      },
      // dialogVisible: false, // 编辑的模态框隐藏
      editId: "", //编辑标记id
      deleteId: "", //删除id

     
      status: "", //查询的下拉状态
      uid: "", //查询输入的id
      start_time:"", //查询开始时间
      end_time:"",  //查询结束时间
      value2: "",

      statusList: [
        {
          label: "全部",
          value: 2,
        },
        {
          label: "未处理",
          value: 0,
        },
        {
          label: "已处理",
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
    feedbackList() {
      feedbackList(this).then((res) => {
        //时间转换
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
    // 标记操作
    feedbackEdit(id) {
      this.editId = id;
      this.$confirm("是否标记处理?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          feedbackEdit(this).then((res) => {
            this.feedbackList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
   
    // 删除
    feedbackDelete(id) {
      this.deleteId = id;
      this.$confirm("是否删除该反馈?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          feedbackDelete(this).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.feedbackList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    numberQuery() {

      if(this.value2){
         this.start_time=this.value2[0].getTime()/1000
         this.end_time=this.value2[1].getTime()/1000
      }
     
      this.feedbackList();
    },
    // 重置
    Reset() {
      this.status = "";
      this.uid = "";
      this.start_time=""
      this.end_time=""
      this.value2=""
      this.feedbackList();
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
    this.feedbackList();
  },

};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.search_on {
  margin-left: 50px;
}
.search_on /deep/ .el-input__inner {
  width: 200px;
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
</style>