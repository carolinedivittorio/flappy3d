import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './scene.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
class Ocean extends Group {
    addOcean() {
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                var model = gltf.scene;
                var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.7});
                model.traverse((o) => {
                if (o.isMesh) o.material = newMaterial;
                });
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

        this.addOcean();
        this.position.y = -2;
        this.position.z = -10;
        this.position.x = 0;
        this.castShadow = false;
        parent.addToUpdateList(this);

    }

    update(timeStamp) {
   
    }

    pause() {
        
    }

    resume() {

    }
}

export default Ocean;
