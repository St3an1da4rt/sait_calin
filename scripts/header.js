// ===== КОД ДЛЯ HEADER =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Header script loaded');
    
    const header = document.querySelector('.site-header');
    const navSectionsToggle = document.getElementById('navSectionsToggle');
    const navSectionsContainer = document.getElementById('navSectionsContainer');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelectorAll('.nav-link, .nav-section-item');
    
    // Создаем мобильное меню
    function createMobileMenu() {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.id = 'mobileNav';
        
        const mobileLinks = document.createElement('ul');
        mobileLinks.className = 'mobile-nav-links';
        
        const linksData = [
            { href: 'index.html', icon: 'home', text: 'Главная' },
            { href: 'about.html', icon: 'user-tie', text: 'Подробные сведения' },
            { href: 'index.html#pedagogical-results', icon: 'chart-line', text: 'Достижения' },
            { href: 'index.html#methodology', icon: 'book-open', text: 'Методические разработки' },
            { href: 'index.html#classroom', icon: 'users', text: 'Классное руководство' },
            { href: 'bullying.html', icon: 'user-friends', text: 'булинг' },
            { href: 'index.html#students', icon: 'graduation-cap', text: 'Для учащихся' },
            { href: 'index.html#parents', icon: 'user-friends', text: 'Для родителей' },
            { href: 'gallery.html', icon: 'images', text: 'Фотогалерея' },
            { href: 'index.html#contacts', icon: 'address-book', text: 'Контакты' }
        ];
        
        linksData.forEach(linkData => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = linkData.href;
            a.className = 'mobile-nav-link';
            
            a.innerHTML = `
                <i class="fas fa-${linkData.icon}"></i>
                <span>${linkData.text}</span>
            `;
            
            a.addEventListener('click', function(e) {
                if (linkData.href.startsWith('#')) {
                    e.preventDefault();
                    const sectionId = linkData.href.substring(1);
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const headerHeight = header.offsetHeight;
                        const sectionTop = section.offsetTop - headerHeight - 20;
                        window.scrollTo({
                            top: sectionTop,
                            behavior: 'smooth'
                        });
                    }
                }
                closeMobileMenu();
            });
            
            li.appendChild(a);
            mobileLinks.appendChild(li);
        });
        
        mobileNav.appendChild(mobileLinks);
        header.after(mobileNav);
        
        return mobileNav;
    }
    
    let mobileNav = createMobileMenu();
    
    // Открытие/закрытие меню разделов
    if (navSectionsToggle && navSectionsContainer) {
        console.log('Найдены элементы меню разделов');
        
        navSectionsToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Клик по кнопке "Разделы сайта"');
            this.classList.toggle('active');
            navSectionsContainer.classList.toggle('active');
        });
        
        // Закрытие меню разделов при клике вне его
        document.addEventListener('click', function(e) {
            if (!navSectionsContainer.contains(e.target) && !navSectionsToggle.contains(e.target)) {
                navSectionsToggle.classList.remove('active');
                navSectionsContainer.classList.remove('active');
            }
        });
        
        // Закрытие меню разделов при клике на ссылку внутри
        navSectionsContainer.addEventListener('click', function(e) {
            if (e.target.closest('.nav-section-item')) {
                navSectionsToggle.classList.remove('active');
                navSectionsContainer.classList.remove('active');
            }
        });
    } else {
        console.log('Элементы меню разделов не найдены');
    }
    
    // Открытие/закрытие мобильного меню
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    function openMobileMenu() {
        mobileNav.classList.add('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Закрыть меню');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Открыть меню');
        document.body.style.overflow = '';
    }
    
    // Обработка ссылок навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    const headerHeight = header.offsetHeight;
                    const sectionTop = section.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: sectionTop,
                        behavior: 'smooth'
                    });
                    
                    // Обновляем активную ссылку
                    updateActiveLink(sectionId);
                }
            }
        });
    });
    
    // Обновление активной ссылки
    function updateActiveLink(activeSectionId) {
        // Обновляем десктопные ссылки
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            const linkTarget = link.getAttribute('data-target');
            
            if ((linkHref && linkHref === `#${activeSectionId}`) || 
                (linkTarget && linkTarget === activeSectionId)) {
                link.classList.add('active');
            }
        });
        
        // Обновляем мобильные ссылки
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Обновление активной ссылки при скролле
    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.id;
            }
        });
        
        if (currentSection) {
            updateActiveLink(currentSection);
        } else if (window.scrollY < 100) {
            updateActiveLink('home');
        }
    }
    
    // Инициализация активной ссылки
    function initActiveLink() {
        if (window.location.hash) {
            const sectionId = window.location.hash.substring(1);
            updateActiveLink(sectionId);
        } else {
            updateActiveLink('home');
        }
    }
    
    // Запуск инициализации
    initActiveLink();
    
    // Обновление активной ссылки при скролле
    window.addEventListener('scroll', updateActiveLinkOnScroll);
    
    // Закрытие меню при клике вне его (для мобильного меню)
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    console.log('Header успешно инициализирован');
});