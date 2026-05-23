import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

(function initTechStackBalls() {
  const canvas = document.getElementById('tech-stack-canvas');
  const section = canvas && canvas.closest('.tech-stack-section');
  const fallback = document.getElementById('tech-stack-fallback');
  if (!canvas || !section) return;

  let testCtx;
  try { testCtx = canvas.getContext('webgl2') || canvas.getContext('webgl'); } catch (_) {}
  if (!testCtx) {
    if (fallback) fallback.classList.add('visible');
    canvas.style.display = 'none';
    return;
  }

  // Renderer — alpha:true keeps canvas transparent; GTAOPass only affects areas with geometry
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, stencil: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.setClearColor(0x000000, 0);

  // Scene + camera (fov 32.5, z 20 — matches original)
  const scene = new THREE.Scene();
  // No scene.background — transparent canvas shows page white bg
  const camera = new THREE.PerspectiveCamera(32.5, 1, 1, 100);
  camera.position.z = 20;

  // HDR environment (matches original: char_enviorment.hdr + environmentIntensity=0.5 + rotation=[0,4,2])
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  new RGBELoader().load('./models/char_enviorment.hdr', (hdr) => {
    const envTexture = pmrem.fromEquirectangular(hdr).texture;
    scene.environment = envTexture;
    if (scene.environmentIntensity !== undefined) scene.environmentIntensity = 0.5;
    if (scene.environmentRotation) scene.environmentRotation.set(0, 4, 2);
    hdr.dispose();
    pmrem.dispose();
  });

  // Lights (matching original)
  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const spot = new THREE.SpotLight(0xffffff, 1);
  spot.position.set(20, 20, 25);
  spot.penumbra = 1;
  spot.angle = 0.2;
  spot.castShadow = true;
  spot.shadow.mapSize.setScalar(512);
  scene.add(spot);
  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(0, 5, -4);
  scene.add(dir);

  // Textures + materials (matching original MeshPhysicalMaterial)
  const loader = new THREE.TextureLoader();
  const IMAGE_URLS = [
    './images/tech-stack/react.webp',
    './images/tech-stack/next.webp',
    './images/tech-stack/node.webp',
    './images/tech-stack/express.webp',
    './images/tech-stack/mongo.webp',
    './images/tech-stack/mysql.webp',
    './images/tech-stack/typescript.webp',
    './images/tech-stack/javascript.webp',
  ];
  const materials = IMAGE_URLS.map(url => {
    const tex = loader.load(url);
    return new THREE.MeshPhysicalMaterial({
      map: tex,
      emissive: 0xffffff,
      emissiveMap: tex,
      emissiveIntensity: 0.3,
      metalness: 0.5,
      roughness: 1,
      clearcoat: 0.1,
      envMapIntensity: 0.5,
    });
  });

  const sphereGeo = new THREE.SphereGeometry(1, 28, 28);

  // Ball config (matches original)
  const BALL_COUNT = 30;
  const SCALE_CHOICES = [0.7, 1, 0.8, 1, 1];
  const LINEAR_DAMPING = 0.75;
  const ANGULAR_DAMPING = 0.15;

  function rand(s) { return (Math.random() - 0.5) * s; }

  const balls = [];
  for (let i = 0; i < BALL_COUNT; i++) {
    const scale = SCALE_CHOICES[Math.floor(Math.random() * SCALE_CHOICES.length)];
    const mat = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.scale.setScalar(scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotation.set(0.3, 1, 1);
    scene.add(mesh);
    const pos = new THREE.Vector3(rand(20), rand(20) - 25, rand(20) - 10);
    mesh.position.copy(pos);
    balls.push({ mesh, pos, vel: new THREE.Vector3(), angVel: new THREE.Vector3(rand(3), rand(3), rand(3)), scale });
  }

  // Pointer — target position + lerped world position (lerp 0.2 matching original)
  const mouseTarget = new THREE.Vector3(1000, 1000, 0);
  const mouseWorld = new THREE.Vector3(1000, 1000, 0);
  let mouseOnCanvas = false;
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2();
  const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hitPoint = new THREE.Vector3();

  function updateMouse(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    mouseNDC.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(mouseNDC, camera);
    if (raycaster.ray.intersectPlane(zPlane, hitPoint)) mouseTarget.copy(hitPoint);
  }

  canvas.addEventListener('mousemove', e => { mouseOnCanvas = true; updateMouse(e.clientX, e.clientY); });
  canvas.addEventListener('mouseleave', () => { mouseOnCanvas = false; mouseTarget.set(1000, 1000, 0); });

  // Post-processing — GTAOPass approximates N8AO (aoRadius=2, intensity=1.15)
  let composer = null;

  function initComposer(w, h) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    try {
      const gtao = new GTAOPass(scene, camera, w, h);
      gtao.output = GTAOPass.OUTPUT.Default;
      gtao.updateGtaoMaterial({ radius: 0.4, distanceExponent: 2, thickness: 1, scale: 1.5, samples: 16, distanceFallOff: 1, screenSpaceRadius: false });
      gtao.updatePdMaterial({ rings: 2, samples: 16, lodMultiplier: 0 });
      composer.addPass(gtao);
    } catch (_) { /* GTAOPass unavailable — render without AO */ }
    composer.addPass(new OutputPass());
  }

  // Resize handler
  function onResize() {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!composer) {
      initComposer(w, h);
    } else {
      composer.setSize(w, h);
    }
  }
  window.addEventListener('resize', onResize);
  onResize();

  // IntersectionObserver
  let isActive = false, isVisible = false;
  new IntersectionObserver(entries => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !isActive) isActive = true;
  }, { threshold: 0.05 }).observe(section);

  // Physics
  const tmp = new THREE.Vector3();

  function updatePhysics(dt) {
    dt = Math.min(dt, 0.1); // matches original Math.min(0.1, delta)

    // Smooth pointer lerp — matches original vec.lerp(target, 0.2) per frame
    mouseWorld.lerp(mouseTarget, 0.2);

    // 1. Attraction toward origin
    for (const b of balls) {
      const len = b.pos.length();
      if (len > 0.001) {
        b.vel.x -= (b.pos.x / len) * 50 * dt * b.scale;
        b.vel.y -= (b.pos.y / len) * 150 * dt * b.scale;
        b.vel.z -= (b.pos.z / len) * 50 * dt * b.scale;
      }
    }

    // 2. Mouse repulsion (BallCollider r=2)
    for (const b of balls) {
      tmp.copy(b.pos).sub(mouseWorld);
      const dist = tmp.length();
      const minD = 2 + b.scale;
      if (dist < minD && dist > 0.001) {
        const nx = tmp.x / dist, ny = tmp.y / dist, nz = tmp.z / dist;
        const velN = b.vel.x * nx + b.vel.y * ny + b.vel.z * nz;
        if (velN < 0) {
          const j = -1.5 * velN;
          b.vel.x += j * nx; b.vel.y += j * ny; b.vel.z += j * nz;
        }
        const pen = minD - dist;
        b.pos.x += nx * pen; b.pos.y += ny * pen; b.pos.z += nz * pen;
      }
    }

    // 3. Ball–ball — soft spring (avoids jitter from hard position correction)
    for (let i = 0; i < BALL_COUNT; i++) {
      for (let j = i + 1; j < BALL_COUNT; j++) {
        const bi = balls[i], bj = balls[j];
        const dx = bj.pos.x - bi.pos.x, dy = bj.pos.y - bi.pos.y, dz = bj.pos.z - bi.pos.z;
        const dist2 = dx * dx + dy * dy + dz * dz;
        const minD = bi.scale + bj.scale;
        if (dist2 < minD * minD) {
          const dist = Math.sqrt(dist2) || 0.001;
          const nx = dx / dist, ny = dy / dist, nz = dz / dist;
          const spring = (minD - dist) * 80 * dt;
          bi.vel.x -= nx * spring; bi.vel.y -= ny * spring; bi.vel.z -= nz * spring;
          bj.vel.x += nx * spring; bj.vel.y += ny * spring; bj.vel.z += nz * spring;
        }
      }
    }

    // 4. Damping + velocity sleep + integrate
    const linD = Math.exp(-LINEAR_DAMPING * dt);
    const angD = Math.exp(-ANGULAR_DAMPING * dt);
    for (const b of balls) {
      b.vel.multiplyScalar(linD);
      b.angVel.multiplyScalar(angD);
      if (b.vel.lengthSq() < 0.01) b.vel.set(0, 0, 0);
      if (b.angVel.lengthSq() < 0.005) b.angVel.set(0, 0, 0);
      b.pos.x += b.vel.x * dt; b.pos.y += b.vel.y * dt; b.pos.z += b.vel.z * dt;
      b.mesh.position.copy(b.pos);
      b.mesh.rotation.x += b.angVel.x * dt;
      b.mesh.rotation.y += b.angVel.y * dt;
      b.mesh.rotation.z += b.angVel.z * dt;
    }
  }

  let prevTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);
    if (!isVisible) { prevTime = now; return; }
    const dt = (now - prevTime) / 1000;
    prevTime = now;
    if (isActive) updatePhysics(dt);
    try {
      if (composer) composer.render();
      else renderer.render(scene, camera);
    } catch (_) {
      composer = null;
      renderer.render(scene, camera);
    }
  }
  requestAnimationFrame(animate);
})();
