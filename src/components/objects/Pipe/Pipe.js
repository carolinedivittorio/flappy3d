import { Group } from 'three';
import * as THREE from 'three';

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
    
        const totalLength = parent.state.ceilingHeight - parent.state.floorHeight;
        const gapLength = totalLength * 0.4;
        const minLength = totalLength * 0.15;
        const hatLength = totalLength * 0.05;
        const offset = Math.random() * (totalLength - gapLength - 2 * minLength - 2 * hatLength);
        this.state.bottomLength = minLength + offset;
        const topLength = (totalLength - gapLength - 2 * minLength - 2 * hatLength) - offset + minLength;


        const pipeMaterial = new THREE.MeshPhongMaterial({color: 0x228b22, specular: 0xCCCCCC, shininess: 5});
        const bottomPipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, this.state.bottomLength, 32);
        const bottomPipe = new THREE.Mesh(bottomPipeGeometry, pipeMaterial);
        bottomPipe.castShadow = true;
        const bottomPipeGeometryHat = new THREE.CylinderGeometry(0.25, 0.25, hatLength, 32);
        const bottomPipeHat = new THREE.Mesh(bottomPipeGeometryHat, pipeMaterial);
        bottomPipeHat.castShadow = true;


        const topPipeGeometry = new THREE.CylinderGeometry(0.2, 0.2, topLength, 32);
        const topPipe = new THREE.Mesh(topPipeGeometry, pipeMaterial);
        const topPipeGeometryHat = new THREE.CylinderGeometry(0.25, 0.25, hatLength, 32);
        const topPipeHat = new THREE.Mesh(topPipeGeometryHat, pipeMaterial);
        topPipe.castShadow = true;
        topPipeHat.castShadow = true;

        bottomPipe.position.z = 0;
        bottomPipe.position.x = 7;
        bottomPipe.position.y = parent.state.floorHeight + this.state.bottomLength / 2; 
        bottomPipeHat.position.z = 0;
        bottomPipeHat.position.x = 7;
        bottomPipeHat.position.y = parent.state.floorHeight + this.state.bottomLength + hatLength / 2;

        topPipe.position.z = 0;
        topPipe.position.x = 7; 
        topPipe.position.y = parent.state.ceilingHeight - topLength / 2;
        topPipeHat.position.z = 0;
        topPipeHat.position.x = 7;
        topPipeHat.position.y = parent.state.ceilingHeight - topLength - hatLength / 2;

        this.add(bottomPipe);
        this.add(bottomPipeHat);
        this.add(topPipe);
        this.add(topPipeHat);

        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        if (this.state.parent.state.gameState !== "active") {
            return;
        }
        var birdBox = new THREE.Box3().setFromObject(this.state.bird.children[0]);
        var box;
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].position.set(
                this.children[i].position.x - stepSize,
                this.children[i].position.y,
                this.children[i].position.z
                );
            box = new THREE.Box3().setFromObject(this.children[i]);
            if (birdBox.intersectsBox(box)) {
                this.parent.kill();
            }
        }
        if (box.max.x < birdBox.min.x) {
            if (!this.state.scored) {
                this.state.parent.state.score++;
                this.state.scored = true;
            }
        }
    }
}

export default Pipe;
