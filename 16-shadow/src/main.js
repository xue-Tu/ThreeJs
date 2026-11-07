import * as THREE from "three";
import * as dat from "dat.gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./style.css";

// Basic
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector(".webgl");

// Debug
const gui = new dat.GUI();

// Resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Textures
const textureLoader = new THREE.TextureLoader();
const bakedShadowTexture = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadowTexture = textureLoader.load("/textures/simpleShadow.jpg");
console.log(bakedShadowTexture);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// AmibientLight Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("Ambient Light Intensity");

scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2,
);
gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("Directional Light Intensity");

gui.add(directionalLight.position, "x").min(-5).max(5).step(0.01);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.01);

gui.add(directionalLight.position, "z").min(-5).max(5).step(0.01);
directionalLight.position.set(2, 2, -1);

directionalLight.castShadow = false;
scene.add(directionalLight);

directionalLight.shadow.mapSize.width = 1024 / 4;
directionalLight.shadow.mapSize.height = 1024 / 4;

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
// directionalLight.shadow.radius = 10;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera,
);
// scene.add(directionalLightCameraHelper);
// directionalLight.shadow.camera.near = 1;

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI * 0.3);

spotLight.castShadow = false;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.fov = 75;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;

console.log(spotLight.shadow);

spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLightCameraHelper);
// plane.position.z = -1;

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 0.6);

pointLight.castShadow = false;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.mapSize.near = 0.1;
pointLight.shadow.mapSize.far = 5;

pointLight.position.set(-1, 1, 0);

scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// pointLightCameraHelper.visible = false;
// scene.add(pointLightCameraHelper);

// Object
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.5;
material.metalness = 0.5;

gui.add(material, "roughness").min(0).max(1).step(0.01);
gui.add(material, "metalness").min(0).max(1).step(0.01);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(5, 5),
//   new THREE.MeshBasicMaterial({ map: bakedShadowTexture }),
// );
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = false;

plane.receiveShadow = true;

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
scene.add(plane, sphere);

const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    alphaMap: simpleShadowTexture,
    transparent: true,
  }),
);

sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;

// sphereShadow.material.map = simpleShadowTexture;
scene.add(sphereShadow);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFShadowMap;

const timer = new THREE.Timer();

const tick = () => {
  const elapsedTime = timer.getElapsed();

  timer.update();
  console.log(elapsedTime);

  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // Update the shadow
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5;
  // Update controls
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
