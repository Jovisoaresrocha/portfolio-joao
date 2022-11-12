const canvas = document.querySelector("#gamefofinho");
const ctx = canvas.getContext("2d");
console.log(canvas);
const button = document.querySelector("#musica");
const audio = document.querySelector("audio");

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
  const scale = 0.4;
  const width = avatar.width * scale;
  const height = avatar.height * scale;
  const offset = 70 * scale;
  if (!playerReady) {
    playerReady = true;
    playerX = -200;
    playerY = 100;
  }

  // chão:
  const floorY = canvas.height - 68 - height + offset;
  if (playerY > floorY) {
    // playerVelY = 0;
    playerY = floorY;
    canJump = true;
    playerVelY *= -0.1;
  } else {
    canJump = false;
  }

  // parede da esquerda
  const WallL = canvas.width - 100;
  if (playerX > WallL) {
    playerX = WallL;
  }
  // parede da direita
  let WallR = -200;
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
let tempo = 0;
const playerSpeed = 2;
function animate() {
  if (keysdown.ARROWRIGHT || keysdown["D"]) {
    playerVelX += playerSpeed;
    if (tempo === 0) {
      audio.volume = 0.07;
      audio.play();
      tempo += 1;
    }
    flip = false;
    WallF = 0;
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
