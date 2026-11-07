import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import gsap from "gsap";

/**
 * Debug
 */

const gui = new GUI({
  width: 400,
  title: "ice debug UI",
  closeFolders: false,
});
// gui.close();
// gui.hide();

window.addEventListener("keydown", (event) => {
  if (event.key == "h") {
    gui.show(gui._hidden);
  }
});

const debugObject = {};

/**
 * Basic
 */

const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // 更新相机比例
  camera.aspect = sizes.width / sizes.height;
  // 通知相机重新计算投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

// Objects
debugObject.color = "#6850aa";

let geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
// const geometry = new THREE.BufferGeometry();

// const count = 50;
// const positionsArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionsArray[i] = (Math.random() - 0.5) * 4;
// }

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const cubeTweaks = gui.addFolder("Awesome cube");
// cubeTweaks.close();

// gui.add(mesh.position, "x", -3, 3, 0.01);
cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");

cubeTweaks.add(mesh, "visible");

cubeTweaks.add(material, "wireframe");

cubeTweaks.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

debugObject.subdivision = 2;

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    duration: 1,
    y: mesh.position.y + Math.PI * 2,
  });
};

cubeTweaks.add(debugObject, "spin");

// cubeTweaks.add(mesh.rotation, "y").name("spin");

cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();

    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
    );
  });

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);

camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 3;
camera.lookAt(mesh.position);

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
