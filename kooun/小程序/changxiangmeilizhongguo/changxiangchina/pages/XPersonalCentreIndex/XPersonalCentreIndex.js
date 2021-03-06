// pages/XPersonalCentre2/XPersonalCentre2.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "headPic": '',     //头像
    "nickName": '',   //用户昵称
    "money": 0,       //钱包余额
    "walletId": '',
    "serviceName": '', //服务名称(多个用,分割)
    "userId": '',
    "proReWard": 0,    //推广奖励,
    "serviceId": '',
    "userName": '',



  },
  // 跳去设置 
  switToSetting: function () {
    wx.navigateTo({
      url: '/pages/XSetting/XSetting',
    })
  },
  switToPsdtl: function () {
    wx.navigateTo({
      url: '/pages/my_detail/my_detail',
    })
  },
  // 跳去升级
  switToUpdate: function () {
    wx.navigateTo({
      url: '/pages/wupdate/wupdate',
    })
  },
  // 跳去“推广二维码”
  switToQRcode: function () {
    wx.navigateTo({
      url: '/pages/XQRCode/XQRCode',
    })
  },
  // 跳去“邀请好友”
  switToinviteFriend: function () {
    wx.navigateTo({
      url: '/pages/XinviteFriend/XinviteFriend',
    })
  },
  // 跳去“我的唱响”
  switToMysing: function () {
    wx.navigateTo({
      url: '/pages/XmySingAround/XmySingAround',
    })
  },
  // 跳去“我的推荐”
  switToMyrecomment: function () {
    wx.navigateTo({
      url: '/pages/XmyRecommendation/XmyRecommendation',
    })
  },
  // 跳去“我的钱包”
  switToMywallet: function () {
    wx.navigateTo({
      url: '/pages/XMyWallet/XMyWallet',
    })
  },
  // 跳去“推广奖励”
  switToakward: function () {
    wx.navigateTo({
      url: '/pages/XpromotionAwards/XpromotionAwards',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //验证是否登陆

    wxRequest('/my/mine', {}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        // that.money = res.data.result.money,
        // that.headPic = res.data.result.headPic,
        // that.walletId = res.data.result.walletId,
        // that.data.serviceId = res.data.result.serviceId,
        // that.data.ProReWard = res.data.result.ProReWard,
        // that.data.serviceName = res.data.result.serviceName,
        // that.data.nickName = res.data.result.nickName
        that.setData({
          money: res.data.result.money,
          headPic: res.data.result.headPic,
          walletId: res.data.result.walletId,
          serviceId: res.data.result.serviceId,
          proReWard: res.data.result.proReWard,
          serviceName: res.data.result.serviceName,
          nickName: res.data.result.nickName,
          userName: res.data.result.userName,
        })
      } else {
        tips.confirm(res.data.message).then(function () {  //确定
          if (res.data.jump == 'login') {
            wx.navigateTo({
              url: '/pages/XLogin/XLogin',
            })
          }
        });
      }
    });
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