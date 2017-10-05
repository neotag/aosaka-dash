import * as THREE from 'three';
import * as dat from 'dat.gui/build/dat.gui.min';
import settings from './settings.js';

const scene = window.scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,// Field of view
  settings.window.width / settings.window.height,// Aspect ratio
  0.1,// Near
  1000// Far
);
const renderer = new THREE.WebGLRenderer();

const setGUI = () => {
  const gui = new dat.GUI();

  const tempCtrl = function () {
    this.cameraPosX = 0;
    this.lightPosX = 0;
  }

  const tempObj = new tempCtrl();
  const folder = gui.addFolder('temp folder');

  const cameraPosX = () => {
    camera.position.x = tempObj.cameraPosX;
    camera.position.y = tempObj.cameraPosX;
    camera.position.z = tempObj.cameraPosX;
  }

  const lightPosX = () => {
    directionalLight.position.set(tempObj.lightPosX, tempObj.lightPosX *1.5, tempObj.lightPosX *2);
    directionalLight.lookAt(cube.position)
  }

  gui.add( tempObj, 'cameraPosX', 0, 20).onChange(cameraPosX)
  gui.add( tempObj, 'lightPosX', -300, 300).onChange(lightPosX)
}

const init = () => {
  setStage();
  const cube = createCube();
  createLight();
  animate(cube);
  setGUI();
  setHelper();
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

const setHelper = () => {
  const gridHelper = new THREE.GridHelper(200,50); // size, step
  scene.add(gridHelper);
  const axisHelper = new THREE.AxisHelper(200,50);
  scene.add(axisHelper);
  const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 20);
  scene.add(lightHelper);
}

document.addEventListener("DOMContentLoaded", init);

