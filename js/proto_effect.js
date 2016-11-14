/**
 * Created by Administrator on 2016/11/12.
 */
addEvent(window,'load',function(){
    var oPreload=document.getElementById('preloader');
    domove(oPreload,{'opacity':0},{'duration':500,'easing':Tween.Linear});
    oPreload.style.display='none';
    alert('如有效果不佳，请使用更高级的浏览器试试，给您造成的不便请见谅！');
    /*header_li move*/
    (function(){
        var oHdUl=document.getElementById('header-ul');
        var aHdLi=getByClass(oHdUl,'header-li');
        var oHdLi=document.getElementById('moveLi');
        var timer=null;
        for(var i=0;i<aHdLi.length;i++){
            aHdLi[i].onmouseover=function(){
                var _this=this;
                timer=setTimeout(function(){
                    var l=_this.offsetLeft;
                    var oHtml=_this.innerHTML;
                    //console.log(oHtml);
                    domove(oHdLi,{'left':l},{'easing':Tween.Elastic.easeOut});
                    oHdLi.innerHTML=oHtml;
                },100);
                this.onmouseout=function(){
                    clearTimeout(timer);
                };
            };

        }
    })();
    /*nav ball*/
    (function(){
        var oEBox=document.getElementById('elastic_box');
        var oEson=document.getElementById('elastic_box_son');
        var oESpn=document.getElementById('elastic_nav');
        var cH=document.documentElement.clientHeight;
        var cW=document.documentElement.clientWidth;
        var l=0;
        var t=0;
        oEBox.onmousedown=function(ev){
            var oEvent=ev||event;
            var disX=oEvent.clientX-oEBox.offsetLeft;
            var disY=oEvent.clientY-oEBox.offsetTop;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                l=oEvent.clientX-disX;
                t=oEvent.clientY-disY;
                if(l<=0){
                    l=0;
                }else if(l>=cW-oEBox.offsetWidth){
                    l=cW-oEBox.offsetWidth;
                }
                if(t<=0){
                    t=0;
                }else if(t>=cH-oEBox.offsetHeight){
                    t=cH-oEBox.offsetHeight;
                }
                oEBox.style.left=l+'px';
                oEBox.style.top=t+'px';
                return false;
            };
            document.onmouseup=function(ev){
                document.onmousemove=null;
                document.onmouseup=null;
            };
            ev.cancelBublle=true;
            return false;
        };
        oESpn.onclick=function(ev){
            var arr=[
                {href:"#option_box",'innerHTML':'选项卡'},
                {href:"#auto_scroll",'innerHTML':'滚动条'},
                {href:"#link_select",'innerHTML':'联动全选'},
                {href:"#countdown",'innerHTML':'倒计时'},
                {href:"#double_ball",'innerHTML':'双色球'},
                {href:"#up_down",'innerHTML':'上下移动'},
                {href:"#lazy_load",'innerHTML':'懒加载'},
                {href:"#waterfall",'innerHTML':'瀑布流'},
            ];
            var N=8;
            for(var i=0;i<N;i++){
                var oA=document.createElement('a');
                oA.href=arr[i].href;
                oA.innerHTML=arr[i].innerHTML;
                oEson.appendChild(oA);
                oA.style.transform='rotateZ('+i*360/N+'deg) translateX(100px)';
                oA.style.webkitTransform='webkitRotateZ('+i*360/N+'deg) webkitTranslateX(100px)';
                oA.style.mozTransform='mozRotateZ('+i*360/N+'deg) mozTranslateX(100px)';
                oA.style.msTransform='msRrotateZ('+i*360/N+'deg) msTranslateX(100px)';
                oA.style.oTransform='oRotateZ('+i*360/N+'deg) oTranslateX(100px)';
            }
            oEson.className='active';
            ev.cancelBubble=true;
            return false;
        };
        var aA=oEson.children;
        document.onclick=function(){
            oEson.className='';
            for(var i=0;i<aA.length;i++){
                oEson.removeChild(aA[i]);
                i--;
            }
        };
    })();
    /*option_box*/
    (function(){
        var oMrBox=document.getElementById('option_bar1');
        var oMrUl=document.getElementById('option_bar1_ul');
        var aMrLi=oMrUl.children;
        var oMrItem=document.getElementById('option_bar1_down');
        var aMrItemLi=oMrItem.children;
        var oLeft=document.getElementById('toleft');
        var oRight=document.getElementById('toright');
        var iNow=0;
        var timer=null;
        var W=aMrLi[0].offsetWidth;
        var w=oMrUl.offsetWidth;
       /* for(var i=0;i<aMrLi.length;i++){
            aMrLi[i].style.backgroundImage='url(img/img/'+(i+1)+'.jpg)';
            aMrItemLi[i].style.backgroundImage='url(img/img/'+(i+1)+'.jpg)';
        }*/
        oMrBox.onmouseenter=function(){
            clearInterval(timer);
            domove(oLeft,{'left':0},{'duration':500});
            domove(oRight,{'right':0},{'duration':500});
        };
        oMrBox.onmouseleave=function(){
            clearInterval(timer);
            timer=setInterval(altoMove,2000);
            domove(oLeft,{'left':-30},{'duration':500});
            domove(oRight,{'right':-30},{'duration':500});
        };
        for(var i=0;i<aMrLi.length;i++){
            aMrItemLi[i].index=i;
            aMrItemLi[i].onclick=function(){
                iNow=this.index;
                tab();
                domove(oMrUl,{'left':-iNow*W},{'easing':Tween.Linear,'duration':500});
            };
        }
        function tab(){
            for(var i=0;i<aMrItemLi.length;i++){
                aMrItemLi[i].className='';
            }
            aMrItemLi[iNow].className='active';
        }
        for(var i=0;i<aMrItemLi.length;i++){
            aMrItemLi[i].onmouseover=function(){
                for(var i=0;i<aMrItemLi.length;i++){
                    aMrItemLi[i].className='';
                }
                this.className='active';
                aMrItemLi[iNow].className='active';

            };
            aMrItemLi[i].onmouseout=function(){
                for(var i=0;i<aMrItemLi.length;i++){
                    aMrItemLi[i].className='';
                }
                aMrItemLi[iNow].className='active';
            };
        }
        function altoMove(){
            iNow++;
            if(iNow==aMrLi.length){
                var oLi=aMrLi[0].cloneNode(true);
                oMrUl.appendChild(oLi);
                oMrUl.style.width=(w+W)+'px';
                domove(oMrUl,{'left':-iNow*W},{'duration':500,'easing':Tween.Linear,'complete':function(){
                    oMrUl.style.left=0;
                    oMrUl.removeChild(oLi);
                    oMrUl.style.width=w+'px';
                }});
                iNow=0;
                tab();
            }else{
                domove(oMrUl,{'left':-iNow*W},{'duration':500,'easing':Tween.Linear});
                tab();
            }
        }
        oLeft.onclick=altoMove;
        clearInterval(timer);
        timer=setInterval(altoMove,2000);
        oRight.onclick=function(){
            iNow--;
            if(iNow==-1){
                var oLi=aMrLi[aMrLi.length-1].cloneNode(true);
                oMrUl.style.width=(w+W)+'px';
                oMrUl.insertBefore(oLi,aMrLi[0]);
                oMrUl.style.left=-W+'px';
                domove(oMrUl,{'left':0},{'duration':500,'easing':Tween.Linear,'complete':function(){
                    oMrUl.removeChild(oLi);
                    oMrUl.style.left=-5*W+'px';
                    oMrUl.style.width=w+'px';
                }});
                iNow=5;
                tab();
            }else{
                domove(oMrUl,{'left':-iNow*W},{'duration':500,'easing':Tween.Linear});
                tab();
            }
        };
    })();
    //option_bar2
    (function(){
        var oPtion2=document.getElementById('option_bar2_ul');
        var aOptLi=oPtion2.children;
        var oPtItem=document.getElementById('option_bar2_bar');
        var aOpItemLi=oPtItem.children;
        var aSpan=oPtItem.getElementsByTagName('span');
        var iNow=0;
        var timer=null;
        var W=aOptLi[0].offsetWidth;
        var w=oPtion2.offsetWidth;
        /*for(var i=0;i<aOptLi.length;i++){
            aOptLi[i].style.backgroundImage='url(img/img/'+(i+1)+'.jpg)';
        }*/
        function tab(){
            iNow++;
            if(iNow==aSpan.length){
                var oLi=aOptLi[0].cloneNode(true);
                oPtion2.style.width=(w+W)+'px';
                oPtion2.appendChild(oLi);
                domove(oPtion2,{'left':-W*iNow},{'easing':Tween.Linear,'complete':function(){
                    oPtion2.style.left=0;
                    oPtion2.removeChild(oLi);
                }});
                iNow=0;
            }else{
                domove(oPtion2,{'left':-W*iNow},{'easing':Tween.Linear});
            }
            for(var i=0;i<aSpan.length;i++){
                aSpan[i].style.width=0;
            }
            domove(aSpan[iNow],{'width':30},{'easing':Tween.Linear});
        }
        timer=setInterval(tab,2000);
        oPtion2.onmouseover=function(){
            clearInterval(timer);
        };
        oPtion2.onmouseout=function(){
            timer=setInterval(tab,2000);
        };
        oPtion2.onmousedown=function(ev){
            var oEvent=ev||event;
            var downX=oEvent.clientX;
            var disX=downX-oPtion2.offsetLeft;
            var l=0;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                l=oEvent.clientX-disX;
                oPtion2.style.left=l+'px';
            };
            document.onmouseup=function(ev){
                var oEvent=ev||event;
                if((oEvent.clientX-downX)>W/2&&l<0){
                    iNow--;
                    if(iNow==-1){
                        iNow=0;
                    }
                }else if((downX-oEvent.clientX)>W/2){
                    iNow++;
                    if(iNow==aSpan.length){
                        iNow=aSpan.length-1;
                    }
                }
                domove(oPtion2,{'left':-W*iNow},{'easing':Tween.Linear});
                for(var i=0;i<aSpan.length;i++){
                    aSpan[i].style.width=0;
                }
                domove(aSpan[iNow],{'width':30},{'easing':Tween.Linear});
                document.onmousemove=null;
                document.onmouseup=null;
            };
            return false;
        };
    })();
    /*auto_scroll*/
    (function(){
        var oSBox=document.getElementById('auto_scroll_box');
        var oSR=document.getElementById('auto_scroll_right');
        var oSBar=document.getElementById('scroll_bar');
        var oSL=document.getElementById('auto_scroll_left');
        var t=0;
        function moveDown(){
            oSBar.style.top=t+'px';
            oSL.style.top=-(oSL.scrollHeight-oSL.offsetHeight)*(t/(oSR.offsetHeight-oSBar.offsetHeight))+'px';
        }
        oSBar.onmousedown=function(ev){
            var oEvent=ev||event;
            var disY=oEvent.clientY-oSBar.offsetTop;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                t=oEvent.clientY-disY;
                if(t<=0){
                    t=0;
                }else if(t>oSR.offsetHeight-oSBar.offsetHeight){
                    t=oSR.offsetHeight-oSBar.offsetHeight;
                }
                moveDown();
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            };
            return false;
        };
        addWheel(oSBox,function(bDown){
            if(bDown){
                t+=10;
                if(t>=oSR.offsetHeight-oSBar.offsetHeight){
                    t=oSR.offsetHeight-oSBar.offsetHeight;
                }
                moveDown();
            }else{
                t-=10;
                if(t<=0){
                    t=0;
                }
                moveDown();
            }
            return false;
        });
    })();
    /*link_select*/
    (function(){
        var oSel=document.getElementById('link_select_up');
        var aSelOp=oSel.children;
        var oSopt=document.getElementById('link_select_down');
        var aSopt=oSopt.children;
        var n=0;
        aSelOp[0].onclick=function(){
            if(this.checked==true){
                for(var i=0;i<aSopt.length;i++){
                    aSopt[i].checked=true;
                }
                n=aSopt.length;
            }else{
                for(var i=0;i<aSopt.length;i++){
                    aSopt[i].checked=false;
                }
                n=0;
            }
        };
        aSelOp[1].onclick=function(){
            for(var i=0;i<aSopt.length;i++){
                aSopt[i].checked=false;
            }
            n=0;
            aSelOp[0].checked=false;
        };
        aSelOp[2].onclick=function(){
            for(var i=0;i<aSopt.length;i++){
                if(aSopt[i].checked==true){
                    aSopt[i].checked=false;
                    n--;
                }else{
                    aSopt[i].checked=true;
                    n++;
                }
            }
            if(n==aSopt.length){
                aSelOp[0].checked=true;
            }else{
                aSelOp[0].checked=false;
            }
        };
        for(var i=0;i<aSopt.length;i++){
            aSopt[i].onclick=function(){
                if(this.checked==true){
                    n++;
                }else{
                    n--;
                }
                if(n==aSopt.length){
                    aSelOp[0].checked=true;
                }else{
                    aSelOp[0].checked=false;
                }
            };
        }
    })();
    /*countdown*/
    (function(){
        var oTcon=document.getElementById('time_container');
        var oPS=document.getElementById('progress_bar');
        var oTBtn=document.getElementById('time_btn');
        //var bOk=true;
        var timer=null;
        function timecount(){
            var oDate=new Date();
            oDate.setMinutes(oDate.getMinutes()+1);
            var w=oTcon.offsetWidth;
            var t1=oDate.getTime();
            function getTime(){
                var oNewDate=new Date();
                var t2=oNewDate.getTime();
                var total=Math.floor((t1-t2)/1000);
                var s=total%60;
                oTcon.innerHTML='00:00:'+toDou(s);
                oPS.style.width=w*s/60+'px';
                if(s<=0){
                    clearInterval(timer);
                    oPS.style.width='819px';
                }
            }
            getTime();
            clearInterval(timer);
            timer=setInterval(getTime,1000);
        }
        timecount();
        oTBtn.onclick=function(){
            clearInterval(timer);
            timecount();
        };
    })();
    /*double_ball*/
    (function(){
        var oDbBtn=document.getElementById('double_btn');
        var oDbBox=document.getElementById('double_con');
        var aDiv=oDbBox.getElementsByTagName('div');
        var aSpan=oDbBox.getElementsByTagName('p');
        var aSon=oDbBox.children;
        oDbBtn.onclick=luckyBall;
        function luckyBall(){
            var arr=[];
            for(var i=0;i<aDiv.length;i++){
                n=rnd(1,34);
                if(findInArr(n,arr)){
                    i--;
                }else{
                    arr.push(n);
                }
            }
            arr.sort(function(n,m){return n-m;});
            for(var i=0;i<aDiv.length;i++){
                aDiv[i].innerHTML=arr[i];
            }
            for(var i=0;i<aSon.length-1;i++){
                (function(index){
                    setTimeout(function(){
                        aSon[index].style.transition=(1+0.2*index)+'s all linear';
                        aSon[index].style.transform='rotate('+((5+index)*360)+'deg)';
                    },0);
                })(i);
                aSon[aSon.length-2].addEventListener('transitionend',function(){
                    for(var i=0;i<aSon.length-1;i++){
                        aSon[i].style.transition='none';
                        aSon[i].style.transform='rotate(0deg)';
                    }
                },false);
            }
            var arr2=[];
            for(var i=0;i<aSpan.length;i++){
                var n=rnd(1,17);
                if(findInArr(n,arr2)){
                    i--;
                }else{
                    arr2.push(n);
                }
            }
            arr2.sort(function(n,m){return n-m;});
            for(var i=0;i<aSpan.length;i++){
                aSpan[i].innerHTML=arr2[i];
            }
        }
    })();
    /*up_down*/
    (function(){
        var oUpDown=document.getElementById('up_down_ul');
        var aA=oUpDown.getElementsByTagName('a');
        var aUpDLi=oUpDown.getElementsByTagName('li');
        for(var i=0;i<aUpDLi.length;i++){
            if(i%2){
                aUpDLi[i].style.background='royalblue';
            }
        }
        for(var i=0;i< aA.length;i++){
            if(i%2==0){
                aA[i].onclick=function(){
                    if(this.parentNode==oUpDown.children[0]){
                        alert('already to the top!');
                    }else{
                        var oLi=this.parentNode.previousElementSibling||this.parentNode.previousSibling;
                        oUpDown.insertBefore(this.parentNode,oLi);
                    }
                };
            }else{
                aA[i].onclick=function(){
                    if(this.parentNode==aUpDLi[aUpDLi.length-1]){
                        alert('already to the bottom!');
                    }else{
                        var oLi=this.parentNode.nextElementSibling||this.parentNode.nextSibling;
                        oUpDown.insertBefore(oLi,this.parentNode);
                    }
                };
            }
        }
    })();
    /*lazy_load*/
    (function(){
        var aLLImg=document.getElementsByTagName('img');
        addEvent(window,'scroll',lazyLoad);
        addEvent(window,'resize',lazyLoad);
        function lazyLoad(){
            var sH=document.documentElement.scrollTop||document.body.scrollTop;
            var cH=document.documentElement.clientHeight;
            for(var i=0;i<aLLImg.length;i++){
                if((sH+cH)>getPos(aLLImg[i]).top+50){
                    aLLImg[i].src=aLLImg[i].getAttribute('_src');
                }
            }
        }
    })();
    /*waterfall*/
    (function(){
        var oWTF=document.getElementById('waterfall_cont');
        var aWUl=oWTF.getElementsByTagName('ul');
        var oHtml=document.getElementsByTagName('html')[0];
        var arrW=[];
        for(var i=0;i<aWUl.length;i++){
            arrW.push(aWUl[i]);
        }
        function createList(){
            for(var i=0;i<20;i++){
                var oLi=document.createElement('li');
                oLi.style.height=rnd(300,500)+'px';
                oLi.style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
                arrW.sort(function(n,m){
                    return n.offsetHeight- m.offsetHeight;
                });
                arrW[0].appendChild(oLi);
            }
        }
        createList();
        var cH=document.documentElement.clientHeight;
        function waterFall(){
            var sH=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            var oH=Math.min(document.documentElement.scrollHeight,document.body.scrollHeight);
            //alert(oH);
            if((sH+cH)>oH-100){
                createList();
            }
            if(oH>15000){
                removeEvent(window,'scroll',waterFall);
                alert('already to the bottom');
            }
        }
        addEvent(window,'scroll',waterFall);
    })();
    /*toTop*/
    (function(){
        var cH=document.documentElement.clientHeight;
        var oToTop=document.getElementById('toTop');
        var oTS=document.getElementById('toTop_c');
        oToTop.onmouseover=function(){
            oTS.style.backgroundPosition='-88px 0';
        };
        oToTop.onmouseout=function(){
            oTS.style.backgroundPosition='0 0';
        };
        addEvent(window,'scroll',function(){
            var sH=document.documentElement.scrollTop||document.body.scrollTop;
            if((sH+cH)>1500){
                oToTop.style.display='block';
            }else{
                oToTop.style.display='none';
            }
        });
        oToTop.onclick=function(){
            var sH=document.documentElement.scrollTop||document.body.scrollTop;
            var start=sH;
            var dis=0-start;
            var time=sH/5000*500;
            var count=Math.floor(time/16);
            var n=0;
            clearInterval(timer);
            var timer=setInterval(function(){
                n++;
                if(navigator.userAgent.indexOf('Chrome')!=-1){
                    document.body.scrollTop=start+dis*n/count;
                }else{
                    document.documentElement.scrollTop=start+dis*n/count;
                }
                if(n>=count){
                    clearInterval(timer);
                }
            },16);
        };
    })();
});
