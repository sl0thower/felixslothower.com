import * as THREE from 'three';

import { EffectComposer } from '../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../../node_modules/three/examples/jsm/postprocessing/ShaderPass.js';

import { LuminosityShader } from '../../node_modules/three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from '../../node_modules/three/examples/jsm/shaders/SobelOperatorShader.js';

import { STLLoader } from '../../node_modules/three/examples/jsm/loaders/STLLoader.js';

// specify the directory path you want to list the files of
const directoryPath = '/path/to/your/directory';

let camera, scene, renderer, composer, pivot;
let effectSobel;

const targets = {
	additive:      1,
	// crypto:        2,
	welding:       2,
	activity:      3,
	this_website:  4,
	about:         5
};

const files = [
	'../../models/headtube.stl',
	'../../models/welding_jig.stl',
	'../../models/apple_watch.stl',
	'../../models/world.stl',
	'../../models/two_plus_candle.stl',
	// '../models/'
]

const clock = new THREE.Clock();
var currentMesh = targets.additive;
var isRotating = true;
var switched = false;

init(targets);
animate();

function init(targets) {

	renderer = new THREE.WebGLRenderer();
    var container = document.getElementById('sobel');
    var w = container.offsetWidth;
    var h = container.offsetHeight;
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

	// init scene + camera

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, w/h, 0.1, 200 );
	camera.position.set( 0, 0, 27 );
	camera.lookAt( scene.position );

	// load the models

	pivot = new THREE.Group();
	const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );

	const loader = new STLLoader();
	for ( let k = 0; k <= Object.keys(targets).length; k ++ ) {
		loader.load(files[k], function ( geometry ) {
				const material = new THREE.MeshPhongMaterial( { color: 0xff5533 } );
				const mesh = new THREE.Mesh( geometry, material );
				mesh.layers.set( k + 1 )		
				mesh.name = Object.keys(targets)[k]
				// mesh.scale.set(0.5,0.5,0.5)
				pivot.add( mesh );
		});
	}

	// for ( let k = 0; k <= Object.keys(targets).length; k ++ ) {
	// 	const geometry = new THREE.TorusKnotGeometry( 7.5, 3, 256, 32, 1, k );
	// 	const mesh = new THREE.Mesh( geometry, material );
	// 	mesh.layers.set( k + 1 )
	// 	mesh.name = Object.keys(targets)[k]
	// 	pivot.add( mesh )
	// }

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

	// color to grayscale conversion

	const effectGrayScale = new ShaderPass( LuminosityShader );
	composer.addPass( effectGrayScale );

	// you might want to use a gaussian blur filter before
	// the next pass to improve the result of the Sobel operator

	// Sobel operator

	effectSobel = new ShaderPass( SobelOperatorShader );
	effectSobel.uniforms[ 'resolution' ].value.x = w * window.devicePixelRatio;
	effectSobel.uniforms[ 'resolution' ].value.y = h * window.devicePixelRatio;
	composer.addPass( effectSobel );

	// Removed resize function since the div should not be changing size
	//window.addEventListener( 'resize', onWindowResize );

	camera.layers.enable(1);

	const buttonSobel = document.getElementById('sobel');
	buttonSobel.addEventListener('mousedown', function() {isRotating = !isRotating; animate()});

	const buttonAdditive = document.getElementById('additive');
	buttonAdditive.addEventListener('mouseover', function() {switchMesh(targets.additive); animate()});
	buttonAdditive.addEventListener('mouseleave', function() {switchMesh(currentMesh); animate()});
	buttonAdditive.addEventListener('mousedown', function() {currentMesh = targets.additive});

	// const buttonCrypto = document.getElementById('vision');
	// buttonCrypto.addEventListener('mouseover', function() {switchMesh(targets.crypto); animate()});
	// buttonCrypto.addEventListener('mouseleave', function() {switchMesh(currentMesh); animate()});
	// buttonCrypto.addEventListener('mousedown', function() {currentMesh = targets.crypto});

	const buttonWelding = document.getElementById('welding');
	buttonWelding.addEventListener('mouseover', function() {switchMesh(targets.welding); animate()});
	buttonWelding.addEventListener('mouseleave', function() {switchMesh(currentMesh); animate()});
	buttonWelding.addEventListener('mousedown', function() {currentMesh = targets.welding});

	const buttonActivity = document.getElementById('activity');
	buttonActivity.addEventListener('mouseover', function() {switchMesh(targets.activity); animate()});
	buttonActivity.addEventListener('mouseleave', function() {switchMesh(currentMesh); animate()});
	buttonActivity.addEventListener('mousedown', function() {currentMesh = targets.activity});

	const buttonWebsite = document.getElementById('this_website');
	buttonWebsite.addEventListener('mouseover', function() {switchMesh(targets.this_website); animate()});
	buttonWebsite.addEventListener('mouseleave', function() {switchMesh(currentMesh); animate()});
	buttonWebsite.addEventListener('mousedown', function() {currentMesh = targets.this_website});

	const buttonAbout = document.getElementById('about');
	buttonAbout.addEventListener('mouseover', function() {switchMesh(targets.about); animate()});
	buttonAbout.addEventListener('mouseleave', function() {switchMesh(currentMesh); animate()});
	buttonAbout.addEventListener('mousedown', function() {currentMesh = targets.about});
}

function switchMesh(target) {
	camera.layers.disableAll();
	camera.layers.enable(0);
	camera.layers.enable(target);
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
	timeDelta *= 0.2;
	pivot.rotateY(timeDelta);
	composer.render();
	requestAnimationFrame( animate );
}