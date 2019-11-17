import "./libs/three.min.js";
import "./libs/GLTFLoader.js";

class Man{
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.light = new THREE.AmbientLight(0xffffff, 5);
        this.objLoader = new THREE.GLTFLoader();
    }

    settings(){
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.set(0,100,300);
        this.scene.add(this.light);

        this.resizeWindow();
        this.objLoader.load('scene.gltf', this.meshLoad.bind(this));
    }

    meshLoad(gltf) {
        this.mesh = gltf.scene;
        this.mesh.children[0].material = new THREE.MeshLambertMaterial();
        this.scene.add(this.mesh);
        this.mesh.scale.set(.5,.5,.5);
    }

    resizeWindow(){
        window.addEventListener('resize', ()=>{
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
        });
    }

    render() {
        if (this.mesh) this.mesh.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

const Person = new Man();
Person.settings();
Person.render();




