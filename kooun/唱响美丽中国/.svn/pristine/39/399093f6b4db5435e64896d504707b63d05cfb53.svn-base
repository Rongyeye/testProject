// pages/XSetting/XSetting.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // gengduo1:'../../images/gengduo1.png',
    gengduo1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZDUwYWU2Nzg3OGE3OTlkY2RmNWM1N2JiOGFjYTUwZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9ZQmlvZkx1WklWeWVkNTBhZTY3ODc4YTc5OWRjZGY1YzU3YmI4YWNhNTBkLnBuZw==',
    versionNumber: "V1.0.0",
  },
  switToRSPassword:function(e){
    wx.navigateTo({
      url: '/pages/XPasswordReset/XPasswordReset',
    })
  },
  //退出按钮
  signOut:function(e){
    wxRequest('/logout/logout', {}, function (res) {
      if (res.data.status == 'success') {
        tips.confirm(res.data.message);
        wx.navigateTo({
          url: '/pages/XLogin/XLogin',
        })
      } else {
        tips.confirm(res.data.message);
       
      }
    });
  },
  //清除缓存 
  cleanStirageSync:function(e){
    wx.clearStorage()
    tips.toast("清除成功")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wxRequest('/my/showVersion', {}, function (res) {
      if (res.data.status == 'success') {
        that.setData({
          versionNumber: res.data.result.versionName
        })
      } else {
        tips.confirm(res.data.message);
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