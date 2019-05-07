//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    //tabbar
    movies: [],
    newsList:[],
    token: app.globalData.token
  }, 
  
  onLoad: function (options) {
    wx.hideTabBar();
    let that = this;
    this.getBanner();//轮播图
    this.getNewsList();//获取轮播公告
    app.editTabbar();
  },
  //获取首页轮播图   
  getBanner: function () { 
    let that = this;
    // console.log(wx.getStorageSync("ssid"));
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/noticeIndex',
      method: 'POST',
      success: function (res) {
        // console.log("获取首页轮播图" + JSON.stringify(res.data.data));
        that.setData({
          movies: res.data.data
        })
      }
    })
  },
  //获取轮播公告
  getNewsList: function () {
    let that = this;
    // console.log(wx.getStorageSync("ssid"));
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/index',
      method: 'POST',
      success: function (res) {
        // console.log("获取轮播公告" + JSON.stringify(res.data.data));
        that.setData({
          newsList: res.data.data
        })
      }
    })
  },
  //详情
  bindNewsListDetails: function (e) {
    var topic_id = e.currentTarget.dataset.topicid;
    wx.navigateTo({
      url: '../newsDetails/newsDetails?topic_id=' + topic_id //详情页
    })
  }, 

  bindBannerDetails: function (e) {
    var topic_id = e.currentTarget.dataset.topicid;
    wx.navigateTo({
      url: '../bannerDetails/bannerDetails?topic_id=' + topic_id //详情页
    })
  },
  

})
