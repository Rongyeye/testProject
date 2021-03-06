import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";
import WxParse from '../../wxParse/wxParse';

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        bannerImg: '',

        showInputBox: true,
        comMsg: '',  //评论信息
        curIndex: '',  //当前动态

        dynamics: [],
        startPage: 1,
        paging: true,
        wxParseArrCont: [],

        dynamicPrises: [],

        dynamicComts: []
    },

    //预览活动照片
    previewImg: function (e) {
        let that =this, index = e.currentTarget.dataset.index, curImgUrl = e.currentTarget.dataset.item;
        wx.previewImage({
            current: curImgUrl,
            urls: that.data.dynamics[index].pics // 需要预览的图片http链接列表
        });
    },

    //点赞
    tapZan: function (e) {
        let that = this, index = e.currentTarget.dataset.index,
            id = that.data.dynamics[index].dynamicId,
            type = 0;  //type: 0取消点赞 , 1已点赞
        // that.data.dynamics[index].isZan = !that.data.dynamics[index].isZan;
        that.data.dynamics[index].showComBtn = true;
        this.setData({
            dynamics: that.data.dynamics
        });

        //praiseType 0=未点赞1=已点赞
        if(that.data.dynamics[index].praiseType == 1) {
            type = 0;  //取消
        } else {
            type = 1;  //点赞
        }
        wxRequest('/dynamic/praise.wx', {dynamicId: id, status: type}, function (res) {
            console.log("点赞---");
            console.log(res);
            if (res.data.status == 'success') {
                if(type == 1) {
                    tips.toast('点赞成功!');
                } else {
                    tips.toast('取消点赞', '', 'none');
                }
                that.getDynamicList(1);

            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    //显示评论, 点赞
    showComtBtn: function (e) {
        let that = this, index = e.currentTarget.dataset.index;
        for (let i=0; i<that.data.dynamics.length; i++) {
            if(i== index) {
                that.data.dynamics[index].showComBtn = !that.data.dynamics[index].showComBtn;
            } else {
                that.data.dynamics[i].showComBtn = true;
            }
        }
        this.setData({
            curIndex: index,
            dynamics: that.data.dynamics
        });
    },
    hideComtBtn: function () {
        let that = this;
        //隐藏当前动态的 赞,评论
        that.data.dynamics[that.data.curIndex].showComBtn = true;
        this.setData({
            dynamics: that.data.dynamics
        });
    },
    //点击 评论 按钮
    commentBtn: function (e) {
        let that = this, index = e.currentTarget.dataset.index;
        that.data.dynamics[index].showComBtn = !that.data.dynamics[index].showComBtn;

        this.setData({
            curIndex: index,
            showInputBox: !that.data.showInputBox,
            dynamics: that.data.dynamics,
            comMsg: ''
        });
    },
    getInputVal: function (e) {
        let that = this;
        that.data.dynamics[that.data.curIndex].showComBtn = true;  //隐藏当前动态的 赞,评论
        this.setData({
            comMsg: e.detail.value,
            dynamics: that.data.dynamics
        });
    },
    //点击发送
    sendMsg: function () {
        let that = this, id= that.data.dynamics[that.data.curIndex].dynamicId;
        that.setData({
            showInputBox: true,
        });
        console.log("id========="+id);
        console.log(that.data.comMsg);

        if(that.data.comMsg) {
            wxRequest('/dynamic/comment.wx', {dynamicId: id, connent: that.data.comMsg}, function (res) {
                console.log("评论---");
                console.log(res);
                if (res.data.status == 'success') {
                    tips.toast('评论成功!');
                    that.setData({
                        comMsg: ''
                    });
                    that.getCommentList(id, 1, that.data.curIndex);

                } else {
                    tips.confirm(res.data.message);
                }
            });
        } else {
            tips.toast('请输入评论内容!', '', 'none');
        }
    },
    onShow: function () {
        this.setData({
            showInputBox: true
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDynamicList(1);

        wx.showTabBarRedDot({
            index: 2,
        });
        wx.hideTabBarRedDot({
            index: 3,
        });
        this.getBanner();
    },

    //点击 查看更多评论
    loadMoreComment: function (e) {
        let that = this, index = e.currentTarget.dataset.index,
            id = that.data.dynamics[index].dynamicId;

        console.log("当前动态===="+index);
        if(that.data.dynamics[index].comPaging) {
            that.getCommentList(id, that.data.dynamics[index].comStartPage+1, index);
        } else {
            tips.toast('没有更多评论了', '', 'none');
        }
    },

    getBanner: function () {
        let that = this;
        wxRequest('/dynamic/topImg.wx', {}, function (res) {
            console.log("动态banner---");
            console.log(res);
            if (res.data.status == 'success') {
                that.setData({
                    bannerImg: res.data.result.topImg
                });
            } else {
                tips.confirm(res.data.message);
            }
        });
    },

    getDynamicList: function (pageStart) {
        let that = this;
        wxRequest('/dynamic/list.wx', {pageStart: pageStart, pageTotal: 5}, function (res) {
            console.log("动态列表---");
            console.log(res);
            if (res.data.status == 'success') {
                let arr = that.data.dynamics;
                if (pageStart == 1) {
                    arr = [];
                    that.setData({
                        startPage: 1
                    });
                }
                let mydata = res.data.result.data;
                for (let i = 0; i < mydata.length; i++) {
                    mydata[i].showComBtn = true;
                    mydata[i].comPaging = true;
                    mydata[i].comStartPage = 1;
                    that.getCommentList(mydata[i].dynamicId, 1, 'list');
                    that.getPriseList(mydata[i].dynamicId, i);
                }
                if (mydata.length < res.data.result.pageTotal) {
                    that.setData({
                        paging: false,
                        dynamics: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        paging: true,
                        startPage: that.data.startPage + 1,
                        dynamics: arr.concat(mydata)
                    });
                }
                /**
                 * WxParse.wxParseTemArray(temArrayName,bindNameReg,total,that)
                 * 1.temArrayName: 为你调用时的数组名称
                 * 3.bindNameReg为循环的共同体 如绑定为reply1，reply2...则bindNameReg = 'reply'
                 * 3.total为reply的个数
                 */
                    // var that = this;
                    // WxParse.wxParseTemArray("replyTemArray",'reply', replyArr.length, that)
                    // replyArr
                var replyArr = [];
                for (let i = 0; i < that.data.dynamics.length; i++) {
                    replyArr.push(that.data.dynamics[i].content);
                }

                for (let i = 0; i < replyArr.length; i++) {
                    WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
                    if (i === replyArr.length - 1) {
                        WxParse.wxParseTemArray("wxParseArrCont", 'reply', replyArr.length, that)
                    }
                }
            } else {
                tips.confirm(res.data.message);
            }
        });
    },

    getPriseList: function (id, index) {
        let that = this;
        wxRequest('/dynamic/people.wx', {dynamicId: id}, function (res) {
            // console.log("点赞列表---");
            // console.log(res);
            if (res.data.status == 'success') {

                let mydataPrise = [];
                mydataPrise = res.data.result;
                that.data.dynamicPrises.push(mydataPrise);
                console.log(that.data.dynamicPrises);

                that.setData({
                    dynamicPrises: that.data.dynamicPrises
                });

            } else {
                tips.confirm(res.data.message);
            }
        });

    },

    getCommentList: function (id, pageStart, index) {
        let that = this;
        wxRequest('/dynamic/commentList.wx', {dynamicId: id, pageStart: pageStart, pageTotal: 5}, function (res) {
            // console.log("评论列表---");
            // console.log(res);
            if (res.data.status == 'success') {
                let arr = [];
                let mydata = res.data.result.data;
                if(index != 'list') {
                    arr = that.data.dynamicComts[index];
                    if (pageStart == 1) {
                        arr = [];
                        that.data.dynamics[index].comStartPage = 1;
                        that.setData({
                            dynamics: that.data.dynamics
                        });
                    }
                    if (mydata.length < res.data.result.pageTotal || mydata.length == res.data.result.pageCount) {
                        that.data.dynamics[index].comPaging = false;
                    } else {
                        that.data.dynamics[index].comPaging = true;
                        that.data.dynamics[index].comStartPage = pageStart + 1;
                    }
                    that.data.dynamicComts[index] = arr.concat(mydata) ;
                } else {
                    that.data.dynamicComts.push(arr.concat(mydata));
                }

                that.setData({
                    dynamicComts: that.data.dynamicComts
                });


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
            that.getDynamicList(that.data.startPage);
        }

    }

})
