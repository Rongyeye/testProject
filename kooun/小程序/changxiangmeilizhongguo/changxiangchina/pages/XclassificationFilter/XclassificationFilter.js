// pages/classificationFilter/classificationFilter.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "classificationPaging":false, //作为是否分页的判断
    "pageTotal": 10,
    "pageCount": 0,
    "pageStart": 1,
    "classification": [
      {
        // "shopPic": [
        //   "http://192.168.1.45:9001/34"
        // ],
        // "roleId": "2",
        // "businessName": "文化礼仪",
        // "shopName": "盛世",
        // "shopAddress": "广东 广州 天河区 盛大国际"
      }
    ]
  },
  //转去
  switToClasify: function () {
    wx.navigateTo({
      url: '/pages/XnearbySinging/XnearbySinging?businessId='+this.data.roleId+'flag=1'+'pageStart=1'+'type=2',
    })
  },

  //获得分类列表
  getClassificationList: function (pageStart) {
    let that = this;
    // console.log(curProvinceIndex)
    wxRequest('/homePage/getMerchants', { pageStart: pageStart,pageTotal:that.data.pageTotal,pageCount:0,type:2,flag:0 }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        let arr = that.data.classification;
        if (pageStart == 1) {  //是否为第一页？是的话就清空arr中的数据
          arr = [];
          that.setData({
            classificationPaging: false,
            pageStart: 1,   //重置为第一页
          })
        }
        let mydata = res.data.result.data;
        // console.log(mydata)
        if (mydata.length < res.data.result.pageTotal) {
          that.setData({
            classificationPaging: false,
            classification: arr.concat(mydata)
          });
        } else {
          that.setData({
            classificationPaging: true,
            pageStart: that.data.pPageStart + 1,
            classification: arr.concat(mydata),
          });
        }
        console.log(that.data.classification)
      } else {
        tips.confirm(res.data.message);
      }
    });
  },
  //触底时
  lowerMoreClassify: function () {
    if (this.data.classificationPaging) {
      this.getClassificationList(this.data.pageStart)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassificationList(this.data.pageStart)
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