// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// ~~~~~~~~~~~~~~~~Set up~~~~~~~~~~~~~~~~

let scene, camera, renderer, cashimi; // removed cube

// helper to get Box 1 size (left column, first box)
function getBox1Size() {
  const el = document.getElementById('avatar-box'); // new id on Box 1
  if (!el) return { w: window.innerWidth, h: window.innerHeight };
  const r = el.getBoundingClientRect();
  const minH = 200;
  return {
    w: r.width || window.innerWidth,
    h: Math.max(r.height || minH, minH),
  };
}

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

  const { w, h } = getBox1Size();

  camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);

  // mount into Box 1 instead of document.body
  const mountEl = document.getElementById('avatar-box');
  (mountEl || document.body).appendChild(renderer.domElement);

  // ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
  const controls = new OrbitControls(camera, renderer.domElement);
  const loader = new GLTFLoader(); // to load 3d models

  loader.load('assets/runner.glb', function(gltf){
    const cashimi = gltf.scene;
    scene.add(cashimi);

    // center runner in scene
    cashimi.position.set(0, 0, 0);

    // scale if needed
    cashimi.scale.set(0.5, 0.5, 0.5);

    // rotate runner 180 degrees around Y axis
    cashimi.rotation.set(0, Math.PI, 0);

    // ZOOM IN: move camera closer
    camera.position.set(1.5, 4, 3);  // was (5, 4, 6)
    camera.lookAt(cashimi.position);

    const mixer = new THREE.AnimationMixer(cashimi);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    // make animation faster (2x speed; change to 3, 4, etc. if you like)
    mixer.timeScale = 2.5 ;

    const clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  });

  // ~~~~~~~~~~~~~~~~ Create scene here ~~~~~~~~~~~~~~~~

  // default camera position if model not loaded yet
  camera.position.z = 5;
}

init();

// simple animate fallback (kept but now only renders the scene)
function animate() {
  renderer.render( scene, camera );
}

// resize based on Box 1, not the full window
function onWindowResize() {
  const { w, h } = getBox1Size();
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

window.addEventListener('resize', onWindowResize, false);

renderer.setAnimationLoop( animate );

