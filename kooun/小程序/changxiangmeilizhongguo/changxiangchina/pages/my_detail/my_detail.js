// pages/my_detail/my_detail.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "avator":"",
    "nickname":"",
    "phone": "",
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wxRequest('/my/mineInfo', {}, function (res) {
        console.log(res)
        if (res.data.status == 'success') {
          that.setData({
            avator:res.data.result.headPic,
            nickname:res.data.result.nickName,
            phone:res.data.result.userName,
          })
        } else {
          tips.confirm(res.data.message);
          wx.navigateTo({
            url: '/pages/XLogin/XLogin',
          })

        }
      });  
 
  },
bind_changeavator:function(){
  wx.navigateTo({
    url: '/pages/w_change_head/w_change_head',
  })
},
bind_changename:function(){
  wx.navigateTo({
    url: '/pages/wchang_name/wchang_name',
  })
},
bind_changeid:function(){
  wx.navigateTo({
    url: '/pages/wchang_phone/wchang_phone',
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