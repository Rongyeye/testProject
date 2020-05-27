var active;
var pIndex = '', cIndex = '', flg = 0;  //flg 是否有下级
layui.use(['layer', 'element'], function() {
    var $ = layui.jquery,
        layer = layui.layer;
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    element.on('nav(demo)', function(elem){
        //layer.msg(elem.text());
    });
    /**
     * 监测顶部tab 切换，并在menu菜单对应响应
     */
    element.on('tab(admin-tab)', function(data){
        var menuPIndex = $(this).find('.menuIndex').attr('data-pindex'),
            menuCIndex = $(this).find('.menuIndex').attr('data-cindex'),
            menuFlg = $(this).find('.menuIndex').attr('data-ischild');

        if(menuFlg == 1) { //有下级
            $('#menu li').removeClass('layui-this').find('dd').removeClass('layui-this'); //移除所有的选中
            $('#menu li').eq(menuPIndex).addClass('layui-nav-itemed').find('dl').eq(menuCIndex).find('dd').addClass('layui-this');
        } else {
            $('#menu li').find('dd').removeClass('layui-this');
            $('#menu li').eq(menuPIndex).addClass('layui-this').siblings().removeClass('layui-this');
        }
    });

    //触发事件
    active = {
        tabAdd: function(obj){
            var lay_id = $(this).attr("lay-id");
            var title = $(this).html() + '<i data-pindex="'+pIndex+'" data-cindex="'+cIndex+'" data-ischild="'+flg+'" class="layui-icon menuIndex" data-id="' + lay_id + '"></i>';
            //新增一个Tab项
            element.tabAdd('admin-tab', {
                title: title,
                content: '<iframe src="' + $(this).attr('data-url') + '"></iframe>',
                id: lay_id
            });
            element.tabChange("admin-tab", lay_id);
        },
        tabDelete: function(lay_id){
            element.tabDelete("admin-tab", lay_id);
        },
        tabChange: function(lay_id){
            element.tabChange('admin-tab', lay_id);
        }
    };
    //添加tab
    $(document).on('click','a',function(){
        if(!$(this)[0].hasAttribute('data-url') || $(this).attr('data-url')===''){
            return;
        }
        var parIndex = $(this).attr('data-parenti'),
            chilIndex = $(this).attr('data-childi') || 'qq',
            isChild = $(this).attr('data-ischild') || '0';
        pIndex = parIndex;
        cIndex = chilIndex;
        flg = isChild;
        var tabs = $(".layui-tab-title").children();
        var lay_id = $(this).attr("lay-id");

        for(var i = 0; i < tabs.length; i++) {
            if($(tabs).eq(i).attr("lay-id") == lay_id) {
                active.tabChange(lay_id);
                return;
            }
        }
        active["tabAdd"].call(this);
        resize();
    });

    //iframe自适应
    function resize(){
        var $content = $('.admin-nav-card .layui-tab-content');
        $content.height($(this).height() - 147);
        $content.find('iframe').each(function() {
            $(this).height($content.height());
        });
    }
    $(window).on('resize', function() {
        var $content = $('.admin-nav-card .layui-tab-content');
        $content.height($(this).height() - 147);
        $content.find('iframe').each(function() {
            $(this).height($content.height());
        });
    }).resize();

    //toggle左侧菜单
    $('.admin-side-toggle').on('click', function() {
        var sideWidth = $('#admin-side').width();
        if(sideWidth === 200) {
            $('#admin-body').animate({
                left: '0'
            });
            $('#admin-footer').animate({
                left: '0'
            });
            $('#admin-side').animate({
                width: '0'
            });
        } else {
            $('#admin-body').animate({
                left: '200px'
            });
            $('#admin-footer').animate({
                left: '200px'
            });
            $('#admin-side').animate({
                width: '200px'
            });
        }
    });

    //手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade');
    treeMobile.on('click', function () {
        $('body').addClass('site-mobile');
    });
    shadeMobile.on('click', function () {
        $('body').removeClass('site-mobile');
    });
});