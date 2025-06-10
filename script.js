// ===== TECWIEWS - JAVASCRIPT OTIMIZADO =====
// Versão final sem duplicações

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initFormHandler();
    initMobileMenu();
    initAnimations();
    initSEOOptimizations();
    initPerformanceOptimizations();
    initAccessibilityEnhancements();
    injectOptimizedStyles();
});

// ===== SEO OPTIMIZATIONS =====
function initSEOOptimizations() {
    monitorWebVitals();
    enhanceStructuredData();
    trackPagePerformance();
}

function monitorWebVitals() {
    if ('PerformanceObserver' in window) {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            trackWebVital('LCP', lastEntry.startTime);
        }).observe({entryTypes: ['largest-contentful-paint']});
        
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                const fid = entry.processingStart - entry.startTime;
                console.log('FID:', fid);
                trackWebVital('FID', fid);
            });
        }).observe({entryTypes: ['first-input']});
        
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
            trackWebVital('CLS', clsValue);
        }).observe({entryTypes: ['layout-shift']});
    }
}

function trackPagePerformance() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
            console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
            trackWebVital('PageLoad', perfData.loadEventEnd - perfData.loadEventStart);
        }, 0);
    });
}

function trackWebVital(name, value) {
    console.log(`${name}: ${value}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'web_vitals', {
            name: name,
            value: Math.round(value),
            custom_parameter: 'tecwiews_performance'
        });
    }
}

function enhanceStructuredData() {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
        }]
    };
    
    addStructuredData(breadcrumbData);
    markPortfolioAsArticles();
}

function addStructuredData(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
}

function markPortfolioAsArticles() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach((card, index) => {
        const title = card.querySelector('h3')?.textContent;
        const description = card.querySelector('.card-summary')?.textContent;
        
        if (title && description) {
            const articleData = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "description": description,
                "author": {
                    "@type": "Organization",
                    "name": "Tecwiews"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Tecwiews"
                }
            };
            
            card.setAttribute('data-structured', JSON.stringify(articleData));
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    initAdvancedLazyLoading();
    optimizeScrollPerformance();
}

function initAdvancedLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.addEventListener('load', function() {
                        this.style.opacity = '1';
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollEffects() {
        initScrollEffects();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibilityEnhancements() {
    enhanceKeyboardNavigation();
    improveFocusManagement();
    addAriaEnhancements();
}

function enhanceKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #F66B0E';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

function improveFocusManagement() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999999;
        padding: 8px 16px;
        background: #F66B0E;
        color: white;
        text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '6px';
        this.style.top = '7px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function addAriaEnhancements() {
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.textContent.trim()) {
            button.setAttribute('aria-label', 'Action button');
        }
    });
    
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                closeMobileMenu();
                trackEvent('Navigation', `Scroll to ${targetId}`);
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(17, 43, 60, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 20px rgba(17, 43, 60, 0.3)';
    } else {
        header.style.background = 'linear-gradient(135deg, #112B3C 0%, #205375 100%)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    updateScrollProgress();
    highlightActiveSection();
}

function updateScrollProgress() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-percent', Math.min(scrollPercent, 100) + '%');
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            trackEvent('Mobile Menu', navMenu.classList.contains('active') ? 'Open' : 'Close');
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

// ===== FORM HANDLER =====
function initFormHandler() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                handleFormSubmission(this);
            }
        });
        
        addRealTimeValidation(contactForm);
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        
        const existingError = fieldGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #F66B0E;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        display: block;
    `;
    
    fieldGroup.appendChild(errorElement);
    field.style.borderColor = '#F66B0E';
}

function addRealTimeValidation(form) {
    const fields = form.querySelectorAll('input, textarea');
    
    fields.forEach(field => {
        field.addEventListener('blur', function() {
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
                this.style.borderColor = '#eee';
            }
        });
        
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

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        trackEvent('Form', 'Contact Form Submitted');
    }, 2000);
}

function showSuccessMessage() {
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
    
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(successDiv, contactForm);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ===== ANIMATIONS =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                trackEvent('Visibility', `Element ${entry.target.className} viewed`);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.service-card, .segment-card, .benefit-item');
    animateElements.forEach(el => observer.observe(el));
}

// ===== MODAL FUNCTIONALITY =====
function openModal(caseId) {
    const modal = document.getElementById(caseId + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        trackEvent('Portfolio', `Case ${caseId} opened`);
        
        if (caseId === 'case3') {
            modal.classList.add('case3-active');
            setTimeout(() => animateCase03Images(), 300);
        }
    }
}

function closeModal(caseId) {
    const modal = document.getElementById(caseId + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        if (caseId === 'case3') {
            modal.classList.remove('case3-active');
        }
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }
}

function animateCase03Images() {
    const case3Images = document.querySelectorAll('#case3Modal .process-step img');
    
    case3Images.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== EVENT LISTENERS =====
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        closeMobileMenu();
    }
});

// ===== ANALYTICS =====
function trackEvent(category, action, label = '') {
    console.log(`Event: ${category} - ${action}${label ? ' - ' + label : ''}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            custom_parameter: 'tecwiews_interaction'
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', {
            category: category,
            action: action,
            label: label
        });
    }
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        trackEvent('CTA', 'Hero Button Click');
    }
    
    if (e.target.classList.contains('submit-btn')) {
        trackEvent('Form', 'Submit Button Click');
    }
    
    if (e.target.closest('.portfolio-card')) {
        const cardTitle = e.target.closest('.portfolio-card').querySelector('h3')?.textContent;
        trackEvent('Portfolio', 'Card Click', cardTitle);
    }
});

// ===== CSS INJECTION =====
function injectOptimizedStyles() {
    const optimizedStyles = document.createElement('style');
    optimizedStyles.textContent = `
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
        
        .skip-link:focus {
            left: 6px !important;
            top: 7px !important;
        }
        
        *:focus-visible {
            outline: 2px solid #F66B0E !important;
            outline-offset: 2px !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(optimizedStyles);
}

// ===== MOBILE OPTIMIZATION =====
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const mobileOptimizations = document.createElement('style');
        mobileOptimizations.textContent = `
            .process-step img {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
            }
            
            .tech-icon {
                animation: none !important;
            }
        `;
        document.head.appendChild(mobileOptimizations);
    }
}

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

// ===== INITIALIZATION =====
window.addEventListener('resize', debounce(optimizeForMobile, 250));
optimizeForMobile();

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
});

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        trackEvent('Page', 'Became Visible');
    } else {
        trackEvent('Page', 'Became Hidden');
    }
});

window.tecwiewsStartTime = window.tecwiewsStartTime || Date.now();
window.addEventListener('beforeunload', function() {
    const timeOnPage = Date.now() - window.tecwiewsStartTime;
    trackEvent('Engagement', 'Time on Page', Math.round(timeOnPage / 1000) + 's');
});

console.log('🚀 Tecwiews - SEO Optimized JavaScript Loaded Successfully!');