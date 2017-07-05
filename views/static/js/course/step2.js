define(["jquery","util","template","uploadify","jcrop"],function($,util,template){
    var csid=util.geturl().id;
    $.ajax({
        url:'/api/course/picture',
        data:{
            cs_id:csid
        },
        success:function(data){
            console.log(data);
            if(data.code==200){
                var html=template("step3-tpl",data.result);
                $(".steps").html(html);
                $('#upload').uploadify({
                    'buttonClass':'btn btn-success btn-sm',
                    'fileObjName':'cs_cover_original',
                    'swf':'/views/assets/uploadify/uploadify.swf' ,
                    'uploader' :'/api/uploader/cover',
                    "buttonText":'上传图片',
                    "width":'70',
                    formData: {
                        cs_id: csid
                    },
                    "itemTemplate":'<p></p>',
                    onUploadSuccess:function(a,b,c){
                        var data=JSON.parse(b);
                        console.log(data);
                        $('.preview>img').attr('src',data.result.path);
                    }
                });
                $('#upload-button').css("lineHeight",'20px');
            }
        }
    });
    $('.steps').on('click',"#cutbtn",function(){
        $("#cutbtn").text("保存图片");
        var x,y, w,h;
        $('.preview').on('cropmove',function(e,s,c){
            x=c.x;
            y=c.y;
            w=c.w;
            h=c.h;
            //console.log(c.x);
            //console.log(c.y);
            //console.log(c.w);
            //console.log(c.h);
        })
        $('.preview>img').Jcrop({
            allowSelect: true,
            setSelect: [ 10,10,240,120 ],

        },function(){
            var jcrop_api = this;
            thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120 });
            $('.thumb>img').remove()
        });


        $("#cutbtn").click(function(){
            $.ajax({
                url:"/api/course/update/picture",
                type:'post',
                data:{
                    cs_id:csid,
                    x:x,
                    y:y,
                    w:w,
                    h:h
                },
                success:function(data){
                    if(data.code==200){
                        location.href="/course/step3?id="+data.result.cs_id;
                    }
                }
            })
        })



    })


})