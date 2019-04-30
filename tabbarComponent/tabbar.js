// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getScan: function () {
      wx.scanCode({
        success: (res) => {
          console.log(res);
          var orderId = res.result;//商品编号
          //调用接口  参数1.商品 
          wx.navigateTo({
            url: '/pages/pay/pay?orderId=' + orderId
          })
        },fail:(res)=>{
          wx.showToast({
            title: '失败，请重试！',
          })
        }
      })
    }
  },
  
})
