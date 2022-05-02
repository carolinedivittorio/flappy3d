import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './scene.gltf';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import FLAKE from './flake.obj';
class Flake extends Group {
    addFlake() {
        var scene = this;
        var objLoader = new OBJLoader();
        objLoader.load(FLAKE, function(model) {
            var size = Math.random();
            model.scale.set(size * 0.05, size * 0.05, size * 0.05);
            // model.rotation.y = Math.PI; // Math.random() * Math.PI / 4 - Math.PI / 2;
            // model.rotation.x = -0.9 * Math.PI / 2;
            scene.castShadow = true;
            scene.add(model);
        });
        // const loader = new GLTFLoader();
        // loader.load(
        //     MODEL,
        //     (gltf) => {
        //         var model = gltf.scene;
        //         // var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.7});
        //         // model.traverse((o) => {
        //         // if (o.isMesh) o.material = newMaterial;
        //         // });
        //         // model.scale.set(Math.random() * 0.5 + 0.25, Math.random() * 0.5 + 0.25, Math.random() * 0.5 + 0.25);
        //         // model.rotation.y = Math.random() * Math.PI / 4 - Math.PI / 2;
        //         // model.position.x = this.state.x + 20;
        //         // model.position.y = Math.random() * 2 - 1;
        //         var size = Math.random();
        //         model.scale.set(size * 0.05, size * 0.05, size * 0.05);
        //         // model.rotation.y = Math.PI; // Math.random() * Math.PI / 4 - Math.PI / 2;
        //         // model.rotation.x = -0.9 * Math.PI / 2;
        //         this.castShadow = true;
        //         this.add(model);
        //     }
        // );
    }
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            fallSpeed: Math.random() * 0.05,
            threshold: Math.random() * 13 - 6
            // cloudTime: 2000,
            // x: 0,
            // parent: parent
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

export default Flake;
