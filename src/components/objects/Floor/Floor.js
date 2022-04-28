import { Group } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import MODEL from './land.gltf';

class Floor extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            height: parent.state.floorHeight,
            parent: parent,
         }

        const floorGeometry = new THREE.BoxGeometry(10000, 0.2, 10);
        const floorMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        const floor = new THREE.Mesh( floorGeometry, floorMaterial );
        console.log(floor.position);
        floor.position.x = 0;
        floor.position.y = this.state.height - 0.1;
        floor.position.z = -4;
        this.add(floor);

        const bankGeometry = new THREE.BoxGeometry(10000, 10000, 0.2);
        const bankMaterial = new THREE.MeshBasicMaterial( {color: 0x113b08} );
        const bank = new THREE.Mesh( bankGeometry, bankMaterial );
        bank.position.x = 0;
        bank.position.y = -5000 + floor.position.y - 0.1;
        bank.position.z = 0.5;
        this.add(bank)
    
        

        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
       
        return false;
    }
}

export default Floor;
