const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let gif1, gif2;
let score = 0;
let bestScore = 0;
let lastClickTime = 0;
let currentGif = null;
let currentGifInstance = null;

function initialize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  lastClickTime = Date.now();
  loop();
}

function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (currentGifInstance) {
    currentGifInstance.render();
  }

  if (Date.now() - lastClickTime > 3000) {
    bestScore = Math.max(bestScore, score);
    score = 0;
    switchGif(gif1);
  }

  context.fillStyle = 'black';
  context.font = '48px Arial';
  context.fillText(`Score: ${score}`, 10, 50);
  context.fillText(`Best Score: ${bestScore}`, 10, 100);
}

function handleUserAction() {
  score++;
  lastClickTime = Date.now();
  switchGif(gif2);
}

function switchGif(gif) {
  currentGif = gif;
  if (currentGifInstance) {
    currentGifInstance.stop();
  }
  gifler(gif).animateInCanvas(canvas);
  gifler(gif).get((a_gifInstance) => {
    currentGifInstance = a_gifInstance;
    a_gifInstance.animateInCanvas(canvas);
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
  switchGif(gif1);
}


gif1 = 'game_start.gif'; // Замените на реальный путь к вашему первому GIF
gif2 = 'game_click.gif'; // Замените на реальный путь к вашему второму GIF
gifler(gif1).get(onImageLoad);
gifler(gif2).get(() => {}); // Предзагрузка второго GIF

