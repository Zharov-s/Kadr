import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VirtualFitModal({ isOpen, onClose }) {
    const [scanState, setScanState] = useState(0); // 0: init, 1: scanning, 2: matched

    useEffect(() => {
        if (isOpen) {
            setScanState(0);
            const t1 = setTimeout(() => setScanState(1), 1000);
            const t2 = setTimeout(() => setScanState(2), 4500);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden bg-[#020508]/90 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-[#00d4ff] hover:text-white transition-colors z-[100001] tracking-[0.2em] text-[10px] uppercase font-bold"
                >
                    [ Close System ]
                </button>

                {/* HUD Overlay Elements */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent" />

                {/* Corner Crosshairs */}
                <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[#00d4ff]/60" />
                <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-[#00d4ff]/60" />
                <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-[#00d4ff]/60" />
                <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#00d4ff]/60" />

                {/* Text Logs Top Left */}
                <div className="absolute top-16 left-16 flex flex-col gap-1 text-[8px] tracking-[0.3em] font-mono text-[#00d4ff]/70 uppercase">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>OPTIC FUTURE VIRTUAL_FIT v2.4</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Initializing camera protocol...</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: scanState >= 1 ? 1 : 0 }}>Commencing facial topology scan...</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: scanState >= 2 ? 1 : 0 }} className="text-white font-bold">Topology Match: 98.4% (Optimal)</motion.span>
                </div>

                {/* The Main Scanner Box */}
                <div className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px] border border-[#00d4ff]/20 flex items-center justify-center">

                    {/* Inner Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00d4ff]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00d4ff]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00d4ff]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00d4ff]" />

                    {/* Scanning Laser */}
                    {scanState === 1 && (
                        <motion.div
                            className="absolute left-0 right-0 h-1 bg-[#00d4ff] z-50 pointer-events-none shadow-[0_0_20px_#00d4ff]"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    )}

                    {/* Face Hologram SVG */}
                    <motion.div
                        className="w-full h-full absolute inset-0 opacity-40 mix-blend-screen flex items-center justify-center"
                        animate={{ opacity: scanState === 2 ? 0.8 : 0.3 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg viewBox="0 0 200 250" className="w-[60%] h-[60%] fill-none stroke-[#00d4ff] stroke-[0.5]">
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M100 20 C140 20, 170 50, 170 100 C170 150, 140 180, 120 220 C100 240, 100 240, 80 220 C60 180, 30 150, 30 100 C30 50, 60 20, 100 20 Z"
                            />
                            {/* Eyes Base */}
                            <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} cx="65" cy="110" r="8" strokeWidth="1" />
                            <motion.circle initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} cx="135" cy="110" r="8" strokeWidth="1" />
                            {/* Nose Line */}
                            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }} d="M100 110 L100 150 L95 160 L105 160 Z" />
                            {/* Mouth Line */}
                            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5 }} d="M70 190 Q100 200 130 190" />

                            {/* Holographic Glasses (Appear when matched) */}
                            <motion.g
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: scanState === 2 ? 1 : 0, scale: scanState === 2 ? 1 : 0.8 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                                stroke="#fff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 8px #00d4ff)" }}
                            >
                                <rect x="40" y="95" width="50" height="30" rx="4" fill="rgba(0,212,255,0.2)" />
                                <rect x="110" y="95" width="50" height="30" rx="4" fill="rgba(0,212,255,0.2)" />
                                <line x1="90" y1="110" x2="110" y2="110" />
                                <line x1="30" y1="100" x2="40" y2="105" />
                                <line x1="170" y1="100" x2="160" y2="105" />
                            </motion.g>
                        </svg>
                    </motion.div>

                    {/* HUD Target Circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#00d4ff]/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-dashed border-[#00d4ff]/40 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#00d4ff] rounded-full shadow-[0_0_10px_#00d4ff]" />

                    {/* Status Text Bottom Center */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
                        {scanState === 0 && <span className="text-[#00d4ff] text-xs uppercase tracking-[0.2em] animate-pulse">Calibrating...</span>}
                        {scanState === 1 && <span className="text-white font-bold text-xs uppercase tracking-[0.3em]">Analyzing Mesh...</span>}
                        {scanState === 2 && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="glass-neon px-6 py-2 rounded-full border border-[#00d4ff]">
                                <span className="text-[#00d4ff] font-bold text-sm uppercase tracking-[0.2em]">Perfect Fit Detected</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
