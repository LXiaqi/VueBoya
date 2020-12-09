import qs from	'qs'
// 家族审核列表
export async function familyList(that) {
    const res = await that.$http.get('/family/check?page='+that.listQuery.page+'&page_size='+that.listQuery.limit+'&status='+that.status+'&start_time='+that.start_time+'&end_time='+that.end_time+'&uid='+that.uid+'&name='+that.name);
    return res;
}



// 家族审核状态修改  //拒绝/通过
export async function familyEdit(that) {
    const res = await that.$http.put('/family/index/'+that.id,qs.stringify(that.form));
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
//添加家族
// export async function familyAdd(that) {
//     const res = await that.$http.post('/family/index', qs.stringify(that.addForm));
//     if (res.code == '1') {
//         that.$message({
//             message: '添加成功',
//             type: 'success'
//         });
//         return res;
//     } else {
//         that.$message.error(res.message);
//     }
// }


