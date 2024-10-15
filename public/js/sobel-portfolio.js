import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

// specify the directory path you want to list the files of

let camera, scene, renderer, composer, pivot;
let effectSobel;

const targets = {
	additive:      1,
	welding:       2,
	vision:		   3,
	activity:      4,
	this_website:  5,
	about:         6,
	welcome:	   7
};

const files = [
	'../assets/models/headtube.stl',
	'../assets/models/welding_jig.stl',
	'../assets/models/camera.stl',
	'../assets/models/apple_watch.stl',
	'../assets/models/world.stl',
	'../assets/models/two_plus_candle.stl',
	'../assets/models/cube_twist.stl',
]

const clock = new THREE.Clock();
var currentLayer = targets.welcome;
var isRotating = true;
var switched = false;

init(targets);
loadpage(currentLayer);
animate();

function init() {

	renderer = new THREE.WebGLRenderer();
    var container = document.getElementById('portfolio-canvas');
    var w = container.offsetWidth;
    var h = container.offsetHeight;
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

	// init scene + camera

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, w/h, 0.1, 1000 );
	camera.position.set( 0, 0, 12 );
	camera.lookAt( scene.position );

	// load the models

	pivot = new THREE.Group();
	const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );

	const loader = new STLLoader();
	for ( let k = 0; k < Object.keys(targets).length; k ++ ) {
		loader.load(files[k], function ( geometry ) {
				const mesh = new THREE.Mesh( geometry, material );
				mesh.layers.set( k+1 );
				mesh.name = Object.keys(targets)[k];
				mesh.scale.set(0.5,0.5,0.5);
				pivot.add( mesh );
		});
		addMeshListeners(Object.keys(targets)[k], k+1);
	}

	scene.add( pivot )

	// scene lighting

	const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );

	// postprocessing

	composer = new EffectComposer( renderer );
	const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );

	// you might want to use a gaussian blur filter before
	// the next pass to improve the result of the Sobel operator

	// Sobel operator

	effectSobel = new ShaderPass( SobelOperatorShader );
	effectSobel.uniforms[ 'resolution' ].value.x = w * window.devicePixelRatio;
	effectSobel.uniforms[ 'resolution' ].value.y = h * window.devicePixelRatio;
	composer.addPass( effectSobel );

	// mouse events
	
	const buttonSobel = document.getElementById('portfolio-canvas');
	buttonSobel.addEventListener('mousedown', function() {isRotating = !isRotating; animate()});
	
	camera.layers.enable(currentLayer);
}

function addMeshListeners(buttonId, targetLayer) {
	const button = document.getElementById(buttonId);
	button.addEventListener('mouseover', function() {switchMesh(targetLayer); animate();});
	button.addEventListener('mouseleave', function() {switchMesh(currentLayer); animate();});
	button.addEventListener('mousedown', function() {currentLayer = targetLayer; loadpage(targets[buttonId]); animate();})
}

function loadpage(target) {
	const folder = Object.keys(targets)[target-1];
	console.log(target)
	console.log(folder)
	fetch('/portfolio/'+folder+'/index.html').then(function (response) {
		if (response.ok) {
			return response.text();
		}
		throw response;
	}).then(function (text) {
		const content = document.getElementById('project-text')
		content.innerHTML = text;
	}).catch(error => {
        console.error('Error fetching the HTML file:', error);
    });
}

function switchMesh(target) {
	camera.layers.disableAll();
	camera.layers.enable(0);
	camera.layers.enable(target);
}

function resizeCanvasToDisplaySize() {
	const canvas = renderer.domElement;
	// look up the size the canvas is being displayed
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
  
	// adjust displayBuffer size to match
	if (canvas.width !== width || canvas.height !== height) {
	  // you must pass false here or three.js sadly fights the browser
	  renderer.setSize(width, height, false);
	  camera.aspect = width / height;
	  camera.updateProjectionMatrix();
  
	  // update any render target sizes here
	}
}

function animate() {
	if (!isRotating) {
		switched = false;
		composer.render();
		return;
	};
	if (!switched) {
		var timeDelta = clock.getDelta();
		switched = true;
	};

	var timeDelta = clock.getDelta();
	timeDelta *= 0.5;

	resizeCanvasToDisplaySize();
	
	pivot.rotateY(timeDelta);
	composer.render();
	
	requestAnimationFrame( animate );
}