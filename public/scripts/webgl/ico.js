var container;
var camera, scene, renderer;
var shapes = [];
var numShapes = 8;
var colors;
var ico;

window.onload = function(){
    init();
    animate();
}

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    colors = randomColor({ count: 10, hue: 'red' });

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 300;
    camera.lookAt(scene.position);

    var ambient = new THREE.AmbientLight(0x101010);
    scene.add(ambient);

    var l1 = new THREE.DirectionalLight(0xD5EDEA, 1);
    l1.position.set(0, 0, -100);
    scene.add(l1);

    var l2 = new THREE.PointLight("#cdcdcd", 1, 60);
    l2.position.set(0, 0, 40);
    scene.add(l2);

    var c = new THREE.Color("#a03000");
    var pinkMat = new THREE.MeshPhongMaterial({
        color: c,
        emissive: c,
        specular: c,
        shininess: 10,
        shading: THREE.FlatShading,
        transparent: 1,
        opacity: 1
    });

    ico = new THREE.Mesh(new THREE.IcosahedronGeometry(5, 0), pinkMat);
    var s = 3;
    ico.scale.set(s, s, s);
    ico.rotation.y = 0.5;
    scene.add(ico);

    for (var i = 0; i < numShapes; i++) {


        var material = new THREE.MeshLambertMaterial({ color: colors[i], wireframe: true, side: THREE.DoubleSide });

        shapes[i] = new THREE.Mesh(new THREE.IcosahedronGeometry(5, 0), material);
        var s = 5 + (2 * i * i / 3);
        shapes[i].scale.set(s, s, s);
        scene.add(shapes[i]);
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var x = 0;
var y = 0;
var z = 10;
var d = 50;
function render() {

    ico.rotation.x += 0.01;
    ico.rotation.y += 0.01;
    var w = 3 + 0.4 * Math.sin(x);
    ico.scale.set(w, w, w);

    for (var i = 0; i < numShapes; i++) {
        shapes[i].rotation.y += 0.002 + 0.002 * (numShapes);
        shapes[i].rotation.z += -0.002 + 0.002 * (numShapes);
        //shapes[i].scale.multiplyScalar(10+Math.abs(Math.sin(y)));
    }

    x += 0.05;
    y += 0.05;
    z += 0.1;


    renderer.render(scene, camera);

}
