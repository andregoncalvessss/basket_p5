class PowerUp {
  constructor() {
    this.x = random(50, width - 50); 
    this.y = -30;
    this.vel = random(2, 5); 
    this.tipo = random(['⌛', '⭐', '❄️']); 
  }

  mover() {
    this.y += this.vel;
  }

  desenhar() {
    textSize(35);
    textAlign(CENTER, CENTER); 
    text(this.tipo, this.x, this.y);
  }
}