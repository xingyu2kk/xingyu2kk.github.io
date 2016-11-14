/**
 * Created by Administrator on 2016/11/6.
 */
function jsonp(options){
    if(!options.url){
        return;
    }
    //初始化
    options=options||{};
    options.data=options.data||{};
    options.cbName=options.cbName||'cb';
    options.timeout=options.timeout||10000;
    var fnName='jsonp_'+Math.random();
    fnName=fnName.replace('.','');
    var timer=null;
    options.data[options.cbName]=fnName;
    //函数定义
    window[fnName]=function(json){
        clearTimeout(timer);
        options.success&&options.success(json);
        document.head.removeChild(oS);
    };
    //超时处理
    timer=setTimeout(function(){
        options.error&&options.error();
        window[fnName]=null;
    },options.timeout);
    //函数调用
    var oS=document.createElement('script');
    oS.src=options.url+'?'+json2url(options.data);
    document.head.appendChild(oS);
}