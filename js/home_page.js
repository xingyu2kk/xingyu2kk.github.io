/**
 * Created by Administrator on 2016/11/13.
 */
window.onload=function(){
    (function(){
        var oPreload=document.getElementById('preloader');
        //oPreload.style.opacity=0;
        domove(oPreload,{'opacity':0},{'duration':500,'easing':Tween.Linear,'complete':function(){
            oPreload.style.display='none';
        }});
    })();
    /*header_li*/
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
    /*homepage*/
    (function(){
        var oMrBox=document.getElementById('main_right');
        var oMrUl=document.getElementById('main_right_ul');
        var aMrLi=oMrUl.children;
        var oMrItem=document.getElementById('main_right_item');
        var aMrItemLi=oMrItem.children;
        var oLeft=document.getElementById('toleft');
        var oRight=document.getElementById('toright');
        var iNow=0;
        var timer=null;
        var W=aMrLi[0].offsetWidth;
        var w=oMrUl.offsetWidth;
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
};