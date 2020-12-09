import qs from	'qs'
//-----------------------财富等级----------------------------------------

// 等级列表
export async function wealthGradeList(that) {
    const res = await that.$http.get('/level/wealth?page='+that.listQuery.page+'&page_size='+that.listQuery.limit);
    console.log(res);
    return res;
}

// 标签详情
export async function wealthGradeDetails(that) {
    const res = await that.$http.get('/level/wealth/'+that.editId);
    if(res.code == '1') {

        console.log(res);
        return res;
    }else {
        that.$message.error(res.message);
    }
}

// 修改信息
export async function wealthGradeEdit(that) {
    const res = await that.$http.put('/level/wealth/'+that.editId,qs.stringify(that.form));
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
//添加标签
export async function wealthGradeAdd(that) {
    const res = await that.$http.post('/level/wealth/',qs.stringify(that.addForm));
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
export async function wealthDeleteGrade(that) {
    const res = await that.$http.delete('/level/wealth/'+that.deleteId);
    console.log(res);
    return res;
}

//-----------------------魅力等级----------------------------------------
// 等级列表
export async function charmGradeList(that) {
    const res = await that.$http.get('/level/charm?page='+that.listQuery.page+'&page_size='+that.listQuery.limit);
    console.log(res);
    return res;
}

// 标签详情
export async function charmGradeDetails(that) {
    const res = await that.$http.get('/level/charm/'+that.editId);
    if(res.code == '1') {

        console.log(res);
        return res;
    }else {
        that.$message.error(res.message);
    }
}

// 修改信息
export async function charmGradeEdit(that) {
    const res = await that.$http.put('/level/charm/'+that.editId,qs.stringify(that.form));
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
//添加标签
export async function charmGradeAdd(that) {
    const res = await that.$http.post('/level/charm',qs.stringify(that.addForm));
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
export async function charmDeleteGrade(that) {
    const res = await that.$http.delete('/level/charm/'+that.deleteId);
    console.log(res);
    return res;
}