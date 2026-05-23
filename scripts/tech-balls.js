import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';

const canvas = document.querySelector('#techBallsCanvas');

if (canvas) {
    const stage = canvas.closest('.tech-orbit-stage');
    const section = canvas.closest('.tech-orbit-section');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const texturePaths = [
        './images/tech-balls/react.webp',
        './images/tech-balls/next.webp',
        './images/tech-balls/node.webp',
        './images/tech-balls/express.webp',
        './images/tech-balls/mongo.webp',
        './images/tech-balls/mysql.webp',
        './images/tech-balls/typescript.webp',
        './images/tech-balls/javascript.webp',
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 2.1);
    const key = new THREE.SpotLight(0xffffff, 280, 42, 0.42, 0.74, 1.35);
    key.position.set(10, 15, 22);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);

    const rim = new THREE.PointLight(0xd8e6e3, 78, 34, 1.4);
    rim.position.set(-10, -8, 10);

    const soft = new THREE.DirectionalLight(0xffffff, 1.5);
    soft.position.set(-5, 5, -4);

    scene.add(ambient, key, rim, soft);

    const geometry = new THREE.SphereGeometry(1, 48, 48);
    const loader = new THREE.TextureLoader();
    const pointer = {
        active: false,
        world: new THREE.Vector3(0, 0, 0),
        target: new THREE.Vector3(0, 0, 0),
    };
    const bounds = {
        width: 18,
        height: 10,
        depth: 8,
        mobile: false,
    };

    const balls = [];
    let active = true;
    let disposed = false;
    let lastTime = 0;
    let animationFrame = 0;

    const random = (min, max) => min + Math.random() * (max - min);

    function updateBounds() {
        if (!stage) return;

        const rect = stage.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width));
        const height = Math.max(1, Math.round(rect.height));
        bounds.mobile = width < 720;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = bounds.mobile ? 24 : 22;
        camera.updateProjectionMatrix();

        const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;

        bounds.width = visibleWidth * (bounds.mobile ? 0.82 : 0.78);
        bounds.height = visibleHeight * (bounds.mobile ? 0.7 : 0.62);
        bounds.depth = bounds.mobile ? 6.2 : 7.4;

        const scaleAdjust = bounds.mobile ? 0.76 : 1;
        balls.forEach((ball, index) => {
            const targetRadius = ball.baseRadius * scaleAdjust;
            ball.radius = targetRadius;
            ball.mesh.scale.setScalar(targetRadius);

            if (Math.abs(ball.position.x) > bounds.width * 0.5 || Math.abs(ball.position.y) > bounds.height * 0.5) {
                const angle = (index / balls.length) * Math.PI * 2;
                ball.position.set(
                    Math.cos(angle) * bounds.width * 0.2,
                    Math.sin(angle) * bounds.height * 0.16,
                    random(-bounds.depth * 0.24, bounds.depth * 0.24)
                );
                ball.velocity.multiplyScalar(0.2);
            }
        });
    }

    function toWorldPointer(event) {
        if (!stage) return;

        const rect = stage.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
        const direction = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / direction.z;

        pointer.target.copy(camera.position).add(direction.multiplyScalar(distance));
        pointer.active = true;
    }

    function buildMaterials(textures) {
        return textures.map((texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

            return new THREE.MeshPhysicalMaterial({
                map: texture,
                color: 0xffffff,
                roughness: 0.48,
                metalness: 0.05,
                clearcoat: 0.86,
                clearcoatRoughness: 0.18,
                reflectivity: 0.68,
                emissive: 0xffffff,
                emissiveIntensity: 0.035,
            });
        });
    }

    function createBalls(materials) {
        const count = bounds.mobile ? 20 : 30;
        const radiusSet = [0.78, 0.86, 0.94, 1, 1.08];

        for (let i = 0; i < count; i += 1) {
            const baseRadius = radiusSet[Math.floor(Math.random() * radiusSet.length)];
            const material = materials[i % materials.length].clone();
            const mesh = new THREE.Mesh(geometry, material);
            const angle = (i / count) * Math.PI * 2;
            const radius = baseRadius * (bounds.mobile ? 0.76 : 1);

            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.scale.setScalar(radius);
            mesh.rotation.set(random(-1.2, 1.2), random(-1.2, 1.2), random(-1.2, 1.2));
            mesh.position.set(
                Math.cos(angle) * random(bounds.width * 0.12, bounds.width * 0.34),
                Math.sin(angle) * random(bounds.height * 0.1, bounds.height * 0.28),
                random(-bounds.depth * 0.42, bounds.depth * 0.42)
            );

            group.add(mesh);
            balls.push({
                mesh,
                position: mesh.position,
                velocity: new THREE.Vector3(random(-0.02, 0.02), random(-0.02, 0.02), random(-0.02, 0.02)),
                spin: new THREE.Vector3(random(-0.8, 0.8), random(-0.8, 0.8), random(-0.8, 0.8)),
                baseRadius,
                radius,
            });
        }
    }

    function resolvePairs() {
        for (let i = 0; i < balls.length; i += 1) {
            for (let j = i + 1; j < balls.length; j += 1) {
                const a = balls[i];
                const b = balls[j];
                const delta = new THREE.Vector3().subVectors(a.position, b.position);
                const distance = Math.max(delta.length(), 0.0001);
                const minimum = (a.radius + b.radius) * 0.94;

                if (distance < minimum) {
                    const normal = delta.multiplyScalar(1 / distance);
                    const overlap = (minimum - distance) * 0.5;
                    a.position.addScaledVector(normal, overlap);
                    b.position.addScaledVector(normal, -overlap);

                    const impact = overlap * 0.018;
                    a.velocity.addScaledVector(normal, impact);
                    b.velocity.addScaledVector(normal, -impact);
                }
            }
        }
    }

    function contain(ball) {
        const halfWidth = bounds.width * 0.5 - ball.radius;
        const halfHeight = bounds.height * 0.5 - ball.radius;
        const halfDepth = bounds.depth * 0.5;

        if (ball.position.x > halfWidth) {
            ball.position.x = halfWidth;
            ball.velocity.x *= -0.42;
        } else if (ball.position.x < -halfWidth) {
            ball.position.x = -halfWidth;
            ball.velocity.x *= -0.42;
        }

        if (ball.position.y > halfHeight) {
            ball.position.y = halfHeight;
            ball.velocity.y *= -0.42;
        } else if (ball.position.y < -halfHeight) {
            ball.position.y = -halfHeight;
            ball.velocity.y *= -0.42;
        }

        if (ball.position.z > halfDepth) {
            ball.position.z = halfDepth;
            ball.velocity.z *= -0.42;
        } else if (ball.position.z < -halfDepth) {
            ball.position.z = -halfDepth;
            ball.velocity.z *= -0.42;
        }
    }

    function tick(time) {
        if (disposed) return;
        animationFrame = window.requestAnimationFrame(tick);

        const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.04);
        lastTime = time;

        if (!active && !prefersReducedMotion) {
            renderer.render(scene, camera);
            return;
        }

        pointer.world.lerp(pointer.target, 0.16);
        const speed = prefersReducedMotion ? 0.15 : 1;
        const centerPull = bounds.mobile ? 0.024 : 0.019;
        const pointerRange = bounds.mobile ? 3.4 : 4.2;

        balls.forEach((ball, index) => {
            const centerBias = new THREE.Vector3(
                Math.sin(time * 0.00022 + index) * 0.45,
                Math.cos(time * 0.0002 + index * 0.7) * 0.28,
                Math.sin(time * 0.00017 + index * 0.34) * 0.2
            );

            ball.velocity.addScaledVector(new THREE.Vector3().subVectors(centerBias, ball.position), centerPull * speed);

            if (pointer.active) {
                const away = new THREE.Vector3().subVectors(ball.position, pointer.world);
                const distance = Math.max(away.length(), 0.0001);

                if (distance < pointerRange) {
                    ball.velocity.addScaledVector(away.normalize(), (1 - distance / pointerRange) * 0.17 * speed);
                }
            }

            ball.velocity.multiplyScalar(prefersReducedMotion ? 0.9 : 0.965);
            ball.position.addScaledVector(ball.velocity, delta * 60 * speed);
            contain(ball);

            ball.mesh.rotation.x += ball.spin.x * delta * 0.34 * speed;
            ball.mesh.rotation.y += ball.spin.y * delta * 0.34 * speed;
            ball.mesh.rotation.z += ball.spin.z * delta * 0.22 * speed;
        });

        resolvePairs();
        group.rotation.y = Math.sin(time * 0.00016) * 0.11;
        group.rotation.x = Math.cos(time * 0.00012) * 0.04;

        renderer.render(scene, camera);
    }

    Promise.all(texturePaths.map((path) => new Promise((resolve, reject) => {
        loader.load(path, resolve, undefined, reject);
    }))).then((textures) => {
        updateBounds();
        createBalls(buildMaterials(textures));
        stage?.classList.add('is-webgl-ready');
        renderer.render(scene, camera);
        animationFrame = window.requestAnimationFrame(tick);
    }).catch(() => {
        stage?.classList.remove('is-webgl-ready');
    });

    const observer = new IntersectionObserver((entries) => {
        active = entries.some((entry) => entry.isIntersecting);
    }, { threshold: 0.08 });

    if (section) observer.observe(section);

    stage?.addEventListener('pointermove', toWorldPointer, { passive: true });
    stage?.addEventListener('pointerenter', toWorldPointer, { passive: true });
    stage?.addEventListener('pointerleave', () => {
        pointer.active = false;
    });
    window.addEventListener('resize', updateBounds);

    window.addEventListener('pagehide', () => {
        disposed = true;
        window.cancelAnimationFrame(animationFrame);
        observer.disconnect();
        geometry.dispose();
        balls.forEach((ball) => {
            ball.mesh.material.dispose();
        });
        renderer.dispose();
    });
}
