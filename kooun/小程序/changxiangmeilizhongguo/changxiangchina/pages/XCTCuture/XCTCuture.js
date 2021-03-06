// pages/XCTCuture/XCTCuture.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    denglu:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS84MDA3ODAzZjk1MDY1YWU4MDBkY2NmNjI4Y2U2NWUxLm82ekFKc3ducTZUc0QxQ095eDFrMU93ZFROalUubjlvSmZCSE1mQzB5MDgwMDc4MDNmOTUwNjVhZTgwMGRjY2Y2MjhjZTY1ZTEucG5n',
    icon3_2x:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS80ZjQ3YzI0YzZlNzU0MWExOTVlY2FkMDI5MTg5YmE5NC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmNicmg2TUNaa2NhNTRmNDdjMjRjNmU3NTQxYTE5NWVjYWQwMjkxODliYTk0LnBuZw==',
    shopList:{
      // storeimg: "asdwf",     //图片
      // storeName: "123asa",   //名字
      // storeAdress: "asdad",  //地址
      // storeClass: "特约商家",  //类型
      // business: "中国传统文化",  //主营业务
    }
   
  },
  //获取商家详情
  getShopList: function (pageStart) {
    let that = this;
    //验证是否登陆

    wxRequest('/my/mineInfo',
      {},
      function (res) {
        console.log(res)
        if (res.data.status == 'success') {
          that.setData({
            shopList: res.data.result.data
          })
          let arr = that.data.shopList  //暂存信息到arr中
          if (that.data.pageStart == 1) {
            arr = [];  //清空
            that.setData({
              padding: false
            })
          }
          let myinfo = res.data.result.data //暂存所有信息到myinfo中
          if (myinfo.length <= that.data.pageTotal) { //如果总长度还没有一页的长度那么长
            arr = [];
            that.setData({
              padding: false,
              shopList: arr.concat(myinfo)
            })
          } else {
            that.setData({
              padding: true,
              pageStart: pageStart + 1,
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
  // 触底
  lowerMoreShopList: function (e) {
    if (this.data.padding) {
      this.getShopList(this.data.pageStart)
    }
  },

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
 