import { Scene, Color } from 'three';
import * as THREE from 'three';
import { Bird, Pipe, Floor } from 'objects';
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
            gameState: "waiting",
            steps: 0,
            frustum: frustum,
            floorHeight: -2,
            ceilingHeight: 5,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const pipe = new Pipe(this);
        const bird = new Bird(this);
      //  const pipe = new Pipe(this);
        const floor = new Floor(this);
        const lights = new BasicLights();
        this.add(bird);
        this.add(floor);

        var ambLight = new THREE.AmbientLight(0xffffff);
        this.add(ambLight);
    
        // var directionalLight = new THREE.DirectionalLight(0xffffff,
        //                                                   0.3);
        // directionalLight.position.set(0, 2, 4); 
        // directionalLight.castShadow = true;
        // this.add(directionalLight);

        const spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 500, 1000, 100 );

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        this.add( spotLight );

        const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
this.add(cameraHelper);
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


        var step = this.state.gameState === "active" ? Math.pow(1.02, this.state.score) : 0;

        this.state.steps += step;

        for (const obj of this.state.updateList) {
            obj.update(timeStamp, step);
        }

        this.state.document.getElementById('scoreText').innerHTML = 'Score: ' + this.state.score;
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
              const lights = new BasicLights();
              this.add(bird);
              this.add(floor);
      
              var ambLight = new THREE.AmbientLight(0xffffff);
              this.add(ambLight);
          
//               var directionalLight = new THREE.DirectionalLight(0xffffff,
//                 0.3);
// directionalLight.position.set(0, 2, 4); 
// directionalLight.castShadow = true;
// this.add(directionalLight);

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 500, 1000, 100 );

spotLight.castShadow = true;
spotLight.shadowDarkness = 0.5;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;

this.add( spotLight );

const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
this.add(cameraHelper);
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
