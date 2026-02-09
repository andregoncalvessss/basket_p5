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
  if (tempoRestante > 0) {
    tempoRestante -= deltaTime / 1000;
  } else {
    tempoRestante = 0;
    estadoJogo = 2;
  }

  cesto.mover();
  cesto.desenhar();
  bola.atualizar(mouseX, microfone.getLevel());
  bola.desenhar();

  if (bola.verificarColisao(cesto)) {
    pontos++;
    bola.resetar();
  }
}

function ecraRepetir() {
  background(0, 0, 0, 200);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("FIM DE JOGO", width / 2, height / 2 - 50);
  textSize(25);
  text("Pontuação Final: " + pontos, width / 2, height / 2);
  textSize(20);
  text("Clica no rato para Reiniciar", width / 2, height / 2 + 60);
}

function mousePressed() {
  userStartAudio();
  if (estadoJogo === 2) {
    pontos = 0;
    tempoRestante = 30;
    bola.resetar();
    estadoJogo = 1;
  }
}

function desenharInterface() {
  fill(0);
  noStroke();
  
  // Canto Superior Esquerdo: Tempo e Pontos
  textAlign(LEFT);
  textSize(22);
  text("TEMPO: " + ceil(tempoRestante) + "s", 20, 40);
  text("PONTOS: " + pontos, 20, 70);

  // Canto Superior Direito: Nome do Aluno
  textAlign(RIGHT);
  textSize(14);
  text("ANDRÉ GONÇALVES| ECGM | Nº29892", width - 20, 30);

  // Canto Inferior Esquerdo: Nome do Desporto (Inglês)
  textAlign(LEFT);
  textSize(24);
  text("BASKETBALL", 20, height - 20);
}