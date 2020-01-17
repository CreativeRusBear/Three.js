import '../../../libs/three.min.js';
import '../../../libs/OrbitControls.js';
import '../../../libs/MTLLoader.js';
import '../../../libs/OBJLoader.js';

class Dino {
	constructor () {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	}

	settings () {
		this.sceneSettings();
		this.lightsSettings();
		this.camera.position.set(5, 10, 4);

		this.controlsSettings();
		window.addEventListener('resize', this.resizeWindow.bind(this));
	}

	sceneSettings () {
		this.renderer.setClearColor('#dddddd');
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
	}

	lightsSettings () {
		const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1);
		const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(7,100%,68%)'), 0.75);
		const backLight = new THREE.DirectionalLight(0xffffff, 1);
		keyLight.position.set(-100, 0, 100);
		fillLight.position.set(100, 0, 100);
		backLight.position.set(100, 0, -100).normalize();
		this.scene.add(keyLight, fillLight, backLight);
	}

	meshLoad () {
		const textureObjLoader = new THREE.TextureLoader();
		const map = textureObjLoader.load('./model/raptor_d1.png');
		const material = new THREE.MeshPhongMaterial({map: map});
		const objLoader = new THREE.OBJLoader();
		objLoader.load( './model/raptor.obj', obj => {
			obj.traverse( node => {
				if (node.isMesh) {
					node.material = material;
				}
			});
			obj.position.set(0, -4, 0);
			this.scene.add(obj);

		});
	}

	controlsSettings () {
		this.controls.enableDamping=true;
		this.controls.campingFactor=0.25;
		this.controls.enableZoom=true;
	}

	resizeWindow () {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect=window.innerWidth/window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	render () {
		this.renderer.render(this.scene, this.camera);
		this.controls.update();
		requestAnimationFrame(this.render.bind(this));
	}
}

const raptor = new Dino();
raptor.settings();
raptor.meshLoad();
raptor.render();
