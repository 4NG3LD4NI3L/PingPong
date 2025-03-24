let paddle1, paddle2, ball;
let paddleHeight = 80, paddleWidth = 10;
let ballSize = 10;
let score1 = 0, score2 = 0;
let maxScore = 10;
let restartButton;

function setup() {
  createCanvas(600, 400);
  paddle1 = new Paddle(10);
  paddle2 = new Paddle(width - 20);
  ball = new Ball();
  
  restartButton = createButton('Reiniciar');
  restartButton.class('restart-button');
  restartButton.parent(document.body);
  restartButton.mousePressed(restartGame);
  restartButton.hide();
}

function draw() {
  background(0);
  
  paddle1.show();
  paddle2.show();
  paddle1.move();
  paddle2.move();
  
  ball.show();
  ball.move();
  ball.checkCollision(paddle1, paddle2);
  
  textSize(32);
  fill(255);
  text(score1, width / 4, 50);
  text(score2, (3 * width) / 4, 50);
  
  if (score1 >= maxScore || score2 >= maxScore) {
    textAlign(CENTER, CENTER);
    text(`Jugador ${score1 >= maxScore ? "1" : "2"} gana!`, width / 2, height / 2);
    noLoop();
    restartButton.show();
  }
}

function keyPressed() {
  if (key === 'W' || key === 'w') paddle1.dir = -5;
  if (key === 'S' || key === 's') paddle1.dir = 5;
  if (keyCode === UP_ARROW) paddle2.dir = -5;
  if (keyCode === DOWN_ARROW) paddle2.dir = 5;
}

function keyReleased() {
  if (key === 'W' || key === 'S' || key === 'w' || key === 's') paddle1.dir = 0;
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) paddle2.dir = 0;
}

function restartGame() {
  score1 = 0;
  score2 = 0;
  ball.reset();
  loop();
  restartButton.hide();
}

class Paddle {
  constructor(x) {
    this.x = x;
    this.y = height / 2 - paddleHeight / 2;
    this.dir = 0;
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, paddleWidth, paddleHeight);
  }
  
  move() {
    this.y += this.dir;
    this.y = constrain(this.y, 0, height - paddleHeight);
  }
}

class Ball {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-3, 3]);
    this.ySpeed = random([-2, 2]);
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, ballSize);
  }
  
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.y < 0 || this.y > height) this.ySpeed *= -1;
    
    if (this.x < 0) {
      score2++;
      this.reset();
    }
    if (this.x > width) {
      score1++;
      this.reset();
    }
  }
  
  checkCollision(paddle1, paddle2) {
    if (
      this.x - ballSize / 2 < paddle1.x + paddleWidth &&
      this.y > paddle1.y &&
      this.y < paddle1.y + paddleHeight
    ) {
      this.xSpeed *= -1.1;
    }
    
    if (
      this.x + ballSize / 2 > paddle2.x &&
      this.y > paddle2.y &&
      this.y < paddle2.y + paddleHeight
    ) {
      this.xSpeed *= -1.1;
    }
  }
}
