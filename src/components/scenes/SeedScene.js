import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Bird, Pipe } from 'objects';
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
            game_state: "waiting",
            steps: 0,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const pipe = new Pipe(this);
        const bird = new Bird(this);
        const pipe = new Pipe(this);
        const lights = new BasicLights();
        this.add(bird, pipe, lights);

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

        var step = this.state.game_state == "active" ? Math.pow(1.02, this.state.score) : 0;
        this.state.steps += step;

        for (const obj of updateList) {
            obj.update(timeStamp, step);
        }
    }
    press() {
        this.children[0].press();
    }
}

export default SeedScene;
