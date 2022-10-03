import * as THREE from 'three';

import { EffectComposer } from '../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../node_modules/three/examples/jsm/postprocessing/ShaderPass.js';

import { LuminosityShader } from '../node_modules/three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from '../node_modules/three/examples/jsm/shaders/SobelOperatorShader.js';

import { STLLoader } from '../node_modules/three/examples/jsm/loaders/STLLoader.js';

let camera, scene, renderer, composer, pivot;
let mesh;
let effectSobel;

const targets = {
	additive:      1,
	crypto:        2,
	welding:       3,
	activity:      4,
	this_website:  5,
	about:         6
}

init(targets);
animate();

function init(targets) {

	renderer = new THREE.WebGLRenderer();
    var container = document.getElementById('sobel');
    var w = container.offsetWidth;
    var h = container.offsetHeight;
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

	//

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, w/h, 0.1, 200 );
	camera.position.set( 0, 0, 25 );
	camera.lookAt( scene.position );

	//

	//const loader = new STLLoader();
	//loader.load( './models/two_plus.stl', function ( geometry ) {
//
//		const material = new THREE.MeshPhongMaterial( { color: 0xff5533 } );
//		const mesh = new THREE.Mesh( geometry, material );
//
//		mesh.scale.set(0.5,0.5,0.5)
//
//		scene.add( mesh );
//
//	} );

	pivot = new THREE.Group();
	const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );

	for ( let k = 0; k <= Object.keys(targets).length; k ++ ) {
		const geometry = new THREE.TorusKnotGeometry( 7.5, 3, 256, 32, 1, k );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.layers.set( k + 1 )
		mesh.name = Object.keys(targets)[k]
		pivot.add( mesh )
	}

	scene.add( pivot )
	//

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

	const buttonAdditive = document.getElementById('additive');
	buttonAdditive.addEventListener('mouseover', function() {

		switchMesh(targets.additive);

	});

	const buttonCrypto = document.getElementById('crypto');
	buttonCrypto.addEventListener('mouseover', function() {

		switchMesh(targets.crypto);

	});

	const buttonWelding = document.getElementById('welding');
	buttonWelding.addEventListener('hover', function() {

		switchMesh(targets.welding);

	});

	const buttonActivity = document.getElementById('activity');
	buttonActivity.addEventListener('mouseover', function() {

		switchMesh(targets.activity);

	});

	const buttonWebsite = document.getElementById('this_website');
	buttonWebsite.addEventListener('mouseover', function() {

		switchMesh(targets.this_website);

	});

	const buttonAbout = document.getElementById('about');
	buttonAbout.addEventListener('mouseover', function() {

		switchMesh(targets.about);

	});
}

function switchMesh(target) {
	camera.layers.disableAll();
	camera.layers.enable(0);
	camera.layers.enable(target);
}

function animate() {

	pivot.rotation.y += 0.005;
	
	composer.render();

	requestAnimationFrame( animate );
}