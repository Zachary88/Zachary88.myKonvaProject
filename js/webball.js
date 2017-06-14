/*
* 封装圆环
* */
function Ring(option){
    this._init(option);
}
Ring.prototype={
    //初始化数据
    _init:function(option){
        this.x =option.x;//设置原点x坐标
        this.y =option.y;//设置原点y坐标
        this.innerRadius =option.innerRadius;//设置外圆半径
        this.outerRadius =option.outerRadius;//设置内圆半径
        this.ringColor =option.ringColor;//设置圆环的颜色
        this.circleColor =option.circleColor;//设置圆的颜色
        this.ringOpacity =option.ringOpacity || .5;//设置圆环透明度
        this.circleOpacity =option.circleOpacity || 1;//设置圆的透明度
        this.text =option.text;//设置圆内的文本
        this.textColor =option.textColor || 'white';//设置文本颜色
        this.fontSize =option.fontSize;//设置文本的大小
        this.group =new Konva.Group({
            x:this.x,
            y:this.y,
        });//设置分组
       this.drawCircle();
    },
    drawCircle:function(){
        //画圆环
        var ring = new Konva.Ring({
            x: 0,
            y: 0,
            innerRadius:this.innerRadius,
            outerRadius: this.outerRadius,
            fill: this.ringColor,
            opacity: this.ringOpacity,
        });
        this.group.add(ring);
        //画圆
        var circle =new Konva.Circle({
            radius:this.innerRadius,
            fill: this.circleColor,
            x:0,
            y:0,
            opacity: this.circleOpacity,
        });
        this.group.add(circle);
        //文字
        var txt = new Konva.Text({
            fontSize: this.fontSize,
            x:-this.innerRadius,
            y:-this.fontSize /2,
            width:this.innerRadius*2,
            align:'center',
            fill:this.textColor,
            text: this.text,
        });
        this.group.add(txt);
    },
    addToLayerOrGroup:function(layerOrGroup){
        layerOrGroup.add(this.group);
    },
};