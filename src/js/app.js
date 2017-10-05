import * as THREE from 'three';
import settings from './settings.js';

const scene = window.scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,// Field of view
  settings.window.width / settings.window.height,// Aspect ratio
  0.1,// Near
  1000// Far
);
const renderer = new THREE.WebGLRenderer();

const init = () => {
  setStage();
  const cube = createCube();
  createLight();
  animate(cube);
}

const setStage = () => {
  renderer.setSize(settings.window.width, settings.window.height);
  document.body.appendChild( renderer.domElement );
}

const createLight = () => {
  const light = window.light = new THREE.AmbientLight( 0xFF0000 ); // soft white light
  // scene.add( light );

  return light;
}

const createCube = () => {
  const geometry = new THREE.CubeGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 2;
  //camera.position.y = 1;

  return cube;
}

const animate = (cube) => {
  requestAnimationFrame( () => { animate(cube) } );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.setClearColor( 0xdddddd, 1)
  renderer.render(scene, camera);
}

document.addEventListener("DOMContentLoaded", init);

