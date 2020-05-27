//app.js
App({
    onLaunch: function () {
        //检测新版本
        let updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            if (res.hasUpdate) {
                wx.showToast({
                    title: '即将更新新版本！',
                    icon: 'none',
                    duration: 10000
                })
            }
            console.log("检测新版本");
            console.log(res.hasUpdate);
        });
        updateManager.onUpdateReady(function () {
            wx.hideToast();
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
            // wx.showModal({
            //     title: '更新提示',
            //     content: '新版本已经准备好，确认重启',
            //     showCancel: false,
            //     success: function (res) {
            //         if (res.confirm) {
            //
            //         }
            //     }
            // })
        });
        updateManager.onUpdateFailed(function () {
            console.log("版本更新失败");
        });
    },
  globalData: {
      userInfo: null,
      openId: '',
      userkey: ''
  }
})