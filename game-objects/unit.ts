import config from "./../core/config";
import { randomNumber } from "./../core/utils";
import mouse from "./../core/mouse";

export const unitFactory = {
  create: () => {
    let size = 6;
    let isSelected = false;
    const speed = 3;



    class Unit {

      state = {
        futureX: null,
        futureY: null,
        velX: null,
        velY: null,
        x: randomNumber(0 + size * 3, config.canvasWidth - size * 3),
        y: randomNumber(0 + size * 3, config.canvasHeight - size * 3)
      }

      calcSpeed(axle) {
        let remainingDistance = this.state['future' + axle] - this.state[axle.toLowerCase()];
        remainingDistance = remainingDistance < 0 ? -remainingDistance : remainingDistance;
        if (remainingDistance < Math.abs(this.state['vel' + axle]) + 1) {
          this.state[axle.toLowerCase()] = this.state['future' + axle];
          this.state['future' + axle] = null;
        }
        else {
          this.state[axle.toLowerCase()] += this.state['vel' + axle];
        }
      }

      draw() {
        this.move()
        const isInsideSelection = this.isInsideMouseSelection();
        config.gameCtx.fillStyle = isInsideSelection ? 'blue' :
          isSelected ? 'red' : 'white';
        config.gameCtx.fillRect(this.state.x, this.state.y, size, size)
      }

      move() {
        if (!this.state.futureX && !this.state.futureY) return;

        if (this.state.futureX) {
          this.calcSpeed('X'); //this.state.futureX > x ? this.calcSpeed(this.state.futureX, x) : -this.calcSpeed(this.state.futureX, x);
        }
        else {
          this.state.futureX = null;
        }

        if (this.state.futureY) {
          this.calcSpeed('Y'); // this.state.futureY > y ? this.calcSpeed(this.state.futureY, y) : -this.calcSpeed(this.state.futureY, y);
        }
        else {
          this.state.futureY = null;
        }
      }

      setFuturePosition(newFutureX, newFutureY) {
        this.state.futureX = newFutureX - (size / 2);
        this.state.futureY = newFutureY - (size / 2);
        console.log(this.state)
        var tx = this.state.futureX - this.state.x,
          ty = this.state.futureY - this.state.y,
          dist = Math.sqrt(tx * tx + ty * ty);
        this.state.velX = (tx / dist) * speed;
        this.state.velY = (ty / dist) * speed;
      }

      isInsideMouseSelection() {
        return this.state.x > mouse.selection.startX && this.state.x < mouse.selection.x && this.state.y > mouse.selection.startY && this.state.y < mouse.selection.y;
      }

      isInsideMouseClick() {
        return this.state.x - size <= mouse.selection.startX
          && this.state.x + (size * 2) >= mouse.selection.x
          && this.state.y - size <= mouse.selection.startY
          && this.state.y + (2 * size) >= mouse.selection.y;
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