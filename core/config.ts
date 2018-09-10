const config = {} as any;

config.backgroundCanvas = document.getElementById('background-canvas') as HTMLCanvasElement;
config.gameCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
config.mouseCanvas = document.getElementById('mouse-canvas') as HTMLCanvasElement;
config.gameCtx = config.gameCanvas.getContext('2d') as CanvasRenderingContext2D;
config.mouseCtx = config.mouseCanvas.getContext('2d') as CanvasRenderingContext2D;

config.canvasWidth = window.innerWidth;
config.canvasHeight = window.innerHeight;

config.fps = 40;
config.interval = 1000 / config.fps;

export default config;