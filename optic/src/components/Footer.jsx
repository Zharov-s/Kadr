import { assetPath } from "@/lib/assets";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-white/[0.04] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 relative overflow-hidden rounded-full">
                <img src={assetPath("images/logo.jpg")} alt="Оптика будущего" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold tracking-[0.24em] uppercase text-white">
                ОПТИКА <span className="neon-text">БУДУЩЕГО</span>
              </span>
            </div>
            <p className="text-white/25 text-xs leading-relaxed max-w-xs mb-6">
              Оптика в Москве с 2010 года. Проверка зрения, подбор оправ и контактных линз.
            </p>
            <div className="flex gap-3">
              {["IG", "FB", "TW", "LI"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 border border-white/[0.08] rounded-sm text-[9px] tracking-widest text-white/25 hover:border-[#00d4ff]/40 hover:text-[#00d4ff]/60 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Коллекция", links: ["Новинки", "Оправы", "Контактные линзы", "Солнцезащитные", "Аксессуары"] },
            { title: "Компания", links: ["О нас", "Качество", "Услуги", "Контакты", "Вакансии"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#00d4ff]/50 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-white/25 hover:text-white/55 transition-colors tracking-wide">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider-white mb-8 opacity-60" />

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/35 mb-1">Будьте в курсе</p>
            <p className="text-xs text-white/20">Акции, новинки и полезные советы — на вашу почту.</p>
          </div>
          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 bg-transparent border border-white/[0.08] border-r-0 px-4 py-2.5 text-xs text-white/55 outline-none placeholder:text-white/18 focus:border-[#00d4ff]/30 transition-colors rounded-l-sm"
            />
            <button className="btn-neon px-5 py-2.5 text-xs rounded-l-none rounded-r-sm border-l-0">
              Подписаться
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] text-white/18">
          <p>© {year} Оптика будущего. Все права защищены.</p>
          <div className="flex gap-8">
            {["Политика конфиденциальности", "Условия использования", "Политика cookies"].map((l) => (
              <a key={l} href="#" className="hover:text-white/40 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
