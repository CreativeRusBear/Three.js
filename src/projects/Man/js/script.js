import "../../../libs/three.min.js";
import "../../../libs/GLTFLoader.js";
import "../../../libs/OrbitControls.js";

class Man{
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.objLoader = new THREE.GLTFLoader();
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    settings(){
        this.sceneSettings();
        this.lightSettings();
        this.camera.position.set(0,100,300);

        window.addEventListener('resize', this.resizeWindow.bind(this));
        this.controlsSettings();
    }

    sceneSettings(){
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    lightSettings(){
        const light = new THREE.AmbientLight(0xffffff, 5);
        this.scene.add(light);
    }

    controlsSettings(){
        this.controls.enableDamping = true;
        this.controls.campingFactor = 0.25;
        this.controls.enableZoom = true;
    }

    meshLoad() {
        this.objLoader.load('./model/scene.gltf', gltf=>{
            this.mesh = gltf.scene;
            this.mesh.children[0].material = new THREE.MeshLambertMaterial();
            this.mesh.scale.set(.5,.5,.5);
            this.mesh.position.set(0,-100,0);
            this.scene.add(this.mesh);
        });
    }

    resizeWindow(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    render() {
        if (this.mesh) this.mesh.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        requestAnimationFrame(this.render.bind(this));
    }
}

const Person = new Man();
Person.settings();
Person.meshLoad();
Person.render();




