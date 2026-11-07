import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import "./style.css";

// Basic
const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

// Texture
// const image = new Image();
// image.src = "/textures/door/color.jpg";

// const doorColorTexture = new THREE.Texture(image);
// doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// image.onload = () => {
//   doorColorTexture.needsUpdate = true;
// };

const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("start");
// };
// loadingManager.onProgress = () => {
//   console.log("progress");
// };
// loadingManager.onLoad = () => {
//   console.log("load");
// };
// loadingManager.onError = () => {
//   console.log("error");
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/minecraft.png");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
);
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const metalnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
colorTexture.colorSpace = THREE.SRGBColorSpace;
colorTexture.generateMipmaps = false;

colorTexture.magFilter = THREE.NearestFilter;
// colorTexture.minFilter = THREE.NearestFilter;

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = (1 / 8) * Math.PI;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry.attributes);
// const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial({
  // color: "red",
  map: colorTexture,
});
// material.map = doorColorTexture;

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
camera.lookAt(mesh.position);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// Animation loop (OrbitControls needs update() on every frame)

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
