import config from "./../core/config";
import { randomNumber } from "./../core/utilities";
import mouse from "./../core/mouse";

export const unitFactory = {
  create: (_type) => {
    const type = types[_type];
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
          this.state['vel' + axle] = null;
        }
        else {
          this.state[axle.toLowerCase()] += this.state['vel' + axle];
        }
      }

      draw() {
        this.move()
        const isInsideSelection = mouse.selection.x > 0 && this.isInsideMouseSelection();

        // old way
        //   config.gameCtx.fillStyle = isInsideSelection ? 'blue' :
        //   this.state.isSelected ? 'red' : type.color;
        // config.gameCtx.fillRect(this.state.x, this.state.y, size, size)

        if (this.state.isSelected) {
          // config.gameCtx.beginPath();
          // config.gameCtx.moveTo(this.state.x - 1, this.state.y - 1);
          // config.gameCtx.lineTo(this.state.x + size + 1, this.state.y - 1);
          // config.gameCtx.lineTo(this.state.x + size + 1, this.state.y + size + 1);
          // config.gameCtx.lineTo(this.state.x - 1, this.state.y + size + 1);
          // config.gameCtx.closePath();
          // config.gameCtx.fillStyle = 'white';
          // config.gameCtx.fill();
          config.gameCtx.fillStyle = 'white';
          config.gameCtx.fillRect(this.state.x - 3, this.state.y - 3, 1, 1);
        }

        config.gameCtx.fillStyle = isInsideSelection ? 'blue' : type.color;
        config.gameCtx.fillRect(this.state.x, this.state.y, size, size);

        // reset
        config.gameCtx.beginPath();
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

const types = {
  'tank': {
    color: '#43a8e4'
  },
  'healer': {
    color: '#43e46e'
  },
  'range': {
    color: '#e4d143'
  },
  'melee': {
    color: '#e24a4a'
  },
}