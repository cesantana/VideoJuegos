var pts=0;
var vida=3;
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    sprBombs: [],
    sprCarrot: [],
    size: null,
    random: function randomizer(x, y) {
        return Math.floor(Math.random() * (x - y + 1)) + y;
    },
    
    addBombs: function (){
        var bomb = new cc.Sprite(res.bomba_png);
        bomb.setPosition(this.random(275,680), size.height+100);
        this.addChild(bomb,1);
        var moveto = cc.moveTo(this.random(1,8), this.random(275,680), -200);
        bomb.runAction(moveto);
        this.sprBombs.push(bomb);
        
    },
    
    addCarrot: function (){
        var carrot = new cc.Sprite(res.zanahoria_png);
        carrot.setPosition(this.random(275,680), size.height+100);
        this.addChild(carrot,1);
        var moveto = cc.moveTo(this.random(1,8), this.random(275,680), -200);
        carrot.runAction(moveto);
        this.sprCarrot.push(carrot);
        
    },
    
    moveBunny: function(location, event){
        cc.log("Mover conejo");
        var size = cc.winSize;
        var  move = event.getCurrentTarget();
        var locate = location.getLocation();
        var x=locate.x;
        if(locate.x<275)
            { x=275;}
        if(locate.x>680)
            { x=680;}
        move.sprConejo.setPosition(x, size.height * 0.15);
       
        var bunnyPlace = move.sprConejo.getBoundingBox();
       //quita vidas al conejo
        for(var bomb of move.sprBombs){
            var bombPlace = bomb.getBoundingBox();
            if(cc.rectIntersectsRect(bombPlace,bunnyPlace)&& bomb.isVisible()==true){
                bomb.setVisible(false);
               vida-=1;
                cc.log("Oops!!"+vida);
                if(vida==0)
                    {
                        alert("Ops!! Mala suerte, perdiste todas las vidas! Vuelve a intentarlo");
                       // this.sprBombs.length=0;
                        //this.sprCarrot.length=0;
                        pts=0;
                        vida=3;
                    }
            }
        }
        //le da puntos al conejo
        for(var carrot of move.sprCarrot){
            var carrotPlace = carrot.getBoundingBox();
            if(cc.rectIntersectsRect(carrotPlace,bunnyPlace)&& carrot.isVisible()==true){
                carrot.setVisible(false);
                pts+=10;
                cc.log("Puntos!!"+pts);
            }
        }
    },
    
    score: function (){
  var size = cc.winSize;
		this.size = size;
        this.removeChildByTag(15, true);
        var board = new cc.LabelTTF("Puntos: " +pts +" \nVida: " +vida, "Arial", 45);
        board.x = size.width/2-350;
        board.y = size.height/2 + 210;
        board.setTag(15);
        this.addChild(board, 1);   
    
},
   touch: function(location, event){
        var ubicacion = location.getLocation();
        return true;
    }, 
    
    
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        size = cc.winSize;
        cc.log(size.width);
        cc.log(size.height);

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //puntos &vida
        var board = new cc.LabelTTF("Puntos: " +pts +" \nVida: " +vida, "Arial", 45);
        board.x = size.width/2-350;
        board.y = size.height/2 + 210;
        board.setTag(15);
        this.addChild(board,1);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        this.schedule(this.addCarrot,2);
        this.schedule(this.addBombs,3);
        this.schedule(this.score,1);

        
        cc.eventManager.addListener({ 
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.touch,
            onTouchMoved: this.moveBunny   
            }, this);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

