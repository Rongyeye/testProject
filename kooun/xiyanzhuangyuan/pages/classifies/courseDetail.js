import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";
import WxParse from '../../wxParse/wxParse';


Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        detail: {}

    },

    //预览图片
    previewImg: function (e) {
        let that =this, index = e.currentTarget.dataset.index;
        wx.previewImage({
            current: that.data.detail.pics[index],
            urls: that.data.detail.pics // 需要预览的图片http链接列表
        });
    },
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id
        });

        this.getCourseDetail(options.id);
    },
    onShow: function () {

    },
    getCourseDetail: function (id) {
        let that = this;
        wxRequest('/order/getArticleDetail.wx', {orderId: id}, function (res) {
            console.log("课程详情---");
            console.log(res);
            if (res.data.status == 'success') {
                that.setData({
                    detail: res.data.result
                });

                WxParse.wxParse('content', 'html', res.data.result.content, that);

            } else {
                tips.confirm(res.data.message);
            }
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
})