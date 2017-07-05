define(["jquery","template","NProgress"],function($,template,NProgress){
    $.ajax({
        url:'/api/course',
        beforeSend:function(){
            NProgress.start();
        },
        success:function(data){
            console.log(data);
            if(data.code==200){
                var html=template("course-list-tpl",data);
                $('.courses').html(html);
                NProgress.done();
            }
        }

    })

})
