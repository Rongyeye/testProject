// pages/nearbySinging/nearbySinging.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "proReWard":0,  //奖励金额
    //明细
    "pageStart":1,  //起始页，默认为1
    "pageTotal":10, //总条目数，默认为10
    "pageCount": 1,
    paging:true,
    "data": [
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
    //初始化项目

    let that = this;
    that.getItemList(1)
    //总金额显示
    wxRequest('/my/promoTotal', {}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          proReWard: res.data.result.proReWard,
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
    })
  },

  //主体方法
  getItemList: function (pageStart){
    let that = this
    wxRequest('/my/showPromoRewards', {pageStart:that.data.pageStart,pageTotal:10}, function (res) {
      if (res.data.status == 'success') {
        let arr = that.data.data
        if(pageStart==1){
          arr = [],
          that.setData({
           paging:false
          })

        }
        let myData = res.data.result.data
        if(myData.length<that.data.pageTotal){
          that.setData({
            paging:false,
            // data: arr.concat(myData)
          })
        }else{
          that.setData({
            paging:true,
            pageStart:pageStart+1,
            // data: arr.concat(myData)
          })
        }
        that.setData({
          data: arr.concat(myData)
        })
    }else{  //请求失败
        tips.confirm(res.data.message)
    }
  })
  },
//
onReachBottom:function(e){
  let that = this
  if(paging){
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