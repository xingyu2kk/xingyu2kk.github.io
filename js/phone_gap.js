/**
 * Created by Administrator on 2016/11/11.
 */
(function(){
    var oMLbox=document.getElementById('main_left');
    var oMUl=document.getElementById('main_left_ul');
    var aMLi=oMUl.children;
    var oMIntr=document.getElementById('main_left_introduce');
    var oMRestore=document.getElementById('main_left_restore');
    var arr=[];
    var timer=null;
    var z=0;
    var bOk=false;
    var bT=false;
    oMLbox.onmouseenter=function(){
        bT=true;
        if(bOk){
            return;
        }
        bOk=true;
        clearTimeout(timer);
        timer=setTimeout(function(){
            domove(oMIntr,{'height':50,'top':310},{'duration':600,'complete':function(){
                bT=false;
            }});
        },200);
    };
    oMLbox.onmouseleave=function(){
        clearTimeout(timer);
        domove(oMIntr,{'width':0},{'duration':100,'complete':function(){
            oMIntr.style.top=0;
            oMIntr.style.width='360px';
            oMIntr.style.height=0;
            bOk=false;
        },'easing':Tween.Linear});
    };
    for(var i=0;i<aMLi.length;i++){
        arr[i]={'left':aMLi[i].offsetLeft,'top':aMLi[i].offsetTop,'width':aMLi[i].offsetWidth,'height':aMLi[i].offsetHeight};
    }
    for(var i=0;i<aMLi.length;i++){
        aMLi[i].style.position='absolute';
        aMLi[i].style.left=arr[i].left+'px';
        aMLi[i].style.top=arr[i].top+'px';
        aMLi[i].style.margin=0;
    }
    for(var i=0;i<aMLi.length;i++){
        drag(aMLi[i]);
        aMLi[i].index=i;
    }
    function drag(obj){
        obj.style.zIndex=++z;
        obj.onmousedown=function(ev){
            var oEvent=ev||event;
            var disX=oEvent.clientX-obj.offsetLeft;
            var disY=oEvent.clientY-obj.offsetTop;
            oMUl.onmousemove=function(ev){
                var oEvent=ev||event;
                var l=oEvent.clientX-disX;
                var t=oEvent.clientY-disY;
                if(l<=0){
                    l=0;
                }else if(l>=oMUl.offsetWidth-obj.offsetWidth){
                    l=oMUl.offsetWidth-obj.offsetWidth;
                }
                if(t<=0){
                    t=0;
                }else if(t>=oMUl.offsetHeight-obj.offsetHeight){
                    t=oMUl.offsetHeight-obj.offsetHeight;
                }
                obj.style.left=l+'px';
                obj.style.top=t+'px';
                var oNear=findNear(obj);
                if(oNear&&oNear!=obj){
                    var n=obj.index;
                    var m=oNear.index;
                    //alert(m);
                    if(n<m){
                        for(var i=0;i<aMLi.length;i++){
                            if(aMLi[i].index>n&&aMLi[i].index<=m){
                                aMLi[i].index--;
                                //alert(aLi[i].index);
                                domove(aMLi[i],arr[aMLi[i].index],{'duration':500,'easing':Tween.Linear});
                            }
                        }
                        obj.index=m;
                    }else{
                        for(var i=0;i<aMLi.length;i++){
                            if(aMLi[i].index>=m&&aMLi[i].index<n){
                                aMLi[i].index++;
                                domove(aMLi[i],arr[aMLi[i].index],{'duration':500,'easing':Tween.Linear});
                            }
                        }
                        obj.index=m;
                    }
                }
            };
            oMUl.onmouseup=function(){
                oMUl.onmousemove=null;
                oMUl.onmouseup=null;
                domove(obj,arr[obj.index],{'duration':500,'easing':Tween.Linear});
                return false;
            };
            return false;
        };
    }
    function findNear(obj){
        var iMin=99999;
        var iMinIndex=-1;
        for(var i=0;i<aMLi.length;i++){
            if(collTest(obj,aMLi[i])){
                var dis=getPos(obj,aMLi[i]);
                //alert(dis);
                if(dis<iMin){
                    iMin=dis;
                    iMinIndex=i;
                }
            }
        }
        if(iMinIndex==-1){
            return null;
        }else{
            return aMLi[iMinIndex];
        }
    }
    function collTest(obj,obj2){
        var l1=obj.offsetLeft;
        var r1=obj.offsetLeft+obj.offsetWidth;
        var t1=obj.offsetTop;
        var b1=obj.offsetTop+obj.offsetHeight;
        var l2=obj2.offsetLeft;
        var r2=obj2.offsetLeft+obj2.offsetWidth;
        var t2=obj2.offsetTop;
        var b2=obj2.offsetTop+obj.offsetHeight;
        if(l1>r2||r1<l2||t1>b2||b1<t2){
            return false;
        }else{
            return true;
        }
    }
    function getPos(obj,obj2){
        var x1=obj.offsetLeft+obj.offsetWidth/2;
        var y1=obj.offsetTop+obj.offsetHeight/2;
        var x2=arr[obj2.index].left+obj.offsetWidth/2;
        var y2=arr[obj2.index].top+obj.offsetHeight/2;
        var a=x2-x1;
        var b=y2-y1;
        return Math.sqrt(a*a+b*b);
    }
    var arrIndex=[];
    for(var i=0;i<aMLi.length;i++){
        arrIndex.push(aMLi[i]);
    }
    //回复顺序
    var bFlag=false;
    oMRestore.onclick=function(){
        if(bFlag){
            return;
        }
        bFlag=true;
        arrIndex.sort(function(n,m){
            return n.index- m.index;
        });
        var n=0;
        var timer=setInterval(function(){
            (function(index){
                domove(arrIndex[n],{'left':180,'top':0,'width':0,'height':0},{'duration':300,'easing':Tween.Linear,'complete':function(){
                    if(index==arrIndex.length-1){
                        //alert(0);
                        for(var i=0;i<aMLi.length;i++){
                            aMLi[i].index=i;
                        }
                        arrIndex.sort(function(n,m){
                            return n.index- m.index;
                        });
                        restore();
                    }
                }});
            })(n);
            n++;
            if(n==arrIndex.length){
                clearInterval(timer);
            }
        },100);
        function restore(){
            var timer=setInterval(function(){
                n--;
                (function(index){
                    domove(arrIndex[n],arr[n],{'duration':300,'easing':Tween.Linear,'complete':function(){
                        if(index==0){
                            bFlag=false;
                        }
                    }});
                })(n);
                if(n==0){
                    clearInterval(timer);
                }
            },100);
        }
    };

})();
