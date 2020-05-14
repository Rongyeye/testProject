// components/blankpage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      modalHidden: {
          type: Boolean,
          value: true
      }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 这里放置自定义方法
      click_close_modal: function () {
          this.setData({
              modalHidden: true,
          })
      }
  }
})
