/*
* �������ݻ�������ͼ���������캯��
* */
function Grapt(option){
    this._init(option);
}
Grapt.prototype ={
    //��ʼ������ͼ��������
    _init:function(option){
        this.x =option.x || 0;//��������ͼ�ĳ�ʼ����x
        this.y =option.y || 0;//��������ͼ�ĳ�ʼ����y
        this.maxHeight =option.maxHeight;//��������ͼ���������
        this.data =option.data;//��������
        this.w =option.w;//��������ϵ�Ŀ��
        this.rectW =this.w/this.data.length;//��������ͼռÿ������Ŀ��
        this.hW =option.hW || this.rectW/2;//��������ͼ�Ŀ��
        this.cornerRadius =option.cornerRadius || this.hW/16,//����Բ��
        this.lineColor =option.lineColor || "skyblue";//�����������ɫ
        this.fontSize =option.fontSize || 16;//���������С
        this.arr =new Array();//�����洢text������ͼ������
        this.drawImage();
    },
    //���������ᣬ����ͼ����ʾ����
    drawImage:function(){
        var that =this;
        this.group =new Konva.Group({
            x:this.x,
            y:this.y
        });
    //����������
        var line = new Konva.Line({
            points: [ 0, 0, this.w, 0 ],
            stroke: this.lineColor,
        });
        this.group.add(line);
        //�������ݻ�������ͼ
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
        //�������ֺ�����ͼ�Ķ�������
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