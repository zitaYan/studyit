define(["jquery","util","template","ckeditor","form"],function($,util,template,CKEDITOR){

    var csid=util.geturl().id;
    console.log(csid);
    $.ajax({
        url:"/api/course/basic",
        data:{
            cs_id:csid
        },
        success:function(data){
            //console.log(data);
            if(data.code==200){
                var html=template('step1-tpl',data.result);
                $('.steps').html(html);

                CKEDITOR.replace("ckeditor",{
                    toolbarGroups : [
                        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },

                        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                        { name: 'others' },
                        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                        { name: 'styles' },
                        { name: 'colors' },
                        { name: 'about' }
                    ]
                });
            }
        }

    })

    $('.steps').on('submit','form',function(){
        $(this).ajaxSubmit({
            url:"/api/course/update/basic",
            type:'post',
            success:function(data){
                //console.log(data);
                if(data.code==200){
                    location.href="/course/step2?id="+data.result.cs_id;
                }

            }
        });
        return false
    })
})