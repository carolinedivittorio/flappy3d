/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import * as THREE from 'three';

var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.rel  = 'preconnect';
link.href = 'https://fonts.googleapis.com';
head.appendChild(link);

link = document.createElement('link');
link.rel = 'preconnect';
link.href = "https://fonts.gstatic.com";
head.appendChild(link);

link = document.createElement('link');
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap";
head.appendChild(link);

// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Set up camera
camera.position.set(0, 0, 12);
camera.lookAt(new Vector3(0, 0, 0));
camera.zoom = 2;
camera.updateMatrix();
camera.updateMatrixWorld();
camera.updateProjectionMatrix();

var frustum = new THREE.Frustum();
frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));  
console.log(frustum.containsPoint(new THREE.Vector3(0, 1, 0)));
const scene = new SeedScene(960, 960 * window.innerHeight / window.innerWidth, document, frustum);

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

let pausedContainer = document.createElement('div');
pausedContainer.id = 'paused';
document.body.appendChild(pausedContainer);

var paused = false;
let pausedContent = document.createElement('div');
pausedContent.id = 'paused-content';
pausedContainer.appendChild(pausedContent);

let pausedContentText = document.createElement('div');
pausedContentText.id = 'paused-text';
pausedContent.appendChild(pausedContentText);

let pausedContentTitleText = document.createElement('h1');
pausedContentTitleText.innerText = 'PAUSED';
pausedContentText.appendChild(pausedContentTitleText);

let pausedContentDescription = document.createElement('p');
pausedContentDescription.innerHTML = 'Press the p key to unpause!';
pausedContentText.appendChild(pausedContentDescription);

var scoreText = document.createElement('div');
scoreText.style.position = 'absolute';
scoreText.style.width = 100;
scoreText.style.height = 100;
scoreText.innerHTML = '0';
scoreText.id = "scoreText";
scoreText.style.fontFamily = 'Montserrat';
scoreText.style.fontSize = "xxx-large";
scoreText.style.color = "white";
scoreText.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
 
document.body.appendChild(scoreText);

var bestScoreText = document.createElement('div');
bestScoreText.style.position = 'absolute';
bestScoreText.style.width = 100;
bestScoreText.style.height = 100;
var bestScore = document.cookie === "" ? 0 : parseInt(document.cookie.split("=")[1]);
bestScoreText.innerHTML = 'Best: ' + bestScore;
bestScoreText.id = "bestScoreText";
bestScoreText.style.fontFamily = 'Montserrat';
bestScoreText.style.fontSize = "xxx-large";
bestScoreText.style.color = "white";
bestScoreText.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
document.body.appendChild(bestScoreText);



// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

// Pause the scene
function pause() {
    paused = true;
    scene.state.pause = true;
    return true;
}

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
 
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    var scoreLeftPixels = 0.01 * window.innerWidth;
    var scoreTopPixels = 0.05 * window.innerHeight;
    scoreText.style.top = scoreTopPixels + 'px';
    scoreText.style.right = scoreLeftPixels + "px";
    bestScoreText.style.top = scoreTopPixels + 50 + 'px';
    bestScoreText.style.right = scoreLeftPixels + "px";
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

document.body.onkeyup = function(e) {
    if (e.key == ' ' && !scene.state.pause) {
        scene.press();
    } else if (e.key == 'x') {
        if (scene.isDead()) {
            scene.restart();
            document.getElementById('scoreText').innerHTML = '0';

        }
    } else if (e.key == 'p') {
        if (!paused) {
            pausedContainer.style.display = 'flex';
            console.log("PAUSE");
        } else {
            pausedContainer.style.display = 'none';
            console.log("UNPAUSE");
        }
        paused = !paused;
        scene.state.pause = !scene.state.pause;
    }
}


var welcomeBoard = document.createElement('div');
welcomeBoard.style.position = 'absolute';
welcomeBoard.style.width = 100;
welcomeBoarc.style.height = 100;
welcomeBoard.innerHTML = 'Welcome to Flappy Bird';
bestScoreText.id = "bestScoreText";
bestScoreText.style.fontFamily = 'Montserrat';
bestScoreText.style.fontSize = "xxx-large";
bestScoreText.style.color = "white";
bestScoreText.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
document.body.appendChild(bestScoreText);