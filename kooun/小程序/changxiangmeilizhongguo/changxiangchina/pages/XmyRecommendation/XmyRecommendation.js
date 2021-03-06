// pages/XmyRecommendation/XmyRecommendation.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  //data.data
  /**
   * for(index in data.data){
   *  var shopPics = data.data[index].shopPic
   *  for(index in shopPics){
   *    shopPics[index]
   *  }
   * }
   */
  data: {
      // denglu:'../../images/denglu.png',
    denglu:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZTlhNGEyOGU4MmRlMGUwZjRiZjMyZjJkZDgzZDAyOC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLk5DTjdlWFprakh6dWVlOWE0YTI4ZTgyZGUwZTBmNGJmMzJmMmRkODNkMDI4LnBuZw==',

      "flag":0,
      "pageTotal": 0,
      "pageCount": 0,
      "pageStart": 0,
      'type':'',
      padding:false,  //用于判断是否需要加载下一页
      "shopList": [
        {
          "shopPic": [
            "",
          ],
          "roleId": "",
          "businessName": "sdasd",
          "shopName": "sdsdsd",
          "shopAddress": "sdasdafdfafads"
        },
      ],

  },
  //导航栏跳转
switTo:function(e){
  console.log(e)
  if(e.currentTarget.id == 1){
    wx.navigateTo({
      url: '/pages/XmyRecommendation2/XmyRecommendation2',
    })
  } else if (e.currentTarget.id == 2){
    wx.navigateTo({
      url: '/pages/XmyRecommendation3/XmyRecommendation3',
    })
  }
},


//触底生效
  lowerMoreItem:function(e){
    if(this.data.padding){
      this.getShopList(this.data.pageStart)
    }
  },

//获取商家列表
getShopList:function(pageStart){
  let that = this;
  //验证是否登陆

  wxRequest('/my/myRecommend', {flag: that.data.flag}, function (res) {
    console.log(res)
    if (res.data.status == 'success') {
      that.setData({
        pageTotal: res.data.result.pageTotal,
        pageCount: res.data.result.pageCount,
      })
      let arr = that.data.shopList  //暂存信息到arr中
      if(that.data.pageStart==1){
        arr = [];  //清空
        that.setData({
          padding:false
        })
      }
      let myinfo = res.data.result.data //暂存所有信息到myinfo中
      if(myinfo.length<=that.data.pageTotal){ //如果总长度还没有一页的长度那么长
        arr = [];
        that.setData({
          padding:false,
          shopList:arr.concat(myinfo)
        })
      }else{
        that.setData({
          padding:true,
          pageStart:pageStart+1,
          shopList: arr.concat(myinfo)
        })
      }
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

// 判断类型
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopList(1)

    
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