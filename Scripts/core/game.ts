/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
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
import CScreen = config.Screen;
import Clock = THREE.Clock;
import FirstPersonControls = THREE.FirstPersonControls;


//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var cube1: Mesh;

var sphere: Mesh;
var childsphere1: Mesh;
var childsphere2: Mesh;
var childsphere3: Mesh;
var childsphere4: Mesh;
var childsphere5: Mesh;
var childmoon: Mesh;
var sphereMaterial: LambertMaterial;
var sphereGeometry: SphereGeometry;


var childCube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var spotLight2: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry: CubeGeometry;
var cubeMaterial: LambertMaterial;

var emptyObject: Object3D;
var emptyObject3: Object3D;
var emptyObject4: Object3D;
var emptyObject5: Object3D;
var emptyObject6: Object3D;

var clock: Clock;
var firstPersonControls



function init() {

    clock = new Clock();
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
    
    //initialization of camera
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    setupCamera(); // setup the camera
    
    // setup first person controls
    firstPersonControls = new FirstPersonControls(camera);
    firstPersonControls.movementSpeed = 70;
    firstPersonControls.lookSpeed = 0.05;
    firstPersonControls.noFly = true;
    firstPersonControls.lookVertical = false;
    firstPersonControls.activeLook = false;
    firstPersonControls.lon = 180;
    firstPersonControls.lat = 0;

    firstPersonControls.phi = 0;
    firstPersonControls.theta = 0;
    
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);

    //adding sun to scene. First material is loaded
    THREE.ImageUtils.crossOrigin = 'anonymous';
    var texture = THREE.ImageUtils.loadTexture('Scripts/textures/sun.jpg');
    var material = new THREE.MeshPhongMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 0.05,

    });
    sphere = new gameObject(new SphereGeometry(2, 32, 32), material, 0, 1, 0);

    //adding first planet to solar system
    var texture1 = THREE.ImageUtils.loadTexture('Scripts/textures/planet_saturn.png');
    var material1 = new THREE.MeshPhongMaterial({
        map: texture1,
        bumpMap: texture1,
        bumpScale: 0.05,
    });
    childsphere1 = new gameObject(new SphereGeometry(.2, .2, .2), material1, 0, 1, 5);

    sphere.add(childsphere1);
    
    //adding second planet to solar system    
    emptyObject = new Object3D();
    emptyObject.position.set(0, 1, 0);
    var texture2 = THREE.ImageUtils.loadTexture('Scripts/textures/jupiter.jpg');
    var material2 = new THREE.MeshPhongMaterial({
        map: texture2,
        bumpMap: texture2,
        bumpScale: 0.05,
    });
    childsphere2 = new gameObject(new SphereGeometry(1, 32, 32), material2, 0, 1, 10);
    emptyObject.add(childsphere2);
    scene.add(emptyObject);

    //adding third planet to solar system
    emptyObject3 = new Object3D();
    emptyObject3.position.set(0, 1, 0);
    var texture3 = THREE.ImageUtils.loadTexture('Scripts/textures/mars.jpg');
    var material3 = new THREE.MeshPhongMaterial({
        map: texture3,
        bumpMap: texture3,
        bumpScale: 0.05,
    });
    childsphere3 = new gameObject(new SphereGeometry(.5, 32, 32), material3, 0, 1, 15);
    emptyObject3.add(childsphere3);
    scene.add(emptyObject3);

    //adding fourth planet to solar system
    emptyObject4 = new Object3D();
    emptyObject4.position.set(0, 1, 0);
    var texture4 = THREE.ImageUtils.loadTexture('Scripts/textures/earth.jpg');
    var material4 = new THREE.MeshPhongMaterial({
        map: texture4,
        bumpMap: texture4,
        bumpScale: 0.05,
    });
    childsphere4 = new gameObject(new SphereGeometry(1.8, 32, 32), material4, 0, 1, 18);
    emptyObject4.add(childsphere4);
    scene.add(emptyObject4);

    //adding fifth planet to solar system
    emptyObject5 = new Object3D();
    emptyObject5.position.set(0, 1, 0);
    var texture5 = THREE.ImageUtils.loadTexture('Scripts/textures/mercury.jpg');
    var material5 = new THREE.MeshPhongMaterial({
        map: texture5,
        bumpMap: texture5,
        bumpScale: 0.05,
    });
    childsphere5 = new gameObject(new SphereGeometry(.8, 32, 32), material5, 0, 1, 25);
    var texture6 = THREE.ImageUtils.loadTexture('Scripts/textures/moon.jpg');
    var material6 = new THREE.MeshPhongMaterial({
        map: texture6,
        bumpMap: texture6,
        bumpScale: 0.05,
    });
    //creating moon for fifth planet
    childmoon = new gameObject(new SphereGeometry(.4, 32, 32), material6, 0, 1, 1);

    childsphere5.add(childmoon);
    emptyObject5.add(childsphere5);
    scene.add(emptyObject5);
    

    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");

    //Add point light to scene
    var light = new THREE.PointLight(0xffffff, 2, 1000);
    light.position.set(0, 0, 0);
    light.castShadow = false;
    light.add(sphere);
    scene.add(light);

    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(0, 30, 0);
    spotLight.lookAt(new Vector3(0, 0, 0));
    spotLight.castShadow = true;
    spotLight.angle = 10 * (Math.PI / 180);
    spotLight.distance = 50;
    spotLight.intensity = 2;
    scene.add(spotLight);

    //Add another spotlight to the scene
    spotLight2 = new SpotLight(0xffffff);
    spotLight2.position.set(0, -30, 0);
    spotLight2.lookAt(new Vector3(0, 0, 0));
    spotLight2.castShadow = true;
    spotLight2.angle = 10 * (Math.PI / 180);
    spotLight2.distance = 50;
    spotLight2.intensity = 2;
    scene.add(spotLight2);
    console.log("Added a SpotLight Light to Scene");
    
 

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    
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
    var delta: number = clock.getDelta();


    sphere.rotation.y += .001;//control.rotationSpeed;
    emptyObject.rotation.y += .009;//control.rotationSpeed;
    emptyObject3.rotation.y += .009;
    emptyObject4.rotation.y += .001;
    emptyObject5.rotation.y += .005;
    childsphere5.rotation.x += .07;

    childsphere1.rotation.y += .01;
    childsphere2.rotation.y += .01;
    childsphere3.rotation.y += .01;
    childsphere4.rotation.y += .01;

    firstPersonControls.update(delta);

    camera.lookAt(new Vector3(childsphere5.position.x, childsphere5.position.y, childsphere5.position.z));

    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.setClearColor(0x000000, 0);
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {

    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -40.5;

    camera.lookAt(new Vector3(0, 0, 0));


    console.log("Finished setting up Camera...");
}
