import './style.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true,
});

renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function createStar() {
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: .4 });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    return star;
}

const stars = Array(200).fill().map(createStar);
stars.forEach(star => scene.add(star));

function moveCamera() {
    stars.forEach(star => {
        star.rotation.x += 0.01;
        star.rotation.y += 0.01;
        star.rotation.z += 0.01;
    });

    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01;
}
document.body.onscroll = moveCamera; // move camera on scroll
window.onload = () => {
    moveCamera(); // set initial position on load
    document.querySelector('.curtain').style.opacity = '0'; // hide loader
};

// Animation Loop

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();