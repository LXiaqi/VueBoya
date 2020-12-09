const menus = [
  // 系统首页
  { id: '0', label: '系统首页', path: '/', icon: 'fa fa-dashboard' },
  // 会员管理
  {
    id: 'user', label: '会员管理', icon: 'fa fa-dashboard',
    submenu: [
      { id: 'userList', name: 'userList', label: '用户列表' },
      { id: 'userealList', name: 'userealList', label: '实名审核' },
      { id: 'userGrade', name: 'userGrade', label: '等级管理' },

    ]
  },
  // 主播管理
  {
    id: '18', label: '主播管理', icon: 'fa fa-dashboard',
    submenu: [
      { id: 'anchorlabel', name: 'anchorLabel', label: '主播标签' },
    ]
  },

  //直播管理
  {
    id: 'live', label: '直播管理', icon: 'fa fa-dashboard',
    submenu: [
      { id: 'liveList', name: 'liveList', label: '敏感词管理' },
    ]
  },
  // 商城管理
  {
    id: 'shop', label: '商城管理', icon: 'fa fa-dashboard',
    submenu: [
      { id: 'mountList', name: 'mountList', label: '坐骑管理' },
      { id: 'beautifulList', name: 'beautifulList', label: '靓号管理' },
      { id: 'headList', name: 'headList', label: '头像管理' },
    ]
  },
    //道具管理
    {
      id: 'props', label: '道具配置', icon: 'fa fa-dashboard',
      submenu: [
        { id: 'giftList', name: 'giftList', label: '礼物列表' },
      ]
    },

    //财务管理
    {
      id: 'finance', label: '财务管理', icon: 'fa fa-dashboard',
      submenu: [
        { id: 'rechargeList', name: 'rechargeList', label: '充值规则' },
        { id: 'recordList', name: 'recordList', label: '充值记录' },
      ]
    },
  // 反馈管理
  {
    id: 'feedback', label: '反馈管理', icon: 'fa fa-dashboard',
    submenu: [
      { id: 'idea', name: 'idea', label: '意见反馈' },
      { id: 'logout', name: 'logout', label: '注销反馈' },
      { id: 'reportList', name: 'reportList', label: '举报列表' },
    ]
  },
    // 家族管理
    {
      id: 'family', label: '家族管理', icon: 'fa fa-dashboard',
      submenu: [
        { id: 'familyList', name: 'familyList', label: '家族审核列表' },
      ]
    },


]
export default menus
