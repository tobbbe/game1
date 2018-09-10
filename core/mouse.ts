import { units, selectedUnits } from "./engine";
import config from "./config";
import Selection from "./models/selection";

const selection = new Selection(); //{ x: 0, y: 0, startX: 0, startY: 0, box: {} as any };
let leftClickIsDown = false;

function init(canvas) {

  canvas.oncontextmenu = (e) => {
    e.preventDefault()

    // TODO: move this to eventemitter
    const distanceBetweenUnits = 3;
    let unitRowSize = selectedUnits.reduce((pre, x) => pre + x.getSize() + distanceBetweenUnits, 0);
    let dist = unitRowSize / selectedUnits.length;
    let nextXPos = e.clientX - (unitRowSize / 2);

    selectedUnits.forEach(unit => {
      nextXPos += dist;
      unit.setFuturePosition(Math.floor(nextXPos), e.clientY)
    })
  };

  canvas.onpointerdown = (e) => {
    canvas.setPointerCapture(e.pointerId);

    if (e.button === 2) return;
    // TODO: do this with eventemitter instead
    if (!e.ctrlKey) {
      selectedUnits.length = 0; // TODO: potential memory leak?
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
      if ((wasClick && unit.isInsideMouseClick()) || (!wasClick && unit.isInsideMouseSelection())) {
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

