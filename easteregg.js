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
  console.log("oi, veio procurar o easteregg né? 😳");
  draw();
});

let playerX = 0;
let playerY = 0;
let playerVelX = 0;
let playerVelY = 0;
let playerReady = false;
let canJump = false;
let flip = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = 0.2;
  const width = avatar.width * scale;
  const height = avatar.height * scale;
  const offset = 70 * scale;
  if (!playerReady) {
    playerReady = true;
    playerX = -60;
    playerY = 100;
  }

  const floorY = canvas.height - 60 - height + offset;
  if (playerY > floorY) {
    // playerVelY = 0;
    playerY = floorY;
    canJump = true;
    playerVelY *= -0.1;
  } else {
    canJump = false;
  }

  const WallL = canvas.width -40;
  if (playerX > WallL) {
    playerX = WallL;
  }
  const WallR = -60;
  {
    if (playerX < WallR) playerX = WallR;
  }

  ctx.save();
  ctx.translate(playerX, playerY);
  if (flip) {
    ctx.scale(-1, 1);
    ctx.translate(-width, 0);
  }

  ctx.drawImage(avatar, 0, 0, width, height);
  ctx.restore();
}

let keysdown = {};

const playerSpeed = 2;
function animate() {
  if (keysdown.ARROWRIGHT || keysdown["D"]) {
    playerVelX += playerSpeed;
    flip = false;
  }
  if (keysdown.ARROWLEFT || keysdown["A"]) {
    playerVelX -= playerSpeed;
    flip = true;
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

onResize();
animate();
