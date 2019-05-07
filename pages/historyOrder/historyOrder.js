
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    page_index: 1,
    page_size: 15,
    page_count: 1, 
    orderList:[]
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder();
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/orderList',
      data: {
        token: app.globalData.openId,
        page_index: that.data.page_index,
        page_size: that.data.page_size
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          orderList: res.data.data
        });
        //设置数组元素  
        that.setData({
          orderList: that.data.orderList
        });
        console.log(that.data.orderList);
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
      url: that.data.ImgUrl + 'index.php?s=/api/member/orderList',
      data: {
        token: app.globalData.openId,
        page_index: that.data.page_index,
        page_size: that.data.page_size
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
          orderList: that.data.orderList.concat(res.data.data)
        })
        // 隐藏加载框  
        wx.hideLoading();
      }
    })

  },  
  //获取订单列表 
  getOrder: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/orderList',
      data: {
        token: app.globalData.openId,
        page_index: that.data.page_index,
        page_size: that.data.page_size
      },
      method: 'POST',
      success: function (res) {
        console.log("获取订单列表" + JSON.stringify(res.data.data));
        that.setData({
          orderList: that.data.orderList.concat(res.data.data),
        })
      }, 
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载 
        wx.stopPullDownRefresh() //停止下拉刷新
      }
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
      // else {
      //   wx.switchTab({
      //     url: "../viewList/viewList"
      //   });
      // }
    } else {
      wx.navigateBack({ changed: true });//返回上一页  
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})