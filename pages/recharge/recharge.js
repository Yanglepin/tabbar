// pages/myInfo/myInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    isChecked: 0,//判断是否选中
    select: ["10元", "20元", "30元","50元"],
    nick_name: '',
    money:0.01,
    yue:0
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.personalData();
    this.getMoney();
  },
  onShow: function (options){
    this.getMoney();
  },
  choose: function (e) {
    var that = this;
    that.setData({
      isChecked: e.currentTarget.dataset.key,
      money: e.currentTarget.dataset.value
    })
  }, 
  //个人资料
  personalData: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/personalData',
      data: {
        token: app.globalData.openId
      },
      method: 'POST',
      success: function (res) {
        // console.log("个人资料" + JSON.stringify(res.data));
        that.setData({
          nick_name: res.data.nick_name
        })
      }
    })
  },
  //充值
  reCharge: function () {
    let that = this;
    console.log(app.globalData.openId + "-----" + that.data.money + "-----" + that.data.nick_name);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/order/chzhiCreate',
      data: {
        token: app.globalData.openId,
        money: that.data.money,
        user_name: that.data.nick_name,
        pay_type: 1
      },
      method: 'POST',
      success: function (res) {
       console.log(res.data); 
        if (res.data.code){
          wx.request({
            url: that.data.ImgUrl + 'index.php?s=/api/pay/getPayValue',
            data: {
              openid: app.globalData.openId,
              out_trade_no: res.data.code
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              wx.requestPayment({
                'timeStamp': String(res.data.timeStamp),
                'nonceStr': res.data.nonceStr,
                'package': res.data.package,
                'signType': 'MD5',
                'paySign': res.data.paySign,
                'success': function (res) {
                  console.log(res);
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '../result/result',
                    })
                  }, 800);
                },
                'fail': function (res) {
                  console.log(res);
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: '创建订单失败！',
          })
        }
       
      }
    })
  },
  //余额
  getMoney: function (e) {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/getAccountList',
      data: {
        token: app.globalData.openId
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data.money);
        that.setData({
          yue: res.data.money
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