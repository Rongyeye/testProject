// pages/w_wechatpay/w_wechatpay.js
import {wxRequest} from '../../utils/wxRequest.js';
import {
  tips
} from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flg:false,
    total:"",
    id_arr:"",
  },

  selectTab: function (e) {
    console.log(e);
    let that = this;
    //点击取反，更改选中状态，true选中
    
    that.data.flg = !that.data.flg;
    that.setData({
      flg: that.data.flg,
    })
    
    },


  //支付
  gopay: function () {
    
    let that = this;
    if(that.data.flg == true) {
      wxRequest('/wxPay/wechatUnityOrder', {

        ids: that.data.id_arr,
        price: that.data.total,

      }, function (res) {
        console.log(res)
        if (res.data.status == 'success') {
          tips.confirm(res.data.message);
        } else {
          tips.confirm(res.data.message);

        }
      });

    }else{
      tips.confirm("请选择支付方式");
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this; 
    console.log(options);
    that.setData({
        total:options.total,
        id_arr: options.ids
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