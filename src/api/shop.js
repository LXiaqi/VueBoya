import qs from 'qs'
//坐骑列表
export async function mountList(that) {
    const res = await that.$http.get('/shop/car?page=' + that.listQuery.page + '&page_size=' + that.listQuery.limit);
    return res;
}

//坐骑列表详情
export async function mountDetails(that) {
    const res = await that.$http.get('/shop/car/' + that.editid);
    if (res.code == '1') {
        return res;
    } else {
        that.$message.error(res.message);
    }
}

//修改坐骑列表
export async function mountEdit(that) {
    let data = {};
    let id = '';
    if (that.type == 1) {
        id = that.outId;
        data = {
            status: that.status,
        }
    } else {
        id = that.editid;
        console.log("编辑的选中id：" + that.editid);
        data = that.form
        console.log(data);
    }
    const res = await that.$http.put('/shop/car/' + id,data);
    if (res.code == '1') {
        that.$message({
            message: '修改成功',
            type: 'success'
        });
        return res;
    } else {
        that.$message.error(res.message);
    }
}
//添加坐骑列表
export async function mountAdd(that) {
    const res = await that.$http.post('/shop/car/', qs.stringify(that.addForm));
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
//删除坐骑列表
export async function mountDelete(that) {
    const res = await that.$http.delete('/shop/car/' + that.deleteId);
    console.log(res);
    return res;
}

//头像列表
export async function headList(that) {
    const res = await that.$http.get('/shop/frame?page=' + that.listQuery.page + '&page_size=' + that.listQuery.limit);
    return res;
}
//头像列表详情
export async function headDetails(that) {
    const res = await that.$http.get('/shop/frame/' + that.editid);
    if (res.code == '1') {
        return res;
    } else {
        that.$message.error(res.message);
    }
}
//添加头像列表
export async function headAdd(that) {
    const res = await that.$http.post('/shop/frame/', qs.stringify(that.addForm));
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
//修改头像列表
export async function headEdit(that) {
    let data = {};
    let id = '';
    if (that.type == 1) {
        id = that.outId;
        data = {
            is_up: that.is_up,
        }
    } else {
        id = that.editid;
        console.log("编辑的选中id：" + that.editid);
        data = that.form
        console.log(data);
    }
    const res = await that.$http.put('/shop/frame/' + id,data);
    if (res.code == '1') {
        that.$message({
            message: '修改成功',
            type: 'success'
        });
        return res;
    } else {
        that.$message.error(res.message);
    }
}
//删除头像
export async function headDelete(that) {
    const res = await that.$http.delete('/shop/frame/' + that.deleteId);
    console.log(res);
    return res;
}

//用户头像列表
export async function userHeadList(that) {
    const res = await that.$http.get('/shop/frame/user?page=' + that.listQuery.page + '&page_size=' + that.listQuery.limit+'&uid='+that.uid);
    return res;
}
  
//赠送用户头像 
export async function sendHead(that) {
    const res = await that.$http.post('/shop/frame/user/', qs.stringify(that.form));
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

//回收头像
export async function headRecovery(that) {
    const res = await that.$http.delete('/shop/frame/recycle/' + that.recoveryId);
    console.log(res);
    return res;
}