// pages/weChatLogin.js
const app = getApp();
import {wxRequest} from "../utils/wxRequest";
import {tips} from "../utils/tip";

Page({

    data: {
        flag: false,
    },

    getUserInfo: function (e) {
        console.log(e);

        let that = this;
        app.globalData.userInfo = e.detail.userInfo;
        that.login();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.isGetUserInfo();
        // this.login();
    },
    onShow: function () {

    },
    // 是否授权微信信息
    isGetUserInfo: function () {
        let that = this;
        wx.getSetting({
            success(res) {
                console.log('是否授权微信信息');
                console.log(res);
                if (!res.authSetting['scope.userInfo']) {
                    //还没有授权
                    that.setData({
                        flag: true
                    })
                } else {
                    //已授权,直接调用wx.login获取openId
                    tips.loading();
                    that.setData({
                        flag: false
                    });

                    that.login();
                }
            }
        });
    },
    // 微信官方接口登录
    login: function () {
        let that = this;
        wx.login({
            success: function (res) {
                console.log("wxlogin-------");
                that.getOpenId(res.code);
                tips.loaded();
            }
        });
    },
    //openId的获取
    getOpenId: function (code) {
        let that = this;
        wxRequest('/userLogin/getOpenId.wx', {code: code}, function(res) {
            console.log("openId的获取");
            console.log(res);

            if (res.data.status == 'success') {
                app.globalData.openId = res.data.openId;
                app.globalData.userkey = res.data.openId;

                var userDto = {
                    userInfo: app.globalData.userInfo,
                    openId: res.data.openId
                }
                var user = JSON.stringify(userDto);
                that.wxLogin(user);

            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    // 微信登录请求
    wxLogin: function (user) {
        let that = this;
        wxRequest('/userLogin/wechatLogin.wx', {userJson: user}, function(res) {
            console.log("登陆微信");
            console.log(res);

            if (res.data.status == 'success') {
                // app.globalData.userkey = res.data.userkey;

                wx.reLaunch({
                    url: '/pages/index/index'
                });

            }
        });
    },
})