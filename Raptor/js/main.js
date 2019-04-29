const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});

renderer.setClearColor('#dddddd');

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(5,2,4);
let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1);
keyLight.position.set(-100, 0, 100);
let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(7,100%,68%)'), 0.75);
fillLight.position.set(100, 0, 100);
let backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(100, 0, -100).normalize();
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


let textureObjLoader = new THREE.TextureLoader(),
    map = textureObjLoader.load('./model/raptor_d1.png'),
    material = new THREE.MeshPhongMaterial({map: map}),
    objLoader = new THREE.OBJLoader();
objLoader.load( './model/raptor.obj', function ( obj ) {
    obj.traverse( function ( node ) {
        if ( node.isMesh ) node.material = material;
    } );
    scene.add( obj );

} );

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping=true;
controls.campingFactor=0.25;
controls.enableZoom=true;

function render() {
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(render);
}
render();

window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});
