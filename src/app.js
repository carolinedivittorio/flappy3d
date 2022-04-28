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

// Initialize core ThreeJS components
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Set up camera
camera.position.set(0, 0, 12);
camera.lookAt(new Vector3(0, 0, 0));
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

var scoreText = document.createElement('div');
scoreText.style.position = 'absolute';
scoreText.style.width = 100;
scoreText.style.height = 100;
scoreText.innerHTML = 'Score: 0';
scoreText.style.top = 0.09 * window.innerHeight + 'px';
scoreText.style.left = 0.86 * window.innerWidth + 'px';
scoreText.id = "scoreText";
document.body.appendChild(scoreText);

var bestScoreText = document.createElement('div');
bestScoreText.style.position = 'absolute';
bestScoreText.style.width = 100;
bestScoreText.style.height = 100;
var bestScore = document.cookie === "" ? 0 : parseInt(document.cookie.split("=")[1]);
bestScoreText.innerHTML = 'Best: ' + bestScore;
bestScoreText.style.top = 0.13 * window.innerHeight + 'px';
bestScoreText.style.left = 0.86 * window.innerWidth + 'px';
bestScoreText.id = "bestScoreText";
document.body.appendChild(bestScoreText);



// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();

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
    scoreText.style.top = 0.09 * window.innerHeight + 'px';
    scoreText.style.left = 0.86 * window.innerWidth + 'px';
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

document.body.onkeyup = function(e) {
    if (e.key == ' ') {
        scene.press();
    } else if (e.key == 'x') {
        if (scene.isDead()) {
            scene.restart();
            document.getElementById('scoreText').innerHTML = 'Score: 0';

        }
    }


}
