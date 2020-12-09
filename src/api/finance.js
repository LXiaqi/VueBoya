import qs from	'qs'
// 充值规则列表
export async function rechargeList(that) {
    const res = await that.$http.get('/charge/rules?page='+that.listQuery.page+'&page_size='+that.listQuery.limit);
    return res;
}

//充值规则详情
export async function rechargeDetails(that) {
    const res = await that.$http.get('/charge/rules/'+that.editId);
    if(res.code == '1') {
        return res;
    }else {
        that.$message.error(res.message);
    }
}

//修改充值规则
export async function rechargeEdit(that) {
    const res = await that.$http.put('/charge/rules/'+that.editId,qs.stringify(that.form));
    if(res.code == '1') {
        that.$message({
            message: '修改成功',
            type: 'success'
          });
        return res;
    }else {
        that.$message.error(res.message);
    }
}
//添加充值规则
export async function rechargeAdd(that) {
    const res = await that.$http.post('/charge/rules/',qs.stringify(that.addForm));
    if(res.code == '1') {
        that.$message({
            message: '添加成功',
            type: 'success'
          });
        return res;
    }else {
        that.$message.error(res.message);
    }
}
//删除充值规则
export async function rechargeDelete(that) {
    const res = await that.$http.delete('/charge/rules/'+that.deleteId);
    console.log(res);
    return res;
}

// record
export async function recordList(that) {
    if(that.status==2){
        status=""
    }else {
        status=that.status
    }
    const res = await that.$http.get('/charge/record?page='+that.listQuery.page+'&page_size='+that.listQuery.limit+'&total_money='+that.listQuery.total_money+'&type='+that.type+'&status='+that.state+'&start_time='+that.start_time+'&end_time='+that.end_time+'&uid='+that.uid+'&trade_no='+that.trade_no);
    console.log(res);
    return res;
}

