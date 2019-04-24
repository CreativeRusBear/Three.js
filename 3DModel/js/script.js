const scene=new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000),
    renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z=400;
let light = new THREE.AmbientLight(0xffffff, 5);
scene.add(light);
let loader = new THREE.GLTFLoader();
loader.load('scene.gltf', meshLoad);
let mesh;

function meshLoad(gltf) {
    mesh = gltf.scene;
    console.log(mesh.children[0]);
    mesh.children[0].material = new THREE.MeshLambertMaterial();
    scene.add(mesh);
    mesh.scale.set(.5,.5,.5);
    mesh.position.set(0,-150,0);
}

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;
controls.campingFactor=0.25;
controls.enableZoom=true;

function render() {
    if (mesh) mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
}
render();
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});
