import { units, selectedUnits } from "./engine";
import config from "./config";

class Selection {

  private _startX = 0
  private _startY = 0
  private _x = 0
  private _y = 0

  set startX(val) {
    this._startX = val;
  }
  get startX() {
    return Math.min(this._startX, this._x);
  }

  set startY(val) {
    this._startY = val;
  }
  get startY() {
    return Math.min(this._startY, this._y);
  }

  set x(val) {
    this._x = val;
  }
  get x() {
    return Math.max(this._startX, this._x);
  }

  set y(val) {
    this._y = val;
  }
  get y() {
    return Math.max(this._startY, this._y);
  }

  set(pos) {
    this.startX = pos.startX;
    this.x = pos.x || pos.startX;
    this.startY = pos.startY;
    this.y = pos.y || pos.startY;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.startX = 0;
    this.startY = 0;
  }
}

const selection = new Selection(); //{ x: 0, y: 0, startX: 0, startY: 0, box: {} as any };
let leftClickIsDown = false;

function init(canvas, animations) {

  canvas.oncontextmenu = (e) => {
    e.preventDefault()

    // TODO: move this to eventemitter
    const distanceBetweenUnits = 2;
    let unitRowSize = selectedUnits.reduce((pre, x) => pre + x.getSize() + distanceBetweenUnits, 0);
    let dist = unitRowSize / selectedUnits.length;
    let nextXPos = e.clientX - (unitRowSize / 2);

    selectedUnits.forEach(unit => {
      nextXPos += dist;
      unit.setFuturePosition(Math.floor(nextXPos), e.clientY)
    })

    animations.push({
      stopAt: new Date().getTime() + 200,
      shape: { x: e.clientX - 5, y: e.clientY - 5, w: 10, h: 10, color: 'red' }
    })
  };

  canvas.onpointerdown = (e) => {
    canvas.setPointerCapture(e.pointerId);

    if (e.button === 2) return;
    // TODO: do this with eventemitter instead
    if (!e.ctrlKey) {
      selectedUnits.length = 0;
      units.forEach(unit => unit.selected(false))
    }

    leftClickIsDown = true;
    selection.set({ startX: e.clientX, startY: e.clientY })
  }

  canvas.onpointermove = (e) => {
    if (!leftClickIsDown) return;

    selection.x = e.clientX;
    selection.y = e.clientY;
  }

  canvas.onpointerup = (e) => {
    canvas.releasePointerCapture(e.pointerId);

    // TODO: do this with eventemitter instead
    const wasClick = Math.floor(selection.x) === Math.floor(selection.startX) && Math.floor(selection.y) === Math.floor(selection.startY);
    units.forEach(unit => {
      if ((wasClick && unit.isInsideMouseClick()) || unit.isInsideMouseSelection()) {
        unit.selected(true)
        selectedUnits.push(unit)
      }
    })

    selection.reset()
    leftClickIsDown = false;
  }

}

function drawSelection() {
  if (leftClickIsDown) {
    config.mouseCtx.fillStyle = 'yellow';
    config.mouseCtx.fillRect(selection.startX, selection.startY,
      selection.x - selection.startX, selection.y - selection.startY)
  }
}

export default {
  selection: selection,
  init,
  drawSelection
}

