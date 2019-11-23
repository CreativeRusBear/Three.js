import "../../../libs/three.min.js";
import "../../../libs/OrbitControls.js";
import "../../../libs/OBJLoader.js";
import "../../../libs/MTLLoader.js";

class Banana {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

        this.keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1);
        this.fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(7,100%,68%)'), 0.75);
        this.backLight = new THREE.DirectionalLight(0xffffff, 1);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    settings() {
        this.lightsSettings();
        this.sceneSettings();
        window.addEventListener('resize', this.windowResize.bind(this));
        this.camera.position.set(5, 2, 1);
    }

    lightsSettings() {
        this.lightsPositions();
        this.addLightsOnScene();
    }

    lightsPositions() {
        this.keyLight.position.set(-100, 0, 100);
        this.fillLight.position.set(100, 0, 100);
        this.backLight.position.set(100, 0, -100).normalize();
    }

    addLightsOnScene() {
        this.scene.add(this.keyLight, this.fillLight, this.backLight);
    }

    sceneSettings() {
        this.renderer.setClearColor('#dddddd');
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.controlsSettings();
    }

    controlsSettings() {
        this.controls.enableDamping = true;
        this.controls.campingFactor = 0.25;
        this.controls.enableZoom = true;
    }

    windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    loadObj() {
        const textureObjLoader = new THREE.TextureLoader();
        const map = textureObjLoader.load('./model/banana_texture.png');
        const material = new THREE.MeshPhongMaterial({map: map});
        const objLoader = new THREE.OBJLoader();
        objLoader.load('./model/banana.obj', obj => {
            obj.traverse(node => {
                if (node.isMesh) node.material = material;
            });
            this.scene.add(obj);
        });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        requestAnimationFrame(this.render.bind(this));
    }
}

const banana = new Banana();
banana.settings();
banana.loadObj();
banana.render();

