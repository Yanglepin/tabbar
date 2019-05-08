
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    result:[]
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // console.log(options.out_trade_no);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/order/payWin',
      data: {
        token: app.globalData.openId,  
        out_trade_no: options.out_trade_no,
      },
      method: 'POST',
      success: function (res) {
        // console.log("支付结果:" + JSON.stringify(res.data));
        that.setData({
          result: res.data
        })
      }
    })
  },
  getIndex: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
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