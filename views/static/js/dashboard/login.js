define(["jquery","form","cookie"],function ($) {
	$("#login-form").submit(function(){
            $(this).ajaxSubmit({
                url: "/api/login",
                type: "post",
                success: function(data){
                    if(data.code == 200){
                        console.log(data);
                        $.cookie("userinfo", JSON.stringify(data.result),{path:"/"});
                        console.log($.cookie("userinfo"));
                        location.href= "/";
                    }
                }
            });
            return false;
    })  
})