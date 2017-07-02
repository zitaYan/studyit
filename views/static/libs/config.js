require.config({
    baseUrl: "/views",
    paths: {
        "jquery": "assets/jquery/jquery.min",
        "form":"assets/jquery-form/jquery.form",
        "cookie":"assets/jquery-cookie/jquery.cookie",
        "template":"assets/artTemplate/template",
        "bootstrap":"assets/bootstrap/js/bootstrap.min",
        "util":"static/js/util",
        "NProgress":"assets/nprogress/nprogress",
        "bootstrap-datepicker":"assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
        "bootstrap-datepicker-zh":"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min"
    },
    shim:{
        "bootstrap":{
            deps:["jquery"]
        },
        "bootstrap-datepicker-zh":{
            deps:["bootstrap-datepicker"]
        }
    }
})
