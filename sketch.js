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

/* --- CLASSES --- */

class Bola {
  constructor() {
    this.tamanho = 30;
    this.resetar();
  }

  atualizar(posicaoRatoX, volumeMic) {
    if (!this.lancada) {
      this.x = posicaoRatoX;
      this.y = height - 50;
      if (volumeMic > 0.1) {
        this.lancada = true;
        this.velocidadeY = -12;
      }
    } else {
      this.y += this.velocidadeY;
      if (this.y < 0) this.resetar();
    }
  }

  desenhar() {
    fill(255, 100, 0);
    stroke(0);
    strokeWeight(1);
    circle(this.x, this.y, this.tamanho);
  }

  resetar() {
    this.lancada = false;
    this.y = height - 50;
    this.velocidadeY = 0;
  }

  verificarColisao(objetoCesto) {
    // Verifica se a bola está perto do centro da rede
    return dist(this.x, this.y, objetoCesto.x, objetoCesto.y + 40) < 35;
  }
}

class Cesto {
  constructor() {
    this.x = width / 2;
    this.y = 160;
    this.velocidade = 3;
  }

  mover() {
    this.x += this.velocidade;

    // CORREÇÃO: Reposiciona o cesto na borda para não encravar
    if (this.x > width - 60) {
      this.velocidade *= -1;
      this.x = width - 60; // Força a saída da borda
    } else if (this.x < 60) {
      this.velocidade *= -1;
      this.x = 60; // Força a saída da borda
    }
  }

  desenhar() {
    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(2);
    // Tabela
    rect(this.x, this.y, 120, 90);
    
    // Aro/Rede
    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    rect(this.x, this.y + 15, 50, 40);
    
    // Detalhes da rede
    stroke(200); 
    strokeWeight(1);
    line(this.x - 20, this.y + 40, this.x - 15, this.y + 75);
    line(this.x + 20, this.y + 40, this.x + 15, this.y + 75);
    line(this.x - 18, this.y + 50, this.x + 18, this.y + 50);
    
    // Borda do cesto
    stroke(255, 100, 0);
    strokeWeight(5);
    line(this.x - 30, this.y + 40, this.x + 30, this.y + 40);
    strokeWeight(1);
  }
}