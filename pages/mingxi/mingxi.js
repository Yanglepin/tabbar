
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    select: false,
    tihuoWay: '全部交易类型',
    date: new Date().getFullYear() + "-" + ((new Date().getMonth() + 1) < 10 ? ("0" + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)),
    val: 0,
    accountList:[],
    page_index: 1,
    page_size: 15,
    page_count: 1,
    list:[]
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAccountList();
  },
  //充值
  getRecharge: function (e) {
    wx.navigateTo({
      url: '../recharge/recharge'//充值
    })
  },
  getDateTime:function(e) {
    console.log(e);
    var dateTime = e.detail.value;
    dateTime.substr('4','1');
    console.log(dateTime); 
    this.setData({ 
      date: dateTime
    });
    this.getAccountList();
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name;
    var value = e.currentTarget.dataset.value;
    this.setData({
      tihuoWay: name,
      select: false, 
      val: value
    })
    this.getAccountList();
  },

  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    // console.log("下拉刷新");
    that.setData({
      page_index: 1,
      list: []
    });
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/getAccountList',
      data: {
        token: app.globalData.openId,
        time: that.data.date,
        page_index: that.data.page_index,
        page_size: that.data.page_size,
        type: that.data.val
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          list: res.data.data
        });
        //设置数组元素  
        that.setData({
          list: that.data.list
        });
        // console.log(that.data.list);
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
  },
  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    // console.log("玩命加载中");
    // 页数+1  
    that.setData({
      page_index: that.data.page_index + 1
    });
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/getAccountList',
      data: {
        token: app.globalData.openId,
        time: that.data.date,
        page_index: that.data.page_index,
        page_size: that.data.page_size,
        type: that.data.val
      },
      method: "POST",
      success: function (res) {
        // 回调函数  
        var moment_list = [];
        for (var i = 0; i < res.data.data.length; i++) {
          moment_list.push(res.data.data[i]);
          if (i == res.data.data.length) {
            wx.showToast({
              title: '没有更多数据了',
            })
          }
        }
        // 设置数据  
        that.setData({
          list: that.data.list.concat(res.data.data)
        })
        // 隐藏加载框  
        wx.hideLoading(); 
      }
    })

  },



  //账单明细
  getAccountList: function () {
    let that = this;
    that.setData({
      page_index: 1,
      list: []
    });
    console.log(app.globalData.openId + "---" + that.data.date + "---" + that.data.page_index + "---" + that.data.page_size + "----" + that.data.val);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/getAccountList',
      data: {
        token: app.globalData.openId,
        time: that.data.date,
        page_index: that.data.page_index,
        page_size: that.data.page_size,
        type: that.data.val
      },
      method: 'POST',
      success: function (res) {
        console.log("账单明细" + JSON.stringify(res.data));
        that.setData({
          page_count: res.data.page_count,
          accountList: res.data,
          list: that.data.list.concat(res.data.data)
        })
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  navigateBack: function () {
    var self = this;
    var pages = getCurrentPages();
    if (pages.length == 1) {
      if (self.data.circleId && self.data.circleId > 0) {
        wx.redirectTo({
          url: '../index/index?circleId=' + self.data.circleId
            + '&circleName=' + (self.data.circleName || '')
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页  
    }
  },
})