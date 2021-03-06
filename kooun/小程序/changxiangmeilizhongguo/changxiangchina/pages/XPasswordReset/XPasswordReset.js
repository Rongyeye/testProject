// pages/XPasswordReset/XPasswordReset.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hNzJlNzkzNjBiOWJlMzk0N2FmY2FiZDZhNDA5YTkxYy5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmNtbndIQk4yN3BNOGE3MmU3OTM2MGI5YmUzOTQ3YWZjYWJkNmE0MDlhOTFjLnBuZw==',
    pic2:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hYTY1MGU4ODIzNTFhMWU5Njg4MTdjYWQyMzcyNDRjMC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmdwZnBSNlIxZnY5ZGFhNjUwZTg4MjM1MWExZTk2ODgxN2NhZDIzNzI0NGMwLnBuZw==',
    "code":'',
    "conPassword":'',
    "password":'',
    "phone":'',
    "indexA": true,
    "indexB": true
  },




  //获取验证码
getCode:function(e){
  let that = this;
  var a = this.data.phone;
  // var _this = this;
  var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
  if (this.data.phone == "") {  //判断phone是否为空
    wx.showToast({
      title: '手机号不能为空',
      icon: 'none',
      duration: 1000
    })
    return false;
  } else if (!myreg.test(this.data.phone)) {  //判断手机号是否是手机号
    wx.showToast({
      title: '请输入正确的手机号',
      icon: 'none',
      duration: 1000
    })
    return false;
  }else{
    wxRequest('/sms/sendSmsCode.wx', {phone:that.data.phone}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          codeStadus:true
        })

      } else {
        tips.confirm(res.data.message);
        wx.navigateTo({
          url: '/pages/XLogin/XLogin',
        })
      }
    });
  }
},



//获得输入框手机号码
getPhone:function(e){
  console.log(e)
  this.setData({
    phone:e.detail.value
  })
},


//获得输入框验证码
getInCode:function(e){
  this.setData({
    code: e.detail.value
  });
},

//获取输入框密码
getPassword:function(e){
  this.setData({
    password: e.detail.value
  });
},


//获取输入框再输一次密码
getConPassword:function(e){
  this.setData({
    conPassword: e.detail.value
  });
},

//提交新密码绑定方法
  commitNP: function () {
      let that = this;
      wxRequest('/my/resetPassword', { phone: that.data.phone, password: that.data.password, code: that.data.code, conPassword: that.data.conPassword }, function (res) {
        console.log(res)
        if (res.data.status == 'success') {
          tips.confirm(res.data.message);
          wx.switchTab({
            url: '/pages/Xindex/Xindex'
          });
        } else {
          if(res.data.message.target == "code"){
            tips.confirm(res.data.message);
          }else{
            tips.confirm(res.data.message);
            wx.switchTab({
              url: '/pages/Xindex/Xindex'
            });
          }
        }
      });
    
    },

    //眼睛变换
  eyeChang: function (e) {
    console.log(e)
    if (e.currentTarget.id == 0) {
      this.setData({
        indexA:!this.data.indexA
      })
    } else if (e.currentTarget.id == 1) {
      this.setData({
        indexB:!this.data.indexB
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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