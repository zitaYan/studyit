define(["jquery","template","cookie"],function($,template){

	$(function(){

		if("/dashboard/login"!=location.pathname){
			if(!$.cookie("PHPSESSID")){
				location.href="/dashboard/login"
			}else{
				//从cookie中获取登录成功后存储的用户信息
			    var userInfo = JSON.parse($.cookie("userinfo"))

			    var html = template("profile-tpl", userInfo);

			    //将模板渲染到页面中ds刚才挖坑的地方
			    $("#userinfo").html(html);
			}
		}
		


	    $("#logout").on('click',function(){
	    	$.ajax({
	    		url:"/api/logout",
	    		type:"post",
	    		success:function(data){
	    			location.href="/dashboard/login"
	    		}
	    	});
	    });

		$(".navs>ul>li").click(function(){
			$(this).children("a").addClass('active');
			$(this).siblings('li').children("a").removeClass('active');
		});

	    $(".navs>ul>li>ul").parent().click(function(){
	    	$(this).children("ul").slideToggle();

			//判断如果下面ul中的li中的a有active类,就把当前的active类去掉
			if($(this).children('ul').find("a.active").length > 0){
				$(this).children('a').removeClass('active');
			}

	    });



		//在哪个页面的时候,让这个页面对应的导航栏的背景色改变
		//遍历所有的a
		$(".navs a").each(function(i,v){
			$(v).removeClass('active');
			if($(v).attr("href")==location.pathname){
				$(v).addClass('active');
				$(v).parent().parent().slideDown();
			}

		})




	})
})