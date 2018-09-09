import config from "./config";

export function setup() {
  // set widths of canvases
  config.backgroundCanvas.width = config.canvasWidth; config.gameCanvas.width = config.canvasWidth;
  config.mouseCanvas.width = config.canvasWidth;

  // set height of canvases
  config.backgroundCanvas.height = config.canvasHeight;
  config.gameCanvas.height = config.canvasHeight;
  config.mouseCanvas.height = config.canvasHeight;
}