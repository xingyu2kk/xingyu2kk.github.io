/**
 * Created by Administrator on 2016/11/1.
 */
function d2a(n){
    return n*Math.PI/180;
}
var JSON={};
function loadImage(arr,fn){
    var count=0;
    for(var i=0;i<arr.length;i++){
        var oImg=new Image();
        (function(index){
            oImg.onload=function(){
                JSON[arr[index]]=this;
                count++;
                if(count==arr.length){
                    fn&&fn();
                }
            }
        })(i);
        oImg.src='fish/'+arr[i]+'.png';
    }
}
function d2a(n){
    return n*Math.PI/180;
}
function a2d(n){
    return n*180/Math.PI;
}
function rnd(n,m){
    return Math.floor(Math.random()*(m-n)+n);
}