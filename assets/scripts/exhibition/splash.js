const isFirstVisit = () => {
    const location = window.location.href;
    const visitState = JSON.parse(localStorage.getItem('app.visitState')) || {};
  
    if (!(location in visitState && visitState[location])) {
        visitState[location] = true;
        localStorage.setItem('app.visitState', JSON.stringify(visitState));
        return true;
    }
  
    return false;
};

const $btn = document.querySelector('.splash > button');
const $splashScreen = document.querySelector('.splash');

// SHOW OR HIDE SPLASH SCREEN
const showSplashScreen = (show = true) => {
    if (show) {
        $splashScreen.style.display = 'flex';
    } else {
        $splashScreen.style.display = 'none'; 
    }
}

if (isFirstVisit()) {
    showSplashScreen(true);

    // REMOVE SPLASH SCREEN AT THE END OF THE VIDEO
    const $video = document.getElementById('splash-tutorial');

    $video.addEventListener('ended', () => {
        $splashScreen.classList.add('fade-out');

        // Attendez la fin de l'animation avant de masquer complètement l'écran de démarrage
        setTimeout(() => {
            showSplashScreen(false);
        }, 500);
    });


    // BUTTON SKIP TUTORIAL
    $btn.addEventListener('click', () => {
        $splashScreen.classList.add('fade-out');

        // Attendez la fin de l'animation avant de masquer complètement l'écran de démarrage
        setTimeout(() => {
            showSplashScreen(false);
        }, 500);
    });
}