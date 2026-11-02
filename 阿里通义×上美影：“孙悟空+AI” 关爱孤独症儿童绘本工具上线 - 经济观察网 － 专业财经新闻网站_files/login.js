$(document).ready(function() {
		/*登录界面*/
		$(".login_dl").click(function(){
			$(".overlay").show();
			$("#login_css").show();
			$("#login_css").addClass("zoomInDown");
			
		});
		/*退出登录界面*/
		$("#log_close").click(function(){
			$(".overlay").hide();
			$("#login_css").hide();
			$("#login_css").removeClass("zoomInDown");
		});
	});

/*登录要求判断*/
$(function(){
var islogin = +0;
var appUrl = "https://app.eeo.com.cn/";
var username = "";
var defaultname = "";

if (document.location.protocol == 'http:') {
	appUrl = "http://app.eeo.com.cn/";
}

$(function(){

	if ($.cookie(COOKIE_PRE+'auth')) {
		//已登录
		username = $.cookie(COOKIE_PRE+'username');
		if(username == null) username = defaultname;
		$('#nickname').html(username);
		$('.fg_logo').show();
		$('.xd-logo-l').hide();
	} else {
		$('.fg_logo').hide();
		$('.xd-logo-l').show();
	}

	$(".head .user p span").remove()
  	$(".head .user a:visible:not(:last-child)").after("<span>|</span>");
  	$(".head .user a:hidden").prev("span").hide()
	
        $('#quickLogout > a').click(function() {
		$.getJSON(appUrl+'?app=member&controller=index&action=ajaxlogout&jsoncallback=?', function(json){
			if(json.state) {
				$('.fg_logo').hide();
				$('.xd-logo-l').show();
				username = '';
			} else {
				alert('退出失败');
			}
		});
	});

});

//退出登录
$(".tc_logo_dl").click(function(){
	window.parent.location.href =  appUrl + '?app=member&controller=index&action=logout&url='+encodeURIComponent(window.parent.location.href);
})
//登录判断
		$(".login_dl_pd").click(function(){
			var username = $("#username").val();
			//2018.4.18修复 个人中心密码 重置 功能 得 bug
			var dl_password = $("#dl_password").val();
			var password="";
			if(dl_password != undefined){
				password = dl_password;
			}else{
				password = $("#password").val();
			}
			//var password = $("#password").val();
			if(!username){
				$('#al_warn').text('*请输入用户名');
				$("#al_warn").show();
				return false;
			}else if(username.length < 3){
				$('#al_warn').text('帐号或密码错误，请重新输入');
				$("#al_warn").show();	
		
			}else if(username > 16){
				$('#al_warn').text('帐号或密码错误，请重新输入');
				$("#al_warn").show();
			
			}
			if(!password){
				$('#al_warn').text('*请输入密码');
				$('#al_warn').show();
				return false;
			}else if(password.length < 6){
				$('#al_warn').text('*帐号或密码错误，请重新输入');
				$('#al_warn').show();
				return false;
			}else if(password.length > 12){
				$('#al_warn').text('*帐号或密码错误，请重新输入');
				$('#al_warn').show();
			}
	var ajaxLoginUrl = appUrl+'?app=member&controller=index&action=ajaxlogin&jsoncallback=?'+Math.random()*5;
	var postData = {"username":username, "password":password};		
	$.getJSON(appUrl+'?app=member&controller=index&action=ajaxlogin&username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password)+'&jsoncallback=?', function(json){
	// $.post(ajaxLoginUrl,postData,function(json){
		if(json.state) {
			username = json.username;
			$('#nickname').html(username);
			$(".overlay").hide();
			$("#login_css").hide();
			$(".xd-logo-l").hide();
			$(".fg_logo").show();
			$("#login_css").removeClass("zoomInDown");
			$(".login_dl_pd").removeClass("login_dl_pd");

			$(".head .user p span").remove()
		  	$(".head .user a:visible:not(:last-child)").after("<span>|</span>");
		  	$(".head .user a:hidden").prev("span").hide()
			
			var localStorageUrl = localStorage.getItem("localStorageUrl");
			if (localStorageUrl) {
				localStorage.removeItem('localStorageUrl');
			  	window.location.href = localStorageUrl;　
			}

		} else {
				$('#al_warn').text(json.error);
				$('#al_warn').show();
		}
	});
		})
	})