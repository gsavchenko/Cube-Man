/// <reference path="_reference.ts"/>
/*
MAIN GAME FILE

Source file	name:       game.ts
Author’s name:	        George Savcheko
Last modified by:       George Savchenko
Date last modified:     2016-02-02
Program	description:    Display a cube like humanoid character
Revision history:       basic body shape added

THREEJS Aliases
*/
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var head;
var cubeMaterial;
var cubeGeometry;
var leftLeg;
var rightLeg;
var lowerTorso;
var body;
var leftArm;
var rightArm;
var lamberMaterial;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var vertices = new Array();
var faces = new Array();
var customGeometry;
var customMaterials = new Array();
var customMesh;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0x66cd00 }), 0, 0, 0);
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
    // Make cube man    
    // Body
    cubeGeometry = new CubeGeometry(5, 6, 1);
    cubeMaterial = new LambertMaterial({ color: 0xff4c4c });
    body = new Mesh(cubeGeometry, cubeMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    body.position.x = 0;
    body.position.y = 14;
    // Head
    cubeGeometry = new CubeGeometry(3, 3, 2);
    cubeMaterial = new LambertMaterial({ color: 0xfae7d0 });
    head = new Mesh(cubeGeometry, cubeMaterial);
    head.castShadow = true;
    head.receiveShadow = true;
    head.position.x = 0;
    head.position.y = 4.5;
    body.add(head);
    // Left arm
    cubeGeometry = new CubeGeometry(6, 1, 1);
    cubeMaterial = new LambertMaterial({ color: 0xff4c4c });
    leftArm = new Mesh(cubeGeometry, cubeMaterial);
    leftArm.castShadow = true;
    leftArm.receiveShadow = true;
    leftArm.position.x = 5.5;
    leftArm.position.y = 2;
    body.add(leftArm);
    // Right arm
    cubeGeometry = new CubeGeometry(6, 1, 1);
    cubeMaterial = new LambertMaterial({ color: 0xff4c4c });
    rightArm = new Mesh(cubeGeometry, cubeMaterial);
    rightArm.castShadow = true;
    rightArm.receiveShadow = true;
    rightArm.position.x = -5.5;
    rightArm.position.y = 2;
    body.add(rightArm);
    // Lower torso
    cubeGeometry = new CubeGeometry(5, 1, 1);
    cubeMaterial = new LambertMaterial({ color: 0x113572 });
    lowerTorso = new Mesh(cubeGeometry, cubeMaterial);
    lowerTorso.castShadow = true;
    lowerTorso.receiveShadow = true;
    lowerTorso.position.x = 0;
    lowerTorso.position.y = -3.5;
    body.add(lowerTorso);
    // Left leg
    cubeGeometry = new CubeGeometry(1, 10, 1);
    cubeMaterial = new LambertMaterial({ color: 0x113572 });
    leftLeg = new Mesh(cubeGeometry, cubeMaterial);
    leftLeg.castShadow = true;
    leftLeg.receiveShadow = true;
    leftLeg.position.x = 2;
    leftLeg.position.y = -8;
    body.add(leftLeg);
    // Right leg
    cubeGeometry = new CubeGeometry(1, 10, 1);
    cubeMaterial = new LambertMaterial({ color: 0x113572 });
    rightLeg = new Mesh(cubeGeometry, cubeMaterial);
    rightLeg.castShadow = true;
    rightLeg.receiveShadow = true;
    rightLeg.position.x = -2;
    rightLeg.position.y = -8;
    body.add(rightLeg);
    scene.add(body);
    // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function createCustomMesh() {
    customGeometry = new Geometry();
    customGeometry.vertices = vertices;
    customGeometry.faces = faces;
    customGeometry.mergeVertices();
    customGeometry.computeFaceNormals();
    customMaterials = [
        new LambertMaterial({ opacity: 0.6, color: 0x44ff44, transparent: true }),
        new MeshBasicMaterial({ color: 0x000000, wireframe: true })
    ];
    customMesh = THREE.SceneUtils.createMultiMaterialObject(customGeometry, customMaterials);
    customMesh.children.forEach(function (child) {
        child.castShadow = true;
    });
    customMesh.name = "customMesh";
    scene.add(customMesh);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
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
function gameLoop() {
    stats.update();
    body.rotation.y += control.rotationSpeed;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -25;
    camera.position.y = 35;
    camera.position.z = 25;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map