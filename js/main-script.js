import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var frontalCamera, lateralCamera, topCamera
var fixOrtogonalCamera, fixPrespectiveCamera, mobileCamera
var scene, renderer


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfedcba);
    scene.add(new THREE.AxesHelper(10)); 

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras(){
    'use strict';
    frontalCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 100);
    frontalCamera.position.set(0, 0, 10);
    frontalCamera.lookAt(scene.position);

    lateralCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 100);
    lateralCamera.position.set(10, 0, 0);
    lateralCamera.lookAt(scene.position);

    topCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 100);
    topCamera.position.set(0, 10, 0);
    topCamera.lookAt(scene.position);

    fixOrtogonalCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 1, 100);
    fixOrtogonalCamera.position.set(10, 10, 10);
    fixOrtogonalCamera.lookAt(scene.position);

    fixPrespectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    fixPrespectiveCamera.position.set(50, 50, 50);
    fixPrespectiveCamera.lookAt(scene.position);

    mobileCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    mobileCamera.position.set(0, 20, 0);
    mobileCamera.lookAt(new THREE.Vector3(0, 0, 0));
}


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, frontalCamera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    
    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create scene and cameras
    createScene();
    createCameras();

    render()

    // Event listeners for keyboard input and window resize
    window.addEventListener("keydown", onKeyDown);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: // '1'
            renderer.render(scene, frontalCamera);
            break;
        case 50: // '2'
            renderer.render(scene, lateralCamera);
            break;
        case 51: // '3'
            renderer.render(scene, topCamera);
            break;
        case 52: // '4'
            renderer.render(scene, fixOrtogonalCamera);
            break;
        case 53: // '5'
            renderer.render(scene, fixPrespectiveCamera);
            break;
        case 54: // '6'
            renderer.render(scene, mobileCamera);
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();