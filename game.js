const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let gif1, gif2;
let score = 0;
let bestScore = 0;
let lastClickTime = 0;
let currentGif = null;
let currentFrames = [];
let currentFrameIndex = 0;
let currentFrameDelay = 0;

function initialize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  lastClickTime = Date.now();
  loop();
}

function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (currentFrames.length > 0) {
    const frame = currentFrames[currentFrameIndex];
    context.putImageData(frame.imageData, 0, 0);

    currentFrameDelay--;
    if (currentFrameDelay <= 0) {
      currentFrameIndex = (currentFrameIndex + 1) % currentFrames.length;
      currentFrameDelay = currentFrames[currentFrameIndex].delay;
    }
  }

  if (Date.now() - lastClickTime > 3000) {
    bestScore = Math.max(bestScore, score);
    score = 0;
    loadGif(gif1);
  }

  context.fillStyle = 'black';
  context.font = '48px Arial';
  context.fillText(`Score: ${score}`, 10, 50);
  context.fillText(`Best Score: ${bestScore}`, 10, 100);
}

function handleUserAction() {
  score++;
  lastClickTime = Date.now();
  loadGif(gif2);
}

function loadGif(gif) {
  fetch(gif)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const gif = gifuct.parseGIF(buffer);
      const frames = gifuct.decompressFrames(gif, true);
      currentFrames = frames.map(frame => {
        const imageData = context.createImageData(frame.dims.width, frame.dims.height);
        imageData.data.set(frame.patch);
        return {
          imageData: imageData,
          delay: frame.delay
        };
      });
      currentFrameIndex = 0;
      currentFrameDelay = currentFrames[0].delay;
    });
}

document.addEventListener('keydown', function (e) {
  handleUserAction();
});

canvas.addEventListener('touchstart', function (e) {
  handleUserAction();
});

window.addEventListener('resize', initialize);

function onImageLoad() {
  initialize();
  loadGif(gif1);
}

gif1 = 'game_start.gif'; // Замените на реальный путь к вашему первому GIF
gif2 = 'game_click.gif'; // Замените на реальный путь к вашему второму GIF
onImageLoad();

