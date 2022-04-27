import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './flower.gltf';
import * as THREE from 'three';



class Bird extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            height: parent.state.height,
            upFlap: 0,
        };

        const geometry = new THREE.SphereGeometry(0.1, 32, 16);
        const material = new THREE.MeshBasicMaterial({color:0xAA4A44});
        const sphere = new THREE.Mesh(geometry, material);
        // sphere.scale.set(parent.state.width * 0.03, parent.state.height * 0.04, 1);
        sphere.position.x = 0;
        sphere.position.y = 0;
        sphere.position.z = 0;
        this.add(sphere);

        // Add self to parent's update list
        parent.addToUpdateList(this);

    }

    press() {
        // this.children[0].position.set(
        //     this.children[0].position.x, 
        //     this.children[0].position.y,
        //     this.children[0].position.z);

        this.state.upFlap = 0.3;
    
    }

    // spin() {
    //     // Add a simple twirl
    //     this.state.twirl += 6 * Math.PI;

    //     // Use timing library for more precice "bounce" animation
    //     // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
    //     // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
    //     const jumpUp = new TWEEN.Tween(this.position)
    //         .to({ y: this.position.y + 1 }, 300)
    //         .easing(TWEEN.Easing.Quadratic.Out);
    //     const fallDown = new TWEEN.Tween(this.position)
    //         .to({ y: 0 }, 300)
    //         .easing(TWEEN.Easing.Quadratic.In);

    //     // Fall down after jumping up
    //     jumpUp.onComplete(() => fallDown.start());

    //     // Start animation
    //     jumpUp.start();
    // }

    update(timeStamp) {
        this.children[0].position.set(
            this.children[0].position.x, 
            this.children[0].position.y - 0.01 + this.state.upFlap,
            this.children[0].position.z);
        this.state.upFlap = Math.max(this.state.upFlap - 0.1, 0);
    }
}

export default Bird;
