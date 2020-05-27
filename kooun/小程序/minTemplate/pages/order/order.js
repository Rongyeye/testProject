// pages/test/changePhone.js
import {wxRequest} from "../../utils/wxRequest";
import {tips} from "../../utils/tip";

Page({
    data: {
        tab_items: ['未使用', '已预约', '已完成', '已评价'],
        current: 0,

        //模拟数据
        order: [
            {
                orderId: '11',
                orderNum: '12343jf3i45u4543',
                status: 0,
                orderItem: [
                    {
                        image: '../imgs/bgImg.jpg',
                        title: '商品商品1111',
                        cate: '蓝色M',
                        totalNum: 2,
                        totalPrice: '1000'
                    },
                    {
                        image: '../imgs/bgImg.jpg',
                        title: '商品商品222222',
                        cate: '蓝色M',
                        totalNum: 2,
                        totalPrice: '1000'
                    },
                ]
            },
            {
                orderId: '22',
                orderNum: '45fdfewr5663232',
                status: 1,
                orderItem: [
                    {
                        image: '../imgs/bgImg.jpg',
                        title: '商品商品33333333',
                        cate: '蓝色M',
                        totalNum: 2,
                        totalPrice: '1000'
                    },
                    {
                        image: '../imgs/bgImg.jpg',
                        title: '商品商品4543423',
                        cate: '蓝色M',
                        totalNum: 2,
                        totalPrice: '1000'
                    },
                ]

            },
        ],

        orderItems: [],
        startPage: 1,
        paging: true,  //分页加载数据
    },
    //tab
    getCurrentTab: function (e) {
        let that = this;
        console.log(e.detail);
        that.setData({
            current: e.detail
        });

        this.getOrder(1, e.detail);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;

        console.log(options);

        that.setData({
            current: options.cur
        });

        this.getOrder(1, options.cur);

    },
    onShow: function () {

    },

    getOrder(pageStart, type) {
        let that = this;
        wxRequest('/order/getOrderAllPage.wx', {pageStart: pageStart, type: type }, function (res) {
            console.log("订单列表");
            console.log(res);
            if (res.data.status == 'success') {
                let arr = that.data.orderItems;
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
                        orderItems: arr.concat(mydata)
                    });
                } else {
                    that.setData({
                        paging: true,
                        startPage: that.data.startPage + 1,
                        orderItems: arr.concat(mydata)
                    });
                }

            } else {
                tips.confirm(res.data.message);
            }
        })
    },



    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        if(that.data.paging) {
            that.getOrder(that.data.startPage, that.data.current);
        }
    }
})