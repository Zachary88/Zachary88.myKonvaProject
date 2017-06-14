/*
* 根据数据画出条形图，创建构造函数
* */
function Grapt(option){
    this._init(option);
}
Grapt.prototype ={
    //初始化条形图的条件，
    _init:function(option){
        this.x =option.x || 0;//设置条形图的初始坐标x
        this.y =option.y || 0;//设置条形图的初始坐标y
        this.maxHeight =option.maxHeight;//设置条形图的最大柱高
        this.data =option.data;//传入数据
        this.w =option.w;//设置坐标系的宽度
        this.rectW =this.w/this.data.length;//设置条形图占每个区域的宽度
        this.hW =option.hW || this.rectW/2;//设置条形图的宽度
        this.cornerRadius =option.cornerRadius || this.hW/16,//设置圆角
        this.lineColor =option.lineColor || "skyblue";//设置坐标的颜色
        this.fontSize =option.fontSize || 16;//设置字体大小
        this.arr =new Array();//用来存储text和条形图的数据
        this.drawImage();
    },
    //绘制坐标轴，条形图和显示文字
    drawImage:function(){
        var that =this;
        this.group =new Konva.Group({
            x:this.x,
            y:this.y
        });
    //绘制坐标轴
        var line = new Konva.Line({
            points: [ 0, 0, this.w, 0 ],
            stroke: this.lineColor,
        });
        this.group.add(line);
        //根据数据绘制条形图
        var that =this;
        this.data.forEach(function(v,i){
            var rect = new Konva.Rect({
                x: 0 +(i+1/4) *that.rectW,
                y: 0,
                width: that.hW,
                height: 0,
                fill: v.color,
                //cornerRadius: that.cornerRadius
            });
            that.group.add(rect);
            var txt = new Konva.Text({
                x: 0+(i+1/4)*that.rectW,
                y: 10,
                width:that.hW,
                align:'center',
                text: v.name,
                fontSize: that.fontSize,
                fill: v.color
            });
            that.group.add(txt);
            var txt1 = new Konva.Text({
                x: 0+(i+1/4)*that.rectW,
                y: 0,
                width:that.hW,
                align:'center',
                text: v.value*100+"%",
                fontSize: that.fontSize,
                fill: v.color
            });
            that.group.add(txt1);
            that.arr[that.arr.length]=[rect,txt1];
        });

    },
    addToLayerOrGroup:function(layerOrGroup){
        layerOrGroup.add(this.group);
},
    move:function(){
        //设置文字和条形图的动画函数
        var that=this;
        this.arr.forEach(function(v,i){
            var tween1 = new Konva.Tween({
                node: v[0],
                duration: 1,
                height:-that.maxHeight * that.data[i].value,
            });
            var tween2 = new Konva.Tween({
                node: v[1],
                duration: 1,
                y:-that.maxHeight * that.data[i].value -20
            });
            tween1.play();
            tween2.play();
        });

    }
}