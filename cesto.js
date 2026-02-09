class Cesto {
  constructor() {
    this.x = width / 2;
    this.y = 160;
    this.velocidade = 3;
  }

  mover() {
    this.x += this.velocidade;
    if (this.x > width - 60) {
      this.velocidade *= -1;
      this.x = width - 60; 
    } else if (this.x < 60) {
      this.velocidade *= -1;
      this.x = 60; 
    }
  }

  desenhar() {
    push();
    rectMode(CENTER);
    
    // Tabela branca
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, 120, 90);
    
    // REDE A PRETO (Conforme pedido)
    stroke(0);
    strokeWeight(1);
    for (let i = -20; i <= 20; i += 10) {
      line(this.x + i, this.y + 40, this.x + i * 0.7, this.y + 80);
    }
    line(this.x - 18, this.y + 55, this.x + 18, this.y + 55);
    line(this.x - 15, this.y + 70, this.x + 15, this.y + 70);
    
    // Aro Laranja
    stroke(255, 100, 0);
    strokeWeight(5);
    line(this.x - 30, this.y + 40, this.x + 30, this.y + 40);
    
    // Quadrado de alvo vermelho na tabela
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(this.x, this.y + 15, 50, 40);
    pop();
  }
}