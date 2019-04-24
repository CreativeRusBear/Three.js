const scene=new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000),
    renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#e5e5e5");//bg color
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z=200;//set position camera

//work with lights
let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);
let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
let backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


//load materials
let mtlLoader= new THREE.MTLLoader();
mtlLoader.setTexturePath('./model/');
mtlLoader.setPath('./model/');
mtlLoader.load('r2-d2.mtl', (materials) =>{
    materials.preload();
    //load object model
    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./model/');
    objLoader.load('r2-d2.obj', (obj)=>{
        obj.position.y-=60;
        scene.add(obj);
    });
});



//move object on scene
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;
controls.campingFactor=0.25;
controls.enableZoom=true;

//render function
function render() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(render);
}
render();


//save adaptivity
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});
