var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsgroup, obsgroup, clouds, obst;
var obst1, obst2, obst3, obst4, obst5, obst6;
var gameover,restart;
var gameoverImg,restartImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  clouds = loadImage("cloud.png");
  obst1 = loadImage("obstacle1.png");
  obst2 = loadImage("obstacle2.png");
  obst3 = loadImage("obstacle3.png");
  obst4 = loadImage("obstacle4.png");
  obst5 = loadImage("obstacle5.png");
  obst6 = loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  restart = createSprite(300,100)
  restart.addImage(restartImg)
  restart.scale= 0.6;
    restart.visible = false;
  
   gameover = createSprite(300,60)
  gameover.addImage(gameoverImg)
    gameover.visible = false;
  
  cloudsgroup = new Group();
  obsgroup = new Group();
  

}

function draw() {
  background(255);
  
  if (gameState === PLAY){
    
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
    
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
 
    spawnclouds();
    spawnobs();
    
    if (trex.isTouching( obsgroup)){
      gameState= END;
    }
  }
  else if (gameState === END){
    ground.velocityX = 0;
     obsgroup.setVelocityXEach(0);
   cloudsgroup.setVelocityXEach(0);
    trex.velocityY = 0;
    trex.changeAnimation("collided",trex_collided);
      restart.visible = true;
    gameover.visible = true;
    
    if (mousePressedOver(restart)){
      gameState = PLAY;
      obsgroup.destroyEach();
      cloudsgroup.destroyEach();
      restart.visible = false;
    gameover.visible = false;
      
    trex.changeAnimation("running",trex_running);
    }
  }
  
  
  trex.collide(invisibleGround);
  

  
  drawSprites();
  
}

function spawnclouds(){
  
  if (frameCount % 60 === 0 ){
  var cloud = createSprite(650,random(30,130),20,20);
  cloud.velocityX = -5;
  cloud.shapeColor = "white";
    cloud.addImage("cloud",clouds);
     cloudsgroup.add(cloud);
    
  }
  
}

  function spawnobs(){
  
  if (frameCount % 50 === 0 ){
  var obs = createSprite(650,160,20,20);
  obs.velocityX = -5;
  obs.shapeColor = "green";
  var rand = Math.round (random ( 1,6));
    switch (rand) {
    
     case 1 : obs.addImage("obst",obst1); 
     break;
     case 2 : obs.addImage("obst",obst2);
     break;
     case 3 : obs.addImage("obst",obst3);
     break;
     case 4 : obs.addImage("obst",obst4);
     break;
     case 5 : obs.addImage("obst",obst5);
     break;
     case 6 : obs.addImage("obst",obst6);
     break;
    }
    
    obs.scale = 0.7
     obsgroup.add(obs);
  }
  
    
}
  
  






