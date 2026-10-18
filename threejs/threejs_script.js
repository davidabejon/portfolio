import './style.css';
import * as THREE from 'three';

const canvas = document.querySelector('#bg-canvas');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactViewport = window.matchMedia('(max-width: 767px)');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x06091c, 0.005);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);
const lookAt = new THREE.Vector3(0, 4, -90);
const pointer = new THREE.Vector2();
const scroll = { target: 0, current: 0 };
let renderer;

try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
} catch (error) {
    console.error('The 3D background could not be initialized. Using the CSS background.', error);
}

function hideCurtain() {
    document.querySelector('.curtain')?.classList.add('is-ready');
}

function createBackground() {
    renderer.setClearColor(0x06091c, 0);

    const leftColor = new THREE.Color(0x49bddc);
    const rightColor = new THREE.Color(0xad78ed);
    const uniforms = {
        uTime: { value: 0 },
        uLeftColor: { value: leftColor },
        uRightColor: { value: rightColor },
    };
    const gridGeometry = new THREE.PlaneGeometry(520, 320);
    gridGeometry.rotateX(-Math.PI / 2);
    const gridMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms,
        vertexShader: `
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec3 uLeftColor;
            uniform vec3 uRightColor;
            varying vec3 vPosition;
            void main() {
                vec2 coord = vec2(vPosition.x, vPosition.z - uTime * 2.0) / 5.0;
                vec2 line = abs(fract(coord - 0.5) - 0.5) / max(fwidth(coord), vec2(0.0001));
                float grid = 1.0 - min(min(line.x, line.y), 1.0);
                float distanceFade = smoothstep(-155.0, -35.0, vPosition.z);
                float edgeLight = mix(0.55, 1.0, smoothstep(8.0, 65.0, abs(vPosition.x)));
                float pulse = exp(-pow((vPosition.z - mod(uTime * 9.0, 240.0) + 150.0) / 5.0, 2.0));
                vec3 color = mix(uLeftColor, uRightColor, smoothstep(-34.5, 34.5, vPosition.x));
                gl_FragColor = vec4(color, grid * distanceFade * edgeLight * (0.78 + pulse * 0.2));
                #include <colorspace_fragment>
            }
        `,
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.position.set(0, -7, -115);
    scene.add(grid);

    // A seeded landscape keeps the composition stable across reloads.
    let seed = 83;
    function random() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }

    const terrainGeometry = new THREE.PlaneGeometry(105, 260, 21, 52);
    terrainGeometry.rotateX(-Math.PI / 2);
    const positions = terrainGeometry.attributes.position;
    for (let index = 0; index < positions.count; index++) {
        const x = positions.getX(index);
        const z = positions.getZ(index);
        const ridge = Math.sin((z + 130) * 0.045) * 0.5 + 0.5;
        const edge = Math.sin(((x + 52.5) / 105) * Math.PI);
        positions.setY(index, edge * (3 + ridge * 13 + random() * 12));
    }
    terrainGeometry.computeVertexNormals();

    const terrainMaterial = new THREE.MeshBasicMaterial({
        color: 0x101832,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
    });
    const terrainEdges = new THREE.WireframeGeometry(terrainGeometry);
    const terrainLineMaterials = [];
    for (const side of [-1, 1]) {
        const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
        terrain.position.set(side * 87, -7, -105);
        scene.add(terrain);
        const material = new THREE.LineBasicMaterial({
            color: side === -1 ? leftColor : rightColor,
            transparent: true,
            opacity: 0.62,
        });
        terrainLineMaterials.push(material);
        const edges = new THREE.LineSegments(terrainEdges, material);
        edges.position.copy(terrain.position);
        scene.add(edges);
    }

    const sunGeometry = new THREE.PlaneGeometry(48, 48);
    const sunMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uOpacity: { value: 0.9 } },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uOpacity;
            varying vec2 vUv;
            void main() {
                vec2 point = (vUv - 0.5) * 2.0;
                float radius = length(point);
                float disc = 1.0 - smoothstep(0.77, 0.785, radius);
                float glow = exp(-radius * radius * 4.0) * 0.2;
                float stripe = step(0.22 + (1.0 - vUv.y) * 0.4, fract(vUv.y * 13.0));
                float mask = mix(stripe, 1.0, smoothstep(0.55, 0.61, vUv.y));
                vec3 color = mix(vec3(0.9, 0.18, 0.65), vec3(1.0, 0.7, 0.4), vUv.y);
                gl_FragColor = vec4(color, (disc * mask * 0.9 + glow) * uOpacity);
            }
        `,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(48, 17, -185);
    scene.add(sun);

    const starPositions = [];
    for (let index = 0; index < 360; index++) {
        starPositions.push((random() - 0.5) * 400, 12 + random() * 145, -60 - random() * 260);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0x8baac9,
        size: 0.26,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const shardGeometry = new THREE.IcosahedronGeometry(1, 0);
    const shardEdges = new THREE.EdgesGeometry(shardGeometry);
    const shardMaterial = new THREE.LineBasicMaterial({
        color: 0x63c8df,
        transparent: true,
        opacity: 0.42,
    });
    const shards = [];
    for (let index = 0; index < 24; index++) {
        const shard = new THREE.LineSegments(shardEdges, shardMaterial);
        const side = index % 2 === 0 ? -1 : 1;
        shard.position.set(side * (23 + random() * 52), 3 + random() * 48, -25 - random() * 125);
        shard.rotation.set(random() * Math.PI, random() * Math.PI, 0);
        shard.scale.setScalar(0.5 + random() * 1.4);
        shard.userData.baseY = shard.position.y;
        shards.push(shard);
        scene.add(shard);
    }
    shardGeometry.dispose();

    let frame = 0;
    let lastTime = null;
    let elapsed = 0;
    let disposed = false;

    function render(now) {
        frame = 0;
        if (disposed) return;
        const delta = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        if (!motionPreference.matches) elapsed += delta;
        uniforms.uTime.value = elapsed;
        const smoothing = 1 - Math.exp(-delta * 3);
        scroll.current = THREE.MathUtils.lerp(scroll.current, scroll.target, smoothing);
        const motion = motionPreference.matches ? 0 : 1;
        camera.position.set(
            motion * pointer.x * 1.8,
            7 + motion * (pointer.y * 0.7 + scroll.current * 2),
            32 - motion * scroll.current * 40,
        );
        camera.lookAt(lookAt);
        shards.forEach((shard, index) => {
            shard.rotation.x = index * 0.4 + elapsed * 0.07;
            shard.rotation.y = index * 0.6 + elapsed * 0.1;
            shard.position.y = shard.userData.baseY + Math.sin(elapsed * 0.35 + index) * 1.2;
        });
        renderer.render(scene, camera);
        if (!motionPreference.matches && !document.hidden) frame = requestAnimationFrame(render);
    }

    function restart() {
        cancelAnimationFrame(frame);
        lastTime = null;
        if (!document.hidden && !disposed) frame = requestAnimationFrame(render);
    }

    function resize() {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactViewport.matches ? 1.25 : 1.75));
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        sun.position.x = compactViewport.matches ? 15 : 48;
        sunMaterial.uniforms.uOpacity.value = compactViewport.matches ? 0.7 : 1.0;
        terrainLineMaterials.forEach(material => {
            material.opacity = compactViewport.matches ? 0.45 : 0.62;
        });
        restart();
    }

    function onPointerMove(event) {
        if (event.pointerType !== 'mouse' || motionPreference.matches) return;
        pointer.set(event.clientX / window.innerWidth * 2 - 1, 1 - event.clientY / window.innerHeight * 2);
    }

    function onPointerLeave() {
        pointer.set(0, 0);
    }

    function onScroll() {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        scroll.target = height > 0 ? THREE.MathUtils.clamp(window.scrollY / height, 0, 1) : 0;
    }

    function onContextLost(event) {
        event.preventDefault();
        cancelAnimationFrame(frame);
        console.warn('The 3D background WebGL context was lost.');
    }

    function onContextRestored() {
        resize();
    }

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', restart);
    motionPreference.addEventListener('change', restart);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);
    onScroll();
    resize();
    hideCurtain();

    return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('pointermove', onPointerMove);
        document.documentElement.removeEventListener('pointerleave', onPointerLeave);
        document.removeEventListener('visibilitychange', restart);
        motionPreference.removeEventListener('change', restart);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        canvas.removeEventListener('webglcontextrestored', onContextRestored);
        [gridGeometry, terrainGeometry, terrainEdges, sunGeometry, starGeometry, shardEdges].forEach(geometry => geometry.dispose());
        [gridMaterial, terrainMaterial, sunMaterial, starMaterial, shardMaterial, ...terrainLineMaterials].forEach(material => material.dispose());
        renderer.dispose();
    };
}

const dispose = renderer ? createBackground() : hideCurtain();
if (import.meta.hot) {
    import.meta.hot.dispose(() => dispose?.());
}
