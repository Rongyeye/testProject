import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";

Page({
    data: {
        startPage: 1,
        paging: true,
        videos: [],
    },
    //跳转到详情
    tapShowDetail: function (e) {
        let that =this, index = e.currentTarget.dataset.index;
        wx.navigateTo({
          url: 'videoDetail?id='+that.data.videos[index].id+'&titlePic='+that.data.videos[index].titlePic
        });
    },
    onLoad: function (options) {
        wx.hideTabBarRedDot({
            index: 2,
        });
        wx.showTabBarRedDot({
            index: 3,
        });
        this.getVideoList(1);
    },
    onShow: function () {

    },

    getVideoList: function (pageStart) {
        let that = this;
        wxRequest('/video/videoLevel.wx', {pageStart: pageStart, pageTotal: 10}, function (res) {
            console.log("视频列表---");
            console.log(res);
            if (res.data.status == 'success') {
                let arr = that.data.videos;
                if(pageStart == 1) {
                    arr = [];
                    that.setData({
                        startPage: 1
                    });
                }
                let mydata = res.data.result.data;
                if(mydata.length < res.data.result.pageTotal) {
                    that.setData({
                        paging: false,
                        videos: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        paging: true,
                        startPage: that.data.startPage + 1,
                        videos: arr.concat(mydata)
                    });
                }
            } else {
                tips.confirm(res.data.message);
            }
        });
    },


    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        if(that.data.paging) {
            that.getVideoList(that.data.startPage);
        }
    }
});