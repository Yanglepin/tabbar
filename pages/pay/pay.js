
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    num: 1,  //购买数量
    payType: 1,  //支付方式
    details: [],
    mount: 0,
    goods_id:'',
    code:'',
    out_trade_no: '',
    money:0
    // openid:''
  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) { 
    let that = this;
    // 微信扫码
    // var scene = decodeURIComponent(options.scene)//参数二维码传递过来的参数
    // console.log("参数二维码传递过来的参数:" + scene);
    // if (options.q !== undefined) {
      
    //   var scan_url = decodeURIComponent(options.q);
    //   console.log(scan_url);
    //   that.setData({
    //     goods_id: this.getQueryString(scan_url, 'id'),
    //     code: this.getQueryString(scan_url, 'gcode')
    //   })
    // } else {
    //   that.setData({
    //     goods_id: options.goodsid,
    //     code: options.code
    //   })
    // }
    
    // var scan_url = decodeURIComponent(options.scene);

    // wx.showModal({
    //   title: scan_url,
    //   content: scan_url, 
    // })
    // var query = options.query.gcode;
    // wx.showModal({
    //   title: scan_url,
    //   content: scan_url + '---' + options.query + '----' + this.getQueryString(scan_url, 'gcode'),
    // })
    
    if (options.scene != undefined) {
      var scan_url = decodeURIComponent(options.scene);
      console.log(scan_url);
      that.setData({
        // goods_id: this.getQueryString(scan_url, 'id'),
        code: this.getQueryString(scan_url, 'gcode')
      })
    } else {
      that.setData({
        // goods_id: options.goodsid, 
        code: options.gcode
      })
    }
    // console.log("goods_id:" + that.data.goods_id);
    console.log("code:" + that.data.code);
    console.log("获取token:" + app.globalData.token);
    app.editTabbar();
    this.getMoney();
    //商品详情
    // var goods_id = options.goodsid;
    // var code = options.code;
    // that.setData({
    //   goods_id: goods_id,
    //   // openid: app.globalData.openId
    // })
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/order/goodsDetial',
      data: {
        // goods_id: that.data.goods_id, 
        code: that.data.code,
        token: app.globalData.openId  
      },
      method: 'POST',
      success: function (res) { 
        console.log(res);
        that.setData({
          details: res.data,
          goods_id: res.data.goods_id, 
          // mount: res.data.price
        })
        
      }
    })
  },

  //选择支付方式  1钱包 2微信
  radioChange: function (e) {
    let that = this;
    that.setData({
      payType: e.detail.value
    })
  },
  //数量增加
  add: function (e) {
    let that= this;
    var count = e.target.dataset.num;
    var stock = e.target.dataset.stock;
    var price = e.target.dataset.price;
    if (count < stock){
      count++;
      that.setData({
        num: count,
        // mount: count * price
      })
    }else{
      wx.showToast({
        title: '库存不足~',
      })
      return false;
    }
  }, 
  //数量减少
  cut: function (e) {
    let that = this;
    var count = e.target.dataset.num;
    var price = e.target.dataset.price;
    if(count==1){
      wx.showToast({
        title: '不能再减少啦~',
      })
      return false;
    }else{
      count--;
      that.setData({
        num: count,
        // mount: count * price
      })
    }
  },
  //立即支付
  getPay: function () { 
    let that = this;
    console.log("获取token:" + app.globalData.openId);
    console.log(app.globalData.token + "-----" + that.data.goods_id + "-----" + that.data.num + "-----" + that.data.payType);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/order/orderCreate',
      data: {
        token: app.globalData.openId,
        goods_id: that.data.goods_id,
        num: that.data.num,
        use_coupon: 0, //优惠券id 
        pay_type: that.data.payType  //支付方式 1微信 5余额支付
      },
      method: 'POST',
      success: function (res) { 
        console.log("立即支付:" + JSON.stringify(res));
        // console.log(res.data.code);
        // console.log(app.globalData.openId);
        that.setData({
          out_trade_no: res.data.code
        })
        if (res.data.code>0){
          wx.request({
            url: that.data.ImgUrl + 'index.php?s=/api/pay/getPayValue',
            data: {
              out_trade_no: res.data.code,
              openid: app.globalData.openId
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              // console.log(typeof (res.data.timeStamp));
              if(res.data==1){
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../paySuccess/paySuccess?out_trade_no=' + that.data.out_trade_no,
                  })
                }, 800);
              } else if (res.data == -1){
                  wx.showToast({
                    title: '支付失败，请重试！',
                  })
                  return false;
              }else{
                wx.requestPayment({
                  'timeStamp': String(res.data.timeStamp),
                  'nonceStr': res.data.nonceStr,
                  'package': res.data.package,
                  'signType': 'MD5',
                  'paySign': res.data.paySign,
                  'success': function (res) {
                    console.log(res);
                    setTimeout(function () {
                      wx.navigateTo({
                        url: '../paySuccess/paySuccess?out_trade_no=' + that.data.out_trade_no,
                      })
                    }, 800);
                  },
                  'fail': function (res) {
                    // alert(JSON.stringify(res));
                    console.log(res);
                  }
                })
              }

            }
          })
        }
      }
    })
  },
  //余额
  getMoney: function (e) {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/getAccountList',
      data: {
        token: app.globalData.openId
      },
      method: "POST",
      success: function (res) {
        // console.log(res.data.money);
        if (res.data.money == null) {
          res.data.money = 0;
        }
        that.setData({
          money: res.data.money
        })
      }
    })
  },
  //解析链接
  getQueryString: function (url, name) {
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
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})