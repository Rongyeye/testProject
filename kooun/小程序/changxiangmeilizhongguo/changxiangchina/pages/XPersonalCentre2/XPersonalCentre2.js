// pages/XPersonalCentre2/XPersonalCentre2.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gengduo3: 'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZDUwYWU2Nzg3OGE3OTlkY2RmNWM1N2JiOGFjYTUwZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9ZQmlvZkx1WklWeWVkNTBhZTY3ODc4YTc5OWRjZGY1YzU3YmI4YWNhNTBkLnBuZw==',
    // gengduo2:'../../images/gengduo2@3x.png',
    // pic1: '../../images/2541.jpg',
    // pic2: '../../images/shezhi@3x.png',
    // icon_duanxin: '../../images/icon_duanxin@3x.png',

    pic2:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9iYmM0ZWU2OGMxOWIwNGQ2YjUxMDg0OWJhOGM1OTNiNi5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLkxKS1NCSWlNOENFdWJiYzRlZTY4YzE5YjA0ZDZiNTEwODQ5YmE4YzU5M2I2LnBuZw==',
    icon_duanxin:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS80NWM0YTdlY2Q5MGNjYmZkNjVmZDliNjFiYTVkZGVhZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9IVFdKSUdkNDVSbTQ1YzRhN2VjZDkwY2NiZmQ2NWZkOWI2MWJhNWRkZWFkLnBuZw==',
    // "headPic":'',     //头像
    // "nickName": '',   //用户昵称
    // "money":0,       //钱包余额
    // "walletId":'',
    "serviceName": '', //服务名称(多个用,分割)
    // "userId":'',
    // "proReWard":0,    //推广奖励,
    // "serviceId":'',
    // "userName":'',
    role:[    //用来装serviceName中的角色
      "",
    ],

    myInfo: {},

  },
  // 跳去设置 
  switToSetting: function () {
    wx.navigateTo({
      url: '/pages/XSetting/XSetting',
    })
  }, 
  switToPsdtl:function(){
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
            
            that.setData({
              myInfo:res.data.result
            })
            //判断serviceName的值
            if (that.data.myInfo.serviceName==null){  //若为空，不用分割
              let arr = that.data.myInfo.serviceName
              that.setData({
                role: arr
              })
            }else{                                    //不为空，根据“,”分割并赋值给role
              let arr = that.data.myInfo.serviceName.spilt(",")
              that.setData({
                role: arr
              })
            }
            
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