
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,

  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //充值
  getRecharge: function (e) {
    wx.navigateTo({
      url: '../recharge/recharge'//充值
    })
  },
  getmingxi: function (e) {
    wx.navigateTo({
      url: '../mingxi/mingxi'//明细
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