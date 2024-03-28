class AppScene
{
    constructor (threeAppScene, threeRenderer)
    {
        this.seasons = [
            {
                name: 'spring',
                img: {
                    sunset: null,
                    sun: null,
                    night: null
                }
            },
            {
                name: 'summer',
                img: {
                    sunset: null,
                    sun: null,
                    night: null
                }
            },
            {
                name: 'autumn',
                img: {
                    sunset: null,
                    sun: null,
                    night: null
                }
            },
            {
                name: 'winter',
                img: {
                    sunset: null,
                    sun: null,
                    night: null
                }
            }
        ];

        this.seasonName;
        this.season;
        this.period;

        this.gsapAnimations = [];

        this.scene = threeAppScene;
        this.sceneGroup = new Group();
        this.renderer = threeRenderer;
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.audioListener = new AudioListener();
        this.ambientLight = new AmbientLight(0xffffff, 0.5);

        this.ambientLightIntensity = 2;
        this.fadeIn = 4000;
        this.fadeOut = 2000;
        this.sceneName;

        this.nextAppScene;


        // test pluie
        this.rainState = true;
        this.rainEnabled = false;
        this.cloudParticles = [];
        this.rainParticles = [];
        this.rain;
        this.rainGeo;
        this.rainCount = 12000;
        this.rainDrop;
        this.rainMaterial
    }

    init()
    {
        this.season = this.findSeason(this.seasonName);
        console.log( this.season);

        console.log(this.period);

        // Camera
        this.camera.position.set(-0.01, 0, 0);
        this.camera.add(this.audioListener);

        // Ambient light
        this.sceneGroup.add(this.ambientLight);

        // Sphere
		const sphere = new SphereGeometry(50, 100, 100);
		const texture = new TextureLoader().load(this.season.img[this.period]);
        
        texture.wrapS = RepeatWrapping;
        texture.repeat.x = -1;
		const material = new MeshPhongMaterial({
            map: texture,
            side: DoubleSide
        }); 
		const photoSphere = new Mesh(sphere, material);
		this.sceneGroup.add(photoSphere);

        // Orbit controls
        this.controls.enableZoom = false
        this.controls.enablePan = false

        // Canva and window resizing
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        this.scene = this.sceneGroup;

        // TEST PLUIE
        let positions = [];
        let sizes = [];
        this.rainGeo = new BufferGeometry();
        for (let i = 0; i < this.rainCount; i++) {
            this.rainDrop = new Vector3(
                Math.random() * 400 -200,
				Math.random() * 500 -250, 
				Math.random() * 400 -200
            );
            positions.push(Math.random()* 400 - 200);
            positions.push(Math.random()* 500 - 250);
            positions.push(Math.random()* 400 - 200);
            sizes.push(30);  
        }

        this.rainGeo.setAttribute(
            "position",
            new BufferAttribute(new Float32Array (positions), 3)
        );
        this.rainGeo.setAttribute(
            "size",
            new BufferAttribute(new Float32Array (sizes), 1)
        );
        this.rainMaterial = new PointsMaterial({
            color: 0xaaaaaa,
            size: 0.2,
            transparent: true
        });

        this.rain = new Points(this.rainGeo,this.rainMaterial);
        // this.scene.add(this.rain);

        this.animate();

    }

    findSeason(seasonName) {
        return this.seasons.find((season) => {
            return season.name === seasonName.toLowerCase();
        });
    }

    addGsapAnimation(animation)
    {
        animation.pause();
        this.gsapAnimations.push(animation);
    }

    playGsapAnimations()
    {
        this.gsapAnimations.forEach((animation) => {
            animation.play();
            console.log('played', animation)
        });

        this.gsapAnimations = [];
    }

    setSeasonImage(seasonName, period, imagePath)
    {
        const seasonIndex = this.seasons.findIndex(season => season.name === seasonName.toLowerCase());
        this.seasons[seasonIndex].img[period] = imagePath;
    }

    setCameraFov(fov)
    {
        this.camera.fov = fov;
    }

    animateRain()
    {
        let rainAdded = false;
        
        if (!rainAdded) {
            this.scene.add(this.rain);
            rainAdded = true;
        }
        const time = Date.now() * 0.005;
        this.rainGeo.attributes.size.needsUpdate = true;
    
        this.rain.position.y -= 3; // Vous pouvez ajuster la vitesse de descente ici
    
        if (this.rain.position.y < -250 && this.rainState) { 
            this.rain.position.y = 250; 
        }
    }

    enableRain(state = true) {
        this.rainEnabled = state;
    }

    animate()
    {
        requestAnimationFrame(this.animate.bind(this));

        if (this.rainEnabled) {
            this.animateRain();
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize()
    {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

	buildIn()
	{
        this.init();
        this.playGsapAnimations();

        if (this.sceneName) {
            document.dispatchEvent(new CustomEvent(this.sceneName));
        }

        setTimeout(() => {
            gsap.to(this.ambientLight, this.fadeIn / 1000, {
                intensity: this.ambientLightIntensity
            });
		}, 1000);
	}

	buildOut()
	{
        gsap.to(this.ambientLight, this.fadeOut / 1000, {
            intensity: 0
        });

        this.rainState = false;

        setTimeout(() => {
			this.scene.remove(this.sceneGroup); 
		}, this.fadeOut);

		return this.fadeOut;
	}

    registerNextAppScene(scene)
    {
        this.nextAppScene = scene;
    }

    
}