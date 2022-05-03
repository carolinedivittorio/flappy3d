import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import FLAKE from './flake.obj';
class Flake extends Group {
    addFlake() {
        var scene = this;
        var objLoader = new OBJLoader();
        objLoader.load(FLAKE, function(model) {
            var size = Math.random();
            model.scale.set(size * 0.05, size * 0.05, size * 0.05);
            scene.castShadow = true;
            scene.add(model);
        });
    }
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            fallSpeed: Math.random() * 0.05,
            threshold: Math.random() * 13 - 6
        };
        this.addFlake();
        this.position.x = 8 + Math.random() * 2;
        this.position.y = 5 + Math.random() * 10;
        this.position.z = -1.5;

       
        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {

        this.position.x = this.position.x - stepSize;
        if (this.position.x < this.state.threshold) {
            this.position.y = Math.max(this.parent.state.floorHeight, this.position.y - this.state.fallSpeed);
        }
    }

}

export default Flake;
