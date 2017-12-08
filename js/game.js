const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//main game logic
const game = {
  fps: 8,
  over: false,
  objSize: 10,
  score: 0,
  w: 280,
  h: 300,
  paint: function () {
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, this.w, this.h);
  },
  render: function () {    
    this.paint();
    food.createFood();
    this.moveSnake();
  },
  renderScore: function () {
    const scoreBox = document.getElementById("score");
    scoreBox.innerHTML = "Score: " + this.score;
  },
  checkFood: function () {
    if (snake.sections[0].x == food.x && snake.sections[0].y == food.y) {
      snake.feedSnake()
      food.x = Math.floor((Math.random() * 28) + 1);
      food.y = Math.floor((Math.random() * 28) + 1);
      food.createFood();
    }
  },
  moveSnake: function () {
    var snakeX = snake.sections[0].x;
    var snakeY = snake.sections[0].y;
    switch (snake.direction) {
      case 'right':
        snakeX++;
        break;
      case 'left':
        snakeX--;
        break;
      case 'up':
        snakeY--;
        break;
      case 'down':
        snakeY++;
        break;
    }
    let tail = snake.sections.pop();
    tail.x = snakeX;
    tail.y = snakeY;
    snake.sections.unshift(tail);
    for (let i = 0; i < snake.length; i++) {
       snake.snakeConstructor(snake.sections[i].x, snake.sections[i].y);
    }
    snake.checkCollisions();
    this.checkFood();
  },
  gameOver: function () {
    game.over = true;
    ctx.textAlign="center"; 
    ctx.fillStyle = 'black';
    ctx.font="15px Calibri"; 
    ctx.fillText("Game Over: Refresh to play again", 140, 140); 
  },
  loop: function () {
    if (!game.over) {
      game.render();
    }
    setTimeout(function() {
      requestAnimationFrame(game.loop);
    }, 1000 / game.fps);
  },
  start: function () {
    game.over = false;
    this.paint();
    food.createFood();
    snake.renderSnake();
    requestAnimationFrame(game.loop);
  }
}
      
addEventListener("keydown", function(canMove) {
  return function (e) {
    //Preventing two keys from being pressed rapidly, causing almost overlap
    if (!canMove) return false;
    canMove = false;
    setTimeout(function() { canMove = true; }, 60);
    const keyPressed = e.keyCode;
    switch (keyPressed) {
      case 37:
        if (snake.direction !== 'right') snake.direction = 'left';
        break;
      case 38:
        if (snake.direction !== 'down') snake.direction = 'up';
        break;
      case 39:
        if (snake.direction !== 'left') snake.direction = 'right';
        break;
      case 40:
        if (snake.direction !== 'up') snake.direction = 'down';
        break;  
    } 
  }}(true), false);

game.start();
