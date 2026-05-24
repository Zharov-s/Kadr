import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function AmbientBackground() {
    const { scrollY } = useScroll();
    const [windowHeight, setWindowHeight] = useState(1000);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Soft Parallax Movements based on scroll depths
    // Array parameters map [Scroll Position] -> [Y Translation]
    const y1 = useTransform(scrollY, [0, windowHeight * 3], [0, 400]);
    const y2 = useTransform(scrollY, [0, windowHeight * 3], [0, -300]);
    const y3 = useTransform(scrollY, [0, windowHeight * 3], [0, 500]);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-50">
            <motion.div
                style={{ y: y1 }}
                className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#00d4ff] blur-[120px] md:blur-[220px] opacity-[0.12]"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00ffee] blur-[150px] md:blur-[250px] opacity-[0.1]"
            />
            <motion.div
                style={{ y: y3 }}
                className="absolute bottom-[-10%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#00aaff] blur-[180px] md:blur-[300px] opacity-[0.08]"
            />
        </div>
    );
}
