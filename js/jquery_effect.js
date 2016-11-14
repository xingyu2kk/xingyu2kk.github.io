/**
 * Created by Administrator on 2016/11/12.
 */
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
$(function(){
    /*preloader*/
    $('#preloader').animate({'opacity':0},{'duration':500,'easing':'linear'});
    $('#preloader').css({'display':'none'});
});