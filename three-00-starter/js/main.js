// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~

let scene, camera, renderer, cube, cashimi; ;

function init() {
scene = new THREE.Scene();

// directional light
const light = new THREE.DirectionalLight(0xffffff, 6);
light.position.set(3, 4, 5);
scene.add(light);

const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );

const lightLeft = new THREE.DirectionalLight(0xff0000, 7);
lightLeft.position.set(-3, 4, -5);
scene.add(lightLeft);

const helperLeft = new THREE.DirectionalLightHelper( lightLeft, 5 );
scene.add( helperLeft );




camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/cashimi.gltf', function(gltf){
  const cashimi = gltf.scene;
  scene.add(cashimi);
  cashimi.scale.set(.5,.5,.5);
  cashimi.position.set(2, -1, 0);
});



// ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~
// →→→→→→ Follow next steps in tutorial: 
// // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

class CustomSinCurve extends THREE.Curve {
	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;
		return optionalTarget.set( tx, ty, tz );
	}
}
const path = new CustomSinCurve( 10 );
const geometry = new THREE.TubeGeometry( path, 20, .2, 8, false );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const texture = new THREE.TextureLoader().load('textures/iceTexture.jpg');
const material = new THREE.MeshStandardMaterial( { map: texture } );
cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const arcShape = new THREE.Shape()
	.moveTo( 5, 2 )
	.absarc( 1, 1, 4, 0, Math.PI * 2, false );
const geometry1 = new THREE.ShapeGeometry( arcShape );
const texture1 = new THREE.TextureLoader().load('textures/waterTexture.jpg');
const material1 = new THREE.MeshStandardMaterial( { map: texture1 } );
const mesh = new THREE.Mesh( geometry1, material1 ) ;
mesh.position.set(-2, 0, -4);
scene.add( mesh );



const geometry4 = new THREE.ConeGeometry( 2, 10, 20 );
const texture4 = new THREE.TextureLoader().load('textures/lavaTexture.jpg');
const material4 = new THREE.MeshStandardMaterial( { map: texture4 } );
const cone = new THREE.Mesh(geometry4, material4 );
cone.position.set(-6, 2, -4);
scene.add( cone );


camera.position.z = 5;
}

init();

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); 
  renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);


  renderer.setAnimationLoop( animate );

