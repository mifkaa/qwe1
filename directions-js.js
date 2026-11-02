document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.back-bar');

    (function () {
        let lastScrollY = window.scrollY;
        let ticking = false;
        let isHidden = false;

        function hideHeader() {
            if (isHidden) return;
            header.classList.remove('open')
            isHidden = true;
        }

        function showHeader() {
            if (!isHidden) return;
            header.classList.add('open')
            isHidden = false;
        }

        function handleScroll() {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            if (delta > 0 && window.scrollY > 100) {
                // Скролл вниз - скрываем
                hideHeader();
            } else if (delta < 0) {
                // Скролл вверх - показываем
                showHeader();
            }

            lastScrollY = currentScrollY;
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
    })();
    // --- Получаем параметры из URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const fromTeacher = urlParams.get('from');
    const teacherName = urlParams.get('teacher');

    // --- Определяем readable название преподавателя для кнопки ---
    const teacherTitles = {
        'Bondareva': 'Аня Бондарева',
        'Danilushkina': 'Вика Данилушкина',
        'Kopytina': 'Виктория Копытина',
        'Romanchuk': 'Лика Романчук',
        'Vasilchuk': 'Настя Васильчук',
        'Chernykh': 'Марина Черных',
        'Gvozdenko': 'Алина Гвозденко',
        'Shvetsova': 'Анастасия Швецова',
        'Golanova': 'Юлия Голанова',
        'Merenkova': 'Аня Меренкова'
    };

    const teacherTitle = teacherTitles[teacherName] || 'преподавателю';

    // --- Строим навигацию ---
    const backBar = document.querySelector('.back-bar');

    if (backBar) {
        // Если переход с преподавателя — добавляем две кнопки (слева и справа)
        if (fromTeacher === 'teacher' && teacherName) {
            // Очищаем back-bar
            backBar.innerHTML = '';

            // Левая кнопка "назад"
            const backBtn = document.createElement('button');
            backBtn.className = 'nav-button nav-button-back';
            backBtn.innerHTML = '<span>на главную</span>';
            backBtn.setAttribute('href', 'index.html#directions');
            backBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                document.body.classList.add('page-transition-out');
                setTimeout(() => {
                    window.location.href = targetUrl;
                    setTimeout(() => {
                        document.body.classList.remove('page-transition-out');
                    }, 500);
                }, 500);
            });

            // Правая кнопка "к преподавателю"
            const forwardBtn = document.createElement('button');
            forwardBtn.className = 'nav-button nav-button-forward';
            forwardBtn.innerHTML = `<span>${teacherTitle}</span>`;
            // forwardBtn.innerHTML = `<span>к ${teacherTitle}</span>`;
            forwardBtn.setAttribute('href', `${teacherName}_teach.html`);
            forwardBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                document.body.classList.add('page-transition-out');
                setTimeout(() => {
                    window.location.href = targetUrl;
                    setTimeout(() => {
                        document.body.classList.remove('page-transition-out');
                    }, 500);
                }, 500);
            });

            backBar.appendChild(backBtn);
            backBar.appendChild(forwardBtn);
        }
        // Если переход прямой — оставляем одну кнопку слева
        else {
            const existingButton = document.querySelector('.back-button');
            if (existingButton) {
                existingButton.classList.add('nav-button', 'nav-button-back');
                existingButton.innerHTML = '<span>на главную</span>';

                existingButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetUrl = this.getAttribute('href');
                    document.body.classList.add('page-transition-out');
                    setTimeout(() => {
                        window.location.href = targetUrl;
                        setTimeout(() => {
                            document.body.classList.remove('page-transition-out');
                        }, 500);
                    }, 500);
                });

                // Добавляем пустой div справа для баланса
                const spacer = document.createElement('div');
                spacer.style.width = 'auto';
                backBar.appendChild(spacer);
            }
        }
    }


    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalContent = document.querySelector('.video-modal-content');
    const closeBtn = document.querySelectorAll('.close-m');
    const videoCards = document.querySelectorAll('.video-card');
    const teacherNameSpan = document.querySelector('.teacher-name');

    // Переменные для свайпа
    let touchStartY = 0;
    let touchCurrentY = 0;
    let isSwiping = false;
    let hasMoved = false;

    // Функция закрытия (без анимации)
    function closeVideoModal() {
        // Сначала скрываем модалку
        modal.style.transition = '';

        modal.classList.remove('active');
        document.body.style.overflow = '';

        // Задержка 200мс для плавного завершения
        setTimeout(() => {
            modalVideo.pause();
            modalVideo.src = '';
            teacherNameSpan.textContent = '';

            // Сбрасываем стили
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
            modalContent.style.transition = '';
            modal.style.backgroundColor = '';
            modal.style.transition = '';
        }, 200);
    }

    // Открытие видео
    videoCards.forEach(card => {
        card.addEventListener('click', function () {
            const videoSrc = this.querySelector('.video-preview video').getAttribute('data-src');
            const teacherName = this.querySelector('.hover')?.textContent.trim() || 'Преподаватель';

            modalVideo.setAttribute('playsinline', '');
            modalVideo.setAttribute('webkit-playsinline', '');
            modalVideo.src = videoSrc;
            teacherNameSpan.textContent = teacherName;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modalVideo.play();

            // Сбрасываем стили при открытии
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
            modalContent.style.transition = '';
            modal.style.backgroundColor = '';
        });
    });

    // Закрытие по клику на фон
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Закрытие по кнопкам
    closeBtn.forEach(closem => {
        closem.addEventListener('click', function () {
            closeVideoModal();
        });
    });

    // ========== СВАЙП ДЛЯ ЗАКРЫТИЯ ==========
    if (modalContent) {
        modalContent.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
            isSwiping = true;
            hasMoved = false;
            modalContent.style.transition = 'none';
        }, { passive: false });

        modalContent.addEventListener('touchmove', function (e) {
            if (!isSwiping) return;

            touchCurrentY = e.touches[0].clientY;
            const deltaY = touchCurrentY - touchStartY;
            const absDeltaY = Math.abs(deltaY);

            if (absDeltaY > 10) {
                hasMoved = true;
                e.preventDefault();
                const progress = Math.min(absDeltaY / 300, 1);
                modalContent.style.transform = `translateY(${deltaY}px)`;
                modalContent.style.opacity = 1 - progress * 0.5;
                modal.style.backgroundColor = `rgba(0, 0, 0, ${0.9 * (1 - progress * 0.6)})`;
            }
        }, { passive: false });

        modalContent.addEventListener('touchend', function (e) {
            if (!isSwiping) return;
            isSwiping = false;

            if (hasMoved) {
                const deltaY = touchCurrentY - touchStartY;
                const absDeltaY = Math.abs(deltaY);

                if (absDeltaY > 70) {
                    closeVideoModal();
                    return;
                }
            }

            // Плавный возврат на место
            modalContent.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
            modal.style.transition = 'background-color 0.3s ease';
            modal.style.backgroundColor = '';

            setTimeout(() => {
                modalContent.style.transition = '';
                modal.style.transition = '';
            }, 300);
        });
    }


    // Находим все ссылки
    const links = document.querySelectorAll('a[href*=".html"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Отменяем мгновенный переход

            const targetUrl = this.getAttribute('href');

            // Добавляем класс для анимации ухода
            document.body.classList.add('page-transition-out');

            // Ждём окончания анимации и переходим
            setTimeout(() => {
                window.location.href = targetUrl;
                setTimeout(() => {
                    document.body.classList.remove('page-transition-out');

                }, 500)
            }, 500); // Время должно совпадать с длительностью CSS-анимации
        });
    });

});