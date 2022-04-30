import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './bird.gltf';
import MODELFLAPS from './birdflaps.gltf';
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
            untilFlap: 0,
            isVisible: 0,
            stopped: false
        };

        const loader = new GLTFLoader();
        loader.load(
            MODEL,
            (gltf) => {
                var model = gltf.scene;
                model.scale.set(0.08, 0.08, 0.08);
                model.rotation.y = Math.PI;
                model.rotation.z = Math.PI;
                model.rotation.y += Math.PI / 2;
                model.visible = true;
                this.add(model);
            }
        );
        loader.load(
            MODELFLAPS,
            (gltf) => {
                var model = gltf.scene;
                model.scale.set(0.08, 0.08, 0.08);
                model.rotation.y = Math.PI;
                model.rotation.z = Math.PI;
                model.rotation.y += Math.PI / 2;
                model.visible = false;
                this.add(model);
            }
        );

        // Add self to parent's update list
        parent.addToUpdateList(this);

    }

    press() {
        if (this.state.parent.state.gameState === "dead") {
            return;
        }
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
        if (this.state.stopped) {
            return;
        }
        TWEEN.update();

        if (this.state.untilFlap > 20) {
            this.state.untilFlap = 0;
            this.children[1 - this.state.isVisible].visible = true;
            this.children[this.state.isVisible].visible = false;
            this.state.isVisible = 1 - this.state.isVisible;
        }
        this.state.untilFlap++;
      //  console.log(this.position);
        if (!this.state.frustum.containsPoint(this.position)) {
            this.state.parent.kill();
        }
    }

    pause() {
        TWEEN.removeAll();
    }

    resume() {
      //  TWEEN.start();
    }

    stop() {
        this.state.stopped = true;
    }
}

export default Bird;
