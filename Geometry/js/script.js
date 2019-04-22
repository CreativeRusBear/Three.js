let scene= new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry =  new THREE.TorusGeometry(2, .2, 10, 100 ),
    material = new THREE.MeshPhongMaterial( { color: 0x1aacd0 } ),
    mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0,0,-7);
scene.add(mesh);

camera.position.z =10;
camera.position.y=6;
camera.position.x=2;

let light=new THREE.DirectionalLight(0xffffff,1.2);
light.position.set(3,3,4);
scene.add(light);

renderer.render(scene,camera);

window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});
let render=function (){
    requestAnimationFrame(render);
    mesh.rotation.y+=0.05;
    renderer.render(scene, camera);
};
render();
