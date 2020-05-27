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

function layerPhotos(elem) {
    layui.use('layer',function () {
        var layer = layui.layer;
        layer.photos({
            photos: elem
            ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        });
    })
}

//form序列化为json
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


/**
 * layui框架专用恢复标签原样式
 * @param obj
 * @returns
 */
function cancelWarn2(obj){
    $(obj).css('border-color', '#01AAED');
}

/**
 * 列表查看图片（大图）
 * @param elem  点击单元格
 * @param layer
 */
function previewImg(elem, layer) {
    elem.click(function () {
        var imgUrl = $(this).find('img').attr('src');
        layer.open({
            type: 1,
            title: false,
            area: ['300px', '300px'],
            id: 'previewImgBox',
            content: '<img style="max-width: 100%; max-height: 100%;" src="'+imgUrl+'" alt="">' //这里content是一个普通的String
        });
    });
}

/**
 * 删除对应input标签中的提示标签和input样式
 * @param obj
 * @returns
 */
function cancelWarn(obj){
    $(obj).removeClass("alert-danger");
    $(".text-warning").remove();
}

/**
 * 通用表单校验success方法业务处理
 * data的json数据结构必须是
 * [{status:<error/success/或其他>},{message:<消息>}]
 *
 * @param layer layui的对象 必须传
 * @param data ajax success方法的对象 必须传
 * @param successUrl 校验成功跳转链接,首字符必须加'/'
 * @param errorUrl 校验失败跳转链接,首字符必须加'/'
 * @returns
 */

var timer,sUrl,eUrl,dataObject={}
function successService(dataObj,successUrl,errorUrl){
    dataObject = dataObj
    sUrl = successUrl
    eUrl = errorUrl
    $(".layui-layer-msg").remove()
    layui.use('layer',function () {
        var layerObj = layui.layer;
        if(dataObj.status=="success"){
            layerObj.msg("<h2 style='color:#009688'>"+dataObj.message+"</h2>", {icon: 6, anim: 5,zIndex:99999999,offset: 'auto'});
        }else if(dataObj.status=="error"){
            layerObj.msg("<h2 style='color:#FF5722'>"+dataObj.message+"</h2>",{icon: 5, anim: 5,zIndex:99999999});
        }else if(dataObj.status==403){
            layerObj.msg("<h2 style='color:#FF5722'>"+dataObj.message+"</h2>",{icon: 5, anim: 5,zIndex:99999999});
        }else if(dataObj.status==401){
            alertLoginTimeOut(dataObj.message);
        }else if(dataObj.status==404){
            layerObj.msg("<h2 style='color:#FF5722'>"+'系统繁忙'+"</h2>",{icon: 5, anim: 5,zIndex:99999999});
        }
        $(".layui-layer-msg").attr("style","left: 50%;top: 50%;-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);transform: translate(-50%,-50%)")
        clearTimeout(timer);
        timer = setTimeout('toHref()',2000);
    })
}
function toHref() {
    if(dataObject.status=="success" && sUrl != null){
        location.href = sUrl;
    }else if(dataObject.status=="error" && eUrl != null || dataObject.status==403 && eUrl != null){
        location.href = eUrl;
    }
    $(".layui-layer-msg").remove()
}


//获取url后的参数值
function getUrlParam() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 调用方式：$("#formId").populateForm(data);
// 把数据填充到表单，data为对象
$.fn.populateForm = function(data){
    return this.each(function(){
        var formElem, name;
        if(data == null){this.reset(); return; }
        for(var i = 0; i < this.length; i++){
            formElem = this.elements[i];
            //checkbox的name可能是name[]数组形式
            name = (formElem.type == "checkbox")? formElem.name.replace(/(.+)\[\]$/, "$1") : formElem.name;
            if(data[name] == undefined) continue;
            switch(formElem.type){
                case "checkbox":
                    if(data[name] == ""){
                        formElem.checked = false;
                    }else{
                        //数组查找元素
                        if(data[name].indexOf(formElem.value) > -1){
                            formElem.checked = true;
                        }else{
                            formElem.checked = false;
                        }
                    }
                    break;
                case "radio":
                    if(data[name] == ""){
                        formElem.checked = false;
                    }else if(formElem.value == data[name]){
                        formElem.checked = true;
                    }
                    break;
                case "button": break;
                default: formElem.value = data[name];
            }
        }
    });
};
$(".search-box").prepend('<button onclick="history.go(0)" class="layui-btn layui-btn-sm layui-bg-gray"><i class="layui-icon">&#xe669;</i></button>')

function hoverOpenImg(){
    var img_show = null; // tips提示
    $('td img').hover(function(){
        var kd=$(this).width();
        kd1=kd*3;          //图片放大倍数
        kd2=kd*3+30;       //图片放大倍数
        var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:"+kd1+"px;' />";
        img_show = layer.tips(img, this,{
            tips:[2, 'rgba(41,41,41,.5)']
            ,area: [kd2+'px']
        });
    },function(){
        layer.close(img_show);
    });
    $('td img').attr('style','max-width:70px;display:block!important');
}

function alertLoginTimeOut(msg) {
    layui.use(['layer'], function () {
        var layer=layui.layer;
        top.layer.open({
            content: msg,
            // closeBtn: 0,
            zIndex:99999999,
            anim: 6,
            btnAlign: 'c',
            yes: function(index, layero) {
                // location.href=basePath+'/views/login.html';
                location.href = 'http://dlladmin.infotoo.com.cn/views/index.html'
            },
        });
    })
}

function formRender() {
    layui.use(['form'], function () {
        var form = layui.form;
        form.render();
    })
}

function elementRender() {
    layui.use(['form'], function () {
        var element = layui.element;
        element.render();
    })
}

function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }
    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    function md5_WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

//jquery select下拉框通过text找value
function selectValue(obj, text) {
    var val = "";
    $(obj).find('option').each(function () {
        if ($(this).text() == text) {
            val = $(this).val();
            return false;
        }
    });
    return val;
}

/**
 * 检测input框输入内容变化,
 */
// $("body").on("input  propertychange",".layui-input, .layui-textarea",function(){
//     var maxLength = $(this).attr('maxlength');
//     var curLength = this.value.length;
//     $(this).next('span').text(curLength+'/'+maxLength);
// });



/**
 * 自定义下拉框，如页面批量操作， 如页面：recycle-bin/R-other.html
 * 注意：批量操作按钮，需添加：e.stopPropagation();
 */
// $(document).click(function(){
//     $('.export_list').hide();
// });
$(document).click(function () {
    $('.flow_box').hide();
});

/** 定义时间、日期范围
 * 时间：#sTime, #eTime
 * 日期：#dateStart，#dateEnd
 */
layui.use(['laydate'], function () {
    var laydate = layui.laydate;
    var startTime = laydate.render({
        elem: '#sTime',
        type: 'time',
        done: function (value, date) {
            endTime.config.min = {
                year: date.year,
                month: date.month - 1,
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
            };
        }
    });
    var endTime = laydate.render({
        elem: '#eTime',
        type: 'time',
        done: function (value, date) {
            startTime.config.max = {
                year: date.year,
                month: date.month - 1,
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
            }
        }
    });

    var sdate = laydate.render({
        elem: '#dateStart', //指定元素
        type: 'datetime',
        done: function (value, date) {
            edate.config.min = {
                year: date.year,
                month: date.month - 1,
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
            }
        }
    });
    var edate = laydate.render({
        elem: '#dateEnd', //指定元素
        type: 'datetime',
        done: function (value, date) {
            sdate.config.max = {
                year: date.year,
                month: date.month - 1,
                date: date.date,
                hours: date.hours,
                minutes: date.minutes,
                seconds: date.seconds
            }
        }
    });
});


/**
 * index.html 页面添加新 tab
 * @param layid
 * @param src
 * @param title
 * @param parentIndex 左侧菜单li 的 index
 * @param childIndex 当前子级 index
 * @param isChild 是否有二级: 1-有
 */
function addParentTab(layid, src, title, parentIndex, childIndex, isChild) {
    var iframeHeight = $('.layui-tab-content').height()+'px';
    layui.use('element', function () {
        var $ = layui.jquery, element = layui.element;
        // if(!$(this)[0].hasAttribute('data-url') || $(this).attr('data-url')===''){
        //     return;
        // }
        var tabs = $(".layui-tab-title").children();
        var lay_id = layid;

        for(var i = 0; i < tabs.length; i++) {
            if($(tabs).eq(i).attr("lay-id") == lay_id) {
                element.tabChange('admin-tab', lay_id);
                return;
            }
        }
        var tle = '<i aria-hidden="true" class="fa fa-circle-thin"></i><cite>'+title+'</cite><i data-pindex="'+parentIndex+'" data-cindex="'+childIndex+'" data-ischild="'+isChild+'" class="menuIndex"></i>';
        //新增一个Tab项
        element.tabAdd('admin-tab', {
            title: tle,
            content: '<iframe src="' + src + '" style="height: '+iframeHeight+';"></iframe>',
            id: lay_id
        });
        element.tabChange("admin-tab", lay_id);
    });
}

/**
 * 子页面添加 tab
 * @param layid
 * @param title
 * @param src
 */
function addTab(layid, title, src) {
    var iframeHeight2 = $('.layui-tab-content', window.parent.document).height()+'px';
    layui.use('element', function () {
        var $ = layui.jquery, element = layui.element;

        var tabs = parent.$(".layui-tab-title").children();
        var lay_id = layid;

        for(var i = 0; i < tabs.length; i++) {
            if($(tabs).eq(i).attr("lay-id") == lay_id) {
                parent.layui.element.tabChange('admin-tab', lay_id);
                return;
            }
        }
        //新增一个Tab项
        parent.layui.element.tabAdd('admin-tab', {
            title: title,
            content: '<iframe src="'+src+'" style="height: '+iframeHeight2+';"></iframe>',
            id: lay_id
        });
        parent.layui.element.tabChange("admin-tab", lay_id);

    });
}

/**
 * 子页面删除 tab
 * @param layid
 */
function deltTab(layid) {
    layui.use('element', function () {
        var $ = layui.jquery, element = layui.element;
        parent.layui.element.tabDelete("admin-tab", layid);
    });
}
