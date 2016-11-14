/**
 * Created by Administrator on 2016/11/2.
 */
var CANNON_SIZE=[
    null,
    {w: 74, h: 74},
    {w: 74, h: 76},
    {w: 74, h: 76},
    {w: 74, h: 83},
    {w: 74, h: 85},
    {w: 74, h: 90},
    {w: 74, h: 94}
];
function Cannon(type){
    this.type=type;
    this.x=431;
    this.y=570;
    this.rotate=0;
    this.timer=null;
    this.cur=0;
}
Cannon.prototype.draw=function(gd){
    var w=CANNON_SIZE[this.type].w;
    var h=CANNON_SIZE[this.type].h;
    gd.save();
    gd.translate(this.x,this.y);
    gd.rotate(d2a(this.rotate));
    gd.drawImage(JSON['cannon'+this.type],0,this.cur*h,w,h,-w/2,-h/2,w,h);
    gd.restore();
};
Cannon.prototype.emitChange=function(){
    var _this=this;
    clearInterval(this.timer);
    this.timer=setInterval(function(){
        _this.cur++;
        if(_this.cur==5){
            _this.cur=0;
            clearInterval(_this.timer);
        }
    },100);
};
Cannon.prototype.playVoice=function(){
    var oA=new Audio();
    oA.src='snd/cannon.mp3';
    oA.play();
};