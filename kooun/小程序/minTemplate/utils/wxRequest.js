import {tips} from "./tip";

const app = getApp();

var http = 'http://192.168.2.242:8088/kooun-kaimai-user';

/**
 * 一般请求
 * @param url  路径
 * @param data 数据
 * @param callback 回调函数
 */
function wxRequest(url, data, callback) {
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
                tips.toast('系统繁忙');

            }  //end if
            tips.loaded()
        },
        fail() {
            tips.toast('网络崩溃啦~');
            tips.loaded();
        }
    })
}

/**
 * 图片上传
 * @param filePath
 * @param callback
 */
function wxRequestUpload(filePath, callback) {
    wx.uploadFile({
        url: http + '/file/pic/upload.wx',
        filePath: filePath,
        name: 'file',
        header: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'userkey': app.globalData.userkey
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
                tips.toast('系统繁忙');
            }
            tips.loaded();
        },
        fail() {
            tips.toast('网络崩溃啦~');
            tips.loaded();
        }
    });
}

export {
    wxRequest,
    wxRequestUpload
}


