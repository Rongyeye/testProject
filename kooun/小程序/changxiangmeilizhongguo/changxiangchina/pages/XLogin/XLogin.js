// pages/XLogin/XLogin.js
import {wxRequest} from '../../utils/wxRequest.js';
import {tips} from '../../utils/tip.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //打勾
    gou2:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS84NGIzMzQ2ODEyMGI5ZTM5MDA0Njg1MDUzYTBjZWZmYy5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmQyNm12UDdWMWxnQzg0YjMzNDY4MTIwYjllMzkwMDQ2ODUwNTNhMGNlZmZjLnBuZw==',
    gou1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hMGZkZWJlNzkyYzQzNTU1ZDk3NmMzZDAyMzhhYzU5Yi5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLlcyZjRaSGoyNFRZN2EwZmRlYmU3OTJjNDM1NTVkOTc2YzNkMDIzOGFjNTliLnBuZw==',
    //睁眼闭眼
    pic1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hNzJlNzkzNjBiOWJlMzk0N2FmY2FiZDZhNDA5YTkxYy5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmNtbndIQk4yN3BNOGE3MmU3OTM2MGI5YmUzOTQ3YWZjYWJkNmE0MDlhOTFjLnBuZw==',
    pic2:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hYTY1MGU4ODIzNTFhMWU5Njg4MTdjYWQyMzcyNDRjMC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmdwZnBSNlIxZnY5ZGFhNjUwZTg4MjM1MWExZTk2ODgxN2NhZDIzNzI0NGMwLnBuZw==',
      "debug":'',
      "password":'',
      "phone":'',
      "indexA":true,
      "sec":0     //“1”为勾选，“0”为未勾选
  },

// 获取输入框中的手机号
  getPhone: function(e){
    
    this.setData({
      phone: e.detail.value
    });
  },

// 获取输入框中的密码
  getPwd: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

// 隐藏密码
  hiddenpawd:function(e){
    this.setData({
        indexA : !this.data.indexA
    })
  },

// 登陆按钮的操作
  loginBtn: function(){
    //判断手机号的符合度
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
    }else{  //如果手机号正确
        if (this.data.sec == 0) {   //判断是否已经勾选“我已经阅读”按钮
          tips.toast('请先阅读并勾选“协议政策”')
        } else {
          let that = this;
          wxRequest('/userLogin/login', { phone: that.data.phone, password: that.data.password }, function (res) {
            console.log(res)
            if (res.data.status == 'success') {
              app.globalData.userkey = res.data.result.userkey;
              wx.switchTab({
                url: '/pages/Xindex/Xindex'
              });
            } else {
              tips.confirm(res.data.message);
            }
          });
        }
      }
   
  },
  // 忘记密码绑定方法
  forgetPawd:function(e){
    wx.navigateTo({
      url: '/pages/XPasswordReset/XPasswordReset',
    })
  },
  //注册绑定方法
  register:function(e){
    wx.navigateTo({
      url: '/pages/XRegister/XRegister',
    })
  },
// 勾选视图
  select:function(e){
    if(this.data.sec==0){
      this.setData({
        sec:1
      })
    } else if (this.data.sec == 1){
      this.setData({
        sec: 0
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