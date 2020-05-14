// pages/XmyRecommendation/XmyRecommendation.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    denglu:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZTlhNGEyOGU4MmRlMGUwZjRiZjMyZjJkZDgzZDAyOC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLk5DTjdlWFprakh6dWVlOWE0YTI4ZTgyZGUwZTBmNGJmMzJmMmRkODNkMDI4LnBuZw==',
    "flag": 2,
    "pageTotal": 0,
    "pageCount": 0,
    "pageStart": 0,
    "data": [
      // {
      //   "shopPic": [
      //     ""
      //   ],
      //   "roleId": "",
      //   "businessName": "",
      //   "shopName": "",
      //   "shopAddress": ""
      // },

    ]

  },
  //导航栏跳转
  switTo: function (e) {
    console.log(e)
    if (e.currentTarget.id == 1) {
      wx.navigateTo({
        url: '/pages/XmyRecommendation2/XmyRecommendation2',
      })
    } else if (e.currentTarget.id == 0) {
      wx.navigateTo({
        url: '/pages/XmyRecommendation/XmyRecommendation',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //验证是否登陆

    wxRequest('/my/myRecommend', { flag: that.data.flag }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          pageTotal: res.data.result.pageTotal,
          pageCount: res.data.result.pageCount,
          pageStart: res.data.result.pageStart,
          data: res.data.result.data
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