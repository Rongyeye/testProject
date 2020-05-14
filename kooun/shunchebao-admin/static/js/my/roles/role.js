function initRoles() {
	var basePath = getBasePath();
	$.ajax({
		type : 'post',
		url : basePath+'/system/auth/roles/all',
		async : false,
		success : function(data) {
			var r = $("#roles");

			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				var id = d['id'];
				var name = d['name'];

				var t = "<label><input type='checkbox' value='" + id + "'>"
						+ name + "</label> &nbsp&nbsp";

				r.append(t);
			}
		}
	});
}

function getCheckedRoleIds() {
	var ids = [];
	$("#roles input[type='checkbox']").each(function() {
		if ($(this).prop("checked")) {
			ids.push($(this).val());
		}
	});

	return ids;
}

function initRoleDatas(userId) {
	var basePath = getBasePath();
	$.ajax({
		type : 'get',
		url : basePath+'/system/auth/roles?userId=' + userId,
		success : function(data) {
			var length = data.length;
			for (var i = 0; i < length; i++) {
				$("input[type='checkbox']").each(function() {
					var v = $(this).val();
					if (v == data[i]['id']) {
						$(this).attr("checked", true);
					}
				});
			}
		}
	});
}

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