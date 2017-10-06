import * as THREE from 'three';
import * as dat from 'dat.gui/build/dat.gui.min';

export default class Gui {

  constructor(params) {
    console.log(new dat.GUI)
    this.gui = new dat.GUI();
    return this.gui;
  }

  createGUI() {
    return new dat.GUI();
  }

  setGUI() {
    const tempCtrl = function () {
      this.cameraPosX = 0;
      this.lightPosX = 0;
    }

    const tempObj = new tempCtrl();
    const folder = this.gui.addFolder('temp folder');

    const cameraPosX = () => {
      camera.position.x = tempObj.cameraPosX;
      camera.position.y = tempObj.cameraPosX;
      camera.position.z = tempObj.cameraPosX;
    }

    const lightPosX = () => {
      directionalLight.position.set(tempObj.lightPosX, tempObj.lightPosX *1.5, tempObj.lightPosX *2);
      directionalLight.lookAt(cube.position)
    }

    this.gui.add( tempObj, 'cameraPosX', 0, 20).onChange(cameraPosX)
    this.gui.add( tempObj, 'lightPosX', -300, 300).onChange(lightPosX)

    return this.gui;
  }
}
