// pages/store_detail/store_detail.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gengduo1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZDUwYWU2Nzg3OGE3OTlkY2RmNWM1N2JiOGFjYTUwZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9ZQmlvZkx1WklWeWVkNTBhZTY3ODc4YTc5OWRjZGY1YzU3YmI4YWNhNTBkLnBuZw==',
    
      //   "shopPic": [       //商家图片
      //     "http://127.0.0.1:9001/34"
      //   ],
      //   "shopCall": "升级成为会员查看联系方式",  //联系方式
      //   "businessName": "文化礼仪",          
      //   "shopName": "盛世",
      //   "shopAddress": "广东 广州 天河区 盛大国际",
      //   "serviceName": "特约商户"
    roleId:0,
    flag:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    that.setData({
      flag: options.flag,
      roleId: options.roleId
    })
    wxRequest('/homePage/getMerchantsDetails', { roleId: that.data.roleId, flag: that.data.flag }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          shopPic: res.data.result.shopPic,
          shopCall: res.data.result.shopCall,
          businessName: res.data.result.businessName,
          shopName: res.data.result.shopName,
          shopAddress: res.data.result.shopAddress,
          serviceName: res.data.result.serviceName
        })



      } else {
        tips.confirm(res.data.message);
        if (res.data.jump == "login")  //如果要跳到登陆页面的话
          wx.navigateTo({
            url: '/pages/XLogin/XLogin',
          })
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