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
            tweenCount: 0,
            frustum: parent.state.frustum,
            parent: parent,
            upFlap: 0,
        };

        const geometry = new THREE.SphereGeometry(0.1, 32, 16);
        const material = new THREE.MeshBasicMaterial({color:0xAA4A44});
        const sphere = new THREE.Mesh(geometry, material);
        this.add(sphere);

        // Add self to parent's update list
        parent.addToUpdateList(this);

    }

    press() {
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: -this.state.height / 100   }, 1100)
            .easing(TWEEN.Easing.Quadratic.In);
        jumpUp.onStart(() => this.state.tweenCount++);
        jumpUp.onComplete(() => {this.state.tweenCount--; if (this.state.tweenCount === 0) fallDown.start();});
        // Start animation
        jumpUp.start();
    }

    update(timeStamp) {
        if (this.state.parent.state.gameState !== "active") {
            return;
        }
        TWEEN.update();
        if (!this.state.frustum.containsPoint(this.position)) {
            this.state.parent.kill();
        }
    }
}

export default Bird;
