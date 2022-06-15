const margin = 30;
const raqSpeed = 10;

//Score
let scoreDer = 0;
let scoreIzq = 0;

//Raqueta Izquierda
var raqIzqPosY;
var raqIzqWidth;
var raqIzqHeight;

//Raqueta Derecha
var raqDerPosY;
var raqDerWidth;
var raqDerHeight;

//Pelota
var ballPosY;
var ballPosX;
var ballSpeedX;
var ballSpeedY;
var ballTam;

function setup() {
  createCanvas(700, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(24);
  noStroke();

  //Pelota
  ballPosY = height / 2;
  ballPosX = width / 2;
  ballTam = 20;
  ballSpeedX = random(-1, 7);
  ballSpeedY = random(-1, 7);

  //Raqueta Izquierda
  raqIzqPosY = height / 2;
  raqIzqWidth = 20;
  raqIzqHeight = raqIzqWidth * 4;

  //Raqueta Derecha
  raqDerPosY = height / 2;
  raqDerWidth = 20;
  raqDerHeight = raqDerWidth * 4;
}

function draw() {
  background(0);
  
  //Score
  text(scoreIzq, width/2 - margin, margin);
  text(scoreDer, width/2 + margin, margin);

  //Malla
  stroke(255);
  line(width / 2, 0, width / 2, height);
  noStroke();

  //Pelota
  ball(ballPosX, ballPosY, ballTam, ballTam);

  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  //Raqueta Izquierda
  createRaq(margin, raqIzqPosY, raqIzqWidth, raqIzqHeight);

  //Raqueta Derecha
  createRaq(width - margin, raqDerPosY, raqDerWidth, raqDerHeight);

  //Colisión pelota ariiba y abajo
  if (ballPosY <= 0) {
    ballSpeedY *= -1;
  }

  if (ballPosY >= height) {
    ballSpeedY *= -1;
  }

  //Colisión pelota con raqueta Izquierda
  if (ballPosX <= margin) {
    if (ballPosY <= raqIzqPosY && ballPosY >= raqIzqPosY - raqIzqHeight / 2) {
      ballSpeedX *= -1;
    }
    if (ballPosY >= raqIzqPosY && ballPosY <= raqIzqPosY + raqIzqHeight / 2) {
      ballSpeedX *= -1;
    }
  }

  //Colisión pelota con raqueta Derecha
  if (ballPosX >= width - margin) {
    if (ballPosY <= raqDerPosY && ballPosY >= raqDerPosY - raqDerHeight / 2) {
      ballSpeedX *= -1;
    }
    if (ballPosY >= raqDerPosY && ballPosY <= raqDerPosY + raqDerHeight / 2) {
      ballSpeedX *= -1;
    }
  }
  
  //Marca punto izquierda
  if(ballPosX < 0){
    ballPosX = width / 2;
    ballPosY = height / 2;
  }
  
  //Marca punto derecha
  if(ballPosX > width){
    ballPosX = width / 2;
    ballPosY = height / 2;
  }
  
  
  //Controles raquetas
  if (keyIsDown(UP_ARROW)) {
    raqIzqPosY -= raqSpeed;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    raqIzqPosY += raqSpeed;
  }
  
  if(keyIsDown(LEFT_ARROW)){
    raqDerPosY -= raqSpeed;
  }
  
  if(keyIsDown(RIGHT_ARROW)){
    raqDerPosY += raqSpeed;
  }
}

function ball(posX, posY, tam) {
  fill(random(255), random(255), random(255));
  ellipse(posX, posY, tam, tam);
}

function createRaq(posX, posY, w, h) {
  fill(255);
  rect(posX, posY, w, h);
}


