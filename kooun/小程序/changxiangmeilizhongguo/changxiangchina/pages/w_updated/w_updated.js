// pages/wupdated/wupdated.js
import {
  wxRequest
} from '../../utils/wxRequest.js';
import {
  tips
} from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  // 方法里不能叠加方法，可以调用方法鸭
  data: {
    totalPrice: "0",
    // 直接在返回的数组中操作
    container: [],
    startPage: 1,
    paging: true,


  },
  //选中按钮
  selectTab: function (e) {
    // 给点击一个索引标记
    let that = this,
      curIndex = e.currentTarget.dataset.index;
    var currrentTab = that.data.container[curIndex].currrentTab;
    console.log(e);
    //点击取反，更改选中状态，true选中
    that.data.container[curIndex].flg = !that.data.container[curIndex].flg;
    that.setData({
      container: that.data.container
    });
    //把选择对应的价格加到总金额
    if (that.data.container[curIndex].flg) {
      that.data.totalPrice = parseFloat(that.data.totalPrice) + parseFloat(that.data.container[curIndex].servicePrice)
    } else {
      that.data.totalPrice = (that.data.totalPrice - that.data.container[curIndex].servicePrice)
    }
    that.setData({
      totalPrice: that.data.totalPrice,
    });

  },

  //跳去支付页面
  topay: function () {
    let arr = "", that = this;
    for (let i = 0; i < that.data.container.length; i++) {
      if (that.data.container[i].flg) {
        arr += that.data.container[i].serviceId + ",";

      }
    }
    arr = arr.substr(0, arr.length - 1);
    console.log(arr);
    wx.navigateTo({
      url: '/pages/w_wechatpay/w_wechatpay?total=' + that.data.totalPrice + '&ids=' + arr
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    this.getServiceList(1);
  },

  //分页
  getServiceList: function (pageStart) {
    let that = this;
    wxRequest('/my/serviceList', { pageStart: pageStart, pagesTotal: 10, }, function (res) {

      console.log("升级列表---");
      console.log(res);
      if (res.data.status == "success") {
        let arr = that.data.container;
        if (pageStart == 1) {
          arr = [];
          that.setData({
            startPage: 1
          });

        }
        let mydata = res.data.result.data;
        if (mydata.length < res.data.result.pagesTotal) {
          that.setData({
            paging: false,
            container: arr.concat(mydata)
          });
        } else {
          that.setData({
            paging: true,
            startPage: that.data.startPage + 1,
            container: arr.concat(mydata)
          });
        }
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
    let that = this;
    if (that.data.paging) {
      that.getServiceList(that.data.startPage);
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})