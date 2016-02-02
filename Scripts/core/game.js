/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
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
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0xffffff }), 0, 0, 0);
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
    // Call the Custom Mesh function
    initializeCustomMesh();
    // add controls
    gui = new GUI();
    control = new Control(customMesh);
    addControlPoints();
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function initializeCustomMesh() {
    vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];
    faces = [
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4),
    ];
    createCustomMesh();
    console.log("Added Custom Mesh to Scene");
}
function addControlPoints() {
    control.points.push(new Point(3, 5, 3));
    control.points.push(new Point(3, 5, 0));
    control.points.push(new Point(3, 0, 3));
    control.points.push(new Point(3, 0, 0));
    control.points.push(new Point(0, 5, 0));
    control.points.push(new Point(0, 5, 3));
    control.points.push(new Point(0, 0, 0));
    control.points.push(new Point(0, 0, 3));
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
    gui.add(controlObject, 'clone');
    for (var index = 0; index < 8; index++) {
        var folder;
        folder = gui.addFolder('Vertices ' + (index + 1));
        folder.add(controlObject.points[index], 'x', -10, 10);
        folder.add(controlObject.points[index], 'y', -10, 10);
        folder.add(controlObject.points[index], 'z', -10, 10);
    }
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
    vertices = new Array();
    for (var index = 0; index < 8; index++) {
        vertices.push(new Vector3(control.points[index].x, control.points[index].y, control.points[index].z));
    }
    // remove our customMesh from the scene and add it every frame 
    scene.remove(scene.getObjectByName("customMesh"));
    createCustomMesh();
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
    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map