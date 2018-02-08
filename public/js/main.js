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
    hp: 100
};

// enemy list
const enemyList = {};

// enemy stats
Enemy = function (id, x, y, spdX, spdY, name) {
    var enemy = {
    x: x,
    spdX: spdX,
    y: y,
    spdY: spdY,
    name: name,
    id: id,

    };

    enemyList[id] = enemy;
};

//return distance (number)
getDistanceBetweenEntity = (entity1,entity2) => {     
    var entityX = entity1.x - entity2.x;
    var entityY = entity1.y - entity2.y;
    return Math.sqrt(entityX * entityX + entityY * entityY);
};

//return if colliding (true/false)
testCollisionEntity = (entity1,entity2) => {  
    var distance = getDistanceBetweenEntity(entity1,entity2);
    return distance < 30;
};

document.onmousemove = (mouse) => {
    var mouseX = mouse.clientX;
    var mouseY = mouse.clientY; 

    player.x = mouseX;
    player.y = mouseY;
}

// update entity
updateEntity = (entity) => {

    drawEntity(entity);
    updateEntityPosition(entity);
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

}

drawEntity = (entity) => {
    
    canvas.fillText(entity.name, entity.x, entity.y);

}

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
Enemy('E1', 150, 250, 10, 15, 'E1');
Enemy('E2', 250, 350, 10, -15, 'E2');
Enemy('E3', 350, 150, 10, -8, 'E3');

// update interval
setInterval(update, 20);















 
