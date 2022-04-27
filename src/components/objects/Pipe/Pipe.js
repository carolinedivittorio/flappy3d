import { Group } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import MODEL from './land.gltf';

class Pipe extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            width: parent.state.width,
            height: parent.state.height,
            bird: parent.children[0],
            parent:parent,
            scored: false
         }

         console.log("creating new pipe");

    
        this.state.bottomLength = (parent.state.height * 0.2 + Math.random() * parent.state.height * 0.4) * 0.8;
        const topLength = (parent.state.height * 0.8 - this.state.bottomLength) * 0.8;

        const pipeMaterial = new THREE.MeshBasicMaterial({color: 0x228b22});
        const bottomPipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 32);
        const bottomPipe = new THREE.Mesh(bottomPipeGeometry, pipeMaterial);
        // bottomPipe.scale.set(parent.state.height * 0.05, this.state.bottomLength, 1);

        const topPipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 5, 32);
        const topPipe = new THREE.Mesh(topPipeGeometry, pipeMaterial);
        // topPipe.scale.set(parent.state.width * 0.05, topLength, 1);

        bottomPipe.position.z = 0;
        bottomPipe.position.x = 1; //parent.state.width / 2. ;
        bottomPipe.position.y = -1 - 5 /2; //-parent.state.height / 2. ;

        topPipe.position.z = 0;
        topPipe.position.x = 1; //parent.state.width / 2. + topPipe.scale.x;
        topPipe.position.y = 1 + 5/2; //parent.state.height / 2. - topPipe.scale.y / 2.;

        this.add(bottomPipe);
        this.add(topPipe);

    }
}

export default Pipe;
