// ========== СОБЫТИЯ (СЛАЙДЕР) ==========
const events = [
    { img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', date: 'APRIL 15, 20:00', title: 'Jazz Night', desc: 'An atmospheric evening with the best jazz standards.', price: 'Entry 1500 RUB' },
    { img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', date: 'APRIL 22, 19:30', title: 'Soul & Blues', desc: 'Deep voice and guitar. Immerse yourself in blues.', price: 'Entry 2000 RUB' },
    { img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', date: 'APRIL 30, 21:00', title: 'DJ Set', desc: 'A dance evening with the best DJs in Moscow.', price: 'Entry 1000 RUB' }
];

function loadEvents() {
    const slider = document.getElementById('eventsSlider');
    if (!slider) return;
    slider.innerHTML = '';
    events.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <img src="${ev.img}" alt="${ev.title}">
            <div class="event-info">
                <div class="event-date">${ev.date}</div>
                <h3>${ev.title}</h3>
                <p class="event-desc">${ev.desc}</p>
                <p class="event-price">${ev.price}</p>
                <button class="book-event book-event-btn">Book ticket</button>
            </div>
        `;
        slider.appendChild(card);
    });
    document.querySelectorAll('.book-event-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('bookingModal').style.display = 'flex';
        });
    });
}

// ========== СКРОЛЛ ШАПКИ ==========
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// ========== МОДАЛЬНОЕ ОКНО ==========
const modal = document.getElementById('bookingModal');
const openBtns = [
    document.getElementById('openModalBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('heroOpenModalBtn')
];
const closeBtn = document.querySelector('.close-modal');

openBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) modal.style.display = 'flex';
    });
});

if (closeBtn) closeBtn.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

const form = document.getElementById('bookingForm');
if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами для подтверждения.');
    if (modal) modal.style.display = 'none';
    form.reset();
});

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === 'javascript:void(0)') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== СЛАЙДЕР (DRAG TO SCROLL) ==========
const slider = document.getElementById('eventsSlider');
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

loadEvents();

// ========== БУРГЕР-МЕНЮ (ГЛАВНЫЙ ОБРАБОТЧИК) ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('mobile-hamburger');
    const menu = document.getElementById('main-menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// ========== ПЛОЩАДКИ - ДАННЫЕ И ФИЛЬТРАЦИЯ ==========
const venuesData = [
    { name: "ПРОСТРАНСТВО «AMNESIA»", img: "img/venues/amnesia.jpg", type: "loft", capacity: 500, desc: "Уникальный двухъярусный комплекс площадью 1200 кв. м. под Петербургом" },
    { name: "Лофт «Пальма»", img: "img/venues/palmtree.jfif", type: "loft", capacity: 250, desc: "Старинный особняк «Пальма» — творческое пространство в самом центре Петербурга" },
    { name: "Пространство «БРУСНИЦЫН ХОЛЛ»", img: "img/venues/brusnitsyn.jpg", type: "loft", capacity: 350, desc: "Многофункциональная площадка" },
    { name: "Загородный клуб «Стеклянный»", img: "img/venues/glass3.jpeg", type: "tent", capacity: 300, desc: "Активный отдых и релакс в окружении природы" },
    { name: "Клуб загородного отдыха «Северный Берег»", img: "img/venues/northernshore.jpg", type: "tent", capacity: 40, desc: "Отдых на берегу озера Хепоярви" },
    { name: "Парк «Зубровник»", img: "img/venues/zubrovnik.jpg", type: "tent", capacity: 250, desc: "Эко-парк с зубрами" },
    { name: "Крепость «Орешек»", img: "img/venues/nut.jpg", type: "tent", capacity: 150, desc: "Квест в старинной крепости" },
    { name: "Центр активного отдыха «Изумрудное озеро»", img: "img/venues/emeraldlake.jpg", type: "terrace", capacity: 35, desc: "Центр активного отдыха" },
    { name: "Хорошее место!", img: "img/venues/goodplace.jpg", type: "tent", capacity: 15, desc: "Хорошее место для хороших людей" },
    { name: "Центр активного отдыха «Илоранта»", img: "img/venues/iloranta.jpg", type: "terrace", capacity: 70, desc: "Берег радости" },
    { name: "Загородная площадка «В Кругу своих»", img: "img/venues/v-krugu-svoih.jpg", type: "tent", capacity: 30, desc: "Уютные праздники у костра" }
];

const venuesGrid = document.getElementById('venuesGrid');
const noResults = document.getElementById('noResults');
const guestsSlider = document.getElementById('guests-slider');
const guestsValue = document.getElementById('guests-value');
let currentTypeFilter = 'all';
let currentGuestsFilter = 10;

function renderVenues() {
    if (!venuesGrid) return;
    
    const filtered = venuesData.filter(venue => {
        if (currentTypeFilter !== 'all' && venue.type !== currentTypeFilter) return false;
        if (venue.capacity < currentGuestsFilter) return false;
        return true;
    });
    
    if (filtered.length === 0) {
        venuesGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    venuesGrid.style.display = 'grid';
    if (noResults) noResults.style.display = 'none';
    
    venuesGrid.innerHTML = filtered.map(venue => {
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
                    <div class="venue-capacity">👥 до ${venue.capacity} гостей</div>
                    <p class="venue-desc">${venue.desc}</p>
                    <button class="btn-outline">Подробнее</button>
                </div>
            </div>
        `;
    }).join('');
}

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

document.addEventListener('DOMContentLoaded', renderVenues);

// ========== СТРАНИЦА БАНКЕТА - ТАБЫ ==========
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                tabContents.forEach(content => content.classList.remove('active'));
                const tabId = this.dataset.tab;
                const activeTab = document.getElementById(`tab-${tabId}`);
                if (activeTab) activeTab.classList.add('active');
            });
        });
    }
    
    const cateringIcons = document.querySelectorAll('.catering-icon');
    if (cateringIcons.length > 0) {
        cateringIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                cateringIcons.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});

// ========== ПАРТНЁРЫ ==========
const partnersData = [
    {
        id: "partner1",
        name: "ZaSov",
        img: "img/partners/zasov.jpg",
        desc: "ZaSov - квесты в реальности.",
        fullDesc: "<p>Лучшие квесты и игры СПб по рейтингу экспертов!</p>",
        address: "Санкт-Петербург, Ораниенбаумская улица, проспект Энгельса, 126к1",
        phone: "+7 (921) 763-81-33",
        email: "povodest@yandex.ru",
        website: "za-sov.su"
    },
    {
        id: "partner2",
        name: "ДИКИЙ ДЫМ – WILD SMOKE",
        img: "img/partners/partner2.jpg",
        desc: "БУРГЕРНАЯ | МЯСО ИЗ СМОКЕРА",
        fullDesc: "<p>Собственное производство мяса, техасский смокер и барбекю</p>",
        address: "д. Энколово, Лазурная 1",
        phone: "+7 (921) 763-81-33",
        email: "povodest@yandex.ru",
        website: "vk.com/wild_smoke_ohta"
    },
    {
        id: "partner3",
        name: "Золотой ключ и Ко",
        img: "img/partners/partner3.jpg",
        desc: "Организация мероприятий",
        fullDesc: "<p>Организует корпоративные мероприятия, тимбилдинг, квесты</p>",
        address: "Санкт-Петербург, ул. Восстания 40/18",
        phone: "+7 (921) 763-81-33",
        email: "povodest@yandex.ru",
        website: "openkey.spb.ru/"
    }
];

function renderPartners() {
    const partnersGrid = document.getElementById('partnersGrid');
    if (!partnersGrid) return;
    
    partnersGrid.innerHTML = partnersData.map(partner => `
        <div class="partner-card" onclick="window.location.href='partner-detail.html?id=${partner.id}'">
            <div class="partner-img" style="background-image: url('${partner.img}')"></div>
            <div class="partner-content">
                <h3>${partner.name}</h3>
                <p class="partner-desc">${partner.desc}</p>
                <button class="btn-outline">Подробнее</button>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderPartners);

// ========== БУРГЕР-МЕНЮ (МОБИЛЬНАЯ ВЕРСИЯ) ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('mobile-hamburger');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    
    if (hamburger && mobileMenu) {
        // Открытие/закрытие мобильного меню
        hamburger.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        };
        
        // Закрытие при клике на ссылку
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.onclick = function() {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            };
        });
        
        // Закрытие при клике вне меню
        document.onclick = function(e) {
            if (mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        };
    }
});