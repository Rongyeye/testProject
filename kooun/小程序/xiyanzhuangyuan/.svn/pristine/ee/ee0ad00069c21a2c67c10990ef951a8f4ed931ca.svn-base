Component({
  /**
   * 组件的属性列表
   */
  options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
      modalHidden: {
          type: Boolean,
          value: true
      }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
      title: {
          type: String,
          value: '',
      },
      bgcolor: {
          type: String,
          value: '#ffffff'
      },
      minheight: {
          type: String,
          value: '300rpx'
      },
      showIcon: {
          type: Boolean,
          value: true
      },
      suc_sign: {
          type: Boolean,
          value: false
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      // 这里是一些组件内部数据
      text: "text",
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 这里放置自定义方法
      click_close_modal: function () {
          this.setData({
              modalHidden: true,
          });
      }
  }
})
