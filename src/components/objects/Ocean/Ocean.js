import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import OBJ from './ocean.obj';
import MTL from './ocean.mtl';
import * as THREE from 'three';
class Ocean extends Group {
    addOcean(x, y, z) {
        var scene = this;
        var mtlLoader = new MTLLoader();
        mtlLoader.load(MTL, function(materials) {
            materials.preload();
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(OBJ, function(model) {
                model.scale.set(1, 1, 1);
                scene.add(model);
                model.position.y = y;
                model.position.z = z;
                model.position.x = x;
            });
            });
            
        }   
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            x: 0,
            parent: parent,
            current: 0
        };

        this.addOcean(0, -3.5, -52);


       // this.addOcean(51 * 2, -3.5, -52);  
       // this.addOcean(51 * 4, -3.5, -52);   
        this.castShadow = false;
        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        this.position.x = this.position.x - stepSize;
        if (this.position.x < -this.state.current * 102 + 30) {
            this.state.current++;
            this.addOcean(2 * this.state.current * 51, -3.5, -52);
        }
    }
}

export default Ocean;
