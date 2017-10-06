import * as THREE from 'three';
import * as dat from 'dat.gui/build/dat.gui.min';
import settings from './settings.js';

import Light from './base/lights/basic-light.js';
import AmbientLight from './base/lights/ambient-light.js';
import Camera from './base/cameras/basic-camera.js';

import Room from './stage1/materials/room.js';


window.THREE = THREE;
window.APP = {}

const renderer = window.APP.renderer = new THREE.WebGLRenderer();
const scene = window.APP.scene = new THREE.Scene();
const camera = window.APP.camera = new Camera( { lookAt: scene.position } );

const directionalLight = new Light();
const ambientLight = new AmbientLight();

// Materials
const room = new Room();

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
  scene.add( room );
  setLight(cube);
  animate(cube);
  setGUI();
  setHelper();

  renderer.setClearColor( 0xdddddd, 1)
  renderer.render(scene, camera);
}

const setStage = () => {
  renderer.setSize(settings.window.width, settings.window.height);
  document.body.appendChild( renderer.domElement );
}

const setLight = (cube) => {
  directionalLight.addTo(scene);
  directionalLight.lookAt(cube);
  ambientLight.addTo(scene);
  ambientLight.lookAt(cube);

  return ambientLight;
}

const createCube = () => {
  const geometry = new THREE.CubeGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0xFF0000 } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.y = 0;
  scene.add( cube );

  return cube;
}

const cube = createCube();

const animate = (cube) => {
  requestAnimationFrame( () => { animate(cube) } );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  //camera.rotation.x += 0.001;
  //ccamera.rotation.y += 0.002;

  renderer.render(scene, camera);
}

const setHelper = () => {
  const gridHelper = new THREE.GridHelper(200,50); // size, step
  scene.add(gridHelper);
  const axisHelper = new THREE.AxisHelper(200,50);
  scene.add(axisHelper);
  const lightHelper = new THREE.PointLightHelper(directionalLight.light, 1);
  scene.add(lightHelper);
}

document.addEventListener("DOMContentLoaded", init);

