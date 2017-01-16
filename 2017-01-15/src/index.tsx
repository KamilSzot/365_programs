import * as THREE from 'three'

const WIDTH = 600;
const HEIGHT = 300;




var canvas = document.getElementById("tex") as HTMLCanvasElement;

canvas.width = 256;
canvas.height = 256;


var ctx = canvas.getContext("2d");
    ctx.font = '20pt Arial';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

for(var k = 0; k<256;k++) {
    var x = .1;
    var f = k/512+3.4;
    for(var i=0; i<100; i++) {
         x = f*x*(1-x);
    }
    for(var i=0; i<200; i++) {
        x = f*x*(1-x);
        ctx.fillRect(k, x*256, 1, 1);
    }
    
}


var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
document.getElementById('page').appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
camera.position.set(0,0,0);
scene.add(camera);


renderer.setClearColor('#AAA');
renderer.setClearAlpha(1);


// Create a light, set its position, and add it to the scene.
var light = new THREE.PointLight(0xffffff);
light.position.set(-100,200,100);
scene.add(light);
var alight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( alight );

// create the sphere's material
const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

var size = 100;
var precision = 16;
var canvasMap = new THREE.Texture(canvas);



var geometry = new THREE.PlaneGeometry( 100, 100, 32 );
var material = new THREE.MeshBasicMaterial( { map: canvasMap, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );

plane.position.z = -200;

scene.add( plane );


//scene.add(sphere);
function animate() {
    requestAnimationFrame(animate);
    canvasMap.needsUpdate = true;
    plane.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
