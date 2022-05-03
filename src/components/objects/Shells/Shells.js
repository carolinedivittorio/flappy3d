import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './Shells.obj';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
class Shells extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
        };
        

        const objLoader = new OBJLoader()
        objLoader.load(
            MODEL,
            (object) => {
                var newMaterial = new THREE.MeshStandardMaterial({color: 0xd982b5, opacity: 1});
                object.traverse((o) => {
                    if (o.isMesh) o.material = newMaterial;
                });
                this.add(object)
                object.position.x = 10 + Math.random() * 2;
                object.position.y = -2;
                object.position.z = 1.5 - Math.random() * 3;
            },
            (xhr) => {
            },
            (error) => {
            }
        )

        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        this.position.x = this.position.x - stepSize;
    }
}

export default Shells;
