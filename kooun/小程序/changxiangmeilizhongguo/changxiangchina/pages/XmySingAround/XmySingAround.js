// pages/XmySingAround/XmySingAround.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gengduo1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZDUwYWU2Nzg3OGE3OTlkY2RmNWM1N2JiOGFjYTUwZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9ZQmlvZkx1WklWeWVkNTBhZTY3ODc4YTc5OWRjZGY1YzU3YmI4YWNhNTBkLnBuZw==',
    flag:1
  },
  switToMyshopmsg:function(){
    wx.navigateTo({
      url: '/pages/XMyBusinessInformation/XMyBusinessInformation',
    })
  },
  switTochuanbo:function(){
    wx.navigateTo({
      url: '/pages/XMyBusinessInformation/XMyBusinessInformation',
    })
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