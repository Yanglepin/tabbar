var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    showIndex: 0,
    ServiceList:[]
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getServiceList();
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
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
   //获取列表 
  getServiceList: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/userService',
      data:{

      },
      method: 'POST',
      success: function (res) { 
        // console.log("获列表" + JSON.stringify(res.data.data));
        var _data = res.data.data;
        var _len = _data.length;
        for (var i = 0; i < _len; i++) {
          WxParse.wxParse('content' + i, 'html', _data[i].content, that);
          if (i === _len - 1) {
            WxParse.wxParseTemArray("askItemsArr", 'content', _data.length, that)
          }
        }
        that.setData({
          ServiceList: res.data.data
        })
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
  }
})