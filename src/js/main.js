
// ------------------------------------
// require module
// 
const Three = require('three');

// ------------------------------------
// import module
// 
import User from './User';
import Earth from './Earth';
import HSVtoRGB from './HSVtoRGB';

const EASE = 0.05;
const PI = Math.PI;

const STAR_NUM = 1000000;

const SCENE         = new Three.Scene(),
      CAMERA        = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000),
      LIGHT         = new Three.DirectionalLight(0xffffff, 1),
      RENDERER      = new Three.WebGLRenderer(),
      ORIGIN_POINT  = new Three.Vector3(0, 0, 0),
      STAR_POINT    = new Three.Points();

let winCenterPoint = () => {
  return {
    x : window.innerWidth / 2,
    y : window.innerHeight / 2
  }
};

let mousePoint = {
  x : 0,
  y : 0
};

let colorHSL = {
  H : 0,
  S : 0.8,
  L : 0.5
};

let goalPoint = {
  x : 0,
  y : 0,
  z : 0
};

let dist = {
  current : 0,
  goal : 0
};

let goalRotate = {
  x : 0,
  y : 0,
  z : 0
};

let mouseDownPoint = {
  x : 0,
  y : 0
};

let isMouseDown = false;




// ------------------------------------
// window EVENT
// 
window.addEventListener('resize', (event) => {
  CAMERA.aspect = window.innerWidth / window.innerHeight;
  CAMERA.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
}, false);

window.addEventListener('mousemove', (event) => {
  mousePoint.x = event.clientX - winCenterPoint().x;
}, false);


const addParticles = function(pre_sizeAr){
  let geometry = new Three.Geometry();

  for (let i = 0; i < STAR_NUM; i ++){
    let vertex = new Three.Vector3(
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000,
      Math.random() * 2000 - 1000
    );

    geometry.vertices.push(vertex);
  }

  new Three.TextureLoader().load(
    createBlurCircle(),
    ( texture ) => {
      let material = new Three.PointsMaterial({
        size        : 2,
        map         : texture,
        blending    : Three.AdditiveBlending,
        transparent : true
      });

      STAR_POINT.geometry = geometry;
      STAR_POINT.material = material;

      STAR_POINT.rotation.set(
        Math.random() * 360,
        Math.random() * 360,
        Math.random() * 360
      );

      SCENE.add(STAR_POINT); 
    }
  );
};


const createBlurCircle = () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const r = 128;
  const grad = context.createRadialGradient(r, r, 0, r, r, r);

  canvas.width = canvas.height = r * 2;

  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.6)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.beginPath();
  context.arc(r, r, r, 0, 360 * Math.PI / 180, false);
  context.closePath();
  context.fillStyle = grad;
  context.fill();

  return canvas.toDataURL();
}



const render = function() {
  colorHSL.H += 0.001;

  let flash = Math.random();

  STAR_POINT.material.color.setHSL(colorHSL.H % 1, 1, 0.5);

  dist.current += (dist.goal - dist.current) * EASE;

  // goalPoint.x = Math.abs(dist.current) * Math.cos(angle.x / PI);
  // goalPoint.y = Math.abs(dist.current) * Math.cos(angle.y / PI);
  // goalPoint.z = Math.abs(dist.current) * Math.sin(angle.x / PI);

  // CAMERA.position.x += (goalPoint.x - CAMERA.position.x) * EASE;
  // CAMERA.position.y += (goalPoint.y - CAMERA.position.y) * EASE;
  // CAMERA.position.z += (goalPoint.z - CAMERA.position.z) * EASE;
  // CAMERA.position.x = dist * Math.cos(angle / Math.PI);
  // CAMERA.position.y = dist * Math.cos(angle / Math.PI);

  SCENE.rotation.x += (goalRotate.x - SCENE.rotation.x) * EASE;
  SCENE.rotation.y += (goalRotate.y - SCENE.rotation.y) * EASE;

  CAMERA.position.z += (goalPoint.z - CAMERA.position.z) * EASE;
  CAMERA.lookAt(ORIGIN_POINT);

  STAR_POINT.rotation.x += 0.001;
  STAR_POINT.rotation.y -= 0.0001;
  STAR_POINT.rotation.z += 0.0003;

  RENDERER.render(SCENE, CAMERA);

  requestAnimationFrame(render);
}


document.addEventListener('DOMContentLoaded', (event) => {

  CAMERA.position.z = 250;

  LIGHT.position.set(
    100,
    10,
    0
  );


  SCENE.add(LIGHT);
  RENDERER.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(RENDERER.domElement);



  addParticles([1,1,1,2,2,3]);

  let earth = new Earth(Three);
  earth.textureLoad(
    '/img/oro.png',
    () => {
      SCENE.add(earth.mesh)
    }
  );


  RENDERER.render(SCENE, CAMERA);
  render();


}, false);

document.addEventListener('wheel', (event) => {
  event.preventDefault();
  goalPoint.z += event.wheelDelta;
}, false);

document.addEventListener('mousedown', (event) => {
  event.preventDefault();
  isMouseDown = true;
  mouseDownPoint.x = event.pageX;
  mouseDownPoint.y = event.pageY;
}, false);

document.addEventListener('mousemove', (event) => {
  event.preventDefault();
  if(!isMouseDown) {
    return;
  }
  calcPoint(event.pageX, event.pageY);
}, false);

document.addEventListener('mouseup', (event) => {
  event.preventDefault();
  isMouseDown = false;
}, false);

const calcPoint = (x, y) => {
  goalRotate.y += (x - mouseDownPoint.x) / 1000;
  goalRotate.x -= (y - mouseDownPoint.y) / 1000;

  if(goalRotate.x > PI / 2) {
    goalRotate.x = PI / 2;
  }

  if(goalRotate.x < -PI / 2) {
    goalRotate.x = -PI / 2;
  }
};