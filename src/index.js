import * as THREE from "./script/three.js";
import { Water } from "./script/Water";

let camera,
  scene,
  renderer,
  cloudParticles = [],
  flash,
  circle;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;
  camera.position.set(30, 30, 100);

  let loader = new THREE.TextureLoader();
  const bgTexture = loader.load("sky.png");
  scene.background = bgTexture;
  let ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight(0xffbbaa, 6.0);
  directionalLight.position.set(0, 600, -100);
  directionalLight.target = scene;
  scene.add(directionalLight);
  let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
  orangeLight.position.set(200, 300, 100);
  scene.add(orangeLight);

  let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
  redLight.position.set(100, 300, 100);
  scene.add(redLight);

  let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
  blueLight.position.set(300, 300, 200);
  scene.add(blueLight);
  flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
  flash.position.set(200, 300, 100);
  scene.add(flash);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.fog = new THREE.FogExp2(0x1c1c2a, 0.0001);

  renderer.setClearColor(scene.fog.color);
  document.body.appendChild(renderer.domElement);
  const texture = new THREE.TextureLoader().load("moom.png");
  let circleGeo = new THREE.CircleGeometry(140, 320);
  let circleMat = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true
  });
  circle = new THREE.Mesh(circleGeo, circleMat);
  circle.position.set(0, 455, -100);
  circle.rotation.x = 1.16;
  circle.rotation.y = -0.12;

  scene.add(circle);
  loader.load("smokee.png", function (texture) {
    let cloudGeo = new THREE.PlaneBufferGeometry(700, 700);
    let cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });
    for (let p = 0; p < 10; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        400,
        Math.random() * 500 - 500
      );
      cloud.position.x -= 100;
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      // cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });
  loader.load("smokee.png", function (texture) {
    let cloudGeo = new THREE.PlaneBufferGeometry(2700, 2400);
    let cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });
    for (let p = 0; p < 10; p++) {
      let fog = new THREE.Mesh(cloudGeo, cloudMaterial);
      fog.position.set(
        Math.random() * 800 - 400,
        400,
        Math.random() * 500 - 1000
      );
      fog.rotation.x = 1.16;
      fog.rotation.y = -0.12;
      fog.position.x += 100;
      // cloud.rotation.z = Math.random() * 2 * Math.PI;
      fog.material.opacity = 0.4;
      cloudParticles.push(fog);
      scene.add(fog);
    }
  });

  animation();
}
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // camera.position.x = t* 2;
  camera.position.y = t * 17;
  camera.position.z = t;
}

function animation() {
  cloudParticles.forEach((p) => {
    p.position.x += 0.002;
    p.rotation.z -= 0.00019;
    //  p.position.x += 0.049;
  });
  if (Math.random() > 0.93 || flash.power > 100) {
    if (flash.power < 100)
      flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
    flash.power = 50 + Math.random() * 300;
  }
  // const currentTimeLine = window.pageYOffset / 5000;
  // const rx = currentTimeLine * -0.5 + 0.5;
  // const ry = (currentTimeLine * 0,9) * Math.PI *2;
  // circle.rotation.set(rx, ry, 0);
  document.body.onscroll = moveCamera;

  moveCamera();

  renderer.render(scene, camera);
  requestAnimationFrame(animation);
}
init();
