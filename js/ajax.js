/**
 * Created by Administrator on 2016/11/6.
 */
function json2url(json){
    var arr=[];
    for(var name in json){
        arr.push(name+'='+encodeURIComponent(json[name]));
    }
    return arr.join('&');
}
function ajax(json){
    if(!json.url){
        return;
    }
    json=json||{};
    json.data=json.data||{};
    json.type=json.type||'GET';
    json.timeout=json.timeout||10000;
    json.data.t=Math.random();
    //创建一个Ajax对象
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHttp');
    }
    //建立链接发送请求
    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,ture);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }
    //加载处理
    json.loading&&json.loading();
    //超时处理
    var timer=setTimeout(function(){
        json.complete&&json.complete();
        json.error&&json.error();
        oAjax.onreadystatechange=null;
    },json.timeout);
    //加载成功 接收数据
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            if(oAjax.status>=200||oAjax.status<300||oAjax.status==304){
                clearTimeout(timer);
                json.complete&&json.complete();
                json.success&&json.success(oAjax.responseText);
            }else{
                clearTimeout(timer);
                json.complete&&json.complete();
                json.error&&json.error(oAjax.status);
            }
        }
    };
}