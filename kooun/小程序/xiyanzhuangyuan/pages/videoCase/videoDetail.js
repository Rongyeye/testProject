// pages/videoCase/videoDetail.js

import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";

Page({
    data: {
        videoId: '',
        details: {},
        titlePic: '',
        videoSrc: '',
    },

    onLoad: function (options) {
        let that = this;
        console.log(options);
        this.setData({
            videoId: options.id,
            titlePic: options.titlePic
        });
        this.getVideoDetail(that.data.videoId);
    },
    onShow: function () {

    },
    getVideoDetail: function (id) {
        let that = this;
        wxRequest('/video/videoSecondary.wx', {videoId: id}, function (res) {
            console.log("视频详情---");
            console.log(res);
            if (res.data.status == 'success') {
                let d = res.data.result;
                that.setData({
                    details: d
                });
                // content
                // contentTitle
                // create_time
                // id
                // video
            } else {
                tips.confirm(res.data.message);
            }
        });
    }

})