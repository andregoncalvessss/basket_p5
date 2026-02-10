let microfone, bola, cesto, menu, imgFundo, imgMenu;
let estadoJogo = 0, pontos = 0, tempoRestante = 30, tempoGelo = 0;
let listaPower = [], somLigado = true, jogoCarregado = false;
let somFundo, somGameOver, somPowerup, somLancamento, somPonto;

function preload() {
  // Carregar imagens e sons sem funções de erro complicadas
  imgFundo = loadImage('assets/images/fundo.png', () => jogoCarregado = true);
  imgMenu  = loadImage('assets/images/fundo0.png');
  
  soundFormats('mp3');
  somFundo      = loadSound('assets/sounds/background_music.mp3');
  somGameOver   = loadSound('assets/sounds/gameover.mp3');
  somPowerup    = loadSound('assets/sounds/pop.mp3');
  somLancamento = loadSound('assets/sounds/swing_whoosh.mp3');
  somPonto      = loadSound('assets/sounds/whoosh.mp3');
}

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);

  microfone = new p5.AudioIn();
  microfone.start();

  bola = new Bola();
  cesto = new Cesto();
  cesto.velocidade = 7;
  
  menu = new MenuInicial(imgMenu);
  if (somFundo) somFundo.setVolume(0.5);
}

function draw() {
  // Estado 0: Menu | Estado 3: Instruções
  if (estadoJogo === 0) menu.desenhar();
  else if (estadoJogo === 3) menu.desenharInstrucoes();
  else {
    // Jogo (1) ou Fim (2)
    if (jogoCarregado) image(imgFundo, 0, 0, width, height);
    else background(50);

    if (estadoJogo === 1) jogar();
    else ecraRepetir();
  }
}

function jogar() {
  desenharInterface();

  // Temporizador
  if (tempoRestante > 0) tempoRestante -= deltaTime / 1000;
  else {
    tempoRestante = 0;
    estadoJogo = 2;
    if (somFundo) somFundo.stop();
    if (somLigado) somGameOver.play();
  }

  // Gerar PowerUps e controlar Gelo
  if (random(100) < 1) listaPower.push(new PowerUp());
  if (tempoGelo > 0) tempoGelo -= deltaTime / 1000;

  // Definir velocidade do cesto
  let vel = (tempoGelo > 0) ? 5 : 7;
  cesto.velocidade = (cesto.velocidade > 0 ? 1 : -1) * vel;

  // Lógica dos PowerUps
  for (let i = listaPower.length - 1; i >= 0; i--) {
    let p = listaPower[i];
    p.mover(); p.desenhar();

    if (dist(bola.x, bola.y, p.x, p.y) < 40) {
      if (somLigado) somPowerup.play();
      if (p.tipo === '⌛') tempoRestante += 2;
      if (p.tipo === '⭐') pontos += 2;
      if (p.tipo === '❄️') tempoGelo = 2;
      listaPower.splice(i, 1);
    } 
    else if (p.y > height) listaPower.splice(i, 1);
  }

  // Atualizar Jogo
  cesto.mover(); cesto.desenhar();
  bola.atualizar(mouseX, microfone.getLevel()); bola.desenhar();

  if (bola.verificarColisao(cesto)) {
    if (somLigado) somPonto.play();
    pontos++;
    bola.resetar();
  }
}

function ecraRepetir() {
  background(0, 0, 0, 200);
  fill(255); textAlign(CENTER, CENTER);
  textSize(40); text("FIM DE JOGO", width/2, height/2 - 50);
  textSize(25); text("Pontuação Final: " + pontos, width/2, height/2);
  
  stroke(0); strokeWeight(2); fill(255);
  rect(width/2, height/2 + 80, 200, 50, 10);
  
  noStroke(); fill(0); textSize(20);
  text("Voltar ao Menu", width/2, height/2 + 80);
}

function iniciarJogo() {
  pontos = 0; tempoRestante = 30; listaPower = []; tempoGelo = 0;
  bola.resetar(); cesto.velocidade = 7; estadoJogo = 1;
  if (somLigado && somFundo) somFundo.loop();
}

function alternarSom() {
  somLigado = !somLigado;
  if (somLigado) {
    if (estadoJogo === 1 && somFundo && !somFundo.isPlaying()) somFundo.loop();
  } else {
    if (somFundo) somFundo.pause();
    if (somGameOver) somGameOver.stop();
  }
}

function mousePressed() {
  userStartAudio();

  if (estadoJogo === 0 || estadoJogo === 3) menu.verificarClique();
  else if (estadoJogo === 1) {
    // Clique no botão de som (distância do ponto x=170, y=30)
    if (dist(mouseX, mouseY, 170, 30) < 25) alternarSom();
  }
  else if (estadoJogo === 2) {
    // Botão voltar ao menu
    if (mouseX > width/2 - 100 && mouseX < width/2 + 100 && mouseY > height/2 + 55 && mouseY < height/2 + 105) {
      if (somGameOver) somGameOver.stop();
      estadoJogo = 0;
    }
  }
}

function desenharInterface() {
  push();
  fill(0); noStroke(); textAlign(LEFT, TOP); textSize(22);
  
  text("TEMPO: " + ceil(tempoRestante) + "s", 20, 20);
  text("PONTOS: " + pontos, 20, 50);

  // Botão de Som (Emoji)
  textSize(25);
  text(somLigado ? "🔊" : "🔇", 155, 18);

  textAlign(RIGHT, TOP); textSize(14);
  text("ANDRÉ GONÇALVES | ECGM | Nº 29892", width - 20, 20);
  
  textAlign(LEFT, BOTTOM); textSize(26);
  text("BASKETBALL", 20, height - 20);
  pop();
}