import qs from	'qs'
// 主播管理列表
export async function anchorLabel(that) {
    const res = await that.$http.get('/remark/index?page='+that.listQuery.page+'&page_size='+that.listQuery.limit);
    return res;
}

// 标签详情
export async function anchordetails(that) {
    const res = await that.$http.get('/remark/index/'+that.editId);
    if(res.code == '1') {
        return res;
    }else {
        that.$message.error(res.message);
    }
}

// 修改信息
export async function anchorEdit(that) {
    const res = await that.$http.put('/remark/index/'+that.editId,qs.stringify(that.form));
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
export async function anchorAdd(that) {
    const res = await that.$http.post('/remark/index/',qs.stringify(that.addForm));
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
export async function anchorDelete(that) {
    const res = await that.$http.delete('/remark/index/'+that.deleteId);
    console.log(res);
    return res;
}


// 给用户设置标签（认证主播，星耀主播）
export async function setLiveTab(that) {
    const res = await that.$http.post('/remark/user?uid='+that.userTab.id+'&remark_id='+that.Livetab);
    if(res.code == '1') {
        return res;
    }else {
        that.$message.error(res.message);
    }
}
