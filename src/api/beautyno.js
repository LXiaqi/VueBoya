import qs from	'qs'
//-----------------------未出售----------------------------------------

// 靓号列表
export async function nosellList(that) {
    const res = await that.$http.get('/shop/beauty_no?page='+that.listQuery.page+'&page_size='+that.listQuery.limit+'&name='+that.number);
    console.log(res);
    return res;
}

// 靓号详情
export async function nosellDetails(that) {
    const res = await that.$http.get('/shop/beauty_no/'+that.editId);
    if(res.code == '1') {

        console.log(res);
        return res;
    }else {
        that.$message.error(res.message);
    }
}

// 修改靓号
export async function nosellEdit(that) {
    const res = await that.$http.put('/shop/beauty_no/'+that.editId,qs.stringify(that.form));
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
//添加靓号
export async function nosellAdd(that) {
    const res = await that.$http.post('/shop/beauty_no/',qs.stringify(that.addForm));
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
//删除
export async function nosellDelete(that) {
    const res = await that.$http.delete('/shop/beauty_no/'+that.deleteId);
    console.log(res);
    return res;
}

//-----------------------已售出----------------------------------------
// 列表
export async function sellList(that) {
    console.log(that.userdId);
    const res = await that.$http.get('/shop/beauty_no/user?page='+that.listQuery.page+'&page_size='+that.listQuery.limit+'&uid='+that.userId+'&name='+that.number);
    console.log(res);
    return res;
}
//强制回收
export async function sellDelete(that) {
    const res = await that.$http.delete('/shop/beauty_no/'+that.deleteId);
    console.log(res);
    return res;
}

