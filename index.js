const backgroundCanvas = document.getElementById('background-canvas');
const gameCanvas = document.getElementById('game-canvas');
const mouseCanvas = document.getElementById('mouse-canvas');
const gameCtx = gameCanvas.getContext('2d');
const mouseCtx = mouseCanvas.getContext('2d');

lastTime = (new Date()).getTime();
currentTime = 0;
delta = 0;
fps = 60;
interval = 1000 / fps;
canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;
drawCompleted = false;

backgroundCanvas.width = canvasWidth;
gameCanvas.width = canvasWidth;
mouseCanvas.width = canvasWidth;

backgroundCanvas.height = canvasHeight;
gameCanvas.height = canvasHeight;
mouseCanvas.height = canvasHeight;

const mouseSelection = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0
};
let mouseLeftClickIsDown = false;

const UnitFactory = (props) => {
  let size = 6;
  let x = randomNumber(0 + size * 3, canvasWidth - size * 3);
  let y = randomNumber(0 + size * 3, canvasHeight - size * 3);

  class Unit {
    constructor() {
      this.draw()
    }

    draw() {
      gameCtx.fillStyle = 'white';
      gameCtx.fillRect(x, y, size, size)
    }

    move() {
      x += 2;
      y += 2;
      this.draw()
    }
  }

  return new Unit();
}

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  currentTime = (new Date()).getTime();
  delta = (currentTime - lastTime);

  if (delta > interval) {
    gameCtx.clearRect(0, 0, canvasWidth, canvasHeight)
    //gameCtx.beginPath()

    // do stuff
    units.forEach(u => u.draw())

    mouseCtx.clearRect(0, 0, canvasWidth, canvasHeight)
    if (mouseLeftClickIsDown) {
      mouseCtx.fillStyle = 'yellow';
      mouseCtx.fillRect(mouseSelection.startX, mouseSelection.startY,
        mouseSelection.x - mouseSelection.startX, mouseSelection.y - mouseSelection.startY)
    }

    lastTime = currentTime;
  }

}

gameLoop()


const units = [];

for (let i = 0; i < 20; i++) {
  units[UnitFactory()];
}




function randomNumber(min, max) {
  min = min || 0;
  max = max || 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initMouseController(canvas) {

  canvas.onmousemove = (e) => {
    if (!mouseLeftClickIsDown) {
      return;
    }

    mouseSelection.x = e.clientX;
    mouseSelection.y = e.clientY;
  }

  canvas.onmousedown = (e) => {
    mouseLeftClickIsDown = true;
    mouseSelection.startX = e.clientX;
    mouseSelection.startY = e.clientY;
    mouseSelection.x = e.clientX;
    mouseSelection.y = e.clientY;
  }

  canvas.onmouseup = (e) => {
    mouseLeftClickIsDown = false;
  }
}

initMouseController(mouseCanvas)