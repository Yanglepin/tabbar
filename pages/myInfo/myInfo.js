// pages/myInfo/myInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    statusBarHeight: app.globalData.statusBarHeight,
    avatarUrl:'',
    // nickName:'',
    info:{},
    img:'',
    nick_name:'',//昵称
    signature:'', //个签  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let that = this; 
    that.personalData(); //个人资料 
    that.setData({
      avatarUrl: options.avatarUrl,
      nick_name: options.nickName
    });
    // console.log(options.nickName);
    // console.log(options.avatarUrl); 
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
        that.setData({
          info: res.data,
          img: res.data.user_headimg,
          nick_name: res.data.nick_name
        })
      } 
    }) 
  },
  //上传头像
  uploadImg: function(){
    // console.log("00");
    let that = this;
    wx.chooseImage({
      success(res) {
        console.log(res);
        // return false; 
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://ndj.xieenguoji.com/index.php?s=/api/member/uploadimg', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            console.log(res); 
            that.setData({
              img:res.data
            })
          } 
        })
      }  
    })
  },
  // 获取昵称 
  nameInput: function (e) {
    var nick_name = e.detail.value;
    this.nick_name = nick_name;
    this.setData({
      nick_name: e.detail.value
    })
    // console.log("获取昵称" + e.detail.value);
  },
  // 获取个性签名
  gqianInput: function (e) {
    var signature = e.detail.value;
    this.signature = signature;
    this.setData({
      signature: e.detail.value
    })
    // console.log("获取个性签名" + e.detail.value);
  },
  //修改资料
  updateInfo: function() { 
    let that = this;
    var Img='';
    if (that.data.img==''){
      Img = that.data.avatarUrl;
    }else{
      Img = that.data.img;
    } 
    if (that.data.signature == '') { 
      that.data.signature = that.data.info.signature;
    }
    console.log(that.data.nick_name + "----" + that.data.signature + "----" + that.data.info.uid+"---"+Img);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/updateMemberZiLiao',
      data:{
        token: app.globalData.openId,
        uid: that.data.info.uid,
        nick_name: that.data.nick_name,
        signature: that.data.signature, 
        user_headimg: Img
      },
      method: 'POST',
      success: function (res) {
        console.log(JSON.stringify(res));
        if(res.data.code==1){
          wx.showToast({
            title: '操作成功',
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../member/member',
            })
          },800)
        }else{
          wx.showToast({
            title: '操作失败',
          })
          return false;
        }
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})