
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
    val: 0 
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
  getDateTime:function(e) {
    console.log(e);
    var dateTime = e.detail.value;
    dateTime.substr('4','1');
    console.log(dateTime); 
    this.setData({ 
      date: dateTime
    });
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