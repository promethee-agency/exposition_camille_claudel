class CountdownTimer {
    constructor() {
      this.date = new Date();
      this.targetDate = this.getNextSeasonDate();
  
      this.$counter = document.querySelector('section.countdown .counter');
      this.$days = this.$counter.querySelector('.days');
      this.$hours = this.$counter.querySelector('.hours');
      this.$minutes = this.$counter.querySelector('.minutes');
      this.$seconds = this.$counter.querySelector('.seconds');
  
      this.init();
    }
  
    init() {
      this.updateCountdown();
      
      setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }
  
    getNextSeasonDate() {
      const currentDate = new Date(this.date);
      const currentMonth = currentDate.getMonth();
      let nextSeasonYear = currentDate.getFullYear();
    
      if (currentMonth >= 0 && currentMonth < 2) {
        // Hiver -> Printemps
        return new Date(nextSeasonYear, 2, 21);
      } else if (currentMonth >= 2 && currentMonth < 5) {
        // Printemps -> Été
        return new Date(nextSeasonYear, 5, 21);
      } else if (currentMonth >= 5 && currentMonth < 8) {
        // Été -> Automne
        return new Date(nextSeasonYear, 8, 21);
      } else {
        // Automne -> Hiver
        return new Date(nextSeasonYear, 11, 21);
      }
    }
  
    updateCountdown() {
      const currentTime = new Date();
      const timeDifference = this.targetDate - currentTime;
  
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      this.$days.innerText = String(days).padStart(2, '0');
      this.$hours.innerText = String(hours).padStart(2, '0');
      this.$minutes.innerText = String(minutes).padStart(2, '0');
      this.$seconds.innerText = String(seconds).padStart(2, '0');
    }
  }
  
  const seasonTimer = new CountdownTimer(); 