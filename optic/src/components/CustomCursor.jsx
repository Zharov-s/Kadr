import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = -100;
        let mouseY = -100;
        let isMoving = false;

        const updatePosition = () => {
            if (cursor) {
                // Direct DOM manipulation - 0 react re-renders
                cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
            isMoving = false;
        };

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Debounce via requestAnimationFrame for maximum 3D performance
            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(updatePosition);
            }
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Hide default cursor
        document.body.style.cursor = 'crosshair';

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[9999] -ml-[3px] -mt-[3px]"
            style={{
                background: "#00d4ff",
                boxShadow: "0 0 15px 2px rgba(0,212,255,0.8)",
                mixBlendMode: "screen",
                willChange: "transform"
            }}
        />
    );
}
