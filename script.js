
// ── Benefits: floka-style blob hover + GSAP stagger entrance ─────────────────
(function () {
  // ── Blob следует за мышью ──
  document.querySelectorAll('.js-bnf-row').forEach(function (row) {
    var blob = row.querySelector('.bnf-row-blob');
    if (!blob) return;

    row.addEventListener('mouseenter', function () {
      row.classList.add('is-hovered');
    });
    row.addEventListener('mouseleave', function () {
      row.classList.remove('is-hovered');
    });
    row.addEventListener('mousemove', function (e) {
      var rect = row.getBoundingClientRect();
      blob.style.left = (e.clientX - rect.left) + 'px';
      blob.style.top  = (e.clientY - rect.top)  + 'px';
    });
  });

  // ── GSAP stagger entrance (только pointer:fine / нет reduced-motion) ──
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
    duration: 0.52,
    stagger: 0.06,
    ease: 'power2.out',
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
