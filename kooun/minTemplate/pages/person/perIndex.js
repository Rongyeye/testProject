const app = getApp();
import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_modal_Hidden: true,  //隐藏弹框

        userInfo: {},
    },

    //提示空白弹框
    showBlankPage: function () {
        let that = this;
        that.setData({
            is_modal_Hidden: false
        })
    },

    onLoad: function (options) {
        let that = this;
 
    },

    onShow: function () {

    },

    getPersonalInfo: function () {
        tips.loading();
        let that = this;
        wxRequest('/owner/myData.wx', {}, function(res) {
            console.log("获取个人信息");
            console.log(res);
            if (res.data.status == 'success') {

                that.setData({
                    userInfo: res.data.result,
                });

            } else {
                tips.confirm(res.data.message);
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