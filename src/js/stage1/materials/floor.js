import * as THREE from 'three';


export default class Floor {

  constructor() {
    const geometry = new THREE.PlaneGeometry( 150, 150, 64, 64 );
    const floor = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial( { color: 0x0000ff } )
    )

    floor.rotation.x = Math.PI / -2;

    return floor;
  }

}
