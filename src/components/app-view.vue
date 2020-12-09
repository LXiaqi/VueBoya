<template>
<el-container class="app-container" :class="{
      'mini-side': isCollapse,
      'hide-side': hideSide,
    }">
    <el-header class="app-header" :height="headerHeight + 'px'">
        <app-header @switch="handleSideSwitch" @set-theme="handleSetTheme" @hide-side="handleSwitchHideSide" style="background: #fff; line-height: 80px"></app-header>
    </el-header>

    <el-container style="overflow-x: auto" class="left_box">
        <el-aside class="app-side" :width="hideSide ? '0' : sideWidth + 'px'" :style="{ background: theme.theme.backgroundColor, height: height }">
            <!--
             <div class="app-header-logo-box" :style="{height: headerHeight + 'px', color: theme.theme.activeTextColor}">
                <img src="../assets/logo.png" alt="" class="header-logo">
                <span class="header-logo-text">Boya后台</span>
            </div>
        -->
            <app-side :collapse="isCollapse" :theme="theme.theme"></app-side>
        </el-aside>
        <el-main class="app-body">
            <el-container style="height: 100%; min-height: 100%; overflow: auto" id="appBody">
                <el-main class="app-page-body">
                    <router-view></router-view>
                </el-main>
                <el-footer class="app-footer" :height="footerHeight + 'px'">
                    <app-footer></app-footer>
                </el-footer>
            </el-container>
        </el-main>
    </el-container>
    <m-back-top body-id="appBody"></m-back-top>
</el-container>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import AppSide from "@/components/app-side";
export default {
    name: "app-view",
    data() {
        return {
            height: '',
            isCollapse: false,
            hideSide: false,
            sideWidth: 200,
            footerHeight: 50,
            headerHeight: 80,
            theme: {
                theme: {},
            },
        };
    },
    components: {
        AppHeader,
        AppFooter,
        AppSide,
    },
    methods: {
        handleSideSwitch(val) {
            this.isCollapse = val;
            this.sideWidth = val ? 60 : 200;
        },
        handleSwitchHideSide() {
            this.hideSide = !this.hideSide;
        },
        handleSetTheme(theme) {
            this.theme = theme;
        },
    },
    created() {
        this.height = document.documentElement.clientHeight - 80;
    },

};
</script>

<style>
.app-container {
    margin: 0 auto;
    position: absolute;
    width: 100%;
    height: 100%;
}

.app-container .app-header {
    padding: 0;
    height: 80px;
    overflow: visible;
    z-index: 100;
    background: #fff;
}

.app-container .app-side {
    width: 200px;
    transition: all 0.5s ease;
    background-color: #fdfdfd;
}

.app-container .app-body {
    background: #f4f5f9;
    padding: 0;
}

.app-container .app-footer {
    background: #fff;
    border-top: solid 1px rgba(48, 54, 62, 0.14);
}

.app-container .app-page-body {
    overflow: visible;
    padding: 0px;
}

.app-header-logo-box {
    padding: 15px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.app-header-logo-box .header-logo {
    height: 42px;
    margin-top: -17px;
    margin-right: 5px;
    vertical-align: middle;
}

.app-header-logo-box .header-logo-text {
    font-size: 20px;
    font-weight: bold;
    opacity: 1;
}

/*mini-side*/
.app-container.mini-side .app-side {
    overflow: visible;
}

.app-container.mini-side .header-logo {
    margin-left: -10px;
}

.app-container.mini-side .header-logo-text {
    opacity: 0;
}

/*hide-side*/
.app-container.hide-side .app-side {
    display: none;
}

.el-menu--collapse {
    width: 100% !important;
}

.app-side::-webkit-scrollbar {
    display: none;

}

.el-menu.side-menu .el-menu-item.is-active {
    color: #fff !important;
    background: linear-gradient(270deg, #535AA6 0%, #8951BE 100%);
    border-left: 4px solid #E01DFF;
}

.el-menu-item:focus,
.el-menu-item:active {
    background: linear-gradient(270deg, #535AA6 0%, #8951BE 100%) !important;
    border-left: 4px solid #E01DFF;
    color: #fff !important;
}

.el-icon-arrow-down:before {
    font-size: 20px !important;
    color: #fff !important;
}
</style>
