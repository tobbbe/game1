import config from "./../core/config";
import { randomNumber } from "./../core/utils";
import mouse from "./../core/mouse";

export const unitFactory = {
  create: () => {
    let size = 6;
    let x = randomNumber(0 + size * 3, config.canvasWidth - size * 3);
    let y = randomNumber(0 + size * 3, config.canvasHeight - size * 3);
    let isSelected = false;
    let futureX = null;
    let futureY = null;
    const speed = 3;

    function calcSpeed(futurePos, currPos) {
      let remainingDistance = futurePos - currPos;
      remainingDistance = remainingDistance < 0 ? -remainingDistance : remainingDistance;
      return remainingDistance < speed ? remainingDistance : speed;
    }

    class Unit {

      draw() {
        this.move()
        const isInsideSelection = this.isInsideMouseSelection();
        config.gameCtx.fillStyle = isInsideSelection ? 'blue' :
          isSelected ? 'red' : 'white';
        config.gameCtx.fillRect(x, y, size, size)
      }

      move() {
        if (!futureX && !futureY) return;

        if (futureX) {
          x += futureX > x ? calcSpeed(futureX, x) : -calcSpeed(futureX, x);
        }
        else {
          futureX = null;
        }

        if (futureY) {
          y += futureY > y ? calcSpeed(futureY, y) : -calcSpeed(futureY, y);
        }
        else {
          futureY = null;
        }
      }

      setFuturePosition(x, y) {
        futureX = x - (size / 2);
        futureY = y - size / 2;
      }

      isInsideMouseSelection() {
        return x > mouse.selection.startX && x < mouse.selection.x && y > mouse.selection.startY && y < mouse.selection.y;
      }

      isInsideMouseClick() {
        return x - size <= mouse.selection.startX
          && x + (size * 2) >= mouse.selection.x
          && y - size <= mouse.selection.startY
          && y + (2 * size) >= mouse.selection.y;
      }

      selected(val) {
        isSelected = val;
      }

      getSize() {
        return size;
      }
    }

    return new Unit();
  }
}