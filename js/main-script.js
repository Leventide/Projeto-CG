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


var base_geometry, mast_geometry, turntable_geometry, cabin_geometry, upper_tower_geometry, tower_peak_geometry
var jib_geometry, counter_jib_geometry, counterweight_geometry, trolley_geometry, crane_block_geometry
var upper_hook1_geometry, upper_hook2_geometry, upper_hook3_geometry, upper_hook4_geometry
var lower_hook1_geometry, lower_hook2_geometry, lower_hook3_geometry, lower_hook4_geometry
var hooktip1_geometry, hooktip2_geometry, hooktip3_geometry, hooktip4_geometry
var cable1_geometry, cable2_geometry, crane_cable_geometry

var base_material, main_material, cabin_material, trolley_material, cable_material, hook_material

var base, mast, turntable, cabin, upper_tower, tower_peak
var jib, counter_jib, counterweight, trolley, crane_block
var upper_hook1, upper_hook2, upper_hook3, upper_hook4
var lower_hook1, lower_hook2, lower_hook3, lower_hook4
var hooktip1, hooktip2, hooktip3, hooktip4
var cable1, cable2, crane_cable

var container_base_geometry, container_side1_geometry, container_side2_geometry, container_side3_geometry, container_side4_geometry
var object1_geometry, object2_geometry, object3_geometry, object4_geometry, object5_geometry

var container_base_material, container_side_material, object_material

var container_base, container_side1, container_side2, container_side3, container_side4
var object1, object2, object3, object4, object5

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
    frontalCamera = new THREE.OrthographicCamera(-70, 70, 70, -5, 1, 100);
    frontalCamera.position.set(0, 0, 100);
    frontalCamera.lookAt(scene.position);

    lateralCamera = new THREE.OrthographicCamera(-70, 70, 70, -5, 1, 100);
    lateralCamera.position.set(100, 0, 0);
    lateralCamera.lookAt(scene.position);

    topCamera = new THREE.OrthographicCamera(-70, 70, 35, -35, 1, 100);
    topCamera.position.set(0, 100, 0);
    topCamera.lookAt(scene.position);

    fixOrtogonalCamera = new THREE.OrthographicCamera(-70, 70, 70, -10, 1, 100);
    fixOrtogonalCamera.position.set(50, 50, 50);
    fixOrtogonalCamera.lookAt(scene.position);

    fixPrespectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    fixPrespectiveCamera.position.set(50, 80, 50);
    fixPrespectiveCamera.lookAt(scene.position);

    mobileCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    mobileCamera.position.set(30, 30, 6);
    mobileCamera.lookAt(new THREE.Vector3(30, 0, 6));
}


////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createCrane(){
    'use strict';

    base_material = new THREE.MeshBasicMaterial({color: 'Gray'});
    main_material = new THREE.MeshBasicMaterial({color: 'Yellow'});
    cabin_material = new THREE.MeshBasicMaterial({color: 'White'});
    trolley_material = new THREE.MeshBasicMaterial({color: 'Blue'});
    cable_material = new THREE.MeshBasicMaterial({color: 'Silver'});
    hook_material = new THREE.MeshBasicMaterial({color: 'Black'});

    base_geometry = new THREE.BoxGeometry(10, 2, 10);
    base = new THREE.Mesh(base_geometry, base_material);
    base.position.set(6, 1, 6);
    base.rotation.set(0, 0, 0);
    scene.add(base);

    mast_geometry = new THREE.BoxGeometry(3, 40, 3);
    mast = new THREE.Mesh(mast_geometry, main_material);
    mast.position.set(6, 22, 6);
    mast.rotation.set(0, 0, 0);
    scene.add(mast);

    turntable_geometry = new THREE.BoxGeometry(2, 2, 2);
    turntable = new THREE.Mesh(turntable_geometry, main_material);
    turntable.position.set(6, 43, 6);
    turntable.rotation.set(0, 0, 0);
    scene.add(turntable);

    cabin_geometry = new THREE.BoxGeometry(6, 4, 3);
    cabin= new THREE.Mesh(cabin_geometry, cabin_material);
    cabin.position.set(7, 46, 6);
    cabin.rotation.set(0, 0, 0);
    scene.add(cabin);

    upper_tower_geometry = new THREE.BoxGeometry(3, 6.5, 3);
    upper_tower = new THREE.Mesh(upper_tower_geometry, main_material);
    upper_tower.position.set(6, 51.25, 6);
    upper_tower.rotation.set(0, 0, 0);
    scene.add(upper_tower);

    tower_peak_geometry = new THREE.ConeGeometry(2.12, 3, 4);
    tower_peak = new THREE.Mesh(tower_peak_geometry, main_material);
    tower_peak.position.set(6, 56, 6);
    tower_peak.rotation.set(0, 0.79, 0);
    scene.add(tower_peak);

    jib_geometry = new THREE.BoxGeometry(25, 1.5, 3);
    jib = new THREE.Mesh(jib_geometry, main_material);
    jib.position.set(20, 48.75, 6);
    jib.rotation.set(0, 0, 0);
    scene.add(jib);

    counter_jib_geometry = new THREE.BoxGeometry(10, 1.5, 3);
    counter_jib = new THREE.Mesh(counter_jib_geometry, main_material);
    counter_jib.position.set(-0.5, 48.75, 6);
    counter_jib.rotation.set(0, 0, 0);
    scene.add(counter_jib);
    
    counterweight_geometry = new THREE.BoxGeometry(3, 3.01, 2);
    counterweight = new THREE.Mesh(counterweight_geometry, base_material);
    counterweight.position.set(-2.25, 48, 6);
    counterweight.rotation.set(0, 0, 0);
    scene.add(counterweight);

    trolley_geometry = new THREE.BoxGeometry(2, 1, 2);
    trolley = new THREE.Mesh(trolley_geometry, trolley_material);
    trolley.position.set(30, 47.5, 6);
    trolley.rotation.set(0, 0, 0);
    scene.add(trolley);

    crane_block_geometry = new THREE.BoxGeometry(2, 2, 2);
    crane_block = new THREE.Mesh(crane_block_geometry, hook_material);
    crane_block.position.set(30, 30, 6);
    crane_block.rotation.set(0, 0, 0);
    scene.add(crane_block);

    crane_cable_geometry = new THREE.CylinderGeometry(0.25, 0.25, 16, 32);
    crane_cable = new THREE.Mesh(crane_cable_geometry, cable_material);
    crane_cable.position.set(30, 39, 6);
    crane_cable.rotation.set(0, 0, 0);
    scene.add(crane_cable);

    cable1_geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 32);
    cable1 = new THREE.Mesh(cable1_geometry, cable_material);
    cable1.position.set(0.1, 51.3, 6);
    cable1.rotation.set(0, 0, -1.15);
    scene.add(cable1);

    cable2_geometry = new THREE.CylinderGeometry(0.25, 0.25, 15.6, 32);
    cable2 = new THREE.Mesh(cable2_geometry, cable_material);
    cable2.position.set(15, 51.3, 6);
    cable2.rotation.set(0, 0, 1.3);
    scene.add(cable2);

    upper_hook1_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook1 = new THREE.Mesh(upper_hook1_geometry, hook_material);
    upper_hook1.position.set(30, 29.25, 4.75);
    upper_hook1.rotation.set(0, 0, 0);
    scene.add(upper_hook1);

    upper_hook2_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook2 = new THREE.Mesh(upper_hook2_geometry, hook_material);
    upper_hook2.position.set(31.25, 29.25, 6);
    upper_hook2.rotation.set(0, 0, 0);
    scene.add(upper_hook2);

    upper_hook3_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook3 = new THREE.Mesh(upper_hook3_geometry, hook_material);
    upper_hook3.position.set(30, 29.25, 7.25);
    upper_hook3.rotation.set(0, 0, 0);
    scene.add(upper_hook3);

    upper_hook4_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook4 = new THREE.Mesh(upper_hook4_geometry, hook_material);
    upper_hook4.position.set(28.75, 29.25, 6);
    upper_hook4.rotation.set(0, 0, 0);
    scene.add(upper_hook4);

    lower_hook1_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook1 = new THREE.Mesh(lower_hook1_geometry, hook_material);
    lower_hook1.position.set(30, 28.5, 4.75);
    lower_hook1.rotation.set(0, 0, 0);
    scene.add(lower_hook1);

    lower_hook2_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook2 = new THREE.Mesh(lower_hook2_geometry, hook_material);
    lower_hook2.position.set(31.25, 28.5, 6);
    lower_hook2.rotation.set(0, 0, 0);
    scene.add(lower_hook2);

    lower_hook3_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook3 = new THREE.Mesh(lower_hook3_geometry, hook_material);
    lower_hook3.position.set(30, 28.5, 7.25);
    lower_hook3.rotation.set(0, 0, 0);
    scene.add(lower_hook3);

    lower_hook4_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook4 = new THREE.Mesh(lower_hook4_geometry, hook_material);
    lower_hook4.position.set(28.75, 28.5, 6);
    lower_hook4.rotation.set(0, 0, 0);
    scene.add(lower_hook4);

    hooktip1_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip1 = new THREE.Mesh(hooktip1_geometry, hook_material);
    hooktip1.position.set(30, 28, 4.75);
    hooktip1.rotation.set(0, 0.79, 3.14);
    scene.add(hooktip1);

    hooktip2_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip2 = new THREE.Mesh(hooktip2_geometry, hook_material);
    hooktip2.position.set(31.25, 28, 6);
    hooktip2.rotation.set(0, 0.79, 3.14);
    scene.add(hooktip2);
    
    hooktip3_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip3 = new THREE.Mesh(hooktip3_geometry, hook_material);
    hooktip3.position.set(30, 28, 7.25);
    hooktip3.rotation.set(0, 0.79, 3.14);
    scene.add(hooktip3);

    hooktip4_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip4 = new THREE.Mesh(hooktip4_geometry, hook_material);
    hooktip4.position.set(28.75, 28, 6);
    hooktip4.rotation.set(0, 0.79, 3.14);
    scene.add(hooktip4);
}

function createContainer(){
    'use strict';

    container_base_material = new THREE.MeshBasicMaterial({color: 'Lime'});
    container_side_material = new THREE.MeshBasicMaterial({color: 'Green'});

    container_base_geometry = new THREE.BoxGeometry(3, 0.2, 3);
    container_base = new THREE.Mesh(container_base_geometry, container_base_material);
    container_base.position.set(30, 0.1, 6);
    container_base.rotation.set(0, 0, 0);
    scene.add(container_base);

    container_side1_geometry = new THREE.BoxGeometry(4, 2, 0.5);
    container_side1 = new THREE.Mesh(container_side1_geometry, container_side_material);
    container_side1.position.set(30, 1, 7.75);
    container_side1.rotation.set(0, 0, 0);
    scene.add(container_side1);
    
    container_side2_geometry = new THREE.BoxGeometry(0.5, 2, 4);
    container_side2 = new THREE.Mesh(container_side2_geometry, container_side_material);
    container_side2.position.set(28.25, 1, 6);
    container_side2.rotation.set(0, 0, 0);
    scene.add(container_side2);

    container_side3_geometry = new THREE.BoxGeometry(4, 2, 0.5);
    container_side3 = new THREE.Mesh(container_side3_geometry, container_side_material);
    container_side3.position.set(30, 1, 4.25);
    container_side3.rotation.set(0, 0, 0);
    scene.add(container_side3);

    container_side4_geometry = new THREE.BoxGeometry(0.5, 2, 4);
    container_side4 = new THREE.Mesh(container_side4_geometry, container_side_material);
    container_side4.position.set(31.75, 1, 6);
    container_side4.rotation.set(0, 0, 0);
    scene.add(container_side4);

}

function createObjects() {
    'use strict';

    object_material = new THREE.MeshBasicMaterial({color: 'Turquoise'});

    object1_geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    object1 = new THREE.Mesh(object1_geometry, object_material);
    object1.position.set(20, 0.5, 20);
    object1.rotation.set(0, 0, 0);
    scene.add(object1);

    object2_geometry = new THREE.DodecahedronGeometry(1);
    object2 = new THREE.Mesh(object2_geometry, object_material);
    object2.position.set(15, 5, 1);
    object2.rotation.set(0, 0, 0);
    scene.add(object2);

    object3_geometry = new THREE.IcosahedronGeometry(1.5);
    object3 = new THREE.Mesh(object3_geometry, object_material);
    object3.position.set(40, 3, 5);
    object3.rotation.set(0, 0, 0);
    scene.add(object3);

    object4_geometry = new THREE.TorusGeometry(0.9, 0.5, 16, 100);
    object4 = new THREE.Mesh(object4_geometry, object_material);
    object4.position.set(-10, 1, 5);
    object4.rotation.set(1.57, 0, 0);
    scene.add(object4);

    object5_geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
    object5 = new THREE.Mesh(object5_geometry, object_material);
    object5.position.set(6, 0.5, 30);
    object5.rotation.set(1.57, 0, 0);
    scene.add(object5);
}

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


    createCrane();
    createContainer();
    createObjects();

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