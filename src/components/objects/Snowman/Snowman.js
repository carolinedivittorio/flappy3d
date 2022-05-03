import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';;
import { Group } from 'three';
import OBJ from './snowman.obj';
import MTL from './snowman.mtl';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Snowman extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
        };
        var scene = this;
        var mtlLoader = new MTLLoader();
        mtlLoader.load(MTL, function(materials) {
            materials.preload();
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(OBJ, function(model) {
                model.scale.set(0.75, 0.75, 0.75);
                scene.add(model);
            });
            });
        this.position.x = 10 + Math.random() * 2;
        this.position.y = -2;
        this.position.z = -1.5;
        this.scale.set(0.5, 0.5, 0.5)

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp, stepSize) {
        this.position.x = this.position.x - stepSize;
    }
}

export default Snowman;

