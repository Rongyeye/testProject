// pages/my_detail/my_detail.js
import { wxRequest, wxRequestUpload } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    nickname:"",
    phone: "",
    imgId:""
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
  //修改头像
  //选择图片
  
  upimg: function (e) {
    console.log(e);
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          img: res.tempFilePaths,
        });
        that.uploadImg(res.tempFilePaths[0]);
      }
    });
  },
  //传照片
  uploadImg: function (filepath) {
    let that = this;
    console.log(filepath);
    wxRequestUpload(filepath, function (res) {

      console.log("上传照片");
      console.log(res);
      var myd = JSON.parse(res.data);
      if (myd.status == "success") {//上传图片成功
        that.setData({
          img: myd.result.url,
          imgId: myd.result.urlId,
          });

        console.log("imgId");
        console.log(that.data.imgId);
        console.log("img");
        console.log(that.data.img);
        //上传图片id，请求修改头像
        wxRequest('/my/updateHeadUrl', { headId : that.data.imgId}, function (res) {
        
          
          if (res.data.status == 'success') {
         
            console.log(res)
            that.setData({
              // img: res.data.result.headPic,
            
            })
          } else {
            tips.confirm(res.data.message);
            wx.navigateTo({
              url: '/pages/XLogin/XLogin',
            })

          }
        });  
      } else {
        tips.confirm(myd.message);
      }

    })
  },
bind_changename:function(){
  wx.navigateTo({
    url: '/pages/wchang_name/wchang_name',
  })
},
bind_changeid:function(){
  wx.navigateTo({
    url: '/pages/wchang_phone/wchang_phone',
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
    let that = this;
    wxRequest('/my/mineInfo', {}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          img: res.data.result.headPic,
          nickname: res.data.result.nickName,
          phone: res.data.result.userName,
        })
      } else {
        tips.confirm(res.data.message);
        wx.navigateTo({
          url: '/pages/XLogin/XLogin',
        })

      }
    });  
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

 
})