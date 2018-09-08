import mouse from "./mouse-service";

export const backgroundCanvas = document.getElementById('background-canvas') as HTMLCanvasElement;
export const gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
export const mouseCanvas = document.getElementById('mouse-canvas') as HTMLCanvasElement;
export const gameCtx = gameCanvas.getContext('2d');
export const mouseCtx = mouseCanvas.getContext('2d');

export const canvasWidth = window.innerWidth;
export const canvasHeight = window.innerHeight;

// set widths of canvases
backgroundCanvas.width = canvasWidth; gameCanvas.width = canvasWidth;
mouseCanvas.width = canvasWidth;

// set height of canvases
backgroundCanvas.height = canvasHeight;
gameCanvas.height = canvasHeight;
mouseCanvas.height = canvasHeight;

let lastTime = (new Date()).getTime();
let currentTime = 0;
let delta = 0;
const fps = 30;
const interval = 1000 / fps;

const units = [];
let animations = [];

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  currentTime = (new Date()).getTime();
  delta = (currentTime - lastTime);

  if (delta > interval) {
    gameCtx.clearRect(0, 0, canvasWidth, canvasHeight)
    mouseCtx.clearRect(0, 0, canvasWidth, canvasHeight)

    gameDraw()

    lastTime = currentTime;
  }

}

function gameDraw() {
  units.forEach(u => u.draw())

  if (mouse.isPointerDown()) {
    mouseCtx.fillStyle = 'yellow';
    mouseCtx.fillRect(mouse.selection.startX, mouse.selection.startY,
      mouse.selection.x - mouse.selection.startX, mouse.selection.y - mouse.selection.startY)
  }

  animations
    .forEach(s => {
      mouseCtx.fillStyle = s.shape.color;
      mouseCtx.fillRect(s.shape.x, s.shape.y, s.shape.w, s.shape.h)
    })

  animations = animations.filter(s => s.stopAt > currentTime)
}

mouse.init(mouseCanvas, animations)

export const game = {
  start: gameLoop,
  addUnit: (unit) => units.push(unit)
}
