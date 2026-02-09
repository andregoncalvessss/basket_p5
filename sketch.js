let microfone;
let bola;
let cesto;
let estadoJogo = 1;
let pontos = 0;
let imagemFundo;

// MUDANÇA: Uma variável simples que guarda os segundos que faltam
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

  // LÓGICA DO TEMPO (A SOLUÇÃO)
  // deltaTime conta o tempo entre cada frame. Dividimos por 1000 para ter segundos.
  if (tempoRestante > 0) {
    tempoRestante -= deltaTime / 1000;
  } else {
    // Se o tempo for menor que 0, acaba o jogo
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
  background(0, 0, 0, 150);
  fill(255);
  textAlign(CENTER);
  
  textSize(40);
  text("FIM DE JOGO", width / 2, height / 2 - 50);

  textSize(25);
  text("Pontuação Final: " + pontos, width / 2, height / 2);
  text("Clica no rato para Reiniciar", width / 2, height / 2 + 60);
}

// ESTA FUNÇÃO RESOLVE O TEU PROBLEMA
function mousePressed() {
  // O 'userStartAudio' é obrigatório no Chrome para o mic funcionar
  userStartAudio();

  if (estadoJogo === 2) {
    // 1. Resetar Pontos
    pontos = 0;
    
    // 2. Resetar a Bola
    bola.resetar();
    
    // 3. FORÇAR O TEMPO PARA 30 SEGUNDOS
    // Como estamos a definir o valor diretamente, ele não pode ser negativo
    tempoRestante = 30; 
    
    // 4. Voltar ao jogo
    estadoJogo = 1;
  }
}

function desenharInterface() {
  fill(0);
  noStroke();
  textAlign(RIGHT);
  textSize(16);
  text("ANDRÉ GONÇALVES", width - 20, 30);
  text("Nº 29892", width - 20, 50);
  text("ECGM", width - 20, 70);

  textAlign(LEFT);
  textSize(24);
  text("BASKETBALL", 20, height - 20);

  textAlign(CENTER);
  
  // Arredondamos o número para não mostrar casas decimais (ex: 29.999)
  let tempoFormatado = int(tempoRestante);
  
  text("Tempo: " + tempoFormatado, width / 2, 30);
  text("Pontos: " + pontos, width / 2, 60);
}

/* --- CLASSES (BOLA E CESTO) --- */

class Bola {
  constructor() {
    this.tamanho = 30;
    this.x = width / 2;
    this.y = height - 50;
    this.lancada = false;
    this.velocidadeY = 0;
  }

  atualizar(posicaoRatoX, volumeMic) {
    if (this.lancada == false) {
      this.x = posicaoRatoX;
      this.y = height - 50;
      if (volumeMic > 0.1) {
        this.lancada = true;
        this.velocidadeY = -10;
      }
    } else {
      this.y += this.velocidadeY;
      if (this.y < 0) {
        this.resetar();
      }
    }
  }

  desenhar() {
    fill(255, 100, 0);
    stroke(0);
    circle(this.x, this.y, this.tamanho);
  }

  resetar() {
    this.lancada = false;
    this.y = height - 50;
  }

  verificarColisao(objetoCesto) {
    let distancia = dist(this.x, this.y, objetoCesto.x, objetoCesto.y + 40);
    if (distancia < 35) {
      return true;
    }
    return false;
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
    if (this.x > width - 60 || this.x < 60) {
      this.velocidade *= -1;
      if (this.velocidade > 0) this.velocidade = random(2, 6);
      else this.velocidade = random(-6, -2);
    }
  }

  desenhar() {
    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, 120, 90);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    rect(this.x, this.y + 15, 50, 40);
    stroke(255);
    strokeWeight(1);
    line(this.x - 20, this.y + 40, this.x - 15, this.y + 75);
    line(this.x + 20, this.y + 40, this.x + 15, this.y + 75);
    line(this.x - 7, this.y + 40, this.x - 5, this.y + 75);
    line(this.x + 7, this.y + 40, this.x + 5, this.y + 75);
    line(this.x - 18, this.y + 50, this.x + 18, this.y + 50);
    line(this.x - 12, this.y + 65, this.x + 12, this.y + 65);
    stroke(255, 100, 0);
    strokeWeight(5);
    line(this.x - 30, this.y + 40, this.x + 30, this.y + 40);
    strokeWeight(1);
    stroke(0);
  }
}