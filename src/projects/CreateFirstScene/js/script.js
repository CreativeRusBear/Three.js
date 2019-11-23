import "../../../libs/three.min.js";
import "../../../libs/OrbitControls.js";

class Ball {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvasSetSize();
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    settings() {
        this.sceneSettings();
        this.controlsSettings();
        window.addEventListener('resize', this.windowResize.bind(this));
    }

    sceneSettings() {
        this.renderer.setClearColor(0x000000);
        this.camera.position.set(100, 0, 1000);
        const light = new THREE.AmbientLight(0xffffff);//рассеянный свет
        this.scene.add(light,this.mesh);
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

    canvasSetSize() {
        this.canvas.setAttribute('width', window.innerWidth);
        this.canvas.setAttribute('height', window.innerHeight);
    }

    createMesh() {
        const geometry = new THREE.SphereGeometry(200, 12, 12);//радиус, кол-во сегментов
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);
    }

    render() {
        this.mesh.rotation.x += 0.005;
        this.mesh.rotation.y += Math.PI / 500;
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        requestAnimationFrame(this.render.bind(this));
    }
}

const ball = new Ball();
ball.createMesh();
ball.sceneSettings();
ball.render();







