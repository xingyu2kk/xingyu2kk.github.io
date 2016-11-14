function setCookie(name,value,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		oDate.setHours(0,0,0,0);
		document.cookie = name+'='+value+'; PATH=/; EXPIRES='+oDate.toGMTString();
	}else{
		document.cookie = name+'='+value+'; PATH=/';
	}
}

function getCookie(name){
	//name = leo; age=18; sex='男'
	//[name=leo,age18,sex=男]
	var str = document.cookie;
	var arr = str.split('; ');
	
	for(var i = 0;i<arr.length;i++){
		if(arr[i].split('=')[0] == name){
			return arr[i].split('=')[1];
		}
	}
	return '';
}
function removeCookie(name){
	setCookie(name,1,-1);
}
