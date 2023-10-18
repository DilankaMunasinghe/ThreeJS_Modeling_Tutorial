
// Import THREE and Orbit Controls (For Camera Movement)
import * as THREE from  'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// The Renderer Element that is needed for rendering the output
const renderer = new THREE.WebGLRenderer();

// Setting the window size
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();


// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// camera.position.z = 20;
// camera.position.y = 15;

camera.position.set(-150, 40, 30);
orbit.update();

// Box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x995599});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.rotation.x = -0.5 * Math.PI;

// Plane
const planeGeometry = new THREE.PlaneGeometry(500, 500);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x559911,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

// Grid
const gridHelper = new THREE.GridHelper(30, 100);
scene.add(gridHelper);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(4, 100, 10);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xE5E514,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 25, 10)
scene.add(sphere);

// GUI
const gui = new dat.GUI()

// Options
const options = {
    Sphere_Color: 0x3B8EEA,
    Wireframe: false,
    Speed: 0.01
}

gui.addColor(options, 'Sphere_Color').onChange(function(e){
    sphere.material.color.set(e)
})

gui.add(options, 'Wireframe').onChange(function(e){
    sphere.material.wireframe = e
})

gui.add(options, 'Speed', 0, 0.1);

let step = 0;
// let speed = 0.01;

// const circleGeometry = new THREE.PlaneGeometry(30, 30);
// const circleMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
// const circle = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(circle);


// Animation

function animate(time){
    // box.rotation.x = time / 1000;
    // box.rotation.y = time / 1000;
    box.rotation.z = -time / 2000;

    // plane.rotation.z = time / 2000;

    sphere.rotation.y = -time / 5000;
    renderer.render(scene, camera);

    // circle.rotation.z = time / 2000;
    // renderer.render(scene, camera);

    step += options.Speed;
    sphere.position.y = 4 + 10 * Math.abs(Math.sin(step));
}

renderer.setAnimationLoop(animate);