import qs from 'qs'
// 礼物列表
export async function giftList(that) {
    const res = await that.$http.get('/live/gift?page=' + that.listQuery.page + '&page_size=' + that.listQuery.limit);
    return res;
}
// 礼物删除
export async function giftDelete(that) {
    const res = await that.$http.delete('/live/gift/'+that.deleteId);
    if(res.code == 1) {
        that.$message({
            message: '删除成功',
            type: 'success'
        });
        return res;
    }else {
        that.$message.error(res.message);
    }
}
// 礼物上架下架
export async function giftUp(that) {
    let data = {
        status:that.upStatus
    }
    let tit = '';
    if(that.upStatus == 0) {
        tit = '已下架'
    }else {
        tit = '已上架'
    }
    const res = await that.$http.put('/live/gift/'+ that.upID, data);
    if(res.code == 1) {
        that.$message({
            message: tit,
            type: 'success'
        });
        return res;
    }else {
        that.$message.error(res.message);
    }
}
// 礼物奖池设置
export async function setPrizeNum(that) {
    let data = {
        status:that.setprizeInfo
    }
    const res = await that.$http.put('/live/gift/'+ that.setprizeId, data);
    if(res.code == 1) {
        that.$message({
            message: '设置成功',
            type: 'success'
        });
        return res;
    }else {
        that.$message.error(res.message);
    }
}
// 礼物详情
export async function giftDetails(that) {
    const res = await that.$http.get('/live/gift/'+ that.setprizeId);
    if(res.code == 1) {
        return res;
    }else {
        that.$message.error(res.message);
    }
}