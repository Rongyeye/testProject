// pages/XMyBusinessInformation/XMyBusinessInformation.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "flag": 2,
    "shopPic": [
      ""
    ],
    "shopCall": "",
    "businessName": "",
    "shopName": "",
    "shopAddress": ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //验证是否登陆

    wxRequest('/my/myRecommendDetail', { flag: that.data.flag }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
      pages / XmySingAround / XmySingAround
        that.setData({
          shopCall: res.data.result.shopCall,
          shopPic: res.data.result.shopPic,
          businessName: res.data.result.businessName,
          shopAddress: res.data.result.shopAddress,
          shopName: res.data.result.shopName
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
    })
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