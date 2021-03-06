// pages/nearbySinging/nearbySinging.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片
    gengduo3:'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS84MDA3ODAzZjk1MDY1YWU4MDBkY2NmNjI4Y2U2NWUxLm82ekFKc3ducTZUc0QxQ095eDFrMU93ZFROalUubjlvSmZCSE1mQzB5MDgwMDc4MDNmOTUwNjVhZTgwMGRjY2Y2MjhjZTY1ZTEucG5n',
    icon3_2x: 'https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS80ZjQ3YzI0YzZlNzU0MWExOTVlY2FkMDI5MTg5YmE5NC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmNicmg2TUNaa2NhNTRmNDdjMjRjNmU3NTQxYTE5NWVjYWQwMjkxODliYTk0LnBuZw==',




    borderItem: '',  //获得输入框中的东西

    "flag": 1, //查询类别 flag 0=特约商户 1=合作单位 2=传播大使 3=附近唱响(包括合作单位,特约商家)

    "area": '广东广州',   //type=1时配合使用—地址,如’广东’,如:’广东广州’

    "businessId": 0, //type=2时配合使用—业务分类id,用于筛选主营业务

    "content": 0,    //type=3时配合使用—搜索栏内容

    "longitudeAndlatitude": 0, //默认获取’经纬度’,String格式如:’116.307629,40.058359’

    "type": 1,     //查询方式 1=地区筛选 2=分类筛选 3=搜索框,type与其他参数配合使用,默认为1

    "pageTotal": 10,
    "pageCount": 2,
    "pageStart": 1,
    padding:false,  //用于判断是否需要分页
    "data": [
      // {
      //   "shopPic": [ //商家图片
      //     "",
      //   ],
      //   "roleId": "",    //角色ID
      //   "businessName": "",    //角色  如文化礼仪
      //   "shopName": "",      //商家名称
      //   "shopAddress": ""     //商家地址
      // },
    ]
  },
  
  //地区筛选
  switchToClasif: function () {
    wx.navigateTo({
      url: '/pages/XNewclassify/XNewclassify',
    })
  },

  //分类筛选
  switchToCationFilter: function (e) {
    wx.navigateTo({
      url: '/pages/XclassificationFilter/XclassificationFilter',
    })
  },

  //去明细
  switToSDetail: function (e) {
    let that = this
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/wstore_detail/wstore_detail?flag=' + 1 + '&roleId=' + this.data.data[id].roleId
    })
  },

  //根据搜索框内容获取商家列表
  switchBack: function (e) {
    let that = this
    wxRequest('/homePage/getMerchants', { content: that.data.borderItem, flag:1, type:3}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          pageTotal: res.data.result.pageTotal,
          pageCount: res.data.result.pageCount,
          pageStart: res.data.result.pageStart,
          data: res.data.result.data
        })
      } else {
        tips.confirm(res.data.message);
      }
    });
  },
  //获得输入框的值
  getBorderItem: function (e) {
    console.log(e);
    this.setData({
      borderItem: e.detail.value
    })
  },

  //获取商家详情
  getShopList: function (pageStart) {
    let that = this;

    wxRequest('/homePage/getMerchants', { area: that.data.area, flag: 1, type: that.data.type }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          pageTotal: res.data.result.pageTotal,
          pageCount: res.data.result.pageCount,
          pageStart: res.data.result.pageStart,
          data: res.data.result.data
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