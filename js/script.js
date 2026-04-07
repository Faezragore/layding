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