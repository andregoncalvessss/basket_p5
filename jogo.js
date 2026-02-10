let microfone, bola, cesto, imagemFundo;
let estadoJogo = 1; 
let pontos = 0;
let tempoRestante = 30;
let listaPower = [];
let tempoGelo = 0; 

function preload() {
  imagemFundo = loadImage('fundo.png');
}

function setup() {
  createCanvas(800, 600);
  microfone = new p5.AudioIn();
  microfone.start();
  bola = new Bola();
  cesto = new Cesto();
  
  // Velocidade normal
  cesto.velocidade = 7; 
}

function draw() {
  image(imagemFundo, 0, 0, width, height);

  if (estadoJogo === 1) {
    jogar();
  } else {
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

  if (random(100) < 1) listaPower.push(new PowerUp());

  // --- LÓGICA DO GELO ---
  if (tempoGelo > 0) {
    tempoGelo -= deltaTime / 1000;
  }
  
  // Define a direção atual (1 ou -1)
  let direcao = (cesto.velocidade > 0) ? 1 : -1;
  
  // --- Se tem gelo, velocidade é 5. Se não, é 7. ---
  let magnitudeVelocidade = (tempoGelo > 0) ? 5 : 7;
  
  cesto.velocidade = direcao * magnitudeVelocidade;

  for (let i = listaPower.length - 1; i >= 0; i--) {
    let p = listaPower[i];
    p.mover();
    p.desenhar();

    if (dist(bola.x, bola.y, p.x, p.y) < 40) {
      if (p.tipo === '⌛') {
        tempoRestante += 2; 
      } 
      else if (p.tipo === '⭐') {
        pontos += 2;        
      }
      else if (p.tipo === '❄️') {
        // Gelo dura 2 segundos
        tempoGelo = 2; 
      }
      
      listaPower.splice(i, 1);
    } 
    else if (p.y > height) {
      listaPower.splice(i, 1);
    }
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
    listaPower = [];
    tempoGelo = 0;
    bola.resetar();
    
    // Reset para a velocidade normal (7)
    cesto.velocidade = 7; 
    estadoJogo = 1;
  }
}

function desenharInterface() {
  push();
  
  // --- MUDANÇA: Texto a Preto ---
  fill(0); 
  noStroke(); // Remove o contorno para ficar preto limpo
  
  textAlign(LEFT, TOP);
  textSize(22);
  text("TEMPO: " + ceil(tempoRestante) + "s", 20, 20);
  text("PONTOS: " + pontos, 20, 50);
  
  textAlign(RIGHT, TOP);
  textSize(14);
  text("ANDRÉ GONÇALVES | ECGM | Nº 29892", width - 20, 20);
  
  textAlign(LEFT, BOTTOM);
  textSize(26);
  text("BASKETBALL", 20, height - 20);
  pop();
}