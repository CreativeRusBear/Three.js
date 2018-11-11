window.onload=function () {
	var width=window.innerWidth;
	var height=window.innerHeight;
	var canvas=document.getElementById('canvas');
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

	var ball={
		rotationX: 0,
		rotationY: 0,
		rotationZ: 0,
		positionX: 0,
		positionY: 0,
		positionZ: 0
	};

	//работа с dat.gui
	//пользовательский интерфейс
	var gui = new dat.GUI();
	//настраиваем пользовательский инетрфейс
	gui.add(ball, 'rotationX').min(-0.2).max(0.2).step(0.001);
	gui.add(ball, 'rotationY').min(-0.2).max(0.2).step(0.001);//устанавливаем ограничения вращения от -0.2 до 0.2, а также задаем шаг 0.001
	gui.add(ball, 'rotationZ').min(-0.2).max(0.2).step(0.001);
	gui.add(ball, 'positionX').min(-5).max(5).step(0.1);
	gui.add(ball, 'positionY').min(-5).max(5).step(0.1);
	gui.add(ball, 'positionZ').min(-5).max(52).step(0.1);
	var renderer = new THREE.WebGLRenderer({canvas: canvas});
	renderer.setClearColor(0x000000);

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
	camera.position.set(100, 0, 1000);

	//создание источника света
	var light = new THREE.AmbientLight(0xffffff);//рассеянный свет
	scene.add(light);

	//var geometry =new THREE.PlaneGeometry(300, 300, 12, 12);//создание полоскости.  в параметрах предается значение ширины,высоты, кол-ва фрагментов
	var geometry = new THREE.SphereGeometry(200, 12, 12);//радиус, кол-во сегментов
	var material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});//vertexColors: THREE.FaceColors-св-во, которое разрешает для данного материала задать для каждой грани свой цвет
	//задаем цвета с помощью цикла
	for (var i = 0; i < geometry.faces.length; i++) {
		//грань
		geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
	}
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh)

	function loop() {
		//вращение объекта
		mesh.rotation.x+=ball.rotationX;
		mesh.rotation.y+=ball.rotationY;
		mesh.rotation.z+=ball.rotationZ;
		mesh.position.x+=ball.positionX;
		mesh.position.y+=ball.positionY;
		mesh.position.z+=ball.positionZ;
		renderer.render(scene, camera);
		requestAnimationFrame(function(){loop();});
	}

	loop();
}