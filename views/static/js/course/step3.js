define(['jquery',"util","template","bootstrap"],function($,util,template){
    var csid=util.geturl().id;
    console.log(csid);
    $.ajax({
        url:'/api/course/lesson',
        data:{
            cs_id:csid
        },
        success:function(data){
            console.log(data);
            if(data.code==200){
                var html=template('step3-tpl',data.result);
                $('.steps').html(html);
            }
        }
    });
    $('.steps').on('click','#classhouradd',function(){
        $('#chapterModal').modal('show');
    })
})