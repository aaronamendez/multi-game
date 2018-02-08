// fetching canvas
const canvas = document.getElementById("canvas").getContext("2d");
// styling canvas
canvas.font = '30px Arial';

// playing field
const message = 'Out of Bounds!'
const canvasWidth = 500;
const canvasHeight = 500;

// player
const player = {
	x: 50,
	spdX: 30,
	y: 40,
	spdY: 5,
	name: 'P',
};

// enemy list
const enemyList = {};

// create enemies
Enemy('E1', 150, 250, 10, 15, 'E1');
Enemy('E2', 250, 350, 10, -15, 'E2');
Enemy('E3', 350, 150, 10, -8, 'E3');

// enemy stats
function Enemy(id, x, y, spdX, spdY, name) {
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
function getDistanceBetweenEntity(entity1,entity2) {     
    var entityX = entity1.x - entity2.x;
    var entityY = entity1.y - entity2.y;
    return Math.sqrt(entityX * entityX + entityY * entityY);
};

//return if colliding (true/false)
function testCollisionEntity(entity1,entity2) {  
    var distance = getDistanceBetweenEntity(entity1,entity2);
    return distance < 30;
};

// update interval
setInterval(update, 20);

// update entity
function updateEntity(entity) {

    entity.x += entity.spdX;
    entity.y += entity.spdY;

    canvas.fillText(entity.name, entity.x, entity.y);

    // console.log('hello, world!', entity.x);
       
    if(entity.x < 0 || entity.x > canvasWidth){
        // console.log(message);
        entity.spdX = -entity.spdX;
    }

    if(entity.y < 0 || entity.y > canvasHeight){
        // console.log(message);
        entity.spdY = -entity.spdY;
    }
};

// the call for setinterval (update)
function update(){
    canvas.clearRect(0, 0, canvasWidth, canvasHeight)

    for (var i in enemyList) {
        
        updateEntity(enemyList[i])

        var isColliding = testCollisionEntity(player, enemyList[i]);
        if (isColliding) {
            console.log('Colliding!')
        }
    }

    updateEntity(player);

};



















 
