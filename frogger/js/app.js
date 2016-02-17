var goX = 101;
var goY = 84;
var leftSize = 0;
var rightSize = 400;
var topSize = 84;
var bottomSize = 400;
var life=3;

var board = function (x,y){
    this.x=x;
    this.y=y;    
};
board.prototype.render = function(){
  
    ctx.font="48px heveltica "
    ctx.fillText(this.getText(),this.x,this.y);
};
var Vida=function(x,y){
  board.call(this, x,y);
    this.life=life;
};
Vida.prototype=Object.create(board.prototype);
Vida.prototype.getText=function(){
    return "Lifes: "+ this.life;
};

var LifeBoard = new Vida (0,580);

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = x;
    this.y = y;
    this.speed = (Math.random() * 300) +80;  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
    if (this.x > rightSize+101) {
        this.x = Math.floor(Math.random() * -200);
    }
};``

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
	this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
	
};
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	for(var e = 0, quantityEnemies = allEnemies.length; e < quantityEnemies; e++) {
        if(player.x <= (allEnemies[e].x + 70) && allEnemies[e].x <= (player.x + 50) && player.y <= (allEnemies[e].y + 70) && allEnemies[e].y <= (player.y + 60)) {
            LifeBoard.life -= 1;
            if(LifeBoard.life==0)
                {
                    LifeBoard.life=3;
                }
            player.reset();               
            }
}
};
Player.prototype.handleInput = function(key) {
	 switch(key){
    case 'left':
        if (this.x > leftSize)
        this.x -=goX;
        break;
    case 'right':
        if (this.x < rightSize)
        this.x +=goX;
        break;
    case 'up':
        if (this.y > topSize)
        this.y -=goY;
        else player.reset();
        break;
    case 'down':
        if (this.y < bottomSize)
        this.y +=goY;
        break;
    default:
        return;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
var enemy1 = new Enemy(0, 62);
allEnemies.push(enemy1);
var enemy2 = new Enemy(-200, 62);
allEnemies.push(enemy2);
var enemy3 = new Enemy(0, 144);
allEnemies.push(enemy3);
var enemy4 = new Enemy(-200, 144);
allEnemies.push(enemy4);
var enemy5 = new Enemy(0, 230);
allEnemies.push(enemy5);
var enemy6 = new Enemy(-200, 230);
allEnemies.push(enemy6);
player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};
