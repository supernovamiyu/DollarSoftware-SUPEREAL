let slideIndex = 1
showSlides(slideIndex)

function changeSlide(n) {
    showSlides((slideIndex += n))
}

function showSlides(n) {
    let i
    const slides = document.getElementsByClassName("carousel-slide")
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    slides[slideIndex - 1].style.display = "block"
}

// Asegúrate de que las diapositivas se muestren correctamente al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex)
})