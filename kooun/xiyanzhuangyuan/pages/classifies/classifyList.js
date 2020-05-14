import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";

Page({
    data: {
        current: 0,
        curChild: 0,

        firstClassifies: [],  //一级分类
        classifyStartPage: 1,
        classifyPaging: true,

        secClassifies: [], //二级分类

        courses: [],  //课程列表
        courseStartPage: 1,
        coursePaging: true,
        curClassifyId: '',  //当前分类id
    },

    //点击一级分类
    choseTab: function (e) {
        let that = this, index = e.currentTarget.dataset.index;
        that.setData({
            current: index,
            curChild: 0,

            secClassifies: [],  //重置
            curClassifyId: that.data.firstClassifies[index].id
        });
        that.getSecClassify(that.data.firstClassifies[index].id, 'tap');

        //获取课程列表
        // that.getCourseList(1, that.data.firstClassifies[index].id);
    },

    //点击二级分类
    choseChildTab: function (e) {
        let that = this, childIndex = e.currentTarget.dataset.childindex;
        that.setData({
            curChild: childIndex,

            courseStartPage: 1,  //重置
            coursePaging: true,

            curClassifyId: that.data.secClassifies[childIndex].id
        });

        //获取课程列表
        that.getCourseList(1, that.data.secClassifies[childIndex].id);
    },

    onLoad: function (options) {
        wx.showTabBarRedDot({
            index: 2,
        });
        wx.showTabBarRedDot({
            index: 3,
        });
    },
    onShow: function () {
        this.setData({
            // current: 0,
            // curChild: 0,
        });
        this.getFirstClassify(1);
    },

    getFirstClassify: function (pageStart) {
        let that = this;
        wxRequest('/order/getOneLevelList.wx', {pageStart: pageStart, pageTotal: 15}, function (res) {
            console.log("分类一级---");
            console.log(res);

            if (res.data.status == 'success') {
                let arr = that.data.firstClassifies;
                if(pageStart == 1) {
                    arr = [];
                    that.setData({
                        classifyStartPage: 1
                    });
                }
                let mydata = res.data.result.data;


                if(mydata.length < res.data.result.pageTotal) {
                    that.setData({
                        classifyPaging: false,
                        firstClassifies: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        classifyPaging: true,
                        classifyStartPage: that.data.classifyStartPage + 1,
                        firstClassifies: arr.concat(mydata),
                    });
                }

                let curClasyId = that.data.firstClassifies[that.data.current].id

                that.setData({
                    curClassifyId: curClasyId
                });
                //获取课程列表---获取当前一级下的课程
                that.getCourseList(1, curClasyId);

            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    getSecClassify: function (id, type) {
        let that = this;
        wxRequest('/order/getTwoLevelList.wx', {oneId: id}, function (res) {
            console.log("分类二级---");
            console.log(res);
            if (res.data.status == 'success') {
                let mydata = res.data.result;
                if(mydata.length != 0) {
                    let curId = mydata[that.data.curChild].id;
                    that.setData({
                        secClassifies: mydata,
                        curClassifyId: curId
                    });
                    if(type == 'tap') { //点击一级
                        //获取课程列表
                        that.getCourseList(1, id);  //一级分类id
                    } else {
                        //获取课程列表
                        that.getCourseList(1, curId);  //二级分类id
                    }
                } else {
                    //获取课程列表
                    that.getCourseList(1, id);  //一级分类id
                }
            } else {
                tips.confirm(res.data.message);
            }
        });
    },
    getCourseList: function (pageStart, curClasfyId) {
        let that = this;
        wxRequest('/order/getArticleList.wx', {pageStart: pageStart, pageTotal: 10, parentId: curClasfyId}, function (res) {
            console.log("分类下的课程---");
            console.log(res);
            if (res.data.status == 'success') {
                let arr = that.data.courses;
                if(pageStart == 1) {
                    arr = [];
                    that.setData({
                        courseStartPage: 1
                    });
                }
                let mydata = res.data.result.data;

                if(mydata.length < res.data.result.pageTotal) {
                    that.setData({
                        coursePaging: false,
                        courses: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        coursePaging: true,
                        courseStartPage: that.data.courseStartPage + 1,
                        courses: arr.concat(mydata)
                    });
                }

            } else {
                tips.confirm(res.data.message);
            }
        });
    },

    lowerMoreClassify: function () {
        if(this.data.classifyPaging) {
            this.getFirstClassify(this.data.classifyStartPage)
        }
    },
    lowerMoreCourse: function () {
        if(this.data.coursePaging) {
            this.getCourseList(this.data.courseStartPage, this.data.curClassifyId)
        }
    }
})