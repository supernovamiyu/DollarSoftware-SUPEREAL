    import BaseView from "./base.view.js"

    /**
     * Vista para la página de inicio
     */
    class HomeView extends BaseView {
    /**
     * Muestra la página de inicio
     */
    showHomePage() {
        this.showTemplate("plantilla-inicio", "container-principal")
    }

    /**
     * Muestra los productos destacados en la página de inicio
     * @param {Array} products - Lista de productos destacados
     */
    showFeaturedProducts(products) {
        const featuredProductsContainer = document.getElementById("productos-populares")
        if (!featuredProductsContainer) {
        console.error("No se encontró el contenedor de productos destacados")
        return
        }

        featuredProductsContainer.innerHTML = ""

        // Limitar a 4 productos
        const limitedProducts = products.slice(0, 4)

        const productsHTML = limitedProducts
        .map((product) => {
            return `
            <div>
            <img id="imagen-individual-producto" src="${product.imagen_url}" alt="Imagen del producto" width="50%" height="auto" title="Ver los detalles del producto">
            <h3>${product.nombre_producto}</h3>
            <p>Precio: <br> $${product.precio}</p>
            <button class="comprar" data-id="${product.id_productos}" data-unidades-disponibles="${product.unidades_disponibles}">Añadir al carrito</button>
            </div>
        `
        })
        .join("")

        featuredProductsContainer.innerHTML = productsHTML
    }

    /**
     * Inicializa el carrusel de imágenes
     */
    initCarousel() {
        let slideIndex = 1
        const slides = document.querySelectorAll(".carousel-slide")

        if (slides.length === 0) return

        // Función para mostrar un slide específico
        const showSlide = (n) => {
        if (n > slides.length) slideIndex = 1
        if (n < 1) slideIndex = slides.length

        // Ocultar todos los slides
        slides.forEach((slide) => {
            slide.classList.remove("active")
            slide.classList.add("inactive")
        })

        // Mostrar el slide actual
        setTimeout(() => {
            slides[slideIndex - 1].classList.remove("inactive")
            slides[slideIndex - 1].classList.add("active")
        }, 50)
        }

        // Función para cambiar de slide
        window.changeSlide = (n) => {
        showSlide((slideIndex += n))
        }

        // Mostrar el primer slide
        showSlide(slideIndex)

        // Autoplay
        let slideInterval = setInterval(() => {
        showSlide((slideIndex += 1))
        }, 5000)

        // Detener autoplay al pasar el mouse
        const carouselContainer = document.querySelector(".carousel-container")
        if (carouselContainer) {
        carouselContainer.addEventListener("mouseenter", () => {
            clearInterval(slideInterval)
        })

        carouselContainer.addEventListener("mouseleave", () => {
            slideInterval = setInterval(() => {
            showSlide((slideIndex += 1))
            }, 5000)
        })
        }
    }

    /**
     * Configura los eventos para los botones de categoría
     * @param {Function} categoryClickHandler - Función a ejecutar cuando se hace clic en una categoría
     */
    setupCategoryButtons(categoryClickHandler) {
        const categoryButtons = document.querySelectorAll(".categoria-botones")
        categoryButtons.forEach((button) => {
        button.addEventListener("click", categoryClickHandler)
        })
    }
    }

    export default HomeView

