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
        $splashScreen.style.display = 'block';
    } else {
        $splashScreen.style.display = 'none'; 
    }
}

if (isFirstVisit()) {
    showSplashScreen(true);

    setTimeout(() => {
        $splashScreen.classList.add('fade-out');
        setTimeout(() => {
            showSplashScreen(false);
        }, 500); 
    }, 4000); 

    // BUTTON SKIP INTRO
    $btn.addEventListener('click', () => {        
        $splashScreen.classList.add('fade-out');
        setTimeout(() => {
            showSplashScreen(false);
        }, 500); 
    });
}