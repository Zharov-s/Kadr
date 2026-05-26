import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonialsRow1 = [
  {
    quote: "Обратилась за новыми очками для работы за компьютером. Специалист внимательно проверил зрение, объяснил разницу между линзами и помог подобрать удобную оправу. Очки получила быстро, ношу с удовольствием.",
    author: "Анна К.",
    title: "Москва",
    rating: 5,
  },
  {
    quote: "Заказывал очки по рецепту. Понравилось, что всё объяснили простым языком: какие линзы подойдут, чем отличаются покрытия, сколько займёт изготовление. Оправу подогнали сразу на месте.",
    author: "Сергей П.",
    title: "Москва",
    rating: 5,
  },
  {
    quote: "Покупала контактные линзы впервые. Мне подробно рассказали, как их надевать, снимать и ухаживать за ними. Очень спокойный и внимательный подход.",
    author: "Мария С.",
    title: "Москва",
    rating: 5,
  },
  {
    quote: "Зашёл отрегулировать старую оправу, в итоге ещё подобрал солнцезащитные очки. Хороший выбор, нормальные цены, сотрудники не навязывают лишнего.",
    author: "Дмитрий А.",
    title: "Москва",
    rating: 5,
  }
];

const testimonialsRow2 = [
  {
    quote: "Понравился сервис. Проверка зрения прошла аккуратно, без спешки. Подобрали лёгкую оправу и линзы для постоянного ношения. Буду обращаться ещё.",
    author: "Ольга Н.",
    title: "Москва",
    rating: 5,
  },
  {
    quote: "Обратился с рецептом после офтальмолога. Помогли подобрать хорошие антибликовые линзы. Объяснили всё доступно, без лишних трат.",
    author: "Алексей М.",
    title: "Москва",
    rating: 5,
  },
  {
    quote: "Ребёнку понадобились очки — пришли всей семьёй. Специалист нашёл подходящие детские оправы, примерка прошла быстро и без капризов.",
    author: "Екатерина В.",
    title: "Москва",
    rating: 5,
  },
  {
    quote: "Долго не мог подобрать себе удобную оправу — всё давило или спадало. Здесь наконец нашли нужную форму и подогнали по размеру. Доволен.",
    author: "Михаил С.",
    title: "Москва",
    rating: 5,
  }
];

const TestimonialCard = ({ testimonial }) => (
  <div className="w-[300px] md:w-[400px] shrink-0 p-8 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm flex flex-col gap-6 group hover:bg-white/[0.05] hover:border-[#00d4ff]/30 transition-all duration-500">
    <div className="flex gap-1 text-[#00d4ff] text-sm drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]">
      {[...Array(testimonial.rating)].map((_, i) => <span key={i}>★</span>)}
    </div>
    <p className="text-white/70 text-sm md:text-base leading-relaxed font-light" style={{ fontFamily: "Georgia, serif" }}>
      "{testimonial.quote}"
    </p>
    <div className="mt-auto flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-transparent flex items-center justify-center border border-[#00d4ff]/20 text-[#00d4ff] text-xs uppercase font-bold tracking-wider">
        {testimonial.author.charAt(0)}
      </div>
      <div>
        <div className="text-white/90 text-sm uppercase tracking-[0.1em]">{testimonial.author}</div>
        <div className="text-[#00d4ff]/60 text-[10px] tracking-[0.2em] uppercase mt-1">{testimonial.title}</div>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden flex flex-col items-center">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00d4ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 mb-20 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#00d4ff]/70 mb-4 block">
            — Отзывы клиентов —
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-widest text-white uppercase uppercase flex items-center justify-center gap-4">
            Что говорят клиенты
          </h2>
        </motion.div>
      </div>

      {/* INFINITE SCROLL CAROUSELS */}
      <div className="w-full relative z-10 flex flex-col gap-6 overflow-hidden mask-horizontal">

        {/* Row 1 - Moves Left */}
        <div className="flex w-max">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex gap-6 pr-6"
          >
            {[...testimonialsRow1, ...testimonialsRow1].map((testimonial, idx) => (
              <TestimonialCard key={`r1-${idx}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex w-max -ml-[500px]">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: "0%" }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
            className="flex gap-6 pr-6"
          >
            {[...testimonialsRow2, ...testimonialsRow2].map((testimonial, idx) => (
              <TestimonialCard key={`r2-${idx}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .mask-horizontal {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  );
}
