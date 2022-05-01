import { Scene, Color } from 'three';
import * as THREE from 'three';
import { Bird, Pipe, Floor, Cloud } from 'objects';
import { BasicLights } from 'lights';
import { Flower, Icicle } from '../objects';

class SeedScene extends Scene {
    constructor(width, height, document, frustum) {
        // Call parent Scene() constructor
        super(width, height);

        // Init state
        this.state = {
            rotationSpeed: 1,
            updateList: [],
            width: width,
            height: height,
            score: 0,
            document: document,
            gameState: "waiting",
            steps: 0,
            frustum: frustum,
            floorHeight: -2,
            ceilingHeight: 5,
            pause: false
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const pipe = new Pipe(this);
        const bird = new Bird(this);
      //  const pipe = new Pipe(this);
        const floor = new Floor(this);
        // const lights = new BasicLights();
        this.add(bird);
        this.add(floor);
        for (let i = 0; i < 100; i++) {
            var newFlower = new Flower(this);
            this.add(newFlower);
        }

        const cloud = new Cloud(this);
        this.add(cloud);

        // var ambLight = new THREE.AmbientLight(0xffffff);
        // this.add(ambLight);
    
        var directionalLight = new THREE.DirectionalLight(0xffffff,
                                                          0.7);
        directionalLight.position.set( 0, 
                                       2, 
                                       4); 
        directionalLight.castShadow = true;
        this.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff,
            0.7)
        directionalLight2.position.set( 10, 
                    5, 
                    4); 
        directionalLight2.castShadow = false;
        this.add(directionalLight2);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    pause() {
        if (this.state.pause) {
            return;
        }
        this.state.pause = true;
        for (const obj of this.state.updateList) {
            obj.pause();
        }
    }

    resume() {
        if (!this.state.pause) {
            return;
        }
        this.state.pause = false;
        for (const obj of this.state.updateList) {
            obj.resume();
        }
    }

    update(timeStamp) {
            // Call update for each object in the updateList
        if (this.state.pause) {
            return;
        }
        if (this.state.steps > 2) {
            const newPipe = new Pipe(this);
            // const newPipe = new Icicle(this);
            this.add(newPipe);
            for (let i = 0; i < 100; i++) {
                var newFlower = new Flower(this);
                this.add(newFlower);
            }
            
            this.state.steps = 0;
        }


        var step = this.state.gameState === "active" ? 0.01 * Math.pow(1.035, this.state.score) : 0;

        this.state.steps += step;

        for (const obj of this.state.updateList) {
            obj.update(timeStamp, step);
        }

        this.state.document.getElementById('scoreText').innerHTML = this.state.score;
    }
    press() {
        if (this.state.gameState !== "dead"){
            this.state.gameState = "active";
            this.children[0].press();
        }
    }

    isDead() {
        return this.state.gameState === "dead";
    }

    restart() {
        if (this.state.gameState === "dead") {
            this.state.document.getElementById('deadText').hidden = true;
            this.state.document.getElementById('welcomeText').hidden = false;
            var bestScore = document.cookie==="" ? 0 : document.cookie.split('=')[1];
            this.state.document.getElementById('bestScoreText').innerHTML = 'Best: ' + bestScore;
            this.state.updateList = [];
            this.state.score = 0;
            this.state.gameState = "waiting";
            this.state.steps = 0;
            var children = [...this.children];
            for (var i = 0; i < children.length; i++) {
                this.remove(children[i]);
            }
            const bird = new Bird(this);
            //  const pipe = new Pipe(this);
            const floor = new Floor(this);
            //   const lights = new BasicLights();
            this.add(bird);
            this.add(floor);
            const cloud = new Cloud(this);
            this.add(cloud);
      
            //   var ambLight = new THREE.AmbientLight(0xffffff);
            //   this.add(ambLight);
          
            var directionalLight = new THREE.DirectionalLight(0xffffff,
                                                                0.7);
            directionalLight.position.set( 0, 
                                             2, 
                                             4); 
            directionalLight.castShadow = true;
            this.add(directionalLight);

            var directionalLight2 = new THREE.DirectionalLight(0xffffff,
                            0.7);
            directionalLight2.position.set( 10, 
                                            5, 
                                            4); 
            directionalLight2.castShadow = false;
            this.add(directionalLight2);
        }
    }

    isDead() {
        return this.state.gameState === "dead";
    }

    kill() {
        this.state.gameState = "dead";
        this.state.document.getElementById('deadText').hidden = false;
        if (this.state.document.cookie === "") {
            this.state.document.cookie = "bestScore=0";
        } else {
            if (parseInt(this.state.document.cookie.split('=')[1]) < this.state.score) {
                this.state.document.cookie = "bestScore=" + this.state.score;
            }
        }
    }
}

export default SeedScene;
