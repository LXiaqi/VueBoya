<template>
  <div class="warp">
    <el-card class="card">
      <!--面包屑-->
      <el-breadcrumb separator="/" class="bread_box">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>家族管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--顶部检索-->
      <!-- 搜索 -->
      <div class="search_box">
          <!-- <el-button type="primary" @click="familyAdd">添加</el-button> -->

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
          <span>家族名称：</span>
          <el-input
            placeholder="输入家族名称"
            v-model="name"
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
          min-width="10%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="家族名字"
          min-width="12%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="real_name"
          label="家族长（ID）"
          min-width="15%"
          align="center"
        >
        <template slot-scope="scope">
            <span>{{scope.row.nickname}}<i class="uid">({{scope.row.uid}})</i></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="real_name"
          label="申请者实名"
          min-width="18%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          min-width="16%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="wechat"
          label="微信"
          min-width="16%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="size"
          label="规模"
          min-width="12%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="platform"
          label="合作平台"
          min-width="16%"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" min-width="12%" align="center">
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
          prop="addtime"
          label="提交时间"
          min-width="16%"
          align="center"
        ></el-table-column>
        
        <el-table-column label="操作" min-width="20%" align="center">
          <template slot-scope="scope">
            <el-button
              class="btn_operation"
              size="mini"
              type="success"
              @click="adoptStatus(scope.row.name,2,scope.row.id)"
              >通过</el-button
            >
            <el-button
              class="btn_operation"
              size="mini"
              type="danger"
              @click="refuseStatus(scope.row.name,3,scope.row.id)"
              >拒绝</el-button
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
        @pagination="family"
      />
    </el-card>
    <!-- <el-dialog
      :visible.sync="dialogVisible"
      :title="添加家族"
    >
      <FamilyAdd
        v-if="dialogVisible"
        @close="close"
        @family="family"
      ></FamilyAdd>
    </el-dialog> -->
  </div>
</template>
<script>
import { familyList,familyEdit } from "@/api/family";
import Pagination from "@/components/Pagination";
import untilsTime from "@/utils/Datetime";
// import FamilyAdd from "@/components/live/familyAdd";
export default {
  props: [],
  components: {
    Pagination,
    // FamilyAdd,
  },
  data() {
    return {
      list: [], // 家族审核列表
      listQuery: {
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        searchStatus: false,
        total: 0, // 总条数
      },
      form: {
        name: "",
        status:""
      }, 
      // editId: "",
      id:"",
      status: "", //查询的下拉状态
      uid: "", //查询输入的id
      name:"",
      start_time:"", //查询开始时间
      end_time:"",  //查询结束时间
      value2: "",

      statusList: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "未审核",
          value: 1,
        },
        {
          label: "审核通过",
          value: 2,
        },
        {
          label: "审核不通过",
          value: 3,
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
    family() {
      familyList(this).then((res) => {
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

    // 通过
    adoptStatus(name,status,id) {
      this.id=id
      this.form.name=name
      this.form.status = status;
      familyEdit(this).then((res) => {
            this.family();
          });
    },


    // 拒绝
    refuseStatus(name,status,id) {
      this.id=id
      this.form.name=name
      this.form.status = status;
      this.$confirm("确定拒绝通过？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          familyEdit(this).then((res) => {
            this.family();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消审核",
          });
        });
    },
    
    
    numberQuery() {
        if(this.status==0){
            this.status=""
        }
      if(this.value2){
         this.start_time=this.value2[0].getTime()/1000
         this.end_time=this.value2[1].getTime()/1000
      }
      this.family();
    },
    // 重置
    Reset() {
      this.status = "";
      this.name=""
      this.uid = "";
      this.start_time=""
      this.end_time=""
      this.value2=""
      this.family();
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
    this.family();
  },

  computed: {},
};
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.icon {
  width: 30px;
  height: 30px;
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