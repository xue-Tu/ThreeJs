import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";

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

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#e84118" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);
camera.position.z = 3;
camera.lookAt(mesh.position);

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
  const elapsed = clock.getElapsedTime();

  // camera.position.x = Math.sin(elapsed * Math.PI * 2);

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
