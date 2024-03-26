document.querySelector('body').addEventListener('mousemove', function(e) {
    // Obtenez la position de la souris par rapport à l'élément parent
    let mouseX = e.clientX - this.offsetLeft;
    let mouseY = e.clientY - this.offsetTop;

    // Ajustez la position de l'œil en fonction de la position de la souris
    let eye = document.querySelector('.oeil');
    let eyePositionX = (mouseX / this.offsetWidth) * 100;
    let eyePositionY = (mouseY / this.offsetHeight) * 60;

    eye.style.transform = `translate(${eyePositionX - 100}%, ${eyePositionY - 100}%)`;
});
