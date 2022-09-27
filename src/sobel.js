import * as THREE from 'three';

import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';

import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

import { EffectComposer } from '../node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../node_modules/three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from '../node_modules/three/examples/jsm/postprocessing/ShaderPass.js';

import { LuminosityShader } from '../node_modules/three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from '../node_modules/three/examples/jsm/shaders/SobelOperatorShader.js';

import { STLLoader } from '../node_modules/three/examples/jsm/loaders/STLLoader.js';

let camera, scene, renderer, composer;

let effectSobel;

const params = {
	enable: true
};

init();
animate();

function init() {

	renderer = new THREE.WebGLRenderer();
    var container = document.getElementById('sobel');
    var w = container.offsetWidth;
    var h = container.offsetHeight;
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

	//

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, w/h, 0.1, 200 );
	camera.position.set( 0, 10, 25 );
	camera.lookAt( scene.position );

	//

	// ASCII file

	const loader = new STLLoader();
	loader.load( './models/two_plus.stl', function ( geometry ) {

		const material = new THREE.MeshPhongMaterial( { color: 0xff5533 } );
		const mesh = new THREE.Mesh( geometry, material );

		mesh.scale.set(0.5,0.5,0.5)

		scene.add( mesh );

	} );

	//const geometry = new THREE.TorusKnotGeometry( 8, 3, 256, 32, 2, 3 );
	//const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );

	//const mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );

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

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.minDistance = 10;
	controls.maxDistance = 100;

	// Removed resize function since the div should not be changing size

	//window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
	composer.setSize( window.innerWidth, window.innerHeight );

	effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
	effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;

}

function animate() {

	requestAnimationFrame( animate );

	composer.render()

}