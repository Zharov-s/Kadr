/* ════════════════════════════════════════════════════════════════════════
   freymi — отправка заявок на hello@freymi.ru через EmailJS.
   Один файл для главной и для демо-проектов (./shared/ или ../../shared/).

   Ключи EmailJS — ПУБЛИЧНЫЕ (клиентские), их штатно держат в коде на фронте.
   Значения берутся из https://dashboard.emailjs.com/admin:
     • publicKey  — Account → General → Public Key
     • serviceId  — Email Services → (ваш сервис) → Service ID
     • templateId — Email Templates → (ваш шаблон) → Template ID

   ВАЖНО: в самом шаблоне EmailJS поле «To Email» = hello@freymi.ru,
   «Reply To» = {{from_email}}. Переменные шаблона, которые шлёт этот скрипт:
     {{from_name}} {{from_email}} {{message}} {{source}} {{page_url}}

   Пока ключи не заданы (PLACEHOLDER) — формы НЕ перехватываются и продолжают
   работать через mailto-фолбэк, чтобы ничего не сломать до настройки.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var EMAILJS = {
    publicKey:  "NgPj9I3nl_2BgDqcR",
    serviceId:  "service_k2usozm",
    templateId: "template_uz7if1o"
  };

  var CONTACT_EMAIL = "hello@freymi.ru";

  function isConfigured() {
    return Object.keys(EMAILJS).every(function (k) {
      return EMAILJS[k] && EMAILJS[k].indexOf("PLACEHOLDER") === -1;
    });
  }

  if (!isConfigured()) {
    // Ключи ещё не прописаны — оставляем нативное поведение форм (mailto).
    if (window.console) console.warn("[freymi-forms] EmailJS не настроен — формы работают через mailto-фолбэк.");
    return;
  }

  function init() {
    if (typeof emailjs === "undefined") {
      if (window.console) console.error("[freymi-forms] EmailJS SDK не загружен (проверьте <script> с CDN).");
      return;
    }
    emailjs.init({ publicKey: EMAILJS.publicKey });
    injectStyles();
    var forms = document.querySelectorAll(".footer-form, #contact form, [data-freymi-form]");
    Array.prototype.forEach.call(forms, setupForm);
  }

  function setupForm(form) {
    if (form.__freymiBound) return;
    form.__freymiBound = true;
    form.removeAttribute("action");     // шлём через JS, не через mailto
    form.setAttribute("novalidate", ""); // валидируем сами через reportValidity()

    var status = ensureStatus(form);
    var btn = form.querySelector('button, [type="submit"]');
    var btnLabel = btn ? (btn.querySelector("span") || btn) : null;
    var defaultText = btnLabel ? btnLabel.textContent : "";
    var resetTimer = null;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var params = collect(form);
      if (!params.from_email) { setStatus("Укажите email, пожалуйста.", "err"); return; }

      clearTimeout(resetTimer);
      setBusy(true);
      setStatus("", "");

      emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params).then(function () {
        setBusy(false);
        setLabel("Отправлено ✓");
        setStatus("Заявка отправлена — скоро свяжемся.", "ok");
        form.reset();
        resetTimer = setTimeout(function () { setLabel(defaultText); }, 4500);
      }, function (err) {
        setBusy(false);
        setLabel(defaultText);
        setStatus("Не удалось отправить. Напишите на " + CONTACT_EMAIL, "err");
        if (window.console) console.error("[freymi-forms] EmailJS error:", err);
      });
    });

    function setBusy(busy) {
      if (btn) btn.disabled = busy;
      setLabel(busy ? "Отправляем…" : defaultText);
    }
    function setLabel(text) { if (btnLabel) btnLabel.textContent = text; }
    function setStatus(msg, kind) {
      status.textContent = msg;
      status.className = "freymi-form-status" + (kind ? " is-" + kind : "");
    }
  }

  // Собираем поля независимо от конкретной разметки формы.
  function collect(form) {
    var val = function (sel) { var el = form.querySelector(sel); return el ? String(el.value).trim() : ""; };
    var email   = val('[name="from_email"]') || val('input[type="email"]') || val('[name="email"]');
    var name    = val('[name="from_name"]')  || val('input[type="text"]');
    var message = val('[name="message"]')    || val('textarea');
    var isFooter = form.classList.contains("footer-form");

    return {
      from_name:  name || "—",
      from_email: email,
      message:    message || (isFooter ? "Быстрая заявка из подвала сайта (поле email)." : ""),
      source:     isFooter ? "Подвал сайта" : (form.closest("#contact") ? "Контактная форма" : "Форма сайта"),
      page_url:   location.href
    };
  }

  function ensureStatus(form) {
    var existing = form.parentNode ? form.parentNode.querySelector(".freymi-form-status") : null;
    if (existing) return existing;
    var s = document.createElement("p");
    s.className = "freymi-form-status";
    s.setAttribute("role", "status");
    s.setAttribute("aria-live", "polite");
    // Вставляем ПОСЛЕ формы (footer-form — flex-пилюля, внутрь класть нельзя).
    form.insertAdjacentElement("afterend", s);
    return s;
  }

  function injectStyles() {
    if (document.getElementById("freymi-form-styles")) return;
    var css =
      ".freymi-form-status{margin-top:10px;font-size:13px;font-weight:600;" +
      "line-height:1.4;min-height:1.1em;font-family:inherit}" +
      ".freymi-form-status.is-ok{color:#1b8a5a}" +
      ".freymi-form-status.is-err{color:#c0392b}";
    var el = document.createElement("style");
    el.id = "freymi-form-styles";
    el.textContent = css;
    document.head.appendChild(el);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
