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
    
        const offset = Math.random() * 2 - 1; // middle between pipes
        // top pipe should start at offset + 1
        // bottom pipe should end at offset - 1
        this.state.bottomLength = offset - 1 - parent.state.floorHeight;
        const topLength = parent.state.ceilingHeight - offset - 1;

        const pipeMaterial = new THREE.MeshBasicMaterial({color: 0x228b22});
        const bottomPipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, this.state.bottomLength, 32);
        const bottomPipe = new THREE.Mesh(bottomPipeGeometry, pipeMaterial);
        // bottomPipe.scale.set(parent.state.height * 0.05, this.state.bottomLength, 1);

        const topPipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, topLength, 32);
        const topPipe = new THREE.Mesh(topPipeGeometry, pipeMaterial);
        // topPipe.scale.set(parent.state.width * 0.05, topLength, 1);

        bottomPipe.position.z = 0;

        // TODO: Julia's changes
        // bottomPipe.position.x = 5; //parent.state.width / 2. ;
        // bottomPipe.position.y = -1 - 5/2 + offset; //-parent.state.height / 2. ;

        // topPipe.position.z = 0;
        // topPipe.position.x = 5; //parent.state.width / 2. + topPipe.scale.x;
        // topPipe.position.y = 1 + 5/2 + offset; //parent.state.height / 2. - topPipe.scale.y / 2.;

        bottomPipe.position.x = 1; //parent.state.width / 2. ;
        bottomPipe.position.y = -1 - this.state.bottomLength/2 + offset; //-parent.state.height / 2. ;

        topPipe.position.z = 0;
        topPipe.position.x = 1; //parent.state.width / 2. + topPipe.scale.x;
        topPipe.position.y = 1 + topLength/2 + offset; //parent.state.height / 2. - topPipe.scale.y / 2.;

        this.add(bottomPipe);
        this.add(topPipe);

        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        if (this.state.parent.state.gameState !== "active") {
            return;
        }

        this.children[0].position.set(
            this.children[0].position.x - 0.01,
            this.children[0].position.y,
            this.children[0].position.z
            );
        this.children[1].position.set(
            this.children[1].position.x - 0.01,
            this.children[1].position.y,
            this.children[1].position.z
            );

        var birdBox = new THREE.Sphere();
        birdBox.radius = this.state.bird.children[0].geometry.boundingSphere.radius;
        birdBox.center = this.state.bird.position;
        var topPipeBox = new THREE.Box3().setFromObject(this.children[0]);
        var bottomPipeBox = new THREE.Box3().setFromObject(this.children[1]);
        if (birdBox.intersectsBox(topPipeBox) || birdBox.intersectsBox(bottomPipeBox)) {
            this.parent.kill();
        }

        if (topPipeBox.max.x < birdBox.center.x - birdBox.radius) {
            if (!this.state.scored) {
                this.state.parent.state.score++;
                console.log(this.state.parent.state.score);
           //     this.state.parent.state.document.getElementById('score_text').innerHTML = 'Score: ' + this.state.parent.state.score;
                this.state.scored = true;
            }
        }
    }
}

export default Pipe;
