let microfone;
let bola;
let cesto;
let estadoJogo = 1; 
let pontos = 0;
let tempoRestante = 30;
let tempoInicial = 0;

let imagemFundo;


function preload() {
  imagemFundo = loadImage('fundo.png'); 
}

function setup() {
  createCanvas(800, 600);
  
  // Inicializar o Microfone
  microfone = new p5.AudioIn();
  microfone.start();
  
  // Criar os objetos a partir das Classes
  bola = new Bola();
  cesto = new Cesto();
  
  textSize(20);
}

function draw() {
  image(imagemFundo, 0, 0, width, height);

  // Gestão de Ecrãs
  if (estadoJogo === 1) {
    jogar();
  } else if (estadoJogo === 2) {
    ecraRepetir();
  }
}


function jogar() {
  desenharInterface();
  let tempoAtual = millis();
  let segundosPassados = int((tempoAtual - tempoInicial) / 1000);
  let tempoFaltam = 30 - segundosPassados;
  
  if (tempoFaltam <= 0) {
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

function mousePressed() {
  if (estadoJogo === 2) {
    estadoJogo = 1;
    pontos = 0;
    bola.resetar();
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
  text("Tempo: " + (30 - int((millis() - tempoInicial)/1000)), width/2, 30);
  text("Pontos: " + pontos, width/2, 60);
}



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
    this.largura = 120; 
    this.altura = 90;   
    this.velocidade = 3;
  }

  mover() {
    this.x += this.velocidade;
    if (this.x > width - 60 || this.x < 60) { 
      this.velocidade *= -1; 
      if(this.velocidade > 0) this.velocidade = random(2, 6);
      else this.velocidade = random(-6, -2);
    }
  }

  desenhar() {
    rectMode(CENTER);
    fill(255); 
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.largura, this.altura);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    rect(this.x, this.y + 15, 50, 40);
    stroke(255); 
    strokeWeight(1);
    line(this.x - 20, this.y + 40, this.x - 15, this.y + 75);
    line(this.x + 20, this.y + 40, this.x + 15, this.y + 75);
    line(this.x - 7,  this.y + 40, this.x - 5,  this.y + 75);
    line(this.x + 7,  this.y + 40, this.x + 5,  this.y + 75);
    line(this.x - 18, this.y + 50, this.x + 18, this.y + 50);
    line(this.x - 12, this.y + 65, this.x + 12, this.y + 65);
    stroke(255, 100, 0); 
    strokeWeight(5);
    line(this.x - 30, this.y + 40, this.x + 30, this.y + 40);
    strokeWeight(1);
    stroke(0);
  }
}