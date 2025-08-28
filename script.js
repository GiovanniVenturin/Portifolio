// Script para o site de portfólio

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade para alternar entre as abas de qualificação
    const educationTab = document.querySelector('.qualification-button[data-target="#education"]');
    const workTab = document.querySelector('.qualification-button[data-target="#work"]');
    const educationContent = document.querySelector('#education');
    const workContent = document.querySelector('#work');
    
    // Verificar se todos os elementos foram encontrados
    console.log('Education Tab:', educationTab);
    console.log('Work Tab:', workTab);
    console.log('Education Content:', educationContent);
    console.log('Work Content:', workContent);
    
    if (educationTab && workTab && educationContent && workContent) {
        // Função para mostrar a aba de educação
        function showEducation() {
            educationTab.classList.add('active');
            workTab.classList.remove('active');
            educationContent.classList.add('active');
            workContent.classList.remove('active');
            console.log('Educação ativada');
        }
        
        // Função para mostrar a aba de trabalho
        function showWork() {
            workTab.classList.add('active');
            educationTab.classList.remove('active');
            workContent.classList.add('active');
            educationContent.classList.remove('active');
            console.log('Trabalho ativado');
        }
        
        // Adicionar event listeners
        educationTab.addEventListener('click', showEducation);
        workTab.addEventListener('click', showWork);
        
        // Configuração inicial
        showEducation();
    } else {
        console.error('Alguns elementos das abas não foram encontrados');
    }

    // Efeito de rolagem suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação para as barras de habilidades quando entrarem na visualização
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-percentage');
        skillBars.forEach(bar => {
            // Pegar a largura original do atributo style
            const width = bar.style.width || bar.innerHTML;
            // Resetar a largura para 0
            bar.style.width = '0';
            // Aplicar a animação após um pequeno delay
            setTimeout(() => {
                bar.style.transition = 'width 1.2s ease-in-out';
                bar.style.width = width;
            }, 300);
        });
    }

    // Configurar o observador de interseção para animar quando visível
    const skillsSection = document.querySelector('.skills.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                // Desconectar o observador após a animação
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 }); // Animar quando 30% da seção estiver visível

    // Observar a seção de habilidades
    if (skillsSection) {
        observer.observe(skillsSection);
    } else {
        // Fallback: executar animação quando a página carrega
        animateSkillBars();
    }

    // Adicionar efeito de destaque aos itens de estatísticas
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'translateY(-5px)';
            stat.style.transition = 'transform 0.3s ease';
        });

        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'translateY(0)';
        });
    });
});