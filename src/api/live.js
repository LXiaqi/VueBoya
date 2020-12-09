import qs from	'qs'
// 敏感词列表
export async function liveList(that) {
    const res = await that.$http.get('/live/words?page='+that.listQuery.page+'&page_size='+that.listQuery.limit);
    return res;
}

// 敏感词详情
export async function liveDetails(that) {
    const res = await that.$http.get('/live/words/'+that.editId);
    if(res.code == '1') {
        return res;
    }else {
        that.$message.error(res.message);
    }
}

// 敏感词修改
export async function liveEdit(that) {
    const res = await that.$http.put('/live/words/'+that.editId,qs.stringify(that.form));
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
//敏感词添加
export async function liveAdd(that) {
    const res = await that.$http.post('/live/words/', qs.stringify(that.addForm));
    if (res.code == '1') {
        that.$message({
            message: '添加成功',
            type: 'success'
        });
        return res;
    } else {
        that.$message.error(res.message);
    }
}
//敏感词删除
export async function liveDelete(that) {
    const res = await that.$http.delete('/live/words/'+that.deleteId);
    console.log(res);
    return res;
}

