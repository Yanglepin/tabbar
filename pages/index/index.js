//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    //tabbar
    tabbar: {},
    movies: {}
  },
  
  onLoad: function (options) {
    let that = this;
    this.getBanner();//轮播图
    app.editTabbar();
  },
  //获取首页轮播图   
  getBanner: function () {
    let that = this;
    // console.log(wx.getStorageSync("ssid"));
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/index',
      method: 'POST',
      success: function (res) {
        // console.log("获取首页轮播图" + JSON.stringify(res.data.adv_list));
        that.setData({
          movies: res.data.adv_list
        })
      }
    })
  }
})
