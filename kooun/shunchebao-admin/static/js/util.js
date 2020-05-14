var http = ajaxHttp()
function ajaxHttp() {
    // return 'http://192.168.1.129:8090/kooun-sports-admin' //梁烈
    // return 'http://192.168.1.124:8083/kooun-sports-admin' //喜沛
    // return 'http://192.168.1.38:8094/kooun-sports-admin' //贤丽

    // return 'http://47.106.197.214:8086/kooun-sports-admin' //服务器
    return 'http://dlladminafter.infotoo.com.cn/kooun-sports-admin' //服务器
}

function uploadFile() {
    // return 'http://192.168.1.124:8000/kooun-file/file/pic/upload.wx'

    // return 'http://47.106.197.214:8087/kooun-file/file/pic/upload.wx'  //服务器
    return 'http://dllimgafter.infotoo.com.cn/kooun-file/file/pic/upload.wx'  //服务器
}

function uploadVideoUrl() {
    return 'http://dllimgafter.infotoo.com.cn/kooun-file/file/video/upload'
}

var basePath = this.getBasePath();
function getBasePath() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
/**
 * 高德地图 key
 * @returns {string}
 */
function mapKey() {
    return '3dd169dae7ed3cbcdca3cb400ed98299'
}
// $(function () {
//     document.title="weixiaobao-admin";
//     var kMeta = document.createElement('meta');
//     kMeta.content = '尾箱宝登陆,尾箱宝后台管理端登陆界面,尾箱宝账号登陆';
//     kMeta.name = 'keyworks';
//     document.getElementsByTagName('head')[0].appendChild(kMeta);
//
//     var dMeta = document.createElement('meta');
//     dMeta.content = '尾箱宝登陆,尾箱宝后台管理端登陆界面,尾箱宝账号登陆';
//     dMeta.name = 'description';
//     document.getElementsByTagName('head')[0].appendChild(dMeta);
// })

var storage=window.localStorage;
function getUserKey(key) {
    storage.userkey=key;
    storage.role = 0;
}

function userkey() {
    return storage.userkey
}
function role() {
    return storage.role
}

//重写ajax请求
var loadingCount = 0;
(function($){
    var _ajax=$.ajax;       //备份jquery的ajax方法
    $.ajax=function(opt){   //重写jquery的ajax方法
        var fn = {          //备份opt中error和success方法
            error:function(XMLHttpRequest, textStatus, errorThrown){},
            success:function(data, textStatus){}
        }
        if(opt.error){
            fn.error=opt.error;
        }
        if(opt.success){
            fn.success=opt.success;
        }
        var _opt = $.extend(opt,{//扩展增强处理
            xhrFields: opt.xhrFields || { withCredentials: true },
            type: opt.type || "post",
            beforeSend:function(XHR){
                loadingCount++;
                if(loadingCount==1){
                    $("body").append('<div class="layui-layer-shade" id="layui-layer-shade2" times="2" style="z-index: 20000000; background-color: rgb(0, 0, 0); opacity: 0.1;"></div>')
                    $("body").append('<div class="layui-layer layui-layer-loading" id="layui-layer2" type="loading" times="2" showtime="0" contype="string" style="z-index: 19891016; top: 50%; left: 50%;-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);transform: translate(-50%,-50%);"><div id="" class="layui-layer-content layui-layer-loading1"></div><span class="layui-layer-setwin"></span></div>')
                }
            },
            complete:function(XHR, TS){//请求完成后回调函数 (请求成功或失败之后均调用)。
                loadingCount--;
                if(loadingCount==0){
                    $(".layui-layer-shade").remove()
                    $(".layui-layer-loading").remove()
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data, textStatus){
                fn.success(data, textStatus);
            }
        });
        _ajax(_opt);
    };
})(jQuery);

