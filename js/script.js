// ========== МОДАЛЬНОЕ ОКНО ==========
const modal = document.getElementById('bookingModal');
const openBtns = [
    document.getElementById('heroOpenModalBtn'),
    document.getElementById('openModalBtn')
];
const closeBtn = document.querySelector('.close-modal');

if (openBtns) {
    openBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) modal.style.display = 'flex';
            });
        }
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

const form = document.getElementById('bookingForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Мы свяжемся с вами для подтверждения.');
        if (modal) modal.style.display = 'none';
        form.reset();
    });
}

// ========== БУРГЕР-МЕНЮ (ИСПРАВЛЕННЫЙ) ==========
const hamburger = document.getElementById('mobile-hamburger');
const mobileMenu = document.getElementById('mobile-menu-overlay');

if (hamburger && mobileMenu) {
    // Открытие/закрытие по клику на бургер
    hamburger.onclick = function(e) {
        e.stopPropagation();
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
        } else {
            mobileMenu.classList.add('active');
            this.classList.add('active');
        }
    };
    
    // Закрываем меню при клике на любую ссылку внутри
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.onclick = () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        };
    });
    
    // Закрываем меню при клике вне его
    document.onclick = function(e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    };
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === 'javascript:void(0)') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Закрываем мобильное меню
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// ========== СКРОЛЛ ШАПКИ ==========
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = '#0a0a0a';
        nav.style.backdropFilter = 'none';
    }
});

// ========== ПЛОЩАДКИ - ДАННЫЕ И ФИЛЬТРАЦИЯ ==========

// Данные площадок
const venuesData = [
    {
        name: "ПРОСТРАНСТВО «AMNESIA»",
        img: "img/venues/amnesia.jpg",
        type: "loft",
        capacity: 500,
        desc: "Уникальный двухъярусный комплекс площадью 1200 кв. м. под Петербургом"
    },
    {
        name: "Лофт «Пальма»",
        img: "img/venues/palmtree.jfif",
        type: "loft",
        capacity: 250,
        desc: "Старинный особняк «Пальма» — творческое пространство в самом центре Петербурга"
    },
    {
        name: "Пространство «БРУСНИЦЫН ХОЛЛ»",
        img: "img/venues/brusnitsyn.jpg",
        type: "loft",
        capacity: 350,
        desc: "Многофункциональная площадка для организации событий разного масштаба"
    },
    {
        name: "Загородный клуб «Стеклянный»",
        img: "img/venues/glass3.jpeg",
        type: "tent",
        capacity: 300,
        desc: "Активный отдых и релакс в окружении природы"
    },
    {
        name: "Клуб загородного отдыха «Северный Берег»",
        img: "img/venues/northernshore.jpg",
        type: "tent",
        capacity: 40,
        desc: "Отдых на берегу живописного озера Хепоярви в Токсово"
    },
    {
        name: "Парк «Зубровник»",
        img: "img/venues/zubrovnik.jpg",
        type: "tent",
        capacity: 250,
        desc: "Эко-парк с зубрами рядом с Петербургом"
    },
    {
        name: "Крепость «Орешек»",
        img: "img/venues/nut.jpg",
        type: "tent",
        capacity: 150,
        desc: "Незабываемый квест в старинной крепости"
    },
    {
        name: "Центр активного отдыха «Изумрудное озеро»",
        img: "img/venues/emeraldlake.jpg",
        type: "terrace",
        capacity: 35,
        desc: "Изумрудное озеро — центр активного отдыха"
    },
    {
        name: "Хорошее место!",
        img: "img/venues/goodplace.jpg",
        type: "tent",
        capacity: 15,
        desc: "Хорошее место для хороших людей"
    },
    {
        name: "Центр активного отдыха «Илоранта»",
        img: "img/venues/iloranta.jpg",
        type: "terrace",
        capacity: 70,
        desc: "В переводе с финского «Илоранта» означает Берег радости"
    },
    {
        name: "Загородная площадка «В Кругу своих»",
        img: "img/venues/v-krugu-svoih.jpg",
        type: "tent",
        capacity: 30,
        desc: "Самые лучшие моменты своей жизни мы разделяем с близкими"
    }
];

// DOM элементы для площадок
const venuesGrid = document.getElementById('venuesGrid');
const noResults = document.getElementById('noResults');
const guestsSlider = document.getElementById('guests-slider');
const guestsValue = document.getElementById('guests-value');

let currentTypeFilter = 'all';
let currentGuestsFilter = 10;

// Функция отображения площадок
function renderVenues() {
    if (!venuesGrid) return;
    
    // Фильтрация
    const filtered = venuesData.filter(venue => {
        if (currentTypeFilter !== 'all' && venue.type !== currentTypeFilter) return false;
        if (venue.capacity < currentGuestsFilter) return false;
        return true;
    });
    
    // Показываем сообщение, если ничего не найдено
    if (filtered.length === 0) {
        venuesGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    venuesGrid.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
    
    // Отображаем карточки
    venuesGrid.innerHTML = filtered.map(venue => {
        // Определяем ID для ссылки
        let venueId = '';
        const name = venue.name.toLowerCase();
        if (name.includes('amnesia')) venueId = 'amnesia';
        else if (name.includes('пальма')) venueId = 'palma';
        else if (name.includes('брусницын')) venueId = 'brusnitsyn';
        else if (name.includes('стеклянный')) venueId = 'glass';
        else if (name.includes('северный берег')) venueId = 'northernshore';
        else if (name.includes('зубровник')) venueId = 'zubrovnik';
        else if (name.includes('орешек')) venueId = 'oreshek';
        else if (name.includes('изумрудное')) venueId = 'emeraldlake';
        else if (name.includes('хорошее место')) venueId = 'goodplace';
        else if (name.includes('илоранта')) venueId = 'iloranta';
        else if (name.includes('в кругу своих')) venueId = 'v-krugu-svoih';
        else venueId = 'amnesia';
        
        return `
            <div class="venue-card" onclick="window.location.href='area-detail.html?id=${venueId}'" style="cursor: pointer;">
                <div class="venue-img" style="background-image: url('${venue.img}')"></div>
                <div class="venue-content">
                    <h3>${venue.name}</h3>
                    <div class="venue-capacity">
                        <span>👥</span> до ${venue.capacity} гостей
                    </div>
                    <p class="venue-desc">${venue.desc}</p>
                    <button class="btn-outline">Подробнее</button>
                </div>
            </div>
        `;
    }).join('');
}

// Обработчики фильтров
const filterChips = document.querySelectorAll('.filter-chip');
if (filterChips.length > 0) {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentTypeFilter = chip.dataset.filter;
            renderVenues();
        });
    });
}

if (guestsSlider) {
    guestsSlider.addEventListener('input', function(e) {
        currentGuestsFilter = parseInt(e.target.value);
        if (guestsValue) guestsValue.textContent = currentGuestsFilter;
        renderVenues();
    });
}

// Запуск фильтрации при загрузке страницы
document.addEventListener('DOMContentLoaded', renderVenues);