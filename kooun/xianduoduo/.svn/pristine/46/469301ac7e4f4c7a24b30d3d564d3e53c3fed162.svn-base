var basePath = getBasePath();
function getBasePath() {
	// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/uimcardprj
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
}
function buttonAddMult(elem, permission, pers) {
    if (permission != "") {
        if ($.inArray(permission, pers) < 0) {
            return "";
        }
    }
    var btn = $(elem);
    return btn.prop("outerHTML");
}

function buttonAdd(href, permission, pers) {
    if (permission != "") {
        if ($.inArray(permission, pers) < 0) {
            return "";
        }
    }
    var btn = $("<button class='layui-btn layui-btn-xs'   title='新增' onclick='window.location=\""
        + href + "\"'><i class='layui-icon'>&#xe654;</i></button>");
    return btn.prop("outerHTML");
}


function buttonDelMult(elem, permission, pers) {
    if (permission != "") {
        if ($.inArray(permission, pers) < 0) {
            return "";
        }
    }

    var btn = $(elem);
    return btn.prop("outerHTML");
}

function buttonDel(data, permission, pers) {
    if (permission != "") {
        if ($.inArray(permission, pers) < 0) {
            return "";
        }
    }

    var btn = $("<button class='layui-btn layui-btn-xs'  lay-event=\"delete\" title='删除' onclick='del(\""
        + data + "\")'><i class='layui-icon'>&#xe640;</i></button>");
    return btn.prop("outerHTML");
}

function buttonEdit(href, permission, pers) {
    if (permission != "") {
        if ($.inArray(permission, pers) < 0) {
            return "";
        }
    }

    var btn = $("<button class='layui-btn layui-btn-xs'  lay-event=\"edit\" title='编辑' onclick='window.location=\""
        + href + "\"'><i class='layui-icon'>&#xe642;</i></button>");
    return btn.prop("outerHTML");
}

function deleteCurrentTab() {
	var lay_id = $(parent.document).find("ul.layui-tab-title").children(
			"li.layui-this").attr("lay-id");
	parent.active.tabDelete(lay_id);
}
