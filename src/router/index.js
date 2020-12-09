import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home},  // 首页
        {path: '/userlist', name: 'userList',  component: page('user/userList')}, // 用户列表
        {path: '/userealList', name: 'userealList',  component: page('user/userealList')}, // 用户实名列表
        {path: '/userGrade', name: 'userGrade',  component: page('user/userGrade')}, // 等级管理
        {path: '/mountList', name: 'mountList',  component: page('shop/mountList')}, //商城坐骑管理
        {path: '/beautifulList', name: 'beautifulList',  component: page('shop/beautifulList')}, //商城靓号管理 
        {path: '/headList', name: 'headList',  component: page('shop/headList')}, //商城头像管理 

        {path: '/anchorLabel', name: 'anchorLabel',  component: page('anchor/anchorLabel')}, // 主播标签管理
        {path: '/liveList', name: 'liveList',  component: page('live/liveList')}, // 敏感词管理
        {path: '/idea', name: 'idea',  component: page('feedback/idea')}, //意见反馈 
        {path: '/logout', name: 'logout',  component: page('feedback/logout')}, //注销反馈 
        {path: '/reportList', name: 'reportList',  component: page('feedback/reportList')}, //举报列表 

        {path: '/giftList', name: 'giftList',  component: page('props/giftList')}, //礼物管理
        {path: '/rechargeList', name: 'rechargeList',  component: page('finance/rechargeList')}, //充值管理
        {path: '/recordList', name: 'recordList',  component: page('finance/recordList')}, //充值记录
        {path: '/familyList', name: 'familyList',  component: page('family/familyList')}, //家族列表

        

        
      ]
    },
    {path: '/login', name: 'login', component: page('login')},


  ]
})
