let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 320;
let pontos = 0;

let Player = {
  x: 150,
  vx: 0,
  ax: 0,
  y: 100,
  vy: 0,
  ay: 0,
  cor: "white",
  desenhar: desenhaElementos,
  mover: moverElementos,
};

const sprites = [];

for (let ne = 0; ne < 20; ne++) {
  let E = {
    x: canvas.width * (1 + 10 * Math.random()),
    vx: -20,
    ax: 0,
    y: canvas.height * Math.random(),
    vy: 0,
    ay: 0,
    cor: "red",
    desenhar: desenhaElementos,
    mover: moverElementos,
    controlar: perseguirAlvo,
  };
  sprites.push(E);
}

let o = {
  x: -1000,
  vx: 0,
  ax: 0,
  y: 150,
  vy: 0,
  ay: 0,
  cor: "blue",
  desenhar: desenhaElementos,
  mover: moverElementos,
  controlar: function () {
    if (this.x > canvas.width + 60) {
      this.x = -1000;
      this.ax = 0;
      this.vx = 0;
    }
  },
};
sprites.push(o);

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

  Player.mover();
  Player.desenhar();

  for (let s = 0; s < sprites.length; s++) {
    const sprite = sprites[s];

    //Controladores
    sprite.controlar?.(Player);
    // atualiza dinamica dos estados
    sprite.mover?.();
    //Desenha elementos
    sprite.desenhar();

    if (colidiram(o, sprite) && o != sprite) {
      o.x = -1000;
      o.y = -1000;
      o.vx = 0;
      o.ax = 0;
      sprite.x = -1000;
      sprite.vx = 100;
      sprite.ax = 0;
      pontos += 5;
    }

    if (colidiram(Player, sprite) && o != sprite) {
      sprite.x = -1000;
      sprite.vx = 100;
      sprite.ax = 0;
      pontos -= 3;
    }
  }

  ctx.fillStyle = "yellow";
  ctx.font = "20px Impact";
  ctx.fillText(pontos, 10, 30);

  requestAnimationFrame(desenha);
  t0 = t;
}
function perseguirAlvo(alvo) {
  this.ay = 100 * Math.sign(alvo.y - this.y) - 0.2 * this.vy;
  this.ax = 100 * Math.sign(alvo.x - this.x) - 0.2 * this.vx;
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
    case " ":
      if (o.x === -1000) {
        o.x = Player.x;
        o.y = Player.y;
        o.vx = 200;
        o.ax = 100;
      }

    default:
      break;
  }
}

function colidiram(A, B) {
  return !(
    A.x > B.x + 20 ||
    A.x + 20 < B.x ||
    A.y > B.y + 20 ||
    A.y + 20 < B.y
  );
}
