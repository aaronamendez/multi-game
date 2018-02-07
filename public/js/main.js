var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = '30px Arial';



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

// Enemy
var enemy = {
	x: 150,
	spdX: 30,
	y: 25,
	spdY: 15,
	name: 'E',
};

setInterval(update, 50);

// update entity
function updateEntity(entity) {

        entity.x += entity.spdX;
        entity.y += entity.spdY;

        ctx.fillText(entity.name, entity.x, entity.y);

        console.log('hello', entity.x);
       
        if(entity.x < 0 || entity.x > canvasWidth){
                console.log(message);
                entity.spdX = -entity.spdX;
        }

        if(entity.y < 0 || entity.y > canvasHeight){
                console.log(message);
                entity.spdY = -entity.spdY;
        }
};


function update(){
        updateEntity(player);
        updateEntity(enemy);
};


















 
