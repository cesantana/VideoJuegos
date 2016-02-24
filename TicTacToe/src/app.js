
var HelloWorldLayer = cc.Layer.extend({
    table:null,
    juega:"O",
    ref: " ",
    tablaJuego:new Array([" "," "," "],[" "," "," "],[" "," "," "]),
    tipo:new Array([" "," "," "],[" "," "," "],[" "," "," "]),
    
    
    begin:function(touch, event){
        var x1 = 341, x2 = 434, x3 = 527, x4 = 621;
        var y1 = 422, y2 = 320, y3 = 215, lineY4 = 110;
        var alignedX1 = x1 + (x2-x1)/2, alignedX2 = x2 + (x3-x2)/2, alignedX3 = x3 + (x4-x3)/2;
        var alignedY1 = y1 + (y2-y1)/2, alignedY2 = y2 + (y3-y2)/2, alignedY3 = y3 + (lineY4-y3)/2;
        var target = event.getCurrentTarget();
        var x = Math.floor(touch.getLocationX());
        var y = Math.floor(touch.getLocationY());
        
        
        //aqui se alternan los turnos
        if(target.juega == "O"){
            if(executePlay("O")){
                verificarGanador();
                target.juega = "X";
            }
        } else{
            if(executePlay("X")){
                verificarGanador();
                target.juega = "O";
            }
        }
        
        //aqui se comienza a jugar
        function executePlay(){
            
            if(x < x2 && y > y2)
            {            
                return tablero(0, 0, alignedX1, alignedY1);     
            }
            else if(x >x2 && x < x3 && y>y2){                
                return tablero(0, 1, alignedX2, alignedY1);
            } 
            else if(x >x3 && y > y2){                
                return tablero(0, 2, alignedX3, alignedY1);
            }
            else if(x < x2 && y < y2 && y>y3){                
                return tablero(1, 0, alignedX1, alignedY2); 
            } 
            else if(x > x3 && y < y2 && y>y3){
                return tablero(1, 2, alignedX3, alignedY2);
            }
            else if(x < x2 && y < y3){  
                return tablero(2, 0, alignedX1, alignedY3);
            } 
            else if(x > x2 && x < x3 && y<y3){  
                return tablero(2, 1, alignedX2, alignedY3);  
            }
            else if(x > x3 && y < y3){
                return tablero(2, 2, alignedX3, alignedY3); 
            }
            else{
                return tablero(1, 1, alignedX2, alignedY2);
            }
        }
        
        
        //aqui se ponen las fotos dependiendo de donde juega
        function tablero(x1, x2, posX, posY){
            
            if(target.tablaJuego[x1][x2] == " "){
                if(target.juega == "O"){
                    target.tablaJuego[x1][x2] = new cc.Sprite(res.O_png);
                    target.tablaJuego[x1][x2].attr({x: posX, y: posY});
                    target.tablaJuego[x1][x2].setTag( (x1+1)*10 + x2 );
                    target.addChild(target.tablaJuego[x1][x2], 1);
                    target.tipo[x1][x2] = "O";
                 return true;
                 }
                else{
                    target.tablaJuego[x1][x2] = new cc.Sprite(res.X_png);
                    target.tablaJuego[x1][x2].attr({x: posX, y: posY});
                    target.tablaJuego[x1][x2].setTag( (x1+1)*10 + x2 );
                    target.addChild(target.tablaJuego[x1][x2], 1);
                    target.tipo[x1][x2] = "X";
                    
                    return true;
                }
                    return false;
            }
    }
        
        function limpiarTabla(){

            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    target.removeChildByTag( (i+1)*10 + j, true);
                }
            }
            target.tablaJuego = new Array([" "," "," "],[" "," "," "],[" "," "," "]);
            target.tipo = new Array([" "," "," "],[" "," "," "],[" "," "," "]);
            target.ref = " ";
        }
        
        function verificarGanador(){
            empate();
            if(target.ref == " "){
                horizontal();
                vertical();
                diagonal();
            }
            
            if(target.ref != " "){
                limpiarTabla();
            }
        }
        
        function horizontal(){
            //checking Horizontally
            for(var i = 0; i<3;i++){
                var flag = true;
                for(var j = 0; j<3; j++){
                    if(target.tipo[i][j] != target.juega){
                        flag = false;
                    }   
                }
                if(flag){
                    target.ref = target.juega;
                }
            }
        }
        
        function vertical(){
            for(var i = 0; i<3;i++){
                var flag = true;
                for(var j = 0; j<3; j++){
                    if(target.tipo[j][i] != target.juega){
                        flag = false;
                    }   
                }
                if(flag){
                    target.ref = target.juega;
                }
            }
        }
        
        function diagonal(){
            if( (target.tipo[0][0] == target.juega && target.tipo[1][1] == target.juega && target.tipo[2][2] == target.juega) 
               || (target.tipo[2][0] == target.juega && target.tipo[1][1] == target.juega && target.tipo[0][2] == target.juega) ){
                target.ref = target.juega;
            }
        }
        
        function empate(){
            var flag = true;
            for(var i = 0; i<3;i++){
                for(var j = 0; j<3; j++){
                    if(target.tipo[j][i] == " "){
                        flag = false;
                    }   
                }
            }
            if(flag == true){
                target.ref = "tie";
            }
        }
        
    },
    
    ctor:function () {
        
        this._super();
        var size = cc.winSize;
		this.size = size;
        
        
        
        //Aqui puse mis credenciales
        var candido = new cc.LabelTTF("Candido E. Santana", "Arial", 15);
        candido.x = size.width/2 - 95;
        candido.y = size.height/2 -223;
        this.addChild(candido, 1);
        
        // Adding Title
        var helloLabel = new cc.LabelTTF("TicTacToe", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 170;
        this.addChild(helloLabel, 5);
        
        
        
        // Adding Table Sprite
        this.table = new cc.Sprite(res.tablero_png);
        this.table.attr({x: size.width / 2,y: size.height / 2});
        this.addChild(this.table, 0);
		
		//Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.begin
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

