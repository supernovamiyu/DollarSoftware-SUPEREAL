let slideIndex = 1
let slideInterval

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

function autoSlide() {
  changeSlide(1)
}

function startAutoSlide() {
  stopAutoSlide() 
  slideInterval = setInterval(autoSlide, 2000) 
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex)
  startAutoSlide()

  const carousel = document.querySelector(".carousel-container") 
  carousel.addEventListener("mouseenter", stopAutoSlide)
  carousel.addEventListener("mouseleave", startAutoSlide)
})

