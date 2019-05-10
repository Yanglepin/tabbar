// pages/myInfo/myInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    info: {},
    img: '',
    nick_name: '',//昵称
  },
  /**  
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar();
    app.editTabbar(); 
    // console.log("获取token:" + app.globalData.token);
    this.personalData();
  },
  onShow(){
    this.personalData();
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
  /**
 * 获取用户信息
 */
  bingGetUserInfo: function (e) {
    console.log(e.detail);
    var nickName = e.detail.userInfo.nickName;
    var avatarUrl = e.detail.userInfo.avatarUrl;
    // console.log(nickName);
    // console.log(avatarUrl);
    wx.navigateTo({
      url: '../myInfo/myInfo?nickName=' + nickName + '&&avatarUrl=' + avatarUrl
    })
  },
  //个人资料
  personalData: function () { 
    let that = this; 
    console.log(app.globalData.token);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/personalData',
      data: {
        token: app.globalData.openId
      },
      method: 'POST', 
      success: function (res) { 
        console.log("个人资料" + JSON.stringify(res.data));
        var img = res.data.user_headimg
        img.substr(0, 1);
        if (img.substr(0, 1)=="u"){
          res.data.user_headimg = that.data.ImgUrl + res.data.user_headimg;
        }
        that.setData({
          info: res.data,
          img: res.data.user_headimg, 
          nick_name: res.data.nick_name
        })
        console.log(that.data.img); 
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})