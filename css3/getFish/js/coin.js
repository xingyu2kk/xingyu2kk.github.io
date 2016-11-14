/**
 * Created by Administrator on 2016/11/2.
 */
function Coin(type){
    this.type=type;
    this.x=0;
    this.y=0;
    this.cur=0;
    this.count=0
    this.move();
}
Coin.prototype.move=function(){
    var _this=this;
    setInterval(function(){
        _this.x+=(0-_this.x)/20;
        _this.y+=(650-_this.y)/10;
        _this.cur++;
        if(_this.cur==10){
            _this.cur=0;
        }
    },30);
};
Coin.prototype.draw=function(gd){
    if(this.type<3){
        this.count=1;
    }else{
        this.count=2;
    }
    gd.save();
    gd.translate(this.x,this.y);
    gd.drawImage(JSON['coinAni'+this.count],0,this.cur*60,60,60,-30,-30,60,60);
    gd.restore();
};
Coin.prototype.playVoice=function(){
    var oA=new Audio();
    oA.src='snd/coin.wav';
    oA.play();
};