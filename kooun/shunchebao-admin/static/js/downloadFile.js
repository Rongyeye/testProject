var http = ajaxHttp();
function downloadFile(url, keyword, ids){
    var url= http + url;

    //定义一个form表单,通过form表单来发送请求
    var form=$("<form>");

    //设置表单状态为不显示
    form.attr("style","display:none");

    //method属性设置请求类型为post
    form.attr("method","post");

    //action属性设置请求路径,
    //请求类型是post时,路径后面跟参数的方式不可用
    //可以通过表单中的input来传递参数
    form.attr("action",url);
    $("body").append(form);//将表单放置在web中

    //在表单中添加input标签来传递参数
    //如有多个参数可添加多个input标签
    var input1=$("<input>");
    input1.attr("type","hidden");//设置为隐藏域
    input1.attr("name","keyWord");//设置参数名称
    input1.attr("value",keyword);//设置参数值
    form.append(input1);//添加到表单中

    var input2=$("<input>");
    input2.attr("type","hidden");//设置为隐藏域
    input2.attr("name","ids");//设置参数名称
    input2.attr("value",ids);//设置参数值
    form.append(input2);//添加到表单中

    form.submit();//表单提交
}