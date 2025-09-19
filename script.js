document.addEventListener('DOMContentLoaded', (event) => {
    function startTypingEffect() {
        // Textos que serão exibidos, com a formatação HTML
        const lines = [
            "Olá, eu sou <b class='textPurple' id='gui'>{ Guilherme }</b>.",
            "Um desenvolvedor",
            "Front-end | Back-end"
        ];
        
        const typingElement = document.getElementById('typing-effect');

        let lineIndex = 0;
        let charIndex = 0;
        let currentHtml = '';

        function type() {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];
                
                // Se ainda há caracteres para digitar na linha atual
                if (charIndex < currentLine.length) {
                    // Adiciona o próximo caractere
                    currentHtml += currentLine.charAt(charIndex);
                    typingElement.innerHTML = currentHtml;
                    charIndex++;
                    setTimeout(type, 50); // Velocidade da digitação (em ms)
                } else {
                    // Passa para a próxima linha
                    lineIndex++;
                    charIndex = 0;
                    // Adiciona a quebra de linha, exceto para a última linha
                    if (lineIndex < lines.length) {
                        currentHtml += '<br>';
                    }
                    setTimeout(type, 250); // Pausa antes de começar a próxima linha
                }
            }
        }

        // Inicia o efeito
        type();
    }

    startTypingEffect()

    const linkedinBtn = document.getElementById('linkedinBtn');
    const linkedinBtn2 = document.getElementById('linkedinBtn2');
    const gitHubBtn = document.getElementById('gitHubBtn');
    const contactMeBtn = document.getElementById('contactMeBtn');

    linkedinBtn.addEventListener('click', () => {
        window.location.href = 'https://linkedin.com/in/guilherme-oliver-75620536a';
    });

    linkedinBtn2.addEventListener('click', () => {
        window.location.href = 'https://linkedin.com/in/guilherme-oliver-75620536a';
    });

    gitHubBtn.addEventListener('click', () => {
        window.location.href = 'https://github.com/guioli08';
    });

    contactMeBtn.addEventListener('click', () => {
        window.location.href = '#footer'
    });

});