import "../../../libs/three.min.js";
import "../../../libs/OrbitControls.js";
import "../../../libs/OBJLoader.js";

class Slider{
    constructor(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
        this.loader=new THREE.TextureLoader();
        this.textureObjLoader = new THREE.TextureLoader();
    }

    initializeObjs(){
        this.objects=[ 'banana.obj', 'raptor.obj' ];
        this.textures=[
            ['banana_standard_texture.png','banana_saturation_texture.png', 'banana_cold_texture.png'],
            ['raptor_standard.png','raptor_negative.png']
        ];
        this.currentObj = 0;
    }

    arrowsActions(){
        document.querySelector('.fa-angle-up').onclick=()=>{
            this.removeMesh();
            this.currentObj = this.currentObj ? this.currentObj-1 : this.objects.length-1;
            this.loadMesh(this.currentObj);
        };

        document.querySelector('.fa-angle-down').onclick=()=>{
            this.removeMesh();
            this.currentObj = this.currentObj===this.objects.length-1 ? 0 : this.currentObj+1;
            this.loadMesh(this.currentObj);
        };
    }

    settings(){
        this.initializeObjs();
        this.arrowsActions();
        this.visualSettings();
        this.lightsSettings();
        this.controlsSettings();
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }

    resizeWindow(){
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect=window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    visualSettings(){
        this.loader.load('img/bg_prod.jpg' , texture => this.scene.background = texture);
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.querySelector('.page').appendChild(this.renderer.domElement);
        this.camera.position.set(5,2,1);
    }

    lightsSettings(){
        const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1);
        const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(7,100%,68%)'), 0.75);
        const backLight = new THREE.DirectionalLight(0xffffff, 1);
        keyLight.position.set(-100, 0, 100);
        fillLight.position.set(100, 0, 100);
        backLight.position.set(100, 0, -100).normalize();
        this.scene.add(keyLight, fillLight, backLight);
    }

    controlsSettings() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.campingFactor = 0.25;
        this.controls.enableZoom = true;
    }

    loadMesh(i) {
        const map = this.textureObjLoader.load(`./models/${this.textures[i][0]}`);
        const material = new THREE.MeshPhongMaterial({map: map});
        const objLoader = new THREE.OBJLoader();

        objLoader.load(`./models/${this.objects[i]}`,  obj => {
            obj.traverse( node=>{
                if (node.isMesh){
                    node.material = material
                }
            });
            obj.name = this.objects[i].match(/^[^.\W]+/i).shift();
            this.scene.add(obj);
        });
        this.clearTexture();
        for (let item = 0; item < this.textures[i].length; item++) {
            document.querySelector('.color_scheme').innerHTML += `<div class="color_scheme__block" style="background: url(img/div/${this.textures[i][item]});"></div>`;
        }
        this.changeTexture(i);
    }

    changeTexture(i) {
        const colorBlocks = document.querySelectorAll('.color_scheme__block');
        colorBlocks.forEach(val => {
            val.onclick = () => {
                    const arr = val.style.background.split('/');
                    const result=arr[arr.length-1].slice(0,-2);
                    this.textureObjLoader.load(`./models/${result}`, texture => {
                        const mat = this.scene.getObjectByName( this.objects[i].match(/^[^.\W]+/i).shift(), true).children[0].material;
                        mat.map = texture;
                        mat.needsUpdate = true;
                    });
            };
        });
    }

    removeMesh(){
        const obj = this.scene.children.find(child=>child.constructor.name === "Vb");
        this.scene.remove(this.scene.getObjectByName(obj.name));
    }

    clearTexture(){
        const myNode = document.querySelector('.color_scheme');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    render() {
        this.renderer.render(this.scene,this.camera);
        this.controls.update();
        requestAnimationFrame(this.render.bind(this));
    }
}


const slider = new Slider();
slider.settings();
slider.loadMesh(slider.currentObj);
slider.render();


