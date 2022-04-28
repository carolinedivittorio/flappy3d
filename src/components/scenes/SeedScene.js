import { Scene, Color } from 'three';
import { Bird, Pipe } from 'objects';
import { BasicLights } from 'lights';

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
            game_state: "waiting",
            steps: 0,
            frustum: frustum
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const pipe = new Pipe(this);
        const bird = new Bird(this);
        
        const lights = new BasicLights();
        this.add(bird, lights);
 }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
            // Call update for each object in the updateList

        if (this.state.steps > 150) {
            const newPipe = new Pipe(this);
            this.add(newPipe);
            this.state.steps = 0;
        }

        var step = this.state.game_state == "active" ? Math.pow(1.02, this.state.score) : 0;
        this.state.steps += step;

        for (const obj of this.state.updateList) {
            obj.update(timeStamp, step);
        }
    }
    press() {
        if (this.state.game_state !== "dead"){
            this.state.game_state = "active";
            this.children[0].press();
        }
    }

    isDead() {
        return this.state.game_state === "dead";
    }

    restart() {
        if (this.state.game_state === "dead") {
            this.state.updateList = [];
            this.state.score = 0;
            this.state.game_state = "waiting";
            var children = [...this.children];
            for (var i = 0; i < children.length; i++) {
                this.remove(children[i]);
            }
            const bird = new Bird(this);
            const lights = new BasicLights();
            this.add(bird, lights);
        }
    }

    kill() {
        //const gameOver = new Score(this);
        //this.add(gameOver);
        this.state.game_state = "dead";
    }
}

export default SeedScene;
