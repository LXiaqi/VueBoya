<template>
<div>
    <div v-for="item in giftNumList" :key='item.index'>
        <div>
            <span>礼物区间：</span>
            <el-input placeholder="礼物区间" v-model="item.num"></el-input>
        </div>
        <div>
            <div>
                <span>中奖倍数：</span>
                <el-input placeholder="中奖倍数"></el-input>
            </div>
            <div>
                <span>中奖次数：</span>
                <el-input placeholder="中奖次数"></el-input>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'PrizeInfo',
    props: ['giftinfo'],
    data() {
        return {
            giftNumList: [],
        }
    },
    created() {
        // console.log(this.giftinfo);
        this.info();
    },
    methods: {
        info() {
            for (let key in this.giftinfo) {
                this.giftNumList.push({
                    'num': key
                });
                console.log(this.giftinfo[key]);
                for (let k in this.giftinfo[key]) {
                    this.giftNumList.push({
                        'times': k,
                        'second': this.giftinfo[key][k]
                    });
                }
            }
            console.log(this.giftNumList);
        }
    }
}
</script>

<style scoped>

</style>
