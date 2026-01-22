// scripts/gallery.js - функционал для фотогалереи

// Расширенные данные для галереи
const galleryData = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Урок физкультуры',
        description: 'Занятие с учащимися 10 класса по легкой атлетике на школьном стадионе',
        category: 'sport',
        date: 'Сентябрь 2023',
        featured: true
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Соревнования по баскетболу',
        description: 'Городские соревнования среди школ, наша команда заняла первое место',
        category: 'sport',
        date: 'Октябрь 2023',
        featured: true
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Занятие по ОБЖ',
        description: 'Практическое занятие по оказанию первой медицинской помощи',
        category: 'obzh',
        date: 'Ноябрь 2023',
        featured: true
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'День здоровья',
        description: 'Школьное мероприятие "День здоровья" с участием всех классов',
        category: 'events',
        date: 'Сентябрь 2023',
        featured: true
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1519861531473-920034658307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Награждение учащихся',
        description: 'Вручение грамот и медалей за спортивные достижения в учебном году',
        category: 'achievements',
        date: 'Май 2023',
        featured: true
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Подготовка к уроку',
        description: 'Подготовка спортивного инвентаря и оборудования для занятий',
        category: 'work',
        date: 'Август 2023',
        featured: true
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Легкая атлетика',
        description: 'Тренировка по бегу на стадионе с учащимися 9-х классов',
        category: 'sport',
        date: 'Апрель 2023',
        featured: false
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Теория ОБЖ',
        description: 'Изучение правил безопасности и поведения в чрезвычайных ситуациях',
        category: 'obzh',
        date: 'Март 2023',
        featured: false
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Волейбольная секция',
        description: 'Тренировка школьной команды по волейболу в спортивном зале',
        category: 'sport',
        date: 'Февраль 2023',
        featured: false
    },
    {
        id: 10,
        image: 'https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
        title: 'Работа с документацией',
        description: 'Подготовка учебных планов и методических материалов',
        category: 'work',
        date: 'Январь 2023',
        featured: false
    },
    {
        id: 11,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        title: 'Соревнования по плаванию',
        description: 'Школьные соревнования по плаванию в бассейне',
        category: 'sport',
        date: 'Декабрь 2022',
        featured: false
    },
    {
        id: 12,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
        title: 'Урок безопасности',
        description: 'Интерактивный урок по безопасности дорожного движения',
        category: 'obzh',
        date: 'Ноябрь 2022',
        featured: false
    }
];

// Переменные состояния
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 6;
let currentModalIndex = 0;
let filteredData = [];

// Основная функция инициализации
function initGallery() {
    renderGallery();
    setupEventListeners();
    updateCounters();
}

// Рендерим галерею
function renderGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
    // Фильтруем изображения
    filteredData = galleryData.filter(item => {
        if (currentFilter === 'all') return true;
        return item.category === currentFilter;
    });
    
    // Рассчитываем какие элементы показывать
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    const itemsToShow = filteredData.slice(startIndex, endIndex);
    
    // Очищаем контейнер
    galleryContainer.innerHTML = '';
    
    // Добавляем элементы
    itemsToShow.forEach((item, index) => {
        const galleryItem = createGalleryItem(item, index);
        galleryContainer.appendChild(galleryItem);
    });
    
    // Обновляем счетчики
    updateCounters();
    updateLoadMoreButton();
}

// Создаем элемент галереи
function createGalleryItem(item, index) {
    const itemElement = document.createElement('div');
    itemElement.className = 'gallery-item';
    itemElement.setAttribute('data-category', item.category);
    itemElement.setAttribute('data-id', item.id);
    itemElement.style.animationDelay = `${index * 0.1}s`;
    
    // Категория в читаемом виде
    const categoryNames = {
        'work': 'Рабочие моменты',
        'sport': 'Спорт',
        'obzh': 'ОБЖ',
        'events': 'Мероприятия',
        'achievements': 'Достижения'
    };
    
    itemElement.innerHTML = `
        <div class="gallery-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="image-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
        <div class="gallery-info">
            <span class="category-badge ${item.category}">${categoryNames[item.category]}</span>
            <p class="image-date">${item.date}</p>
        </div>
    `;
    
    // Добавляем обработчик клика
    itemElement.addEventListener('click', () => {
        currentModalIndex = filteredData.findIndex(img => img.id === item.id);
        openModal(item);
    });
    
    return itemElement;
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтры
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Обновляем текущий фильтр
            currentFilter = this.getAttribute('data-filter');
            currentPage = 1; // Сбрасываем на первую страницу
            
            // Рендерим заново
            renderGallery();
        });
    });
    
    // Кнопка "Загрузить еще"
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePhotos);
    }
    
    // Навигация в модальном окне
    document.getElementById('prevBtn')?.addEventListener('click', showPrevImage);
    document.getElementById('nextBtn')?.addEventListener('click', showNextImage);
    
    // Закрытие модального окна
    document.querySelector('.close-modal')?.addEventListener('click', closeModal);
    
    // Закрытие модального окна при клике вне его
    document.getElementById('imageModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
}

// Обновление счетчиков
function updateCounters() {
    const shownCount = Math.min(currentPage * itemsPerPage, filteredData.length);
    const totalCount = filteredData.length;
    
    document.getElementById('shownCount').textContent = shownCount;
    document.getElementById('totalCount').textContent = totalCount;
}

// Обновление кнопки "Загрузить еще"
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    const shownItems = Math.min(currentPage * itemsPerPage, filteredData.length);
    
    if (shownItems >= filteredData.length && filteredData.length > 0) {
        loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Все фото загружены';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.7';
        loadMoreBtn.style.cursor = 'default';
        loadMoreBtn.style.transform = 'none';
    } else {
        loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Загрузить еще фото';
        loadMoreBtn.disabled = false;
        loadMoreBtn.style.opacity = '1';
        loadMoreBtn.style.cursor = 'pointer';
    }
}

// Загрузка дополнительных фото
function loadMorePhotos() {
    currentPage++;
    renderGallery();
    
    // Плавная прокрутка к новым элементам
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer && galleryContainer.children.length > itemsPerPage) {
        const lastItem = galleryContainer.children[galleryContainer.children.length - 1];
        setTimeout(() => {
            lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}

// Открытие модального окна
function openModal(item) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalCategory = document.getElementById('modalCategory');
    const modalDate = document.getElementById('modalDate');
    
    if (!modal || !modalImage) return;
    
    // Заполняем модальное окно
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalDate.textContent = item.date;
    
    // Устанавливаем категорию
    const categoryNames = {
        'work': 'Рабочие моменты',
        'sport': 'Спорт',
        'obzh': 'ОБЖ',
        'events': 'Мероприятия',
        'achievements': 'Достижения'
    };
    
    modalCategory.textContent = categoryNames[item.category];
    modalCategory.className = `category-badge ${item.category}`;
    
    // Показываем модальное окно
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Обновляем навигационные кнопки
    updateModalNavigation();
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Показать предыдущее изображение
function showPrevImage() {
    if (filteredData.length === 0) return;
    
    currentModalIndex = (currentModalIndex - 1 + filteredData.length) % filteredData.length;
    openModal(filteredData[currentModalIndex]);
}

// Показать следующее изображение
function showNextImage() {
    if (filteredData.length === 0) return;
    
    currentModalIndex = (currentModalIndex + 1) % filteredData.length;
    openModal(filteredData[currentModalIndex]);
}

// Обновление навигационных кнопок
function updateModalNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (filteredData.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// Запускаем галерею при загрузке страницы
document.addEventListener('DOMContentLoaded', initGallery);