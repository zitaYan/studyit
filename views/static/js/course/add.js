define(["jquery","form"],function($){
    $('form').on('submit',function(){
        $(this).ajaxSubmit({
            url:"/api/course/create",
            type:'post',
            success:function(data){
                console.log(data);
                if(data.code==200){
                    location.href="/course/step1?id="+data.result.cs_id;
                }
            }
        });
        return false;
    })
})