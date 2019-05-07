//app.js
App({
  data:{
    URL: "https://ndj.xieenguoji.com/", 
    // token: '',
  },
  onLaunch: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();
    // 登录
    wx.login({ 
      success: res => { 
        let that =this;
        // console.log("code:" + JSON.stringify(res));
        if (!that.globalData.openid){
          wx.request({
            url: that.data.URL + 'index.php?s=/api/login/getOpenIdByXiaoChengXuInCode',
            method: 'POST', 
            data: {
              code: res.code 
            },
            success: function (res) {  
              console.log("获取openid：" + res.data.openid);
              that.globalData.openId = res.data.openid;
              if (that.globalData.userInfo==null){
                var haderImg = 'https://ndj.xieenguoji.com/upload/goods_qrcode/goods_qrcode_27.png';
              }else{
                var haderImg = that.globalData.userInfo.avatarUrl;
              }
              console.log(that.globalData.userInfo); 
              wx.request({ 
                url: that.data.URL + 'index.php?s=/api/login/loginByOpenId',
                method: 'POST', 
                data: {
                  openId: that.globalData.openId,
                  haderImg: haderImg
                },
                success: function (res) { 
                  that.globalData.token = res.data.token;
                  console.log("获取token:" + that.globalData.token);
                }
              }) 
            }
          })
        }
      }
    })
   
    // 获取用户信息 
    wx.getSetting({ 
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // console.log("获取用户信息：" + JSON.stringify(res.userInfo));
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          // wx.openSetting({  
          //   success: (res) => {
          //    console.log("引导授权："+res);
          //   }
          // })      
        }  
      }
    })
   
  },
   
  onShow: function () { 
    let that = this;
    //隐藏系统tabbar 
    wx.hideTabBar();
   
  },
  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  
  globalData: {
    systemInfo: null,//客户端设备信息
    userInfo: null,
    openId: "",
    token:"",
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#868686",
      "selectedColor": "#07aefc",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "iconPath": "icon/tab1.png",
          "selectedIconPath": "icon/tab1-blue.png",
          "text": "首页" 
        },
        {
          "pagePath": "/pages/middle/middle",
          "iconPath": "icon/tab2.png",
          "isSpecial": true,
          "text": "扫一扫"
        },
        {
          "pagePath": "/pages/member/member",
          "iconPath": "icon/tab3.png",
          "selectedIconPath": "icon/tab3-blue.png",
          "text": "我的"
        }
      ]
    }
  }
})