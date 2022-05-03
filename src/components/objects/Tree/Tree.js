import { Group, Mesh } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import TREE from './newtree.obj';
import TREEMTL from './newtree.mtl';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
class Tree extends Group {
    addTree() {
        var scene = this;
        var mtlLoader = new MTLLoader();
        mtlLoader.load(TREEMTL, function(materials) {
            materials.preload();
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(TREE, function(model) {
               model.scale.set(1.5, 1.5, 1.5);
                scene.add(model);
            });
        })
    }
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
        };

        this.addTree();
        this.position.x = 6;
        this.position.y = -2.2;
        this.position.z = -2;
        this.scale.set(0.01, 0.01, 0.007);
        this.castShadow = true;
        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        this.position.x = this.position.x - stepSize;
    }
}

export default Tree;
