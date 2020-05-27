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
    paging: true,


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
    address: "",
   
    customItem: '全部',
   
    modalHidden: true,
    img: "",
    imgId: "",
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
    businessID:[],
  },
  click_close_modal: function() {
    this.setData({
      modalHidden: true,
    });
  },
//点击选择
  selectTab: function(e) {
    let that = this,
      curIndex = e.currentTarget.dataset.index;
    var currrentTab = that.data.container[curIndex].currrentTab;
    console.log(e);
    console.log("curIndex----");
    console.log(curIndex);
    //点击取反，更改选中状态，true选中
    that.data.container[curIndex].flg = !that.data.container[curIndex].flg;
    that.setData({
      container: that.data.container,
    });
    console.log(that.data.container);
  },
//完成主营业务选择
  selectDone:function(){
    let that = this, string  = "";
    console.log(that.data.container.length);
    for (let i=0; i < that.data.container.length; i++) {
      if (that.data.container[i].flg) {
        string += i + ",";
        
    console.log(string); 
      }
    
    }
    string = string.substr(0, string.length - 1);  
    that.setData({
      businessID: string ,
    })
    console.log(that.data.businessID);
    
    that.data.modalHidden = true;
    that.setData({
      modalHidden: that.data.modalHidden,
    })
  },
bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
//选择地址
bindMultiPickerColumnChange: function (e) {
    let that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) { 
      case 0:  //选择省，获取市
        that.getshi(that.data.multiArray[0][e.detail.value].id);
        
        data.multiIndex[0] = e.detail.value;
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:  //选择市,获取区
        that.getarea(that.data.multiArray[1][e.detail.value].id);
        data.multiIndex[1] = e.detail.value;
        data.multiIndex[2] = 0;
        break;
      case 2: //选择区
       
        data.multiIndex[2] = e.detail.value;       
        break;
    }

    console.log(data.multiIndex);
    this.setData({
      multiIndex: data.multiIndex,
      areaId: data.multiIndex[2],
    });
  console.log(this.data.areaId);
  },
//获取省列表：
  getProvince(pageStart) {
    let that = this;
    wxRequest('/homePage/getProvinceList', { pageStart: pageStart, pageTotal: 80, }, function (res) {

      console.log("省列表---");
      console.log(res);
     
      if (res.data.status == "success") {
        that.data.multiArray[0] = res.data.result.data;
        that.setData({
          multiArray: that.data.multiArray
        });

      } else {
        tips.confirm(res.data.message);
      }
      console.log(that.data.container1)
    });
  },
//获取市列表：
  getshi(provinceId) {
    let that = this;
    wxRequest('/homePage/getCityList', { pageStart: 1, pageTotal: 100, provinceId: provinceId }, function (res) {

      console.log("市列表---");
      console.log(res);
      if (res.data.status == "success") {
        that.data.multiArray[1] = res.data.result.data;
        that.setData({
          multiArray: that.data.multiArray
        });
      } else {
        tips.confirm(res.data.message);
      }
      console.log("市列表---");
      console.log(that.data.container2);
    });
  },
//获取区列表：
  getarea(cityId) {
    let that = this;
    wxRequest('/homePage/getAreaList', { pageStart: 1, pageTotal: 100, cityId: cityId }, function (res) {

      console.log("区列表---");
      console.log(res);
      if (res.data.status == "success") {
        that.data.multiArray[2] = res.data.result.data;
        that.setData({
          multiArray: that.data.multiArray
        });
      } else {
        tips.confirm(res.data.message);
      }
      console.log("区列表---");
      console.log(that.data.container3);
    });
  },



//上传图片
  upimg: function(e) {
    console.log(e);
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          img: res.tempFilePaths,
        });
        that.uploadImg(res.tempFilePaths[0]);
      }
    });
  },
//传照片
  uploadImg: function(filepath) {
    let that = this;
    console.log(filepath);
    wxRequestUpload(filepath, function(res) {
      console.log(res);
     var myd = JSON.parse(res.data);
      if (myd.status == "success") {
        that.setData({
          img: myd.result.url,
          imgId: myd.result.urlId,
        });
        console.log("imgId");
        console.log(that.data.imgId);
        console.log("img的路径");
        console.log(that.data.img);
      } else {
        tips.confirm(myd.message);
      }

    })
  },
// 获取输入的店铺名称
  getName: function(e) {
    console.log(e)
    this.setData({

      name: e.detail.value
    });
  },
// 获取输入的手机号
  getPhone: function(e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    });
  },
// 获取输入的详细地址
  getAddress: function(e) {
    console.log(e)
    this.setData({
      address: e.detail.value
    });
  },
// 提交审核的按钮操作
submit: function() {
    let that = this;
    wxRequest('/my/auditInfo', {
     
        areaId:that.data.areaId ,
        businessIds: that.data.businessID,
        shopAddress: that.data.multiIndex +","+that.data.address,
        shopCall: that.data.phone,
        shopName: that.data.name,
        shopPic: that.data.imgId
      
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
    this.getProvince(1);

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
 //主营请选择
  showModalStatus: function () {
    let that = this;
    that.data.modalHidden=false;
    that.setData({
      modalHidden: that.data.modalHidden,
    })

  },
  //主营显示对话框
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //主营隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

})