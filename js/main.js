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

    // 3. Movimentação Infinita da Frase Superior (Alternativa Moderna ao Marquee)
    const subtitle = document.querySelector(".header__subtitle");
    if (subtitle) {
        let currentX = window.innerWidth; // Inicia na extremidade direita da tela
        const speed = 1.8; // Controla a velocidade do deslize

        function animateMarquee() {
            const textWidth = subtitle.offsetWidth;
            currentX -= speed;

            // Se o texto sair completamente pela esquerda, reseta para a direita
            if (currentX < -textWidth) {
                currentX = window.innerWidth;
            }

            subtitle.style.transform = `translateX(${currentX}px)`;
            requestAnimationFrame(animateMarquee);
        }
        animateMarquee();
    }

    // 4. Fundo de Partículas Interativo no Header (Substituindo imagens estáticas pesadas)
    const canvas = document.getElementById("header-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particlesArray = [];
        const numberOfParticles = 40;

        // Ajusta as dimensões do canvas para casar com o elemento pai
        function setCanvasSize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Classe Construtora das Partículas
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // Pequenos pontos brilhantes
                this.speedX = Math.random() * 0.4 - 0.2; // Movimento sutil
                this.speedY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Faz a partícula voltar para a tela caso ela saia das bordas
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 180, 216, ${this.opacity})`; // Tons cyan modernos
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Inicializa o array de partículas
        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        init();

        // Loop de renderização do Canvas para movimentos a 60fps estáveis
        function handleParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(handleParticles);
        }
        handleParticles();
    }
});
