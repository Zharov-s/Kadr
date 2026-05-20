# freymi — План реализации сайта

> Рабочая директория: `/Users/sergeyzharov/Desktop/Веб ДИЗАЙН/kadr/`
> После каждого этапа Claude Code пишет: **"Этап X завершён. Осталось: Y этапов."**

---

## Справочник бренда

| Параметр | Значение |
|---|---|
| Название | freymi |
| Слоган | Дизайн, который неловко не купить |
| Оффер | Один экран — 30 000 ₽. Первый — через 24 часа. |
| Email | zharovpeak@gmail.com |
| Телефон | +7 925 505-97-72 |
| Telegram | https://t.me/zharovpeak (ссылка-заглушка, заменить) |
| Instagram | https://instagram.com/zharovpeak (ссылка-заглушка, заменить) |

## Цветовая схема

```css
--bg-dark:    #0F0F0E   /* hero, footer, тёмные секции */
--bg-light:   #F2F1EC   /* about, process, светлые секции */
--accent:     #C8FF47   /* кнопки, выделения, точки */
--text-white: #FFFFFF
--text-dark:  #111110
--text-muted: #888882
--border:     rgba(255,255,255,0.08)  /* на тёмном */
--border-l:   rgba(0,0,0,0.08)        /* на светлом */
```

## Шрифты

- Заголовки: Gilroy Heavy / Bold (woff, локально из `/fonts/`)
- Тело: Inter 400/500 (Google Fonts CDN)

## Структура файлов (итоговая)

```
kadr/
├── index.html          ← Главная (все секции)
├── about.html          ← О студии
├── contact.html        ← Контакт
├── css/
│   ├── style.css       ← переменные, reset, типографика, утилиты
│   ├── loader.css
│   ├── header.css
│   ├── hero.css
│   ├── marquee.css
│   ├── about.css
│   ├── process.css
│   ├── portfolio.css
│   ├── faq.css
│   ├── cta.css
│   └── footer.css
├── js/
│   ├── gsap.min.js         ← уже скопирован
│   ├── SplitText.min.js    ← уже скопирован
│   ├── ScrollTrigger.min.js ← уже скопирован
│   ├── lenis.min.js        ← уже скопирован
│   ├── script.js           ← главный скрипт
│   └── lang.js             ← переключатель RU/EN
├── fonts/
│   ├── Gilroy-Bold.woff    ← уже скопирован
│   ├── Gilroy-Heavy.woff   ← уже скопирован
│   ├── Gilroy-Medium.woff  ← уже скопирован
│   └── Gilroy-Regular.woff ← уже скопирован
└── images/
    ├── hero-noise.png      ← уже скопирован (grain текстура)
    ├── hero-bg.png         ← уже скопирован (лайм свечение)
    ├── about-photo.png     ← уже скопирован (воркспейс)
    └── portfolio/
        ├── case-1.png      ← скриншот ABCENTRUM (All-main)
        ├── case-2.png      ← скриншот Митино (Mitino-main)
        ├── case-3.png      ← скриншот Некрасовка (Nekrasovka)
        └── case-4.png      ← скриншот ВерниВещь (VV)
```

> **Важно:** скриншоты портфолио нужно сделать вручную из папки Портфолио.
> Открыть index.html каждого проекта в браузере → снять screenshot полной ширины →
> сохранить как case-1.png ... case-4.png в images/portfolio/

---

## Источники компонентов

| Компонент | Откуда берём | Что меняем |
|---|---|---|
| Lenis init | lazarev/js/script.js строки 1-14 | ничего |
| SplitText hero | lazarev/js/script.js строки 20-48 | селекторы |
| Loader animation | lazarev/js/script.js строки 52-151 | текст, цвет |
| Animated button charChild | lazarev/js/script.js строки 223-255 | селекторы |
| Hover line on rows | lazarev/css/input.css pattern before:scale-x-0 | новые CSS vars |
| Parallax sections | lazarev/js/script.js строки 354-366 | ничего |
| Mobile nav clip-path overlay | digital-agency/style.css строки 105-118 | цвет, шрифт |
| mix-blend-mode logo | digital-agency/style.css строка 78 | применить к .logo |
| Bidirectional marquee | Web-Design-Agency/styles/infinite.css | цвета на лайм |
| FAQ accordion | Web-Design-Agency/script.js строки 3-12 | ничего |
| Portfolio hover swap | Web-Design-Agency/styles/portfolio.css | цвета фонов |
| Status dot .pulse | Web-Design-Agency/styles/hero.css .green | добавить pulse |
| ScrollTrigger fade-in | digital-agency/script.js scrollTriggerAnime() | все секции |

---

## Тексты (RU / EN)

### Hero
```
RU: Дизайн сайта,
    который продаёт
    с первого экрана

EN: Website design
    that converts
    from the first screen

Sub RU: Один экран — 30 000 ₽. Первый покажем через 24 часа.
Sub EN: One screen — 30 000 ₽. We'll show the first one in 24 hours.

CTA1 RU: Смотреть работы  / EN: See our work
CTA2 RU: Обсудить проект  / EN: Discuss project

Status RU: Доступны для новых проектов
Status EN: Available for new projects
```

### Marquee (один набор, повторяется)
```
Дизайн сайта  ✦  30 000 ₽/экран  ✦  24 часа  ✦  Редизайн  ✦  UI/UX  ✦  Москва
```

### About
```
Заголовок RU: Делаем сайты, которые не стыдно показать.
Заголовок EN: We design sites you're proud to show.

Текст RU:
Небольшая команда из Москвы. Работаем только с визуальной частью:
структура, экраны, логика. Без воды, без ожидания неделями,
без правок по три круга. Просто хороший дизайн — быстро.

Текст EN:
A small team from Moscow. We focus purely on visual design:
structure, screens, logic. No fluff, no endless waiting,
no revision loops. Just solid design — delivered fast.

Цифры:
4+  RU: проекта / EN: projects
3+  RU: года в дизайне / EN: years in design
24ч RU: на первый результат / EN: to first result
```

### Process
```
Заголовок RU: Как это работает / EN: How it works

01  RU: Рассказываете задачу
    EN: You brief us
    RU desc: Звонок или сообщение. 15 минут — и мы понимаем задачу.
    EN desc: A call or message. 15 minutes to understand the task.

02  RU: Через 24 часа — первый экран
    EN: First screen in 24 hours
    RU desc: Смотрите готовый макет. Пока бесплатно — без обязательств.
    EN desc: See a finished mockup. No charge yet — no obligations.

03  RU: Нравится — продолжаем
    EN: You approve — we continue
    RU desc: Оплачиваете 50% и мы делаем весь сайт.
    EN desc: Pay 50% upfront and we design the full site.

04  RU: Принимаете работу
    EN: You accept the work
    RU desc: Остаток после сдачи. Без сюрпризов и лишних правок.
    EN desc: Pay the rest on delivery. No surprises, no extra rounds.
```

### Portfolio (4 кейса)
```
Кейс 1: ABCENTRUM
Tag RU: Коммерческая недвижимость / EN: Commercial real estate
Link: ../Портфолио/All-main/index.html

Кейс 2: Митино
Tag RU: Промтехнопарк / EN: Industrial park
Link: ../Портфолио/Mitino-main/index.html

Кейс 3: Некрасовка
Tag RU: Жилой комплекс / EN: Residential complex
Link: ../Портфолио/Nekrasovka/index.html

Кейс 4: ВерниВещь
Tag RU: Продуктовый сайт / EN: Product website
Link: ../Портфолио/VV/index.html
```

### FAQ
```
Q1 RU: Что такое "один экран"?
A1 RU: Один полноценный блок страницы — hero, секция с услугами, контакт.
       У каждого экрана своя уникальная верстка и дизайн. Цена — 30 000 ₽ за экран.

Q2 RU: Вы делаете только дизайн или и вёрстку тоже?
A2 RU: Включена полная вёрстка — HTML, CSS, JS анимации. Backend,
       CMS и SEO — по отдельной договорённости.

Q3 RU: Сколько займёт весь сайт?
A3 RU: Лендинг на 6 экранов — 7-10 рабочих дней. Многостраничник — от 2 недель.

Q4 RU: Что если мне не понравится первый экран?
A4 RU: Расходимся без оплаты. Первый экран — наша ставка. Обычно попадаем.

Q5 RU: Можно ли будет самому редактировать сайт?
A5 RU: Если нужна CMS — обсуждаем заранее и закладываем в бюджет.

Q6 RU: Работаете с компаниями не из Москвы?
A6 RU: Да. Всё онлайн. Неважно, где вы находитесь.

(EN варианты FAQ — в lang.js)
```

### CTA block
```
Заголовок RU: Готовы начать?  / EN: Ready to start?
Sub RU: Расскажите задачу — через 24 часа пришлём первый экран.
Sub EN: Tell us the task — we'll send the first screen in 24 hours.
Кнопка1 RU: Написать нам / EN: Contact us
Кнопка2 RU: Заказать обратный звонок / EN: Request a callback
```

### Footer
```
© 2026 freymi. Дизайн сайтов.
Email: zharovpeak@gmail.com
Phone: +7 925 505-97-72
Nav: Главная / О студии / Контакт
Socials: Telegram | Instagram
```

### About page (about.html)
```
Hero RU: Мы делаем так,
         чтобы вам не пришлось
         объяснять дизайнеру дважды.

Hero EN: We make sure you never
         have to explain the brief
         twice.

Блок 1 — Подход:
RU: Дизайн без воды
Текст: Не делаем "красивенько". Делаем так, чтобы
сайт решал задачу: приводил заявки, объяснял продукт,
вызывал доверие. Каждый экран — под конкретную цель.

Блок 2 — Скорость:
RU: 24 часа — это не маркетинг
Текст: Реальный срок первого макета. Мы не берём
проекты в очередь на месяц. Если взяли — делаем сразу.

Блок 3 — Оплата:
RU: Сначала смотрите, потом платите
Текст: Первый экран — бесплатно. Потому что мы уверены
в результате и хотим, чтобы вы тоже убедились.
```

### Contact page (contact.html)
```
Hero RU: Обсудим? / EN: Let's talk?
Sub RU: Напишите задачу — ответим в течение часа.
Sub EN: Send us the brief — we'll reply within an hour.

Форма:
- Имя / Name
- Телефон или email / Phone or email
- Коротко о задаче / Brief description (textarea, 3 строки)
- Кнопка: Отправить / Send

Кнопка обратного звонка: Заказать обратный звонок / Request callback
```

---

# ЭТАПЫ РЕАЛИЗАЦИИ

---

## Этап 1 — Базовые стили: css/style.css

**Создать файл:** `css/style.css`

Содержимое:
- CSS custom properties (все цвета, шрифты, отступы)
- @font-face для Gilroy (4 веса)
- Google Fonts import для Inter
- Reset (* box-sizing, margin, padding)
- Base typography (h1-h6 Gilroy Heavy, p Inter)
- Утилиты: `.container` (max-width 1320px, margin auto, padding 0 clamp(20px,5vw,80px))
- `.btn-primary` и `.btn-secondary` (без анимации — JS добавим позже)
- `.section-tag` (маленький лейбл над заголовком)
- Scrollbar кастомный (тёмный)

**Проверка:** открыть пустой index.html с `<link rel="stylesheet" href="css/style.css">` — шрифты должны загрузиться.

---

## Этап 2 — Скелет index.html + Loader + Header

**Создать файл:** `index.html`
**Создать файлы:** `css/loader.css`, `css/header.css`

### index.html — полный HTML-скелет

Структура (заглушки для секций, реальный контент будет наполнен):
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- meta, title, CSS links, favicon placeholder -->
</head>
<body class="overflow-hidden">
  <!-- #loader -->
  <!-- <header> #header-strip + <nav> #main-nav -->
  <!-- <main> -->
    <!-- #hero -->
    <!-- #marquee -->
    <!-- #about -->
    <!-- #process -->
    <!-- #portfolio -->
    <!-- #faq -->
    <!-- #cta -->
  <!-- </main> -->
  <!-- <footer> -->
  <!-- JS scripts в конце body -->
</body>
</html>
```

### Loader (#loader)
Источник: lazarev/index.html строки 17-27 + адаптация
- Белый/тёмный полноэкранный оверлей
- Зелёная полоска (цвет #C8FF47) с анимацией animate-loading
- Логотип или текст "freymi" по центру
- CSS: position fixed, z-index 9999, bg #0F0F0E

### Header
Источник: digital-agency/style.css (navbar) + lazarev header
- `#header-strip`: fixed top-0, full width, padding 20px 5%, z-index 1000
- Левая часть: `.logo` — текст "freymi" Gilroy Heavy, white, mix-blend-mode: difference
- Правая часть: nav links (скрыты на мобиле) + lang switch RU/EN + `.btn-cta` ("Связаться")
- Hamburger: два span, трансформируются в X при клике
- `#nav-overlay`: full-screen dark overlay, clip-path: inset(0 0 100% 0), большие ссылки

**Проверка:** видна шапка, loader появляется при загрузке (CSS-only пока).

---

## Этап 3 — Hero section

**Наполнить в index.html:** секцию `#hero`
**Создать файл:** `css/hero.css`

### HTML структура hero
```html
<section id="hero">
  <!-- фон: hero-bg.png + hero-noise.png (псевдоэлемент ::after) -->
  <div class="hero-content">
    <div class="hero-status">
      <span class="status-dot"></span>
      <span data-ru="Доступны для новых проектов" data-en="Available for new projects"></span>
    </div>
    <h1 id="hero-title">
      <!-- 3 строки, JS сделает SplitText по буквам -->
      <span class="line">Дизайн сайта,</span>
      <span class="line">который <em>продаёт</em></span>
      <span class="line">с первого экрана</span>
    </h1>
    <p class="hero-sub" data-ru="Один экран — 30 000 ₽..." data-en="One screen — 30 000 ₽..."></p>
    <div class="hero-cta">
      <a href="#portfolio" id="animated-btn" class="btn-primary">
        <span id="default-text">Смотреть работы</span>
        <span id="hover-text">Смотреть работы</span>
      </a>
      <a href="contact.html" id="animated-btn" class="btn-secondary">
        <span id="default-text">Обсудить проект</span>
        <span id="hover-text">Обсудить проект</span>
      </a>
    </div>
  </div>
</section>
```

### CSS hero
- min-height: 100dvh, flex column center, position relative
- Фон: `background-image: url('../images/hero-bg.png')`, cover
- Наложение grain: `::after { background: url('../images/hero-noise.png'), opacity: 0.35 }`
- `.hero-title`: font-size clamp(3rem, 8vw, 9rem), Gilroy Heavy, uppercase, line-height 0.95
- `em` в заголовке: color #C8FF47, font-style italic
- `.status-dot`: 8px, background #C8FF47, border-radius 50%, animation: pulse 2s infinite
- @keyframes pulse: box-shadow 0→20px rgba(200,255,71,0.4)→0

**Проверка:** hero занимает весь экран, заголовок виден, точка пульсирует.

---

## Этап 4 — Marquee + About

**Наполнить в index.html:** `#marquee` и `#about`
**Создать файлы:** `css/marquee.css`, `css/about.css`

### Marquee
Источник: Web-Design-Agency/styles/infinite.css — полная копия с изменениями:
- Цвет border-left: #C8FF47 (вместо #10d07f)
- Gradient: rgba(200,255,71,0.25) → transparent
- 2 ряда: `.marquee-left` и `.marquee-right` (едут навстречу)
- Текст: "Дизайн сайта ✦ 30 000 ₽/экран ✦ 24 часа ✦ Редизайн ✦ UI/UX ✦ Москва"
- Фон секции: #0F0F0E (тёмный, продолжение hero)
- Размер шрифта: clamp(2.5rem, 5vw, 4.5rem), Gilroy Heavy

### About
Источник: digital-agency/style.css about section
- 2 колонки (flex, gap 80px): текст слева, фото справа
- Фон секции: #F2F1EC (первая светлая секция)
- `.about-tag`: маленький лейбл "О студии" / "About us", цвет #C8FF47, uppercase, letter-spacing
- Заголовок: Gilroy Heavy, clamp(2.5rem, 5vw, 5rem)
- `.about-stats`: flex row, gap 48px. Каждый stat: число Gilroy Heavy цвет #C8FF47 + подпись Inter muted
- Фото: `images/about-photo.png`, border-radius 16px, height 480px, object-fit cover
- На фото при hover: WebGL Shery.js если CDN доступен, иначе scale(1.03) transform

**Проверка:** marquee скроллится в обе стороны, about отображается корректно.

---

## Этап 5 — Process + Portfolio

**Наполнить в index.html:** `#process` и `#portfolio`
**Создать файлы:** `css/process.css`, `css/portfolio.css`

### Process
Источник: lazarev/css/input.css hover-line pattern
- Фон: #0F0F0E (снова тёмный — чередование)
- Заголовок секции + 4 шага в виде вертикального списка (или 2x2 сетка на десктопе)
- Каждый шаг: `.step` = flex row: номер (01-04) + контент (title + desc)
- Hover линия: `::before { content:''; position:absolute; width:100%; height:1px; background:#C8FF47; transform:scaleX(0); origin:left; transition:0.6s cubic-bezier(0.85,0,0.15,1) }` + `hover::before { scaleX(1) }`
- Разделитель между шагами: `border-bottom: 1px solid rgba(255,255,255,0.08)`
- Номера: Gilroy Heavy, color: rgba(255,255,255,0.15), font-size: clamp(2rem,4vw,4rem)

### Portfolio
Источник: Web-Design-Agency/styles/portfolio.css
- Фон: #F2F1EC (светлый)
- Заголовок + подпись "4 проекта" справа
- 2x2 grid, gap 20px, max-width 1200px
- Каждая карточка `.work-card`:
  - `.work-banner`: overflow hidden, border-radius 12px, padding-top 56% (aspect ratio)
  - `img.main-img`: object-fit cover, transition opacity 0.4s
  - `img.hover-img`: position absolute, top 0, opacity 0, transition 0.4s
  - `:hover .hover-img { opacity: 1 }`
- Фоновые цвета карточек (один на каждую):
  - case-1: #1A1A1A (тёмный)
  - case-2: #0F2B1E (тёмно-зелёный)
  - case-3: #1A0F0F (тёмно-красный)
  - case-4: #0F0F2B (тёмно-синий)
- Под баннером: название проекта + ссылка "Смотреть →" (стрелка #C8FF47)
- **ВАЖНО:** если скриншотов нет в images/portfolio/ — использовать цветные placeholder-фоны

**Проверка:** 4 карточки в сетке, при hover меняется изображение (или появляется оверлей с названием).

---

## Этап 6 — FAQ + CTA + Footer

**Наполнить в index.html:** `#faq`, `#cta`, `<footer>`
**Создать файлы:** `css/faq.css`, `css/cta.css`, `css/footer.css`

### FAQ
Источник: Web-Design-Agency/script.js строки 3-12 (логика) + новый CSS
- Фон: #F2F1EC
- 6 вопросов из раздела "Тексты" выше
- Каждый `.quest`: border-bottom 1px solid var(--border-l), padding 28px 0
- Заголовок вопроса: flex space-between + иконка "+" (трансформируется в "−")
- Ответ `.ans`: display:none по умолчанию, JS переключает
- При открытии: плавный slideDown (JS добавляет height от 0 до auto)

### CTA block
- Фон: #0F0F0E (тёмный)
- Центрированный текст: Gilroy Heavy, giant
- 2 кнопки (animated charChild): "Написать нам" + "Заказать обратный звонок"
- Под кнопками: email и телефон мелким текстом

### Footer
Источник: digital-agency style.css footer
- Фон: #0F0F0E, border-top 1px solid rgba(255,255,255,0.08)
- Верх: logo freymi слева + tagline справа
- Центр: nav links (Главная / О студии / Контакт) + lang switch
- Низ: copyright + social icons (Telegram SVG + Instagram SVG)
- Social icons: 24x24, белые, hover: color #C8FF47

**Проверка:** FAQ раскрывается кликом, CTA блок виден, footer полный.

---

## Этап 7 — Главный скрипт: js/script.js

**Создать файл:** `js/script.js`

Структура скрипта (все функции DOMContentLoaded):

```javascript
// 1. Lenis smooth scroll init
//    Источник: lazarev/js/script.js строки 1-14 — копия без изменений

// 2. GSAP + ScrollTrigger register

// 3. SplitText init
//    - #hero-title: chars split (charChild / charParent)
//    - animated-btn spans: chars split

// 4. Loader animation
//    Источник: lazarev script.js строки 52-151
//    Изменить: убрать hero-home specific code, оставить core loader → hero title chars anim

// 5. Header scroll behavior
//    - При scroll вниз > 80px: header-strip получает class .scrolled (меняет bg и shadow)

// 6. Mobile nav overlay
//    Источник: digital-agency script.js heroGSAPAnime() навигация
//    clip-path toggle на #nav-overlay
//    GSAP stagger на ссылках при открытии

// 7. Animated buttons (charChild hover)
//    Источник: lazarev script.js строки 223-255 — копия, проверить селекторы

// 8. ScrollTrigger animations (все секции)
//    Источник: digital-agency script.js scrollTriggerAnime() — адаптация
//    - #marquee: opacity 0 → 1
//    - #about: from left/right
//    - .step: stagger from bottom
//    - .work-card: stagger from bottom
//    - .quest: stagger
//    - #cta: scale 0.95 → 1 + opacity

// 9. Hover line on .step rows
//    CSS делает основную работу, JS не нужен

// 10. FAQ accordion
//     Источник: Web-Design-Agency script.js строки 3-12
//     + улучшение: плавная анимация через max-height transition

// 11. Lang switch (вызов функций из lang.js)
//     document.querySelectorAll('.lang-btn').forEach(...)
```

**Подключение в index.html** (в конце body, после всех секций):
```html
<script src="js/lenis.min.js"></script>
<script src="js/gsap.min.js"></script>
<script src="js/SplitText.min.js"></script>
<script src="js/ScrollTrigger.min.js"></script>
<script src="js/lang.js"></script>
<script src="js/script.js"></script>
```

**Проверка:** лоадер проигрывается, буквы заголовка въезжают, скролл плавный, FAQ работает, кнопки анимируются при hover.

---

## Этап 8 — about.html

**Создать файл:** `about.html`

Структура:
```
- Тот же header (скопировать из index.html)
- #about-hero: тёмный, giant SplitText заголовок (из текстов выше)
- #about-photo: фото about-photo.png full-width, параллакс через ScrollTrigger
- #about-blocks: 3 текстовых блока (Подход / Скорость / Оплата) — grid 1x3
- #about-cta: простой блок "Обсудить проект" → ссылка на contact.html
- Тот же footer (скопировать из index.html)
```

CSS: переиспользовать из style.css + hero.css где подходит.
Новые стили — в about.css или inline в `<style>` если небольшие.

**Проверка:** страница открывается, hero и блоки видны, шапка и футер те же.

---

## Этап 9 — contact.html

**Создать файл:** `contact.html`

Структура:
```
- Тот же header
- #contact-hero: тёмный, giant "Обсудим?" + email и телефон крупно
- #contact-form: форма (Имя + Контакт + Описание задачи + кнопка)
  - action="mailto:zharovpeak@gmail.com" method="POST" enctype="text/plain"
  - Или: JS fetch на Formspree / аналог (опционально)
- #contact-socials: иконки Telegram + Instagram с подписями
- Тот же footer
```

CSS: форма — тёмный стиль, input border: 1px solid rgba(255,255,255,0.15), focus: border-color #C8FF47.
Кнопка Submit — animated charChild button.

**Проверка:** форма корректно отображается, поля в фокусе подсвечиваются лаймом.

---

## Этап 10 — Переключатель языка: js/lang.js

**Создать файл:** `js/lang.js`

Логика:
```javascript
const translations = {
  ru: {
    'hero-title-line1': 'Дизайн сайта,',
    'hero-title-line2': 'который продаёт',
    'hero-title-line3': 'с первого экрана',
    'hero-sub': 'Один экран — 30 000 ₽. Первый покажем через 24 часа.',
    'btn-cta1': 'Смотреть работы',
    'btn-cta2': 'Обсудить проект',
    // ... все тексты
  },
  en: {
    'hero-title-line1': 'Website design',
    'hero-title-line2': 'that converts',
    'hero-title-line3': 'from the first screen',
    'hero-sub': 'One screen — 30 000 ₽. We\'ll show the first one in 24 hours.',
    'btn-cta1': 'See our work',
    'btn-cta2': 'Discuss project',
    // ... все тексты
  }
}

function setLang(lang) {
  document.documentElement.lang = lang
  localStorage.setItem('lang', lang)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    if (translations[lang][key]) el.textContent = translations[lang][key]
  })
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang)
  })
}

// Init
const savedLang = localStorage.getItem('lang') || 'ru'
setLang(savedLang)
```

HTML для каждого текстового элемента: добавить `data-i18n="hero-title-line1"` и т.д.

**Проверка:** клик на RU/EN переключает все тексты сразу, выбор сохраняется в localStorage.

---

## Этап 11 — Адаптив + финальная проверка

**Изменить:** все CSS файлы (добавить media queries)

Брейкпоинты:
- `1440px` — max, проверить layout
- `1024px` — планшет горизонтальный (колонки → сужаем, шрифты clamp)
- `768px` — планшет вертикальный (2 колонки → 1, hamburger nav)
- `480px` — мобильный (шрифты меньше, отступы меньше, hero h1 40-50px)
- `375px` — минимальный (iPhone SE)

Чек-лист:
- [ ] Loader: работает на мобиле
- [ ] Hero: h1 не обрезается, статус-точка видна
- [ ] Marquee: не ломается на узком экране
- [ ] About: 2 колонки → 1 колонка на 768px
- [ ] Portfolio: 2x2 → 1 колонка на 768px
- [ ] FAQ: корректная высота при открытии
- [ ] CTA: кнопки не выходят за экран
- [ ] Footer: соц-иконки доступны
- [ ] about.html: адаптив
- [ ] contact.html: форма на мобиле
- [ ] Lang switch: работает на мобиле
- [ ] Все ссылки на реальные страницы работают
- [ ] `<meta name="viewport">` в каждом файле
- [ ] Favicon: добавить placeholder (можно просто эмодзи в <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><text y='32' font-size='32'>📐</text></svg>">)

**Итоговая проверка:**
- Открыть index.html в Chrome/Safari
- Проверить DevTools Console — нет ошибок JS
- Resize от 375px до 1920px — всё держится
- Переключить RU/EN — все тексты меняются
- Проверить about.html и contact.html навигацию туда/обратно

---

## Итог: 11 этапов

| # | Этап | Файлы |
|---|---|---|
| 1 | Базовые стили | css/style.css |
| 2 | Скелет + Loader + Header | index.html, css/loader.css, css/header.css |
| 3 | Hero | css/hero.css + hero в index.html |
| 4 | Marquee + About | css/marquee.css, css/about.css |
| 5 | Process + Portfolio | css/process.css, css/portfolio.css |
| 6 | FAQ + CTA + Footer | css/faq.css, css/cta.css, css/footer.css |
| 7 | Все JS анимации | js/script.js |
| 8 | About page | about.html |
| 9 | Contact page | contact.html |
| 10 | Language switcher | js/lang.js |
| 11 | Адаптив + финал | все CSS + проверка |
