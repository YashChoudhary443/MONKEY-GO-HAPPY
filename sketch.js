var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,monkey_running,monkey_collided;
var invisibleGround, bg;

var bananasGroup,banana;
var obstaclesGroup, obstacle1,obstacle2;

var score=0;

var over, restart;

function preload(){
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey_collided = loadImage("monkey.png");
  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("stone-1.png");
  bg = loadImage("jungle.png");
  bananas = loadImage("banana.png");
  restart =loadImage("restart.png");
  over = loadImage("over.png");
}
function setup() {
  createCanvas(400, 400);
  
  back = createSprite(20,200,400,20);
  back.addImage("ground",bg);
  back.scale = 1;
  back.velocityX = -4;
  
  monkey = createSprite(40,340);
  monkey.addAnimation("mrunning",monkey_running);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200,420,500,80);
  invisibleGround.visible = false;  

  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
  again = createSprite(260,250);
  again.addImage("r",restart);
  again.scale = 0.3;
  again.visible = false;
  
  gameover = createSprite(260,150);
  gameover.addImage("o",over);
  gameover.scale = 0.4;
  gameover.visible = false;
}

function draw() {
  background(220);
  
  monkey.collide(invisibleGround);
  
  if(gameState===PLAY){
    if (keyWentDown("space") && monkey.y >=309)
      { 
        monkey.velocityY = -14;
      }  
      monkey.velocityY = monkey.velocityY + 0.8;
   if(back.x<20){
    back.x = 200;
  } 
    spawnObstacle();
    spawnbanana();
    if(bananasGroup.isTouching(monkey)){
      score = score+1;
      bananasGroup.destroyEach();
    }
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
      back.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0); 
      bananasGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      bananasGroup.setLifetimeEach(-1);
      
    }
    again.visible = false;
    gameover.visible = false;
  }else if(gameState===END){
    again.visible = true;
    gameover.visible = true;
    
  }
  if(mousePressedOver(again)){
    reset();
  }
  
  drawSprites();
  fill("green");
  textSize(25);
  textFont("Georgia");
  text("Score:",250,25);
  text(score,320,25); 
}

function spawnbanana(){
  if (frameCount % 60 === 0){
  var banana = createSprite(400);
  banana.velocityX = -5;
  banana.scale = 0.05;
   banana.y = Math.round(random(250,280));
   banana.lifetime = 70;
  banana.addAnimation("bananas",bananas);
   banana.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
  bananasGroup.add(banana);  
  }
}
function spawnObstacle() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(440,350,10,40);
    obstacle.velocityX = -5;
   obstacle.setCollider("rectangle",0,0,25,obstacle.height);
    // obstacle.debug = true;
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
again.visible = false;
gameover.visible = false;
    obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  score = 0;
  if(back.x <20)
   {
     back.x = back.width/2;
   }
   back.velocityX = -3;

}