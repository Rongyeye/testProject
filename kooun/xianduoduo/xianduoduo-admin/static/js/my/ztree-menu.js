// function getBasePath() {
//         //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
//         var curWwwPath = window.document.location.href;
//         //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
//         var pathName = window.document.location.pathname;
//         var pos = curWwwPath.indexOf(pathName);
//         //获取主机地址，如： http://localhost:8083
//         var localhostPaht = curWwwPath.substring(0, pos);
//         //获取带"/"的项目名，如：/uimcardprj
//         var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
//         return (localhostPaht + projectName);
//     }

//获取所有权限列表
function getMenuTree() {
    var root = {
        id: 0,
        name : "root",
        open : true,
    };

    $.ajax({
        url : http+'/system/auth/permissions/all',
        async : false,
        success : function(res) {
            console.log("==全部权限==================");
            console.log(res);
            var data = res.result.permissionList;

            var children = [];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var node = createNode(d);
                children[i] = node;
            }

            root.children = children;
        }
    });
    return root;
}


// 根据角色Id回显权限菜单
function initMenuDatas(roleId){
    $.ajax({
        xhrFields: {withCredentials: true},
        type : 'post',
        url : http+'/system/auth/roles/getPermissions',
        data: {roleId: roleId},
        success : function(res) {
            var data = res.result.permissionIdList;
            console.log("=======角色Id回显权限菜单========");
            console.log(data);
            var length = data.length;
            var ids = [];
            for(var i=0; i<length; i++){
                ids.push(data[i]);
            }

            initMenuCheck(ids);
        }
    });
}

function initMenuCheck(ids) {

    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    if(ids.length >0) {
        for (var i = 0; i < ids.length; i++) {
            var node = treeObj.getNodeByParam("id", ids[i], null);//得到新增加的节点
            if (node != null) {
                treeObj.expandNode(node, true, false, false);
                treeObj.checkNode(node, true, false);
            }
        }
    }

    // var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    // var length = ids.length;
    // if(length > 0){
    //     var node = treeObj.getNodeByParam("id", 0, null);
    //     treeObj.checkNode(node, true, false);
    // }
    //
    // for(var i=0; i<length; i++){
    //     var node = treeObj.getNodeByParam("id", ids[i], null);
    //     treeObj.checkNode(node, true, false);
    // }
}

function getCheckedMenuIds(){
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);

    var length = nodes.length;
    var ids = [];
    for(var i=0; i<length; i++){
        var n = nodes[i];
        var id = n['id'];
        ids.push(id);
    }

    return ids;
}

function createNode(d) {
    // child:null
    // css:"fa-users"
    // href:""
    // id:1
    // name:"用户管理"
    // parentId:0
    // permission:""
    // sort:1
    // status:1
    // type:0
    var id = d['id'];
    var pId = d['parentId'];
    var name = d['name'];
    var child = d['child'];

    var node = {
        open : true,
        id : id,
        name : name,
        pId : pId,
    };

    if (child != null) {
        var length = child.length;
        if (length > 0) {
            var children = [];
            for (var i = 0; i < length; i++) {
                children[i] = createNode(child[i]);
            }

            node.children = children;
        }

    }
    return node;
}

function initParentMenuSelect(){
    $.ajax({
        type : 'post',
        url : http+'/system/auth/permissions/parents',
        async : false,
        success : function(data) {
            data = data.permissionList;
            var select = $("#parentId");
            select.append("<option value='0'>无上级菜单</option>");
            for(var i=0; i<data.length; i++){
                var d = data[i];
                var id = d['id'];
                var name = d['name'];

                select.append("<option value='"+ id +"'>" +name+"</option>");
            }
        }
    });
}

function getSettting() {
    var setting = {
        check : {
            enable : true,
            chkboxType : {
                "Y" : "ps",
                "N" : "ps"
            }
        },
        async : {
            enable : true,
        },
        data : {
            simpleData : {
                enable : true,
                idKey : "id",
                pIdKey : "pId",
                rootPId : 0
            }
        },
        callback : {
            onCheck : zTreeOnCheck
        }
    };

    return setting;
}

function zTreeOnCheck(event, treeId, treeNode) {
//	console.log(treeNode.id + ", " + treeNode.name + "," + treeNode.checked
//			+ "," + treeNode.pId);
//	console.log(JSON.stringify(treeNode));
}