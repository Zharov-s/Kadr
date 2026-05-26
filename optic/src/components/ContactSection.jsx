import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="py-32 bg-[#0d0d0d] relative overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="text-[11px] tracking-[0.4em] uppercase text-[#00d4ff]/70 mb-4 block">— Напишите нам —</span>
          <h2
            className="text-5xl font-extralight leading-none tracking-tight text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Остались
            <br />
            <span className="neon-text italic">вопросы?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="border border-white/[0.06] rounded-sm p-10 relative overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 60%)" }}
        >
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-7">
              <div className="grid md:grid-cols-2 gap-7">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-white/35">Ваше имя</label>
                  <input
                    type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/[0.08] focus:border-[#00d4ff]/50 py-3 text-sm text-white/65 outline-none transition-colors placeholder:text-white/18"
                    placeholder="Имя и фамилия"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.3em] uppercase text-white/35">Электронная почта</label>
                  <input
                    type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/[0.08] focus:border-[#00d4ff]/50 py-3 text-sm text-white/65 outline-none transition-colors placeholder:text-white/18"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.3em] uppercase text-white/35">Сообщение</label>
                <textarea
                  required rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/[0.08] focus:border-[#00d4ff]/50 py-3 text-sm text-white/65 outline-none transition-colors resize-none placeholder:text-white/18"
                  placeholder="Расскажите, чем можем помочь"
                />
              </div>
              <div className="flex justify-end pt-1">
                <button type="submit" className="btn-neon px-10 py-3.5 rounded-sm">Отправить</button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div
                className="w-16 h-16 rounded-full border border-[#00d4ff]/40 flex items-center justify-center mx-auto mb-6"
                style={{ boxShadow: "0 0 20px rgba(0,212,255,0.2)" }}
              >
                <span className="neon-text text-2xl">✓</span>
              </div>
              <h3 className="text-2xl font-extralight text-white/80 mb-3" style={{ fontFamily: "Georgia, serif" }}>Сообщение отправлено</h3>
              <p className="text-white/35 text-sm">Мы свяжемся с вами в течение рабочего дня.</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-10"
        >
          {[
            { label: "Электронная почта", value: "info@optika-moskva.ru" },
            { label: "Телефон", value: "+7 (495) 123-45-67" },
            { label: "Адрес", value: "г. Москва, ул. Тверская, д. 18, стр. 1" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#00d4ff]/50 mb-2">{item.label}</div>
              <div className="text-sm text-white/35">{item.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
