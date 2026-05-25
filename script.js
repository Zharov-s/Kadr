
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

  // 3. Тело каждой панели: fade-up при первом появлении
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
})();

// FAQ section
document.querySelectorAll('.quest').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.ans');
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
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

// ---- Логотип: wiggle loop + magnetic pull ----
(function () {
    var logo = document.querySelector('.hero-logo-img');
    var zone = document.querySelector('.hero-logo');
    if (!logo || !zone || typeof gsap === 'undefined') return;

    var STRENGTH = 0.38;

    // Точка трансформации — центр логотипа
    gsap.set(logo, { transformOrigin: '50% 50%' });

    // Wiggle-таймлайн: симулирует CustomWiggle({wiggles: 8, type: easeOut})
    // Амплитуда убывает геометрически (~×0.65 на каждом обороте)
    var wiggle = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });
    wiggle
        .to(logo, { rotation:  8,    duration: 0.18, ease: 'power2.out'   })
        .to(logo, { rotation: -5.5,  duration: 0.17, ease: 'power2.inOut' })
        .to(logo, { rotation:  3.8,  duration: 0.16, ease: 'power2.inOut' })
        .to(logo, { rotation: -2.6,  duration: 0.15, ease: 'power2.inOut' })
        .to(logo, { rotation:  1.7,  duration: 0.13, ease: 'power2.inOut' })
        .to(logo, { rotation: -1.1,  duration: 0.12, ease: 'power2.inOut' })
        .to(logo, { rotation:  0.6,  duration: 0.10, ease: 'power2.inOut' })
        .to(logo, { rotation:  0,    duration: 0.09, ease: 'power2.in'    });

    // Magnetic pull — overwrite: "auto" не трогает rotation из wiggle
    zone.addEventListener('mousemove', function (e) {
        var rect = zone.getBoundingClientRect();
        var x = gsap.utils.mapRange(rect.left, rect.right, -rect.width  / 2, rect.width  / 2, e.clientX);
        var y = gsap.utils.mapRange(rect.top,  rect.bottom, -rect.height / 2, rect.height / 2, e.clientY);

        gsap.to(logo, {
            x: x * STRENGTH,
            y: y * STRENGTH,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });

    // Elastic return — wiggle продолжается
    zone.addEventListener('mouseleave', function () {
        gsap.to(logo, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto'
        });
    });
})();

// ---- ScrollMotion Showcase: iframe scale + scroll forwarding ----
(function () {
    var wrap   = document.getElementById('showcase');
    var iframe = document.getElementById('showcaseIframe');
    if (!wrap || !iframe) return;

    var IFRAME_W   = 1440; // натуральная ширина Apple-страницы
    var iframeScrollY = 0;
    var lastScrollY   = window.scrollY;
    var iframeReady   = false;

    // Масштабируем iframe под ширину капсулы, высоту рассчитываем пропорционально
    function updateScale() {
        var capsule = document.querySelector('.showcase-capsule');
        if (!capsule) return;
        var scale = capsule.offsetWidth / IFRAME_W;
        var naturalH = Math.ceil(capsule.offsetHeight / scale);
        iframe.style.transform = 'scale(' + scale + ')';
        iframe.style.height    = naturalH + 'px';
    }

    iframe.addEventListener('load', function () {
        iframeReady   = true;
        iframeScrollY = 0;
        updateScale();
    });

    window.addEventListener('resize', updateScale);
    updateScale();

    // Весь диапазон скролла секции → 8000px в iframe
    // (section-01: 4000px + section-02: 4000px)
    function getAmp() {
        var scrollable = wrap.offsetHeight - window.innerHeight;
        return scrollable > 0 ? 8000 / scrollable : 8;
    }

    window.addEventListener('scroll', function () {
        var delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;

        var rect = wrap.getBoundingClientRect();
        if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
        if (!iframeReady) return;

        iframeScrollY = Math.max(0, iframeScrollY + delta * getAmp());

        try {
            iframe.contentWindow.postMessage(
                { type: 'fraymi-scroll', y: Math.round(iframeScrollY) },
                '*'
            );
        } catch (e) {}
    }, { passive: true });
})();
