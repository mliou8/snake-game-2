const food = {
  x: Math.floor((Math.random() * 28) + 1),
  y: Math.floor((Math.random() * 28) + 1),
  createFood: function() {
     this.foodLocation();
     ctx.fillStyle = 'red';
     ctx.fillRect(this.x * game.objSize + 1, this.y * game.objSize + 1, game.objSize - 2, game.objSize - 2);
  },
  foodLocation: function () {
    for (let i = 0; i > snake.length; i++) {
      var snakeX = snake.sections[i].x;
      var snakeY = snake.sections[i].y;        
      if (this.x === snakeX || this.y === snakeY || this.y === snakeY && this.x === snakeX) {
        this.x = Math.floor((Math.random() * 28) + 1);
        this.y = Math.floor((Math.random() * 28) + 1);
      }
    }
  }
}