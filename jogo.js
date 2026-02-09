let microfone, bola, cesto, imagemFundo;
let estadoJogo = 1;
let pontos = 0;
let tempoRestante = 30;

function preload() {
  imagemFundo = loadImage('fundo.png');
}

function setup() {
  createCanvas(800, 600);
  microfone = new p5.AudioIn();
  microfone.start();
  bola = new Bola();
  cesto = new Cesto();
  textSize(20);
}

function draw() {
  image(imagemFundo, 0, 0, width, height);

  if (estadoJogo === 1) {
    jogar();
  } else if (estadoJogo === 2) {
    ecraRepetir();
  }
}

function jogar() {
  desenharInterface();

  // Lógica do Tempo: Subtrai o tempo real que passou
  if (tempoRestante > 0) {
    tempoRestante -= deltaTime / 1000;
  } else {
    tempoRestante = 0;
    estadoJogo = 2;
  }

  cesto.mover();
  cesto.desenhar();

  let volume = microfone.getLevel();
  bola.atualizar(mouseX, volume);
  bola.desenhar();

  if (bola.verificarColisao(cesto)) {
    pontos++;
    bola.resetar();
  }
}

function ecraRepetir() {
  background(0, 0, 0, 180);
  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("FIM DE JOGO", width / 2, height / 2 - 50);
  textSize(25);
  text("Pontuação Final: " + pontos, width / 2, height / 2);
  text("Clica no rato para Reiniciar", width / 2, height / 2 + 60);
}

function mousePressed() {
  userStartAudio(); // Necessário para o mic em alguns browsers

  if (estadoJogo === 2) {
    pontos = 0;
    tempoRestante = 30; // Reset forçado do tempo
    bola.resetar();
    estadoJogo = 1;
  }
}

function desenharInterface() {
  fill(0);
  noStroke();
  textAlign(RIGHT);
  textSize(16);
  text("ANDRÉ GONÇALVES | Nº 29892 | ECGM", width - 20, 30);

  textAlign(LEFT);
  textSize(24);
  text("BASKETBALL", 20, height - 20);

  textAlign(CENTER);
  text("Tempo: " + ceil(tempoRestante), width / 2, 30);
  text("Pontos: " + pontos, width / 2, 60);
}

