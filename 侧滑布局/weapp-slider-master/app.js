App({
  data: {
    deviceInfo: {}
  },
  onLaunch: function () {
    this.data.deviceInfo = wx.getSystemInfoSync();
    console.log(this.data.deviceInfo);
    wx.$data = 'test data';
    wx.$permissionList =[];
    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  }
});

/**
 * 后台请求权限数据
 */
wx.$ajax = function () {
  console.log('自己定义的网络请求方法')
}

/**
 * 后台请求权限数据
 */
wx.$getPermissionList = function () {
  console.log('自己定义的网络请求方法');
  wx.$permissionList = [{
    name: "首页",
    unflod: false,
    list: [{
      name: "用户列表",
      url: "../user/userList/userList"
    }, {
      name: "1-2",
      url: "../redirect/redirect"
    }]
  }, {
    name: "系统管理",
    unflod: false,
    list: [{
      name:"用户管理",
      url: "../redirect/redirect"
    }, {
      name: "代理商管理",
      url: "../redirect/redirect"
    }]
    }, {
      name: "系统监控",
      unflod: false,
      list: [{
        name: "操作日志",
        url: "../redirect/redirect"
      }, {
        name: "安全日志",
        url: "../redirect/redirect"
      }]
    }];
}
wx.$changeToggle = function (index) {
  console.log('index='+index);
  let permissionList = wx.$permissionList;
  if (permissionList[index].unflod) {
    permissionList[index].unflod = false;
  } else {
    permissionList[index].unflod = true;
  }
  wx.$permissionList=permissionList;
};