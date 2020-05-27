// pages/HotSpotDetails/HotSpotDetails.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "hotspotId": "1",
    "hotspotTitle": "",
    "hotspotDetails": ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重置hotspotId的值
    this.setData({
      hotspotId:options.id
    })
    let that = this;
    //获取热点信息
    wxRequest('/homePage/getHotPotsDetail', { hotspotId: that.data.hotspotId }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          hotspotTitle: res.data.result.hotspotTitle,
          hotspotDetails: res.data.result.hotspotDetails,
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