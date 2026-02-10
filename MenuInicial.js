class MenuInicial {
  constructor(img) {
    this.img = img;
  }

  desenhar() {
    // Desenha Fundo
    if (this.img) image(this.img, 0, 0, width, height);
    else background(0, 150);

    // Título
    textAlign(CENTER, CENTER); stroke(255); strokeWeight(4);
    fill(255, 100, 0); textSize(60);
    text("BASKETBALL", width / 2, 150);

    // Botões
    this.botao("JOGAR", width / 2, 300, 200, 60);
    this.botao("INSTRUÇÕES", width / 2, 400, 250, 60);

    // Rodapé
    textSize(16); stroke(0); strokeWeight(2); fill(255);
    text("ANDRÉ GONÇALVES | ECGM | Nº 29892", width / 2, height - 30);
  }

  desenharInstrucoes() {
    background(0, 220);
    
    // Título
    noStroke(); fill(255); textAlign(CENTER, TOP); textSize(40);
    text("COMO JOGAR", width / 2, 50);

    // Texto
    textAlign(LEFT, TOP); textSize(20);
    let texto = "- Move o RATO para apontar.\n" +
                "- Faz BARULHO para lançar!\n" +
                "- Acerta para ganhar pontos.\n\n" +
                "POWER-UPS:\n⭐ +2 Pontos  |  ⌛ +2 Segundos\n❄️ Cesto lento (2s)";
    text(texto, 200, 130);

    // Botão Voltar (com cor laranja ativada)
    this.botao("VOLTAR", width / 2, 500, 200, 50, true);
  }

  botao(texto, x, y, w, h, laranja = false) {
    // 1. Definir cor do retângulo
    if (laranja) fill(255, 100, 0);
    else if (this.ratoSobre(x, y, w, h)) fill(220); // Hover (cinza claro)
    else fill(255); // Normal (branco)

    stroke(0); strokeWeight(2);
    rect(x, y, w, h, 10);

    // 2. Definir cor e tamanho do texto
    if (laranja) { fill(255); textSize(25); } 
    else { fill(0); textSize(30); }

    noStroke(); textAlign(CENTER, CENTER);
    text(texto, x, y);
  }

  verificarClique() {
    if (estadoJogo === 0) {
      if (this.ratoSobre(width / 2, 300, 200, 60)) iniciarJogo();
      if (this.ratoSobre(width / 2, 400, 250, 60)) estadoJogo = 3;
    } 
    else if (estadoJogo === 3) {
      if (this.ratoSobre(width / 2, 500, 200, 50)) estadoJogo = 0;
    }
  }

  ratoSobre(x, y, w, h) {
    // Verifica se o rato está dentro da área do botão
    return (mouseX > x - w/2 && mouseX < x + w/2 && mouseY > y - h/2 && mouseY < y + h/2);
  }
}