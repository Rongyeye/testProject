import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // redian:'../../images/redian@2x.png',

    // gengduo1:'../../images/gengduo1@3x.png',
    // pic4:'../../images/图标4.png',
    redian:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9jYjkwNDJmYzdjMDcyZDEyODdiMGEyNmI4ZmNlYmM0Mi5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmlCMklQTGMybU5oRGNiOTA0MmZjN2MwNzJkMTI4N2IwYTI2YjhmY2ViYzQyLnBuZw==',

    gengduo1:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9lZDUwYWU2Nzg3OGE3OTlkY2RmNWM1N2JiOGFjYTUwZC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLm9ZQmlvZkx1WklWeWVkNTBhZTY3ODc4YTc5OWRjZGY1YzU3YmI4YWNhNTBkLnBuZw==',

    //轮播图
    "pageTotal": 10,
    "pageCount": 0,
    "pageStart": 1,
    
    "banner": [
      //item1
      {
    //     "bannerId": "",
    //     "bannerPic": [   //轮播图图片路径  
    // ""
    //     ],
    //     "bannerName": "" //轮播图名i在
      },
    ],
    //分类列表
    "cPageTotal": 10,
    "cPageCount": 0,
    "cPageStart": 1,
     cPadding: false,  //用于判断是否需要翻页
    "classify": [    //分类
      {
        // "businessId": "",
        // "businessName": "",
        // "sort": 1,
        // "businessPic": [
        //   ""
        // ]
      },
    ],
    //热点内容
    "hPageTotal": 10,
    "hPageCount": 3,
    "hPageStart": 1,
    "hotPointList": [
      {
        "hotspotId": "1",
        "hotspotTitle": "唱响美丽中国特约商户座谈会顺利举办."
      },
      {
        "hotspotId": "2",
        "hotspotTitle": "is title"
      },
      {
        "hotspotId": "3",
        "hotspotTitle": "热点3"
      }
    ]
  },


  //跳转到“中国传统文化”
  switch:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/XnearbySinging/XnearbySinging',
    })
  },


  //跳转到热点详情
  switchToHot:function(e){
    console.log(e)
    let index = e.currentTarget.id-1
    wx.navigateTo({
      url: '/pages/XHotSpotDetails/XHotSpotDetails?id=' + this.data.hotPointList[index].hotspotId,
    })
  },


  //跳转到附近唱响
  switToNearbyS:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/XnearbySinging/XnearbySinging',
    })
  },


  //获取分类列表
  getClassify: function (pageStart) {
    let that = this;
    //验证是否登陆

    wxRequest('/homePage/getBusiness', { pageStart: that.data.cPageStart }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          cPageTotal: res.data.result.pageTotal,
          cPageCount: res.data.result.pageCount,
          cPageStart: res.data.result.pageStart,
          classify: res.data.result.data
        })
        let arr = that.data.classify  //暂存信息到arr中
        if (that.data.cPageStart == 1) {
          arr = [];  //清空
          that.setData({
            padding: false
          })
        }
        let myinfo = res.data.result.data //暂存所有信息到myinfo中
        if (myinfo.length <= that.data.cPageTotal) { //如果总长度还没有一页的长度那么长
          arr = [];
          that.setData({
            padding: false,
            classify: arr.concat(myinfo)
          })
        } else {
          that.setData({
            padding: true,
            cPageStart: cPageStart + 1,
            classify: arr.concat(myinfo)
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

  // 触底
  lowerMoreClassify: function (e) {
    if (this.data.padding) {
      this.getClassify(this.data.cPageStart)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取轮播图
    wxRequest('/homePage/getBanner', {pageStart:that.data.pageStart}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
           pageTotal:res.data.result.pageTotal,
           pageStart:res.data.result.pageStart,
           pageCount: res.data.result.pageCount,
           banner: res.data.result.data
        })
      } else {
           tips.confirm(res.data.message);
      }
    });
    //获取分类列表
    this.getClassify(1)
    
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