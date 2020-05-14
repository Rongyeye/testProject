// pages/wchang_phone/wchang_phone.js
import { wxRequest } from '../../utils/wxRequest.js';
import { tips } from '../../utils/tip.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取验证码 倒计时模块
    getCodeText: '获取验证码',
    time: '', //倒计时器名字
    timeNumber: 30, //倒计时数值
    codeSec: 0, //“获取验证码”样式标志 ，0为字模式，1为倒计时模式

    "phone":"",
    "code":"",
    "password":"",
    "status":true,
    
    open:"https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hNzJlNzkzNjBiOWJlMzk0N2FmY2FiZDZhNDA5YTkxYy5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLmNtbndIQk4yN3BNOGE3MmU3OTM2MGI5YmUzOTQ3YWZjYWJkNmE0MDlhOTFjLnBuZw==",
    close:"https://file.cxmlzg.infotoo.com.cn/open_file/L3NpbmdsZS9hYTY1MGU4ODIzNTFhMWU5Njg4MTdjYWQyMzcyNDRjMC5vNnpBSnN3bnE2VHNEMUNPeXgxazFPd2RUTmpVLjNnZzVFRmtrbXpUR2FhNjUwZTg4MjM1MWExZTk2ODgxN2NhZDIzNzI0NGMwLnBuZw=="
  },
//隐藏密码
  eye:function(){
    let that = this;
    that.data.status = !that.data.status,
    
    
    that.setData({
      status : that.data.status,
    })
   
  },
 //验证码倒计时
  timeDown: function (e) {
    let that = this;
    var number = that.data.timeNumber; //获取倒计时数值
    that.setData({
      time: setInterval(function () {
        number--;
        that.setData({
          timeNumber: number //赋值
        })
        if (number == 0) {
          clearInterval(that.data.time); //清除数据，减少数据占用内存
          that.setData({
            codeSec: 0 //倒计时变为0时变为字体
          })
        }
      }, 1000) //单位：毫秒,1000ms = 1s
    })
  },
  sendcoder:function(){

  },
//获取输入的验证码
  inputCode: function (e) {
    console.log(e)
    this.setData({
      code: e.detail.value
    });
  },
    // 获取更改的手机号
  getphone: function (e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    });
  },
  del: function () {
    let that = this;
    that.setData({
      phone: "",
    })
  }, 

  //输入密码
  getPassword: function (e) {
    console.log(e)
    this.setData({
      password: e.detail.value
    });
  },
//点击发送验证码按钮
  sendCode:function(res){
    let that = this;
    wxRequest('/sms/sendSmsCode.wx', {
        phone: that.data.phone,
      
    }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        tips.confirm("已发送");
        that.timeDown();
        that.setData({
          codeSec: 1 ,//变为 倒计时 模式
          timeNumber: 30

        })

      } else {
        tips.confirm(res.data.message);
       }
    });
  },
//保存提交更改的手机号
  save: function (res) {
    let that = this;
    wxRequest('/my/updateMineInfo', {
      userJson: JSON.stringify({
        userName: that.data.phone,
        code: that.data.code,
        password: that.data.password,
      })
    }, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({
          phone: res.data.result.userName,
        }),
          // 修改成功后返回登录页面重新登陆
          tips.confirm("修改成功，请重新登陆");
          wx.navigateTo({
             
            url: '/pages/XLogin/XLogin',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wxRequest('/my/mineInfo', {}, function (res) {
      console.log(res)
      if (res.data.status == 'success') {
        that.setData({

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})