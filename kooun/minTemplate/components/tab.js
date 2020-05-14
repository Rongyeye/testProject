// pages/modal/tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabList: {
            type: Array,
            value: []
        },
        current: {
            type: String,
            value: '0'
        },
        isfixed: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // current: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 点击tab切换
         */
        switchTab(e) {
            let that = this;
            if (that.data.current == e.currentTarget.dataset.current) {
                return false;
            } else {
                that.setData({
                    current: e.currentTarget.dataset.current
                });
            }
            this.triggerEvent('currentTab', that.data.current);
        }

    }
})
