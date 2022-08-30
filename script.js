// Lucas Cecin 26/09/2021

var canvas = window.document.getElementById("canvas")
var ctx = canvas.getContext('2d')

// global variables
let rightPressed = leftPressed = upPressed = spacePressed = false;
let gravity = 1.5;
let frame = 0;
var walls = [];

// canvas 600 x 600
// quadrado é 25 x 25
// 24 x 24 (tileSize = 25)

let tileSize = 25
let mapHeight = 24
let mapWidth = 24

// mapa lógico e de desenho
var map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

function drawMap() {
    for (row in map) {
        for (col in map[row]) {
            let x = col * tileSize
            let y = row * tileSize
            if (map[row][col] == 1) {
                ctx.fillRect(x, y, tileSize, tileSize)
            }
        }
    }
}

for(row in map){
    for(col in map[row]){
        let tile = map[row][col];
        //identificação e criação do objeto muro
        if(tile === 1){
            let wall = {
                x: col * tileSize,
                y: row * tileSize,
                width: tileSize,
                height: tileSize
            };
            //inserção no array
            walls.push(wall);
        }
    }
}

// event listeners & keyboard handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e){
    var key = e.key;
    switch(key){
        case " ":
            spacePressed = true;
            break;
        case "ArrowLeft":
            leftPressed = true;
            break;
        case "ArrowRight":
            rightPressed = true;
            break;
    }
}
function keyupHandler(e){
    var key = e.key;
    switch(key){
        case " ":
            spacePressed = false;
            player.canJumpAgain = true;
            break;
        case "ArrowLeft":
            leftPressed = false;
            break;
        case "ArrowRight":
            rightPressed = false;
            break;
    }
}

// player class
class Player {
    constructor (x, y, width, height, color) {
        this.x = x
        this.y = y
        this.dx = 0    //velocidadeX
        this.dy = 0    //velocidadeY
        this.width = width
        this.height = height
        this.color = color
        this.jumping = false
        this.canJumpAgain = true
        
    }
    
    update() {  
        // jump
        if (spacePressed && this.jumping == false && this.canJumpAgain == true) {
            this.dy -=35
            this.jumping = true
            this.canJumpAgain = false
            console.log(this.dy)
        } 
        if (rightPressed) {
            this.dx += 0.5
            console.log(this.dx)
        } 
        if (leftPressed) {
            this.dx -= 0.5
            console.log(this.dx)
        } 
        
        //limites laterais
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;
            
    }

    applyFriction() {
        this.dy += gravity      // aplica gravidade
        this.x += this.dx       // aplica velocidade na posição X
        this.y += this.dy       // aplica velocidade na posição Y
        this.dx *= 0.90          // aplica fricção [esquerda e direita]
        this.dy *= 0.90          // aplica fricção na gravidade
    }
    

    desenha(cor) {
        ctx.save()
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore()
        // e depois ctx.drawImage 
    }
}


// criando uma instância
var player = new Player(75, 75, 24.99, 24.99, "red")

function checkCollision(player, wall){
    return !(player.x > wall.x + wall.width    ||   
               player.x + player.width < wall.x  || 
               player.y > wall.y + wall.height   ||  
               player.y + player.height < wall.y);
}

function resolveCollisionY(player, wall) {
    var distY = (player.y + player.height/2) - (wall.y + wall.height/2);
    var sumHeight = (player.height + wall.height)/2;
    var overlapY = sumHeight - Math.abs(distY) + 0.00001;

    if (player.dy > 0) {
        player.y -= overlapY

        player.jumping = false
        player.canJumpAgain = true //FIXME
    }
    else if (player.dy < 0) {
        player.y += overlapY        
    }

    player.dy = 0
    console.log(player.dy)
}

function resolveCollisionX(player, wall) {
    var distX = (player.x + player.width/2) - (wall.x + wall.width/2);
    var sumWidth = (player.width + wall.width)/2;
    var overlapX = sumWidth - Math.abs(distX) + 0.00001;
    
    if (player.dx > 0) {
        player.x -= overlapX
    }
    else if (player.dx < 0) {
        player.x += overlapX
    }

    player.dx = 0
}


// game loop
function loop(){
    ctx.clearRect(0,0,600,600)      
    drawMap()

    player.update()

    var cor = "blue"

    //player.applyFriction()
    player.x += player.dx       // aplica velocidade na posição X
    player.dx *= 0.90          // aplica fricção [esquerda e direita]

    for (i in walls) {
        wall = walls[i]
        if (checkCollision(player, wall)) {
            resolveCollisionX(player, wall);
            //cor = "red"
        }
    }

    player.dy += gravity      // aplica gravidade
    player.y += player.dy       // aplica velocidade na posição Y
    player.dy *= 0.90          // aplica fricção na gravidade

    for (i in walls) {
        wall = walls[i]
        if (checkCollision(player, wall)) {
            resolveCollisionY(player, wall);
        }
        
        //if (checkCollision(player, wall)) {
        //    cor = "red"
        //}
    }

    player.desenha(cor)

    window.requestAnimationFrame(loop)
}
loop()






// ASSETS

/*função que verifica as colisões e ajusta a posição do personagem bloqueando-o 

function blockRectangle(objA,objB){
    var distX = (objA.x + objA.width/2) - (objB.x + objB.width/2);
    var distY = (objA.y + objA.height/2) - (objB.y + objB.height/2);
        
    var sumWidth = (objA.width + objB.width)/2;
    var sumHeight = (objA.height + objB.height)/2;
        
    if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
        var overlapX = sumWidth - Math.abs(distX);
        var overlapY = sumHeight - Math.abs(distY);
            
        if(overlapX > overlapY){
            objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
            console.log("Rolou OVERLAP X > Y")
        } else {
            objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
            console.log("NÃO Rolou OVERLAP X > Y")
        }
    }
}


function collision(first, second){
    return !(first.x > second.x + second.width ||   // first está à direita de second, sem colisão = TRUE
             first.x + first.width < second.x  ||   // first está à esquerda de second, sem colisão = TRUE
             first.y > second.y + second.height||  // first está abaixo de second, sem colisão = TRUE
             first.y + first.height < second.y)    // first está acima de second, sem colisão = TRUE
                                                    // assim, o ! fará retornar FALSO quando não houver colisão!
}

// COLISÃO

function colide(){
    if(posX + SIZE > blockX &&  // colisão pela esquerda
       posX < blockX + SIZE &&  // colisão pela direita
       posY + SIZE > blockY &&  // colisão por cima
       posY < blockY + SIZE){   // colisão por baixo 
            objColor = "#f00"; // vermelho
    } else {
            objColor = "#00f" // azul
    }
}


*/