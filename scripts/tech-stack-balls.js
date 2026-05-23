import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

(function initTechStackBalls() {
  const canvas = document.getElementById('tech-stack-canvas');
  const section = canvas && canvas.closest('.tech-stack-section');
  const fallback = document.getElementById('tech-stack-fallback');
  if (!canvas || !section) return;

  // WebGL support check
  let testCtx;
  try {
    testCtx = canvas.getContext('webgl2') || canvas.getContext('webgl');
  } catch (_) {}
  if (!testCtx) {
    if (fallback) fallback.classList.add('visible');
    canvas.style.display = 'none';
    return;
  }

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    stencil: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  // Scene + camera (matching original: fov 32.5, z 20)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32.5, 1, 1, 100);
  camera.position.z = 20;

  // Environment (procedural room — replaces HDR file)
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

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
  const textures = IMAGE_URLS.map(url => loader.load(url));

  // Materials (matching original MeshPhysicalMaterial settings)
  const materials = textures.map(tex => new THREE.MeshPhysicalMaterial({
    map: tex,
    emissive: 0xffffff,
    emissiveMap: tex,
    emissiveIntensity: 0.3,
    metalness: 0.5,
    roughness: 1,
    clearcoat: 0.1,
    envMapIntensity: 0.5,
  }));

  // Shared geometry
  const sphereGeo = new THREE.SphereGeometry(1, 28, 28);

  // Ball configuration — matches original (30 balls, same scale choices)
  const BALL_COUNT = 30;
  const SCALE_CHOICES = [0.7, 1, 0.8, 1, 1];
  const LINEAR_DAMPING = 0.75;   // Matches Rapier linearDamping
  const ANGULAR_DAMPING = 0.15;  // Matches Rapier angularDamping
  const POINTER_RADIUS = 2;      // Matches BallCollider args=[2]

  function rand(spread) { return (Math.random() - 0.5) * spread; }

  // Create balls with initial positions off-screen (matches original: r(20) - 25 in Y)
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

    balls.push({
      mesh,
      pos,
      vel: new THREE.Vector3(0, 0, 0),
      angVel: new THREE.Vector3(rand(3), rand(3), rand(3)),
      scale,
    });
  }

  // Mouse / pointer tracking
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
    if (raycaster.ray.intersectPlane(zPlane, hitPoint)) {
      mouseWorld.copy(hitPoint);
    }
  }

  canvas.addEventListener('mousemove', e => {
    mouseOnCanvas = true;
    updateMouse(e.clientX, e.clientY);
  });
  canvas.addEventListener('mouseleave', () => {
    mouseOnCanvas = false;
    mouseWorld.set(1000, 1000, 0);
  });

  // Resize handler
  function onResize() {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);
  onResize();

  // IntersectionObserver: activate physics on first sight, pause render when off-screen
  let isActive = false;
  let isVisible = false;

  const activationObserver = new IntersectionObserver(entries => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !isActive) {
      isActive = true;
    }
  }, { threshold: 0.05 });
  activationObserver.observe(section);

  // Physics update — mirrors the original Rapier-based behaviour
  const tmp = new THREE.Vector3();

  function updatePhysics(dt) {
    dt = Math.min(dt, 0.05);

    // 1. Attraction toward origin (matches original applyImpulse toward center)
    //    Original: normalize(pos) * (-50*dt*scale, -150*dt*scale, -50*dt*scale)
    for (const b of balls) {
      const len = b.pos.length();
      if (len > 0.001) {
        b.vel.x -= (b.pos.x / len) * 50 * dt * b.scale;
        b.vel.y -= (b.pos.y / len) * 150 * dt * b.scale;
        b.vel.z -= (b.pos.z / len) * 50 * dt * b.scale;
      }
    }

    // 2. Mouse pointer repulsion (matches original kinematic BallCollider r=2)
    if (mouseOnCanvas) {
      for (const b of balls) {
        tmp.copy(b.pos).sub(mouseWorld);
        const dist = tmp.length();
        const minD = POINTER_RADIUS + b.scale;
        if (dist < minD && dist > 0.001) {
          const nx = tmp.x / dist, ny = tmp.y / dist, nz = tmp.z / dist;
          const velN = b.vel.x * nx + b.vel.y * ny + b.vel.z * nz;
          if (velN < 0) {
            const j = -1.5 * velN;
            b.vel.x += j * nx;
            b.vel.y += j * ny;
            b.vel.z += j * nz;
          }
          const pen = minD - dist;
          b.pos.x += nx * pen;
          b.pos.y += ny * pen;
          b.pos.z += nz * pen;
        }
      }
    }

    // 3. Ball–ball collision (sphere–sphere impulse + position correction)
    for (let i = 0; i < BALL_COUNT; i++) {
      for (let j = i + 1; j < BALL_COUNT; j++) {
        const bi = balls[i], bj = balls[j];
        const dx = bj.pos.x - bi.pos.x;
        const dy = bj.pos.y - bi.pos.y;
        const dz = bj.pos.z - bi.pos.z;
        const dist2 = dx * dx + dy * dy + dz * dz;
        const minD = bi.scale + bj.scale;
        if (dist2 < minD * minD) {
          const dist = Math.sqrt(dist2) || 0.001;
          const nx = dx / dist, ny = dy / dist, nz = dz / dist;
          const half = (minD - dist) * 0.25;
          bi.pos.x -= nx * half; bi.pos.y -= ny * half; bi.pos.z -= nz * half;
          bj.pos.x += nx * half; bj.pos.y += ny * half; bj.pos.z += nz * half;
          const relVn = (bj.vel.x - bi.vel.x) * nx + (bj.vel.y - bi.vel.y) * ny + (bj.vel.z - bi.vel.z) * nz;
          if (relVn < 0) {
            const imp = -1.0 * relVn / 2;
            bi.vel.x -= imp * nx; bi.vel.y -= imp * ny; bi.vel.z -= imp * nz;
            bj.vel.x += imp * nx; bj.vel.y += imp * ny; bj.vel.z += imp * nz;
          }
        }
      }
    }

    // 4. Damping + velocity sleep + position / rotation update
    const linD = Math.exp(-LINEAR_DAMPING * dt);
    const angD = Math.exp(-ANGULAR_DAMPING * dt);

    for (const b of balls) {
      b.vel.multiplyScalar(linD);
      b.angVel.multiplyScalar(angD);

      // Velocity sleep — kill micro-jitter when nearly at rest
      if (b.vel.x * b.vel.x + b.vel.y * b.vel.y + b.vel.z * b.vel.z < 2e-4) {
        b.vel.x = b.vel.y = b.vel.z = 0;
      }
      if (b.angVel.x * b.angVel.x + b.angVel.y * b.angVel.y + b.angVel.z * b.angVel.z < 1e-4) {
        b.angVel.x = b.angVel.y = b.angVel.z = 0;
      }

      b.pos.x += b.vel.x * dt;
      b.pos.y += b.vel.y * dt;
      b.pos.z += b.vel.z * dt;

      b.mesh.position.copy(b.pos);
      b.mesh.rotation.x += b.angVel.x * dt;
      b.mesh.rotation.y += b.angVel.y * dt;
      b.mesh.rotation.z += b.angVel.z * dt;
    }
  }

  // Animation loop
  let prevTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);
    if (!isVisible) { prevTime = now; return; }
    const dt = (now - prevTime) / 1000;
    prevTime = now;
    if (isActive) updatePhysics(dt);
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
