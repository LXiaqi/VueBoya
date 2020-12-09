<template>
<div class="warp">
    <!-- 添加 -->
          <div class="search_box">
            <el-button type="primary" @click="charmGradeAdd">添加</el-button>
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
              prop="level_id"
              label="等级"
              min-width="8%"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="level_name"
              label="等级名称"
              min-width="12%"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="level_up"
              label="等级经验上限"
              min-width="8%"
              align="center"
            >
            </el-table-column>
            <el-table-column label="图标" min-width="8%" align="center">
              <template slot-scope="scope">
                <img class="icon" :src="scope.row.thumb" alt="" />
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
                  type="info"
                  @click="charmGradeEdit(scope.row.id)"
                  >编辑</el-button
                >
                <el-button
                  class="btn_operation"
                  size="mini"
                  type="danger"
                  @click="charmDeleteGrade(scope.row.id)"
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
            @pagination="charmGradeList"
          />
          <el-dialog :visible.sync="dialogVisible" :title="stat==1?'等级编辑':'等级添加'">
      <CharmGradeDetail
         
        :editId="editId"
        :stat="stat"
        @close="close"
        @grade="charmGradeList"
      ></CharmGradeDetail>
    </el-dialog>
</div>
</template>
<script>
import untilsTime from "@/utils/Datetime";
import { charmGradeList,charmDeleteGrade } from "@/api/grade";
import Pagination from "@/components/Pagination";
import CharmGradeDetail from "@/components/grade/charmGradeDetail";
export default {
props:[],
components: {
    Pagination,
    CharmGradeDetail,
   
  },
data(){
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
}
},
methods:{
     // 列表
    charmGradeList() {
      charmGradeList(this).then((res) => {
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
    charmGradeEdit(id) {
      this.stat = 1;
      this.dialogVisible = true;
      this.editId = id;
    },
    close() {
      this.dialogVisible = false;
    },
    // 删除操作
    charmDeleteGrade(id) {
      this.deleteId = id;
      this.$confirm("是否删除该等级?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          charmDeleteGrade(this).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.charmGradeList();
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
    charmGradeAdd() {
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
    this.charmGradeList();
  },

computed:{
}
}
</script>
<style scoped>
@import url("./../../assets/css/card.css");
.icon {
  width: 30px;
  /* height: 30px; */
}
.btn_operation {
  margin-top: 4px;
}
.warp /deep/ .el-dialog {
  border-radius: 16px;
  
}
.warp /deep/ .el-form-item .el-input__inner {
    width: 320px;

}
.warp /deep/ .el-form-item {
    margin-bottom: 30px;
}
</style>