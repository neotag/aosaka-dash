import * as THREE from 'three';

export default class BasicLight {

  constructor(params) {
    this.params = params;
    this.light = this.createLight();
    this.setPosition(2, 1, 2);
  }

  createLight() {
    return new THREE.DirectionalLight(0xFFFFFF, 3);
  }

  addTo(scene) {
    scene.add(this.light);
    return this.light;
  }

  setPosition(posX, posY, posZ) {
    this.light.position.set(posX, posY, posZ);
  }

  lookAt(target) {
    this.light.lookAt(target.position)
  }

}
