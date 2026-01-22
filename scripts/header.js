// scripts/header.js - загрузка и управление header с разделами сайта

// Функция для загрузки header
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (!headerPlaceholder) {
        console.error('Элемент с id="header-placeholder" не найден');
        return;
    }
    
    // Загружаем header.html из папки partials
    fetch('partials/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Вставляем header
            headerPlaceholder.innerHTML = data;
            
            // ГАРАНТИРУЕМ что меню изначально скрыто
            setTimeout(() => {
                const sectionsContainer = document.getElementById('navSectionsContainer');
                const sectionsToggle = document.getElementById('navSectionsToggle');
                const mainNav = document.querySelector('.main-nav');
                
                if (sectionsContainer) {
                    sectionsContainer.classList.remove('active');
                    sectionsContainer.style.display = 'none';
                    sectionsContainer.style.opacity = '0';
                }
                
                if (sectionsToggle) {
                    sectionsToggle.classList.remove('active');
                }
                
                if (mainNav && window.innerWidth <= 992) {
                    mainNav.classList.remove('active');
                }
            }, 10);
            
            // Инициализируем функционал header
            initHeader();
            
            // Устанавливаем активную ссылку
            setActiveNavLink();
        })
        .catch(error => {
            console.error('Ошибка загрузки header:', error);
            // Fallback header если не удалось загрузить
            headerPlaceholder.innerHTML = createFallbackHeader();
            initHeader();
            setActiveNavLink();
        });
}

// Создаем fallback header на случай ошибки
function createFallbackHeader() {
    return `
        <header class="site-header">
            <div class="header-container">
                <div class="logo">
                    <a href="index.html" class="logo-link" data-target="home">
                        <i class="fas fa-chalkboard-teacher logo-icon"></i>
                        <h1>Калинин <span>Алексей Владимирович</span></h1>
                    </a>
                </div>
                
                <nav class="main-nav">
                    <div class="nav-sections-toggle" id="navSectionsToggle">
                        <i class="fas fa-th"></i>
                        <span>Разделы сайта</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    
                    <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Меню">
                        <i class="fas fa-bars"></i>
                    </button>
                </nav>
            </div>
        </header>
    `;
}

// Инициализация функционала header
function initHeader() {
    console.log('Инициализация header');
    
    // Переключение выпадающего меню "Разделы сайта"
    initSectionsToggle();
    
    // Мобильное меню
    initMobileMenu();
    
    // Навигация по разделам
    initNavigation();
    
    // Закрытие меню при клике вне его
    initCloseOnClickOutside();
    
    // Прокрутка к якорям
    initAnchorScroll();
}

// Переключение выпадающего меню "Разделы сайта"
function initSectionsToggle() {
    const sectionsToggle = document.getElementById('navSectionsToggle');
    const sectionsContainer = document.getElementById('navSectionsContainer');
    
    if (sectionsToggle && sectionsContainer) {
        console.log('Инициализация переключателя разделов');
        
        // ГАРАНТИРУЕМ что меню скрыто при инициализации
        sectionsContainer.classList.remove('active');
        sectionsToggle.classList.remove('active');
        
        sectionsToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            sectionsToggle.classList.toggle('active');
            sectionsContainer.classList.toggle('active');
            
            // Закрываем мобильное меню если оно открыто
            const mobileMenu = document.getElementById('navLinks');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
        
        // Закрытие при клике на раздел
        document.querySelectorAll('.nav-section-item').forEach(item => {
            item.addEventListener('click', function() {
                sectionsToggle.classList.remove('active');
                sectionsContainer.classList.remove('active');
            });
        });
    }
}

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        console.log('Инициализация мобильного меню');
        
        // ГАРАНТИРУЕМ что меню скрыто при инициализации
        mainNav.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (window.innerWidth <= 992) {
                // На мобильных: показываем/скрываем основную навигацию
                mainNav.classList.toggle('active');
                
                // Меняем иконку
                const icon = this.querySelector('i');
                if (mainNav.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
                
                // Закрываем разделы сайта если открыты
                const sectionsContainer = document.getElementById('navSectionsContainer');
                const sectionsToggle = document.getElementById('navSectionsToggle');
                if (sectionsContainer && sectionsContainer.classList.contains('active')) {
                    sectionsContainer.classList.remove('active');
                    if (sectionsToggle) sectionsToggle.classList.remove('active');
                }
            } else {
                // На десктопе: показываем/скрываем быструю навигацию
                if (navLinks) {
                    navLinks.classList.toggle('active');
                }
            }
        });
    }
}

// Навигация по разделам
function initNavigation() {
    // Обработка кликов по разделам сайта
    document.querySelectorAll('.nav-section-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const target = this.getAttribute('data-target');
            
            if (target === 'gallery') {
                // Переход на страницу галереи
                window.location.href = 'gallery.html';
                return;
            }
            
            if (target === 'home') {
                // Переход на главную
                window.location.href = 'index.html';
                return;
            }
            
            // Для якорных ссылок на этой странице
            e.preventDefault();
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                // Плавная прокрутка к секции
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Устанавливаем активную ссылку
                setActiveNavLink(target);
                
                // Закрываем все меню
                closeAllMenus();
            }
        });
    });
    
    // Обработка кликов по быстрой навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('data-target');
            
            if (target === 'gallery') {
                window.location.href = 'gallery.html';
                return;
            }
            
            if (target === 'home') {
                window.location.href = 'index.html';
                return;
            }
            
            e.preventDefault();
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                setActiveNavLink(target);
                closeAllMenus();
            }
        });
    });
}

// Закрытие всех меню
function closeAllMenus() {
    // Закрываем разделы сайта
    const sectionsContainer = document.getElementById('navSectionsContainer');
    const sectionsToggle = document.getElementById('navSectionsToggle');
    if (sectionsContainer && sectionsContainer.classList.contains('active')) {
        sectionsContainer.classList.remove('active');
        if (sectionsToggle) sectionsToggle.classList.remove('active');
    }
    
    // Закрываем мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.getElementById('navLinks');
    
    if (window.innerWidth <= 992) {
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
    } else {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
}

// Закрытие меню при клике вне его
function initCloseOnClickOutside() {
    document.addEventListener('click', function(e) {
        const sectionsContainer = document.getElementById('navSectionsContainer');
        const sectionsToggle = document.getElementById('navSectionsToggle');
        const mainNav = document.querySelector('.main-nav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        // Закрываем разделы сайта при клике вне их
        if (sectionsContainer && sectionsContainer.classList.contains('active')) {
            if (!sectionsContainer.contains(e.target) && !sectionsToggle.contains(e.target)) {
                sectionsContainer.classList.remove('active');
                if (sectionsToggle) sectionsToggle.classList.remove('active');
            }
        }
        
        // Закрываем мобильное меню при клике вне его
        if (window.innerWidth <= 992 && mainNav && mainNav.classList.contains('active')) {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                }
            }
        }
    });
}

// Прокрутка к якорям
function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && !href.includes('.html')) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                setActiveNavLink(targetId);
                closeAllMenus();
            }
        });
    });
}

// Установка активной навигационной ссылки
function setActiveNavLink(activeSection = null) {
    const navLinks = document.querySelectorAll('.nav-link, .nav-section-item');
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash.substring(1) || 'home';
    
    // Если явно указана активная секция
    if (activeSection) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTarget = link.getAttribute('data-target');
            
            if (linkTarget === activeSection) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    // Автоматическое определение активной секции
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkTarget = link.getAttribute('data-target');
        
        // Если это страница галереи
        if (currentPath.includes('gallery.html') && linkTarget === 'gallery') {
            link.classList.add('active');
            return;
        }
        
        // Если это главная страница
        if ((currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) && 
            !currentPath.includes('gallery.html')) {
            
            if (linkTarget === currentHash) {
                link.classList.add('active');
            } else if (currentHash === '' && linkTarget === 'home') {
                link.classList.add('active');
            }
        }
    });
}

// Подсветка активной секции при прокрутке
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return;
    
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
        
        // Обновляем навигацию только на главной странице
        if (!window.location.pathname.includes('gallery.html')) {
            setActiveNavLink(current);
        }
    });
}

// Запускаем загрузку header при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загрузка header...');
    loadHeader();
    
    // Инициализируем scroll spy после загрузки header
    setTimeout(() => {
        initScrollSpy();
    }, 100);
});

// Экспортируем функции для использования в других файлах
window.headerModule = {
    loadHeader,
    setActiveNavLink,
    initScrollSpy,
    closeAllMenus
};