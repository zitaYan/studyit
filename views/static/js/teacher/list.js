define(["jquery","template","bootstrap"],function($,template){
    $.ajax({
        url:"/api/teacher",
        type:"get",
        success:function(data){
            //console.log(data);
            var html=template("teacher-list-tpl",data);
            $("#teacherlist").html(html);
        }
    });

    $("#teacherlist").on('click','.btn-look',function(){
        var id=$(this).parent().data("id");
        $.ajax({
            url:"/api/teacher/view",
            type:'get',
            data:{
                tc_id:id
            },
            success:function(data){
               if(data.code==200){
                   console.log(data);
                   var html=template('teacher-module-tpl',data.result);
                   $("#teacher-module").html(html);
                   $("#teacherModal").modal("show");

               }
            }
        })
    });

    $('#teacherlist').on('click','.btn-onoff',function(){
        var id=$(this).parent().data('id');
        var status=$(this).data('status');
        console.log(id,status);
        var $that=$(this);
        $.ajax({
            url:'/api/teacher/handle',
            type:'post',
            data:{
                tc_id:id,
                tc_status:status
            },
            success:function(data){
                if(data.code==200){
                    $that.data('status',data.result.tc_status);
                    if(data.result.tc_status==0){
                        $that.removeClass('btn-success').addClass('btn-warning').text('注 销');
                    }else{
                        $that.removeClass('btn-warning').addClass('btn-success').text('启 用');
                    }
                }
            }
        })
    });



})
