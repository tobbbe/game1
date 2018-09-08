const selection = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0
};

let leftClickIsDown = false;

function init(canvas, animations) {

  canvas.oncontextmenu = (e) => {
    e.preventDefault()
    if (!leftClickIsDown) return;

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
    leftClickIsDown = true;
    selection.startX = e.clientX;
    selection.startY = e.clientY;
    selection.x = e.clientX;
    selection.y = e.clientY;
  }

  canvas.onpointerup = (e) => {
    canvas.releasePointerCapture(e.pointerId);
    leftClickIsDown = false;
  }

}



export default {
  selection,
  isPointerDown: () => leftClickIsDown,
  init
}