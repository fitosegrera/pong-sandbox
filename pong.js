const margin = 30;
const raqSpeed = 10;
var bgr, bgg, bgb;
const maxScore = 3;
var finDeJuego = false;
var ganador = "";

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
var ballSpeedMax;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(24);

  //Background
  bgr = 0;
  bgg = 0;
  bgb = 0;

  //Pelota
  ballPosY = height / 2;
  ballPosX = width / 2;
  ballTam = 20;
  ballSpeedMax = 8;
  ballSpeedX = random(-ballSpeedMax, ballSpeedMax);
  ballSpeedY = random(-ballSpeedMax, ballSpeedMax);

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
  //Estado Jugando
  if (finDeJuego == false) {
    background(bgr, bgg, bgb);

    //Score
    textSize(24);
    text(scoreIzq, width / 2 - margin, margin);
    text(scoreDer, width / 2 + margin, margin);

    //Malla
    stroke(255);
    line(width / 2, 0, width / 2, height);

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

    //Limites Raqueta Izquierda
    if (raqIzqPosY <= raqIzqHeight / 2) {
      raqIzqPosY = raqIzqHeight / 2;
    }
    if (raqIzqPosY >= height - raqIzqHeight / 2) {
      raqIzqPosY = height - raqIzqHeight / 2;
    }

    //Limites Raqueta Derecha
    if (raqDerPosY <= raqDerHeight / 2) {
      raqDerPosY = raqDerHeight / 2;
    }
    if (raqDerPosY >= height - raqDerHeight / 2) {
      raqDerPosY = height - raqDerHeight / 2;
    }

    //Marca punto izquierda
    if (ballPosX < 0) {
      ballPosX = width / 2;
      ballPosY = height / 2;
      scoreDer++;

      bgr = random(255);
      bgg = random(255);
      bgb = random(255);

      ballSpeedMax = 8;
      ballSpeedX = random(-ballSpeedMax, ballSpeedMax);
      ballSpeedY = random(-ballSpeedMax, ballSpeedMax);
    }

    //Marca punto derecha
    if (ballPosX > width) {
      ballPosX = width / 2;
      ballPosY = height / 2;
      scoreIzq++;
      bgr = random(255);
      bgg = random(255);
      bgb = random(255);

      ballSpeedMax = 8;
      ballSpeedX = random(-ballSpeedMax, ballSpeedMax);
      ballSpeedY = random(-ballSpeedMax, ballSpeedMax);
    }

    //Fin de Juego
    if (scoreIzq >= maxScore) {
      finDeJuego = true;
      ganador = "Player 1";
    }

    if (scoreDer >= maxScore) {
      finDeJuego = true;
      ganador = "Player 2";
    }

    //Controles raquetas
    if (keyIsDown(UP_ARROW)) {
      raqIzqPosY -= raqSpeed;
    }

    if (keyIsDown(DOWN_ARROW)) {
      raqIzqPosY += raqSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
      raqDerPosY -= raqSpeed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      raqDerPosY += raqSpeed;
    }
  } else {
    background(0);
    fill(random(255), random(255), random(255));
    textSize(48);
    text(ganador + " WINS!", width / 2, height / 2);
    textSize(24);
    text("Presione una tecla para continuar.", width / 2, height / 2 + 100);
  }
}

function ball(posX, posY, tam) {
  fill(random(255), random(255), random(255));
  ellipse(posX, posY, tam, tam);
}

function createRaq(posX, posY, w, h) {
  fill(255);
  stroke(0);
  rect(posX, posY, w, h);
}

function keyPressed() {
  if (finDeJuego == true) {
    finDeJuego = false;
    scoreIzq = 0;
    scoreDer = 0;
  }
}
