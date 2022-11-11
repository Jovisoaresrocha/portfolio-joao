const canvas = document.querySelector("#gamefofinho");
const ctx = canvas.getContext("2d");
console.log(canvas);

// Isso faz o tamano do canvas (o gamefofinho) ficar do tamanho da tela quando o usuario entra no site
function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
}

const avatar = new Image();
avatar.src = "./img/avatar/avatar.png";
window.addEventListener("resize", onResize);

avatar.addEventListener("load", function () {
  console.log("oi");
  draw();
});

let playerX = 0;
let playerY = 0;
let playerVelX = 0;
let playerVelY = 0;
let playerReady = false;
let canJump = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = 0.2;
  const width = avatar.width * scale;
  const height = avatar.height * scale;
  const offset = 70 * scale;
  if (!playerReady) {
    playerReady = true;
    playerX = -40;
    playerY = 100;
  }
  const floorY = canvas.height - 60 - height + offset;
  if (playerY > floorY ) {
    playerVelY = 0;
    playerY = floorY;
    canJump = true;
  } else {
    canJump = false;
  }
  ctx.drawImage(avatar, playerX, playerY, width, height);
}

let keysdown = {};
let targetX = -50;

const playerSpeed = 2;
function animate() {
  const distance = Math.abs(targetX - playerX);
  if (distance < 10) {
    targetX = playerX;
  }
  if (keysdown.ARROWRIGHT || keysdown["D"] || playerX < targetX) {
    playerVelX += playerSpeed;
  }
  if (keysdown.ARROWLEFT || keysdown["A"] || playerX > targetX) {
    playerVelX -= playerSpeed;
  }
  if ((keysdown.ARROWUP || keysdown["W"] || keysdown[" "]) && canJump) {
    playerVelY = -20;
  }

  playerX += playerVelX;
  playerVelX *= 0.8;

  playerY += playerVelY;
  playerVelY += 1;

  draw();
  requestAnimationFrame(animate);
}

document.addEventListener("keydown", function (e) {
  keysdown[e.key.toUpperCase()] = true;
});

document.addEventListener("keyup", function (e) {
  delete keysdown[e.key.toUpperCase()];
});

// document.addEventListener("mousemove", function (e) {
//   console.log(e.clientX);
//   targetX = e.clientX - 60;
// });

onResize();
animate();
