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
  cor: "blue",
  desenhar: desenhaElementos,
  mover: moverElementos,
};

let E = {
  x: 350,
  vx: 0,
  ax: 0,
  y: 200,
  vy: 0,
  ay: 0,
  cor: "red",
  desenhar: desenhaElementos,
  mover: moverElementos,
  controlar: perseguirAlvo,
};

const K = 120;
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

  E.controlar(Player);

  // atualiza dinamica dos estados

  Player.mover();
  E.mover();

  //Desenha elementos

  Player.desenhar();
  E.desenhar();

  requestAnimationFrame(desenha);
  t0 = t;
}
function perseguirAlvo(alvo) {
  this.ay = 0.5 * (alvo.y - this.y) - 0.2 * this.vy;
  this.ax = 0.5 * (alvo.x - this.x) - 0.2 * this.vx;
}

function desenhaElementos() {
  ctx.fillStyle = this.cor;
  ctx.fillRect(this.x, this.y, 20, 20);
}

function moverElementos() {
  this.vx = this.vx + this.ax * dt;
  this.x = this.x + this.vx * dt;
  this.vy = this.vy + this.ay * dt;
  this.y = this.y + this.vy * dt;
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
