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