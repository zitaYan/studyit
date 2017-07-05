define(["jquery","util","template","form","bootstrap","bootstrap-datepicker","bootstrap-datepicker-zh","jquery-validate"],function($,util,template){
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
                $('input[name="tc_join_date"]').datepicker({
                    format:'yyyy-mm-dd',
                    language:"zh-CN"
                });

                $("#teacherform").validate({
                    sendForm:false,
                    onBlur:true,
                    eachValidField:function(){
                        console.log("eachValidField被触发了",this);
                        this.parent().parent().addClass("has-success").removeClass("has-error");
                    },
                    eachInvalidField:function(){
                        console.log("eachInvalidField被触发了");
                        this.parent().parent().addClass("has-error").removeClass("has-success");
                    },
                    description:{
                        username:{
                            required: "用户名不能为空"

                        },
                        userpass:{
                            required: "密码不能为空"
                        },
                        userjoindate:{
                            required: "请选择入职日期"
                        }
                    },
                    invalid:function(){
                        console.log("invalid被触发了");
                    },
                    valid:function(){
                        console.log("valid被触发了");


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
                    }
                })

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
        $('input[name="tc_join_date"]').datepicker({
            format:'yyyy-mm-dd',
            language:"zh-CN",
            todayHighlight:true,
            todayBtn:false //默认false,在底部显示今日

        });



        $("#teacherform").validate({
            sendForm:false,
            onBlur:true,
            eachValidField:function(){
                //console.log("eachValidField被触发了",this);
                this.parent().parent().addClass("has-success").removeClass("has-error");
            },
            eachInvalidField:function(){
                //console.log("eachInvalidField被触发了");
                this.parent().parent().addClass("has-error").removeClass("has-success");
            },
            description:{
                username:{
                    required: "用户名不能为空"
                },
                userpass:{
                    required: "密码不能为空"
                },
                userjoindate:{
                    required: "请选择入职日期"
                }
            },
            invalid:function(){
                console.log("invalid被触发了");
            },
            valid:function(){
                console.log("valid被触发了");


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
            }
        })

    }

    //给保存或者编辑按钮注册点击事件


})
