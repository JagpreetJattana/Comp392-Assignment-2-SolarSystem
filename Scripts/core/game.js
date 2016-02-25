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
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var cube1;
var sphere;
var childsphere1;
var childsphere2;
var childsphere3;
var childsphere4;
var childsphere5;
var sphereMaterial;
var sphereGeometry;
var childCube;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var cubeGeometry;
var cubeMaterial;
var emptyObject;
var emptyObject3;
var emptyObject4;
var emptyObject5;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(20, 20, 1, 1), new LambertMaterial({ color: 0x0f37ff }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //  emptyObject.add(sphere);
    // var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Scripts/textures/sun.jpg') } );
    sphere = new gameObject(new SphereGeometry(3, 32, 32), new LambertMaterial({ color: 0xff35ff }), 0, 1, 0);
    //  sphere=new gameObject(new SphereGeometry(2,32,32),new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Scripts/textures/sun.jpg') } ),0,1,0);
    childsphere1 = new gameObject(new SphereGeometry(.2, .2, .2), new LambertMaterial({ color: 0xff35ff }), 0, 1, 5);
    sphere.add(childsphere1);
    scene.add(sphere);
    emptyObject = new Object3D();
    emptyObject.position.set(0, 1, 0);
    childsphere2 = new gameObject(new SphereGeometry(1, 32, 32), new LambertMaterial({ color: 0xff35ff }), 0, 1, 10);
    emptyObject.add(childsphere2);
    scene.add(emptyObject);
    emptyObject3 = new Object3D();
    emptyObject3.position.set(0, 1, 0);
    childsphere3 = new gameObject(new SphereGeometry(.5, 32, 32), new LambertMaterial({ color: 0xff35ff }), 0, 1, 15);
    emptyObject3.add(childsphere3);
    scene.add(emptyObject3);
    emptyObject4 = new Object3D();
    emptyObject4.position.set(0, 1, 0);
    childsphere4 = new gameObject(new SphereGeometry(1.8, 32, 32), new LambertMaterial({ color: 0xff35ff }), 0, 1, 20);
    emptyObject4.add(childsphere4);
    scene.add(emptyObject4);
    emptyObject5 = new Object3D();
    emptyObject5.position.set(0, 1, 0);
    childsphere5 = new gameObject(new SphereGeometry(.8, 32, 32), new LambertMaterial({ color: 0xff35ff }), 0, 1, 25);
    emptyObject5.add(childsphere5);
    scene.add(emptyObject5);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(5.6, 23.1, 5.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
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
    sphere.rotation.y += .04; //control.rotationSpeed;
    emptyObject.rotation.y += .02; //control.rotationSpeed;
    emptyObject3.rotation.y += .03;
    emptyObject4.rotation.y += .001;
    emptyObject5.rotation.y += .005;
    // sphere.rotation.y+=2;
    camera.position = sphere.position;
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -40.5;
    camera.lookAt(new Vector3(0, 0, 0));
    // camera.lookAt(new Vector3(sphere.position.x,sphere.position.y,sphere.position.z));
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map