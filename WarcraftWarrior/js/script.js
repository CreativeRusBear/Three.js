import "./libs/three.min.js";
import "./libs/GLTFLoader.js";
import "./libs/OrbitControls.js";

class Warrior{
    constructor(){
        this.scene=new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});

        this.light = new THREE.AmbientLight(0xffffff, 5);

        this.loader = new THREE.GLTFLoader();
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    mainSettings(){
        this.sceneSettings();
        this.objsSettings();

        this.controlsSettings();
        this.windowResize();
    }

    sceneSettings(){
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    objsSettings(){
        this.camera.position.z = 400;
        this.scene.add(this.light);
        this.loader.load('scene.gltf', this.meshLoad.bind(this));
    }

    meshLoad(gltf) {
        this.mesh = gltf.scene;
        this.mesh.children[0].material = new THREE.MeshLambertMaterial();
        this.meshSettings();
    }

    meshSettings(){
        this.scene.add(this.mesh);
        this.mesh.scale.set(.5,.5,.5);
        this.mesh.position.set(0,-150,0);
    }

    controlsSettings(){
        this.controls.enableDamping = true;
        this.controls.campingFactor = 0.25;
        this.controls.enableZoom = true;
    }

    windowResize(){
        window.addEventListener('resize', ()=>{
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect=window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
        });
    }

    render() {
        if (this.mesh) {
            this.mesh.rotation.y += 0.01;
        }
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        requestAnimationFrame(this.render.bind(this));
    }
}

const warcraftWarrior = new Warrior();
warcraftWarrior.mainSettings();
warcraftWarrior.render();
