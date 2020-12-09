<template>
  <div>
    <div class="search_box">
            <div class="search_on search_status">
                <span>会员：</span>
                <el-input placeholder="输入会员ID" v-model="userId" clearable></el-input>
            </div>
            <div class="search_on search_num">
                <span>靓号：</span>
                <el-input placeholder="输入靓号" v-model="number" clearable></el-input>
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
        label="排序"
        min-width="8%"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        min-width="8%"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="靓号"
        min-width="15%"
        align="center"
      ></el-table-column>
      
      <el-table-column
        prop="coin"
        label="所需金币"
        min-width="10%"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="购买人"
        min-width="15%"
        align="center"
      >
      <template slot-scope="scope">
          <span>
            {{scope.row.nickname}}
            <i class="uid"> ({{scope.row.uid}})</i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="buytime"
        label="购买时间"
        min-width="15%"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="到期时间"
        min-width="10%"
        align="center"
      >
      <template slot-scope="scope">
          <el-tag :type="scope.row.end_time == '永久' ? 'success' :scope.row.end_time == '已到期'?'info': 'danger'">{{
              scope.row.end_time
            }}</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" min-width="15%" align="center">
        <template slot-scope="scope">
        
          <el-button
            class="btn_operation"
            size="mini"
            type="info"
            @click="recycle(scope.row.id)"
            >强制收回</el-button
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
      @pagination="sellList"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { sellList,sellDelete } from "@/api/beautyno";
import untilsTime from "@/utils/Datetime";

export default {
  props: [],
  components: {
    Pagination,
  },
  data() {
    return {
      form:{},
      list: [], // 主播标签列表
      listQuery: {
        page: 1, // 当前页码
        limit: 10, // 表格一页的数量
        searchStatus: false,
        total: 0, // 总条数
      },
      // dialogVisible: false, // 编辑的模态框隐藏
      deleteId: "", //编辑id
      number:"", //查询输入的靓号
      status:"全部", //查询的下拉状态
      userId:"",//查询输入的id
      statusList: [{
                    label: "全部",
                    value: 0
                },
                {
                    label: "已售",
                    value: 1
                },
               
            ], // 状态列表的下拉
    };
  },
  methods: {
       // 列表
    sellList() {
      sellList(this).then((res) => {
        //时间转换
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].buytime = untilsTime.formateDate(
            res.data.list[i].buytime
          );
        }
        this.list = res.data.list;
        this.listQuery.total = res.data.total_count;
      });
    },
    // 强制回收操作
    recycle(id){
      this.deleteId = id;
         this.$confirm("是否强制回收?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {        
            sellDelete(this).then((res) => {
                this.sellList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });

    },
    

    numberQuery(){
      this.sellList()
    },
    // 重置
    Reset(){
      this.number=""
      this.userId=""
      this.sellList()
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
      this.sellList()
  },
  watch: {},
  computed: {},
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
</style>