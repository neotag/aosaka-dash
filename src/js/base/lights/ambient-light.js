import * as THREE from 'three';

export default class BasicLight {

  constructor(params) {
    this.params = params;
    this.light = this.createLight();
    this.setPosition(0, 0, 0);
  }

  createLight(cube) {
    const light = new THREE.PointLight( 0xEEEEEE, 100 ); // soft white light
    light.castShadow = true;

    return light;
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
