
var uploadurl = uploadFile();

function uploadImg(elem, number) {
    var uploadNum = !number ? 1 : number;

    layui.use('upload', function () {
        var $ = layui.jquery
            , upload = layui.upload;
        //普通图片上传
        var uploadInst = upload.render({
            elem: $(elem).find('.uploadBtn')
            , multiple: true
            , number: uploadNum  //设置同时可上传的文件数量，该参数为 layui 2.2.3 开始新增
            , url: uploadurl
            // , headers: {AccessKey: '4915a6b8b79a4a53911d5f7cb269451e'}
            , before: function (obj) {
                // if(uploadNum == 1) {
                    $(elem).find('.layui-upload-list img').remove();  //清空原来的
                    $(elem).find('input[type="hidden"]').val('');  //清空原来的urlId
                // }
            }
            , done: function (res, index, upload) { //服务端响应信息、当前文件的索引、重新上传的方法
                if (res.status == 'success') {
                    $(elem).find('.uploadTip').empty();  //成功清除提示
                    //上传成功---保存urlId 到隐藏 input 内
                    var id = $(elem).find('input[type="hidden"]').val();
                    //82b3b22938f34f1fa4854856a9cb7ca7,4bce8103e2d74eafa6458fa061bfc50b,
                    if (uploadNum == 1) {
                        $(elem).find('input[type="hidden"]').val(res.result.urlId);
                    } else {
                        $(elem).find('input[type="hidden"]').val(res.result.urlId + ',' + id);
                    }
                    $(elem).find('.layui-upload-list').prepend('<img src="' + res.result.url + '" alt="" class="layui-upload-img">');
                } else {  //如果上传失败
                    return layer.msg('上传失败');
                }
            }
            , error: function () {
                //当请求上传时出现异常时触发（如网络异常、404/500等）
                //演示失败状态，并实现重传
                var demoText = $(elem).find('.uploadTip');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function () {
                    uploadInst.upload();//这是对当前上传队列的全局重新上传
                });
            }
        });
    });
}



//可单张多张上传图片
function uploadImage(elem,number,urlList){ //对应的dom、最大上传数量、回填数据用的图片路径数组 例:var img = uploadImage("#id",3,[url1,url2])
    $(elem).append('         <button type="button" class="layui-btn layui-btn-sm">' +
        '                        <i class="layui-icon layui-icon-upload"></i>上传图片' +
        '                    </button>' +
        '                    <span class="layui-text">还可以上传x张</span>\n' +
        '                    <div class="layui-upload-list">\n' +
        '                        <p class="uploadTip"></p>\n' +
        '                    </div>')
    if(urlList instanceof Array){
        for(var i=0;i<urlList.length;i++){
            addImg(urlList[i])
        }
    }
    countImg()
    function addImg(url,urlId) {
        if(!urlId){
            urlId=url
        }
        $(elem).find('.uploadTip').before('<div class="imgDiv" ondrop="drop(event,this)" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event, this)">' +
            '<img layer-src="'+url+'" data-urlId="'+urlId+'" style="height: 150px;width: auto" src="' +url + '" alt="" class="layui-upload-img">' +
            '<div style="text-align: center">' +
            '<span style="cursor:pointer;" title="移除图片">' +
            '<i class="layui-icon remove-icon" style="font-size: 30px; color: #FF5722;">&#x1007;</i>' +
            '</span>' +
            '</div>' +
            '</div>');
        initRemoveImg()
        layerPhotos(elem)
    }
    function initRemoveImg() {
        $(elem).find(".remove-icon").click(function () {
            $(this).parent().parent().parent().remove();
            countImg()
        })
    }
    function countImg() {
        if(number>$(elem).find("img").length){
            $(elem).find('button').remove()
            $(elem).prepend(' <button type="button" class="layui-btn layui-btn-sm">' +
                '                    <i class="layui-icon layui-icon-upload"></i>上传图片' +
                '                </button>')
            uploadImgs(elem,number)
        }else {
            $(elem).find('button').attr("disabled", true)
            $(elem).find('button').attr("style", "background:#c2c2c2")
            $(elem).find('.layui-text').html('还可以上传0张')
        }
    }
    function uploadImgs() {
        var num = number-$(elem).find("img").length
        $(elem).find('.layui-text').html('还可以上传'+num+'张')
        layui.use('upload', function () {
            var upload = layui.upload;
            var uploadInst = upload.render({
                elem: $(elem).find('button')
                ,multiple: true
                ,number: num  //设置同时可上传的文件数量，该参数为 layui 2.2.3 开始新增
                ,url: uploadHttp+'/file/upload'
                // ,headers:{
                //     AccessKey:'4915a6b8b79a4a53911d5f7cb269451e'
                // }
                ,before:function () {

                }
                ,done: function(res, index, upload){ //服务端响应信息、当前文件的索引、重新上传的方法
                    if(res.status == 'success'){
                        addImg(res.result.url,res.result.urlId)
                        countImg()
                    } else {  //如果上传失败
                        return layer.msg('上传失败');
                    }
                    var item = this.item; //获取当前触发上传的元素，一般用于 elem 绑定 class 的情况，注意：此乃 layui 2.1.0 新增
                }
                ,error: function(){
                    var demoText = $(elem).find('.uploadTip');
                    demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                    demoText.find('.demo-reload').on('click', function(){
                        uploadInst.upload();//这是对当前上传队列的全局重新上传
                    });
                }
            });
        });
    }

    return {
        setImg:function (urlList) {
            if(urlList instanceof Array){
                for(var i=0;i<urlList.length;i++){
                    addImg(urlList[i])
                }
            }
            countImg()
        },
        getImgUrlId:function () {
            var urlIdList = []
            $(elem).find('img').each(function () {
                if($(this).attr("data-urlId")){
                    urlIdList.push($(this).attr("data-urlId"))
                }else{
                    urlIdList.push("")
                }
            })
            return urlIdList
        }
    }
}

function allowDrop(ev)
{
    ev.preventDefault();
}

var srcdiv = null;
var imgUrl = '';
var imgUrlId = '';
var imgParentId = '';
var layerSrc = '';
function drag(ev,divdom) {
    srcdiv=divdom;
    ev.dataTransfer.setData("text/html",divdom.innerHTML);
    imgParentId = $(srcdiv).parent().parent().attr("id");
    imgUrl = $(srcdiv).find("img").attr("src");
    imgUrlId = $(srcdiv).find("img").attr("data-urlId");
    layerSrc = $(srcdiv).find("img").attr("layer-src");
}

function drop(ev,divdom) {
    ev.preventDefault();
    if(srcdiv != divdom && imgParentId == $(divdom).parent().parent().attr("id")){
        // srcdiv.innerHTML = divdom.innerHTML;
        // divdom.innerHTML=ev.dataTransfer.getData("text/html");
        $(srcdiv).find("img").attr("src",$(divdom).find("img").attr("src"));
        $(srcdiv).find("img").attr("data-urlId",$(divdom).find("img").attr("data-urlId"));
        $(srcdiv).find("img").attr("layer-src",$(divdom).find("img").attr("layer-src"));
        $(divdom).find("img").attr("src",imgUrl);
        $(divdom).find("img").attr("data-urlId",imgUrlId);
        $(divdom).find("img").attr("layer-src",layerSrc);
    }
}