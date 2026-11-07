import * as THREE from "three";

// Create a scene
const scene = new THREE.Scene();

// Create a Objects
const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);

group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);

cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);

cube3.position.x = 2;
group.add(cube3);

// Axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Size
const size = {
  width: 800,
  height: 600,
};

// Create a camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
// camera.position.x = 1;
// camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

const canvas = document.querySelector(".webgl") as HTMLCanvasElement;
// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);
