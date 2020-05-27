// pages/store_detail_vip/store_detail_vip.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gengduo1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZDUwYWU2Nzg3OGE3OTlkY2RmNWM1N2JiOGFjYTUwZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9ZQmlvZkx1WklWeWVkNTBhZTY3ODc4YTc5OWRjZGY1YzU3YmI4YWNhNTBkLnBuZw==',
    flag:0,   //上一页传来的值
    roleId:0 , //上一页传来的值
      "shopPic": [       //商家图片
        ""
      ],
      "shopCall": "",       //联系方式
      "businessName": "",   //主营业务
      "shopName": "",       //商家名称
      "shopAddress": "",    //商家地址
      serviceName: "" ,   //商家类别（特约商家、合作单位等）
       role: []             //用于接收多个serviceName
  },
  upData:function(e){
    wx.navigateTo({
      url: '/pages/wupdate/wupdate',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    that.setData({
      flag:options.flag,
      roleId:options.roleId
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
        if(res.data.jump=="login")  //如果要跳到登陆页面的话
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