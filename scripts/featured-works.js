/**
 * Featured Works — анимации на основе GSAP ScrollTrigger
 * Порт логики из React-компонента FeaturedWork.jsx (Rise-at-Seven)
 *
 * Механика:
 * 1. Секция получает высоту = высоте правой колонки со всеми карточками
 * 2. Внутренний враппер sticky: остаётся в viewport на всё время прокрутки
 * 3. GSAP translateY-ит правую колонку вверх синхронно со скроллом
 * 4. Список заголовков тоже движется вверх (параллельно), создавая ощущение прокрутки
 * 5. Observer на каждой карточке определяет activeIndex (подсвечивает заголовок)
 * 6. Кастомный курсор (зелёный круг) появляется при наведении на карточки
 */

(function initFeaturedWorks() {

  /* ─── Ссылки на DOM-элементы ─────────────────────────────── */
  var section       = document.getElementById('fw-section');
  var titlesListEl  = document.getElementById('fw-titles-list');
  var rightColEl    = document.getElementById('fw-right');
  var cursorEl      = document.getElementById('fw-cursor');
  var titleItems    = document.querySelectorAll('.fw-title-item');
  var imageItems    = document.querySelectorAll('.fw-image-item');

  if (!section || !titlesListEl || !rightColEl || !cursorEl) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[FeaturedWorks] GSAP или ScrollTrigger не загружены');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ─── Состояние ──────────────────────────────────────────── */
  var activeIndex  = 0;
  var hoveredIndex = -1;

  /* ─── Вспомогательные функции ────────────────────────────── */

  function setActiveTitle(index) {
    titleItems.forEach(function(item, i) {
      item.classList.toggle('fw-active', i === index);
    });
  }

  function setHoveredTitle(index) {
    titleItems.forEach(function(item, i) {
      item.classList.toggle('fw-hovered', i === index);
    });
  }

  /* Первый заголовок активен по умолчанию */
  setActiveTitle(0);

  /* ─── Глобальный трекинг мыши для кастомного курсора ─────── */
  gsap.set(cursorEl, { opacity: 0, scale: 0.5, x: 0, y: 0 });

  function onMouseMove(e) {
    gsap.to(cursorEl, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out',
    });
  }
  window.addEventListener('mousemove', onMouseMove);

  /* ─── Hover-события на карточках правой колонки ──────────── */
  imageItems.forEach(function(card, i) {
    card.addEventListener('mouseenter', function() {
      hoveredIndex = i;
      setHoveredTitle(i);
      gsap.to(cursorEl, { opacity: 1, scale: 1, duration: 0.15 });
    });
    card.addEventListener('mouseleave', function() {
      hoveredIndex = -1;
      setHoveredTitle(-1);
      gsap.to(cursorEl, { opacity: 0, scale: 0.5, duration: 0.15 });
    });
  });

  /* При наведении на левую колонку — скрываем курсор */
  var leftColEl = document.querySelector('.fw-left');
  if (leftColEl) {
    leftColEl.addEventListener('mouseenter', function() {
      gsap.to(cursorEl, { opacity: 0, scale: 0.5, duration: 0 });
    });
  }

  /* ─── Hover-события на заголовках левой колонки ──────────── */
  titleItems.forEach(function(item, i) {
    item.addEventListener('mouseenter', function() {
      setHoveredTitle(i);
    });
    item.addEventListener('mouseleave', function() {
      setHoveredTitle(-1);
    });
  });

  /* ─── Основная ScrollTrigger-логика (только desktop ≥1024px) */
  var mm = gsap.matchMedia();

  mm.add('(min-width: 1024px)', function() {

    /* Даём браузеру отрендерить разметку, затем инициализируем */
    var initTimeout = setTimeout(function() {

      var windowH    = window.innerHeight;
      var imagesH    = rightColEl.offsetHeight; /* натуральная высота правой колонки (как в оригинале) */

      if (imagesH <= windowH) {
        /* Контент не превышает viewport — анимация не нужна */
        return;
      }

      var scrollDist = imagesH - windowH;

      /*
       * 1. Растягиваем секцию на высоту всего правого контента.
       *    Это создаёт «фиктивный» scroll-трек для sticky-элемента.
       */
      gsap.set(section, { height: imagesH + 'px' });

      /*
       * 2. Сдвигаем правую колонку вверх синхронно со скроллом
       *    (scrub: true = прямая привязка к позиции скролла)
       */
      gsap.to(rightColEl, {
        y: -scrollDist,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=' + scrollDist,
          scrub: true,
        },
      });

      /*
       * 3. Список заголовков движется параллельно с изображениями:
       *    все элементы анимируются одновременно (position 0 в timeline)
       *    → список двигается как единый блок
       */
      var titlesH = titlesListEl.scrollHeight;
      var titleTargetY = -(titlesH - 300);

      var headingsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=' + scrollDist,
          scrub: true,
        },
      });

      titleItems.forEach(function(heading) {
        headingsTimeline.fromTo(
          heading,
          { y: 0 },
          { y: titleTargetY, duration: 4, ease: 'none' },
          0   /* все параллельно — принципиально важно */
        );
      });

      /*
       * 4. Observer на каждой карточке — определяет «активную» карточку
       *    (та, у которой центр находится в зоне 45% от верха/низа viewport)
       */
      imageItems.forEach(function(imgItem, i) {
        ScrollTrigger.create({
          trigger: imgItem,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: function(self) {
            if (self.isActive) {
              activeIndex = i;
              setActiveTitle(i);
            }
          },
        });
      });

      /* Обновляем ScrollTrigger после установки высоты */
      ScrollTrigger.refresh();

    }, 100);

    /* Возвращаем cleanup-функцию для gsap.matchMedia */
    return function() {
      clearTimeout(initTimeout);
      /* Сбрасываем инлайн-стиль высоты, чтобы не сломать mobile-вид */
      gsap.set(section, { clearProps: 'height' });
      gsap.set(rightColEl, { clearProps: 'transform,y' });
      ScrollTrigger.getAll().forEach(function(t) { t.kill(); });
    };
  });

  /* Cleanup при уничтожении (на случай SPA/hot-reload) */
  window.addEventListener('beforeunload', function() {
    window.removeEventListener('mousemove', onMouseMove);
    mm.revert();
  });

})();
