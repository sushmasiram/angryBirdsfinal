const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var lives = 3;
function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

    refresh = createImg("sprites/refresh.png");
    refresh.position(15, 10);
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)

        text("Lives  " + lives, width-450, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    refresh.mousePressed(reset);
      //instructions
     

        if(lives>0 && gameState==="launched"){
            fill(146,42,42);
            text("Press 'Space' for Next Bird", 480, 150);        
        }
        else if(score === 400){
            text("Game Over\nClick on 'Reload' to play again!",450,150);
            gameState = "end";
        }
        if(lives === 0){
            print("hi")
            fill(146,42,42);
            text("Click on 'Reload' to play again!",450, 150);
            gameState = "end";
        }

        //when the score reaches 400 then game ends
        
    

}


function reset(){
    location.reload();
    
}
function mouseDragged(){
    console.log("drag")
    if (gameState==="onSling"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}

function mouseClicked() {
    if(gameState === "onSling"){
        Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
    }
}

function mouseReleased(){
    if(gameState ==="onSling"){
    slingshot.fly();
    lives = lives - 1
    gameState = "launched";
    }
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched"){
       slingshot.attach(bird.body);
       gameState = "onSling"
       Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
       
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
