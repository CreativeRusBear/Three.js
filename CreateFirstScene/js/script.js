window.onload=function () {
	var width=window.innerWidth;
	var height=window.innerHeight;
	var canvas=document.getElementById('canvas');
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);

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
	var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh)

	function loop() {
		//вращение объекта
		mesh.rotation.x+=0.005;
		mesh.rotation.y+=Math.PI/500;
		renderer.render(scene, camera);
		requestAnimationFrame(function(){loop();});
	}

	loop();
}