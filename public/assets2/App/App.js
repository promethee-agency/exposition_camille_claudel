class App
{
	constructor()
	{
		this.threeAppScene = new Scene();
		this.threeRenderer = new WebGLRenderer({ antialias: true });

		this.init()
	}

	init()
	{
		this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector('.three').appendChild(this.threeRenderer.domElement);


		////// SCENE 1 ////////
		const scene1 = new AppScene(this.threeAppScene, this.threeRenderer);
		scene1.setSeasonImage('spring', 'sun', '/assets2/img/ete_jour.jpg');
		scene1.setSeasonImage('spring', 'sunset', '/assets2/img/ete_coucher_soleil.jpg');
		scene1.setSeasonImage('spring', 'night', '/assets2/img/ete_nuit2.jpg');

		scene1.setSeasonImage('summer', 'sun', '/assets2/img/ete_jour.jpg');
		scene1.setSeasonImage('summer', 'sunset', '/assets2/img/ete_coucher_soleil.jpg');
		scene1.setSeasonImage('summer', 'night', '/assets2/img/ete_nuit2.jpg');

		scene1.setSeasonImage('autumn', 'sun', '/assets2/img/automne.jpg');
		scene1.setSeasonImage('autumn', 'sunset', '/assets2/img/automne_coucher_soleil.jpg');
		scene1.setSeasonImage('autumn', 'night', '/assets2/img/ete_nuit2.jpg');

		scene1.setSeasonImage('winter','sun', '/assets2/img/hiver_jour.jpg');
		scene1.setSeasonImage('winter', 'sunset','/assets2/img/hiver_coucher_soleil.jpg');
		scene1.setSeasonImage('winter','night', '/assets2/img/ete_nuit2.jpg');
		scene1.setCameraFov(100);
		scene1.sceneName = 'scene1';


	fetch(`https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.6&current=is_day,rain,weather_code,cloud_cover&hourly=rain,weather_code,is_day,sunshine_duration&daily=sunrise,sunset&forecast_days=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data);    

        // FUNCTION TO KNOW IF IT'S RAINY OR SUNNY
        function isRainy (data) {
            let rain;
            if (data["current"]["rain"] > 0) {
                rain = true;
            } else {
                rain = false;
            }
            return rain;
        }

		if (isRainy(data)) {
			scene1.enableRain(true);
		}
	})
		
		

		
		// AUDIO
		const sound1 = new PositionalAudio( scene1.audioListener );
		const audioLoader = new AudioLoader();
		audioLoader.load( '/assets2/audio_expo/SCENE-001.mp3', function( buffer ) {
			sound1.setBuffer( buffer );
			sound1.setRefDistance( 20 );
		});

		const sphere = new SphereGeometry( 20, 32, 16 );
		const material = new MeshPhongMaterial( { color: 0xff2200 } );
		const mesh1 = new Mesh( sphere, material );
		mesh1.position.set( -2, 0, -5);
		scene1.sceneGroup.add( mesh1 );
		mesh1.add( sound1 );

		document.addEventListener('threetouch', function() {
			sound1.play();
		});


		// LE BUSTE DE FEMME
		const loaderMere = new TextureLoader();
		const materialMere = new MeshLambertMaterial({
			map: loaderMere.load('/assets2/img/buste_mere.png'),
			transparent: true, 
		});
		const geometryMere = new PlaneGeometry(1, 1);
		const mere = new Mesh(geometryMere, materialMere);
		mere.position.set( -2, 0, -5);
		mere.scale.set( 3, 3, 3);
		scene1.sceneGroup.add(mere);


		////// SCENE 2 ////////
		const scene2 = new AppScene(this.threeAppScene, this.threeRenderer);
		scene2.setSeasonImage('spring', 'sun', '/assets2/img/market.jpg');
		scene2.setSeasonImage('spring', 'sunset', '/assets2/img/market.jpg');
		scene2.setSeasonImage('spring', 'night', '/assets2/img/market.jpg');

		scene2.setSeasonImage('summer', 'sun', '/assets2/img/market.jpg');
		scene2.setSeasonImage('summer', 'sunset', '/assets2/img/market.jpg');
		scene2.setSeasonImage('summer', 'night', '/assets2/img/market.jpg');

		scene2.setSeasonImage('autumn', 'sun', '/assets2/img/market.jpg');
		scene2.setSeasonImage('autumn', 'sunset', '/assets2/img/market.jpg');
		scene2.setSeasonImage('autumn', 'night', '/assets2/img/market.jpg');

		scene2.setSeasonImage('winter','sun', '/assets2/img/market.jpg');
		scene2.setSeasonImage('winter', 'sunset','/assets2/img/market.jpg');
		scene2.setSeasonImage('winter','night', '/assets2/img/market.jpg');

		scene2.sceneName = 'scene2';

		// SOUND SCENE 2
		const sound2 = new PositionalAudio( scene2.audioListener );
		const audioLoader2 = new AudioLoader();
		audioLoader.load( '/assets2/audio_expo/SCENE-002.mp3', function( buffer ) {
			sound2.setBuffer( buffer );
			sound2.setRefDistance( 20 );
		});
		const sphere2 = new SphereGeometry( 20, 32, 16 );
		const material2 = new MeshPhongMaterial( { color: 0xff2200 } );
		const mesh2 = new Mesh( sphere2, material2 );
		mesh2.position.set( 1, 0, -10);
		scene2.sceneGroup.add( mesh2 );
		mesh2.add( sound2 );

		document.addEventListener('scene2', function() {
			sound2.play();
		});

		// DIEU ENVOLE
		const loaderDieuEnvole = new TextureLoader();
		const materialDieuEnvole = new MeshLambertMaterial({
			map: loaderDieuEnvole.load('/assets2/img/dieu_envole.png'),
			transparent: true, 
		});
		const geometryDieuEnvole = new PlaneGeometry(5, 5);
		const dieuEnvole = new Mesh(geometryDieuEnvole, materialDieuEnvole);
		dieuEnvole.position.set( 0.5, 0, -10 );
		dieuEnvole.scale.set( 1.1, 1.1, 1.1);
		scene2.sceneGroup.add(dieuEnvole);

		// LA PETITE CHATELAINE
		const loaderChatelaine = new TextureLoader();
		const materialChatelaine = new MeshLambertMaterial({
			map: loaderChatelaine.load('/assets2/img/petite_chatelaine2.png'),
			transparent: true, 
		});
		const geometryChatelaine = new PlaneGeometry(1, 1);
		const chatelaine = new Mesh(geometryChatelaine, materialChatelaine);
		chatelaine.scale.set( 10, 10, 10);
		chatelaine.position.set( 25, 0, 0);
		chatelaine.rotation.set(
			MathUtils.degToRad(0),
			MathUtils.degToRad(-90),
			MathUtils.degToRad(0)
		);
		scene2.sceneGroup.add(chatelaine);
		scene1.registerNextAppScene(scene2);
		

		////// SCENE 3 ////////
		const scene3 = new AppScene(this.threeAppScene, this.threeRenderer);
		scene3.setSeasonImage('spring', 'sun', '/assets2/img/studio2.jpg');
		scene3.setSeasonImage('spring', 'sunset', '/assets2/img/studio2.jpg');
		scene3.setSeasonImage('spring', 'night', '/assets2/img/studio2.jpg');

		scene3.setSeasonImage('summer', 'sun', '/assets2/img/studio2.jpg');
		scene3.setSeasonImage('summer', 'sunset', '/assets2/img/studio2.jpg');
		scene3.setSeasonImage('summer', 'night', '/assets2/img/studio2.jpg');

		scene3.setSeasonImage('autumn', 'sun', '/assets2/img/studio2.jpg');
		scene3.setSeasonImage('autumn', 'sunset', '/assets2/img/studio2.jpg');
		scene3.setSeasonImage('autumn', 'night', '/assets2/img/studio2.jpg');

		scene3.setSeasonImage('winter','sun', '/assets2/img/studio2.jpg');
		scene3.setSeasonImage('winter', 'sunset','/assets2/img/studio2.jpg');
		scene3.setSeasonImage('winter','night', '/assets2/img/studio2.jpg');
		
		scene3.sceneName = 'scene3';

		// SOUND SCENE 3
		const sound3 = new PositionalAudio( scene3.audioListener );
		const audioLoader3 = new AudioLoader();
		audioLoader3.load( '/assets2/audio_expo/SCENE-003.mp3', function( buffer ) {
			sound3.setBuffer( buffer );
			sound3.setRefDistance( 20 );
		});
		const sphere3 = new SphereGeometry( 20, 32, 16 );
		const material3 = new MeshPhongMaterial( { color: 0xff2200, transparent: true, opacity: 0 } );
		const mesh3 = new Mesh( sphere3, material3 );
		mesh3.position.set( -15, -15, -10);
		scene3.sceneGroup.add( mesh3 );
		mesh3.add( sound3 );

		document.addEventListener('scene3', function() {
			sound3.play();
		});

		// GROUPE CADRE GAUCHE ET SCULPTURE RODIN
		const cadreRodin = new Group();

		// CHARGEMENT DU CADRE A GAUCHE
		const loaderCadreGauche = new GLTFLoader();
		loaderCadreGauche.load('/assets2/img/cadre.gltf', function (gltf) {
			const textureLoader = new TextureLoader();
			textureLoader.load('/assets2/img/or.jpg', function(texture) { 
				const content = gltf.scene;

				content.traverse( function ( child ) {
					if ( child.isMesh ) {
						if (!child.material.map){
						child.material.map = texture;
						child.material.map.needsUpdate = true;
						}
					}
				
				})
				
				// POSITION DU CADRE A GAUCHE
				content.position.set( -12, 3, -15 );
				content.scale.set( 4, 4, 4 );
				content.rotation.set(
					MathUtils.degToRad(-90),
					MathUtils.degToRad(-90),
					MathUtils.degToRad(180)
				);
				cadreRodin.add(content)
			})
		})

		// FEMME ACCROUPIE RODIN
		const loaderRodin = new TextureLoader();
		const materialRodin = new MeshLambertMaterial({
			map: loaderRodin.load('/assets2/img/femme_accroupie_rodin.png'),
			transparent: true, 
		});
		const geometryRodin = new PlaneGeometry(5, 5);
		const femmeAccroupieRodin = new Mesh(geometryRodin, materialRodin);
		femmeAccroupieRodin.position.set( -4, 1.8, -5 );
		femmeAccroupieRodin.scale.set( 0.26, 0.26, 0.26);
		cadreRodin.add(femmeAccroupieRodin);
		scene3.sceneGroup.add(cadreRodin);


		// GROUPE CADRE DROITE ET SCULPTURE CAMILLE
		const cadreCamille = new Group();

		// CHARGEMENT DU CADRE A DROITE
		const loaderCadreDroite = new GLTFLoader();
		loaderCadreDroite.load('/assets2/img/cadre.gltf', function (gltf) {
			const textureLoader = new TextureLoader();
			textureLoader.load('/assets2/img/or.jpg', function(texture) { 
				const content = gltf.scene;

				content.traverse( function ( child ) {
					if ( child.isMesh ) {
						if (!child.material.map){
						child.material.map = texture;
						child.material.map.needsUpdate = true;
						}
					}
				
				})

				// POSITION DU CADRE A DROITE
				content.position.set( 0, 3, -15 );
				content.scale.set( 4, 4, 4 );
				content.rotation.set(
					MathUtils.degToRad(-95),
					MathUtils.degToRad(-90),
					MathUtils.degToRad(180)
				);

				cadreCamille.add(content);
			})
		})

		// FEMME ACCROUPIE CAMILLE
		const loaderCamille = new TextureLoader();
		const materialCamille = new MeshLambertMaterial({
			map: loaderCamille.load('/assets2/img/femme_accroupie_camille.png'),
			transparent: true, 
		});
		const geometryCamille = new PlaneGeometry(5, 5);
		const femmeAccroupieCamille = new Mesh(geometryCamille, materialCamille);
		femmeAccroupieCamille.position.set( 0, 1.7, -5 );
		femmeAccroupieCamille.scale.set( 0.26, 0.26, 0.26);
		cadreCamille.add(femmeAccroupieCamille);
		scene3.sceneGroup.add(cadreCamille);

		// CHARGEMENT DE L'AGE MUR
		const loader = new STLLoader();
		loader.load( '/assets2/img/age-mur.stl', function ( geometry ) {

			const material = new MeshPhongMaterial( { color: 0x33302A, specular: 0x494949, shininess: 200 } );
			const mesh = new Mesh( geometry, material );

			mesh.position.set( -15, -15, -10 );
			// mesh.position.set( -70, -50, -10 );
			mesh.rotation.set(
				MathUtils.degToRad(-90),
				MathUtils.degToRad(0),
				MathUtils.degToRad(180)
			);
			mesh.scale.set( 0.15, 0.15, 0.15 );
			// mesh.castShadow = true;
			// mesh.receiveShadow = true;

			scene3.sceneGroup.add( mesh );
		} );

		//// LUMIERES
		// LUMIERE DU SOLEIL 1
		const directionalLight1 = new DirectionalLight(0xffffff, 7); // Couleur, Intensité
		directionalLight1.position.set(5, 1, 0); // Direction de la lumière
		scene3.sceneGroup.add(directionalLight1);

		// LUMIERE DU SOLEIL 2
		const directionalLight2 = new DirectionalLight(0xffffff, 2); // Couleur, Intensité
		directionalLight1.position.set(5, 1, 3); // Direction de la lumière
		scene3.sceneGroup.add(directionalLight2);
		scene2.registerNextAppScene(scene3);

		////// SCENE 4 ////////
		const scene4 = new AppScene(this.threeAppScene, this.threeRenderer);
		scene4.setSeasonImage('spring', 'sun', '/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('spring', 'sunset', '/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('spring', 'night', '/assets2/img/abandon_hall.jpg');

		scene4.setSeasonImage('summer', 'sun', '/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('summer', 'sunset', '/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('summer', 'night', '/assets2/img/abandon_hall.jpg');

		scene4.setSeasonImage('autumn', 'sun', '/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('autumn', 'sunset', '/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('autumn', 'night', '/assets2/img/abandon_hall.jpg');

		scene4.setSeasonImage('winter','sun', '/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('winter', 'sunset','/assets2/img/abandon_hall.jpg');
		scene4.setSeasonImage('winter','night', '/assets2/img/abandon_hall.jpg');

		scene4.sceneName = 'scene4';

		// SOUND SCENE 4
		const sound4 = new PositionalAudio( scene1.audioListener );
		const audioLoader4 = new AudioLoader();
		audioLoader4.load( '/assets2/audio_expo/SCENE-004.mp3', function( buffer ) {
			sound4.setBuffer( buffer );
			sound4.setRefDistance( 20 );
		});
		const sphere4 = new SphereGeometry( 20, 32, 16 );
		const material4 = new MeshPhongMaterial( { color: 0xff2200, transparent: true, opacity: 0 } );
		const mesh4 = new Mesh( sphere4, material4 );
		mesh4.position.set( -45, -10, -40);
		scene4.sceneGroup.add( mesh4 );
		mesh4.add( sound4 );
	
		document.addEventListener('scene4', function() {
			sound4.play();
		});

		// CHARGEMENT DE LA VALSE
		const loaderValse = new GLTFLoader();
		loaderValse.load('/assets2/img/valse/scene.gltf', function (gltf) {
			const content = gltf.scene;
			
			content.position.set( -45, -10, -40 );
			content.scale.set( 0.08, 0.08, 0.08 );
			content.rotation.set(
				MathUtils.degToRad(0),
				MathUtils.degToRad(45),
				MathUtils.degToRad(0)
			);

			scene4.sceneGroup.add(content)
		})

		// TETE ECLATEE
		const loaderTete = new TextureLoader();
		const materialTete = new MeshLambertMaterial({
			map: loaderTete.load('/assets2/img/tete_cassee.png'),
			transparent: true, 
		});
		const geometryTete = new PlaneGeometry(1, 1);
		const tete = new Mesh(geometryTete, materialTete);
		tete.position.set(4, -2, 0.5);
		tete.scale.set( 1, 1, 1);
		tete.rotation.set(
			MathUtils.degToRad(0),
			MathUtils.degToRad(-90),
			MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(tete);

		// TETE ECLATEE 2
		const loaderTete2 = new TextureLoader();
		const materialTete2 = new MeshLambertMaterial({
			map: loaderTete2.load('/assets2/img/tete_cassee2.png'),
			transparent: true, 
		});
		const geometryTete2 = new PlaneGeometry(1, 1);
		const tete2 = new Mesh(geometryTete2, materialTete2);
		tete2.position.set(2, -2, 4);
		tete2.scale.set( 1, 1, 1);
		tete2.rotation.set(
			MathUtils.degToRad(0),
			MathUtils.degToRad(-90),
			MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(tete2);

		// CORPS ECLATE  1
		const loaderBrise1 = new TextureLoader();
		const materialBrsie1 = new MeshLambertMaterial({
			map: loaderBrise1.load('/assets2/img/bout_brise.png'),
			transparent: true, 
		});
		const geometryBrise1 = new PlaneGeometry(1, 1);
		const brise1 = new Mesh(geometryBrise1, materialBrsie1);
		brise1.position.set(3, -1.5, 4);
		brise1.scale.set( 2.5, 2.5, 2.5);
		brise1.rotation.set(
			MathUtils.degToRad(0),
			MathUtils.degToRad(-90),
			MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(brise1);

		// BOUT ECLATE  2
		const loaderBrise2 = new TextureLoader();
		const materialBrsie2 = new MeshLambertMaterial({
			map: loaderBrise2.load('/img/bout_brise2.png'),
			transparent: true, 
		});
		const geometryBrise2 = new PlaneGeometry(1, 1);
		const brise2 = new Mesh(geometryBrise2, materialBrsie2);
		brise2.position.set(6, -1.5, 2);
		brise2.scale.set( 0.5, 0.5, 0.5);
		brise2.rotation.set(
			MathUtils.degToRad(0),
			MathUtils.degToRad(-90),
			MathUtils.degToRad(0)
		);
		scene4.sceneGroup.add(brise2);

		scene3.registerNextAppScene(scene4);

		// AXE D'AIDE
		// const axesHelper = new AxesHelper( 5 );
		// scene4.sceneGroup.add( axesHelper );
		// const size = 100;
		// const divisions = 20;
		// const gridHelper = new GridHelper( size, divisions );
		// gridHelper.position.set( 0, -5, 0 );
		// scene4.sceneGroup.add( gridHelper );

		const sceneController = new AppSceneController(this.threeAppScene);
		sceneController.play(scene1);

		// // GERER LE STEP SOUND
		// let currentSound = sound1;
		// let currentAppSceneIndex = 1;

		// function switchAppScene(sceneIndex) {
		// 	if (currentSound) {
		// 		currentSound.stop();
		// 	}
		// 	switch (sceneIndex) {
		// 		case 2:
		// 			currentSound = sound2;
		// 			break;
		// 		case 3:
		// 			currentSound = sound3;
		// 			break;
		// 		case 4:
		// 			currentSound = sound4;
		// 			break;
		// 		default:
		// 			currentSound = null;
		// 			break;
		// 	}

		// 	if (currentSound) {
		// 		currentSound.play();
		// 	}
		// }



		document.querySelector('button.next6578').addEventListener('click', () => {
			sceneController.playNext();
			// currentAppSceneIndex++;
    		// switchAppScene(currentAppSceneIndex);
		});

	}
			

}

const app = new App();