/// <reference path="_reference.ts"/>

/* 
MAIN GAME FILE

Source file	name:       game.ts
Author’s name:	        George Savcheko
Last modified by:       George Savchenko
Date last modified:     2016-02-03
Program	description:    Using	the	Three.js	JavaScript	Library	and	TypeScript,	create	a	web	application	that	displays	a	3D	
                        Humanoid	Character.	The	Character	will	be	composed	of	primitive	Cube	Meshes	arranged	in	a	
                        humanoid	shape.	On-Screen	Controls  will	allow	the	user	to	rotate	the	character	in	any	direction.	
                        The	user	will	be	able	to	use	the	controls	to	change	the	colour	properties	of	Cube	Materials	
                        (as	a	group).  
Revision history:       added shoes and textures

THREEJS Aliases
*/ 
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var head;
var cubeMaterial;
var cubeGeometry;
var leftLeg;
var rightLeg;
var lowerTorso;
var body;
var leftArm;
var rightArm;
var leftFoot;
var rightFoot;
var lamberMaterial;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var vertices: Vector3[] = new Array<Vector3>();
var faces: Face3[] = new Array<Face3>();
var customGeometry: Geometry;
var customMaterials: Material[] = new Array<Material>();
var customMesh: Object3D;
var texture = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('textures/texture.png') } );

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // Add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    // Add a Plane to the Scene (does not rotate with cube man)
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0x66cd00 }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
     
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // Make humanoid character composed of cubes of various sizes
    // Body (all other parts are attached to this)
    cubeGeometry = new CubeGeometry(5, 6, 1);
    cubeMaterial = new LambertMaterial({color: 0xff4c4c});
    body = new Mesh(cubeGeometry, cubeMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.y = 14;    
    
    // Head
    cubeGeometry = new CubeGeometry(3, 3, 2);
    cubeMaterial = new LambertMaterial({color: 0xfae7d0});
    head = new Mesh(cubeGeometry, cubeMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.y = 4.5;
    body.add(head);   
    
    // Left arm
    cubeGeometry = new CubeGeometry(6, 1, 1);
    cubeMaterial = new LambertMaterial({color: 0xff4c4c});
    leftArm = new Mesh(cubeGeometry, cubeMaterial);
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    leftArm.position.x = 5.5;
    leftArm.position.y = 2;
    body.add(leftArm);
    
    // Right arm
    cubeGeometry = new CubeGeometry(6, 1, 1);
    cubeMaterial = new LambertMaterial({color: 0xff4c4c});
    rightArm = new Mesh(cubeGeometry, cubeMaterial);
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    rightArm.position.x = -5.5;
    rightArm.position.y = 2;
    body.add(rightArm);

    // Lower torso
    cubeGeometry = new CubeGeometry(5, 1, 1);
    cubeMaterial = new LambertMaterial({color: 0x113572});
    lowerTorso = new Mesh(cubeGeometry, cubeMaterial);
    lowerTorso.castShadow = true;
    lowerTorso.receiveShadow = true;
    lowerTorso.position.y = -3.5;
    body.add(lowerTorso);
    
    // Left leg
    cubeGeometry = new CubeGeometry(1, 8.5, 1);
    cubeMaterial = new LambertMaterial({color: 0x113572});
    leftLeg = new Mesh(cubeGeometry, cubeMaterial);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    leftLeg.position.x = 2;
    leftLeg.position.y = -7.5;
    body.add(leftLeg);
    
    // Right leg
    cubeGeometry = new CubeGeometry(1, 8.5, 1);
    cubeMaterial = new LambertMaterial({color: 0x113572});
    rightLeg = new Mesh(cubeGeometry, cubeMaterial);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    rightLeg.position.x = -2;
    rightLeg.position.y = -7.5;
    body.add(rightLeg);
    
    // Left foot
    cubeGeometry = new CubeGeometry(1, 1, 2);
    leftFoot = new Mesh(cubeGeometry, texture);
    leftFoot.castShadow = true;
    leftFoot.receiveShadow = true;
    leftFoot.position.x = 2;
    leftFoot.position.z = 0.5;
    leftFoot.position.y = -12;
    body.add(leftFoot);
    
    // Right foot
    cubeGeometry = new CubeGeometry(1, 1, 2);
    rightFoot = new Mesh(cubeGeometry, texture);
    rightFoot.castShadow = true;
    rightFoot.receiveShadow = true;
    rightFoot.position.x = -2;
    rightFoot.position.z = 0.5;
    rightFoot.position.y = -12;
    body.add(rightFoot);  

    scene.add(body);
        
    // Add controls using DAT.GUI to allow user to rotate cube man
    gui = new GUI();
    control = new Control(0.00);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add controls to control object to allow user to rotate cube man on any axis
function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeedx',-0.5,0.5);
    gui.add(controlObject, 'rotationSpeedy',-0.5,0.5);
    gui.add(controlObject, 'rotationSpeedz',-0.5,0.5);
    gui.add(controlObject, 'changeColors');
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
    
    //set body mesh to rotate based on control panel changes
    body.rotation.x += control.rotationSpeedx;
    body.rotation.y += control.rotationSpeedy;
    body.rotation.z += control.rotationSpeedz;
    
    //set body material colours to different themes
    body.material.color = control.shirtColour;
    leftArm.material.color = control.shirtColour;
    rightArm.material.color = control.shirtColour;
    lowerTorso.material.color = control.pantsColour;
    rightLeg.material.color = control.pantsColour;
    leftLeg.material.color = control.pantsColour;

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main (perspective) camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -25;
    camera.position.y = 35;
    camera.position.z = 25;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}


