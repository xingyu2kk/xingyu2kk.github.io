/**
 * Created by Administrator on 2016/11/6.
 */
function addCookie(name,value,iDay){
    iDay=iDay||0;
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+'; PATH=/; EXPIRES='+oDate.toGMTString();
}
function getCookie(name){
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        if(arr[i].split('=')[0]==name){
            return arr[i].split('=')[1];
        }
    }
}
function removeCookie(name){
    addCookie(name,1,-1);
}