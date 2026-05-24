import { ArrowLeft } from "lucide-react";

export default function HomeLink() {
  return (
    <a
      href="https://freymi.ru/"
      aria-label="Вернуться на главную страницу freymi"
      className="fixed left-5 top-5 z-[80] group inline-flex min-h-11 items-center gap-3 rounded-full border border-[#00d4ff]/25 bg-[#050505]/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 shadow-[0_18px_50px_rgba(0,0,0,0.45),0_0_30px_rgba(0,212,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00d4ff]/55 hover:bg-[#061116]/88 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00d4ff]"
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#00d4ff] text-[#050505] shadow-[0_0_18px_rgba(0,212,255,0.45)] transition-transform duration-300 group-hover:-translate-x-0.5">
        <ArrowLeft size={16} strokeWidth={2.4} />
      </span>
      <span className="hidden sm:inline">На главную</span>
    </a>
  );
}
