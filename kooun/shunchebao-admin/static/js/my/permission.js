
function checkPermission() {
	var pers = [];
	$.ajax({
        xhrFields: { withCredentials: true },
		type : 'post',
		url : ajaxHttp()+'/system/auth/permissions/owns',
		async : false,
		success : function(data) {
        	console.log('权限====');
        	console.log(data);
			pers = data.result.permissions;
			$("[permission]").each(function() {
				var per = $(this).attr("permission");
				if ($.inArray(per, pers) < 0) {
					$(this).hide();
				}
			});
		}
	});
	return pers;
}