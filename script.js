let scene, camera, renderer, car, road;
let score = 0;
let speed = 0.5;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    // Road (3D Plane)
    const roadGeo = new THREE.PlaneGeometry(20, 1000);
    const roadMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
    road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    scene.add(road);

    // Car (Simple 3D Box for now)
    const carGeo = new THREE.BoxGeometry(1, 0.5, 2);
    const carMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    car = new THREE.Mesh(carGeo, carMat);
    car.position.y = 0.25;
    car.position.z = 5;
    scene.add(car);

    camera.position.set(0, 3, 10);
    camera.lookAt(car.position);

    animate();
}

// Controls
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" && car.position.x > -4) car.position.x -= 0.5;
    if (e.key === "ArrowRight" && car.position.x < 4) car.position.x += 0.5;
});

function animate() {
    requestAnimationFrame(animate);
    
    // Road Movement Effect
    road.position.z += speed;
    if (road.position.z > 50) road.position.z = 0;

    score += 1;
    document.getElementById('score').innerText = "Score: " + Math.floor(score/10);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();