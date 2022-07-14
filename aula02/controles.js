let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 320;
let x = 150;
let vx = 0;
let y = 100;
let vy = 0;
const V = 180;
let t0;
let dt;
requestAnimationFrame(desenha);

//função para desenhar
function desenha(t) {
  t0 = t0 ?? t;
  dt = (t - t0) / 1000;

  //Desenha Fundo
  ctx.fillStyle = "darkgray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // atualiza estados
  x = x + vx * dt;
  y = y + vy * dt;

  //Desenha elementos
  ctx.fillStyle = "blue";
  ctx.fillRect(x, y, 20, 20);

  requestAnimationFrame(desenha);
  t0 = t;
}

addEventListener("keydown", teclaPressionada);
addEventListener("keyup", teclaSolta);

function teclaPressionada(e) {
  console.log(e.key);
  switch (e.key) {
    case "w":
      vy = -V;
      break;
    case "s":
      vy = +V;
      break;
    case "a":
      vx = -V;
      break;
    case "d":
      vx = +V;
      break;

    default:
      break;
  }
}
function teclaSolta(e) {
  console.log(e.key);
  switch (e.key) {
    case "w":
      vy = 0;
      break;
    case "s":
      vy = 0;
      break;
    case "a":
      vx = 0;
      break;
    case "d":
      vx = 0;
      break;

    default:
      break;
  }
}
