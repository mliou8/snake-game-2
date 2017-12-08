const snake = {
  length: 5,
  direction: 'right',
  sections: [],
  snakeConstructor: function (x, y) {
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'darkgreen';
    ctx.fillRect(x * game.objSize, y * game.objSize, game.objSize, game.objSize);
    ctx.strokeRect(x * game.objSize, y * game.objSize, game.objSize, game.objSize);
  },
  renderSnake: function() {
    for (let i = this.length; i >= 0; i--) {
      this.sections.push({x:i, y:5});
    }  
  },
  feedSnake: function () {
    this.length++;
    game.score++;
    game.renderScore();
    const newSegment = {
      x: this.sections[0].x,
      y: this.sections[0].y
    }
    this.sections.unshift(newSegment);
    for (let i = 0; i < this.length; i++) {
        this.snakeConstructor(snake.sections[i].x, snake.sections[i].y);
    }
  },
  checkCollisions: function () {
    snakeX = this.sections[0].x
    snakeY = this.sections[0].y
    for (let i = 1; i < this.length; i++) {
        if (this.sections[i].x === snakeX && this.sections[i].y === snakeY) game.gameOver();
    }
    if (snakeX > 27 || snakeX < 1 || snakeY < 1 || snakeY > 27) {
      game.gameOver();
    }
  }
}