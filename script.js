// ===== CONFIGURAÇÕES GLOBAIS =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades quando a página carrega
    initNavigation();
    initScrollEffects();
    initFormHandler();
    initMobileMenu();
    initAnimations();
});

// ===== NAVEGAÇÃO SUAVE =====
function initNavigation() {
    // Seleciona todos os links que começam com #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Impede comportamento padrão
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcula posição considerando header fixo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Scroll suave até a seção
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha menu mobile se estiver aberto
                closeMobileMenu();
            }
        });
    });
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Efeito no header - muda transparência
        if (scrollY > 100) {
            header.style.background = 'rgba(17, 43, 60, 0.95)'; // #112B3C com transparência
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(17, 43, 60, 0.3)';
        } else {
            header.style.background = 'linear-gradient(135deg, #112B3C 0%, #205375 100%)';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        // Destaca link ativo na navegação
        highlightActiveSection();
    });
}

// ===== DESTAQUE DO LINK ATIVO =====
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100; // Offset para header
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Verifica se estamos na seção atual
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove classe active de todos os links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Adiciona classe active no link correspondente
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ===== MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle do menu mobile
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Previne scroll do body quando menu está aberto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== FORMULÁRIO DE CONTATO =====
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede envio padrão
            
            // Valida formulário
            if (validateForm(this)) {
                // Simula envio (aqui você conectaria com backend)
                handleFormSubmission(this);
            }
        });
        
        // Adiciona validação em tempo real
        addRealTimeValidation(contactForm);
    }
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        
        // Remove mensagens de erro anteriores
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validação específica por tipo
        if (!value) {
            showFieldError(field, 'Este campo é obrigatório');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Email inválido');
            isValid = false;
        }
    });
    
    return isValid;
}

// ===== VALIDAÇÃO DE EMAIL =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== EXIBIR ERRO NO CAMPO =====
function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#F66B0E'; // Cor laranja da marca
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.5rem';
    errorElement.style.display = 'block';
    
    fieldGroup.appendChild(errorElement);
    field.style.borderColor = '#F66B0E';
}

// ===== VALIDAÇÃO EM TEMPO REAL =====
function addRealTimeValidation(form) {
    const fields = form.querySelectorAll('input, textarea');
    
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            // Valida quando o campo perde foco
            const fieldGroup = this.closest('.form-group');
            const existingError = fieldGroup.querySelector('.error-message');
            
            if (existingError) {
                existingError.remove();
            }
            
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'Este campo é obrigatório');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Email inválido');
            } else {
                // Remove estilo de erro se campo está válido
                this.style.borderColor = '#eee';
            }
        });
        
        // Remove erro ao começar a digitar
        field.addEventListener('input', function() {
            const fieldGroup = this.closest('.form-group');
            const existingError = fieldGroup.querySelector('.error-message');
            
            if (existingError) {
                existingError.remove();
                this.style.borderColor = '#eee';
            }
        });
    });
}

// ===== MANIPULAR ENVIO DO FORMULÁRIO =====
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Inicializa EmailJS
    emailjs.init('bltMU_I6wB5FoIsez');
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    const templateParams = {
        from_name: form.name.value,
        from_email: form.email.value,
        company: form.company.value || 'Não informado',
        phone: form.phone.value || 'Não informado',
        service: form.service.value || 'Não selecionado',
        message: form.message.value
    };
    
    emailjs.send('service_crpsmtt', 'template_ss2qg6n', templateParams)
        .then(() => {
            showSuccessMessage();
            form.reset();
        })
        .catch(() => {
            alert('Erro no envio. Tente novamente.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// ===== MENSAGEM DE SUCESSO =====
function showSuccessMessage() {
    // Cria elemento de sucesso
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="
            background: linear-gradient(45deg, #205375, #112B3C);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            margin: 1rem 0;
            text-align: center;
            box-shadow: 0 4px 15px rgba(32, 83, 117, 0.3);
        ">
            ✅ Mensagem enviada com sucesso! Retornaremos em breve.
        </div>
    `;
    
    // Insere antes do formulário
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(successDiv, contactForm);
    
    // Remove após 5 segundos
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ===== ANIMAÇÕES DE ENTRADA =====
function initAnimations() {
    // Observer para animações ao entrar na tela
    const observerOptions = {
        threshold: 0.1, // Ativa quando 10% do elemento está visível
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem animar
    const animateElements = document.querySelectorAll('.service-card, .segment-card, .benefit-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== UTILITÁRIOS =====

// Debounce para otimizar eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce no scroll
window.addEventListener('scroll', debounce(function() {
    // Funções que precisam de debounce
    highlightActiveSection();
}, 10));

// ===== INTEGRAÇÃO COM WHATSAPP =====
function openWhatsApp(message = '') {
    const phone = '5531999999999'; // Substitua pelo número real
    const defaultMessage = 'Olá! Gostaria de saber mais sobre os serviços da Tecwiews.';
    const finalMessage = message || defaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}

// ===== ANALYTICS E TRACKING =====
function trackEvent(action, category = 'General') {
    // Integração com Google Analytics ou similar
    console.log(`Event tracked: ${category} - ${action}`);
    
    // Exemplo de integração com GA4:
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: window.location.pathname
    // });
}

// Track clicks nos botões importantes
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        trackEvent('CTA_Click', 'Hero');
    }
    
    if (e.target.classList.contains('submit-btn')) {
        trackEvent('Form_Submit', 'Contact');
    }
});

// ===== PERFORMANCE E SEO =====

// Lazy loading para imagens (quando adicionar)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.href = 'styles.css';
    criticalCSS.as = 'style';
    document.head.appendChild(criticalCSS);
}

// ===== ACESSIBILIDADE =====

// Navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC fecha menu mobile
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Enter em elementos focáveis
    if (e.key === 'Enter' && e.target.classList.contains('nav-link')) {
        e.target.click();
    }
});

// Foco visível para navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ===== FEEDBACK VISUAL =====

// Adiciona classe para links ativos
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #F66B0E !important;
        font-weight: 600;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #F66B0E;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

// Fecha menu ao clicar no link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
});