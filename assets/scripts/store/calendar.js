    const calendarContainer = document.querySelector('#calendar');
    const monthContainer = document.querySelector('.month-container');
    const prevBtn = document.querySelector('.arrows button.left');
    const nextBtn = document.querySelector('.arrows button.right');

    function scroll(next = true) {
        let scroll = (!next ? -monthContainer.offsetWidth : monthContainer.offsetWidth);
        calendarContainer.scrollBy({
            left: scroll,
            behavior: 'smooth'
        });
    }

    prevBtn.addEventListener('click', function () {
        scroll(false);
    });

    nextBtn.addEventListener('click', function () {
        scroll(true);
    });