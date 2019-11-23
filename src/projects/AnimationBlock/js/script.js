import "../../../libs/three.min.js";
import "../../../libs/TweenMax.min.js";

class GsapAnimation {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});

        //This class is designed to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.
        this.raycater = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
    }

    globalSettings() {
        this.sceneSettings();
        this.windowResize();
        this.mouseMove();
        this.lightSettings();
        window.addEventListener('resize', this.windowResize.bind(this));
        this.camera.position.z = 5;
    }

    lightSettings() {
        this.light = new THREE.PointLight(0xffffff, 1, 1000);
        this.light.position.set(0, 0, 0);
        this.light2 = new THREE.PointLight(0xffffff, 2, 1000);
        this.light2.position.set(0, 0, 25);
        this.scene.add(this.light, this.light2);
    }

    sceneSettings() {
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    windowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    mouseMove() {
        window.addEventListener('mousemove', event => {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycater.setFromCamera(this.mouse, this.camera);

            const intersects = this.raycater.intersectObjects(this.scene.children, true);
            for (let i = 0; i < intersects.length; i++) {
                this.tl = new TimelineMax().delay(.3);
                this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut});
                this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI * .5, ease: Expo.easeOut}, "=-1.5");
            }
        });
    }

    meshRandomGenerator() {
        let meshX = -10;
        for (let i = 0; i < 15; i++) {
            this.geometry = i % 2
                ? new THREE.BoxGeometry(1, 1, 1)
                : new THREE.ConeGeometry(.5, 1, 12);

            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.meshPosition();
            meshX += 1;
        }
    }

    meshPosition() {
        this.mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
        this.scene.add(this.mesh);
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    };
}

const animation = new GsapAnimation();
animation.globalSettings();
animation.meshRandomGenerator();
animation.render();