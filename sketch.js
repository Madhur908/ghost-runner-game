let tower,towerimage
let door,doorimage,doorgroup,climbergroup
let climberimage
let ghost,ghostimage
let invisibleblockgroup,invisibleblock
let score;
let PLAY=1
let END=0;
let gameState=PLAY;
function preload() {
 towerimage=loadImage("tower.png") 
 doorimage=loadImage("door.png")  
 climberimage=loadImage("climber.png")
 ghostimage=loadImage("ghost-standing.png")
 
}
function setup(){
createCanvas(600,600)

tower=createSprite(300,300)
tower.addImage("towerimages",towerimage)
tower.velocityY=3
ghost=createSprite(300,300,50,50)
ghost.addImage("ghostimages",ghostimage)
ghost.scale=0.2
score=0;
doorgroup=new Group()
climbergroup=new Group()
invisibleblockgroup=new Group()

}
function draw(){
background(0)
if(gameState===PLAY){
    if(tower.y>600){
        tower.y=300
    }
    if(keyDown("left_arrow")){
        ghost.x=ghost.x-3
        }
        
        if(keyDown("right_arrow")){
        ghost.x=ghost.x+3
        }
        
        if(keyDown("space")){
        ghost.velocityY=-5
        }
        
        ghost.velocityY=ghost.velocityY +0.8;
        
        if(climbergroup.isTouching(ghost)){
        ghost.velocityY=0;   
        
        }
        
        if(invisibleblockgroup.isTouching(ghost)){
        ghost.destroy()
        gameState=END; 
        }
        spawndoor();
        drawSprites()
        score=Math.round(frameCount/15)

textSize(17 )
stroke("yellow")
text("score:"+score,500,20)
}
else if(gameState===END){
stroke("yellow")
fill("yellow")
textSize(30)
text("Game Over",230,250)
text("score:"+score,230,280)

}






}

function spawndoor(){
if(frameCount%240===0){
door=createSprite(200,-50)
door.addImage(doorimage)
var climber=createSprite(200,10)
climber.addImage(climberimage)
invisibleblock=createSprite(200,15)
invisibleblock.visible=false;
invisibleblock.width=climber.width
invisibleblock.height=climber.height
door.x=Math.round(random(120,400))
climber.x=door.x
invisibleblock.x=climber.x
door.velocityY=(6+3*score/20)
climber.velocityY=door.velocityY
invisibleblock.velocityY=climber.velocityY
ghost.depth=door.depth;
ghost.depth+=1;
door.lifetime=600;
climber.lifetime=600;
doorgroup.add(door)
climbergroup.add(climber)
invisibleblockgroup.add(invisibleblock)
}
}
