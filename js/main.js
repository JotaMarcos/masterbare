document.addEventListener("DOMContentLoaded", () => {
    // 1. Data dinâmica no rodapé corporativo
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Efeito Máquina de Escrever no Terminal Inferior
    const textElement = document.querySelector(".typing-text");
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = "";
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 90);
            }
        }
        typeWriter();
    }

    // 3. Fundo de Constelação Tecnológica Interativo em HTML5 Canvas
    const canvas = document.getElementById("header-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particlesArray = [];
        const numberOfParticles = 60;

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * 0.6 - 0.3;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = "rgba(100, 255, 218, 0.4)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        init();

        function connectNodes() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 90) {
                        ctx.strokeStyle = `rgba(100, 255, 218, ${1 - (distance/90) * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connectNodes();
            requestAnimationFrame(animate);
        }
        animate();
    }
});
