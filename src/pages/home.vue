<template>
<div class="body" id="content">
    <div class="test">
        121
    </div>
</div>
</template>

<script>
import Watermark from "../components/watermark"
export default {
    data() {
        return {

        }
    },
    mounted() {
        Watermark.set("admin  2020-10-16 10:10 ")
    },
    created() {
        this.info();
    },
    methods: {
        info() {

        }
    },

}
</script>

<style>

</style>
