import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './scene.gltf';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Leaves } from '../Leaves';
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
               // model.scale.set(100, 100, 100);
               model.scale.set(1.5, 1.5, 1.5);
                scene.add(model);
            });
        })
            

        // const loader = new GLTFLoader();
        // loader.load(
        //     MODEL,
        //     (gltf) => {
        //         var model = gltf.scene;
        //         // var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.7});
        //         // model.traverse((o) => {
        //         // if (o.isMesh) o.material = newMaterial;
        //         // });
        //         model.scale.set(100, 100, 100);
        //         // model.rotation.y = Math.random() * Math.PI / 4 - Math.PI / 2;
        //         // model.position.x = this.state.x + 20;
        //         // model.position.y = Math.random() * 2 - 1;
        //         this.add(model);
        //     }
        // );
    }
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            // cloudTime: 2000,
            // x: 0,
            // parent: parent
        };
        // const newLeaf = new Leaves(this);
        // this.add(newLeaf);

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
        // var step = 0.013;
        // if (this.state.parent.state.gameState !== "active") {
        //     step = 0.003;
        //     this.state.cloudTime += .01 / .013
        // }
        // if (this.state.cloudTime <= 0) {
        //     this.addCloud();
        //     this.state.cloudTime = 2000;
        // }
        // this.state.cloudTime--;
        // this.position.x -= step;
        // this.state.x += step;
    }

    pause() {
        
    }

    resume() {

    }
}

export default Tree;
