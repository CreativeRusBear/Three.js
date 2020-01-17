import '../../../libs/three.min.js';
import '../../../libs/OrbitControls.js';
import '../../../libs/OBJLoader.js';

/**
 * @module
 * @class
 * @description Creates a 3D-slider, that allows to change objects and it's textures
 * @example
 * const slider = new Slider();
 * slider.settings();
 * slider.loadMesh(slider.currentObj);
 * slider.render();
 */
export default class Slider {
	/**
	 * @constructor
	 * @description Initialization of necessary elements
	 */
	constructor () {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
		this.loader = new THREE.TextureLoader();
		this.textureObjLoader = new THREE.TextureLoader();
	}

	/**
	 * @method
	 * @description Declaration of variables that contain data about the mesh and its textures
	 */
	initializeObjs () {
		this.objects=[ 'banana.obj', 'raptor.obj' ];
		this.textures=[
			[ 'banana_standard_texture.png', 'banana_saturation_texture.png', 'banana_cold_texture.png' ],
			[ 'raptor_standard.png', 'raptor_negative.png' ],
		];
		this.currentObj = 0;
	}

	/**
	 * @method
	 * @description Add event handlers when clicking arrows
	 */
	arrowsActions () {
		document.querySelector('.fa-angle-up').onclick = async () => {
			this.removeMesh();
			this.currentObj = this.currentObj ? this.currentObj-1 : this.objects.length-1;
			await this.loadMesh(this.currentObj);
		};

		document.querySelector('.fa-angle-down').onclick= async () => {
			this.removeMesh();
			this.currentObj = this.currentObj===this.objects.length-1 ? 0 : this.currentObj+1;
			await this.loadMesh(this.currentObj);
		};
	}

	/**
	 * @method
	 * @description Global settings for work with the slider
	 */
	settings () {
		this.initializeObjs();
		this.arrowsActions();
		this.visualSettings();
		this.lightsSettings();
		this.controlsSettings();
		window.addEventListener('resize', this.resizeWindow.bind(this));
	}

	/**
	 * @method
	 * @description event that fires when the browser window is resized
	 */
	resizeWindow () {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect=window.innerWidth/window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	/**
	 * @method
	 * @description load background for the scene and set starter position for the camera
	 */
	visualSettings () {
		this.loader.load('img/bg_prod.jpg', texture => this.scene.background = texture);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.querySelector('body').appendChild(this.renderer.domElement);
		this.camera.position.set(5, 2, 1);
	}

	/**
	 * @method
	 * @description setting lights on the scene
	 */
	lightsSettings () {
		const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1);
		const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(7,100%,68%)'), 0.75);
		const backLight = new THREE.DirectionalLight(0xffffff, 1);
		keyLight.position.set(-100, 0, 100);
		fillLight.position.set(100, 0, 100);
		backLight.position.set(100, 0, -100).normalize();
		this.scene.add(keyLight, fillLight, backLight);
	}

	/**
	 * @method
	 * @description Settings for the `OrbitControls`
	 */
	controlsSettings () {
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.enableDamping = true;
		this.controls.campingFactor = 0.25;
		this.controls.enableZoom = true;
	}

	/**
	 * @method
	 * @description allows to load the selected object
	 * @param {Number} i - obj's index
	 * @return {Promise<resolve>} - returns `resolve`, when the object has been loaded
	 */
	loadMesh (i) {
		const map = this.textureObjLoader.load(`./models/textures/${this.textures[i][0]}`);
		const material = new THREE.MeshPhongMaterial({map: map});
		const objLoader = new THREE.OBJLoader();

		objLoader.load(`./models/${this.objects[i]}`, obj => {
			obj.traverse( node => {
				if (node.isMesh) {
					node.material = material;
				}
			});
			obj.name = this.objects[i].match(/^[^.\W]+/i).shift();
			this.scene.add(obj);
		});
		this.clearTexture();
		for (let item = 0; item < this.textures[i].length; item++) {
			document.querySelector('.color_scheme').innerHTML +=
				`<div 
					class="color_scheme__block" 
					style="background: url(img/textures/${this.textures[i][item]});"
				></div>`;
		}
		this.changeTexture(i);
		return new Promise(resolve => resolve());
	}

	/**
	 * @method
	 * @description changes the object's texture
	 * @param {Number} i - texture's index
	 */
	changeTexture (i) {
		const colorBlocks = document.querySelectorAll('.color_scheme__block');
		colorBlocks.forEach(val => {
			val.onclick = () => {
				const arr = val.style.background.split('/');
				const result=arr[arr.length-1].slice(0, -2);
				this.textureObjLoader.load(`./models/textures/${result}`, texture => {
					const mat = this.scene.getObjectByName(
						this.objects[i].match(/^[^.\W]+/i).shift(), true,
					).children[0].material;
					mat.map = texture;
					mat.needsUpdate = true;
				});
			};
		});
	}

	/**
	 * @method
	 * @description deletes the old object
	 */
	removeMesh () {
		const obj = this.scene.children.find(child => child.constructor.name === 'Vb');
		this.scene.remove(this.scene.getObjectByName(obj.name));
	}

	/**
	 * @method
	 * @description removes the old texture of the object
	 */
	clearTexture () {
		const myNode = document.querySelector('.color_scheme');
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	}

	/**
	 * @method
	 * @description renders the current scene
	 */
	render () {
		this.renderer.render(this.scene, this.camera);
		this.controls.update();
		requestAnimationFrame(this.render.bind(this));
	}
}





