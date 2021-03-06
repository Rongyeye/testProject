// pages/w_teyuecheck/w_teyuecheck.js
// pages/w_spreadcheck/w_spreadcheck.js
var app = getApp()
import {
  wxRequest,
  wxRequestUpload
} from '../../utils/wxRequest.js';
import {
  tips
} from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    areaId:"",
    startPage: 1,
    paging: false,


    multiArray: [
      [{
        name: "全部"
      }],
      [{
        name: "全部"
      }, ],
      [{
        name: "全部"
      }],
    ],

    multiIndex: [0, 0, 0], // 默认的下标
    step: 0, // 默认显示请选择
    name: "",
    phone: "",
    position: "",
   
    customItem: '全部',
   
    modalHidden: true,
    img1: "",
    img1Id: "",
    img2: "",
    img2Id: "",
    img3: "",
    img3Id: "",
    container: [{
        business: "中国传统文化",
      flg: false,
      },
      {
        business: "文艺礼仪",
        flg: false,
      },
      {
        business: "酒店住宿",
        flg: false,
      },
      {
        business: "休闲娱乐",
        flg: false,
      },
      {
        business: "智能交通",
        flg: false,
      },
      {
        business: "房产物业",
        flg: false,
      },
      {
        business: "零售购物",
        flg: false,
      },
      {
        business: "生活服务",
        flg: false,
      },
    ],
    businessID:"",
  },
 



//上传图片
  upimg: function(e) {
    console.log(e);
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          img: res.tempFilePaths,
        });
        that.uploadImg(res.tempFilePaths[0], index);
      }
    });
  },
//传照片
  uploadImg: function (filepath, index) {
    let that = this;
    console.log(index);
    wxRequestUpload(filepath, function(res) {
      console.log(res);
     var myd = JSON.parse(res.data);
      if (myd.status == "success") {
      
        if (index == 0) {
          that.setData({
            img1: myd.result.url,
            img1Id: myd.result.urlId
          });
          console.log("img1");
          console.log(that.data.img1);
          console.log(that.data.img1Id);
          
        } else if (index == 1) {
          that.setData({
            img2: myd.result.url,
            img2Id: myd.result.urlId
          });
          console.log("img2");
          console.log(that.data.img2);
          console.log(that.data.img2Id);
        } else {
          that.setData({
            img3: myd.result.url,
            img3Id: myd.result.urlId
          });
          console.log("img3");
          console.log(that.data.img3);
          console.log(that.data.img3Id);
        }

      } else {
        tips.confirm(myd.message);
      }

    })
  },
// 获取输入的店铺名称
  getName: function(e) {
    let that = this;
    console.log(e)
    this.setData({

      name: e.detail.value
    });
  },
// 获取输入的手机号
  getPhone: function(e) {
    let that = this;
    console.log(e)
    this.setData({
      phone: e.detail.value
    });
  },
  // 获取输入的职位
  getClass: function(e) {
    let that = this;
    console.log(e)
    this.setData({
      position: e.detail.value
    });
  },

// 提交审核的按钮操作
submit: function() {
    let that = this;
  wxRequest('/my/auditInfoByDiffuse', {       
   shopCall: that.data.phone,
    position: that.data.position,
    idCartAId:that.data.img1Id,
    idCartBId:that.data.img2Id,
    myInfoPic:that.data.img3Id,
    businessName:that.data.name,
    }, function(res) {
      console.log(res)
      if (res.data.status == 'success') {
        // 提交成功则跳转到审核中
        wx.navigateTo({
          url: '/pages/XExamining/XExamining',
        })
      } else {
        tips.confirm(res.data.message);
      }
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    // if (that.data.paging) {
    //   that.getProvince(that.data.startPage);
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
 

})