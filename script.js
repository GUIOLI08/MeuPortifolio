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
    let status = document.getElementById("form-status");
    const container = document.querySelector('.sobremim .container');
    const tooltip = document.getElementById('mouseTooltip');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-item a');

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
    
    let mouseX = 0;
    let mouseY = 0;
    let tooltipX = 0;
    let tooltipY = 0;
    
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    container.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTooltip() {
        const speed = 0.15;
        const offset = 20; // Uma margem para o tooltip não colar no cursor

        // Pega as dimensões do tooltip e da janela
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // --- Lógica de Posição Inteligente ---

        // 1. Define a posição alvo padrão (à direita e abaixo do mouse)
        let targetX = mouseX + offset;
        let targetY = mouseY + offset;

        // 2. Verifica e corrige a posição Horizontal (X)
        // Se o tooltip for passar da borda direita...
        if (mouseX + tooltipWidth + offset > viewportWidth) {
            // ...muda o alvo para a esquerda do mouse.
            targetX = mouseX - tooltipWidth - offset;
        }

        // 3. Verifica e corrige a posição Vertical (Y)
        // Se o tooltip for passar da borda inferior...
        if (mouseY + tooltipHeight + offset > viewportHeight) {
            // ...muda o alvo para cima do mouse.
            targetY = mouseY - tooltipHeight - offset;
        }

        // Suaviza o movimento do tooltip em direção à posição alvo
        tooltipX = lerp(tooltipX, targetX, speed);
        tooltipY = lerp(tooltipY, targetY, speed);

        // Aplica a posição final
        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';

        // Continua a animação enquanto o tooltip estiver visível
        if (tooltip.classList.contains('show')) {
            requestAnimationFrame(animateTooltip);
        }
    }
    
    container.addEventListener('mouseenter', function(e) {

        tooltipX = e.clientX;
        tooltipY = e.clientY;
        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';
        
        tooltip.classList.add('show');
        animateTooltip();
    });
    
    container.addEventListener('mouseleave', function() {
        tooltip.classList.remove('show');
    });

    mobileMenuToggle.addEventListener('click', () => {
        // Alterna a classe 'active' no botão (para o ícone X)
        mobileMenuToggle.classList.toggle('active');
        // Alterna a classe 'active' no menu de navegação (para exibi-lo/escondê-lo)
        nav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove a classe 'active' para fechar o menu ao clicar em um link
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
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