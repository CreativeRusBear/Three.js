let scene= new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer({antialias: true});
camera.position.z=5;
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});


//This class is designed to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.
let raycater=new THREE.Raycaster(),
    mouse = new THREE.Vector2();



let material  = new THREE.MeshLambertMaterial({color: 0xF7F7F7}),
    geometry;

let meshX=-10;
for (let i=0; i<15;i++){
    if (i%2)geometry = new THREE.BoxGeometry(1,1,1);
    else geometry = new THREE.ConeGeometry( .5, 1, 12 );

    let mesh = new THREE.Mesh(geometry,material);
    mesh.position.x=(Math.random()-0.5)*10;
    mesh.position.y=(Math.random()-0.5)*10;
    mesh.position.z=(Math.random()-0.5)*10;
    scene.add(mesh);
    meshX+=1;
}



let light= new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0,0,0);
scene.add(light);

light= new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0,0,25);
scene.add(light);

//save size fun
let render=function (){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
};
render();

function onMouseMove(event) {
    //определяем касаемся ли мы какого-лиюо объекта на сцене
    event.preventDefault();
    mouse.x= (event.clientX/window.innerWidth)*2-1;
    mouse.y=-(event.clientY/window.innerHeight)*2+1;
    raycater.setFromCamera(mouse,camera);
    let intersects = raycater.intersectObjects(scene.children, true);
    for(let i=0; i< intersects.length;i++){
        this.tl = new TimelineMax().delay(.3);
        this.tl.to(intersects[i].object.scale, 1, {x:2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.scale, .5, {x:.5, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.position, .5, {x:2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.rotation, .5, {y:Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
    }
}



window.addEventListener('mousemove', onMouseMove);
