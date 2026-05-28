
// ── SheryJS: gooey image effect (contact section) ────────────────────────────
// Exact port of obys-agency imageEffect style 5 configuration
(function () {
  if (typeof Shery === 'undefined') return;
  var el = document.querySelector('.cnt-shery-img');
  if (!el) return;

  // Применяем border-radius на canvas-контейнер после инициализации SheryJS
  // (перебивает inline-стили, которые SheryJS может выставлять динамически)
  function patchSheryCorners() {
    var BR = '30px';
    var container = document.querySelector('._canvas_container');
    if (!container) { requestAnimationFrame(patchSheryCorners); return; }
    if (container.parentElement === el.parentElement) {
      container.classList.add('cnt-shery-canvas');
    }

    function applyBR() {
      container.style.setProperty('border-radius', BR, 'important');
      container.style.setProperty('overflow', 'hidden', 'important');
      container.style.setProperty('clip-path', 'inset(0 round ' + BR + ')', 'important');
      var canvas = container.querySelector('canvas');
      if (canvas) canvas.style.setProperty('border-radius', BR, 'important');
    }

    applyBR();
    // MutationObserver: восстанавливаем после любых изменений SheryJS
    new MutationObserver(applyBR).observe(container, { attributes: true, subtree: true });
  }

  requestAnimationFrame(patchSheryCorners);

  Shery.imageEffect('.cnt-shery-img', {
    style: 5,
    gooey: true,
    config: {
      resolutionXY:        { value: 100 },
      distortion:          { value: true },
      mode:                { value: -10 },
      mousemove:           { value: 3 },
      modeA:               { value: 1 },
      modeN:               { value: 3 },
      speed:               { value: 1,    range: [-500, 500],               rangep: [-10, 10] },
      frequency:           { value: 50,   range: [-800, 800],               rangep: [-50, 50] },
      angle:               { value: 0.5,  range: [0, 3.141592653589793] },
      waveFactor:          { value: 1.4,  range: [-3, 3] },
      color:               { value: 10212607 },
      pixelStrength:       { value: 3,    range: [-20, 100],                rangep: [-20, 20] },
      quality:             { value: 5,    range: [0, 10] },
      contrast:            { value: 1,    range: [-25, 25] },
      brightness:          { value: 1,    range: [-1, 25] },
      colorExposer:        { value: 0.18, range: [-5, 5] },
      strength:            { value: 0.2,  range: [-40, 40],                 rangep: [-5, 5] },
      exposer:             { value: 8,    range: [-100, 100] },
      zindex:              { value: -9996999, range: [-9999999, 9999999] },
      aspect:              { value: 0.7666557722625823 },
      ignoreShapeAspect:   { value: true },
      shapePosition:       { value: { x: 0, y: 0 } },
      shapeScale:          { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness:   { value: 0,    range: [0, 0.5] },
      shapeRadius:         { value: 0,    range: [0, 2] },
      currentScroll:       { value: 0 },
      scrollLerp:          { value: 0.07 },
      gooey:               { value: true },
      infiniteGooey:       { value: false },
      growSize:            { value: 4,    range: [1, 15] },
      durationOut:         { value: 1,    range: [0.1, 5] },
      durationIn:          { value: 1.5,  range: [0.1, 5] },
      displaceAmount:      { value: 0.5 },
      masker:              { value: false },
      maskVal:             { value: 1,    range: [1, 5] },
      scrollType:          { value: 0 },
      geoVertex:           { range: [1, 64], value: 1 },
      noEffectGooey:       { value: true },
      onMouse:             { value: 0 },
      noise_speed:         { value: 0.76, range: [0, 10] },
      metaball:            { value: 0.6,  range: [0, 2] },
      discard_threshold:   { value: 0.5,  range: [0, 1] },
      antialias_threshold: { value: 0,    range: [0, 0.1] },
      noise_height:        { value: 0.37, range: [0, 2] },
      noise_scale:         { value: 7.63, range: [0, 100] },
      a:                   { value: 1.37, range: [0, 30] },
      b:                   { value: -0.91, range: [-1, 1] },
    }
  });
})();

// ── Benefits: floka-style blob hover + GSAP stagger entrance ─────────────────
(function () {
  var rows = document.querySelectorAll('.js-bnf-row');
  if (!rows.length) return;

  // ── Blob: GSAP управляет позицией, opacity и scale ──
  // xPercent/yPercent = translate(-50%,-50%) — центрирует blob на курсоре
  // scale 0.7→1 при входе, 1→0.7 при выходе (как в floka framer-motion)
  rows.forEach(function (row) {
    var blob = row.querySelector('.bnf-row-blob');
    if (!blob || typeof gsap === 'undefined') return;

    // Начальное состояние: центрирован относительно себя, невидим
    gsap.set(blob, { xPercent: -50, yPercent: -50, scale: 0.7, opacity: 0 });

    row.addEventListener('mouseenter', function (e) {
      var rect = row.getBoundingClientRect();
      // Мгновенно ставим в точку под курсором — без анимации, чтобы не прыгал
      gsap.set(blob, {
        left: e.clientX - rect.left,
        top:  e.clientY - rect.top
      });
      // Затем появление с scale-анимацией
      gsap.to(blob, {
        opacity: 1, scale: 1,
        duration: 0.4, ease: 'power2.out', overwrite: 'auto'
      });
    });

    row.addEventListener('mouseleave', function () {
      gsap.to(blob, {
        opacity: 0, scale: 0.7,
        duration: 0.35, ease: 'power2.in', overwrite: 'auto'
      });
    });

    // Плавное следование за курсором с небольшим лагом
    row.addEventListener('mousemove', function (e) {
      var rect = row.getBoundingClientRect();
      gsap.to(blob, {
        left: e.clientX - rect.left,
        top:  e.clientY - rect.top,
        duration: 0.18, ease: 'none', overwrite: 'auto'
      });
    });
  });

  // ── GSAP ScrollTrigger: stagger entrance ──
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var table = document.querySelector('.js-bnf-table');
  if (!table) return;

  gsap.from('.bnf-col-headers', {
    opacity: 0, y: 10, duration: 0.45, ease: 'power2.out',
    scrollTrigger: { trigger: table, start: 'top 88%', once: true }
  });

  gsap.from('.js-bnf-row', {
    opacity: 0, y: 16,
    duration: 0.52, stagger: 0.06, ease: 'power2.out',
    scrollTrigger: { trigger: table, start: 'top 85%', once: true }
  });
})();

// ── Services Accordion: GSAP entrance animations ─────────────────────────────
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. Заголовок: слова выезжают снизу (clip-reveal)
  var words = document.querySelectorAll('.js-svc-word');
  if (words.length) {
    gsap.from(words, {
      y: '100%',
      opacity: 0,
      duration: 0.9,
      stagger: 0.10,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.svc-acc-head',
        start: 'top 88%'
      }
    });
  }

  // 2. Превью-картинка в заголовке: scale 0 → 1
  var headImg = document.querySelector('.js-svc-head-img');
  if (headImg) {
    gsap.from(headImg, {
      scale: 0,
      opacity: 0,
      duration: 1.0,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.svc-acc-head',
        start: 'top 88%'
      }
    });
  }

  // 3. Тело каждой панели: fade-up при первом появлении (только десктоп)
  if (window.innerWidth >= 768) {
    document.querySelectorAll('.js-svc-panel').forEach(function (panel) {
      var body = panel.querySelector('.svc-panel-body-in');
      if (!body) return;
      gsap.from(body, {
        y: 36,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 82%',
          once: true   // анимируется один раз — не повторяется при обратном скроле
        }
      });
    });
  }
})();

// ── Services: мобильный аккордеон (< 768px) ──────────────────────────────────
(function () {
  var mq = window.matchMedia('(max-width: 767px)');

  document.querySelectorAll('.js-svc-hdr').forEach(function (hdr) {
    var panel = hdr.closest('.js-svc-panel');
    if (!panel) return;

    function toggle() {
      if (!mq.matches) return; // на десктопе клик ничего не делает
      var isOpen = panel.classList.toggle('is-open');
      hdr.setAttribute('aria-expanded', String(isOpen));
    }

    hdr.addEventListener('click', toggle);
    // Клавиатурная поддержка: Enter / Space
    hdr.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
})();

// FAQ — accordion toggle (класс is-open, иконка + → ×)
document.querySelectorAll('.js-faq-item').forEach(function (item) {
  var btn = item.querySelector('.faq-q');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var isOpen = item.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
});

// Sidebar
function sidebarFunc() {
    const sidebar = document.querySelector(".nav-links");
    sidebar.classList.toggle("active");
}

const navbar = document.querySelector("nav");
const footer = document.querySelector("footer");

function updateNavbarVisibility() {
    if (!navbar || !footer) return;

    const footerTop = footer.getBoundingClientRect().top;
    navbar.classList.toggle("sticky", footerTop <= window.innerHeight);
}

window.addEventListener('scroll', updateNavbarVisibility);
window.addEventListener('resize', updateNavbarVisibility);
updateNavbarVisibility();

AOS.init();

// ── Hero: entrance timeline (page load) ───────────────────────────────────────
(function () {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!document.querySelector('.hero-card')) return;

  var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Карточка: подъём + появление
  tl.from('.hero-card', {
    y: 20, scale: 0.975, opacity: 0, duration: 1.0,
    transformOrigin: 'center bottom', clearProps: 'transform'
  }, 0);

  // 2. Логотип
  tl.from('.hero-logo', { opacity: 0, duration: 0.55 }, 0.30);

  // 3. Бейдж
  tl.from('.hero-badge', { y: 10, opacity: 0, duration: 0.55 }, 0.38);

  // 4. Слова заголовка: clip-reveal снизу
  tl.from('.hero-hw', {
    y: '108%', opacity: 0, duration: 0.80,
    stagger: 0.07, ease: 'power4.out'
  }, 0.46);

  // 5. Кнопки: stagger
  tl.from('.hero-btn', { y: 14, opacity: 0, duration: 0.55, stagger: 0.10 }, 0.84);
})();
