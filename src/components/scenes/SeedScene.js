import { Scene, Color } from 'three';
import * as THREE from 'three';
import { Bird, Pipe, Floor, Cloud } from 'objects';
import { BasicLights } from 'lights';
import { Flower, Icicle, Leaves } from '../objects';
import { Tree } from '../objects/Tree';
import { Shells } from '../objects/Shells';

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
            pause: false,
            season: 0,
            seasons_list: ["fall", "winter", "spring", "summer"]
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        // Pick a season
        this.state.season = Math.floor(Math.random() * 4);


        // Add essential meshes to screen - bird, floor and cloud
        const bird = new Bird(this);
        const floor = new Floor(this);
        const cloud = new Cloud(this);
        this.add(bird);
        this.add(floor);
        this.add(cloud);


        console.log(this.state.seasons_list[this.state.season]);
        // Add seasonal meshes to screen
        if (this.state.seasons_list[this.state.season] == "fall") {
            const tree = new Tree(this);
            this.add(tree);
    
            for (let i = 0; i < 5; i++) {
                var newLeaf = new Leaves(this);
                this.add(newLeaf);
            }
        }
        
        else if (this.state.seasons_list[this.state.season] == "spring") {
            for (let i = 0; i < 10; i++) {
                var newFlower = new Flower(this);
                this.add(newFlower);
            }
        } 

        else if (this.state.seasons_list[this.state.season] == "summer") {
            for (let i = 0; i < 10; i++) {
                var newShell = new Shells(this);
                this.add(newShell);
            }

        }

        else if (this.state.seasons_list[this.state.season] == "spring") {

        }
  
    
        // Add lights to the scene
        var directionalLight = new THREE.DirectionalLight(0xffffff,
                                                          0.7);
        directionalLight.position.set( 0, 
                                       10, 
                                       10); 
        directionalLight.castShadow = true;
        this.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(0xffffff,
            0.7)
        directionalLight2.position.set( 10, 
                    5, 
                    4); 
        directionalLight2.castShadow = false;
        this.add(directionalLight2);

        
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

            if (this.state.seasons_list[this.state.season] === "spring") {
                for (let i = 0; i < 10; i++) {
                    var newFlower = new Flower(this);
                    this.add(newFlower);
                }
            }

            else if (this.state.seasons_list[this.state.season] === "fall") {
                var prob = Math.random();
                if (prob < 0.3) {
                    var newTree = new Tree(this);
                    for (let i = 0; i < 5; i++) {
                        var newLeaf = new Leaves(this);
                        this.add(newLeaf);
                    }
                    this.add(newTree);
                }
            }

            else if (this.state.seasons_list[this.state.season] === "summer") {
                for (let i = 0; i < 10; i++) {
                    var newShell = new Shells(this);
                    this.add(newShell);
                }
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
            this.state.season = (this.state.season + 1) % 4;
            const bird = new Bird(this);
            const floor = new Floor(this);
            const cloud = new Cloud(this);
            this.add(bird);
            this.add(floor);
            this.add(cloud);
      
            // pick a season
            console.log(this.state.seasons_list[this.state.season]);
            // Add seasonal meshes to screen
            if (this.state.seasons_list[this.state.season] == "fall") {
                const tree = new Tree(this);
                this.add(tree);
        
                for (let i = 0; i < 5; i++) {
                    var newLeaf = new Leaves(this);
                    this.add(newLeaf);
                }
            }
            
            else if (this.state.seasons_list[this.state.season] == "spring") {
                for (let i = 0; i < 10; i++) {
                    var newFlower = new Flower(this);
                    this.add(newFlower);
                }
            } 

            else if (this.state.seasons_list[this.state.season] == "summer") {
                for (let i = 0; i < 10; i++) {
                    var newShell = new Shells(this);
                    this.add(newShell);
                }
            }

            else if (this.state.seasons_list[this.state.season] == "spring") {

            }
          
            var directionalLight = new THREE.DirectionalLight(0xffffff,
                                                                0.7);
            directionalLight.position.set( 2, 
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
