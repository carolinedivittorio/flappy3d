import { Group } from 'three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './scene.gltf';

class Icicle extends Group {

    addIcicle() {
        console.log('creating new icicle');
        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                var model = gltf.scene;
                var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.7});
                model.traverse((o) => {
                if (o.isMesh) o.material = newMaterial;
                });
                this.add(model);
            }
        );
    }
     
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.state = {
            width: parent.state.width,
            height: parent.state.height,
            bird: parent.children[0],
            parent:parent,
            scored: false
         }
    
        this.addIcicle();
        this.position.x = 0;
        this.position.y = -1;
        this.position.z = 0;
        this.castShadow = true;
        parent.addToUpdateList(this);

    }

    update(timeStamp, stepSize) {
        if (this.state.parent.state.gameState !== "active") {
            return;
        }
    //     var birdBox = new THREE.Box3().setFromObject(this.state.bird.children[0]);//new THREE.Sphere();
    //     //birdBox.radius = this.state.bird.children[0].geometry.boundingSphere.radius;
    //   //  birdBox.center = this.state.bird.position;
    //     var box;
    //     for (var i = 0; i < this.children.length; i++) {
    //         this.children[i].position.set(
    //             this.children[i].position.x - stepSize,
    //             this.children[i].position.y,
    //             this.children[i].position.z
    //             );
    //         box = new THREE.Box3().setFromObject(this.children[i]);
    //         if (birdBox.intersectsBox(box)) {
    //             this.parent.kill();
    //         }
    //     }
    //     if (box.max.x < birdBox.min.x) {
    //         if (!this.state.scored) {
    //             this.state.parent.state.score++;
    //             console.log(this.state.parent.state.score);
    //        //     this.state.parent.state.document.getElementById('score_text').innerHTML = 'Score: ' + this.state.parent.state.score;
    //             this.state.scored = true;
    //         }
    //     }
    }

    pause() {

    }

    resume() {

    }
}

export default Icicle;
