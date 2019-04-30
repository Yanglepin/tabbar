
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    latitude: "",
    longitude: "",
    tabbar:{},
    niudanji:[],  
    page_index: 1, 
    page_size: 15, 
    page_count: 1, 
    address:''
  },  
  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    this.GPSLocation();  
  },
   //获取经纬度
  GPSLocation:function(){
    let that = this; 
    //wgs84 gcj02
    wx.getLocation({ 
      type:'gcj02',
      success: (res) => {
        console.log(res);
        var latitude = res.latitude + 0.001276;
        var longitude = res.longitude + 0.006256;
        that.setData({ 
          latitude: latitude,
          longitude: longitude
        }); 
        that.getNiudanji(); 
      }
    })
  },
  // 下拉刷新  
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    // console.log("下拉刷新");
    that.setData({
      page_index: 1, 
      lvList: []
    });
    console.log(that.data.latitude + "--" + that.data.longitude);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/myNearbyshebei',
      data: {
        lng: that.data.longitude,
        lat: that.data.latitude,
        page_index: that.data.page_index,
        page_size: that.data.page_size
      },
      method: "POST", 
      success: function (res) {
        // console.log(res.data.data);
        that.setData({
          niudanji: res.data.data
        });
        //设置数组元素  
        that.setData({
          niudanji: that.data.niudanji
        });
        console.log(that.data.niudanji);
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    })
  },
  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    // console.log("玩命加载中");
    // 页数+1  
    that.setData({
      page_index: that.data.page_index + 1
    });
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/myNearbyshebei',
      data: {
        lng: that.data.longitude,
        lat: that.data.latitude,
        page_index: that.data.page_index,
        page_size: that.data.page_size
      },
      method: "POST",
      success: function (res) {
        // 回调函数  
        var moment_list = [];
        for (var i = 0; i < res.data.data.length; i++) {
          moment_list.push(res.data.data[i]);
          if (i == res.data.data.length) {
            wx.showToast({
              title: '没有更多数据了',
            })
          }
        }
        // 设置数据  
        that.setData({
          niudanji: that.data.niudanji.concat(res.data.data)
        })
        // 隐藏加载框  
        wx.hideLoading();
      }
    })

  },  
  //获取扭蛋机列表 
  getNiudanji: function () {
    let that = this;
    console.log(that.data.latitude +"--"+ that.data.longitude);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/myNearbyshebei',
      data:{
        lng: that.data.longitude,
        lat: that.data.latitude,
        page_index: that.data.page_index,
        page_size: that.data.page_size
      },
      method: 'POST',
      success: function (res) { 
        // console.log("获取扭蛋机列表" + JSON.stringify(res.data.address));
        that.setData({
          niudanji: that.data.niudanji.concat(res.data.data),
          page_count: res.data.page_count,
          address: res.data.address
        }) 
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
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
  }

})