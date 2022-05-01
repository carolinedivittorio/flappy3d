import { Group, Mesh } from 'three';
import * as THREE from 'three';
import MODEL from './Shells.obj';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
class Shells extends Group {
    // addShell() {
    //     const loader = new GLTFLoader();
    //     loader.load(
    //         MODEL,
    //         (gltf) => {
    //             var model = gltf.scene;
    //             // var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.7});
    //             // model.traverse((o) => {
    //             // if (o.isMesh) o.material = newMaterial;
    //             // });
    //             // model.scale.set(Math.random() * 0.5 + 0.25, Math.random() * 0.5 + 0.25, Math.random() * 0.5 + 0.25);
    //             // model.rotation.y = Math.random() * Math.PI / 4 - Math.PI / 2;
    //             // model.position.x = this.state.x + 20;
    //             // model.position.y = Math.random() * 2 - 1;
    //             model.scale.set(Math.random() * 0.01 , Math.random() * 0.01 , Math.random() * 0.01);
    //             // model.rotation.y = Math.PI; // Math.random() * Math.PI / 4 - Math.PI / 2;
    //             model.rotation.x = -0.9 * Math.PI / 2;

    //             this.position.x = 10 + Math.random() * 2;
    //             this.position.y = -2;
    //             this.position.z = 1.5 - Math.random() * 4;
    //             this.castShadow = true;
    //             this.add(model);
    //         }
    //     );
    // }
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            // cloudTime: 2000,
            // x: 0,
            // parent: parent
        };
        console.log("creating a new shell");
        

        const objLoader = new OBJLoader()
        objLoader.load(
            MODEL,
            (object) => {
                var newMaterial = new THREE.MeshStandardMaterial({color: 0xd982b5, opacity: 1});
                object.traverse((o) => {
                    if (o.isMesh) o.material = newMaterial;
                });
                // (object.children[0] as THREE.Mesh).material = material
                // object.traverse(function (child) {
                //     if ((child as THREE.Mesh).isMesh) {
                //         (child as THREE.Mesh).material = material
                //     }
                // })
                this.add(object)
                object.position.x = 10 + Math.random() * 2;
                object.position.y = -2;
                object.position.z = 1.5 - Math.random() * 3;
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )


        // this.position.x = 6 + Math.random() * 2;
        // this.position.y = 0;
        // this.position.z = -1.5;

       
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

export default Shells;
