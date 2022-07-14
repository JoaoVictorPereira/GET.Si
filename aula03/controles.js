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

  desenhar: function () {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, 20, 20);
  },
};

let E = {
  x: 350,
  vx: 0,
  ax: 0,
  y: 200,
  vy: 0,
  ay: 0,
  desenhar: function () {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 20, 20);
  },
};

const K = 80;
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

  E.ay = 0.5 * (Player.y - E.y) - 0.2 * E.vy;
  E.ax = 0.5 * (Player.x - E.x) - 0.2 * E.vx;

  // atualiza dinamica dos estados

  /**************************/
  Player.vx = Player.vx + Player.ax * dt;
  Player.x = Player.x + Player.vx * dt;
  Player.vy = Player.vy + Player.ay * dt;
  Player.y = Player.y + Player.vy * dt;
  /**************************/
  E.vx = E.vx + E.ax * dt;
  E.x = E.x + E.vx * dt;
  E.vy = E.vy + E.ay * dt;
  E.y = E.y + E.vy * dt;
  /**************************/
  //Desenha elementos

  Player.desenhar();
  E.desenhar();

  requestAnimationFrame(desenha);
  t0 = t;
}

addEventListener("keydown", teclaPressionada);
addEventListener("keyup", teclaSolta);

function teclaPressionada(event) {
  console.log(event.key);
  switch (event.key) {
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
function teclaSolta(event) {
  console.log(event.key);
  switch (event.key) {
    case "w":
      Player.ay = 0;
      break;
    case "s":
      Player.ay = 0;
      break;
    case "a":
      Player.ax = 0;
      break;
    case "d":
      Player.ax = 0;
      break;

    default:
      break;
  }
}
