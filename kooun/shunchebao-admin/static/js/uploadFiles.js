
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
            , before: function (obj) {
                // if(uploadNum == 1) {
                    $(elem).find('.layui-upload-list img').remove();  //清空原来的
                    $(elem).find('input[type="hidden"]').val('');  //清空原来的urlId
                // }

                obj.preview(function (index, file, result) {
                    $(elem).after('<input type="hidden" name="fileType" value="0">');
                });
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

function uploadVideo(elem, number) {
    var uploadNum = !number ? 1 : number;

    layui.use('upload', function () {
        var $ = layui.jquery
            , upload = layui.upload;
        //普通图片上传
        var uploadInst = upload.render({
            elem: $(elem).find('.uploadBtn')
            , multiple: true
            , number: uploadNum  //设置同时可上传的文件数量，该参数为 layui 2.2.3 开始新增
            , url: uploadVideoUrl()
            , accept: 'file' //允许上传的文件类型
            , before: function (obj) {
                $(elem).find('.layui-upload-list video').remove();  //清空原来的
                $(elem).find('input[type="hidden"]').val('');  //清空原来的urlId

                obj.preview(function (index, file, result) {
                    //在当前元素后面加一个隐藏域,用于判断图片或视频
                    $(elem).after('<input type="hidden" name="fileType" value="1">');
                });
            }
            , done: function (res, index, upload) { //服务端响应信息、当前文件的索引、重新上传的方法
                if (res.status == 'success') {
                    //上传成功---保存urlId 到隐藏 input 内
                    var id = $(elem).find('input[type="hidden"]').val();
                    //82b3b22938f34f1fa4854856a9cb7ca7,4bce8103e2d74eafa6458fa061bfc50b,
                    if (uploadNum == 1) {
                        $(elem).find('input[type="hidden"]').val(res.result.urlId);
                    } else {
                        $(elem).find('input[type="hidden"]').val(res.result.urlId + ',' + id);
                    }
                    $(elem).find('.uploadTip').before('<video src="' + res.result.url + '" controls>您的浏览器不支持 video 标签 </video>');

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