
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    money: 0
  },
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMoney();
  },
  onShow: function (options){
    this.getMoney();
  },
  //余额
  getMoney:function(e){
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/getAccountList',
      data: {
        token: app.globalData.openId
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data.money);
        if (res.data.money==null){
          res.data.money=0;
        }
       that.setData({
         money: res.data.money
       })
      }
    })
  },
  //充值
  getRecharge: function (e) {
    wx.navigateTo({
      url: '../recharge/recharge'//充值
    })
  },
  //查看明细
  getmingxi: function (e) {
    wx.navigateTo({
      url: '../mingxi/mingxi'//明细
    })
  },
  //圆梦基金
  getJijin:function(e){
    wx.navigateTo({
      url: '../jijin/jijin'//圆梦基金
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})