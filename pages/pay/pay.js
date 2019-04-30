
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
    app.editTabbar();
    console.log(options.orderId);
  },
  radioChange: function (e) {
    console.log(e.detail.value);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})