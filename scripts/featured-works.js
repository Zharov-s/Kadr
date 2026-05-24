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

    var initTimeout = null;
    var rebuildTimeout = null;
    var resizeObserver = null;
    var rightScrollTrigger = null;
    var headingsTimeline = null;

    function getImagesHeight() {
      return Math.ceil(rightColEl.scrollHeight || rightColEl.offsetHeight);
    }

    function getScrollDistance() {
      return Math.max(0, getImagesHeight() - window.innerHeight);
    }

    function getSectionStart() {
      return section.getBoundingClientRect().top + window.pageYOffset;
    }

    function getSectionEnd() {
      return getSectionStart() + getScrollDistance();
    }

    function setActiveFromProgress(progress) {
      if (!imageItems.length) return;
      var index = Math.round(progress * (imageItems.length - 1));
      index = Math.max(0, Math.min(imageItems.length - 1, index));

      if (index !== activeIndex) {
        activeIndex = index;
        setActiveTitle(index);
      }
    }

    function clearDesktopStyles() {
      gsap.set(section, { clearProps: 'height' });
      gsap.set(rightColEl, { clearProps: 'transform,y' });
      gsap.set(titleItems, { clearProps: 'transform,y' });
    }

    function killDesktopScene() {
      if (rightScrollTrigger) {
        rightScrollTrigger.kill();
        rightScrollTrigger = null;
      }

      if (headingsTimeline) {
        headingsTimeline.kill();
        headingsTimeline = null;
      }

      clearDesktopStyles();
    }

    function buildDesktopScene() {
      var preservedScrollY = window.pageYOffset;

      killDesktopScene();
      window.scrollTo(0, preservedScrollY);

      var windowH = window.innerHeight;
      var imagesH = getImagesHeight(); /* натуральная высота правой колонки */

      if (imagesH <= windowH) {
        /* Контент не превышает viewport — анимация не нужна */
        return;
      }

      /*
       * 1. Растягиваем секцию на высоту всего правого контента.
       *    Это создаёт «фиктивный» scroll-трек для sticky-элемента.
       */
      gsap.set(section, { height: imagesH + 'px' });
      window.scrollTo(0, preservedScrollY);

      /*
       * 2. Сдвигаем правую колонку вверх синхронно со скроллом
       *    (scrub: true = прямая привязка к позиции скролла)
       */
      var rightTween = gsap.to(rightColEl, {
        y: function() { return -getScrollDistance(); },
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: getSectionStart,
          end: getSectionEnd,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: function(self) {
            setActiveFromProgress(self.progress);
          },
        },
      });
      rightScrollTrigger = rightTween.scrollTrigger;

      /*
       * 3. Список заголовков движется параллельно с изображениями:
       *    все элементы анимируются одновременно (position 0 в timeline)
       *    → список двигается как единый блок
       */
      var titlesH = titlesListEl.scrollHeight;
      var titleTargetY = -(titlesH - 300);

      headingsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: getSectionStart,
          end: getSectionEnd,
          scrub: true,
          invalidateOnRefresh: true,
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
       * Обновляем ScrollTrigger после установки высоты и принудительно
       * синхронизируем состояние с текущим scrollY. Это особенно важно
       * после reload, когда браузер восстанавливает позицию внутри секции.
       */
      ScrollTrigger.refresh();
      window.scrollTo(0, preservedScrollY);
      ScrollTrigger.update();
      if (rightScrollTrigger) {
        setActiveFromProgress(rightScrollTrigger.progress);
      }
    }

    function scheduleBuild(delay) {
      clearTimeout(initTimeout);
      initTimeout = setTimeout(buildDesktopScene, delay || 0);
    }

    function scheduleRebuild() {
      clearTimeout(rebuildTimeout);
      rebuildTimeout = setTimeout(buildDesktopScene, 150);
    }

    /*
     * Строим сцену после первичного рендера, затем повторяем после load/pageshow:
     * на reload браузер может восстановить scrollY уже внутри sticky-секции,
     * поэтому одиночный ранний расчет часто оставляет ScrollTrigger stale.
     */
    scheduleBuild(100);
    window.addEventListener('load', scheduleRebuild);
    window.addEventListener('pageshow', scheduleRebuild);

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(scheduleRebuild);
      resizeObserver.observe(rightColEl);
    }

    /* Возвращаем cleanup-функцию для gsap.matchMedia */
    return function() {
      clearTimeout(initTimeout);
      clearTimeout(rebuildTimeout);
      window.removeEventListener('load', scheduleRebuild);
      window.removeEventListener('pageshow', scheduleRebuild);
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      /* Сбрасываем инлайн-стиль высоты, чтобы не сломать mobile-вид */
      killDesktopScene();
    };
  });

  /*
   * На reload нельзя вызывать mm.revert(): cleanup сбрасывает высоту sticky-секции
   * до того, как браузер сохранит scrollY, и после перезагрузки позиция
   * восстанавливается уже по схлопнутому layout.
   */
  window.addEventListener('beforeunload', function() {
    window.removeEventListener('mousemove', onMouseMove);
  });

})();
