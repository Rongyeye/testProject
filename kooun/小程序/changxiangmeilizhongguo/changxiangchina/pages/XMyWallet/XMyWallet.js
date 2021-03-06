// pages/XMyWallet/XMyWallet.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gengduo3:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZDUwYWU2Nzg3OGE3OTlkY2RmNWM1N2JiOGFjYTUwZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9ZQmlvZkx1WklWeWVkNTBhZTY3ODc4YTc5OWRjZGY1YzU3YmI4YWNhNTBkLnBuZw==',
    proReWard:0,
    "pageTotal": 10,
    "pageCount": 1,
    "pageStart": 1,
    "data": [
      {
        "note": "",
        "amount": "",
        "amountId": "",
        "time": ""
      },
      {
        "note": "",
        "amount": "",
        "amountId": "",
        "time": ""
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示总金额（标题）
    let that = this;
    //验证是否登陆
    wxRequest('/my/walletTotal', {}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          proReWard: res.data.result.proReWard
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
    //显示明细
    that.getItemList(1)
  },

  //显示明细
  getItemList: function (pageStart) {
    let that = this
    wxRequest('/my/showPromoRewards', { pageStart: that.data.pageStart, pageTotal: 10 }, function (res) {
      if (res.data.status == 'success') {
        let arr = that.data.data
        if (pageStart == 1) {
          arr = [],

            that.setData({
            paging: false,
            })

        }
        let myData = res.data.result.data
        if (myData.length < that.data.pageTotal) {
          that.setData({
            paging: false,
            // data: arr.concat(myData)
          })
        } else {
          that.setData({
            paging: true,
            pageStart: pageStart + 1,
            // data: arr.concat(myData)
          })
        }
        that.setData({
          data: arr.concat(myData)
        })
      } else {  //请求失败
        tips.confirm(res.data.message)
      }
    })
  },
  
  //触碰底部时加载的方法
  onReachBottom: function (e) {
    let that = this
    if (paging) {
      that.getItemList(that.data.pageStart)
    }
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