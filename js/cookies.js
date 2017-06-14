/*
* ����������װ��״ͼ�Ĺ��캯��
* */
function Cookies(option){
    this._init(option);
}
Cookies.prototype ={
    /*
    * ��_init�洫������ݣ�ʹ�����Ǻ����ľֲ�����
    * */
    _init:function(option){
        this.x =option.x;//����ͼ����x
        this.y =option.y;//����ͼ����y
        this.data =option.data;//���������
        this.radius =option.radius || 100;//����ͼ�İ뾶
        this.startAngle =option.startAngle ||0;//����ͼ���Ƶ���ʼ�Ƕ�
        this.fontSize =option.fontSize || 16;//�����ı��Ĵ�С
        this.len =option.len ||20;//�����ı���λ��
        this.arr =new Array();
        this.drawImage();//���Ʊ���ͼ
    },
    drawImage:function(){
        /*
        * ��layerȡ�����ݸ������ݻ�Ш��ͼ����Ш��ͼƴ��һ������ͼ
        * 1.����Ш��ͼ
        * 2.��������
        * */
        this.group =new Konva.Group({
            x:this.x,
            y:this.y
        });
        var that =this;
        this.data.forEach(function(v,i){
            //���Ш��ͼ
            var wedge =new Konva.Wedge({
                x: 0,
                y: 0,
                radius: that.radius,
                angle: 0,
                rotation:that.startAngle,
                fill: v.color,
            });
            that.group.add(wedge);
            //�������
            var calAngle =that.startAngle+ v.value*360/2;
            var text =new Konva.Text({
                x: (that.radius+that.len) *Math.cos(calAngle *Math.PI/180),//��Math��Ҫ���Ƕ�ת��Ϊ����
                y: (that.radius+that.len) *Math.sin(calAngle *Math.PI/180),
                text: v.name + " "+v.value*100 +"%",
                //fontSize: that.fontSize,
                opacity:0,
                fill: v.color,
            });
            if( calAngle>=90 && calAngle<=270){
                var width = text.width();
                //�õ����ֵ�x������
                var textX = text.x();
                //���ı��Ŀ�ʼ��������Ϊ��
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
            //�������ֵĶ�������
            var tween1 =new Konva.Tween({
                node: v[1],
                duration: 1,
                opacity: 1,
            });
            //���ñ�״ͼ�Ķ�������
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
