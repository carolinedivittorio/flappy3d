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
            parent: parent
         }

        const floorGeometry = new THREE.BoxGeometry(10000, 0.2, 4);
        const floorMaterial = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
        const floor = new THREE.Mesh( floorGeometry, floorMaterial );
        floor.receiveShadow = true;
        floor.position.x = 0;
        floor.position.y = this.state.height - 0.1;
        floor.position.z = 0;
        this.add(floor);

        const bankGeometry = new THREE.BoxGeometry(10000, 10000, 0.2);
        const bankMaterial = new THREE.MeshStandardMaterial( {color: 0x113b08} );
        const bank = new THREE.Mesh( bankGeometry, bankMaterial );
        bank.position.x = 0;
        bank.position.y = -5000 + floor.position.y - 0.1;
        bank.position.z = 0.5;
        this.add(bank)
    
        

        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
    //    var birdBox = new THREE.Sphere();
        var bird = this.state.parent.children[0];
        // birdBox.radius = bird.children[0].geometry.boundingSphere.radius;
        // birdBox.center = bird.position;
        var birdBox = new THREE.Box3().setFromObject(bird);
        var floorBox = new THREE.Box3().setFromObject(this.children[0]);
        var bankBox = new THREE.Box3().setFromObject(this.children[1]);
        if (birdBox.intersectsBox(floorBox) || birdBox.intersectsBox(bankBox)) {
            bird.stop();
            this.parent.kill();
        }
    }

    pause() {

    }

    resume() {

    }
}

export default Floor;
