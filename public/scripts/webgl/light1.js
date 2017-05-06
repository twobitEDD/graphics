var container;
var camera, scene, renderer, controls;
var shapes = [];
var numShapes = 10;
var colors;
var ico;

var lights = [];

var tc = null;

window.onload = function () {
    init();
    animate();
}

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    colors = randomColor({ count: numShapes, hue: 'purple' });
    tc = tinycolor(colors[0]);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 300;
    camera.lookAt(scene.position);

    var ambient = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambient);

    var l1 = new THREE.DirectionalLight(0xD5EDEA, 0.3);
    l1.position.set(0, 200, 0);
    //scene.add(l1);

    l2 = new THREE.PointLight("#cdcdcd", 0.8, 400);
    l2.position.set(-200, 10, 20);
    
    scene.add(l2);

    var l3 = new THREE.PointLight("#cdcdcd", 0.8, 400);
    l3.position.set(200, 10, 20);
    //scene.add(l3);

    var l4 = new THREE.DirectionalLight(colors[6], 0.4, 1000);
    l4.position.set(0, 100, 0);
    //scene.add(l4);

    // var l5 = new THREE.PointLight("#cdcdcd", 1, 100);
    // l5.position.set(0, -50, 50);
    // scene.add(l5);

    var c = "#dddddd";
    var c2 = "#F0f0f0";
    var pinkMat = new THREE.MeshPhongMaterial({
        color: c,
        //emissive: c,
        specular: c2,
        shininess: 10,
        shading: THREE.FlatShading,
        //transparent: 1,
        opacity: 1,
        side: THREE.DoubleSide
    });

    var material = new THREE.MeshStandardMaterial({ metalness: 0.4, roughness: 0.3, color: "#004488", side: THREE.DoubleSide, shading: THREE.FlatShading });

    var geometry = new THREE.PlaneGeometry(1, 1);

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    //geometry.translate(-0.5, -0.5, 0)

    var sphereGeometry = new THREE.SphereGeometry(1, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
    sphereGeometry.computeFaceNormals();
    sphereGeometry.computeVertexNormals();


    var sphere = new THREE.Mesh(sphereGeometry, material);
    var s = 50;
    var s2 = 500;
    sphere.scale.set(s, s, s);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    l2.target = sphere;

    var sphere2 = new THREE.Mesh(sphereGeometry, material);
    sphere2.scale.set(s2, s2, s2);
    sphere2.position.set(0, 0, 0);
    scene.add(sphere2);

    var index = 0;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
     createControls();
}


function createControls() {
    controls = new THREE.TrackballControls( camera );

				controls.rotateSpeed = 1.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;

				controls.noZoom = false;
				controls.noPan = false;

				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;

				controls.keys = [ 65, 83, 68 ];

				controls.addEventListener( 'change', render );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


var x = 0;
var y = 0;
var z = 0;
var frame = 0;
function animate() {
frame += 0.05;
x = 200 * Math.sin(frame);
y = 200 * Math.cos(frame);

l2.position.set(x,y,z);

    controls.update();
    render();
    requestAnimationFrame(animate);
    
}


var d = 50;
function render() {


    renderer.render(scene, camera);

}
