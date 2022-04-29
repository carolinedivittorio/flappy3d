import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './scene.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
class Cloud extends Group {
    addCloud() {
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                var model = gltf.scene;
                var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.7});
                model.traverse((o) => {
                if (o.isMesh) o.material = newMaterial;
                });
                model.scale.set(Math.random() * 0.5 + 0.25, Math.random() * 0.5 + 0.25, Math.random() * 0.5 + 0.25);
                model.rotation.y = Math.random() * Math.PI / 4 - Math.PI / 2;
                model.position.x = this.state.x + 20;
                model.position.y = Math.random() * 2 - 1;
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

        this.addCloud();
        this.position.y = 3;
        this.position.z = -10;
        this.castShadow = true;
        parent.addToUpdateList(this);

    }

    update(timeStamp) {
        var step = 0.013;
        if (this.state.parent.state.gameState !== "active") {
            step = 0.003;
        }
        if (this.state.cloudTime === 0) {
            this.addCloud();
            this.state.cloudTime = 2000;
        }
        this.state.cloudTime--;
        this.position.x -= step;
        this.state.x += step;
    }
}

export default Cloud;
