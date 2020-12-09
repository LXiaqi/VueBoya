<template>
  <div class="warp">
      <div class="search_box">
          <el-button type="primary" @click="nosellAdd">添加</el-button>
            <div class="search_on">
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
        min-width="18%"
        align="center"
      ></el-table-column>
      <el-table-column
        label="类型"
        min-width="8%"
        align="center"
      >
      <template slot-scope="scope">
          <span>{{scope.row.type==1?"推荐":scope.row.type==2?"极品":scope.row.type==3?"豹子":"情侣"}}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="coin"
        label="所需金币"
        min-width="10%"
        align="center"
      >
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          min-width="8%"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == '0' ? 'info' : 'primary'">{{
              scope.row.status == "0" ? "下架" : "上架"
            }}</el-tag>
          </template>
        </el-table-column>
      <el-table-column
        prop="addtime"
        label="生效时长"
        min-width="10%"
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
        min-width="15%"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
        <template slot-scope="scope">
        <el-button
            class="btn_operation"
            size="mini"
            :type="scope.row.status==0?'primary':'warning'"
            @click="nosellEditStatus(scope.row.id,scope.row.status)"
            >{{scope.row.status==0?'上架':'下架'}}</el-button
          >
          <el-button
            class="btn_operation"
            size="mini"
            type="info"
            @click="nosellEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            class="btn_operation"
            size="mini"
            type="danger"
            @click="nosellDelete(scope.row.id)"
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
      @pagination="nosellList"
    />
    <el-dialog :visible.sync="dialogVisible" :title="stat==1?'靓号编辑':'靓号添加'">
            <NosellDetail
              :editId="editId"
              :stat="stat"
              @close="close"
              @beautyno="nosellList"
            ></NosellDetail>
          </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { nosellList,nosellDelete,nosellEdit,nosellDetails } from "@/api/beautyno";
import untilsTime from "@/utils/Datetime";
import NosellDetail from "@/components/beautyno/nosellDetail";

export default {
  props: [],
  components: {
    Pagination,
    NosellDetail
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
      dialogVisible: false, // 编辑的模态框隐藏
      editId: "",
      deleteId: "",
      stat: "", //1为编辑状态，0为添加状态
      number:"",
    //   editType:"" //1为编辑，2为上下架
    };
  },
  methods: {

       // 列表
    nosellList() {
      nosellList(this).then((res) => {
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
    // 通过靓号查询
    numberQuery(){
      this.nosellList()
    },
    // 重置
    Reset() {
      this.number = "";
      this.nosellList();
    },
    // 编辑操作
    nosellEdit(id) {
      this.stat = 1;
      this.dialogVisible = true;
      this.editId = id;
    },
    close() {
      this.dialogVisible = false;
    },
   
    // 上下架操作
    nosellEditStatus(id,status){
        console.log(status);
      this.editId = id;
         this.$confirm("是否执行此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            if(status){
            this.form.status=0
            }else {
            this.form.status=1
            }
         
            nosellEdit(this).then((res) => {
                this.nosellList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });

    },
    // 删除操作
    nosellDelete(id) {
      this.deleteId = id;
      this.$confirm("是否删除该靓号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          nosellDelete(this).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.nosellList();
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
    nosellAdd() {
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
  mounted() {
      this.nosellList()
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
.warp /deep/ .el-dialog {
  border-radius: 16px;
}
</style>