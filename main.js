import * as THREE from "three";
import  {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
console.log(THREE);

const canvas = document.getElementById("canvas");


//scene
const scene = new THREE.Scene();


//sizes
const sizes = {
  width: innerWidth,
  heigt: innerHeight,
  
  };

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigt, 0.1, 3000);
camera.position.set(0, 500, 1000);
scene.add(camera);

//renderer

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.heigt);
renderer.setPixelRatio(window.devicePixelRatio);


//envimage
const urls = [ "./envimage/right.png" ,
               "./envimage/left.png" , 
               "./envimage/up.png" ,
               "./envimage/down.png",
               "./envimage/front.png" ,
               "./envimage/back.png",
];

const loader = new THREE.CubeTextureLoader();
scene.background = loader.load(urls);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//解像度
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(900);

//cubecamera
const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
scene.add(cubeCamera);


//object
const material = new THREE.MeshBasicMaterial({
  envMap: cubeRenderTarget.texture,
  //hansya
  // reflectivity:0.5,
});
const geometry = new THREE.SphereGeometry(350, 50, 50,);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, 100, 0);
scene.add(sphere);


function animate() {
  controls.update();
  cubeCamera.update( renderer, scene );
  renderer.render(scene, camera);
  // console.log("a");
  window.requestAnimationFrame(animate);

}

animate();


