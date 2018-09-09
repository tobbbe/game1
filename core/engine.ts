import mouse from "./mouse";
import { setup } from "./setup";
import config from "./config";

let lastTime = (new Date()).getTime();
let currentTime = 0;
let delta = 0;

export const units = [];
export const selectedUnits = [];
let animations = [];

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  currentTime = (new Date()).getTime();
  delta = (currentTime - lastTime);

  if (delta > config.interval) {
    gameDraw()
    lastTime = currentTime;
  }
}

function gameDraw() {
  config.gameCtx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)
  config.mouseCtx.clearRect(0, 0, config.canvasWidth, config.canvasHeight)

  mouse.drawSelection()
  units.forEach(u => u.draw())

  animations
    .forEach(s => {
      config.mouseCtx.fillStyle = s.shape.color;
      config.mouseCtx.fillRect(s.shape.x, s.shape.y, s.shape.w, s.shape.h)
    })

  animations = animations.filter(s => s.stopAt > currentTime)
}

mouse.init(config.mouseCanvas, animations)

export const game = {
  start: () => {
    setup()
    gameLoop()
  },
  addUnit: (unit) => units.push(unit)
}
