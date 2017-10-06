import * as THREE from 'three';
import OrbitControls from '../../libs/OrbitControls.js';
import settings from '../../settings.js';

export default class BasicCamera {

  constructor(params) {
    this.params = params;
    this.camera = this.createCamera();
    this.controls = this.createControls();

    this.setPosition();

    return this.camera;
  }

  createControls() {
    return new OrbitControls(
      this.camera,
      window.APP.renderer.domElement
    );
  }

  createCamera() {
    return this.camera = new THREE.PerspectiveCamera(
      75,// Field of view
      settings.window.width / settings.window.height,// Aspect ratio
      0.1,// Near
      1000// Far
    );
  }

  setPosition() {
    this.camera.position.x = 5;
    this.camera.position.y = 5;
    this.camera.position.z = 5;

    this.camera.lookAt(this.params.lookAt);

    return this.camera;
  }
}


