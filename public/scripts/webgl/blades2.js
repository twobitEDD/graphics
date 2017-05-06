var container;
var camera, scene, renderer;
var shapes = [];
var numShapes = 10;
var colors;
var ico;

var tc = null;

window.onload = function () {
    init();
    animate();
}

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    colors = randomColor({ count: numShapes, hue: 'green' });
    tc = tinycolor(colors[0]);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 300;
    camera.lookAt(scene.position);

    var ambient = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambient);

    var l1 = new THREE.DirectionalLight(0xD5EDEA, 0.31);
    l1.position.set(0, 0, -100);
    scene.add(l1);

    var l2 = new THREE.PointLight("#cdcdcd", 0.8, 200);
    l2.position.set(-100, 10, -20);
    scene.add(l2);

    var l3 = new THREE.PointLight("#cdcdcd", 0.8, 200);
    l3.position.set(100, 10, -20);
    scene.add(l3);

    var l4 = new THREE.DirectionalLight(colors[6], 0.4, 300);
    l4.position.set(0, 100, 0);
    scene.add(l4);

    // var l5 = new THREE.PointLight("#cdcdcd", 1, 100);
    // l5.position.set(0, -50, 50);
    // scene.add(l5);

    var c = colors[1];
    var c2 = colors[2];
    var pinkMat = new THREE.MeshPhongMaterial({
        color: c,
        //emissive: c,
        specular: c2,
        shininess: 10,
        //shading: THREE.FlatShading,
        //transparent: 1,
        opacity: 1
    });

    var material = new THREE.MeshStandardMaterial({ metalness: 0.5, roughness: 0.3, color: c, side: THREE.DoubleSide });

    var geometry = new THREE.PlaneGeometry(1, 1);
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    //geometry.translate(-0.5, -0.5, 0)

    var index = 0;

    for (var i = -5; i <= 5; i++) {
        for (var j = -5; j <= 5; j++) {


           // var material = new THREE.MeshLambertMaterial({ color: tinycolor(colors[4]).brighten(i * 3).toString(), wireframe: true, side: THREE.DoubleSide });

            shapes[index] = new THREE.Mesh(geometry, material);
            var s = 12;
            var s2 = 14;
            shapes[index].scale.set(s, s, s);
            shapes[index].position.set(i * s2, j*s2, 0);
            scene.add(shapes[index]);
            index++;
        }
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

    for (var i = 0; i < shapes.length; i++) {
        shapes[i].rotation.y += 0.012;
        shapes[i].rotation.x += 0.0001 + 0.001 * i;
        //shapes[i].rotation.z += -0.002 + 0.002 * (numShapes);
        //shapes[i].scale.multiplyScalar(10+Math.abs(Math.sin(y)));
    }

    x += 0.05;
    y += 0.05;
    z += 0.1;


    renderer.render(scene, camera);

}
