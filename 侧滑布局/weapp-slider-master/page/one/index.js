// page/one/index.js
Page({
  data: {
    open: false,
    permissionList: [
  ],
    p: 9999,
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }

  },
  tap_ch: function(e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
    // let that = this;
    // that.setData({
    //   permissionList: wx.$permissionList
    // })
    // console.log("9999" + that.data.permissionList); //取值

  },
  onLoad(options) {
    let that = this;
    wx.$getPermissionList();
    console.log("第34次" + wx.$permissionList)
    that.setData({
      permissionList: wx.$permissionList
    })
    console.log("9999" + that.data.permissionList); //取值
  },
  // 展开折叠选择 
  changeToggle: function(e) {
    let that = this;
    let permissionList = this.data.permissionList
    var index = e.currentTarget.dataset.index;
    wx.$changeToggle(index);
    that.setData({
      permissionList: wx.$permissionList
    })

 
  },
})