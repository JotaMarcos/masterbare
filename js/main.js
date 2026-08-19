document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualiza dinamicamente o ano no Footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Efeito de digitação suave para a frase final
    const textElement = document.querySelector(".typing-text");
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = "";
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // 3. Aprimoramento: Movimentação "Bate e Volta" da frase do cabeçalho via JS
    const subtitle = document.querySelector(".header__subtitle");
    if (subtitle) {
        let posX = 0;
        let direcao = 1; // 1 significa indo para a direita, -1 indo para a esquerda
        const velocidade = 2; // Altere este número para deixar mais rápido ou mais devagar

        function moverLegenda() {
            // Pega a largura atual da tela e o tamanho real ocupado pelo texto
            const larguraTela = window.innerWidth;
            const larguraTexto = subtitle.offsetWidth;

            // Incrementa a posição horizontal baseado na velocidade e direção
            posX += velocidade * direcao;

            // Se o texto atingir o limite direito da tela, inverte para a esquerda
            if (posX + larguraTexto >= larguraTela) {
                direcao = -1;
            }
            // Se o texto atingir o limite esquerdo (0), inverte para a direita
            else if (posX <= 0) {
                direcao = 1;
            }

            // Aplica a nova posição na tela usando a propriedade transform para melhor performance
            subtitle.style.transform = `translateX(${posX}px)`;

            // Executa a função continuamente acompanhando a taxa de atualização da tela
            requestAnimationFrame(moverLegenda);
        }

        // Inicializa o posicionamento e inicia a animação do JS
        subtitle.style.position = "absolute";
        subtitle.style.left = "0";
        moverLegenda();
    }
});
