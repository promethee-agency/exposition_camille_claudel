const $btnValidDates = document.querySelector('.btn-next');

const $wrapperDates = document.querySelector('section.date-hours');
const $wrapperNbTickets = document.querySelector('section.categories');


// Ajout d'écouteurs d'événements pour détecter les changements dans les boutons radio
$btnValidDates.addEventListener('click', () => {
    $wrapperDates.style.display = 'none';
    $wrapperNbTickets.style.display = 'block'
});


