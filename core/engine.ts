import mouse from "./mouse";
import keyboard from "./keyboard";
import { setup } from "./setup";
import config from "./config";

let lastTime = (new Date()).getTime();
let currentTime = 0;
let delta = 0;

export const units = [];
export const selectedUnits = [];

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
}



export const game = {
  start: () => {
    setup()
    mouse.init(config.mouseCanvas)
    keyboard.init()
    gameLoop()
  },
  addUnit: (unit) => units.push(unit)
}
