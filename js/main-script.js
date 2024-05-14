import * as THREE from 'three';


//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var frontalCamera, lateralCamera, topCamera
var fixOrtogonalCamera, fixPrespectiveCamera, mobileCamera
var scene, renderer
var currentCamera

var base_material, main_material, cabin_material, trolley_material, cable_material, hook_material

var turntable, hook_block, hook_cable

var container_base_material, container_side_material, object_material

var upper_group, trolley_group, hook_group
var lowhook1_group, lowhook2_group, lowhook3_group, lowhook4_group

var pivot1, pivot2, pivot3, pivot4

var collision_sphere1, collision_sphere2, collision_sphere3, collision_sphere4
var collision_object1, collision_object2, collision_object3

var claw_rot
var mesh_array
var positions;

var geometry_type, objectPosition

var collision_object_array, collision_sphere_array
var clock = new THREE.Clock();
var delta
var next

let wireframePressed = false;

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

    var base_geometry = new THREE.BoxGeometry(10, 2, 10);
    var base = new THREE.Mesh(base_geometry, base_material);
    base.position.set(6, 1, 6);
    base.rotation.set(0, 0, 0);
    scene.add(base);

    var mast_geometry = new THREE.BoxGeometry(3, 40, 3);
    var mast = new THREE.Mesh(mast_geometry, main_material);
    mast.position.set(6, 22, 6);
    mast.rotation.set(0, 0, 0);
    scene.add(mast);

    var turntable_geometry = new THREE.BoxGeometry(2, 2, 2);
    turntable = new THREE.Mesh(turntable_geometry, main_material);
    turntable.position.set(6, 43, 6);
    turntable.rotation.set(0, 0, 0);
    scene.add(turntable);

    var cabin_geometry = new THREE.BoxGeometry(6, 4, 3);
    var cabin = new THREE.Mesh(cabin_geometry, cabin_material);
    cabin.position.set(1, 3, 0);
    cabin.rotation.set(0, 0, 0);
    scene.add(cabin);

    var upper_tower_geometry = new THREE.BoxGeometry(3, 6.5, 3);
    var upper_tower = new THREE.Mesh(upper_tower_geometry, main_material);
    upper_tower.position.set(0, 8.25, 0);
    upper_tower.rotation.set(0, 0, 0);
    scene.add(upper_tower);

    var tower_peak_geometry = new THREE.ConeGeometry(2.12, 3, 4);
    var tower_peak = new THREE.Mesh(tower_peak_geometry, main_material);
    tower_peak.position.set(0, 13, 0);
    tower_peak.rotation.set(0, Math.PI*0.25, 0);
    scene.add(tower_peak);

    var jib_geometry = new THREE.BoxGeometry(25, 1.5, 3);
    var jib = new THREE.Mesh(jib_geometry, main_material);
    jib.position.set(14, 5.75, 0);
    jib.rotation.set(0, 0, 0);
    scene.add(jib);

    var counter_jib_geometry = new THREE.BoxGeometry(10, 1.5, 3);
    var counter_jib = new THREE.Mesh(counter_jib_geometry, main_material);
    counter_jib.position.set(-6.5, 5.75, 0);
    counter_jib.rotation.set(0, 0, 0);
    scene.add(counter_jib);
    
    var counterweight_geometry = new THREE.BoxGeometry(3, 3.01, 2);
    var counterweight = new THREE.Mesh(counterweight_geometry, base_material);
    counterweight.position.set(-8.25, 5, 0);
    counterweight.rotation.set(0, 0, 0);
    scene.add(counterweight);

    var trolley_geometry = new THREE.BoxGeometry(2, 1, 2);
    var trolley = new THREE.Mesh(trolley_geometry, trolley_material);
    trolley.position.set(24, 4.5, 0);
    trolley.rotation.set(0, 0, 0);
    scene.add(trolley);

    var hook_block_geometry = new THREE.BoxGeometry(2, 2, 2);
    hook_block = new THREE.Mesh(hook_block_geometry, hook_material);
    hook_block.position.set(24, -17, 0);
    hook_block.rotation.set(0, 0, 0);
    scene.add(hook_block);

    var hook_cable_geometry = new THREE.CylinderGeometry(0.25, 0.25, 20, 32);
    hook_cable = new THREE.Mesh(hook_cable_geometry, cable_material);
    hook_cable.position.set(24, -6, 0);
    hook_cable.rotation.set(0, 0, 0);
    scene.add(hook_cable);

    var cable1_geometry = new THREE.CylinderGeometry(0.25, 0.25, 10, 32);
    var cable1 = new THREE.Mesh(cable1_geometry, cable_material);
    cable1.position.set(-5.9, 8.3, 0);
    cable1.rotation.set(0, 0, -1.15);
    scene.add(cable1);

    var cable2_geometry = new THREE.CylinderGeometry(0.25, 0.25, 15.6, 32);
    var cable2 = new THREE.Mesh(cable2_geometry, cable_material);
    cable2.position.set(9, 8.3, 0);
    cable2.rotation.set(0, 0, 1.3);
    scene.add(cable2);

    var upper_hook1_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    var upper_hook1 = new THREE.Mesh(upper_hook1_geometry, hook_material);
    upper_hook1.position.set(24, -17.75, -1.25);
    upper_hook1.rotation.set(0, 0, 0);
    scene.add(upper_hook1);

    var upper_hook2_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    var upper_hook2 = new THREE.Mesh(upper_hook2_geometry, hook_material);
    upper_hook2.position.set(25.25, -17.75, 0);
    upper_hook2.rotation.set(0, 0, 0);
    scene.add(upper_hook2);

    var upper_hook3_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    var upper_hook3 = new THREE.Mesh(upper_hook3_geometry, hook_material);
    upper_hook3.position.set(24, -17.75, 1.25);
    upper_hook3.rotation.set(0, 0, 0);
    scene.add(upper_hook3);

    var upper_hook4_geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    var upper_hook4 = new THREE.Mesh(upper_hook4_geometry, hook_material);
    upper_hook4.position.set(22.75, -17.75, 0);
    upper_hook4.rotation.set(0, 0, 0);
    scene.add(upper_hook4);

    var lower_hook1_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var lower_hook1 = new THREE.Mesh(lower_hook1_geometry, hook_material);
    lower_hook1.position.set(0, 0, 0);
    lower_hook1.rotation.set(0, 0, 0);
    scene.add(lower_hook1);

    var lower_hook2_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var lower_hook2 = new THREE.Mesh(lower_hook2_geometry, hook_material);
    lower_hook2.position.set(0, 0, 0);
    lower_hook2.rotation.set(0, 0, 0);
    scene.add(lower_hook2);

    var lower_hook3_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var lower_hook3 = new THREE.Mesh(lower_hook3_geometry, hook_material);
    lower_hook3.position.set(0, 0, 0);
    lower_hook3.rotation.set(0, 0, 0);
    scene.add(lower_hook3);

    var lower_hook4_geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var lower_hook4 = new THREE.Mesh(lower_hook4_geometry, hook_material);
    lower_hook4.position.set(0, 0, 0);
    lower_hook4.rotation.set(0, 0, 0);
    scene.add(lower_hook4);

    var hooktip1_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    var hooktip1 = new THREE.Mesh(hooktip1_geometry, hook_material);
    hooktip1.position.set(0, -0.5, 0);
    hooktip1.rotation.set(0, Math.PI*0.25, Math.PI);
    scene.add(hooktip1);

    var hooktip2_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    var hooktip2 = new THREE.Mesh(hooktip2_geometry, hook_material);
    hooktip2.position.set(0, -0.5, 0);
    hooktip2.rotation.set(0, Math.PI*0.25, Math.PI);
    scene.add(hooktip2);
    
    var hooktip3_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    var hooktip3 = new THREE.Mesh(hooktip3_geometry, hook_material);
    hooktip3.position.set(0, -0.5, 0);
    hooktip3.rotation.set(0, Math.PI*0.25, Math.PI);
    scene.add(hooktip3);

    var hooktip4_geometry = new THREE.ConeGeometry(0.33, 0.5, 4);
    var hooktip4 = new THREE.Mesh(hooktip4_geometry, hook_material);
    hooktip4.position.set(0, -0.5, 0);
    hooktip4.rotation.set(0, Math.PI*0.25, Math.PI);
    scene.add(hooktip4);

    lowhook1_group = new THREE.Group();
    lowhook1_group.add(lower_hook1);
    lowhook1_group.add(hooktip1);
    
    lowhook2_group = new THREE.Group();
    lowhook2_group.add(lower_hook2);
    lowhook2_group.add(hooktip2);
    
    lowhook3_group = new THREE.Group();
    lowhook3_group.add(lower_hook3);
    lowhook3_group.add(hooktip3);

    lowhook4_group = new THREE.Group();
    lowhook4_group.add(lower_hook4);
    lowhook4_group.add(hooktip4);

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

    trolley_group = new THREE.Group();
    trolley_group.add(hook_group);
    trolley_group.add(hook_cable);
    trolley_group.add(trolley);

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
    upper_group.add(mobileCamera)
    
    turntable.add(upper_group);
}

function createContainer(){
    'use strict';

    container_base_material = new THREE.MeshBasicMaterial({color: 'Lime'});
    container_side_material = new THREE.MeshBasicMaterial({color: 'Green'});

    var container_base_geometry = new THREE.BoxGeometry(3, 0.2, 3);
    var container_base = new THREE.Mesh(container_base_geometry, container_base_material);
    container_base.position.set(30, 0.1, 6);
    container_base.rotation.set(0, 0, 0);
    scene.add(container_base);

    var container_side1_geometry = new THREE.BoxGeometry(4, 2, 0.5);
    var container_side1 = new THREE.Mesh(container_side1_geometry, container_side_material);
    container_side1.position.set(30, 1, 7.75);
    container_side1.rotation.set(0, 0, 0);
    scene.add(container_side1);
    
    var container_side2_geometry = new THREE.BoxGeometry(0.5, 2, 4);
    var container_side2 = new THREE.Mesh(container_side2_geometry, container_side_material);
    container_side2.position.set(28.25, 1, 6);
    container_side2.rotation.set(0, 0, 0);
    scene.add(container_side2);

    var container_side3_geometry = new THREE.BoxGeometry(4, 2, 0.5);
    var container_side3 = new THREE.Mesh(container_side3_geometry, container_side_material);
    container_side3.position.set(30, 1, 4.25);
    container_side3.rotation.set(0, 0, 0);
    scene.add(container_side3);

    var container_side4_geometry = new THREE.BoxGeometry(0.5, 2, 4);
    var container_side4 = new THREE.Mesh(container_side4_geometry, container_side_material);
    container_side4.position.set(31.75, 1, 6);
    container_side4.rotation.set(0, 0, 0);
    scene.add(container_side4);

}

function createObjects() {
    'use strict';

    object_material = new THREE.MeshBasicMaterial({color: 'Turquoise'});

    var object_geometry1 = randomObjectGeometry();
    var objectPosition1 = randomObjectPosition();
    
    var object1 = new THREE.Mesh(object_geometry1, object_material);
    object1.position.copy(objectPosition1);
    object1.rotation.set(1.57, 0, 0);
    scene.add(object1);

    var object_geometry2 = randomObjectGeometry();
    var objectPosition2 = randomObjectPosition();

    var object2 = new THREE.Mesh(object_geometry2, object_material);
    object2.position.copy(objectPosition2);
    object2.rotation.set(1.57, 0, 0);
    scene.add(object2);
    
    var object_geometry3 = randomObjectGeometry();
    var objectPosition3 = randomObjectPosition();

    var object3 = new THREE.Mesh(object_geometry3, object_material);
    object3.position.copy(objectPosition3);
    object3.rotation.set(1.57, 0, 0);
    scene.add(object3);

    function randomObjectGeometry(){
        var object_geometry;
        geometry_type = Math.floor(Math.random() * 5);
        switch (geometry_type) {
            case 0:
                return object_geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            case 1:
                return object_geometry = new THREE.DodecahedronGeometry(1);
            case 2:
                return object_geometry = new THREE.IcosahedronGeometry(1);
            case 3:
                return object_geometry = new THREE.TorusGeometry(0.6, 0.3, 16, 100);
            case 4:
                return object_geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
        }
    }
    
    function randomObjectPosition() {
        do {
            objectPosition = new THREE.Vector3(
                (Math.floor(Math.random() * 19) * (Math.round(Math.random()) * 2 - 1))+8,
                0.5,
                (Math.floor(Math.random() * 19) * (Math.round(Math.random()) * 2 - 1))+8
            );
        } while (isPositionInvalid(objectPosition));

        positions.push(objectPosition);

        return objectPosition;
    }

    function isPositionInvalid(position) {
        if (position.x < 38 && position.x > 22 && position.z < 14 && position.z > -2) {
            return true;
        }
        if (position.x < 15 && position.x > -5 && position.z < 15 && position.z > -5) {
            return true;
        }
        
        for (var j = 0; j < positions.length; j++) {
            if (pythagoras(positions[j], position) < 10) { 
                return true;
            }
        }
    
        
        return false;
    }

    var collision_sphere_material = new THREE.MeshBasicMaterial({color: 'white'});
    collision_sphere_material.opacity = 0;
    collision_sphere_material.transparent = true ;

    var collision_sphere1_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere1 = new THREE.Mesh(collision_sphere1_geometry, collision_sphere_material);
    collision_sphere1.position.set(0, 0, 0);
    collision_sphere1.rotation.set(0, 0, 0);
    lowhook1_group.add(collision_sphere1);

    var collision_sphere2_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere2 = new THREE.Mesh(collision_sphere2_geometry, collision_sphere_material);
    collision_sphere2.position.set(0, 0, 0);
    collision_sphere2.rotation.set(0, 0, 0);
    lowhook2_group.add(collision_sphere2);

    var collision_sphere3_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere3 = new THREE.Mesh(collision_sphere3_geometry, collision_sphere_material);
    collision_sphere3.position.set(0, 0, 0);
    collision_sphere3.rotation.set(0, 0, 0);
    lowhook3_group.add(collision_sphere3);

    var collision_sphere4_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_sphere4 = new THREE.Mesh(collision_sphere4_geometry, collision_sphere_material);
    collision_sphere4.position.set(0, 0, 0);
    collision_sphere4.rotation.set(0, 0, 0);
    lowhook4_group.add(collision_sphere4);

    var collision_object1_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_object1 = new THREE.Mesh(collision_object1_geometry, collision_sphere_material);
    collision_object1.position.set(0, 0, 0);
    collision_object1.rotation.set(0, 0, 0);
    object1.add(collision_object1);

    var collision_object2_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_object2 = new THREE.Mesh(collision_object2_geometry, collision_sphere_material);
    collision_object2.position.set(0, 0, 0);
    collision_object2.rotation.set(0, 0, 0);
    object2.add(collision_object2);

    var collision_object3_geometry = new THREE.SphereGeometry(1, 32, 16);
    collision_object3 = new THREE.Mesh(collision_object3_geometry, collision_sphere_material);
    collision_object3.position.set(0, 0, 0);
    collision_object3.rotation.set(0, 0, 0);
    object3.add(collision_object3);
}

///////////////////////
/* MOVEMENT FUNCTONS */
///////////////////////
function trolley_move(direction) {
    if (direction == "out" && trolley_group.position.x <= 1) {
        trolley_group.position.x += 0.5;
        mobileCamera.position.x += 0.5;
    } else if (direction == "in" && trolley_group.position.x >= -14.5) {
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

    loop1:
        for(var k = 0; k < collision_sphere_array.length; k++) {
            for(var n = 0; n < collision_object_array.length; n++) {
                if(distance(collision_sphere_array[k], collision_object_array[n]) <= 2) {
                    handleCollisions(collision_object_array[n].parent);
                    break loop1;
                }
            }
        }
}

function distance(object1, object2) {
    var world1 = new THREE.Vector3();
    var world_pos1 = object1.getWorldPosition(world1);

    var world2 = new THREE.Vector3();
    var world_pos2 = object2.getWorldPosition(world2);
    
    return pythagoras(world_pos1, world_pos2);
}

function pythagoras(pos1, pos2) {
    var dx = pos1.x - pos2.x;
    var dy = pos1.y - pos2.y;
    var dz = pos1.z - pos2.z;
    
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(object){
    'use strict';
    
    unhighlightItem('q');
    unhighlightItem('a');
    unhighlightItem('w');
    unhighlightItem('s');
    unhighlightItem('e');
    unhighlightItem('d');
    unhighlightItem('r');
    unhighlightItem('f');

    hook_block.add(object);
    object.position.x = 0;
    object.position.y = -1.85;
    object.position.z = 0;


    pivot1.rotation.x = -(Math.PI*0.45);
    pivot2.rotation.z = -(Math.PI*0.45);
    pivot3.rotation.x = (Math.PI*0.45);
    pivot4.rotation.z = (Math.PI*0.45);
    claw_rot = 45;
    if (next == 0) {
        next = 1;
    }
    function move_up() {
        if (next == 1) {
            delta = clock.getDelta();
        }
        if (hook_group.position.y <= 18 && next == 1 && delta <= 0.5) {
            hook_cable.position.y += 0.25*delta*20;
            hook_cable.scale.y -= 0.025*delta*20;
            hook_group.position.y += 0.5*delta*20;
            mobileCamera.position.y += 0.5*delta*20;
        } else if (hook_group.position.y > 18 && next == 1) {
            next = 2;
        }
    }

    function move_rotate() {
        
        if (next == 2) {
            delta = clock.getDelta();
            if (turntable.rotation.y > Math.PI*2) {
                turntable.rotation.y -= Math.PI*2;
            } else if (turntable.rotation.y < -Math.PI*2) {
                turntable.rotation.y += Math.PI*2;
            }
            if (turntable.rotation.y >= 0-delta*2 && turntable.rotation.y <= 0+delta*2) {
                turntable.rotation.y = 0;
                next = 3
            } else if ((turntable.rotation.y > -Math.PI && turntable.rotation.y < 0-delta) || turntable.rotation.y > Math.PI) {
                turntable.rotation.y += (Math.PI*0.01)*delta*20;
            } else if ((turntable.rotation.y < Math.PI && turntable.rotation.y > 0+delta) || turntable.rotation.y < -Math.PI) {
                turntable.rotation.y -= (Math.PI*0.01)*delta*20;
            }
        }
        
    }
    function move_side() {
        if (next == 3) {
            delta = clock.getDelta();
        }
        if (trolley_group.position.x < 0 && next == 3 && delta <= 0.5) {
            trolley_group.position.x += 0.5*delta*20;
            mobileCamera.position.x += 0.5*delta*20;
        } else if (trolley_group.position.x >= 0 && next == 3) {
            next = 4;
        }
    }
    function move_down() {
        if (next == 4) {
            delta = clock.getDelta();
        }
        if (hook_group.position.y >= -23 && next == 4 && delta <= 0.5) {
            hook_cable.position.y -= 0.25*delta*20;
            hook_cable.scale.y += 0.025*delta*20;
            hook_group.position.y -= 0.5*delta*20;
            mobileCamera.position.y -= 0.5*delta*20;
        } else if (hook_group.position.y < -23 && next == 4) {
            next = 5;
        }
    }
    function move_end(){
        if (next == 5) {
            hook_block.remove(object);
            pivot1.rotation.x = 0;
            pivot2.rotation.z = 0;
            pivot3.rotation.x = 0;
            pivot4.rotation.z = 0;
            claw_rot = 0;
            next = 0;
        }
    }
    
    
    move_up();
    move_rotate();
    move_side();
    move_down();
    move_end();
    
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

    positions = [];


    createCrane();
    createContainer();
    createObjects();

    render();

    highlightItem('frontal');
    
    currentCamera = frontalCamera;
    claw_rot = 0;
    next = 0;
    mesh_array = [base_material, main_material, cabin_material, trolley_material, cable_material, hook_material, container_base_material, container_side_material, object_material];
    collision_object_array = [collision_object1, collision_object2, collision_object3];
    collision_sphere_array = [collision_sphere1, collision_sphere2, collision_sphere3, collision_sphere4];

    // Event listeners for keyboard input and window resize
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    checkCollisions();

    renderer.render(scene, currentCamera);
    requestAnimationFrame(animate);
}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    if (e.keyCode >= 49 && e.keyCode <= 54 && next == 0) {
        document.querySelectorAll('.item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    if (next == 0){
        switch (e.keyCode) {
            case 49: // '1'
                currentCamera = frontalCamera;
                highlightItem('frontal');
                break;
            case 50: // '2'
                currentCamera = lateralCamera;
                highlightItem('lateral');
                break;
            case 51: // '3'
                currentCamera = topCamera;
                highlightItem('topo');
                break;
            case 52: // '4'
                currentCamera = fixOrtogonalCamera;
                highlightItem('fixa-ortogonal');
                break;
            case 53: // '5'
                currentCamera = fixPrespectiveCamera;
                highlightItem('fixa-prespectiva');
                break;
            case 54: // '6'
                currentCamera = mobileCamera;
                highlightItem('movel');
                break;
            case 81: // 'Q(q)'
                turntable.rotation.y += (Math.PI*0.01);
                highlightItem('q');
                break;
            case 65: // 'A(a)'
                turntable.rotation.y -= (Math.PI*0.01);
                highlightItem('a');
                break;
            case 87: // 'W(w)'
                trolley_move("out");
                highlightItem('w');
                break;
            case 83: // 'S(s)'
                trolley_move("in");
                highlightItem('s');
                break;
            case 69: // 'E(e)'
                claw_move("up");
                highlightItem('e');
                break;
            case 68: // 'D(d)'
                claw_move("down");
                highlightItem('d');
                break;
            case 82: // 'R(r)'
                claw_grasp("close");
                highlightItem('r');
                break;
            case 70: // 'F(f)'
                claw_grasp("open");
                highlightItem('f');
                break;
            case 48: // '0'
                if (!wireframePressed) {
                    for (var i = 0; i < mesh_array.length; i++) {
                        mesh_array[i].wireframe = !mesh_array[i].wireframe;
                    }
                    if (document.getElementById('wireframe').classList.contains('active')) {
                        unhighlightItem('wireframe');
                    } else {
                        highlightItem('wireframe');
                    }
                    wireframePressed = true;
                }
                break;
        }
    }
}

function onKeyUp(e) {
    'use strict'
    if (next == 0){
        switch (e.keyCode) {
            case 48: // '0'
                wireframePressed = false;
                break;
            case 81: // 'Q(q)'
                unhighlightItem('q');
                break;
            case 65: // 'A(a)'
                unhighlightItem('a');
                break;
            case 87: // 'W(w)'
                unhighlightItem('w');
                break;
            case 83: // 'S(s)'
                unhighlightItem('s');
                break;
            case 69: // 'E(e)'
                unhighlightItem('e');
                break;
            case 68: // 'D(d)'
                unhighlightItem('d');
                break;
            case 82: // 'R(r)'
                unhighlightItem('r');
                break;
            case 70: // 'F(f)'
                unhighlightItem('f');   
                break;
        }
    }
}

function highlightItem(itemId) {
    document.getElementById(itemId).classList.add('active');
}

function unhighlightItem(itemId) {
    document.getElementById(itemId).classList.remove('active');
}

init();
animate();