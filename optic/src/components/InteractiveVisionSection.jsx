import { useEffect, useRef } from "react";

export default function InteractiveVisionSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    let particlesArray = [];
    let backgroundBlobs = [];
    let W, H;

    let mouse = {
      x: null,
      y: null,
      radius: 120
    };

    function init() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      const lines = ["ОПТИКА", "БУДУЩЕГО"];
      const maxTextWidth = W * 0.82;
      let fontSize = Math.min(W / 8, 130);

      ctx.fillStyle = "white";
      ctx.font = `900 ${fontSize}px "Inter", "Helvetica", "Arial", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      while (fontSize > 48 && Math.max(...lines.map((line) => ctx.measureText(line).width)) > maxTextWidth) {
        fontSize -= 4;
        ctx.font = `900 ${fontSize}px "Inter", "Helvetica", "Arial", sans-serif`;
      }

      ctx.fillText(lines[0], W / 2, H / 2 - fontSize * 0.62);
      ctx.fillText(lines[1], W / 2, H / 2 + fontSize * 0.62);

      // Extract pixel data for text particles
      const textCoordinates = ctx.getImageData(0, 0, W, H);
      particlesArray = [];
      backgroundBlobs = [];

      const step = W > 1000 ? 5 : 4;

      for (let y = 0, y2 = textCoordinates.height; y < y2; y += step) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x += step) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            let positionX = x;
            let positionY = y;
            particlesArray.push(new Particle(positionX, positionY));
          }
        }
      }

      for (let i = 0; i < 8; i++) {
        backgroundBlobs.push(new FluidBlob());
      }
    }

    class FluidBlob {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.radius = Math.random() * 300 + 200;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        // Cyan and Purple glowing fluid colors
        this.color = Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.08)' : 'rgba(74, 0, 224, 0.08)';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls smoothly
        if (this.x - this.radius > W) this.vx *= -1;
        if (this.x + this.radius < 0) this.vx *= -1;
        if (this.y - this.radius > H) this.vy *= -1;
        if (this.y + this.radius < 0) this.vy *= -1;

        // Fluid interaction with mouse
        if (mouse.x) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.radius + 150) {
             this.x -= dx * 0.01;
             this.y -= dy * 0.01;
          }
        }
      }
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y) {
        // Start scattered
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 5;
        this.color = Math.random() > 0.8 ? '#00d4ff' : '#ffffff';
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.85;
        this.ease = 0.05;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        // Interactive repelling
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius && mouse.x !== null) {
          // Push away
          this.vx -= directionX;
          this.vy -= directionY;
        } else {
          // Pull back to base
          let dxBase = this.baseX - this.x;
          let dyBase = this.baseY - this.y;
          this.vx += dxBase * 0.03; // stiffness
          this.vy += dyBase * 0.03;
        }

        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Move
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    // Connect close particles with fluid-like strands
    function connect() {
      let maxDist = 30; // Max distance for connecting lines
      for (let a = 0; a < particlesArray.length; a += 5) { // Skip some for performance and aesthetic
        for (let b = a; b < particlesArray.length; b += 5) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDist) {
            let opacity = 1 - (distance / maxDist);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationId;

    function animate() {
      ctx.fillStyle = "rgba(5, 5, 5, 0.4)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < backgroundBlobs.length; i++) {
        backgroundBlobs[i].update();
        backgroundBlobs[i].draw();
      }
      ctx.globalCompositeOperation = "source-over";

      // Draw particle text
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      connect();
      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleMouseMove = (e) => {
      // Adjust mouse pos based on scroll/bounding box if needed,
      // but since section is h-screen we can just use clientX /clientY relative to canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    };

    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-[100vh] bg-[#050505] overflow-hidden" id="interactive-fluid">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 cursor-crosshair"
      />

      {/* HUD Elements */}
      <div className="absolute top-10 w-full flex justify-between px-10 z-20 pointer-events-none">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#00d4ff]/60">Fluid Simulation Active</span>
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">Hold & Move</span>
      </div>

      <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
        <div className="text-xl font-extralight tracking-widest text-white uppercase italic" style={{ fontFamily: "Georgia, serif" }}>
          ОПТИКА <span className="text-[#00d4ff]">БУДУЩЕГО</span>
        </div>
        <div className="text-[9px] tracking-[0.3em] text-white/30 uppercase mt-2">
          Experience the Flow
        </div>
      </div>
    </section>
  );
}
