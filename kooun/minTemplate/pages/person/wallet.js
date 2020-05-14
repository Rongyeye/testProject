// pages/test/changePhone.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_modal_Hidden: true,  //隐藏弹框
        is_modal_Hidden_money: true,  //隐藏弹框
        titleMoney: '账户余额',

    },
    showBlankPage: function () {
        let that = this;
        that.setData({
            is_modal_Hidden: false
        })
    },
    showWaltModal: function () {
        let that = this;
        that.setData({
            is_modal_Hidden_money: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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