// components/order.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        orderInfo: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        showOrderDetail: function (e) {
            let that = this, orderId = e.currentTarget.dataset.orderid,
                status = e.currentTarget.dataset.status;
            wx.navigateTo({
              url: '/pages/order/orderDetail?orderId='+orderId+'&status='+status
            })

        },

    },
    ready: function(){

    }
})
