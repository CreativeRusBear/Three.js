import "../../../libs/three.min.js";

class Torus{
    constructor(){
        this.scene= new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
    }

    settings(){
        this.meshSettings();
        this.lightSettings();
        this.camera.position.set(0,3,5);
        this.sceneSettings();
        this.renderer.render(this.scene,this.camera);

        window.addEventListener('resize',this.resizePage.bind(this));

    }

    sceneSettings(){
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    meshSettings(){
        this.mesh.position.set(0,0,-7);
        this.scene.add(this.mesh);
    }


    resizePage(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect=window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    lightSettings(){
        const light=new THREE.DirectionalLight(0xffffff,1.2);
        light.position.set(3,3,4);
        this.scene.add(light);
    }

    createObj(){
        const geometry =  new THREE.TorusGeometry(2, .2, 10, 100 );
        const material = new THREE.MeshPhongMaterial( { color: 0x1aacd0 } );
        this.mesh = new THREE.Mesh( geometry, material );

    }

    render(){
        this.mesh.rotation.y+=0.05;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));

    };
}

const Hoop = new Torus();
Hoop.createObj();
Hoop.settings();
Hoop.render();






