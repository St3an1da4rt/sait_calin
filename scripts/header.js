// scripts/header.js - загрузка и управление header

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
        <header>
            <div class="header-container">
                <div class="logo">
                    <i class="fas fa-chalkboard-teacher logo-icon"></i>
                    <h1>Калинин <span>Алексей Владимирович</span></h1>
                </div>
                <nav>
                    <ul id="mainMenu">
                        <li><a href="index.html" class="nav-link" data-page="home">Главная</a></li>
                        <li><a href="#about" class="nav-link" data-page="about">Об учителе</a></li>
                        <li><a href="#experience" class="nav-link" data-page="experience">Опыт</a></li>
                        <li><a href="#education" class="nav-link" data-page="education">Образование</a></li>
                        <li><a href="gallery.html" class="nav-link" data-page="gallery">Фотогалерея</a></li>
                        <li><a href="#contacts" class="nav-link" data-page="contacts">Контакты</a></li>
                    </ul>
                </nav>
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </header>
    `;
}

// Инициализация функционала header
function initHeader() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mainMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Обработка кликов по навигационным ссылкам
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const dataPage = this.getAttribute('data-page');
            
            // Если это якорная ссылка на этой странице
            if (href.startsWith('#') && window.location.pathname.endsWith('index.html')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Плавная прокрутка
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Устанавливаем активную ссылку
                    setActiveNavLink(dataPage);
                    
                    // Закрываем мобильное меню если открыто
                    if (mainMenu && mainMenu.classList.contains('active')) {
                        mainMenu.classList.remove('active');
                        if (mobileMenuBtn) {
                            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            }
            // Если это ссылка на другую страницу (например, gallery.html)
            else if (!href.startsWith('#')) {
                // Переход произойдет автоматически по ссылке
                // Можно добавить анимацию перехода если нужно
            }
        });
    });
    
    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('#mainMenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainMenu && mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// Установка активной навигационной ссылки
function setActiveNavLink(activePage = null) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Если явно указана активная страница
    if (activePage) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === activePage) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    if (currentPath.includes('gallery.html')) {
        const galleryLink = document.querySelector('nav a[data-page="gallery"]');
        if (galleryLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            galleryLink.classList.add('active');
        }
        return;
    }
    
    // Определяем текущую страницу автоматически
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash.substring(1) || 'home';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        const linkPage = link.getAttribute('data-page');
        
        // Если это главная страница
        if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
            // Для якорных ссылок
            if (linkHref === `#${currentHash}`) {
                link.classList.add('active');
            }
            // Для ссылки на главную без якоря
            else if (linkHref === 'index.html' && currentHash === 'home') {
                link.classList.add('active');
            }
        }
        // Если это другая страница (например, gallery.html)
        else if (linkHref === currentPath.split('/').pop()) {
            link.classList.add('active');
        }
    });
}

// Запускаем загрузку header при загрузке страницы
document.addEventListener('DOMContentLoaded', loadHeader);

// Экспортируем функции для использования в других файлах
window.headerModule = {
    loadHeader,
    setActiveNavLink,
    initHeader
};