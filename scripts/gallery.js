// ===== КОД ДЛЯ ГАЛЕРЕИ =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded');
    
    // Массив фотографий для галереи
    const galleryImages = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Урок физкультуры',
            description: 'Проведение урока по баскетболу в школьном спортивном зале',
            category: 'sport',
            date: '15.03.2024'
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Занятие по ОБЖ',
            description: 'Обучение учащихся оказанию первой медицинской помощи',
            category: 'obzh',
            date: '10.03.2024'
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Спортивные соревнования',
            description: 'Городские соревнования по легкой атлетике',
            category: 'sport',
            date: '05.03.2024'
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Рабочий кабинет',
            description: 'Мой рабочий кабинет с учебными материалами',
            category: 'work',
            date: '28.02.2024'
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Родительское собрание',
            description: 'Встреча с родителями учащихся 10 "Б" класса',
            category: 'events',
            date: '20.02.2024'
        },
        {
            id: 6,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Награждение победителей',
            description: 'Вручение грамот за победу в олимпиаде по ОБЖ',
            category: 'achievements',
            date: '15.02.2024'
        },
        {
            id: 7,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Туристический поход',
            description: 'Осенний поход с учащимися 10 "Б" класса',
            category: 'events',
            date: '05.10.2023'
        },
        {
            id: 8,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Подготовка к соревнованиям',
            description: 'Тренировка баскетбольной команды',
            category: 'sport',
            date: '28.09.2023'
        },
        {
            id: 9,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Урок по безопасности',
            description: 'Практическое занятие по правилам дорожного движения',
            category: 'obzh',
            date: '15.09.2023'
        },
        {
            id: 10,
            src: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            title: 'Методический семинар',
            description: 'Выступление на педагогическом совете',
            category: 'work',
            date: '10.09.2023'
        }
    ];
    
    const galleryContainer = document.querySelector('.gallery-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const shownCount = document.getElementById('shownCount');
    const totalCount = document.getElementById('totalCount');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCategory = document.getElementById('modalCategory');
    const modalDate = document.getElementById('modalDate');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentFilter = 'all';
    let visibleCount = 6;
    let currentImageIndex = 0;
    let filteredImages = [...galleryImages];
    
    // Инициализация галереи
    function initGallery() {
        totalCount.textContent = galleryImages.length;
        filterImages();
        updateGallery();
        setupEventListeners();
    }
    
    // Фильтрация изображений
    function filterImages() {
        if (currentFilter === 'all') {
            filteredImages = [...galleryImages];
        } else {
            filteredImages = galleryImages.filter(image => image.category === currentFilter);
        }
    }
    
    // Обновление галереи
    function updateGallery() {
        galleryContainer.innerHTML = '';
        const imagesToShow = filteredImages.slice(0, visibleCount);
        
        imagesToShow.forEach((image, index) => {
            const galleryItem = createGalleryItem(image, index);
            galleryContainer.appendChild(galleryItem);
        });
        
        shownCount.textContent = Math.min(visibleCount, filteredImages.length);
        
        // Показываем/скрываем кнопку "Загрузить еще"
        if (visibleCount >= filteredImages.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    // Создание элемента галереи
    function createGalleryItem(image, index) {
        const item = document.createElement('div');
        item.className = `gallery-item ${image.category}`;
        item.dataset.index = index;
        
        const categoryLabels = {
            'work': 'Рабочие моменты',
            'sport': 'Спорт',
            'obzh': 'ОБЖ',
            'events': 'Мероприятия',
            'achievements': 'Достижения'
        };
        
        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}" class="gallery-image" loading="lazy">
            <div class="image-overlay">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <div class="category-badge">${categoryLabels[image.category]}</div>
                <p class="image-date">${image.date}</p>
            </div>
        `;
        
        item.addEventListener('click', () => openModal(index));
        
        return item;
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        // Фильтры
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentFilter = button.dataset.filter;
                visibleCount = 6;
                filterImages();
                updateGallery();
            });
        });
        
        // Кнопка "Загрузить еще"
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 6;
            updateGallery();
            
            // Плавная прокрутка к новым элементам
            const newItems = galleryContainer.children;
            if (newItems.length > 6) {
                newItems[newItems.length - 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
        
        // Закрытие модального окна
        closeModal.addEventListener('click', closeModalWindow);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalWindow();
            }
        });
        
        // Навигация в модальном окне
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Закрытие по клавише ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModalWindow();
            }
            if (e.key === 'ArrowLeft' && modal.style.display === 'flex') {
                showPrevImage();
            }
            if (e.key === 'ArrowRight' && modal.style.display === 'flex') {
                showNextImage();
            }
        });
    }
    
    // Открытие модального окна
    function openModal(index) {
        currentImageIndex = parseInt(index);
        const image = filteredImages[currentImageIndex];
        
        modalImage.src = image.src;
        modalImage.alt = image.title;
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
        
        // Категория
        const categoryLabels = {
            'work': 'Рабочие моменты',
            'sport': 'Спорт',
            'obzh': 'ОБЖ',
            'events': 'Мероприятия',
            'achievements': 'Достижения'
        };
        modalCategory.textContent = categoryLabels[image.category];
        modalCategory.className = 'category-badge ' + image.category;
        
        // Дата
        modalDate.textContent = `Дата: ${image.date}`;
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Обновляем состояние кнопок навигации
        updateNavigationButtons();
    }
    
    // Закрытие модального окна
    function closeModalWindow() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Показать предыдущее изображение
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = filteredImages.length - 1;
        }
        const image = filteredImages[currentImageIndex];
        
        modalImage.src = image.src;
        modalImage.alt = image.title;
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
        
        const categoryLabels = {
            'work': 'Рабочие моменты',
            'sport': 'Спорт',
            'obzh': 'ОБЖ',
            'events': 'Мероприятия',
            'achievements': 'Достижения'
        };
        modalCategory.textContent = categoryLabels[image.category];
        modalDate.textContent = `Дата: ${image.date}`;
        
        updateNavigationButtons();
    }
    
    // Показать следующее изображение
    function showNextImage() {
        if (currentImageIndex < filteredImages.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
        }
        const image = filteredImages[currentImageIndex];
        
        modalImage.src = image.src;
        modalImage.alt = image.title;
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
        
        const categoryLabels = {
            'work': 'Рабочие моменты',
            'sport': 'Спорт',
            'obzh': 'ОБЖ',
            'events': 'Мероприятия',
            'achievements': 'Достижения'
        };
        modalCategory.textContent = categoryLabels[image.category];
        modalDate.textContent = `Дата: ${image.date}`;
        
        updateNavigationButtons();
    }
    
    // Обновление состояния кнопок навигации
    function updateNavigationButtons() {
        // В реальном проекте здесь можно добавить анимации перехода
    }
    
    // Инициализация
    initGallery();
    
    console.log('Gallery successfully initialized');
});