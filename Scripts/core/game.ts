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


//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var cube1:Mesh;

var sphere:Mesh;
var childsphere1:Mesh;
var childsphere2:Mesh;
var childsphere3:Mesh;
var childsphere4:Mesh;
var childsphere5:Mesh;
var sphereMaterial:LambertMaterial;
var sphereGeometry:SphereGeometry;

var childCube:Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry:CubeGeometry;
var cubeMaterial:LambertMaterial;
var emptyObject:Object3D;
var emptyObject3:Object3D;
var emptyObject4:Object3D;
var emptyObject5:Object3D;



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
    plane = new gameObject(
        new PlaneGeometry(20, 20, 1, 1),
        new LambertMaterial({ color: 0x0f37ff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
  
    
  //  emptyObject.add(sphere);
 // var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Scripts/textures/sun.jpg') } );
    sphere=new gameObject(new SphereGeometry(3,32,32),new LambertMaterial({color:0xff35ff}),0,1,0);
  //  sphere=new gameObject(new SphereGeometry(2,32,32),new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('Scripts/textures/sun.jpg') } ),0,1,0);
    childsphere1=new gameObject(new SphereGeometry(.2,.2,.2),new LambertMaterial({color:0xff35ff}),0,1,5);
    sphere.add(childsphere1);
    scene.add(sphere);
    
    emptyObject=new Object3D();
    emptyObject.position.set(0,1,0);
    childsphere2=new gameObject(new SphereGeometry(1,32,32),new LambertMaterial({color:0xff35ff}),0,1,10);
    emptyObject.add(childsphere2);
    scene.add(emptyObject);
    
    
    emptyObject3=new Object3D();
    emptyObject3.position.set(0,1,0);
    childsphere3=new gameObject(new SphereGeometry(.5,32,32),new LambertMaterial({color:0xff35ff}),0,1,15);
    emptyObject3.add(childsphere3);
    scene.add(emptyObject3);
    
    
    emptyObject4=new Object3D();
    emptyObject4.position.set(0,1,0);
    childsphere4=new gameObject(new SphereGeometry(1.8,32,32),new LambertMaterial({color:0xff35ff}),0,1,20);
    emptyObject4.add(childsphere4);
    scene.add(emptyObject4);
    
    
    emptyObject5=new Object3D();
    emptyObject5.position.set(0,1,0);
    childsphere5=new gameObject(new SphereGeometry(.8,32,32),new LambertMaterial({color:0xff35ff}),0,1,25);
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



function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed',-0.5,0.5);
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

    sphere.rotation.y += .04;//control.rotationSpeed;
    emptyObject.rotation.y+=.02;//control.rotationSpeed;
    emptyObject3.rotation.y+=.03;
    emptyObject4.rotation.y+=.001;
    emptyObject5.rotation.y+=.005;
   // sphere.rotation.y+=2;
    
    camera.position=sphere.position;
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -40.5;
    camera.lookAt(new Vector3(0, 0, 0));
    // camera.lookAt(new Vector3(sphere.position.x,sphere.position.y,sphere.position.z));
    console.log("Finished setting up Camera...");
}
