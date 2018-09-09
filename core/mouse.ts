import { units, selectedUnits } from "./engine";
import config from "./config";

const selection = { x: 0, y: 0, startX: 0, startY: 0 };
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

  canvas.onpointermove = (e) => {
    if (!leftClickIsDown) return;

    selection.x = e.clientX;
    selection.y = e.clientY;
  }

  canvas.onpointerdown = (e) => {
    canvas.setPointerCapture(e.pointerId);

    if (e.button === 2) return;
    // TODO: do this with eventemitter instead
    if (!e.ctrlKey) {
      selectedUnits.length = 0;
      units.forEach(unit => unit.selected(false))
    }

    leftClickIsDown = true;
    selection.startX = e.clientX;
    selection.startY = e.clientY;
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

    selection.x = 0;
    selection.y = 0;
    selection.startX = 0;
    selection.startY = 0;
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
  selection,
  init,
  drawSelection
}