var app = getApp()
import util from '../../../util/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: ['排序', '代理级别'], //分类
    tab: [true, true],
    pinpaiList: [{
      'id': '1',
      'title': '创建时间升序'
    }, {
      'id': '2',
      'title': '创建时间降序'
    }, {
      'id': '3',
      'title': '代理级别升序'
    }, {
      'id': '4',
      'title': '代理级别降序'
    }],
    pinpai_id: 0, //品牌
    pinpai_txt: '',
    jiage_id: 0, //价格
    jiage_txt: '',
    xiaoliang_id: 0, //销量
    xiaoliang_txt: '',
    companyList: [{
      id: 1,
      name: "名字1"
    }, {
      id: 2,
      name: "名字2"
    }, {
      id: 3,
      name: "名字3"
    }, {
      id: 4,
      name: "名字4"
    }],
    msgList: [],
    height: 0,
    scrollY: true,
    onOff: true,
    checkboxAll: false,
    selectedCheckbox: [],
    filterdata: {}, //筛选条件数据
    showfilter: false, //是否显示下拉筛选
    showfilterindex: null, //显示哪个筛选类目
    sortindex: 0, //排序索引
    sortid: null, //排序id
    filter: {},
    conferencelist: [{
      id: 1,
      name: "名字1"
    }, {
      id: 2,
      name: "名字2"
    }, {
      id: 3,
      name: "名字3"
    }, {
      id: 4,
      name: "名字4"
    }], //会议室列表列表
    scrolltop: null, //滚动位置
    page: 0, //分页

    objectArray: [{
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    array: ['请选择', '年卡', '4G', '季卡', '月卡'],
    index: 0,
    startDate: '2016-09-01',
    endDate: '2017-09-01',

  },
  swipeCheckX: 35, //激活检测滑动的阈值
  swipeCheckState: 0, //0未激活 1激活
  maxMoveLeft: 185, //消息列表项最大左滑距离
  correctMoveLeft: 224, //显示菜单时的左滑距离
  thresholdMoveLeft: 75, //左滑阈值，超过则显示菜单
  lastShowMsgId: '', //记录上次显示菜单的消息id
  moveX: 0, //记录平移距离
  showState: 0, //0 未显示菜单 1显示菜单
  touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
  swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
  onLoad: function() {

    this.fetchConferenceData();
    this.fetchFilterData();

    this.pixelRatio = app.data.deviceInfo.pixelRatio;
    var windowHeight = app.data.deviceInfo.windowHeight;
    var height = windowHeight;
    for (var i = 0; i < 5; i++) {
      var msg = {};
      msg.carid = '' + '沪D086' + i + 1;
      msg.msgText = '10801:10001'
      msg.id = 'id-' + i + 1;
      msg.headerImg = '../../img/car.png';
      msg.siteImg = '../../img/site.png';
      msg.checkbox = false;
      this.data.msgList.push(msg);
    }
    this.setData({
      msgList: this.data.msgList,
      height: height
    });
  },

  // 选项卡
  filterTab: function(e) {
    var data = [true, true],
      index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  //筛选项点击操作
  filter: function(e) {
    var self = this,
      id = e.currentTarget.dataset.id,
      txt = e.currentTarget.dataset.txt,
      tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true],
          tabTxt: tabTxt,
          pinpai_id: id,
          pinpai_txt: txt
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true],
          tabTxt: tabTxt,
          jiage_id: id,
          jiage_txt: txt
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true],
          tabTxt: tabTxt,
          xiaoliang_id: id,
          xiaoliang_txt: txt
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function() {
    //调用数据接口，获取数据


  },
  queryUser: function(e) {
    console.log("查询用户");
  },
  ontouchstart: function(e) {
    console.log("开始接触");
    if (this.showState === 1) {
      this.touchStartState = 1;
      this.showState = 0;
      this.moveX = 0;
      this.translateXMsgItem(this.lastShowMsgId, 0, 200);
      this.lastShowMsgId = "";
      return;
    }
    this.firstTouchX = e.touches[0].clientX;
    this.firstTouchY = e.touches[0].clientY;
    if (this.firstTouchX > this.swipeCheckX) {
      this.swipeCheckState = 1;
    }
    this.lastMoveTime = e.timeStamp;
  },

  ontouchmove: function(e) {
    console.log("滑动中");
    if (this.swipeCheckState === 0) {
      return;
    }
    //当开始触摸时有菜单显示时，不处理滑动操作
    if (this.touchStartState === 1) {
      return;
    }
    var moveX = e.touches[0].clientX - this.firstTouchX;
    var moveY = e.touches[0].clientY - this.firstTouchY;
    //已触发垂直滑动，由scroll-view处理滑动操作
    if (this.swipeDirection === 2) {
      return;
    }
    //未触发滑动方向
    if (this.swipeDirection === 0) {
      console.log(Math.abs(moveY));
      //触发垂直操作
      if (Math.abs(moveY) > 4) {
        this.swipeDirection = 2;

        return;
      }
      //触发水平操作
      if (Math.abs(moveX) > 4) {
        this.swipeDirection = 1;
        if (moveX < 0) {
          var text = "向左滑动";
          console.log(text);
          this.setData({
            scrollY: false
          });
        } else if (moveX > 0) {
          var text = "向右滑动";
          console.log(text);


          var pages = getCurrentPages(); // 当前页面
          var beforePage = pages[pages.length - 2]; // 前一个页面
          // console.log("beforePage");
          // console.log(beforePage);
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
       

        }


      } else {
        return;
      }

    }
    //禁用垂直滚动
    // if (this.data.scrollY) {
    //   this.setData({scrollY:false});
    // }

    this.lastMoveTime = e.timeStamp;
    //处理边界情况
    if (moveX > 0) {
      moveX = 0;
    }
    //检测最大左滑距离
    if (moveX < -this.maxMoveLeft) {
      moveX = -this.maxMoveLeft;
    }
    this.moveX = moveX;
    this.translateXMsgItem(e.currentTarget.id, moveX, 0);
  },
  ontouchend: function(e) {
    console.log("接触结束");
    this.swipeCheckState = 0;
    var swipeDirection = this.swipeDirection;
    this.swipeDirection = 0;
    if (this.touchStartState === 1) {
      this.touchStartState = 0;
      this.setData({
        scrollY: true
      });
      return;
    }
    //垂直滚动，忽略
    if (swipeDirection !== 1) {
      return;
    }
    if (this.moveX === 0) {
      this.showState = 0;
      //不显示菜单状态下,激活垂直滚动
      this.setData({
        scrollY: true
      });
      return;
    }
    if (this.moveX === this.correctMoveLeft) {
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.id;
      return;
    }
    if (this.moveX < -this.thresholdMoveLeft) {
      this.moveX = -this.correctMoveLeft;
      this.showState = 1;
      this.lastShowMsgId = e.currentTarget.id;
    } else {
      this.moveX = 0;
      this.showState = 0;
      //不显示菜单,激活垂直滚动
      this.setData({
        scrollY: true
      });
    }
    this.translateXMsgItem(e.currentTarget.id, this.moveX, 500);
    //this.translateXMsgItem(e.currentTarget.id, 0, 0);
  },
  /**
   * 长按触发条件
   */
  handleLongPress: function(e) {
    console.log("长按");
    this.setData({
      onOff: false
    });
  },
  /**
   * 点击触发条件
   */
  handleClick: function(e) {
    console.log("点击");
    wx.navigateTo({
      url: '../userDetail/userDetail',
    })
  },
  onAddMsgTap: function(e) {
    console.log("添加成员************");
    this.deleteMsgItem(e);
  },
  onDeleteMsgLongtap: function(e) {
    console.log("长按删除************");
    console.log(e);
  },
  onEditMsgTap: function(e) {
    console.log("编辑成员************");
    console.log(e);
  },
  onMarkMsgLongtap: function(e) {
    console.log("长按修改************");
    console.log(e);
  },
  onViewMsgTap: function(e) {
    console.log("查看代理商************");
    console.log(e);
  },
  getItemIndex: function(id) {
    var msgList = this.data.msgList;
    for (var i = 0; i < msgList.length; i++) {
      if (msgList[i].id === id) {
        return i;
      }
    }
    return -1;
  },
  deleteMsgItem: function(e) {
    var animation = wx.createAnimation({
      duration: 200
    });
    animation.height(0).opacity(0).step();
    this.animationMsgWrapItem(e.currentTarget.id, animation);
    var s = this;
    setTimeout(function() {
      var index = s.getItemIndex(e.currentTarget.id);
      s.data.msgList.splice(index, 1);
      s.setData({
        msgList: s.data.msgList
      });
    }, 200);
    this.showState = 0;
    this.setData({
      scrollY: true
    });
  },
  translateXMsgItem: function(id, x, duration) {
    var animation = wx.createAnimation({
      duration: duration
    });
    animation.translateX(x).step();
    this.animationMsgItem(id, animation);
  },
  animationMsgItem: function(id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'msgList[' + index + '].animation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  animationMsgWrapItem: function(id, animation) {
    var index = this.getItemIndex(id);
    var param = {};
    var indexString = 'msgList[' + index + '].wrapAnimation';
    param[indexString] = animation.export();
    this.setData(param);
  },
  addAction: function(e) {
    console.log("添加action")
    this.setData({
      onOff: true
    });
  },
  delAction: function(e) {
    var selectedCheckbox = this.data.selectedCheckbox;

    if (selectedCheckbox.length == 0) {
      console.log("当前没有选中的条数");
    } else {
      console.log("当前选中的条数:" + selectedCheckbox.length);
    }
    console.log("删除action");


    this.setData({
      onOff: true
    });
  },
  cancelAction: function(e) {
    console.log("取消action")
    this.setData({
      onOff: true
    });
  },
  // 全选
  checkboxAll: function(e) {
    console.log("全选/取消" + e);
    var selectedAllStatus = this.data.checkboxAll;
    var msgList = this.data.msgList;
    var selectedCheckbox = [];
    var flag = false;
    if (!selectedAllStatus) {
      flag = true;
    }
    for (var i = 0; i < msgList.length; i++) {
      msgList[i].checkbox = flag;
      if (flag) {
        selectedCheckbox.push(msgList[i].id);
      }
    }
    console.log("数组的大小" + msgList.length);
    console.log("选中的大小" + selectedCheckbox.length);
    this.setData({
      checkboxAll: !selectedAllStatus,
      msgList: msgList,
      selectedCheckbox: selectedCheckbox
    });

  },
  // 列表块复选框
  checkboxSingle: function(e) {
    var selectedCheckbox = this.data.selectedCheckbox;
    var checkboxAll = this.data.checkboxAll;
    var msgList = this.data.msgList;
    var selectedAllStatus = false;
    var m = msgList.length;
    var n = selectedCheckbox.length;
    console.log("数组大小" + m);
    console.log("选中" + n);
    var id = e.currentTarget.id;
    var d = id.split(",");
    id = d[0];

    var checkboxStatus = d[1];
    if (checkboxStatus == 'false') {
      checkboxStatus = false;
    } else {
      checkboxStatus = true;
    }
    if (!checkboxStatus) {
      selectedCheckbox.push(id);
      var index = this.getItemIndex(id);
      msgList[index].checkbox = true;
    } else {
      var isExist = selectedCheckbox.indexOf(id);
      if (isExist < 0) {
        console.log("selectedCheckbox没有元素:" + id);
      } else {
        selectedCheckbox.splice(isExist, 1);
        var index = this.getItemIndex(id);
        msgList[index].checkbox = false;
      }

    }

    console.log("最后选中" + selectedCheckbox.length+"/m="+m);
    n = selectedCheckbox.length;
    if (m == n) {
      console.log("达到全选条件");
      selectedAllStatus = true;
    }

    this.setData({
      checkboxAll: selectedAllStatus,
      msgList: msgList,
      selectedCheckbox: selectedCheckbox
    });

  },


  fetchFilterData: function() { //获取筛选条件
    this.setData({
      filterdata: {
        "sort": [{
            "id": 0,
            "title": "价格最低"
          },
          {
            "id": 1,
            "title": "容量最多"
          },
          {
            "id": 2,
            "title": "设备最全"
          },
        ],
        "contain": [{
            "id": 0,
            "title": "4人以下"
          },
          {
            "id": 1,
            "title": "5-8人"
          },
          {
            "id": 2,
            "title": "8-12人"
          },
          {
            "id": 3,
            "title": "12-20人"
          },
          {
            "id": 4,
            "title": "20人以上"
          },
        ],
        "equipments": [{
            "id": 0,
            "title": "投影仪"
          },
          {
            "id": 1,
            "title": "欢迎屏"
          },
          {
            "id": 2,
            "title": "视屏设备"
          },
          {
            "id": 3,
            "title": "电话会议设备"
          },
          {
            "id": 4,
            "title": "钢笔"
          },
          {
            "id": 5,
            "title": "麦克风"
          },
        ],
      }
    })
  },
  fetchConferenceData: function() { //获取会议室列表
    const perpage = 10;
    this.setData({
      page: this.data.page + 1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page - 1) * perpage; i < page * perpage; i++) {
      newlist.push({
        "id": i + 1,
        "name": "A区会议室" + (i + 1),
        "contain": Math.floor(Math.random() * 50),
        "area": Math.floor(Math.random() * (200 - 20) + 20),
        "price": Math.floor(Math.random() * 50) * 10,
        "equipments": util.getRandomArray(["投影仪", "欢迎屏", "视屏设备", "电话会议设备", "钢笔", "麦克风"], Math.floor(Math.random() * 6)),
        "imgurl": "http://pic.58pic.com/58pic/12/34/51/85d58PICkjf.jpg"
      })
    }
    this.setData({
      conferencelist: this.data.conferencelist.concat(newlist)
    })
  },
  setFilterPanel: function(e) { //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
  },
  hideFilter: function() { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  setSort: function(e) { //选择排序方式
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      sortindex: dataset.sortindex,
      sortid: dataset.sortid
    })
    console.log('排序方式id：' + this.data.sortid);
  },
  inputStartTime: function(e) {
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        starttime: e.detail.value
      })
    }) //输入会议开始时间
  },
  inputEndTime: function(e) {
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        endtime: e.detail.value
      })
    }) //输入会议结束时间
  },
  chooseContain: function(e) { //选择会议室容纳人数
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        containid: e.currentTarget.dataset.id
      })
    })
    console.log('选择的会议室容量id：' + this.data.filter.containid);
  },
  chooseEquipment: function(e) { //选择会议室设备
    const equipments = this.data.filter.equipments || [];
    const eid = e.currentTarget.dataset.id;
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        equipments: equipments.indexOf(eid) > -1 ? equipments.filter(i => i != eid) : equipments.concat([eid])
      })
    })
    console.log('选择的会议室设备id：' + this.data.filter.equipments);
  },
  setClass: function(e) { //设置选中设备样式
    return this.data.filter.equipments.indexOf(e.currentTarget.dataset.id) > -1 ? 'active' : ''
  },
  cleanFilter: function() { //清空筛选条件
    console.log("清空筛选");
    this.setData({
      filter: {}
    })
  },
  submitFilter: function() { //提交筛选条件
    console.log("提交筛选");
    console.log(this.data.filter);
  },
  scrollHandle: function(e) { //滚动事件
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },
  goToTop: function() { //回到顶部
    this.setData({
      scrolltop: 0
    })
  },
  scrollLoading: function() { //滚动加载
    this.fetchConferenceData();
  },
  onPullDownRefresh: function() { //下拉刷新
      this.setData({
        page: 0,
        conferencelist: []
      })
      this.fetchConferenceData();
      this.fetchFilterData();
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000)
    }

    ,
  detail: function(event) {
    let data = event.currentTarget.dataset
    let total = this.data.total
    let menus = this.data.companyList
    console.log(event.currentTarget.dataset.text)
    console.log("9999999999" + menus);
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  inputStartTime: function(e) {
    console.log('picker发送选择改变，start携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  inputEndTime: function(e) {
    console.log('picker发送选择改变，end携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
})