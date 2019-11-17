import "./libs/three.min.js";

class Torus{
    constructor(){
        this.scene= new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.geometry =  new THREE.TorusGeometry(2, .2, 10, 100 );
        this.material = new THREE.MeshPhongMaterial( { color: 0x1aacd0 } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.light=new THREE.DirectionalLight(0xffffff,1.2);

    }

    settings(){
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.mesh.position.set(0,0,-7);
        this.scene.add(this.mesh);

        this.light.position.set(3,3,4);
        this.scene.add(this.light);
        this.camera.position.set(0,3,5);

        this.renderer.render(this.scene,this.camera);

        this.resizePage();
    }

    resizePage(){
        window.addEventListener('resize', ()=>{
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect=window.innerWidth/window.innerHeight;
            this.camera.updateProjectionMatrix();
        });
    }

    render(){
        requestAnimationFrame(this.render.bind(this));
        this.mesh.rotation.y+=0.05;
        this.renderer.render(this.scene, this.camera);
    };
}

const Hoop = new Torus();
Hoop.settings();
Hoop.render();






