// pages/wchang_name/wchang_name.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    nickname:""
    
  },
  // 获得修改的手机号
  getName: function (e) {
    let that = this;
    console.log(e)
    that.setData({
      nickname: e.detail.value,
    })
    
  },
del:function(){
   let that = this;
   that.setData({
     nickname: "",
   })
 }, 
// 保存按钮上传更改的昵称
  save:function(res){
    let that = this;
    wxRequest('/my/updateMineInfo', {
      userJson:JSON.stringify({
        nickName: that.data.nickname,
      })
      }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          nickname: res.data.result.nickName,
        }),
        // 保存成功后返回上一页
        wx.navigateBack({
          url: "/pages/my_detail/my_detail",
        })
      } else {
        tips.confirm(res.data.message);
        wx.navigateTo({
          // url: '/pages/XLogin/XLogin',
        })

      }
    });
  
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
          
          nickname: res.data.result.nickName,
          
        })
      } else {
        tips.confirm(res.data.message);
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
    let that = this;
    wxRequest('/my/mineInfo', {}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({

          nickname: res.data.result.nickName,

        })
      } else {
        tips.confirm(res.data.message);
        wx.navigateTo({
          url: '/pages/XLogin/XLogin',
        })

      }
    });
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