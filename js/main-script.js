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

var currentCamera


var base_geometry, mast_geometry, turntable_geometry, cabin_geometry, upper_tower_geometry, tower_peak_geometry
var jib_geometry, counter_jib_geometry, counterweight_geometry, trolley_geometry, hook_block_geometry
var upper_hook1_geometry, upper_hook2_geometry, upper_hook3_geometry, upper_hook4_geometry
var lower_hook1_geometry, lower_hook2_geometry, lower_hook3_geometry, lower_hook4_geometry
var hooktip1_geometry, hooktip2_geometry, hooktip3_geometry, hooktip4_geometry
var cable1_geometry, cable2_geometry, hook_cable_geometry

var base_material, main_material, cabin_material, trolley_material, cable_material, hook_material

var base, mast, turntable, cabin, upper_tower, tower_peak
var jib, counter_jib, counterweight, trolley, hook_block
var upper_hook1, upper_hook2, upper_hook3, upper_hook4
var lower_hook1, lower_hook2, lower_hook3, lower_hook4
var hooktip1, hooktip2, hooktip3, hooktip4
var cable1, cable2, hook_cable

var container_base_geometry, container_side1_geometry, container_side2_geometry, container_side3_geometry, container_side4_geometry
var object1_geometry, object2_geometry, object3_geometry, object4_geometry, object5_geometry

var container_base_material, container_side_material, object_material

var container_base, container_side1, container_side2, container_side3, container_side4
var object1, object2, object3, object4, object5

var upper_group, trolley_group, hook_group
var lowhook1_group, lowhook2_group, lowhook3_group, lowhook4_group

var pivot1, pivot2, pivot3, pivot4

var collision_sphere1, collision_sphere2, collision_sphere3, collision_sphere4
var collision_sphere1_geometry, collision_sphere2_geometry, collision_sphere3_geometry, collision_sphere4_geometry
var collision_sphere_material

var claw_rot

var mesh_array

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
    frontalCamera = new THREE.OrthographicCamera(-70, 70, 70, -5, 1, 200);
    frontalCamera.position.set(0, 0, 100);
    frontalCamera.lookAt(scene.position);

    lateralCamera = new THREE.OrthographicCamera(-70, 70, 70, -5, 1, 200);
    lateralCamera.position.set(100, 0, 0);
    lateralCamera.lookAt(scene.position);

    topCamera = new THREE.OrthographicCamera(-70, 70, 35, -35, 1, 200);
    topCamera.position.set(0, 100, 0);
    topCamera.lookAt(scene.position);

    fixOrtogonalCamera = new THREE.OrthographicCamera(-70, 70, 70, -10, 1, 200);
    fixOrtogonalCamera.position.set(50, 50, 50);
    fixOrtogonalCamera.lookAt(scene.position);

    fixPrespectiveCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    fixPrespectiveCamera.position.set(50, 80, 50);
    fixPrespectiveCamera.lookAt(scene.position);

    // The mobileCamera uses the turntable as the (0, 0, 0) point
    mobileCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    mobileCamera.position.set(24, -17, 0);
    mobileCamera.lookAt(new THREE.Vector3(24, -18, 0));
    
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

    //  Positions of the next obejcts might look weird
    //  That's because they're using the turntable as the (0,0,0) point
    cabin_geometry = new THREE.BoxGeometry(6, 4, 3);
    cabin= new THREE.Mesh(cabin_geometry, cabin_material);
    cabin.position.set(1, 3, 0);
    cabin.rotation.set(0, 0, 0);
    scene.add(cabin);

    upper_tower_geometry = new THREE.BoxGeometry(3, 6.5, 3);
    upper_tower = new THREE.Mesh(upper_tower_geometry, main_material);
    upper_tower.position.set(0, 8.25, 0);
    upper_tower.rotation.set(0, 0, 0);
    scene.add(upper_tower);

    tower_peak_geometry = new THREE.ConeGeometry(2.12, 3, 4);
    tower_peak = new THREE.Mesh(tower_peak_geometry, main_material);
    tower_peak.position.set(0, 13, 0);
    tower_peak.rotation.set(0, Math.PI*0.25, 0);
    scene.add(tower_peak);

    jib_geometry = new THREE.BoxGeometry(25, 1.5, 3);
    jib = new THREE.Mesh(jib_geometry, main_material);
    jib.position.set(14, 5.75, 0);
    jib.rotation.set(0, 0, 0);
    scene.add(jib);

    counter_jib_geometry = new THREE.BoxGeometry(10, 1.5, 3);
    counter_jib = new THREE.Mesh(counter_jib_geometry, main_material);
    counter_jib.position.set(-6.5, 5.75, 0);
    counter_jib.rotation.set(0, 0, 0);
    scene.add(counter_jib);
    
    counterweight_geometry = new THREE.BoxGeometry(3, 3.01, 2);
    counterweight = new THREE.Mesh(counterweight_geometry, base_material);
    counterweight.position.set(-8.25, 5, 0);
    counterweight.rotation.set(0, 0, 0);
    scene.add(counterweight);

    trolley_geometry = new THREE.BoxGeometry(2, 1, 2);
    trolley = new THREE.Mesh(trolley_geometry, trolley_material);
    trolley.position.set(24, 4.5, 0);
    trolley.rotation.set(0, 0, 0);
    scene.add(trolley);

    hook_block_geometry = new THREE.BoxGeometry(2, 2, 2);
    hook_block = new THREE.Mesh(hook_block_geometry, hook_material);
    hook_block.position.set(24, -17, 0);
    hook_block.rotation.set(0, 0, 0);
    scene.add(hook_block);

    hook_cable_geometry = new THREE.CylinderGeometry(0.25, 0.25, 20, 32);
    hook_cable = new THREE.Mesh(hook_cable_geometry, cable_material);
    hook_cable.position.set(24, -6, 0);
    hook_cable.rotation.set(0, 0, 0);
    scene.add(hook_cable);

    cable1_geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 32);
    cable1 = new THREE.Mesh(cable1_geometry, cable_material);
    cable1.position.set(-5.9, 8.3, 0);
    cable1.rotation.set(0, 0, -1.15);
    scene.add(cable1);

    cable2_geometry = new THREE.CylinderGeometry(0.25, 0.25, 15.6, 32);
    cable2 = new THREE.Mesh(cable2_geometry, cable_material);
    cable2.position.set(9, 8.3, 0);
    cable2.rotation.set(0, 0, 1.3);
    scene.add(cable2);

    upper_hook1_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook1 = new THREE.Mesh(upper_hook1_geometry, hook_material);
    upper_hook1.position.set(24, -17.75, -1.25);
    upper_hook1.rotation.set(0, 0, 0);
    scene.add(upper_hook1);

    upper_hook2_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook2 = new THREE.Mesh(upper_hook2_geometry, hook_material);
    upper_hook2.position.set(25.25, -17.75, 0);
    upper_hook2.rotation.set(0, 0, 0);
    scene.add(upper_hook2);

    upper_hook3_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook3 = new THREE.Mesh(upper_hook3_geometry, hook_material);
    upper_hook3.position.set(24, -17.75, 1.25);
    upper_hook3.rotation.set(0, 0, 0);
    scene.add(upper_hook3);

    upper_hook4_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    upper_hook4 = new THREE.Mesh(upper_hook4_geometry, hook_material);
    upper_hook4.position.set(22.75, -17.75, 0);
    upper_hook4.rotation.set(0, 0, 0);
    scene.add(upper_hook4);

    //  The lower parts of the hook use a later defined pivot as the (0, 0, 0) point
    lower_hook1_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook1 = new THREE.Mesh(lower_hook1_geometry, hook_material);
    lower_hook1.position.set(0, 0, 0);
    lower_hook1.rotation.set(0, 0, 0);
    scene.add(lower_hook1);

    lower_hook2_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook2 = new THREE.Mesh(lower_hook2_geometry, hook_material);
    lower_hook2.position.set(0, 0, 0);
    lower_hook2.rotation.set(0, 0, 0);
    scene.add(lower_hook2);

    lower_hook3_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook3 = new THREE.Mesh(lower_hook3_geometry, hook_material);
    lower_hook3.position.set(0, 0, 0);
    lower_hook3.rotation.set(0, 0, 0);
    scene.add(lower_hook3);

    lower_hook4_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    lower_hook4 = new THREE.Mesh(lower_hook4_geometry, hook_material);
    lower_hook4.position.set(0, 0, 0);
    lower_hook4.rotation.set(0, 0, 0);
    scene.add(lower_hook4);

    hooktip1_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip1 = new THREE.Mesh(hooktip1_geometry, hook_material);
    hooktip1.position.set(0, -0.5, 0);
    hooktip1.rotation.set(0, Math.PI*0.25, Math.PI);
    scene.add(hooktip1);

    hooktip2_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip2 = new THREE.Mesh(hooktip2_geometry, hook_material);
    hooktip2.position.set(0, -0.5, 0);
    hooktip2.rotation.set(0, Math.PI*0.25, Math.PI);
    scene.add(hooktip2);
    
    hooktip3_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip3 = new THREE.Mesh(hooktip3_geometry, hook_material);
    hooktip3.position.set(0, -0.5, 0);
    hooktip3.rotation.set(0, Math.PI*0.25, Math.PI);
    scene.add(hooktip3);

    hooktip4_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    hooktip4 = new THREE.Mesh(hooktip4_geometry, hook_material);
    hooktip4.position.set(0, -0.5, 0);
    hooktip4.rotation.set(0, Math.PI*0.25, Math.PI);
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
    object2.position.set(10, 5, -10);
    object2.rotation.set(0, 0, 0);
    scene.add(object2);

    object3_geometry = new THREE.IcosahedronGeometry(1.5);
    object3 = new THREE.Mesh(object3_geometry, object_material);
    object3.position.set(15, 8, 5);
    object3.rotation.set(0, 0, 0);
    scene.add(object3);

    object4_geometry = new THREE.TorusGeometry(0.9, 0.5, 16, 100);
    object4 = new THREE.Mesh(object4_geometry, object_material);
    object4.position.set(-10, 15, -5);
    object4.rotation.set(1.57, 0, 0);
    scene.add(object4);

    object5_geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
    object5 = new THREE.Mesh(object5_geometry, object_material);
    object5.position.set(6, 0.5, 30);
    object5.rotation.set(1.57, 0, 0);
    scene.add(object5);
}

function grouper() {
    'use strict';

    lowhook1_group = new THREE.Group();
    lowhook1_group.add(lower_hook1);
    lowhook1_group.add(hooktip1);
    scene.add(lowhook1_group);
    
    lowhook2_group = new THREE.Group();
    lowhook2_group.add(lower_hook2);
    lowhook2_group.add(hooktip2);
    scene.add(lowhook2_group);
    
    lowhook3_group = new THREE.Group();
    lowhook3_group.add(lower_hook3);
    lowhook3_group.add(hooktip3);
    scene.add(lowhook3_group);

    lowhook4_group = new THREE.Group();
    lowhook4_group.add(lower_hook4);
    lowhook4_group.add(hooktip4);
    scene.add(lowhook4_group);

    // Each collision_sphere serves as the 'hitboxes' of a respective lowhook
    collision_sphere_material = new THREE.MeshBasicMaterial({color: 'white'});
    collision_sphere_material.opacity = 0.25;
    collision_sphere_material.transparent = true ;

    collision_sphere1_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere1 = new THREE.Mesh(collision_sphere1_geometry, collision_sphere_material);
    collision_sphere1.position.set(0, 0, 0);
    collision_sphere1.rotation.set(0, 0, 0);
    lowhook1_group.add(collision_sphere1);

    collision_sphere2_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere2 = new THREE.Mesh(collision_sphere2_geometry, collision_sphere_material);
    collision_sphere2.position.set(0, 0, 0);
    collision_sphere2.rotation.set(0, 0, 0);
    lowhook2_group.add(collision_sphere2);

    collision_sphere3_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere3 = new THREE.Mesh(collision_sphere3_geometry, collision_sphere_material);
    collision_sphere3.position.set(0, 0, 0);
    collision_sphere3.rotation.set(0, 0, 0);
    lowhook3_group.add(collision_sphere3);

    collision_sphere4_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere4 = new THREE.Mesh(collision_sphere4_geometry, collision_sphere_material);
    collision_sphere4.position.set(0, 0, 0);
    collision_sphere4.rotation.set(0, 0, 0);
    lowhook4_group.add(collision_sphere4);

    // The pivots use the turntable as the (0, 0, 0) point
    pivot1 = new THREE.Group();
    pivot1.position.set(24, -18.5, -1.25);;
    scene.add(pivot1);
    pivot1.add(lowhook1_group);

    pivot2 = new THREE.Group();
    pivot2.position.set(25.25, -18.5, 0);
    scene.add(pivot2);
    pivot2.add(lowhook2_group);

    pivot3 = new THREE.Group();
    pivot3.position.set(24, -18.5, 1.25);
    scene.add(pivot3);
    pivot3.add(lowhook3_group);

    pivot4 = new THREE.Group();
    pivot4.position.set(22.75, -18.5, 0)
    scene.add(pivot4);
    pivot4.add(lowhook4_group);

    hook_group = new THREE.Group();
    hook_group.add(hook_block);
    hook_group.add(upper_hook1);
    hook_group.add(upper_hook2);
    hook_group.add(upper_hook3);
    hook_group.add(upper_hook4);
    hook_group.add(pivot1);
    hook_group.add(pivot2);
    hook_group.add(pivot3);
    hook_group.add(pivot4);
    scene.add(hook_group);

    trolley_group = new THREE.Group();
    trolley_group.add(hook_group);
    trolley_group.add(hook_cable);
    trolley_group.add(trolley);
    scene.add(trolley_group);

    upper_group = new THREE.Group();
    upper_group.add(trolley_group);
    upper_group.add(cabin);
    upper_group.add(jib);
    upper_group.add(counter_jib);
    upper_group.add(counterweight);
    upper_group.add(upper_tower);
    upper_group.add(tower_peak);
    upper_group.add(cable1);
    upper_group.add(cable2);
    scene.add(upper_group);
    
    turntable.add(upper_group);
    turntable.add(mobileCamera);

}

///////////////////////
/* MOVEMENT FUNCTONS */
//////////////////////
function trolley_move(direction) {
    if (direction == "out" && trolley_group.position.x <= 1) {
        trolley_group.position.x += 0.5;
        mobileCamera.position.x += 0.5;
    } else if (direction == "in" && trolley_group.position.x >= -16.5) {
        trolley_group.position.x -= 0.5;
        mobileCamera.position.x -= 0.5;
    }
}

function claw_move(direction) {
    if (direction == "up" && hook_group.position.y <= 18) {
        hook_cable.position.y += 0.25;
        hook_cable.scale.y -= 0.025;
        hook_group.position.y += 0.5;
        mobileCamera.position.y += 0.5;
    } else if (direction == "down" && hook_group.position.y >= -23) {
        hook_cable.position.y -= 0.25;
        hook_cable.scale.y += 0.025;
        hook_group.position.y -= 0.5;
        mobileCamera.position.y -= 0.5;
    }
}

function claw_grasp(action){
    if (action == "open" && claw_rot > 0) {
        pivot1.rotation.x += (Math.PI*0.01);
        pivot2.rotation.z += (Math.PI*0.01);
        pivot3.rotation.x -= (Math.PI*0.01);
        pivot4.rotation.z -= (Math.PI*0.01);
        claw_rot -= 1;
    } else if (action == "close" && claw_rot < 45) {
        pivot1.rotation.x -= (Math.PI*0.01);
        pivot2.rotation.z -= (Math.PI*0.01);
        pivot3.rotation.x += (Math.PI*0.01);
        pivot4.rotation.z += (Math.PI*0.01);
        claw_rot += 1;
    }
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
function handleCollisions(object){
    'use strict';
    
    // These are the 2 instantaneous parts, the object tp, and claw instaclose
    hook_block.add(object);
    object.position.x = 0;
    object.position.y = -1.85;
    object.position.z = 0;

    pivot1.rotation.x = -(Math.PI*0.45);
    pivot2.rotation.z = -(Math.PI*0.45);
    pivot3.rotation.x = (Math.PI*0.45);
    pivot4.rotation.z = (Math.PI*0.45);
    claw_rot = 45;


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
    grouper();

    render();
    
    currentCamera = frontalCamera;
    claw_rot = 0;
    mesh_array = [base_material, main_material, cabin_material, trolley_material, cable_material, hook_material, container_base_material, container_side_material, object_material]

    // Event listeners for keyboard input and window resize
    window.addEventListener("keydown", onKeyDown);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    renderer.render(scene, currentCamera);
    requestAnimationFrame(animate);
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: // '1'
            renderer.render(scene, frontalCamera);
            currentCamera = frontalCamera;
            break;
        case 50: // '2'
            renderer.render(scene, lateralCamera);
            currentCamera = lateralCamera;
            break;
        case 51: // '3'
            renderer.render(scene, topCamera);
            currentCamera = topCamera;
            break;
        case 52: // '4'
            renderer.render(scene, fixOrtogonalCamera);
            currentCamera = fixOrtogonalCamera;
            break;
        case 53: // '5'
            renderer.render(scene, fixPrespectiveCamera);
            currentCamera = fixPrespectiveCamera;
            break;
        case 54: // '6'
            renderer.render(scene, mobileCamera);
            currentCamera = mobileCamera;
            break;
        case 81: // 'Q(q)'
            turntable.rotateY(Math.PI*0.01);
            break;
        case 65: // 'A(a)'
            turntable.rotateY(Math.PI*-0.01);
            break;
        case 87: // 'W(w)'
            trolley_move("out");
            break;
        case 83: // 'S(s)'
            trolley_move("in");
            break;
        case 69: // 'E(e)'
            claw_move("up");
            break;
        case 68: // 'D(d)'
            claw_move("down");
            break;
        case 82: // 'R(r)'
            claw_grasp("close");
            break;
        case 70: // 'F(f)'
            claw_grasp("open");
            break;
        case 48: // '0'
            for (var i = 0; i < mesh_array.length; i++) {
                mesh_array[i].wireframe = !mesh_array[i].wireframe;
            }
            break;
    }
}

init();
animate();