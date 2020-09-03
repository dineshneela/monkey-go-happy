var ground, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacleimg,monkey,monkey_running;
var score;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var obstacle2img;
var scene,jungle;
var obstacle2group;

function preload(){
  jungle=loadAnimation("jungle.jpg");
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 
 obstacle2img = loadImage("stone.png");
  obstacleimg = loadImage("stone.png");

  
  cloudImage = loadImage("banana.png");
  
 
  
  
}

function setup() {
  createCanvas(600, 200);
  
  scene = createSprite(0,0,300,100);
  scene.addAnimation("s1",jungle);
  scene.scale=1;
  scene.velocityX = -4;
  scene.x = scene.width/5;
  
  
  
  /*scene = createSprite(100,100,0,0);
  scene.addImage("s1",jungle)
  scene.x = scene.width/2;  
  scene.velocityX = -4;*/
  
  
  
  monkey=createSprite(60,160,10,10);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.1;
 
  ground = createSprite(200,180,400,20);
  
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.visible=false;
   
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  obstacle2group=new Group();
  
  score = 0;
  
}

function draw() {
  background(180);
  
  
  text("Score: "+ score, 500,50);
 
  
  if(gamestate===PLAY){
    if(cloudsGroup.isTouching(monkey)){
       score = score +1
      cloudsGroup.destroyEach();
       }
     
     ground.velocityX=-(6+4*score/200)
  if(keyDown("space")&&monkey.y>100) {
    monkey.velocityY = -10;
  }
   monkey.velocityY = monkey.velocityY + 0.8
     if (ground.x < 0){
    ground.x = ground.width/2;
      switch(score) {
      case 10: monkey.scale=0.10;
              break;
      case 20:  monkey.scale=0.12;
              break;
      case 30:  monkey.scale=0.14;
              break;
      case 40:  monkey.scale=0.16;
              break;
      default:break;
  }
  }
    
    if(obstaclesGroup.isTouching(monkey)){
       monkey.scale=0.05; 
       }
     if(obstacle2group.isTouching(monkey)){
       monkey.scale=0.05;
       obstacle2group.destroyEach();  
       obstacle2group.setLifetimeEach(0);
       }
            
     if(obstaclesGroup.isTouching(monkey)){
       gamestate=END;
     }
      spawnClouds();
      spawnObstacles();
     }
  if(gamestate===END){
    
     ground.velocityX=0;
    monkey.velocityY=0
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
obstacle2group.setLifetimeEach(0);
   obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1);
    scene.velocityX=0;
    
    }
     
   if (scene.x<98) {
      scene.x=scene.width/5;
    }
    
  
  
  monkey.collide(ground);

  
  drawSprites();
}


function reset(){
gamestate=PLAY;
  /*gameover.visible=false
  trex.changeAnimation("running",trex_running);
  score=0*/
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.velocityX = -4;
   obstacle.addImage("o1",obstacleimg);
     

              
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
  } 
  if(frameCount % 100 === 0) {
    //generate random obstacles
    var obstacle2 = createSprite(600,165,10,40);
     obstacle2.velocityX=-4
      obstacle2.addImage("o2",obstacle2img);
    //assign scale and lifetime to the obstacle 
    obstacle2.scale = 0.1;
    obstacle2.lifetime = 300;
     obstacle2group.add(obstacle2);
  }
  
    
}