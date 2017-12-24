var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var particleCount = 70,
    particles = null,
    minDist = 200,
    dark = false;

function clearCanvas() {

    if (dark) {
        ctx.fillStyle = "#131213";
    } else {
        ctx.fillStyle = "#f5f5f5";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function Particle() {

    this.resetPosition = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    this.resetVelocity = function () {
        this.vx = -1 + Math.random() * 2;
        this.vy = -1 + Math.random() * 2;
    }

    this.resetVelocity();
    this.resetPosition();
}

function setSizes() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function init() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function onWindowClick() {
    clearCanvas();
    for (var i = 0; i < particleCount; i++) {
        particles[i].resetPosition();
        particles[i].resetVelocity();
    }
}

function onWindowDblClick() {
    dark = !dark;
}

function onWindowResize() {
    setSizes();
    init();
}


function update() {

    for (var i = 0; i < particles.length; i++) {
        p = particles[i];

        p.x += p.vx;
        p.y += p.vy

        if (p.x > canvas.width) {
            p.x = 0;
        } else if (p.x < 0) {
            p.x = canvas.width;
        }

        if (p.y > canvas.height) {
            p.y = 0;
        } else if (p.y < 0) {
            p.y = canvas.height;
        }

        for (var j = i + 1; j < particles.length; j++) {
            p2 = particles[j];
            distance(p, p2);
        }
    }
}

// Calculate distance between two particles and paint
function distance(p1, p2) {
    var dist, dx = p1.x - p2.x;
    var dy = p1.y - p2.y;

    dist = Math.floor(Math.sqrt(dx * dx + dy * dy));

    if (dist <= minDist) {
        var r = dark ? dist % 25 : dist;
        var g = dark ? dist : dist % 100;
        var b = dark ? dist : dist % 255;
        var color = "rgba(" + r + "," + g + "," + b + "," + (1.0 - dist / minDist) + ")";
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
    }
}

// Start the main animation loop using requestAnimFrame
function animate() {
    clearCanvas();
    update();
    requestAnimFrame(animate);
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.addEventListener('click', onWindowClick, false);
window.addEventListener('dblclick', onWindowDblClick, false);
window.addEventListener('resize', onWindowResize, false);

setSizes();
init();
animate();