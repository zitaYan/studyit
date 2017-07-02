define([],function(){
    return{
        geturl:function(){
            var queryString=location.search;
            queryString=queryString.slice(1);
            var kvPairs=queryString.split("&");
            // console.log(kvPairs);
            var obj={};
            kvPairs.forEach(function(v,i, el) {
                var kvPair=v.split("=");

                obj[kvPair[0]]=kvPair[1];

                // console.log(kvPair);
            });
            // console.log(obj);
            return obj;
        }
    }
})