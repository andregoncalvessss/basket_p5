class Bola {
  constructor() {
    this.tamanho = 30;
    this.resetar(); // Define as variáveis iniciais
  }

  atualizar(posicaoRatoX, volumeMic) {
    // Se a bola ainda não foi lançada
    if (this.lancada == false) {
      this.x = constrain(posicaoRatoX, 15, 785); // Segue o rato (dentro dos limites)
      this.y = height - 80;

      // Se fizer barulho, lança a bola
      if (volumeMic > 0.05) {
        this.lancada = true;
        this.velocidadeY = -12;
        if (somLigado) somLancamento.play(); // Toca o som se estiver ligado
      }
    } 
    // Se a bola já foi lançada
    else {
      this.y += this.velocidadeY; // A bola sobe
      
      // Se sair do ecrã por cima, volta ao início
      if (this.y < 0) {
        this.resetar();
      }
    }
  }

  desenhar() {
    push();
    fill(255, 100, 0); stroke(0); strokeWeight(1.5);
    circle(this.x, this.y, this.tamanho); // Desenha a bola

    // Desenha as linhas pretas da bola
    strokeWeight(1);
    line(this.x - 15, this.y, this.x + 15, this.y); 
    line(this.x, this.y - 15, this.x, this.y + 15); 

    noFill();
    arc(this.x - 21, this.y, 30, 30, -0.6, 0.6); 
    arc(this.x + 21, this.y, 30, 30, PI - 0.6, PI + 0.6);
    pop();
  }

  resetar() {
    this.lancada = false;
    this.y = height - 80;
    this.velocidadeY = 0;
  }

  verificarColisao(cesto) {
    // Vê se a bola tocou perto do cesto
    return dist(this.x, this.y, cesto.x, cesto.y + 40) < 35;
  }
}