import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import SNOWMAN from './snowman_finish.obj';
import MATERIAL from './snowman_finish.mtl';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './untitled.gltf';
import { Group } from 'three';
import * as THREE from 'three';

import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Snowman extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            bob: true,
            // spin: this.spin.bind(this),
            twirl: 0,
        };

        // Load object
        var scene = this;
        const loader = new GLTFLoader();

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            this.position.x = 10 + Math.random() * 2;
            this.position.y = -2;
            this.position.z = 1 - Math.random() * 3;
        });
        this.scale.set(0.5, 0.5, 0.5)

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Populate GUI
        // this.state.gui.add(this.state, 'bob');
        // this.state.gui.add(this.state, 'spin');
    }

    spin() {
        // Add a simple twirl
        this.state.twirl += 6 * Math.PI;

        // Use timing library for more precice "bounce" animation
        // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
        // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: 0 }, 300)
            .easing(TWEEN.Easing.Quadratic.In);

        // Fall down after jumping up
        jumpUp.onComplete(() => fallDown.start());

        // Start animation
        jumpUp.start();
    }

    update(timeStamp, stepSize) {
        // console.log(this.children);
        this.position.x = this.position.x - stepSize;

        // this.children[0].position.set(
        //     this.children[0].position.x - stepSize,
        //     this.children[0].position.y,
        //     this.children[0].position.z
        //     );
        // if (this.state.bob) {
        //     // Bob back and forth
        //     this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        // }
        // if (this.state.twirl > 0) {
        //     // Lazy implementation of twirl
        //     this.state.twirl -= Math.PI / 8;
        //     this.rotation.y += Math.PI / 8;
        // }

        // // Advance tween animations, if any exist
         TWEEN.update();
    }
}

export default Snowman;

