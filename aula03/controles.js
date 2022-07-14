let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 320;
let Player = {
  x: 150,
  vx: 0,
  ax: 0,
  y: 100,
  vy: 0,
  ay: 0,
};

let x2 = 350;
let vx2 = 0;
let ax2 = 0;
let y2 = 200;
let vy2 = 0;
let ay2 = 0;

const K = 180;
let t0;
let dt;
requestAnimationFrame(desenha);

//função para desenhar
function desenha(t) {
  t0 = t0 ?? t;
  dt = (t - t0) / 1000;

  //Desenha Fundo
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Controladores

  ay2 = 0.5 * (Player.y - y2) - 0.2 * vy2;
  ax2 = 0.5 * (Player.x - x2) - 0.2 * vx2;

  // atualiza dinamica dos estados

  /**************************/
  Player.vx = Player.vx + Player.ax * dt;
  Player.x = Player.x + Player.vx * dt;
  Player.vy = Player.vy + Player.ay * dt;
  Player.y = Player.y + Player.vy * dt;
  /**************************/
  vx2 = vx2 + ax2 * dt;
  x2 = x2 + vx2 * dt;
  vy2 = vy2 + ay2 * dt;
  y2 = y2 + vy2 * dt;
  /**************************/
  //Desenha elementos
  ctx.fillStyle = "red";
  ctx.fillRect(x2, y2, 20, 20);
  ctx.fillStyle = "blue";
  ctx.fillRect(Player.x, Player.y, 20, 20);

  requestAnimationFrame(desenha);
  t0 = t;
}

addEventListener("keydown", teclaPressionada);
addEventListener("keyup", teclaSolta);

function teclaPressionada(e) {
  console.log(e.key);
  switch (e.key) {
    case "w":
      Player.ay = -K;
      break;
    case "s":
      Player.ay = +K;
      break;
    case "a":
      Player.ax = -K;
      break;
    case "d":
      Player.ax = +K;
      break;

    default:
      break;
  }
}
function teclaSolta(e) {
  console.log(e.key);
  switch (e.key) {
    case "w":
      Player.vy = 0;
      Player.ay = 0;
      break;
    case "s":
      Player.vy = 0;
      Player.ay = 0;
      break;
    case "a":
      Player.vx = 0;
      Player.ax = 0;
      break;
    case "d":
      Player.vx = 0;
      Player.ax = 0;
      break;

    default:
      break;
  }
}
