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
    const fromDirection = urlParams.get('from');
    const directionName = urlParams.get('dir');

    // --- Определяем readable название направления для кнопки ---
    const directionTitles = {
        'stretching': 'stretching',
        'strip': 'strip с нуля',
        'highHeels': 'high heels',
        'jazzFunk': 'jazz funk',
        'hipHop': 'hip-hop choreo',
        'authorChoreo': 'авторская хореография',
        'dancehall': 'dancehall',
        'choreoKids': 'choreo kids'
    };

    const directionTitle = directionTitles[directionName] || 'направлению';

    // --- Строим навигацию ---
    const backBar = document.querySelector('.back-bar');

    if (backBar) {
        // Если переход с направления — добавляем две кнопки (слева и справа)
        if (fromDirection === 'direction' && directionName) {
            // Очищаем back-bar
            backBar.innerHTML = '';

            // Левая кнопка "назад"
            const backBtn = document.createElement('button');
            backBtn.className = 'nav-button nav-button-back';
            backBtn.innerHTML = '<span>на главную</span>';
            backBtn.setAttribute('href', 'index.html#teachers');
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

            // Правая кнопка "к направлению"
            const forwardBtn = document.createElement('button');
            forwardBtn.className = 'nav-button nav-button-forward';
            // forwardBtn.innerHTML = `<span>к ${directionTitle}</span>`;
            forwardBtn.innerHTML = `<span>${directionTitle}</span>`;
            forwardBtn.setAttribute('href', `${directionName}_dir.html`);
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
                // Убедимся что кнопка одна и она слева
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

                // Добавляем пустой div справа для баланса (чтобы кнопка осталась слева)
                const spacer = document.createElement('div');
                spacer.style.width = 'auto';
                backBar.appendChild(spacer);
            }
        }
    }

    // --- Логика табов (без изменений) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');

                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const activeTab = document.getElementById(`tab-${tabId}`);
                if (activeTab) {
                    activeTab.classList.add('active');
                }

                localStorage.setItem('teacherActiveTab', tabId);
            });
        });

        const savedTab = localStorage.getItem('teacherActiveTab');
        if (savedTab) {
            const tabToOpen = document.querySelector(`.tab-btn[data-tab="${savedTab}"]`);
            if (tabToOpen) tabToOpen.click();
        }
    }

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