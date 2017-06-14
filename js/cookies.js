/*
* 用面向对象封装饼状图的构造函数
* */
function Cookies(option){
    this._init(option);
}
Cookies.prototype ={
    /*
    * 用_init存传入的数据，使数据是函数的局部变量
    * */
    _init:function(option){
        this.x =option.x;//饼形图坐标x
        this.y =option.y;//饼形图坐标y
        this.data =option.data;//传入的数据
        this.radius =option.radius || 100;//饼形图的半径
        this.startAngle =option.startAngle ||0;//饼形图绘制的起始角度
        this.fontSize =option.fontSize || 16;//设置文本的大小
        this.len =option.len ||20;//设置文本的位置
        this.arr =new Array();
        this.drawImage();//绘制饼形图
    },
    drawImage:function(){
        /*
        * 从layer取得数据根据数据画楔形图，将楔形图拼成一个饼形图
        * 1.创建楔形图
        * 2.创建文字
        * */
        this.group =new Konva.Group({
            x:this.x,
            y:this.y
        });
        var that =this;
        this.data.forEach(function(v,i){
            //添加楔形图
            var wedge =new Konva.Wedge({
                x: 0,
                y: 0,
                radius: that.radius,
                angle: 0,
                rotation:that.startAngle,
                fill: v.color,
            });
            that.group.add(wedge);
            //添加文字
            var calAngle =that.startAngle+ v.value*360/2;
            var text =new Konva.Text({
                x: (that.radius+that.len) *Math.cos(calAngle *Math.PI/180),//用Math需要将角度转化为弧度
                y: (that.radius+that.len) *Math.sin(calAngle *Math.PI/180),
                text: v.name + " "+v.value*100 +"%",
                //fontSize: that.fontSize,
                opacity:0,
                fill: v.color,
            });
            if( calAngle>=90 && calAngle<=270){
                var width = text.width();
                //得到文字的x的坐标
                var textX = text.x();
                //将文本的开始坐标设置为：
                text.x(textX - width);
                console.log(text.x());
            }
            that.group.add(text);
            that.startAngle += v.value*360;
            that.arr[that.arr.length]=[wedge,text];
        });
    },
    addToLayerOrGroup:function(layerOrGroup){
      layerOrGroup.add(this.group);
    },
    move:function(){
        var that =this;
        this.arr.forEach(function(v,i){
            //设置文字的动画函数
            var tween1 =new Konva.Tween({
                node: v[1],
                duration: 1,
                opacity: 1,
            });
            //设置饼状图的动画函数
            var tween =new Konva.Tween({
                node: v[0],
                angle:that.data[i].value*360,
                duration: 1,
            });
            setTimeout(function(){
                tween.play();
                tween1.play();
            },100);
        });
    }
}
