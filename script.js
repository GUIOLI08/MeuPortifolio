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
    const header = document.querySelector('.header');
    const form = document.querySelector('.input-form');
    var status = document.getElementById("form-status");

    const scrollTrigger = 10;

    // Criamos uma função para adicionar/remover a classe
    function handleScroll() {
        // window.scrollY nos dá a posição vertical atual da barra de rolagem
        if (window.scrollY > scrollTrigger) {
            // Se a rolagem for maior que o nosso gatilho (10px)
            header.classList.add('scrolled');
        } else {
            // Se for menor, removemos a classe
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

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

    async function handleSubmit(event) {
        // 1. Impede o comportamento padrão de recarregar a página
        event.preventDefault();
        
        // 2. Coleta os dados do formulário
        var data = new FormData(event.target);
        
        // 3. Envia os dados para o Formspree via 'fetch'
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            // 4. Lida com a resposta
            if (response.ok) {
            // Se deu tudo certo, mostra a mensagem de sucesso
            status.innerHTML = "Obrigado! Sua mensagem foi enviada.";
            status.style.color = "green";
            status.style.fontSize = "1rem";
            status.style.fontWeight = "700";
            form.reset(); // Limpa o formulário
            } else {
            // Se houve um erro na resposta do servidor (ex: validação do Formspree)
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                status.innerHTML = "Ops! Ocorreu um erro ao enviar sua mensagem.";
                status.style.color = "red"; // Opcional: estiliza a mensagem
                }
            })
            }
        }).catch(error => {
            // Se houve um erro de rede (ex: sem internet)
            status.innerHTML = "Ops! Ocorreu um erro ao enviar sua mensagem.";
            status.style.color = "red";
            status.style.fontSize = "1rem";
            status.style.fontWeight = "800";
        });
    }

    // 5. Adiciona o "ouvinte" para o evento de 'submit' do formulário
    form.addEventListener("submit", handleSubmit);

});