import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from "dat.gui";

import "./style.css";

// GUI
const gui = new dat.GUI();

// Basic
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector(".webgl");

// Resize
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

// Objects
// const geometry = new THREE.BoxGeometry(1, 1, 1);
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg",
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg",
);
const matcapTexture = textureLoader.load("/textures/matcaps/2.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/1/nx.jpg",
  "/textures/environmentMaps/2/py.jpg",
  "/textures/environmentMaps/3/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

// const material = new THREE.MeshBasicMaterial();

// material.map = doorColorTexture;
// material.color = new THREE.Color("pink");
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 10000;
// material.specular = new THREE.Color("green");

// const material = new THREE.MeshToonMaterial({
//   color: 0xffffff,
// });
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;

// material.gradientMap = gradientTexture;
// const material = new THREE.MeshStandardMaterial();

// material.metalness = 0;
// material.roughness = 1;
// material.map = doorColorTexture;
// doorAmbientOcclusionTexture.colorSpace = "SRGBColorSpace";
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(2.5, 2.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

const material = new THREE.MeshStandardMaterial();

material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
);

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2),
);

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2),
);

torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2),
);

console.log(torus.geometry.attributes);

torus.position.x = 1.5;

// gui.add(material, "metalness")

// const mesh = new THREE.Mesh(geometry, material);
scene.add(sphere, plane, torus);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);

pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
// camera.lookAt(plane.position);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.enable;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const Timer = new THREE.Timer();

const tick = (event) => {
  Timer.update();

  const elapsed = Timer.getElapsed();

  // sphere.rotation.y = elapsed;
  // plane.rotation.y = elapsed;
  // torus.rotation.y = elapsed;

  // console.log(sphere.rotation.y);

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
