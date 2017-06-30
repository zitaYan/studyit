define(["jquery","template"],function($,template){
    $.ajax({
        url:"/api/teacher",
        type:"get",
        success:function(data){
            console.log(data);
            var html=template("teacher-list-tpl",data);
            $("#teacherlist").html(html);
        }


    })
})
