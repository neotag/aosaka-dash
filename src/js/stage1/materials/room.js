import * as THREE from 'three';


export default class room {

  constructor() {
    const geometry = new THREE.CubeGeometry( 200, 70, 200 );
    const material = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
    material.side = THREE.DoubleSide;
    const room = new THREE.Mesh(
      geometry,
      material
    )

    return room;
  }

}
