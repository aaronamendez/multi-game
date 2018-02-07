// fetching canvas
var canvas = document.getElementById("canvas").getContext("2d");
// styling canvas
canvas.font = '30px Arial';

// playing field
var message = 'Out of Bounds!'
var canvasWidth = 500;
var canvasHeight = 500;

// player
var player = {
	x: 50,
	spdX: 30,
	y: 40,
	spdY: 5,
	name: 'P',
};

// enemy list
var enemyList = {};

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
}

// update interval
setInterval(update, 50);

// update entity
function updateEntity(entity) {

        entity.x += entity.spdX;
        entity.y += entity.spdY;

        canvas.fillText(entity.name, entity.x, entity.y);

        console.log('hello, world!', entity.x);
       
        if(entity.x < 0 || entity.x > canvasWidth){
                console.log(message);
                entity.spdX = -entity.spdX;
        }

        if(entity.y < 0 || entity.y > canvasHeight){
                console.log(message);
                entity.spdY = -entity.spdY;
        }
};

// the call for setinterval (update)
function update(){
        canvas.clearRect(0, 0, canvasWidth, canvasHeight)

        for (var i in enemyList) {
                updateEntity(enemyList[i])
        }

        updateEntity(player);

};



















 
