/* ============================================================
   KADR. — Language Switcher (RU / EN)
   ============================================================ */

const translations = {
  ru: {
    /* Nav */
    'nav-home':    'Главная',
    'nav-about':   'О студии',
    'nav-process': 'Процесс',
    'nav-work':    'Работы',
    'nav-faq':     'FAQ',
    'nav-contact': 'Связаться',

    /* Hero */
    'hero-status':  'Доступны для новых проектов',
    'hero-line1':   'Дизайн сайта,',
    'hero-line2a':  'который',
    'hero-line2b':  'продаёт',
    'hero-line3':   'с первого экрана',
    'hero-sub':     'Один экран — 30 000 ₽. Первый покажем через 24 часа.',
    'hero-btn1':    'Смотреть работы',
    'hero-btn2':    'Обсудить проект',
    'hero-scroll':  'Скролл',

    /* About */
    'about-tag':   'О студии',
    'about-title': 'Делаем сайты, которые не стыдно показать.',
    'about-desc':  'Небольшая команда из Москвы. Работаем только с визуальной частью: структура, экраны, логика. Без воды, без ожидания неделями, без правок по три круга. Просто хороший дизайн — быстро.',
    'stat1':       'проекта',
    'stat2':       'года в дизайне',
    'stat3':       'первый результат',
    'about-link':  'О нас подробнее',

    /* Process */
    'process-tag':   'Как это работает',
    'process-title': 'Четыре шага — от идеи до готового сайта',
    'step1-title':   'Рассказываете задачу',
    'step1-desc':    'Звонок или сообщение. 15 минут — и мы понимаем, что нужно сделать.',
    'step2-title':   'Через 24 часа — первый экран',
    'step2-desc':    'Смотрите готовый макет. Пока бесплатно — без обязательств.',
    'step3-title':   'Нравится — продолжаем',
    'step3-desc':    'Оплачиваете 50% и мы делаем весь сайт. Без предоплаты за кота в мешке.',
    'step4-title':   'Принимаете работу',
    'step4-desc':    'Остаток — после сдачи. Без сюрпризов и лишних правок.',

    /* Portfolio */
    'portfolio-tag':   'Работы',
    'portfolio-title': 'Выбранные проекты',
    'portfolio-count': '4 проекта',
    'case1-tag':  'Коммерческая недвижимость',
    'case2-tag':  'Продуктовый сайт',
    'case3-tag':  'Промышленный парк',
    'case4-tag':  'Промтехнопарк',

    /* FAQ */
    'faq-tag':   'Частые вопросы',
    'faq-title': 'Отвечаем честно',
    'q1': 'Что такое "один экран"?',
    'a1': 'Один полноценный блок страницы — hero, секция с услугами, контакт. У каждого экрана своя уникальная верстка и дизайн. Цена — 30 000 ₽ за экран.',
    'q2': 'Вы делаете только дизайн или и вёрстку тоже?',
    'a2': 'Включена полная вёрстка — HTML, CSS, JS анимации. Backend, CMS и SEO — по отдельной договорённости.',
    'q3': 'Сколько займёт весь сайт?',
    'a3': 'Одностраничный сайт на 6 экранов — 7-10 рабочих дней. Многостраничный сайт — от 2 недель.',
    'q4': 'Что если мне не понравится первый экран?',
    'a4': 'Расходимся без оплаты. Первый экран — наша ставка на то, что мы попадём в задачу. Обычно попадаем.',
    'q5': 'Можно ли самому редактировать сайт?',
    'a5': 'Если нужна CMS — обсуждаем заранее и закладываем в бюджет. Без CMS сайт получается легче и быстрее.',
    'q6': 'Работаете с компаниями не из Москвы?',
    'a6': 'Да. Всё онлайн. Неважно, где вы находитесь.',

    /* CTA */
    'cta-title': 'Готовы начать?',
    'cta-sub':   'Расскажите задачу — через 24 часа пришлём первый экран.',
    'cta-btn1':  'Написать нам',
    'cta-btn2':  'Заказать обратный звонок',

    /* Footer */
    'footer-tagline': 'Дизайн сайтов, которые\nпродают с первого экрана.',
    'footer-copy':    '© 2026 KADR. Все права защищены.',

    /* About page */
    'about-page-tag':    'О студии',
    'about-hero-line1':  'Делаем так,',
    'about-hero-line2':  'чтобы вам не пришлось',
    'about-hero-line3':  'объяснять дважды.',
    'about-hero-sub':    'Небольшая команда дизайнеров. Работаем честно, быстро и без лишних слов.',
    'about-phil-tag':    'Наш подход',
    'about-phil-title':  'Три принципа, которые не меняются',
    'block1-title':      'Дизайн без воды',
    'block1-desc':       'Не делаем "красивенько". Делаем так, чтобы сайт решал задачу: приводил заявки, объяснял продукт, вызывал доверие. Каждый экран — под конкретную цель.',
    'block2-title':      '24 часа — это не маркетинг',
    'block2-desc':       'Реальный срок первого макета. Мы не берём проекты в очередь на месяц. Если взяли — делаем сразу, пока задача ещё свежая.',
    'block3-title':      'Сначала смотрите, потом платите',
    'block3-desc':       'Первый экран — бесплатно. Потому что мы уверены в результате и хотим, чтобы вы убедились сами. Без кота в мешке.',
    'about-num-tag':     'В цифрах',
    'num1':              'Проектов сдано',
    'num2':              'Года в дизайне',
    'num3':              'Первый результат',
    'num4':              'Предоплата, не 100%',
    'about-cta-title':   'Хотите увидеть результат?',
    'about-cta-btn':     'Обсудить проект',

    /* Contact page */
    'contact-tag':          'Контакт',
    'contact-hero-title':   'Обсудим?',
    'contact-hero-sub':     'Напишите задачу — ответим в течение часа.',
    'contact-email-label':  'Почта',
    'contact-phone-label':  'Телефон',
    'contact-city-label':   'Город',
    'contact-city-value':   'Москва',
    'form-tag':             'Написать нам',
    'form-title':           'Расскажите о задаче',
    'form-desc':            'Коротко — что нужно сделать, какой бизнес, есть ли дедлайн. Остальное обсудим в переписке или на коротком звонке.',
    'promise1':             'Ответим в течение часа в рабочее время',
    'promise2':             'Первый экран — через 24 часа после брифа',
    'promise3':             'Оплата только после одобрения первого макета',
    'field-name':           'Имя',
    'field-contact':        'Телефон или email',
    'field-task':           'Коротко о задаче',
    'form-submit':          'Отправить',
    'form-callback':        'Заказать обратный звонок',
    'form-ok':              'Спасибо! Ответим в течение часа.',
    'socials-title':        'Мы в соцсетях',
  },

  en: {
    /* Nav */
    'nav-home':    'Home',
    'nav-about':   'About',
    'nav-process': 'Process',
    'nav-work':    'Work',
    'nav-faq':     'FAQ',
    'nav-contact': 'Contact',

    /* Hero */
    'hero-status':  'Available for new projects',
    'hero-line1':   'Website design',
    'hero-line2a':  'that',
    'hero-line2b':  'converts',
    'hero-line3':   'from the first screen',
    'hero-sub':     'One screen — 30 000 ₽. We\'ll show the first one in 24 hours.',
    'hero-btn1':    'See our work',
    'hero-btn2':    'Discuss project',
    'hero-scroll':  'Scroll',

    /* About */
    'about-tag':   'About',
    'about-title': 'We design sites you\'re proud to show.',
    'about-desc':  'A small team from Moscow. We focus purely on visual design: structure, screens, logic. No fluff, no endless waiting, no revision loops. Just solid design — delivered fast.',
    'stat1':       'projects',
    'stat2':       'years in design',
    'stat3':       'to first result',
    'about-link':  'More about us',

    /* Process */
    'process-tag':   'How it works',
    'process-title': 'Four steps — from idea to finished site',
    'step1-title':   'You brief us',
    'step1-desc':    'A call or message. 15 minutes to understand the task.',
    'step2-title':   'First screen in 24 hours',
    'step2-desc':    'See a finished mockup. No charge yet — no obligations.',
    'step3-title':   'You approve — we continue',
    'step3-desc':    'Pay 50% upfront and we design the full site. No paying blind.',
    'step4-title':   'You accept the work',
    'step4-desc':    'Pay the rest on delivery. No surprises, no extra rounds.',

    /* Portfolio */
    'portfolio-tag':   'Work',
    'portfolio-title': 'Selected projects',
    'portfolio-count': '4 projects',
    'case1-tag':  'Commercial real estate',
    'case2-tag':  'Product website',
    'case3-tag':  'Industrial park',
    'case4-tag':  'Tech park',

    /* FAQ */
    'faq-tag':   'FAQ',
    'faq-title': 'Honest answers',
    'q1': 'What does "one screen" mean?',
    'a1': 'One complete section of a page — hero, services block, contact. Each screen has unique layout and design. Price — 30 000 ₽ per screen.',
    'q2': 'Do you do design only, or development too?',
    'a2': 'Full front-end development is included — HTML, CSS, JS animations. Backend, CMS and SEO are negotiated separately.',
    'q3': 'How long does a full site take?',
    'a3': 'A 6-screen one-page site — 7-10 business days. Multi-page site — from 2 weeks.',
    'q4': 'What if I don\'t like the first screen?',
    'a4': 'We part ways with no charge. The first screen is our bet that we\'ll nail the brief. We usually do.',
    'q5': 'Can I edit the site myself?',
    'a5': 'If you need a CMS — we discuss it upfront and include it in the budget. Without a CMS the site is lighter and faster.',
    'q6': 'Do you work with companies outside Moscow?',
    'a6': 'Yes. Everything is remote. Doesn\'t matter where you are.',

    /* CTA */
    'cta-title': 'Ready to start?',
    'cta-sub':   'Tell us the task — we\'ll send the first screen in 24 hours.',
    'cta-btn1':  'Write to us',
    'cta-btn2':  'Request a callback',

    /* Footer */
    'footer-tagline': 'Website design that converts\nfrom the first screen.',
    'footer-copy':    '© 2026 KADR. All rights reserved.',

    /* About page */
    'about-page-tag':    'About',
    'about-hero-line1':  'We make sure',
    'about-hero-line2':  'you never have to',
    'about-hero-line3':  'explain the brief twice.',
    'about-hero-sub':    'A small team of designers. We work honestly, fast, and without extra words.',
    'about-phil-tag':    'Our approach',
    'about-phil-title':  'Three principles that don\'t change',
    'block1-title':      'Design without filler',
    'block1-desc':       'We don\'t make things "pretty". We make sites that solve problems: generate leads, explain the product, build trust. Every screen has a specific goal.',
    'block2-title':      '24 hours — that\'s not marketing',
    'block2-desc':       'It\'s the real deadline for the first mockup. We don\'t queue projects for a month. If we take it — we start immediately.',
    'block3-title':      'See it first, then pay',
    'block3-desc':       'The first screen is free. Because we\'re confident in the result and want you to be too. No buying blind.',
    'about-num-tag':     'By the numbers',
    'num1':              'Projects delivered',
    'num2':              'Years in design',
    'num3':              'To first result',
    'num4':              'Upfront, not 100%',
    'about-cta-title':   'Want to see the result?',
    'about-cta-btn':     'Discuss project',

    /* Contact page */
    'contact-tag':          'Contact',
    'contact-hero-title':   'Let\'s talk?',
    'contact-hero-sub':     'Send us the brief — we\'ll reply within an hour.',
    'contact-email-label':  'Email',
    'contact-phone-label':  'Phone',
    'contact-city-label':   'City',
    'contact-city-value':   'Moscow',
    'form-tag':             'Write to us',
    'form-title':           'Tell us about the project',
    'form-desc':            'Briefly — what needs to be done, what\'s the business, any deadline. We\'ll discuss the rest in chat or on a quick call.',
    'promise1':             'We reply within an hour during business hours',
    'promise2':             'First screen — 24 hours after the brief',
    'promise3':             'Payment only after approving the first mockup',
    'field-name':           'Name',
    'field-contact':        'Phone or email',
    'field-task':           'Brief description',
    'form-submit':          'Send',
    'form-callback':        'Request a callback',
    'form-ok':              'Thank you! We\'ll reply within an hour.',
    'socials-title':        'Find us on social media',
  }
};

function setLang(lang) {
  if (!translations[lang]) return;

  // Сохраняем выбор
  try { localStorage.setItem('kadr-lang', lang); } catch(e) {}

  // Обновляем атрибут html
  document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';

  // Обновляем все тексты
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang][key];
    if (text !== undefined) el.textContent = text;
  });

  // Обновляем все кнопки переключателя на всех страницах
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Диспетчеризуем событие для внешних слушателей
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

// Инициализация при загрузке страницы
(function initLang() {
  let saved = 'ru';
  try { saved = localStorage.getItem('kadr-lang') || 'ru'; } catch(e) {}
  // Применяем без мигания — до рендера
  setLang(saved);
})();
