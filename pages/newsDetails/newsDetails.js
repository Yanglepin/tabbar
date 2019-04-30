var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    content: [],
    title: ''
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContent(options.topic_id); //获取详情
  },
  //获取详情
  getContent: function (options) {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/indexDetails&SSID=' + wx.getStorageSync("ssid"),
      data: {
        id: options
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          content: res.data,
          title: res.data.notice_title,
        });
        var list = res.data.notice_content;
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