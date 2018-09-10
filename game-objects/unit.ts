import config from "./../core/config";
import { randomNumber } from "./../core/utilities";
import mouse from "./../core/mouse";

export const unitFactory = {
  create: () => {
    let size = 6;
    const speed = 4;

    class Unit {

      state = {
        isSelected: false,
        futureX: null,
        futureY: null,
        velX: null,
        velY: null,
        x: randomNumber(0 + size * 3, config.canvasWidth - size * 3),
        y: randomNumber(0 + size * 3, config.canvasHeight - size * 3)
      }

      calcNewPos(axle) {
        if (!this.state['future' + axle]) return;

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
        const isInsideSelection = mouse.selection.x > 0 && this.isInsideMouseSelection();
        config.gameCtx.fillStyle = isInsideSelection ? 'blue' :
          this.state.isSelected ? 'red' : 'white';
        config.gameCtx.fillRect(this.state.x, this.state.y, size, size)
      }

      move() {
        this.calcNewPos('X')
        this.calcNewPos('Y')
      }

      setFuturePosition(newFutureX, newFutureY) {
        this.state.futureX = newFutureX - (size);
        this.state.futureY = newFutureY - (size / 2);
        var tx = this.state.futureX - this.state.x,
          ty = this.state.futureY - this.state.y,
          dist = Math.sqrt(tx * tx + ty * ty);
        this.state.velX = (tx / dist) * speed;
        this.state.velY = (ty / dist) * speed;
      }

      isInsideMouseSelection() {
        if (
          this.state.x > mouse.selection.startX
          && this.state.x < mouse.selection.x
          && this.state.y > mouse.selection.startY
          && this.state.y < mouse.selection.y
        )
          return true;
      }

      isInsideMouseClick() {
        return this.state.x <= mouse.selection.startX
          && this.state.x + size >= mouse.selection.x
          && this.state.y <= mouse.selection.startY
          && this.state.y + size >= mouse.selection.y;
      }

      selected(val) {
        this.state.isSelected = val;
      }

      getSize() {
        return size;
      }
    }

    return new Unit();
  }
}