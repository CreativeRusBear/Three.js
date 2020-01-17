import '../../../libs/three.min.js';
import '../../../libs/GLTFLoader.js';
import '../../../libs/OrbitControls.js';

class Warrior {
	constructor () {
		this.scene=new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({antialias: true});


		this.loader = new THREE.GLTFLoader();
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	}

	mainSettings () {
		this.sceneSettings();
		this.lightSettings();
		this.camera.position.z = 400;

		this.controlsSettings();
		this.windowResize();
	}

	sceneSettings () {
		this.renderer.setClearColor('#e5e5e5');
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
	}

	lightSettings () {
		const light = new THREE.AmbientLight(0xffffff, 5);
		this.scene.add(light);
	}

	meshLoad () {
		const loader = new THREE.GLTFLoader();
		loader.load('./model/scene.gltf', gltf => {
			this.mesh = gltf.scene;
			this.mesh.children[0].material = new THREE.MeshLambertMaterial();
			this.meshSettings();
		});
	}

	meshSettings () {
		this.mesh.scale.set(0.5, 0.5, 0.5);
		this.mesh.position.set(0, -150, 0);
		this.scene.add(this.mesh);
	}

	controlsSettings () {
		this.controls.enableDamping = true;
		this.controls.campingFactor = 0.25;
		this.controls.enableZoom = true;
	}

	windowResize () {
		window.addEventListener('resize', () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.camera.aspect=window.innerWidth/window.innerHeight;
			this.camera.updateProjectionMatrix();
		});
	}

	render () {
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
warcraftWarrior.meshLoad();
warcraftWarrior.render();
