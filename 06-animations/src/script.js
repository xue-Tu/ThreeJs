import * as THREE from "three";
import gsap from "gsap";

console.log(gsap);

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const meterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, meterial);

scene.add(mesh);

// Camera
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});

renderer.setSize(sizes.width, sizes.height);

// Clock
// const clock = new THREE.Clock();

gsap.to(mesh.position, { duration: 1, delay: 2, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// Animation
const tick = () => {
  // Clock
  // const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  // Update objects
  // mesh.rotation.y = elapsedTime * Math.PI * 2;
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.z = Math.cos(elapsedTime);

  // camera.position.x = Math.cos(elapsedTime);
  // camera.position.y = Math.cos(elapsedTime);
  // camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
