    const events = [
        { img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', date: 'APRIL 15, 20:00', title: 'Jazz Night', desc: 'An atmospheric evening with the best jazz standards.', price: 'Entry 1500 RUB' },
        { img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', date: 'APRIL 22, 19:30', title: 'Soul & Blues', desc: 'Deep voice and guitar. Immerse yourself in blues.', price: 'Entry 2000 RUB' },
        { img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', date: 'APRIL 30, 21:00', title: 'DJ Set', desc: 'A dance evening with the best DJs in Moscow.', price: 'Entry 1000 RUB' }
    ];

    function loadEvents() {
        const slider = document.getElementById('eventsSlider');
        if(!slider) return;
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

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if(window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    const mobileBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const modal = document.getElementById('bookingModal');
    const openBtns = [document.getElementById('openModalBtn'), document.getElementById('heroBookBtn')];
    const closeBtn = document.querySelector('.close-modal');

    openBtns.forEach(btn => {
        if(btn) btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    });
    if(closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

    const form = document.getElementById('bookingForm');
    if(form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! We will contact you to confirm your reservation.');
        modal.style.display = 'none';
        form.reset();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if(navLinks.classList.contains('active')) navLinks.classList.remove('active');
            }
        });
    });

    const slider = document.getElementById('eventsSlider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if(slider) {
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
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    loadEvents();
// ========== РАБОТА НОВОГО МЕНЮ ==========

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('mobile-hamburger');
    const menu = document.getElementById('main-menu');
    const subMenuBlocks = document.querySelectorAll('.sub_menu_block');
    
    // Открытие/закрытие бургер-меню
    if (hamburger && menu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Для мобильной версии: открытие подменю по клику
    function checkMobile() {
        if (window.innerWidth <= 768) {
            subMenuBlocks.forEach(block => {
                const link = block.querySelector('> a');
                
                // Удаляем старый обработчик, чтобы не дублировать
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);
                
                newLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Закрываем все другие подменю
                    subMenuBlocks.forEach(b => {
                        if (b !== block) {
                            b.classList.remove('active');
                        }
                    });
                    
                    // Открываем/закрываем текущее
                    block.classList.toggle('active');
                });
            });
        } else {
            // На компьютере убираем классы active
            subMenuBlocks.forEach(block => {
                block.classList.remove('active');
            });
        }
    }
    
    // Запускаем при загрузке и при изменении размера окна
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Закрываем меню при клике вне его
    document.addEventListener('click', function(e) {
        if (menu && hamburger) {
            if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
                subMenuBlocks.forEach(block => {
                    block.classList.remove('active');
                });
            }
        }
    });
});

// ========== ПЛОЩАДКИ - ДАННЫЕ И ФИЛЬТРАЦИЯ AREAS ==========

// Данные площадок (замените на свои)
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
        desc: "Старинный особняк «Пальма» — творческое пространство в самом центре Петербурга, вблизи Коломны."
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
        desc: "Активный отдых и релакс в окружении природы, всего в 40 минутах езды от Санкт-Петербурга"
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
        desc: "Изумрудное озеро — центр активного отдыха, где можно провести идеальный день на природе."
    },
    {
        name: "Хорошее место!",
        img: "img/venues/tent.jpg",
        type: "tent",
        capacity: 150,
        desc: "Хорошее место для хороших людей"
    }
];

// DOM элементы
const venuesGrid = document.getElementById('venuesGrid');
const noResults = document.getElementById('noResults');
const guestsSlider = document.getElementById('guests-slider');
const guestsValue = document.getElementById('guests-value');
let currentTypeFilter = 'all';
let currentGuestsFilter = 50;

// Функция отображения площадок
function renderVenues() {
    // Проверяем, существует ли venuesGrid
    if (!venuesGrid) return;
    
    // Фильтрация
    const filtered = venuesData.filter(venue => {
        // Фильтр по типу
        if (currentTypeFilter !== 'all' && venue.type !== currentTypeFilter) return false;
        // Фильтр по количеству гостей
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
    venuesGrid.innerHTML = filtered.map(venue => `
        <div class="venue-card">
            <div class="venue-img" style="background-image: url('${venue.img}')"></div>
            <div class="venue-content">
                <h3>${venue.name}</h3>
                <div class="venue-capacity">
                    <span>👥</span> до ${venue.capacity} гостей
                </div>
                <p class="venue-desc">${venue.desc}</p>
                <button class="btn-outline" onclick="alert('Запрос на площадку «${venue.name}» отправлен. Мы свяжемся с вами!')">
                    Запросить
                </button>
            </div>
        </div>
    `).join('');
}

// Обработчики фильтров (проверяем, существуют ли элементы)
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
