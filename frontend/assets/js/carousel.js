// Variables globales
let slideIndex = 1
let slideInterval
const transitionTime = 200 // Tiempo de transición en ms
const autoSlideTime = 4000 // Tiempo entre slides automáticos en ms
let carouselInitialized = false // Para evitar inicializaciones múltiples

/**
 * Cambia al slide siguiente o anterior
 * @param {number} n - Dirección del cambio (1 para siguiente, -1 para anterior)
 */
function changeSlide(n) {
  showSlides((slideIndex += n))
}

/**
 * Cambia directamente a un slide específico
 * @param {number} n - Número del slide a mostrar
 */
function currentSlide(n) {
  showSlides((slideIndex = n))
}

/**
 * Muestra el slide correspondiente con transición
 * @param {number} n - Índice del slide a mostrar
 */
function showSlides(n) {
  const slides = document.querySelectorAll(".carousel-slide")
  const dots = document.querySelectorAll(".carousel-dot")

  // Si no hay slides, salir
  if (slides.length === 0) return

  // Validar el índice
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  // Ocultar todos los slides con transición
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active")
    slides[i].classList.add("inactive")
  }

  // Actualizar los indicadores
  if (dots.length > 0) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active")
    }
    dots[slideIndex - 1].classList.add("active")
  }

  // Mostrar el slide actual con transición
  if (slides.length > 0 && slideIndex > 0 && slideIndex <= slides.length) {
    setTimeout(() => {
      slides[slideIndex - 1].classList.remove("inactive")
      slides[slideIndex - 1].classList.add("active")
    }, 50) // Pequeño retraso para que la transición sea visible
  } else {
    console.error("Índice de slide inválido o no hay slides disponibles.")
  }
}

/**
 * Avanza al siguiente slide automáticamente
 */
function autoSlide() {
  changeSlide(1)
}

/**
 * Inicia el desplazamiento automático
 */
function startAutoSlide() {
  stopAutoSlide()
  slideInterval = setInterval(autoSlide, autoSlideTime)
}

/**
 * Detiene el desplazamiento automático
 */
function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
}

/**
 * Inicializa el carrusel
 * @param {boolean} force - Forzar la inicialización incluso si ya se ha inicializado
 */
function initCarousel(force = false) {
  const carouselContainer = document.querySelector(".carousel-container")
  if (!carouselContainer) {
    console.log("No se encontró el contenedor del carrusel. Se intentará más tarde.")
    return false
  }

  const slides = carouselContainer.querySelectorAll(".carousel-slide")
  if (slides.length === 0) {
    console.log("No se encontraron slides en el carrusel. Se intentará más tarde.")
    return false
  }

  // Si ya está inicializado y no se fuerza, salir
  if (carouselContainer.dataset.initialized === "true" && !force) {
    console.log("El carrusel ya está inicializado.")
    return true
  }

  console.log("Inicializando carrusel con", slides.length, "slides")

  // Marcar como inicializado
  carouselContainer.dataset.initialized = "true"

  // Crear indicadores (dots) si no existen
  if (!carouselContainer.querySelector(".carousel-dots")) {
    const dotsContainer = document.createElement("div")
    dotsContainer.className = "carousel-dots"

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("div")
      dot.className = "carousel-dot"
      dot.addEventListener("click", () => {
        currentSlide(i + 1)
      })
      dotsContainer.appendChild(dot)
    }

    carouselContainer.appendChild(dotsContainer)
  }

  // Configurar el primer slide como activo
  slideIndex = 1 // Reiniciar el índice
  showSlides(slideIndex)

  // Iniciar autoplay
  startAutoSlide()

  // Detener autoplay al pasar el mouse
  carouselContainer.addEventListener("mouseenter", stopAutoSlide)
  carouselContainer.addEventListener("mouseleave", startAutoSlide)

  // Soporte para dispositivos táctiles
  let touchStartX = 0
  let touchEndX = 0

  carouselContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
    },
    { passive: true },
  )

  carouselContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    },
    { passive: true },
  )

  function handleSwipe() {
    const swipeThreshold = 50 // Umbral mínimo para considerar un swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe izquierda (siguiente slide)
      changeSlide(1)
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe derecha (slide anterior)
      changeSlide(-1)
    }
  }

  return true
}

/**
 * Intenta inicializar el carrusel varias veces hasta que tenga éxito
 */
function tryInitCarousel() {
  // Si ya está inicializado, no hacer nada
  if (carouselInitialized) return

  // Intentar inicializar
  if (initCarousel()) {
    carouselInitialized = true
  } else {
    // Si falla, intentar de nuevo después de un tiempo
    setTimeout(tryInitCarousel, 500)
  }
}

/**
 * Inicializa el carrusel después de que se carga una plantilla
 * Esta función debe ser llamada después de que el contenido del template
 * se haya clonado e insertado en el DOM
 */
function initCarouselAfterTemplateLoad() {
  console.log("Inicializando carrusel después de cargar la plantilla")
  carouselInitialized = false // Reiniciar el estado
  tryInitCarousel()
}

// Inicializar el carrusel cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Intentar inicializar el carrusel
  tryInitCarousel()
})

// Exponer funciones globalmente
window.changeSlide = changeSlide
window.currentSlide = currentSlide
window.startAutoSlide = startAutoSlide
window.stopAutoSlide = stopAutoSlide
window.initCarouselAfterTemplateLoad = initCarouselAfterTemplateLoad

