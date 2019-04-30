// pages/myInfo/myInfo.js
const app = getApp();
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
  },
  //拨打电话 
  bindPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '15503793860', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  getMyinfo:function(){
    wx.navigateTo({
      url: '../myInfo/myInfo'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})