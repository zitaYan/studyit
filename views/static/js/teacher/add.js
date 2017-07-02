define(["jquery","util","template","form","bootstrap","bootstrap-datepicker","bootstrap-datepicker-zh"],function($,util,template){
    console.log(util.geturl());//
    var getid=util.geturl().id;
    if(getid){
        //编辑
        $.ajax({
            url:'/api/teacher/edit',
            type:'get',
            data:{
                tc_id:getid
            },
            success:function(data){
                data.result.addtext='讲师编辑';
                data.result.btntext="保 存";
                console.log(data);
                var html=template('teacher-add-tpl',data.result);
                $('.teacher').html(html);
                $('input[name="tc_join_date"]').datepicker();

            }
        })


    }else{
        //添加

        var data={
            addtext:'讲师添加',
            btntext:"添 加",
        }
        console.log(data);
        var html=template('teacher-add-tpl',data);
        $('.teacher').html(html);


    }

    //给保存或者编辑按钮注册点击事件

    $('.teacher').on('click','.btnSave',function(){
        var url="";
        if(getid){
            url='/api/teacher/update';
        }else{
            url='/api/teacher/add';
        }
        $("#teacherform").ajaxSubmit({
            url:url,
            type:'post',
            success:function(data){
                console.log(data);
                location.href="/teacher/list";
            }

        })
    });

})
