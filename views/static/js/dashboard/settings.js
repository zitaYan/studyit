define(["jquery","ckeditor","template","region","bootstrap-datepicker","bootstrap-datepicker-zh","uploadify","form"],function($,CKEDITOR,template){
    $.ajax({
        url:'/api/teacher/profile',
        success:function(data){
            if(data.code==200){
                //console.log(data);
                var html=template("settings-tpl",data.result);
                console.log(html);
                $(".settings").html(html);

                $('input[name="tc_birthday"]').datepicker({
                    format:'yyyy-mm-dd',
                    language:"zh-CN",
                    todayHighlight:true
                });
                $('input[name="tc_join_date"]').datepicker({
                    format:'yyyy-mm-dd',
                    language:"zh-CN",
                    todayHighlight:true
                });

                $('#region').region({
                    url: "/views/assets/jquery-region/region.json"
                });

                CKEDITOR.replace("areainfo",{
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


                $('#upfile').uploadify({
                    swf:'/views/assets/uploadify/uploadify.swf',
                    uploader:'/api/uploader/avatar',
                    "buttonText":"",
                    "height":120,
                    "width":120,
                    itemTemplate: "<p></p>",
                    'fileObjName' :'tc_avatar' ,
                    'onUploadSuccess':function(file,data,response){
                        data=JSON.parse(data);
                        //console.log('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
                        if(data.code==200){
                            //console.log(data.result.path);
                            $(".preview>img").attr("src",data.result.path);
                        }
                    }


                });


                $(".settings").on('submit','form',function(){
                    $(this).ajaxSubmit({
                        url:"/api/teacher/modify",
                        type:'post',
                        success:function(data){
                            alert("保存成功");
                            location.href="/";
                        }
                    })
                    return false;
                })



            }
        }
    })






})
