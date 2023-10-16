
// Import THREE and Orbit Controls (For Camera Movement)
import * as THREE from  'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// The Renderer Element that is needed for rendering the output
const renderer = new THREE.WebGLRenderer();

// Setting the window size
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// camera.position.z = 5;
// camera.position.y = 2;

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x995599});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0x559911});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// const circleGeometry = new THREE.PlaneGeometry(30, 30);
// const circleMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
// const circle = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(circle);

function animate(time){
    // box.rotation.x = time / 1000;
    // box.rotation.y = time / 1000;
    box.rotation.z = -time / 2000;

    plane.rotation.z = time / 2000;
    renderer.render(scene, camera);

    // circle.rotation.z = time / 2000;
    // renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);