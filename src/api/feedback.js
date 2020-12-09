import qs from	'qs'


// 反馈列表
export async function feedbackList(that) {
    if(that.status==2){
        status=""
    }else {
        status=that.status
    }
    const res = await that.$http.get('/feedback/report?page='+that.listQuery.page+'&page_size='+that.listQuery.limit+'&type='+that.type+'&status='+that.status+'&start_time='+that.start_time+'&end_time='+that.end_time+'&uid='+that.uid);
    console.log(res);
    return res;
}



// 标记处理
export async function feedbackEdit(that) {
    const res = await that.$http.put('/feedback/report/'+that.editId);
    if(res.code == '1') {
        that.$message({
            message: '标记成功',
            type: 'success'
          });
        return res;
    }else {
        that.$message.error(res.message);
    }
}

//删除
export async function feedbackDelete(that) {
    const res = await that.$http.delete('/feedback/report/'+that.deleteId);
    console.log(res);
    return res;
}

