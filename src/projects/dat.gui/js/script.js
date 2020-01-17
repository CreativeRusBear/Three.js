import '../../../libs/three.min.js';
import '../../../libs/OrbitControls.js';

class Ball {
	constructor () {
		this.canvas=document.getElementById('canvas');
		this.canvas.setAttribute('width', window.innerWidth);
		this.canvas.setAttribute('height', window.innerHeight);

		this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
		this.light = new THREE.AmbientLight(0xffffff);

		this.ball={
			rotationX : 0,
			rotationY : 0,
			rotationZ : 0,
			positionX : 0,
			positionY : 0,
			positionZ : 0,
		};

		this.gui = new dat.GUI();
	}

	settings () {
		this.datGuiSettings();
		this.sceneSettings();
		window.addEventListener('resize', this.windowResize.bind(this));
	}

	windowResize () {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth/window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	datGuiSettings () {
		this.gui.add(this.ball, 'rotationX').min(-0.2).max(0.2).step(0.001);
		this.gui.add(this.ball, 'rotationY').min(-0.2).max(0.2).step(0.001);
		this.gui.add(this.ball, 'rotationZ').min(-0.2).max(0.2).step(0.001);
		this.gui.add(this.ball, 'positionX').min(-5).max(5).step(0.1);
		this.gui.add(this.ball, 'positionY').min(-5).max(5).step(0.1);
		this.gui.add(this.ball, 'positionZ').min(-5).max(52).step(0.1);
	}

	sceneSettings () {
		this.renderer.setClearColor(0x000000);
		this.camera.position.set(100, 0, 1000);
		this.scene.add(this.light);
	}

	createObj () {
		const geometry = new THREE.SphereGeometry(200, 12, 12);

		// VertexColors: THREE.FaceColors-св-во, которое разрешает для данного материала задать для каждой грани свой цвет
		const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});

		// Задаем цвета с помощью цикла
		for (let i = 0; i < geometry.faces.length; i++) {

			// Грань
			geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
		}
		this.mesh = new THREE.Mesh(geometry, material);
		this.scene.add(this.mesh);
	}

	render () {
		this.mesh.rotation.x+=this.ball.rotationX;
		this.mesh.rotation.y+=this.ball.rotationY;
		this.mesh.rotation.z+=this.ball.rotationZ;
		this.mesh.position.x+=this.ball.positionX;
		this.mesh.position.y+=this.ball.positionY;
		this.mesh.position.z+=this.ball.positionZ;
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.render.bind(this));
	}
}

const ball = new Ball();
ball.settings();
ball.createObj();
ball.render();