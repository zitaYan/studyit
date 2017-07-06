define(['jquery',"util","template","bootstrap","form"],function($,util,template){
    var csid=util.geturl().id;
    console.log(csid);
    $.ajax({
        url:'/api/course/lesson',
        data:{
            cs_id:csid
        },
        success:function(data){
            //console.log(data);
            if(data.code==200){

                var html=template('step3-tpl',data.result);
                $('.steps').html(html);
            }
        }
    });
    $('.steps').on('click','#classhouradd',function(){
        $('#chapterModal').modal('show');
        var data={
            title:'课时添加',
            Btn:"添加",
            type:'add'
        }
        var html=template('step3-modal-tpl',data);
        $('.modal-content').html(html);
    });
    $('.steps').on('click','#editBtn',function(){
        var ctid=$(this).parent().data('id');
        $.ajax({
            url:'/api/course/chapter/edit',
            data:{
                ct_id:ctid
            },
            success:function(data){
                console.log(data);
                if(data.code==200){
                    data.result.title="课时编辑";
                    data.result.Btn= "保存";
                    data.result.type= "edit";

                    var html=template('step3-modal-tpl',data.result);
                    $('.modal-content').html(html);
                    $('#chapterModal').modal('show');
                }
            }

        })
    });

    $('.modal-content').on('click','.save',function(){
        var type=$(this).data('type');
        var url="";
        if(type=='add'){
            url="/api/course/chapter/add"
        }else{
            url="/api/course/chapter/modify"
        }
        var isfree=0;
        if($('#isfree').prop('checked')){
            isfree=1;
        }
        $('form').ajaxSubmit({
            url:url,
            type:'post',
            data:{
                ct_cs_id:csid,
                ct_is_free:isfree
            },
            success: function (data) {
                if(data.code==200){
                    //console.log(data);
                    //location.reload();整个页面进行刷新
                    $('#chapterModal').modal('hide');
                    //下面的逻辑为仅仅进行课时列表的部分刷新  使用子模板
                    $.ajax({
                        url:'/api/course/lesson',
                        data:{
                            cs_id:csid
                        },
                        success:function(data){
                            //console.log(data);
                            if(data.code==200){

                                var html=template('lesson-tpl',data.result);
                                $('.lessons').html(html);
                            }
                        }
                    });

                }
            }

        })

    });
})