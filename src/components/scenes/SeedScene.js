import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Bird, Pipe, Floor } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor(width, height, document) {
        // Call parent Scene() constructor
        super(width, height);

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            width: width,
            height: height,
            score: 0,
            document: document,
            gameState: "waiting",
            steps: 0,
            floorHeight: -2,
            ceilingHeight: 5,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const pipe = new Pipe(this);
        const bird = new Bird(this);
        const pipe = new Pipe(this);
        const floor = new Floor(this);
        const lights = new BasicLights();
        this.add(bird, pipe, floor, lights);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList

        if (this.state.steps > 150) {
            const newPipe = new Pipe(this);
            this.add(newPipe);
            this.state.steps = 0;
        }


        var step = this.state.gameState === "active" ? Math.pow(1.02, this.state.score) : 0;

        this.state.steps += step;

        for (const obj of updateList) {
            obj.update(timeStamp, step);
        }

        this.state.document.getElementById('scoreText').innerHTML = 'Score: ' + this.state.score;
    }
    press() {
        if (this.state.gameState !== "dead") {
            this.state.gameState = "active";
            this.children[0].press();
        }
        
    }

    restart() {
        if (this.state.gameState === "dead") {
            this.state.updateList = [];
            this.state.score = 0;
            this.state.gameState = "waiting";
            this.state.steps = 0;
            var children = [...this.children];
            for (var i = 0; i < children.length; i++) {
                this.remove(children[i]);
            }
            const bird = new Bird(this);
            const pipe = new Pipe(this);
            const floor = new Floor(this);
            const lights = new BasicLights();
            this.add(bird, pipe, floor, lights);
        }
    }

    isDead() {
        return this.state.gameState === "dead";
    }

    kill() {
        this.state.gameState = "dead";
    }
}

export default SeedScene;
