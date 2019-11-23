import "../../../libs/three.min.js";
import "../../../libs/OrbitControls.js";
import "../../../libs/OBJLoader.js";
import  "../../../libs/MTLLoader.js";

class R2D2{
    constructor(){
        this.scene=new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    settings(){
        this.sceneSettings();
        this.lightsSettings();
        this.camera.position.set(0,0,200);

        this.controlsSettings();
        window.addEventListener('reslize', this.resizeWindow.bind(this));
    }

    sceneSettings(){
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    lightsSettings(){
        const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
        const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
        const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
        fillLight.position.set(100, 0, 100);
        keyLight.position.set(-100, 0, 100);
        backLight.position.set(100, 0, -100).normalize();
        this.scene.add(keyLight, fillLight, backLight);
    }

    controlsSettings(){
        this.controls.enableDamping=true;
        this.controls.campingFactor=0.25;
        this.controls.enableZoom=true;
    }

    resizeWindow(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect=window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    loadMesh(){
        const mtlLoader= new THREE.MTLLoader();
        mtlLoader.setTexturePath('./model/');
        mtlLoader.setPath('./model/');
        mtlLoader.load('r2-d2.mtl', materials =>{
            materials.preload();
            const objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('./model/');
            objLoader.load('r2-d2.obj', obj=>{
                obj.position.y-=60;
                this.scene.add(obj);
            });
        });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        requestAnimationFrame(this.render.bind(this));
    }
}

const robot = new R2D2();
robot.settings();
robot.loadMesh();
robot.render();