const body = document.querySelector('body');
const grid = document.querySelector('.grid');



window.addEventListener('load', function () {
    body.classList.remove("noScroll");
    const preloader = document.querySelector('#preloader')
    preloader.classList.add('close');
    grid.style.opacity = 1;


    setTimeout(function () {
        preloader.style.display = 'none';
    }, 1100);
});

const timetable = document.querySelector('#timetable');
const iframe = timetable?.querySelector('iframe');
if (timetable && iframe && !iframe.src) {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            iframe.src = iframe.dataset.src; // подставляем реальный src
            observer.disconnect();
        }
    });
    observer.observe(timetable);
}






const header = document.querySelector('header');
const headerBurger = document.querySelector('header .burger');
const headerMenuBurger = document.querySelector('header .menuBurger');
const headerMenuBurgerA = document.querySelectorAll('header .menuBurger a');

headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle("open");
    headerMenuBurger.classList.toggle("open");
    body.classList.toggle("noScroll");
})

headerMenuBurgerA.forEach(element => {
    element.addEventListener('click', () => {
        headerBurger.classList.toggle("open");
        headerMenuBurger.classList.toggle("open");
        body.classList.toggle("noScroll");
    })
});

(function () {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let isHidden = false;
    let preventHide = false; // флаг для отключения скрытия
    let preventTimer = null;

    function hideHeader() {
        if (isHidden) return;
        if (preventHide) return; // если был клик по ссылке - не скрываем
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
            hideHeader();
        } else if (delta < 0) {
            showHeader();
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    // Отслеживаем клик по любой ссылке внутри хедера
    const allHeaderLinks = document.querySelectorAll('header a');
    allHeaderLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Очищаем предыдущий таймер
            if (preventTimer) clearTimeout(preventTimer);

            // Включаем защиту от скрытия
            preventHide = true;

            // Показываем хедер если он был скрыт
            showHeader();

            // Через 500мс отключаем защиту
            preventTimer = setTimeout(() => {
                preventHide = false;
                preventTimer = null;
            }, 500);
        });
    });

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });
})();




const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const signup = document.querySelector('.signup');
const modalBox = document.querySelector('.modal .box');

// Переменные для свайпа
let touchStartY = 0;
let touchCurrentY = 0;
let isSwiping = false;
let hasMoved = false;

// Открытие модалки при клике
signup.addEventListener('click', function () {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalBox.style.transition = '';
    modal.style.transition = '';
    // Сбрасываем стили
    if (modalBox) {

        modalBox.style.transform = '';
        modalBox.style.opacity = '';
    }
    modal.style.backgroundColor = '';
});

// Закрытие по клику на фон
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Закрытие по кнопке
closeBtn.addEventListener('click', function () {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

// ========== СВАЙП ВНИЗ ДЛЯ ЗАКРЫТИЯ ==========
if (modalBox) {
    modalBox.addEventListener('touchstart', function (e) {
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
        hasMoved = false;
        modalBox.style.transition = 'none';
    }, { passive: false });

    modalBox.addEventListener('touchmove', function (e) {
        if (!isSwiping) return;

        touchCurrentY = e.touches[0].clientY;
        const deltaY = touchCurrentY - touchStartY;

        // Только свайп вниз (deltaY > 0)
        if (deltaY > 10) {
            hasMoved = true;
            e.preventDefault();
            const progress = Math.min(deltaY / 300, 1);
            modalBox.style.transform = `translateY(${deltaY}px)`;
            modalBox.style.opacity = 1 - progress * 0.5;
            modal.style.backgroundColor = `rgba(0, 0, 0, ${0.9 * (1 - progress * 0.6)})`;
        }
    }, { passive: false });

    modalBox.addEventListener('touchend', function (e) {
        if (!isSwiping) return;

        isSwiping = false;

        if (hasMoved) {
            const deltaY = touchCurrentY - touchStartY;

            if (deltaY > 70) {
                modalBox.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                modalBox.style.transform = 'translateY(100%)';
                modalBox.style.opacity = '0';
                modal.style.transition = 'background-color 0.3s ease';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';

                // Закрываем модалку
                setTimeout(() => {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300)
                return;
            }
        }

        // Возвращаем на место
        modalBox.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        modalBox.style.transform = '';
        modalBox.style.opacity = '';
        modal.style.transition = 'background-color 0.3s ease';
        modal.style.backgroundColor = '';

        setTimeout(() => {
            modalBox.style.transition = '';
            modal.style.transition = '';
        }, 300);
    });
}








const directionsContent = document.querySelectorAll('#directions .content');

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) {
        if (headerBurger.classList.contains("open")) {

            headerBurger.classList.remove("open");
            headerMenuBurger.classList.remove("open");
            body.classList.remove("noScroll");
        }
    }

    directionsContent.forEach(element => {
        element.classList.remove("animation");
        setTimeout(() => {
            element.classList.add("animation");
        }, 400);
    });
});



// --- Останавливаем бесконечные анимации направлений, когда блок не в области видимости ---
const directionsBlock = document.querySelector('#directions');
const animatedContents = document.querySelectorAll('#directions .content.animation');

const observerDirections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Блок виден — запускаем анимации
            animatedContents.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        } else {
            // Блок не виден — останавливаем анимации
            animatedContents.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        }
    });
}, { threshold: 0.01 }); // Срабатывает, когда видно хотя бы 1% блока

if (directionsBlock) {
    observerDirections.observe(directionsBlock);
}








// Оптимизированная функция для сохранения горизонтального скролла
function initHorizontalScrollSaving() {
    // Находим контейнер с прокруткой (родитель, у которого overflow-x: auto)
    const scrollContainer = document.querySelector('#teachers .teachersSlider');

    if (!scrollContainer) {
        console.warn('Scroll container not found');
        return;
    }

    const storageKey = 'teachersScrollPosition';
    let scrollTimeout;
    let isRestored = false;

    // Функция сохранения позиции
    const saveScrollPosition = () => {
        sessionStorage.setItem(storageKey, scrollContainer.scrollLeft);
    };

    // Функция восстановления позиции (один раз)
    const restoreScrollPosition = () => {
        if (isRestored) return;

        const savedPosition = sessionStorage.getItem(storageKey);
        if (savedPosition !== null) {
            // Небольшая задержка для корректного восстановления после загрузки контента
            setTimeout(() => {
                scrollContainer.scrollLeft = parseInt(savedPosition);
                isRestored = true;
            }, 100);
        } else {
            isRestored = true;
        }
    };

    // Сохраняем позицию при скролле с debounce
    scrollContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(saveScrollPosition, 150);
    });

    // Восстанавливаем после полной загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', restoreScrollPosition);
    } else {
        restoreScrollPosition();
    }

    // Дополнительно: восстанавливаем после загрузки всех изображений
    window.addEventListener('load', () => {
        const savedPosition = sessionStorage.getItem(storageKey);
        if (savedPosition !== null && scrollContainer.scrollLeft !== parseInt(savedPosition)) {
            scrollContainer.scrollLeft = parseInt(savedPosition);
        }
    });
}

initHorizontalScrollSaving();





// --- Стоимость: переключение табов с сохранением ---
const partsPriceNuv = document.querySelectorAll('#price .nav .part');
const classesPrice = document.querySelectorAll('#price .classes');

// Функция открытия нужного таба
function openTab(tabNumber) {
    // Убираем open у всех кнопок
    partsPriceNuv.forEach(btn => {
        btn.classList.remove('open');
    });

    // Добавляем open нужной кнопке
    document.querySelector(`#price .nav .part${tabNumber}`).classList.add('open');

    // Прячем все классы
    classesPrice.forEach(cl => {
        cl.classList.remove('open');
    });

    // Показываем нужный класс
    document.querySelector(`#price .classes${tabNumber}`).classList.add('open');

    // Сохраняем в sessionStorage
    sessionStorage.setItem('priceTab', tabNumber);
}

// Навешиваем обработчики
partsPriceNuv.forEach((btn, index) => {
    const tabNumber = index + 1; // part1, part2, part3, part4
    btn.addEventListener('click', () => {
        openTab(tabNumber);
    });
});

const questionsAPR = document.querySelector('#questions .aPR');
questionsAPR.addEventListener('click', () => {
    const tabNumber = 3; // part1, part2, part3, part4
    openTab(tabNumber);
});

// Восстанавливаем сохранённый таб при загрузке
const savedTab = sessionStorage.getItem('priceTab');
if (savedTab) {
    openTab(parseInt(savedTab));
}







// --- Аренда: переключение табов с сохранением ---
const partsRentNuv = document.querySelectorAll('#rent .nav .part');
const classesRent = document.querySelectorAll('#rent .classes');

// Функция открытия нужного таба
function openRentTab(tabNumber) {
    // Убираем open у всех кнопок
    partsRentNuv.forEach(btn => {
        btn.classList.remove('open');
    });

    // Добавляем open нужной кнопке
    document.querySelector(`#rent .nav .part${tabNumber}`).classList.add('open');

    // Прячем все классы
    classesRent.forEach(cl => {
        cl.classList.remove('open');
    });

    // Показываем нужный класс (dayRent или nightRent)
    if (tabNumber === 1) {
        document.querySelector('#rent .dayRent').classList.add('open');
    } else if (tabNumber === 2) {
        document.querySelector('#rent .nightRent').classList.add('open');
    }

    // Сохраняем в sessionStorage
    sessionStorage.setItem('rentTab', tabNumber);
}

// Навешиваем обработчики
partsRentNuv.forEach((btn, index) => {
    const tabNumber = index + 1; // part1, part2
    btn.addEventListener('click', () => {
        openRentTab(tabNumber);
    });
});

// Восстанавливаем сохранённый таб при загрузке
const savedRentTab = sessionStorage.getItem('rentTab');
if (savedRentTab) {
    openRentTab(parseInt(savedRentTab));
}




const rentImgName = document.querySelectorAll('#rent .rightbox .name');
const rentPic = document.querySelectorAll('#rent .rightbox .pic');
const rentRightbox = document.querySelector('#rent .rightbox');
rentRightbox.addEventListener('click', () => {
    rentImgName.forEach(element => {
        element.classList.toggle('open')
    });
    rentPic.forEach(element => {
        element.classList.toggle('open')
    });
});

// }






const partQuestions = document.querySelectorAll('#questions .part .boxQuestions .partQuestions');

partQuestions.forEach(element => {
    // const answer = element.querySelector('.answer');

    element.addEventListener('click', () => {
        element.classList.toggle("open")
    })
});



const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            requestAnimationFrame(() => {
                entry.target.classList.add('visible');
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.mainParts').forEach(el => observer.observe(el));










const copyright = document.querySelector('.copyright');

let copyrightCount = 0;
let copyrightFlag = false;

const blocks = [];

class PhysicsBlock {
    constructor(element, x, y) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.width = 0;
        this.height = 0;
        this.isDragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.lastTime = 0;
        this.animId = null;

        element.style.position = 'fixed';
        element.style.cursor = 'grab';
        element.style.pointerEvents = 'auto';
        element.style.userSelect = 'none';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.zIndex = '9999';

        this.updateSize();
    }

    updateSize() {
        const rect = this.element.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
    }

    applyPosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    startDrag(clientX, clientY) {
        this.isDragging = true;
        this.vx = 0;
        this.vy = 0;
        this.element.style.cursor = 'grabbing';
        this.dragOffsetX = clientX - this.x;
        this.dragOffsetY = clientY - this.y;
        this.lastX = clientX;
        this.lastY = clientY;
        this.lastTime = performance.now();
        cancelAnimationFrame(this.animId);
    }

    moveDrag(clientX, clientY) {
        if (!this.isDragging) return;

        const now = performance.now();
        const dt = Math.max(now - this.lastTime, 1);

        this.x = clientX - this.dragOffsetX;
        this.y = clientY - this.dragOffsetY;

        this.vx = (clientX - this.lastX) / dt * 16;
        this.vy = (clientY - this.lastY) / dt * 16;

        this.lastX = clientX;
        this.lastY = clientY;
        this.lastTime = now;

        this.applyPosition();
    }

    endDrag() {
        this.isDragging = false;
        this.element.style.cursor = 'grab';
        this.vx *= 1.3;
        this.vy *= 1.3;
    }

    update() {
        if (this.isDragging) return;

        this.updateSize();

        this.vy += 0.4;
        this.vx *= 0.99;
        this.vy *= 0.99;

        this.x += this.vx;
        this.y += this.vy;

        const maxX = window.innerWidth - this.width;
        const maxY = window.innerHeight - this.height;

        if (this.y > maxY) {
            this.y = maxY;
            this.vy *= -0.5;
            if (Math.abs(this.vy) < 0.5) this.vy = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.vy *= -0.5;
        }
        if (this.x > maxX) {
            this.x = maxX;
            this.vx *= -0.5;
        }
        if (this.x < 0) {
            this.x = 0;
            this.vx *= -0.5;
        }

        this.applyPosition();
    }
}

// if (floatingPashaFer) blocks.push(new PhysicsBlock(floatingPashaFer, 90, -100));
// if (floatingPashaSec) blocks.push(new PhysicsBlock(floatingPashaSec, 0, -100));
// if (floatingPashaThe) blocks.push(new PhysicsBlock(floatingPashaThe, 180, -100));


// function handleCollisions() {
//     for (let i = 0; i < blocks.length; i++) {
//         for (let j = i + 1; j < blocks.length; j++) {
//             const a = blocks[i];
//             const b = blocks[j];

//             if (a.isDragging || b.isDragging) continue;

//             const dx = b.x - a.x;
//             const dy = b.y - a.y;
//             const dist = Math.sqrt(dx * dx + dy * dy);
//             const minDist = (a.width + b.width) / 2;

//             if (dist < minDist && dist > 0) {
//                 const nx = dx / dist;
//                 const ny = dy / dist;
//                 const dvx = a.vx - b.vx;
//                 const dvy = a.vy - b.vy;
//                 const dvn = dvx * nx + dvy * ny;

//                 if (dvn > 0) {
//                     const impulse = dvn * 0.8;
//                     a.vx -= impulse * nx;
//                     a.vy -= impulse * ny;
//                     b.vx += impulse * nx;
//                     b.vy += impulse * ny;

//                     const overlap = minDist - dist;
//                     a.x -= overlap * nx * 0.5;
//                     a.y -= overlap * ny * 0.5;
//                     b.x += overlap * nx * 0.5;
//                     b.y += overlap * ny * 0.5;

//                     a.applyPosition();
//                     b.applyPosition();
//                 }
//             }
//         }
//     }
// }

function handleCollisions() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
            const a = blocks[i];
            const b = blocks[j];

            if (a.isDragging || b.isDragging) continue;

            // ВЫЧИСЛЯЕМ ЦЕНТРЫ блоков
            const ax = a.x + a.width / 2;
            const ay = a.y + a.height / 2;
            const bx = b.x + b.width / 2;
            const by = b.y + b.height / 2;

            // Перекрытие по осям (используем центры)
            const overlapX = (a.width / 2 + b.width / 2) - Math.abs(ax - bx);
            const overlapY = (a.height / 2 + b.height / 2) - Math.abs(ay - by);

            if (overlapX > 0 && overlapY > 0) {
                const dx = bx - ax;
                const dy = by - ay;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 0) {
                    const nx = dx / dist;
                    const ny = dy / dist;

                    // Раздвигаем (сдвигаем левые верхние углы)
                    const overlap = Math.min(overlapX, overlapY);
                    a.x -= overlap * nx * 0.5;
                    a.y -= overlap * ny * 0.5;
                    b.x += overlap * nx * 0.5;
                    b.y += overlap * ny * 0.5;

                    // Обмен скоростями
                    const dvx = a.vx - b.vx;
                    const dvy = a.vy - b.vy;
                    const dvn = dvx * nx + dvy * ny;

                    if (dvn > 0) {
                        const impulse = dvn * 0.8;
                        a.vx -= impulse * nx;
                        a.vy -= impulse * ny;
                        b.vx += impulse * nx;
                        b.vy += impulse * ny;
                    }

                    a.applyPosition();
                    b.applyPosition();
                }
            }
        }
    }
}
/// Скролл — при скролле вниз блоки подлетают вверх (совсем мягко)
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function () {
    if (!copyrightFlag) return;

    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    blocks.forEach(block => {
        if (!block.isDragging) {
            if (scrollDelta > 0) {
                // Скролл вниз — блоки чуть подлетают
                block.y -= scrollDelta * 0.5;
                block.vy -= scrollDelta * 0.05;
            } else if (scrollDelta < 0) {
                // Скролл вверх — блоки мягко опускаются
                block.y -= scrollDelta * 0.3;
            }

            // Отскок от потолка
            if (block.y < 0) {
                block.y = 0;
                block.vy = Math.abs(block.vy) * 0.3;
            }

            // Отскок от пола
            const maxY = window.innerHeight - block.height;
            if (block.y > maxY) {
                block.y = maxY;
                block.vy *= -0.5;
                if (Math.abs(block.vy) < 0.5) block.vy = 0;
            }
        }
    });

    lastScrollY = currentScrollY;
});

function gameLoop() {
    if (!copyrightFlag) {
        requestAnimationFrame(gameLoop);
        return;
    }

    blocks.forEach(block => block.update());
    handleCollisions();

    requestAnimationFrame(gameLoop);
}

function addPashas() {
    const pashas = [
        ['floatingPashaFer', 'style/pasha/pasha.jpg'],
        ['floatingPashaSec', 'style/pasha/pashafer.jpg'],
        ['floatingPashaThe', 'style/pasha/a2.jpg'],
        ['floatingPashaBall',]
        // ['floatingPashaBall', 'style/pasha/futball.jpg']
    ];

    pashas.forEach(([className, srcPath]) => {
        if (className === 'floatingPashaBall' || !srcPath) {
            const div = document.createElement('div');
            div.classList.add('floatingPasha', className);
            div.textContent = 'кимпинтяо';
                 div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.justifyContent = 'center';

         

            body.appendChild(div);
            return
        }

        const img = document.createElement('img');
        img.classList.add('floatingPasha', className);
        img.src = srcPath;
        img.alt = 'Павел';
        img.loading = 'lazy';
        img.decoding = 'async';

        body.appendChild(img);
    });
}

copyright.addEventListener('click', () => {
    if (copyrightCount == 8) {
        if (!copyrightFlag) {
            copyrightFlag = true;
            addPashas();
            const floatingPashaFer = document.querySelector('.floatingPashaFer');
            const floatingPashaSec = document.querySelector('.floatingPashaSec');
            const floatingPashaThe = document.querySelector('.floatingPashaThe');
            const floatingPashaBall = document.querySelector('.floatingPashaBall');

            if (floatingPashaFer) floatingPashaFer.classList.add("display");
            if (floatingPashaSec) floatingPashaSec.classList.add("display");
            if (floatingPashaThe) floatingPashaThe.classList.add("display");
            if (floatingPashaBall) floatingPashaBall.classList.add("display");

            if (floatingPashaFer) blocks.push(new PhysicsBlock(floatingPashaFer, 90, -100));
            if (floatingPashaSec) blocks.push(new PhysicsBlock(floatingPashaSec, 0, -100));
            if (floatingPashaThe) blocks.push(new PhysicsBlock(floatingPashaThe, 180, -100));
            if (floatingPashaBall) blocks.push(new PhysicsBlock(floatingPashaBall, 270, -100));


            blocks.forEach((block, i) => {
                block.vx = (Math.random() - 0.5) * 10;
                block.vy = -(Math.random() * 8 + 3);
            });
        }
    } else {
        copyrightCount++;
    }
});

document.addEventListener('mousedown', function (e) {
    if (!copyrightFlag) return;
    for (const block of blocks) {
        if (e.target === block.element || block.element.contains(e.target)) {
            block.startDrag(e.clientX, e.clientY);
            e.preventDefault();
            return;
        }
    }
});

document.addEventListener('mousemove', function (e) {
    for (const block of blocks) {
        if (block.isDragging) {
            block.moveDrag(e.clientX, e.clientY);
        }
    }
});

document.addEventListener('mouseup', function () {
    blocks.forEach(block => {
        if (block.isDragging) block.endDrag();
    });
});

document.addEventListener('touchstart', function (e) {
    if (!copyrightFlag) return;
    for (const block of blocks) {
        if (e.target === block.element || block.element.contains(e.target)) {
            const touch = e.touches[0];
            block.startDrag(touch.clientX, touch.clientY);
            e.preventDefault();
            return;
        }
    }
}, { passive: false });

document.addEventListener('touchmove', function (e) {
    for (const block of blocks) {
        if (block.isDragging) {
            const touch = e.touches[0];
            block.moveDrag(touch.clientX, touch.clientY);
            e.preventDefault();
        }
    }
}, { passive: false });

document.addEventListener('touchend', function () {
    blocks.forEach(block => {
        if (block.isDragging) block.endDrag();
    });
});

gameLoop();
















const square = document.querySelector('.centerSun');



// Находим все ссылки
const links = document.querySelectorAll('a[href$=".html"]');

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



if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const rotation = scrollY / 5;
        // Используем отдельные transform или добавляем translate
        square.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        square.style.willChange = 'transform';
    });

    // Добавляем debounce для производительности
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const rotation = scrollY / 5;
            square.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        });
    });
}


// Определение тач-устройства и добавление класса
function checkDeviceAndDisableHover() {
    const isTouch = ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        window.matchMedia('(hover: none)').matches;

    if (isTouch) {
        document.body.classList.add('no-hover');
    }
}

// Запускаем один раз при загрузке
checkDeviceAndDisableHover();



