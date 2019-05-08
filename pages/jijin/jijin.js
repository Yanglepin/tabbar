var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    content:[],
    count:[]
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.editTabbar(); 
    this.getjijin();
  },

  getjijin: function (e) {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/dreamPoint',
      data: {
        token: app.globalData.openId
      },
      method: "POST",
      success: function (res) {
        console.log(res);

        that.setData({
          content: res.data,
          count: res.data
        })
        var list = res.data.content;
        // WxParse.wxParse('content', 'html', list, that, 5);
        if (list != "") {
          // var list = list.replace(new RegExp("/upload", "g"), that.data.ImgUrl + "upload");
          WxParse.wxParse('content', 'html', list, that, 5);
          // console.log("图书简介:" + JSON.stringify(list));
        } else {
          WxParse.wxParse('content', 'html', "", that, 5);
        }
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
    } else {
      wx.navigateBack({ changed: true });//返回上一页  
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})