import "../../../libs/three.min.js";
import "../../../libs/OrbitControls.js";
import "../../../libs/GLTFLoader.js";


class Car{
    constructor(){
        this.scene=new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,5000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    settings(){
        this.sceneSettings();
        this.lightSettings();
        this.camera.position.set(0,1.5,5);

        this.controlsSettings();
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }

    resizeWindow(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect=window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    sceneSettings(){
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    lightSettings(){
        const light=new THREE.DirectionalLight(0xffffff,3);
        light.position.set(3,3,4);
        const light2=new THREE.DirectionalLight(0xffffff,5);
        light2.position.set(-3,-2,-4);
        this.scene.add(light,light2);
    }

    controlsSettings(){
        this.controls.enableDamping=true;
        this.controls.campingFactor=0.25;
        this.controls.enableZoom=true;
    }

    meshLoad(){
        const loader = new THREE.GLTFLoader();
        loader.load('./model/scene.gltf', gltf=>{
            this.mesh = gltf.scene;
            this.mesh.children[0].material = new THREE.MeshLambertMaterial();
            this.scene.add(this.mesh);
            this.mesh.scale.set(1,1,1);
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

const toyota = new Car();
toyota.settings();
toyota.meshLoad();
toyota.render();