import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log(OrbitControls);

/**
 * Cursor
 */

const canvas = document.querySelector(".webgl");

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / size.width - 0.5;
  cursor.y = -(event.clientY / size.height - 0.5);

  // console.log(event.clientY / size.height);
});

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const size = {
  width: 800,
  height: 600,
};

// Camera PerspectiveCamera(垂直视野, 宽高比, 近裁剪面, 远裁剪面);
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);

// OrthographicCamera(左, 右, 上, 下, 近裁剪面, 远裁剪面)
// const aspectRatio = size.width / size.height;

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100,
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;

camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

// Renderer

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);

// Clock
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // mesh.rotation.y = elapsedTime;

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
