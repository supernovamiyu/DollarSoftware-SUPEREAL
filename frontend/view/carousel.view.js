    // CarouselView.js - Vista para el carrusel de imágenes
    import { BaseView } from "./base.view.js"

    class CarouselView extends BaseView {
    constructor() {
        super()
        this.slideIndex = 1
        this.slideInterval = null
        this.transitionTime = 200 // Tiempo de transición en ms
        this.autoSlideTime = 5000 // Tiempo entre slides automáticos en ms
        this.initialized = false
    }

    // Inicializar el carrusel
    initCarousel(force = false) {
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
        this.initialized = true

        // Crear indicadores (dots) si no existen
        if (!carouselContainer.querySelector(".carousel-dots")) {
        const dotsContainer = document.createElement("div")
        dotsContainer.className = "carousel-dots"

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement("div")
            dot.className = "carousel-dot"
            dot.dataset.index = i + 1
            dotsContainer.appendChild(dot)
        }

        carouselContainer.appendChild(dotsContainer)
        }

        // Configurar el primer slide como activo
        this.slideIndex = 1 // Reiniciar el índice
        this.showSlides(this.slideIndex)

        // Iniciar autoplay
        this.startAutoSlide()

        // Configurar eventos
        this.setupEvents(carouselContainer)

        return true
    }

    // Configurar eventos del carrusel
    setupEvents(carouselContainer) {
        // Detener autoplay al pasar el mouse
        carouselContainer.addEventListener("mouseenter", () => this.stopAutoSlide())
        carouselContainer.addEventListener("mouseleave", () => this.startAutoSlide())

        // Configurar clicks en los dots
        const dots = carouselContainer.querySelectorAll(".carousel-dot")
        dots.forEach((dot, index) => {
        dot.addEventListener("click", () => this.currentSlide(index + 1))
        })

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
            this.handleSwipe(touchStartX, touchEndX)
        },
        { passive: true },
        )
    }

    // Manejar el deslizamiento táctil
    handleSwipe(touchStartX, touchEndX) {
        const swipeThreshold = 50 // Umbral mínimo para considerar un swipe
        if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe izquierda (siguiente slide)
        this.changeSlide(1)
        } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe derecha (slide anterior)
        this.changeSlide(-1)
        }
    }

    // Cambiar al slide siguiente o anterior
    changeSlide(n) {
        this.showSlides((this.slideIndex += n))
    }

    // Cambiar directamente a un slide específico
    currentSlide(n) {
        this.showSlides((this.slideIndex = n))
    }

    // Mostrar el slide correspondiente con transición
    showSlides(n) {
        const slides = document.querySelectorAll(".carousel-slide")
        const dots = document.querySelectorAll(".carousel-dot")

        // Si no hay slides, salir
        if (slides.length === 0) return

        // Validar el índice
        if (n > slides.length) {
        this.slideIndex = 1
        }
        if (n < 1) {
        this.slideIndex = slides.length
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
        dots[this.slideIndex - 1].classList.add("active")
        }

        // Mostrar el slide actual con transición
        if (slides.length > 0 && this.slideIndex > 0 && this.slideIndex <= slides.length) {
        setTimeout(() => {
            slides[this.slideIndex - 1].classList.remove("inactive")
            slides[this.slideIndex - 1].classList.add("active")
        }, 50) // Pequeño retraso para que la transición sea visible
        } else {
        console.error("Índice de slide inválido o no hay slides disponibles.")
        }
    }

    // Avanzar al siguiente slide automáticamente
    autoSlide() {
        this.changeSlide(1)
    }

    // Iniciar el desplazamiento automático
    startAutoSlide() {
        this.stopAutoSlide()
        this.slideInterval = setInterval(() => this.autoSlide(), this.autoSlideTime)
    }

    // Detener el desplazamiento automático
    stopAutoSlide() {
        if (this.slideInterval) {
        clearInterval(this.slideInterval)
        }
    }

    // Intentar inicializar el carrusel varias veces hasta que tenga éxito
    tryInitCarousel() {
        // Si ya está inicializado, no hacer nada
        if (this.initialized) return

        // Intentar inicializar
        if (this.initCarousel()) {
        this.initialized = true
        } else {
        // Si falla, intentar de nuevo después de un tiempo
        setTimeout(() => this.tryInitCarousel(), 500)
        }
    }

    // Inicializar el carrusel después de que se carga una plantilla
    initCarouselAfterTemplateLoad() {
        console.log("Inicializando carrusel después de cargar la plantilla")
        this.initialized = false // Reiniciar el estado
        this.tryInitCarousel()
    }
    }

    export { CarouselView }

