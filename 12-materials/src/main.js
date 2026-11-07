import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";

console.log(THREE);
/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Basic
 */

const canvas = document.querySelector(".webgl");
// Size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update Camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(size.width, size.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

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
const matcapTexture = textureLoader.load("./textures/matcaps/1.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/3/px.jpg",
  "/textures/environmentMaps/3/nx.jpg",
  "/textures/environmentMaps/3/py.jpg",
  "/textures/environmentMaps/3/ny.jpg",
  "/textures/environmentMaps/3/pz.jpg",
  "/textures/environmentMaps/3/nz.jpg",
]);

// doorColorTexture.colorSpace = THREE.SRGBColorSpace;
// matcapTexture.colorSpace = THREE.SRGBColorSpace;

// doorColorTexture.minFilter = THREE.NearestFilter;
// doorColorTexture.magFilter = THREE.NearestFilter;

// Object

// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.2;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0xff0000);

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

// gui.add(material, "metalnessMap").min(0).max(1).step(0.0001);
// gui.add(material, "roughnessMap").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2),
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2),
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
);
torus.position.x = 1.5;

torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2),
);

scene.add(sphere, plane, torus);

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight("#fff", 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight("#fff", 50);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);
camera.position.z = 3;

// camera.lookAt(mesh.position);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.enabled = false;
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);

// Clock
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // camera.position.x = Math.cos(elapsed * Math.PI * 2);
  // camera.rotationY = Math.sin(elapsed * Math.PI * 2);

  // Update objects
  // sphere.rotation.y = 0.1 * elapsedTime;
  // plane.rotation.y = 0.1 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;

  // sphere.rotation.x = -0.15 * elapsedTime;
  // plane.rotation.x = -0.15 * elapsedTime;
  // torus.rotation.x = -0.15 * elapsedTime;
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
