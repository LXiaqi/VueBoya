import qs from 'qs'
// 用户列表
export async function userList(that) {
    const res = await that.$http.get('/user/index?page=' + that.listQuery.page + '&page_size=' + that.listQuery.limit+'&uid='+that.userId+'&nickname='+that.nickname);
    return res;
}
// 用户详情
export async function userdetails(that) {
    const res = await that.$http.get('/user/index/' + that.editid);
    if (res.code == '1') {
        return res;
    } else {
        that.$message.error(res.message);
    }
}
// 修改用户信息
export async function userEdit(that) {
    const res = await that.$http.put('/user/index/' + that.editid, qs.stringify(that.form));
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

// 设置代理(clickBtnType == 1), 封号操作（clickBtnType == 2）
export async function setAgent(that) {
    let data = {}
    let id = '';
    if(that.clickBtnType == '1') {
        id = that.agentId;
        data = {
            is_agent: that.agentState
        }
    }else {
        id = that.disableId
        data = {
            user_status: that.disableState
        }
    }
    
    const res = await that.$http.put('/user/index/' + id, data);
    return res;
}


// 实名审核列表
export async function userRealList(that) {
    const res = await that.$http.get('/user/auth?page=' + that.listQuery.page + '&page_size=' + that.listQuery.limit +'&uid='+that.uid +'&nickname='+that.nickname +'&status='+that.state);
    return res;
}
// 实名详情
export async function userRealDetails(that) {
    const res = await that.$http.get('/user/auth/' + that.editid);
    if (res.code == '1') {
        return res;
    } else {
        that.$message.error(res.message);
    }
}
// 修改实名通过、拒绝状态
export async function userRealEdit(that) {
    let data = {};
    let id = '';
    
    if (that.type == 1) {
        id = that.realId;
        data = {
            status: that.status,
            reason: that.reason
        }
    } else {
        id = that.editid;
        console.log("编辑的选中id："+that.editid);
        console.log(that.form.status);
        console.log(that.form.reason);
        data =that.form;
        console.log(data);
    }
    const res = await that.$http.put('/user/auth/' + id,data);
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

