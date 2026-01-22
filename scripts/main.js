// Простой JavaScript для index.html
document.addEventListener('DOMContentLoaded', function() {
    console.log('Главная страница загружена');
    
    // Навигация по вкладкам
    initTabsNavigation();
    
    // Форма контактов
    initContactForm();
    
    // Прокрутка при загрузке с якорем
    initAnchorScroll();
    
    // Подсветка активной секции при прокрутке
    initScrollSpy();
});

// Навигация по вкладкам
function initTabsNavigation() {
    const tabs = document.querySelectorAll('.tab[data-page]');
    console.log('Найдено вкладок:', tabs.length);
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const pageUrl = this.getAttribute('data-page');
            console.log('Клик по вкладке:', pageUrl);
            
            // Эффект нажатия
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (pageUrl.includes('.html')) {
                    // Переход на отдельную страницу (галерея)
                    window.location.href = pageUrl;
                } else {
                    // Якорная ссылка на этой странице
                    const targetSection = document.getElementById(pageUrl);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            }, 150);
            
            // Сбрасываем трансформацию
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Доступность
        tab.setAttribute('role', 'button');
        tab.setAttribute('tabindex', '0');
        
        tab.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Форма контактов
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
            this.reset();
        });
    }
}

// Прокрутка при загрузке с якорем
function initAnchorScroll() {
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

// Подсветка активной секции при прокрутке
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        // Обновляем навигацию в header
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === 'home' && link.getAttribute('href') === 'index.html#home')) {
                link.classList.add('active');
            }
        });
    });
}