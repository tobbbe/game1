import { canvasHeight, canvasWidth, gameCtx } from "./../core/engine";
import { randomNumber } from "./../core/utils";

export const unitFactory = {
  create: () => {
    let size = 6;
    let x = randomNumber(0 + size * 3, canvasWidth - size * 3);
    let y = randomNumber(0 + size * 3, canvasHeight - size * 3);

    class Unit {
      draw() {
        gameCtx.fillStyle = 'white';
        gameCtx.fillRect(x, y, size, size)
      }

      move() {
        x += 2;
        y += 2;
      }
    }

    return new Unit();
  }
}