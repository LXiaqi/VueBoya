import qs from	'qs'
// 获取七牛云Token
export async function qiniuToken(that) {
    const res = await that.$http.get('/common/oss');
    return res;
}