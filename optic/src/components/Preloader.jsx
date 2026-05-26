import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from "@/lib/assets";

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 2.5 seconds cinematic preloader
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
                    initial={{ opacity: 1, y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Subtle noise background */}
                    <div className="absolute inset-0 noise pointer-events-none opacity-30" />

                    {/* Animated Center Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center mb-12"
                    >
                        <div className="w-20 h-20 relative mb-6 overflow-hidden rounded-full" style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.4))' }}>
                            <img src={assetPath("images/logo.jpg")} alt="Оптика будущего" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xl font-bold tracking-[0.24em] uppercase text-white">
                            ОПТИКА <span className="text-[#00d4ff]" style={{ textShadow: "0 0 10px #00d4ff" }}>БУДУЩЕГО</span>
                        </span>
                        <span className="text-[9px] tracking-[0.5em] text-white/40 mt-3 font-light">ОПТИКА МОСКВЫ</span>
                    </motion.div>

                    {/* Progress Bar Container */}
                    <div className="w-64 h-px bg-[#ffffff10] relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 bottom-0 bg-[#00d4ff]"
                            style={{ boxShadow: "0 0 10px #00d4ff" }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
