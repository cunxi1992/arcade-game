/****************************************************   敌人 *********************************************/

/*
 * 设置玩家要躲避的敌人对象
 */
var Enemy = function() {
    //设置一个敌人
    this.sprite = 'images/enemy-bug.png';
    //敌人的初始位置和行进速度
    this.enemyUpdateUpdateLocation();
};

/*
 * 此函数用于更新敌人的初始位置，以及敌人的前进速度
 */
 Enemy.prototype.enemyUpdateUpdateLocation = function(){
    //设置敌人出现的位置，敌人出现的横向位置不在画面内是为了使之出现时看上去很自然
    this.x = -100;
    this.y = 170 * Math.random() + 60;
    //敌人的前进速度
    this.speed = Math.random() * 400 + 80;

 };

/*
 * 此函数用来更新敌人的位置，参数: dt ，表示时间间隙
 */
Enemy.prototype.update = function(dt) {

    //敌人沿着x轴正方向从左往右移动，敌人消失的位置不在画面内是为了使之消失时看上去很自然
    this.x = this.x + this.speed * dt;
    if(this.x >= 600){
        this.enemyUpdateUpdateLocation();
    }
};

/*
 * 此函数用来在屏幕上画出敌人
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * 实例化敌人对象，把所有敌人的对象都放进一个叫 allEnemies 的数组里面
 */
var allEnemies = [];
for(var i = 0; i < 4;i++){
    var enemy = new Enemy();
    allEnemies.push(enemy);
};



/****************************************************   玩家 *********************************************/


/*
 * 设置一个游戏玩家
 */
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.playerUpdateLocation();
 };


/*
 * 此函数用于更新玩家初始位置
 */
Player.prototype.playerUpdateLocation = function(){
    this.x = 202;
    this.y = 404;
};


/*
 * 根据玩家输入的值，来移动玩家的位置
 */
Player.prototype.handleInput = function(e){
    var width = 101;
    var height = 80;
    if(e == 'left' && this.x - width >= 0){
        this.x -= width;
    }
    else if(e == 'up'){
        this.y -= height;
    }
    else if(e == 'right' && this.x + width <= 404){
        this.x += width;
    }
    else if(e == 'down' && this.y + height <= 404){
        this.y += height;
    }
};

/*
 * 实现玩家到达终点后提示玩家胜利，以及玩家撞到敌人时游戏重新开始
 */
Player.prototype.update = function(){
    //当玩家到达符合这个条件的位置区域时，表示玩家赢得了游戏，点击弹出信息框的确定时，玩家回到初始位置
    if(this.y < 0){
        alert("Congratulations,you win the game!");
        this.playerUpdateLocation();
    }
      //当玩家撞到敌人时，表示玩家失败，游戏重新开始，玩家回到初始位置
    for(i = 0; i < 4; i++){
        if(allEnemies[i].x - 60 < this.x && this.x < allEnemies[i].x + 60 && allEnemies[i].y - 50<this.y && this.y< allEnemies[i].y + 70){
            this.playerUpdateLocation();
        }
}
};

/*
 * 此函数用来在屏幕上画出玩家
 */
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * 实例化玩家对象，把玩家对象放进一个叫 player 的变量里面
 */
var player = new Player();



/****************************************************   键盘输入值代表玩家的前进方向  *********************************************/


/*
 * 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()方法里面
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});







