/**
 * Created by Administrator on 2016/11/6.
 */
function getStyle(obj,sName){
    return obj.currentStyle?obj.currentStyle[sName]:getComputedStyle(obj)[sName];
}
function setStyle(){
    var arg=arguments;
    if(arg.length==3){
        arg[0].style[arg[1]]=arg[2];
    }else if(arg.length==2){
        for(var name in arg[1]){
            arg[0].style[name]=arg[1][name];
        }
    }
}
function getPos(obj){
    var t=0;
    var l=0;
    while(obj){
        t+=obj.offsetTop;
        l+=obj.offsetLeft;
        obj=obj.offsetParent;
    }
    return {'left':l,'top':t};
}
function rnd(n,m){
    return Math.floor(Math.random()*(m-n)+n);
}
function a2d(n){
    return n*180/Math.PI;
}
function d2a(n){
    return n*Math.PI/180;
}
function toDou(n){
    return n<10?'0'+n:''+n;
}
function json2url(json){
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
function url2json(str){
    var json={};
    var arr=str.split('&');
    for(var i=0;i<arr.length;i++){
        json[arr[i].split('=')[0]]=arr[i].split('=')[1];
    }
    return json;
}
function getByClass(obj,sName){
    if(obj.getElementsByClassName){
        return obj.getElementsByClassName(sName);
    }else{
        var arr=[];
        var reg=new RegExp('\\b'+sName+'\\b','g');
        var aObj=obj.getElementsByTagName('*');
        for(var i=0;i<aObj.length;i++){
            if(reg.test(aObj[i].className)){
                arr.push(aObj[i]);
            }
        }
        return arr;
    }
}
function findInArr(n,arr){
    for(var i=0;i<arr.length;i++){
        if(n==arr[i]){
            return true;
        }
    }
    return false;
}
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
}
function removeEvent(obj,sEv,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(sEv,fn,false);
    }else{
        obj.dettachEvent('on'+sEv,fn);
    }
}
function addWheel(obj,fn){
    if(navigator.userAgent.indexOf('Firefox')!=-1){
        obj.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        obj.onmousewheel=wheel;
    }
    function wheel(ev){
        var oEvent=ev||event;
        var bDown=false;
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta>0){
                bDown=false;
            }else{
                bDown=true;
            }
        }else{
            if(oEvent.detail>0){
                bDown=true;
            }else{
                bDown=false;
            }
        }
        fn&&fn(bDown);
        oEvent.preventDefault&&oEvent.preventDefault();
        return false;
    }
}
//class
function hasClass(obj,sName){
    var reg=new RegExp('\\b'+sName+'\\b','g');
    return reg.test(obj.className);
}
function addClass(obj,sName){
    if(obj.className){
        if(!hasClass(obj.sName)){
            obj.className=obj.className+' '+sName;
        }
    }else{
        obj.className=sName;
    }
}
function removeClass(obj,sName){
    var reg=new RegExp('\\b'+sName+'\\b','g');
    obj.className=obj.className.replace(reg,'').replace(/\s+/g,' ').replace(/^s+|s+$/,'');
}
