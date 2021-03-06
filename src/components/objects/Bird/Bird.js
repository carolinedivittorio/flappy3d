import { Group } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import OBJFLAPS from './birdFlaps.obj';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import FLAPSMTL from './birdFlaps.mtl';
import * as THREE from 'three';
import OBJ from './bird.obj';

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
            stopped: false,
            floorHeight: parent.state.floorHeight
        };

        var scene = this;

        var mtlLoader = new MTLLoader();
        mtlLoader.load(FLAPSMTL, function(materials) {
            materials.preload();
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(OBJ, function(model) {
                model.scale.set(0.08, 0.08, 0.08);
                model.rotation.y = Math.PI;
                model.rotation.z = Math.PI;
                model.rotation.y += Math.PI / 2;
                model.visible = true;
                model.castShadow = true;
                scene.add(model);
            });
            objLoader.load(OBJFLAPS, function(model) {
                model.scale.set(0.08, 0.08, 0.08);
                model.rotation.y = Math.PI;
                model.rotation.z = Math.PI;
                model.rotation.y += Math.PI / 2;
                model.visible = false;
                model.castShadow = true;
                scene.add(model);
            });
        });

        this.castShadow = true;
        this.receiveShadow = true;
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
        const jumpAround = new TWEEN.Tween(this.rotation)
            .to({z : Math.PI * 1/8}, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: this.state.floorHeight   }, 700)
            .easing(TWEEN.Easing.Quadratic.In);
        const fallOver = new TWEEN.Tween(this.rotation)
            .to({z: -Math.PI * 1 / 8}, 300)
            .easing(TWEEN.Easing.Quadratic.In);
        jumpUp.onStart(() => {this.state.tweenCount++; if (this.state.tweenCount === 1) jumpAround.start();});
        jumpUp.onComplete(() => {this.state.tweenCount--; if (this.state.tweenCount === 0) {fallOver.start(); fallDown.start();}});
        // Start animation
        jumpUp.start();
    }

    update(timeStamp) {
        if (this.state.stopped) {
            return;
        }
        TWEEN.update();
        var box = new THREE.Box3().setFromObject(this);
        if (box.min.y <= this.state.floorHeight) {
            this.state.parent.kill();
        }
        if (this.state.untilFlap > 20) {
            this.state.untilFlap = 0;
            this.children[1 - this.state.isVisible].visible = true;
            this.children[this.state.isVisible].visible = false;
            this.state.isVisible = 1 - this.state.isVisible;
        }
        this.state.untilFlap++;

        if (!this.state.frustum.containsPoint(this.position)) {
            this.state.parent.kill();
        }
    }

    stop() {
        this.state.stopped = true;
    }
}

export default Bird;
