import {tips} from "./tip";

const app = getApp();

var http = 'https://user.cxmlzg.infotoo.com.cn/kooun-user'; 
// var http = 'http://127.0.0.1:8080/kooun-user';

var uploadHttp = 'https://file.cxmlzg.infotoo.com.cn';

var mapHttp = 'https://restapi.amap.com';

function wxRequest(url, data, callback) {
    let that = this;
    wx.request({
        url: http + url,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'userkey': app.globalData.userkey
        },
        method: 'POST',
        data: data,
        success(res) {
            if (res.statusCode == 200) {
                // if(res.data.status == '401') {
                //     tips.confirm('登录失效，请重新登录！').then(
                //         function (res) {  //确定
                //             wx.navigateTo({
                //                 url: '/pages/weChatLogin'
                //             });
                //             console.log("确定登录");
                //         }, function (res) {  //取消

                //         });
                // } else {
                    typeof callback == "function" && callback(res);
                // }

            } else {
                tips.toast('系统繁忙', '', "none");
            }  //end if
            tips.loaded()
        },
        fail() {
            tips.toast('网络崩溃啦~', '', "none");
            tips.loaded();
        }
    });
}

function wxRequestUpload(filePath, callback) {
    wx.uploadFile({
      url: uploadHttp + '/upload',
        filePath: filePath,
        name: 'file',
        header: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
          'userkey': app.globalData.userkey,
          'AccessKey': "4915a6b8b79a4a53911d5f7cb269451e"
        },
        method: 'POST',
        success(res) {
            if (res.statusCode == 200) {

                typeof callback == "function" && callback(res);

            } else if (res.statusCode == 401) {
                tips.confirm('登录失效，请重新登录！').then(
                    function (res) {
                        wx.navigateTo({
                            url: '/pages/login/login'
                        });
                    }
                );
            } else {
                tips.toast('系统繁忙', '', "none");
            }
            tips.loaded();
        },
        fail() {
            tips.toast('网络崩溃啦~', '', "none");
            tips.loaded();
        }
    });
}

// 高德地图请求接口
function mapApi(url, data, callback) {
    wx.request({
        url: mapHttp + url,
        method: "POST",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        data: data,
        success: function (res) {
            if (res.data.status == "1") {

                typeof callback == "function" && callback(res);

            } else {
                tips.toast('系统繁忙', '', "none");
            }
        },
        fail: function (res) {
            tips.toast('网络崩溃啦~', '', "none");
        }
    })
}

export {
    wxRequest,
    wxRequestUpload,
    mapApi,
    http
}


