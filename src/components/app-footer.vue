<template>
<div class="app-footer-box">

</div>
</template>

<script>
export default {
    data() {
        return {
            author: window.APP_INFO.author,
            version: window.APP_INFO.version,
            appName: window.APP_INFO.appName
        }
    }
}
</script>

<style>
.app-footer-box {
    height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.app-footer-box .footer-logo {
    width: 24px;
    margin-right: 10px;
    vertical-align: middle;
}

.app-footer-box .footer-text {
    color: #8b949e;
}
</style>
