import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';

// import { STLLoader } from './three/examples/jsm/loaders/STLLoader.js';

// specify the directory path you want to list the files of

let camera, scene, renderer, composer, pivot;
let effectSobel;

let isRotating = localStorage.getItem('isRotating') === 'true'

const clock = new THREE.Clock();
var switched = false;

init();
animate();

function init() {

	renderer = new THREE.WebGLRenderer();
    var container = document.getElementById('my-canvas');
    var w = container.offsetWidth;
    var h = container.offsetHeight;
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

	// init scene + camera

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, w/h, 0.1, 1000 );
	camera.position.set( 0, 0, 10 );
	camera.lookAt( scene.position );

	// load the models

	pivot = new THREE.Group();
	const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );	
	const geometry = new THREE.TorusKnotGeometry( 7, 3, 300, 32, 1, 3 );
	const mesh = new THREE.Mesh( geometry, material );
	pivot.add( mesh )
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

	// Removed resize function since the div should not be changing size
	window.addEventListener( 'resize', onWindowResize );

	// mouse events
	
	const buttonSobel = document.getElementById('my-canvas');
	buttonSobel.addEventListener('mousedown', function() {
		isRotating = !isRotating; 
		localStorage.setItem('isRotating', isRotating);
		animate();
	});
	
	const centerBox = document.getElementById('center-box');
	centerBox.addEventListener('mousedown', function(e) {
			e.stopPropagation()
		});
	

	camera.layers.enable(1);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
	composer.render()
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
	timeDelta *= 0.05;
	pivot.rotateY(timeDelta);
	composer.render();
	requestAnimationFrame( animate );
}