import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";

const app = getApp();

Page({
    data: {
        bgColor: 'transparent',  //新手优惠券
        showIcon: false,  //新手优惠券
        is_modal_Hidden: true,  //新手优惠券

        banners: [],
        address: '',
        phone: '',

        courseList: [],
        coursePaging: true,
        courseStartPage: 1,
        courseCount: 0,
        actiCourse: 0,

        activities: [],
        actiPaging: true,
        actiStartpage: 1,
        actiCount: 0,
        activeCur: 0,


        enterprise: [],
        enterpPaging: true,
        enterpStartpage: 1,
        enterpCount: 0,
        activeEnterp: 0,

        scrollItemContWidth: 0,  //当前滚动区域内容宽
    },
    makePhone: function () {
        let that = this;
        wx.makePhoneCall({
            phoneNumber: that.data.phone,
            success: function () {
                console.log('电话: '+that.data.phone);
            }
        })
    },
    //滚动：精品课程
    scrollCourse: function (e) {
        let scrollLeft = e.detail.scrollLeft,
            i = scrollLeft / this.data.scrollItemContWidth;
        this.setData({
            actiCourse: Math.round(i)
        });
    },
    //活动照片
    scrollActivity: function (e) {
        let scrollLeft = e.detail.scrollLeft,
            i = scrollLeft / this.data.scrollItemContWidth;
        this.setData({
            activeCur: Math.round(i)
        });
    },
    //滚动企业风采
    scrollEnterprise: function (e) {
        let scrollLeft = e.detail.scrollLeft,
            i = scrollLeft / this.data.scrollItemContWidth;
        this.setData({
            activeEnterp: Math.round(i)
        });
    },
    //点击关注公众号，显示二维码
    showFocusCode: function () {
        this.setData({
            is_modal_Hidden: false
        });
    },
    onLoad: function () {
        let that = this;
        wx.showTabBarRedDot({
            index: 2,
        });
        wx.showTabBarRedDot({
            index: 3,
        });

        this.getBanner();
        this.getAddress();
        this.getQualityCourse(1);
        this.getActivities(1);
        this.getEnterprise(1);

        wx.getSystemInfo({
            success(res) {
                that.setData({
                    scrollItemContWidth: (res.windowWidth*2-60)/2
                });
            }
        })
    },
    onShow: function () {

    },

    //预览活动照片
    previewImg: function (e) {
        let that =this, index = e.currentTarget.dataset.index, urls = [];
        for (let i=0; i<that.data.activities.length; i++) {
            urls.push(that.data.activities[i].pic);
        }
        wx.previewImage({
            current: that.data.activities[index].pic,
            urls: urls // 需要预览的图片http链接列表
        });
    },

    //跳转课程详情
    ToCourseDetail: function (e) {
        let id = e.currentTarget.dataset.id;
        console.log(e);
        wx.navigateTo({
            url: '/pages/classifies/courseDetail?id='+id
        })
    },

    getBanner: function () {
        let that = this;
        wxRequest('/banner/home.wx', {}, function (res) {
            console.log("banner---");
            console.log(res);
            if (res.data.status == 'success') {
                that.setData({
                    banners: res.data.result
                });
            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    getAddress: function () {
        let that = this;
        wxRequest('/home/address.wx', {}, function (res) {
            console.log("公司地址---");
            console.log(res);
            if (res.data.status == 'success') {
                that.setData({
                    address: res.data.result.val,
                    phone: res.data.result.companyPhone
                });
            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    getQualityCourse: function (pageStart) {
        let that = this;
        wxRequest('/order/getHeadArticleList.wx', {pageStart: pageStart, pageTotal: 10}, function (res) {
            console.log("精品课程---");
            console.log(res);
            if (res.data.status == 'success') {
                let arr = that.data.courseList;
                if(pageStart == 1) {
                    arr = [];
                }
                let mydata = res.data.result.data;
                if(mydata.length < res.data.result.pageTotal) {
                    that.setData({
                        coursePaging: false,
                        courseList: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        coursePaging: true,
                        courseStartPage: that.data.courseStartPage + 1,
                        courseList: arr.concat(mydata)
                    });
                }
                that.setData({
                    courseCount: Math.ceil(res.data.result.pageCount / 2)
                });
            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    getActivities: function (pageStart) {
        let that = this;
        wxRequest('/activity/getActivityPicList.wx', {pageStart: pageStart, pageTotal: 10}, function (res) {
            console.log("活动---");
            console.log(res);
            if (res.data.status == 'success') {
                let arr = that.data.activities;
                if(pageStart == 1) {
                    arr = [];
                }
                let mydata = res.data.result.data;
                if(mydata.length < res.data.result.pageTotal) {
                    that.setData({
                        actiPaging: false,
                        activities: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        actiPaging: true,
                        actiStartpage: that.data.actiStartpage + 1,
                        activities: arr.concat(mydata)
                    });
                }
                that.setData({
                    actiCount: Math.ceil(res.data.result.pageCount / 2)
                });
            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    getEnterprise: function (pageStart) {
        let that = this;
        wxRequest('/corporate/getCorporateList.wx', {pageStart: pageStart, pageTotal: 5}, function (res) {
            console.log("企业风采---");
            console.log(res);
            if (res.data.status == 'success') {
                let arr = that.data.enterprise;
                if(pageStart == 1) {
                    arr = [];
                }
                let mydata = res.data.result.data;
                if(mydata.length < res.data.result.pageTotal) {
                    that.setData({
                        enterpPaging: false,
                        enterprise: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        enterpPaging: true,
                        enterpStartpage: that.data.enterpStartpage + 1,
                        enterprise: arr.concat(mydata)
                    });
                }
                let count = Math.ceil(res.data.result.data[0].pics.length / 3);
                that.setData({
                    enterpCount: count
                });
            } else {
                tips.confirm(res.data.message);
            }
        });
    },

    //课程, 分页
    // moreCourse: function () {
    //     if(this.data.coursePaging) {
    //         this.getQualityCourse(this.data.courseStartPage);
    //     }
    // },

    //活动, 分页
    // moreActivities: function () {
    //     if(this.data.actiPaging) {
    //         this.getActivities(this.data.actiStartpage);
    //     }
    // },

    //企业风采, 分页
    // moreEnterprise: function () {
    //     if(this.data.enterpPaging) {
    //         this.getEnterprise(this.data.enterpStartpage);
    //     }
    // },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage(res) {
        return {
            title: '喜宴庄园',
            path: '/pages/weChatLogin'
        }
    }
})
