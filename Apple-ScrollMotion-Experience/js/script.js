const navbar = document.querySelector(".airpods-navbar");
if (navbar) {
  const originalY = navbar.offsetTop;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("sticky", window.scrollY >= originalY);
  });
}

// Получаем команды скролла от родительской fraymi-страницы
window.addEventListener("message", (e) => {
  if (e.data && e.data.type === "fraymi-scroll") {
    window.scrollTo(0, e.data.y);
  }
});

let controller = new ScrollMagic.Controller();