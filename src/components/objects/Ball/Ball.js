import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './scene.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


class Ball extends Group {
    addBall() {
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                var model = gltf.scene;
                // var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.7});
                // model.traverse((o) => {
                // if (o.isMesh) o.material = newMaterial;
                // });
                model.scale.set(1, 1, 1);
                this.add(model);
            }
        );
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
        console.log(this);
        this.position.y = -1.85;
        this.position.z = -1 + Math.random() * 2;
        this.position.x = 5;
        this.castShadow = false;
        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        this.position.x = this.position.x - stepSize;
    }

    pause() {
        
    }

    resume() {

    }
}

export default Ball;
