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