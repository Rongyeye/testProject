// pages/XRegister/XRegister.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // pic1: '../../images/图片6.png',
    // pic2: '../../images/icon_close_eyes.png',
    // gou2:'../../images/gou-2@3x.png',
    // gou1:'../../images/gou-1.png',
    pic1: 'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hNzJlNzkzNjBiOWJlMzk0N2FmY2FiZDZhNDA5YTkxYy5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmNtbndIQk4yN3BNOGE3MmU3OTM2MGI5YmUzOTQ3YWZjYWJkNmE0MDlhOTFjLnBuZw==',

    pic2: 'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hYTY1MGU4ODIzNTFhMWU5Njg4MTdjYWQyMzcyNDRjMC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmdwZnBSNlIxZnY5ZGFhNjUwZTg4MjM1MWExZTk2ODgxN2NhZDIzNzI0NGMwLnBuZw==',
    gou2: 'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS84NGIzMzQ2ODEyMGI5ZTM5MDA0Njg1MDUzYTBjZWZmYy5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmQyNm12UDdWMWxnQzg0YjMzNDY4MTIwYjllMzkwMDQ2ODUwNTNhMGNlZmZjLnBuZw==',

    gou1: 'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hMGZkZWJlNzkyYzQzNTU1ZDk3NmMzZDAyMzhhYzU5Yi5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLlcyZjRaSGoyNFRZN2EwZmRlYmU3OTJjNDM1NTVkOTc2YzNkMDIzOGFjNTliLnBuZw==',
    "sec":0,
    "code":'',
    "codeget":'',
    "conPassword":'',
    "password":'',
    "phone":'',
    "referrerId":'',
    "indexA":true,
    "indexB":true,
    codeStadus:false//验证码的状态（发送or没有）
  },
  
  // 获取输入框中的手机号
  getPhone: function (e) {
    console.log(e)
    this.setData({
     phone: e.detail.value
    });
  },
  //获取输入框中的验证码
  getInputCode:function(e){
    console.log(e)
    this.setData({
      code: e.detail.value
    });
  },
  //获取验证码
  getCode:function(e){
    if(this.data.phone==''){
      tips.toast("请输入正确的手机号码")
    }else{

    }
  },

  //发送验证码
  sentCode: function (e) {
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
    } else {
      wxRequest('/sms/sendSmsCode.wx', { phone: that.data.phone }, function (res) {
        console.log(res)
        if (res.data.status == 'success') {
          //   this.setData({
          //    code: res.data.result.code
          //  }) 
          that.setData({
            codeStadus:true
          })
        } else if (res.data.status == 'error'){
          tips.confirm(res.data.message);
        }
      });
    }
  },

  //眼睛图标变化
  eyeChange:function(e){
    console.log(e)
    if(e.currentTarget.id==0){
      this.setData({
        indexA:!this.data.indexA
      })
    } else if (e.currentTarget.id==1){
      this.setData({
        indexB: !this.data.indexB
      })
    }

  },
  //获取输入框中的密码
  getpassword:function(e){
    this.setData({
      password: e.detail.value
    });
  },
  //获取输入框中的再一次密码
  conPassword: function(e) {
      this.setData({
        conPassword: e.detail.value
      });
    },
  // 登陆按钮的操作
  rigisterBtn: function () {
    if (this.data.sec == 0) {
      tips.toast('请先阅读并勾选“协议政策”')
    } else {
      let that = this;
      wxRequest('/userLogin/register', { phone: that.data.phone,password: that.data.password, code: that.data.code,conPassword: that.data.conPassword,referrerId:that.data.referrerId}, function (res) {
        console.log(res)
        if (res.data.status == 'success') {
          tips.confirm(res.data.message);
          wx.switchTab({
            url: '/pages/Xindex/Xindex'
          });
        } else {
          if (res.data.message.target == "code") {
            tips.confirm(res.data.message);
          } else if (password==null){
            tips.toast('请输入密码')
          } else if (conPassword == null){
            tips.toast('请再次输入密码')
          }else{
            tips.confirm(res.data.message)
          }
        
        }
      });
    }

  },

  // 勾选视图
  select: function (e) {
    if (this.data.sec == 0) {
      this.setData({
        sec: 1
      })
    } else if (this.data.sec == 1) {
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