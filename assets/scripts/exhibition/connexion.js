const $btnSignIn = document.querySelector('#sign-in');
const $btnSignUp = document.querySelector('#sign-up');

const $wrapperSignIn = document.querySelector('.wrapper .sign-in');
const $wrapperSignUp = document.querySelector('.wrapper .sign-up');

function updateDisplay() {
    if ($btnSignUp.checked) {
        $wrapperSignIn.style.display = 'none';
        $wrapperSignUp.style.display = 'block';
    } else {
        $wrapperSignIn.style.display = 'block';
        $wrapperSignUp.style.display = 'none';
    }
}

// Ajout d'écouteurs d'événements pour détecter les changements dans les boutons radio
$btnSignIn.addEventListener('change', updateDisplay);
$btnSignUp.addEventListener('change', updateDisplay);

// Appel initial pour mettre à jour l'affichage en fonction de l'état initial des boutons radio
updateDisplay();