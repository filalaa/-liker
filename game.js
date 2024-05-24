const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let gif1 = new Image();
let gif2 = new Image();
gif1.src = 'game_start.gif'; // Replace with the actual path to your first GIF
gif2.src = 'game_click.gif'; // Replace with the actual path to your second GIF

let score = 0;
let bestScore = 0;
let lastClickTime = 0;
let currentGif = gif1;

function initialize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  lastClickTime = Date.now();
  loop();
}

function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(currentGif, (canvas.width - currentGif.width) / 2, (canvas.height - currentGif.height) / 2);

  if (Date.now() - lastClickTime > 3000) {
    bestScore = Math.max(bestScore, score);
    score = 0;
    currentGif = gif1;
  }

  context.fillStyle = 'black';
  context.font = '48px Arial';
  context.fillText(`Score: ${score}`, 10, 50);
  context.fillText(`Best Score: ${bestScore}`, 10, 100);
}

document.addEventListener('keydown', function (e) {
  handleUserAction();
});

canvas.addEventListener('touchstart', function (e) {
  handleUserAction();
});

function handleUserAction() {
  score++;
  lastClickTime = Date.now();
  currentGif = gif2;
}

window.addEventListener('resize', initialize);

initialize();
