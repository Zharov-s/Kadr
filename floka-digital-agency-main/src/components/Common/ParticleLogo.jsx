import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function sampleTextPoints({
  text,
  width,
  height,
  font,
  color,
  step = 2,
  threshold = 140,
  scale = 0.01,
  offsetX = 0,
  offsetY = 0,
  baselineShift = 0,
}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  if (!ctx) return [];

  ctx.clearRect(0, 0, width, height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = font;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, width / 2, height / 2 + baselineShift);

  const pixels = ctx.getImageData(0, 0, width, height).data;
  const points = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = pixels[(y * width + x) * 4 + 3];
      if (alpha > threshold) {
        points.push({
          x: (x - width / 2) * scale + offsetX,
          y: (height / 2 - y) * scale + offsetY,
          color,
        });
      }
    }
  }

  return points;
}

function pickPoints(points, count) {
  if (!points.length || count <= 0) return [];
  const picked = new Array(count);

  for (let i = 0; i < count; i++) {
    picked[i] = points[Math.floor(Math.random() * points.length)];
  }

  return picked;
}

function ParticleLogo({ count = 18000 }) {
  const pointsRef = useRef(null);
  const velocityRef = useRef(null);
  const { mouse, viewport } = useThree();

  const particleData = useMemo(() => {
    const teal = "#9af8ff";
    const gold = "#ffd84d";
    const white = "#eefcff";

    const sRaw = sampleTextPoints({
      text: "H",
      width: 560,
      height: 520,
      font: "900 340px Arial Black, Arial, sans-serif",
      color: teal,
      step: 2,
      scale: 0.0115,
      offsetX: -1.9,
      offsetY: 0.95,
      baselineShift: 8,
    });

    const mRaw = sampleTextPoints({
      text: "I",
      width: 760,
      height: 520,
      font: "900 340px Arial Black, Arial, sans-serif",
      color: gold,
      step: 2,
      scale: 0.0115,
      offsetX: 1.9,
      offsetY: 0.95,
      baselineShift: 8,
    });

    const techRaw = sampleTextPoints({
      text: "Nidan",
      width: 1200,
      height: 220,
      font: "600 96px Arial, sans-serif",
      color: white,
      step: 2,
      threshold: 90,
      scale: 0.0063,
      offsetX: 0,
      offsetY: -1.45,
      baselineShift: 0,
    });

    const sCount = Math.floor(count * 0.34);
    const mCount = Math.floor(count * 0.34);
    const techCount = count - sCount - mCount;

    const targetsList = [
      ...pickPoints(sRaw, sCount),
      ...pickPoints(mRaw, mCount),
      ...pickPoints(techRaw, techCount),
    ];

    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    const colorMap = {
      [teal]: new THREE.Color(teal),
      [gold]: new THREE.Color(gold),
      [white]: new THREE.Color(white),
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const target = targetsList[i];
      const c = colorMap[target.color];

      positions[i3] = (Math.random() - 0.5) * 14;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 1.0;

      targets[i3] = target.x;
      targets[i3 + 1] = target.y;
      targets[i3 + 2] = 0;

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;
    }

    velocityRef.current = velocities;

    return { positions, targets, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !particleData || !velocityRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    const targets = particleData.targets;
    const velocities = velocityRef.current;

    const mx = mouse.x * (viewport.width / 2);
    const my = mouse.y * (viewport.height / 2);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const px = positions[i3];
      const py = positions[i3 + 1];
      const tx = targets[i3];
      const ty = targets[i3 + 1];

      velocities[i3] += (tx - px) * 0.01;
      velocities[i3 + 1] += (ty - py) * 0.01;

      const dx = px - mx;
      const dy = py - my;
      const distSq = dx * dx + dy * dy;
      const radius = 0.5;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq) || 0.001;
        const force = (radius - dist) / radius;
        velocities[i3] += (dx / dist) * force * 0.02;
        velocities[i3 + 1] += (dy / dist) * force * 0.02;
      }

      velocities[i3] += Math.sin(time * 1.1 + i * 0.01) * 0.00025;
      velocities[i3 + 1] += Math.cos(time * 1.2 + i * 0.01) * 0.00025;

      velocities[i3] *= 0.93;
      velocities[i3 + 1] *= 0.93;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!particleData) return null;

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particleData.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particleData.colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.96}
        sizeAttenuation
        depthWrite={false}
        depthTest={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.055,
      0.03,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.04,
      0.03,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function LogoSection() {
  return (
    <section className="relative w-full min-h-[520px] h-[62vh] overflow-hidden bg-[#050505]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,248,255,0.08),transparent_32%),radial-gradient(circle_at_68%_40%,rgba(255,216,77,0.07),transparent_28%)]" />

      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 9], fov: 36 }}
      >
        <CameraRig />
        <ParticleLogo count={28000} />
      </Canvas>
    </section>
  );
}
