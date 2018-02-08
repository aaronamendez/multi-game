// fetching canvas
const canvas = document.getElementById("canvas").getContext("2d");
// styling canvas
canvas.font = '30px Arial';

// playing field
var timeWhenGameStarted = Date.now();
const canvasWidth = 500;
const canvasHeight = 500;

// player
const player = {
    x: 50,
	spdX: 30,
	y: 40,
	spdY: 5,
	name: 'P',
    hp: 100,
    width: 20,
    height: 20,
    color: 'green',
};

// enemy list
const enemyList = {};

// enemy stats
Enemy = function (id, x, y, spdX, spdY, name, width, height) {
    var enemy = {
    x: x,
    spdX: spdX,
    y: y,
    spdY: spdY,
    name: name,
    id: id,
    width: width,
    height: height,
    color: 'red',

    };

    enemyList[id] = enemy;
};

//return distance (number)
getDistanceBetweenEntity = (entity1, entity2) => {     
    var entityX = entity1.x - entity2.x;
    var entityY = entity1.y - entity2.y;
    return Math.sqrt(entityX * entityX + entityY * entityY);
};

//return if colliding (true/false)
testCollisionEntity = (entity1, entity2) => {  
    var rect1 = {
        
        x: entity1.x - entity1.width /2,
        y: entity1.y - entity1.height /2,
        width: entity1.width,
        height: entity1.height,
    }

    var rect2 = {

        x: entity2.x-entity2.width/2,
        y: entity2.y-entity2.height/2,
        width: entity2.width,
        height: entity2.height,
    }

    return testCollisionRect(rect1, rect2)
};

document.onmousemove = (mouse) => {
    var mouseX = mouse.clientX;
    var mouseY = mouse.clientY; 

    player.x = mouseX;
    player.y = mouseY;
};

// update entity
updateEntity = (entity) => {

    updateEntityPosition(entity);
    drawEntity(entity);
};

updateEntityPosition = (entity) => {
    
    entity.x += entity.spdX;
    entity.y += entity.spdY;

       
    if(entity.x < 0 || entity.x > canvasWidth){
        // console.log(message);
        entity.spdX = -entity.spdX;
    }

    if(entity.y < 0 || entity.y > canvasHeight){
        // console.log(message);
        entity.spdY = -entity.spdY;
    }

};

testCollisionRect = (rect1, rect2) => {
    return rect1.x <= rect2.x+rect2.width 
        && rect2.x <= rect1.x+rect1.width
        && rect1.y <= rect2.y + rect2.height
        && rect2.y <= rect1.y + rect1.height
};

// creates player
drawEntity = (entity) => {
    
    canvas.save();
    canvas.fillStyle = entity.color;
    canvas.fillRect(entity.x-entity.width/2, entity.y-entity.height/2, entity.width, entity.height-10, 20, 20);
    canvas.restore();

};

// the call for setinterval (update)
update = () => {
    canvas.clearRect(0, 0, canvasWidth, canvasHeight)

    for (var i in enemyList) {
        
        updateEntity(enemyList[i])

        var isColliding = testCollisionEntity(player, enemyList[i]);
        if (isColliding) {
            
            console.log('Collided!')
            
            player.hp = player.hp - 10;

            if (player.hp <= 0) {

                var timeSurvived = Date.now() - timeWhenGameStarted
                console.log('You lost! You survived for ' + timeSurvived + ' miliseconds.');
                timeWhenGameStarted = Date.now()
                player.hp = 100;
                
            }

        }
    }

    drawEntity(player);
    canvas.fillText(player.hp + "HP", 0, 20)
};

// create enemies
Enemy('E1', 150, 250, 10, 15, 'E1', 30, 30);
Enemy('E2', 100, 200, 10, -15, 'E2', 40, 20);
Enemy('E3', 175, 150, 10, 20, 'E3', 50, 10);

// update interval
setInterval(update, 20);















 
