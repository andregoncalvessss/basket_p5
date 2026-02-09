class Bola {
  constructor() {
    this.tamanho = 30;
    this.resetar();
  }

  atualizar(posicaoRatoX, volumeMic) {
    // Só movemos a bola se ela ainda não tiver sido lançada
    if (this.lancada == false) {
      
      // Limita o X entre 15 e 785 (metade da bola para cada lado em 800px)
      // Se o rato sair da janela, a bola "tranca" na borda
      this.x = constrain(posicaoRatoX, 15, 785);
      
      this.y = height - 50;

      // Lançar a bola com o som
      if (volumeMic > 0.1) {
        this.lancada = true;
        this.velocidadeY = -12;
      }
    } else {
      // Movimento vertical após o lançamento
      this.y += this.velocidadeY;
      
      // Se a bola sair por cima, volta para baixo
      if (this.y < 0) {
        this.resetar();
      }
    }
  }

  desenhar() {
    push();
    fill(255, 100, 0); 
    stroke(0);
    strokeWeight(1.5);
    circle(this.x, this.y, this.tamanho);

    // Riscas pretas (conforme a imagem que enviaste)
    strokeWeight(1);
    line(this.x - 15, this.y, this.x + 15, this.y); // Linha Horizontal
    line(this.x, this.y - 15, this.x, this.y + 15); // Linha Vertical

    noFill();
    // Curvas laterais para parecer 3D
    arc(this.x - 21, this.y, 30, 30, -0.6, 0.6); 
    arc(this.x + 21, this.y, 30, 30, PI - 0.6, PI + 0.6);
    pop();
  }

  resetar() {
    this.lancada = false;
    this.y = height - 50;
    this.velocidadeY = 0;
  }

  verificarColisao(objetoCesto) {
    // Verifica a distância entre a bola e a rede
    return dist(this.x, this.y, objetoCesto.x, objetoCesto.y + 40) < 35;
  }
}