import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import OBJ from './beachball.obj';
import MTL from './beachball.mtl';

class Ball extends Group {
    addBall() {
        var scene = this;
        var mtlLoader = new MTLLoader();
        mtlLoader.load(MTL, function(materials) {
            materials.preload();
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(OBJ, function(model) {
                model.scale.set(0.3, 0.3, 0.3);
                model.rotation.x = Math.random() * Math.PI;
                scene.add(model);
            });
            });

    }
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            cloudTime: 2000,
            x: 0,
            parent: parent
        };

        this.addBall();
        this.position.y = -1.75;
        this.position.z = -2 + Math.random();
        this.position.x = 5;
        this.castShadow = false;
        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        this.position.x = this.position.x - stepSize;
    }
}

export default Ball;
