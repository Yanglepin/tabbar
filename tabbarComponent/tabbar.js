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
          if (res.result){
            let qrUrl = decodeURIComponent(res.result);
            // console.log(qrUrl);
           
            console.log(this.getQueryString(qrUrl, 'id'));
            wx.navigateTo({
              url: '/pages/pay/pay?goodsid=' + this.getQueryString(qrUrl, 'id') + '&&code=' + this.getQueryString(qrUrl, 'gcode')
            })
            console.log(res.result);
            // wx.request({
            //   url: res.result,  
            //   method: 'get',
            //   success: function (res) {
            //     console.log(res);
            //     var goodsid = res.data.goods_id;//商品id
            //     var code = res.data.code;//商品编号  
            //     wx.navigateTo({
            //       url: '/pages/pay/pay?goodsid=' + goodsid + '&&code=' + code
            //     })
            //   }
            // })
          }else{
            wx.showToast({
              title: '请重新扫描！',
            })
            return false;
          }
          
        },fail:(res)=>{
          wx.showToast({
            title: '失败，请重试！',
          })
        }
      })
    },
    //解析链接
    getQueryString:function (url, name) {
      // console.log("url = " + url);
      // console.log("name = " + name);
      var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
      var r = url.substr(1).match(reg);
      if (r != null) {
        // console.log("r = " + r)
        // console.log("r[2] = " + r[2])
        return r[2];
      }
      return null;
    }

  },
  
})
