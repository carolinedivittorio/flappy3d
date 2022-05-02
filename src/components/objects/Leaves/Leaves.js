import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './scene.gltf';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import MTL from './leaf.mtl';
import OBJ from './leaf.obj';
class Leaves extends Group {
    addLeaf() {
        var scene = this;
        var mtlLoader = new MTLLoader();
        mtlLoader.load(MTL, function(materials) {
            materials.preload();
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(OBJ, function(model) {
                model.scale.set(Math.random() * 0.03 , Math.random() * 0.03 , Math.random() * 0.03);
                // model.rotation.y = Math.PI; // Math.random() * Math.PI / 4 - Math.PI / 2;
                model.rotation.x = -0.9 * Math.PI / 2;
                scene.castShadow = true;
                scene.add(model);
            });
        });
    }
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            // cloudTime: 2000,
            // x: 0,
            // parent: parent
            threshold: Math.random() * 2 + 1
        };
        this.addLeaf();
        this.position.x = 7 + Math.random() * 2;
        this.position.y = 0.5;
        this.position.z = -1.5;

       
        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {

        this.position.x = this.position.x - stepSize;
        if (this.position.x < this.state.threshold) {
            this.position.y = Math.max(this.parent.state.floorHeight, this.position.y - 0.02);
        }
    }

    pause() {
        
    }

    resume() {

    }
}

export default Leaves;
