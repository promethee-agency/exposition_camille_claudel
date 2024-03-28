class AppSceneController
{
	constructor (threeAppScene)
	{
		this.date = new Date();
		// this.date = new Date('January 26, 2024 14:30:00');
        this.threeAppScene = threeAppScene;
		this.scene = null;

		this.userInteraction = false;
	}

	getCurrentSeasonName() {
		const currentDate = new Date(this.date);
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth();
	  
		if (currentMonth === 0 && currentDay >= 21 || currentMonth === 1 || currentMonth === 2 && currentDay < 21) {
		  return 'winter';
		} else if (currentMonth === 2 && currentDay >= 21 || currentMonth === 3 || currentMonth === 4 && currentDay < 21) {
		  return 'spring';
		} else if (currentMonth === 4 && currentDay >= 21 || currentMonth === 5 || currentMonth === 6 && currentDay < 21) {
		  return 'summer';
		} else {
		  return 'autumn';
		}
	}

	getTimePeriod(season) {
		const currentHour = this.date.getHours();
		switch (season) {
			case 'winter':
				if (currentHour >= 9 && currentHour < 16) {
					return 'sun';
				} else if (currentHour >= 16 && currentHour < 17) {
					return 'sunset';
				} else {
					return 'night';
				}
			case 'spring':
				if (currentHour >= 7 && currentHour < 18) {
					return 'sun';
				} else if (currentHour >= 18 && currentHour < 19) {
					return 'sunset';
				} else {
					return 'night';
				}
			case 'summer':
				if (currentHour >= 6 && currentHour < 19) {
					return 'day';
				} else if (currentHour >= 19 && currentHour < 20) {
					return 'sunset';
				} else {
					return 'night';
				}
			case 'autumn':
				if (currentHour >= 7 && currentHour < 17) {
					return 'sun';
				} else if (currentHour >= 17 && currentHour < 18) {
					return 'sunset';
				} else {
					return 'night';
				}
			default:
				return 'sun';
		}
	}
	

	play(newAppScene)
	{
		let delay = 0;

		if (this.scene) {
			delay = this.scene.buildOut();

			this.scene.sceneGroup.traverse((object) => {
				if (object.getOutput && typeof object.getOutput === 'function') {
					object.stop();
				}
			});
		}

		this.scene = newAppScene;
		this.scene.seasonName = this.getCurrentSeasonName();
		this.scene.period = this.getTimePeriod(this.getCurrentSeasonName());
		
		setTimeout(() => {
			this.scene.buildIn();

			console.log(this.scene.sceneGroup);

			if (!this.userInteraction) {
				this.scene.controls.addEventListener('change', () => {
					if (!this.userInteraction) {
						this.userInteraction = true;
						document.dispatchEvent(new CustomEvent('threetouch'));
					}
				});
			}
		}, delay);
	}

	playNext()
	{
		this.play(this.scene.nextAppScene);
	}
}