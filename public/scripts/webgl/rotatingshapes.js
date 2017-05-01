
/* Make a a grid of rotating cubes:

- First we make a cube geometry
- Then we assign a differet shade of purple color to each face of the geometry 
- We create many cube meshes and position them in a grid across the street
- We make an animation loop and in every iteration we rotate the cubes
- Profit?
*/

var container, camera, scene, renderer, controls;
var cubes = [];
var geometry;
var gapX = 30;
var gapY = 30;
var cubeSize = 20;

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 2000;
    camera.position.y = 200;

    var ambient = new THREE.AmbientLight(0x121212);
    scene.add(ambient);

    var light = new THREE.PointLight(0xEEEEEE);
    light.position.z = 1000;
    light.position.y = 200;
    scene.add(light);


    geometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
    var newColor = randomColor({ hue: "purple", luminosity: "dark" });

    for (var i = 0; i < geometry.faces.length; i++) {
        var faceColor = tinycolor(newColor).brighten(i * 10).toString();
        geometry.faces[i].color.setStyle(faceColor);
    }


    /*Black and white*/
    // for ( var i = 0; i < geometry.faces.length; i ++ ) {
    // 	if(i%2 == 0){
    // 		geometry.faces[ i ].color.setHex( 0xffffff );
    // 	}else{
    // 		geometry.faces[ i ].color.setHex( 0x000000 );	
    // }
    //}


    for (var i = -30; i < 30; i++) {
        cubes[i] = [];
        for (var j = -35; j < 35; j++) {

            //var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
            var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: newColor, vertexColors: THREE.FaceColors });
            var cube = new THREE.Mesh(geometry, material);
            cube.position.x = i * gapX;
            cube.position.y = j * gapY;

            scene.add(cube);
            cubes[i].push(cube);
        }
    }

    renderer = new THREE.WebGLRenderer({});
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.append(renderer.domElement);

    createControls();
    window.addEventListener('resize', onWindowResize, false);
    //setInterval(changeColors, 5000);
}

function changeColors() {

    var newColor = randomColor({ hue: "purple", luminosity: "dark" });
    for (var i = 0; i < geometry.faces.length; i++) {
        var faceColor = tinycolor(newColor).brighten(i * 10).toString();
        geometry.faces[i].color.setStyle(faceColor);
    }
    geometry.colorsNeedUpdate = true;
}
var frame = 0;

function animate() {
    frame += 0.05;
    for (var i = -30; i < 30; i++) {
        for (var j = 0; j < 70; j++) {
            var cube = cubes[i][j];
            cube.rotation.x += 0.0006 * j;
            cube.rotation.y += 0.0004 * j;
            cube.rotation.z += Math.sin(frame) * 0.002 * i;
        }
    }

    camera.position.z = Math.sin(frame / 80) * 2000;

    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

function createControls() {
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.target.set(0, 120, 0);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

init();
animate();