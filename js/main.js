document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualiza dinamicamente o ano no Footer de forma nativa e sem document.write
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Efeito de digitação suave para a frase final (Substituindo o antigo marquee)
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
        
        // Inicia o efeito
        typeWriter();
    }
});
