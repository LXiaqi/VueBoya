<template>
<m-navbar :theme="theme.theme.headerTheme" style="height:80px">
    <div style="display:inline-block;margin-top:12px">
        <img style="width:156px;height:48px" src="../assets/login/logo2.png" alt="">
    </div>
    <m-navbar-brand class="dian_box">
        <i class="side-switch" :class="{
        'el-icon-more': !mini,
        'el-icon-more-outline': mini
      }" @click="handleSwitchSide"></i>
    </m-navbar-brand>

    <m-nav align="right">

        <m-nav-item padding="0">
            <span style="color:#999999;font-size:14px;padding:0 16px">2020年10月20日 13:20:19</span>
            <m-dropdown align="right" v-if="user" padding="0 10px">
                <a href="#" style="display: inline-block; padding: 0px; color: inherit">
                    <span style="color:#121212;font-size:14px;padding:0 16px">{{user.username}}</span>
                    <img src="../assets/logo.png" alt="" style="border-radius: 50px;vertical-align: middle; width:30px;height:30px">
                    <span class="caret" style="color:#121212;font-size:14px"></span>
                </a>
                <m-dropdown-panel>
                    <m-dropdown-item>用户信息</m-dropdown-item>
                    <m-dropdown-item>修改密码</m-dropdown-item>
                    <m-dropdown-item disabled>注销</m-dropdown-item>
                    <div class="test-line"></div>
                    <m-dropdown-item name="login">退出账号</m-dropdown-item>
                </m-dropdown-panel>
            </m-dropdown>
        </m-nav-item>
        <m-nav-item padding="0 5px" style="color:#121212;font-size:14px">
            <a href="#" @click.stop.prevent="handleSwitchScreen">
                <i class="fa" :class="isFullScreen ? 'fa-compress' : 'fa-expand'"></i>
            </a>
        </m-nav-item>

        <m-nav-item padding="0">
            <m-dropdown align="right" padding="0 10px">
                <a href="#" style="padding:0 0px; color: inherit">
                    <i class="fa fa-gears"></i>
                </a>
                <m-dropdown-panel style="width: 200px; min-height: 100px;">
                    <el-form>
                        <el-form-item label="侧边栏">
                            <el-switch v-model="showAside" @change="handleSwitchHideSide" />
                        </el-form-item>
                        <!--
                              <el-form-item label="主题">
                            <el-select v-model="themeType" style="width: 100px">
                                <el-option v-for="theme in themes" :key="theme.label" :label="theme.label" :value="theme.name"></el-option>
                            </el-select>
                        </el-form-item>
                        -->
                    </el-form>
                </m-dropdown-panel>
            </m-dropdown>
        </m-nav-item>
    </m-nav>
</m-navbar>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
import {
    requestFullScreen,
    exitFullscreen
} from '@/utils'
import themes from './theme'
export default {
    name: 'app-header',
    data() {
        return {
            mini: false,
            isFullScreen: false,
            themes,
            themeType: '',
            showAside: true,
            theme: {
                theme: {
                    headerTheme: 'info'
                }
            }
        }
    },
    computed: {
        ...mapState({
            user: ({
                user
            }) => user.user
        })
    },
    watch: {
        themeType(val) {
            this.theme = this.themes.find(e => e.name === val) || {}
            this.$emit('set-theme', this.theme)
            localStorage.setItem('theme', val)
        }
    },
    methods: {
        ...mapActions(['getLoginUser', 'logout']),
        handleSwitchSide() {
            this.mini = !this.mini
            this.$emit('switch', this.mini)
        },
        handleSwitchScreen() {
            if (this.isFullScreen) {
                exitFullscreen()
                this.isFullScreen = false
            } else {
                requestFullScreen()
                this.isFullScreen = true
            }
        },
        handleSwitchHideSide() {
            console.log('change')
            this.$emit('hide-side')
        }
    },
    created() {
        this.getLoginUser()
        var theme = localStorage.getItem('theme') || 'dark'
        this.themeType = theme
    }
}
</script>

<style>
.side-switch {
    display: inline-block;
    font-size: 32px;
    cursor: pointer;
    color: inherit;
    margin-top: 10px;
}

.side-switch:hover {
    color: #fff;
}

.dian_box {
    color: #000;
    margin-left: 24px;

}

.el-icon-more-outline:before {
    color: #000;
}

.el-icon-more:before {
    color: #000;
}
</style>
