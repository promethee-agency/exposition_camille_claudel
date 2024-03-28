const $btnValidDates = document.querySelector('.btn-next');

const $wrapperDates = document.querySelector('section.date-hours');
const $wrapperNbTickets = document.querySelector('section.categories');
const $btnNavDates = document.querySelector('.stepper button.dates');

const stepperItems = document.querySelectorAll('.stepper button');

// AU CLIC SUR LE BTNNAVDATES
$btnNavDates.addEventListener('click', () => {
    if (!$wrapperDates.classList.contains('active')) {
        // Je met a jour ma nav
        stepperItems[0].querySelector('p').classList.add('current');
        stepperItems[1].querySelector('p').classList.remove('current')

        $wrapperNbTickets.classList.add('fade-out');
        setTimeout(() => {
            $wrapperNbTickets.classList.remove('active');
        }, 300);
        $wrapperDates.classList.add('active');
    }
});


// AU CLIC SUR LE BOUTON VALIDER DE LA PARTIE DATE
$btnValidDates.addEventListener('click', () => {
    const fieldsets = document.querySelectorAll('.date-hours fieldset');
    let isValid = true;

    fieldsets.forEach(fieldset => {
        const checkedInputs = fieldset.querySelectorAll('input[type="radio"]:checked');
        // Vérifier s'il y a au moins un élément coché dans ce fieldset
        if (checkedInputs.length === 0) {
            isValid = false;
        }
    });
    if (isValid) {

        // JE MET A JOUR MA NAV SECONDAIRE
        stepperItems[0].querySelector('.step').innerHTML = '&#x2713'; // Mettre le symbole de vérification
        stepperItems[0].querySelector('.step').classList.add('check'); // Ajouter la classe check
        stepperItems[0].querySelector('p').classList.remove('current');
        stepperItems[1].querySelector('p').classList.add('current')

        $wrapperDates.classList.add('fade-out');
        setTimeout(() => {
            $wrapperDates.classList.remove('active');
        }, 300);
        $wrapperNbTickets.classList.add('active');
    } else {
        var errorParagraph = document.querySelector('p.error');
        errorParagraph.classList.add('active');
    }
});



