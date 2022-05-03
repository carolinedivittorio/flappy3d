import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './flower.gltf';

class Flower extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
        };

        // Load object
        const loader = new GLTFLoader();

        this.name = 'flower';
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            this.position.x = 10 + Math.random() * 2;
            this.position.y = -2;
            this.position.z = 2 - Math.random() * 4;
            this.rotation.y = Math.PI;
        });

        this.scale.set(0.2, 0.2, 0.2)

        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    update(timeStamp, stepSize) {
        this.position.x = this.position.x - stepSize;
    }
}

export default Flower;
