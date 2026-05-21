/* ============================================================
   freymi — Main Script
   Источники:
   - Lenis init        → lazarev/js/script.js строки 1-14
   - Loader + First    → lazarev/js/script.js строки 52-151 (адаптация)
   - Animated button   → lazarev/js/script.js строки 223-255
   - Parallax          → lazarev/js/script.js строки 354-366
   - ScrollTrigger     → digital-agency/script.js scrollTriggerAnime()
   - FAQ accordion     → Web-Design-Agency/script.js строки 3-12
   - Mobile nav        → digital-agency/script.js героGSAPAnime() nav часть
   ============================================================ */

/* ── 1. Lenis smooth scroll ── */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ── 2. GSAP setup ── */
gsap.registerPlugin(SplitText, ScrollTrigger);

// Lenis → ScrollTrigger sync
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ── 3. Loader + initial animation ── */
(function initLoader() {
  let started = false;

  function startAnimation() {
    if (started) return;
    started = true;

    const loader = document.getElementById('loader');
    if (!loader) return;

    // Split hero title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
      new SplitText('#hero-title .line', { type: 'chars', charsClass: 'charParent' });
      new SplitText('#hero-title .line', { type: 'chars', charsClass: 'charChild' });
    }

    const tl = gsap.timeline();

    // Лоадер схлопывается и уходит вверх
    tl.to('#loader', {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
      delay: 0.6,
      onComplete: () => {
        loader.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
      }
    });

    // Заголовок — буквы въезжают снизу (stagger)
    if (heroTitle) {
      tl.from('#hero-title .charChild', {
        yPercent: 110,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { amount: 0.55 },
      }, '-=0.4');
    }

    // Header появляется
    tl.from('#header-strip', {
      yPercent: -120,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.6');

    // Sub-text и кнопки
    tl.to(['.hero-sub', '.hero-cta'], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
    }, '-=0.3');
  }

  if (document.readyState === 'complete') {
    startAnimation();
  } else {
    window.addEventListener('load', startAnimation, { once: true });
    setTimeout(startAnimation, 1400);
  }
})();

/* ── 4. Header scroll behavior ── */
(function headerScroll() {
  const strip = document.getElementById('header-strip');
  if (!strip) return;

  ScrollTrigger.create({
    start: 'top -80px',
    onEnter: () => strip.classList.add('scrolled'),
    onLeaveBack: () => strip.classList.remove('scrolled'),
  });
})();

/* ── 5. Mobile nav overlay ── */
(function mobileNav() {
  const btn = document.getElementById('menu-btn');
  const overlay = document.getElementById('nav-overlay');
  if (!btn || !overlay) return;

  const links = overlay.querySelectorAll('ul li a');

  function openMenu() {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    lenis.stop();

    gsap.from(links, {
      y: 60,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.07,
      delay: 0.3,
    });
  }

  function closeMenu() {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    lenis.start();
  }

  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Клик по ссылке в оверлее закрывает меню
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Escape закрывает меню
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });
})();

/* ── 6. Hover-lift на кнопках CTA ── */
(function animatedButtons() {
  document.querySelectorAll('#btn-works, #btn-discuss').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { y: -3, duration: 0.25, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { y: 0, duration: 0.35, ease: 'power2.inOut' });
    });
  });
})();

/* ── 7. ScrollTrigger section animations ── */
/* Источник: digital-agency/script.js scrollTriggerAnime() */
(function scrollAnimations() {
  // Marquee fade in
  gsap.from('#marquee', {
    scrollTrigger: { trigger: '#marquee', start: 'top 90%' },
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  // About: текст слева, фото справа
  gsap.from('.about-text', {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    x: -60,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
  });

  gsap.from('.about-photo', {
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
    x: 60,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
  });

  gsap.from('.stat', {
    scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
    y: 30,
    opacity: 0,
    stagger: 0.12,
    duration: 0.6,
    ease: 'power2.out',
  });

  // Process: заголовок + шаги по очереди
  gsap.from('.process-title', {
    scrollTrigger: { trigger: '#process', start: 'top 80%' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  });

  gsap.from('.step', {
    scrollTrigger: { trigger: '.process-list', start: 'top 80%' },
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.6,
    ease: 'power2.out',
  });

  // Portfolio cards
  gsap.from('.work-card', {
    scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' },
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
  });

  // FAQ
  gsap.from('.faq-head', {
    scrollTrigger: { trigger: '#faq', start: 'top 80%' },
    x: -40,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  });

  gsap.from('.quest', {
    scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
    y: 30,
    opacity: 0,
    stagger: 0.08,
    duration: 0.5,
    ease: 'power2.out',
  });

  // CTA
  gsap.from('.cta-title', {
    scrollTrigger: { trigger: '#cta', start: 'top 80%' },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });

  gsap.from(['.cta-sub', '.cta-btns', '.cta-contacts'], {
    scrollTrigger: { trigger: '#cta', start: 'top 75%' },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out',
  });

  // Parallax на hero-bg-img
  gsap.to('.hero-bg-img', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    yPercent: 25,
    ease: 'none',
  });

  // Parallax на #parallax-statement (lazarev/js/script.js 353-366)
  const parallaxEl = document.getElementById('parallax-statement');
  if (parallaxEl) {
    gsap.to(parallaxEl, {
      backgroundPosition: `50% ${-(window.innerHeight * 0.28)}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });

    // Контент появляется при скролле
    gsap.from('#parallax-statement .parallax-content > *', {
      scrollTrigger: { trigger: parallaxEl, start: 'top 70%' },
      y: 55,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
    });
  }
})();

/* ── 8. FAQ accordion ── */
/* Источник: Web-Design-Agency/script.js строки 3-12 + улучшение max-height */
(function faqAccordion() {
  document.querySelectorAll('.quest-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const quest = btn.closest('.quest');
      const ans   = quest.querySelector('.ans');
      const isOpen = quest.classList.contains('open');

      // Закрываем все остальные
      document.querySelectorAll('.quest.open').forEach((openQuest) => {
        openQuest.classList.remove('open');
        openQuest.querySelector('.ans').classList.remove('open');
        openQuest.querySelector('.quest-btn').setAttribute('aria-expanded', 'false');
      });

      // Переключаем текущий
      if (!isOpen) {
        quest.classList.add('open');
        ans.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ── 9. Анимированная кнопка — 3D разлёт символов ── */
/* Источник: lazarev/js/script.js строки 222-255 */
(function animatedButton() {
  const btn = document.getElementById('btn-discuss');
  if (!btn) return;

  const defaultEl = btn.querySelector('.btn-default');
  const hoverEl   = btn.querySelector('.btn-hover');
  if (!defaultEl || !hoverEl) return;

  // Двойной SplitText: charParent (overflow:hidden) → charChild (анимируется)
  new SplitText(defaultEl, { type: 'chars', charsClass: 'charParent' });
  new SplitText(defaultEl, { type: 'chars', charsClass: 'charChild' });
  new SplitText(hoverEl,   { type: 'chars', charsClass: 'charParent' });
  new SplitText(hoverEl,   { type: 'chars', charsClass: 'charChild' });

  // Hover-буквы изначально скрыты ниже видимой области
  gsap.set(hoverEl.querySelectorAll('.charChild'), { yPercent: 105, opacity: 0 });

  const tl = gsap.timeline({ paused: true });

  // Default: улетают вверх с 3D-поворотом по оси X
  tl.to(defaultEl.querySelectorAll('.charChild'), {
    yPercent: -105,
    rotateX: -75,
    transformPerspective: 500,
    opacity: 0,
    stagger: { amount: 0.22 },
    ease: 'power1.inOut',
    duration: 0.35,
  });

  // Hover: вплывают снизу
  tl.to(hoverEl.querySelectorAll('.charChild'), {
    yPercent: 0,
    opacity: 1,
    stagger: { amount: 0.22 },
    ease: 'power1.inOut',
    duration: 0.35,
  }, '-=0.3');

  btn.addEventListener('mouseenter', () => tl.play());
  btn.addEventListener('mouseleave', () => tl.reverse());
})();

/* ── 10. Smooth anchor scroll (через Lenis) ── */
(function anchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    });
  });
})();
