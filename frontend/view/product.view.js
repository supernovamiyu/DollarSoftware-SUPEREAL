import BaseView from "./base.view.js"

/**
 * Vista para los productos
 */
class ProductView extends BaseView {
    /**
     * Muestra los productos por categoría
     * @param {Array} products - Lista de productos
     * @param {string} categoryName - Nombre de la categoría
     */
    showProductsByCategory(products, categoryName) {
        if (this.showTemplate("plantilla-categorias-productos", "container-principal")) {
            const categoryTitle = document.getElementById("titulo-seccion-categoria")
            const productsContainer = document.getElementById("productos-categorias")

            if (!categoryTitle || !productsContainer) {
                console.error("No se encontraron los contenedores necesarios")
                return
            }

            categoryTitle.innerHTML = `<h2 style="width: 100%; text-align: center">${categoryName}</h2>`
            productsContainer.innerHTML = ""

            if (!products.length) {
                productsContainer.innerHTML = "<p>No hay productos disponibles en esta categoría</p>"
                return
            }

            const productsHTML = products
                .map((product) => {
                    return `
            <div class="contenedor-producto">
                <img style="cursor: pointer" class="imagen-individual-producto" src="${product.imagen_url}" alt="${product.nombre_producto}" width="50%" height="auto" title="Ver los detalles del producto">
                <h3>${product.nombre_producto}</h3>
                <p>Precio: <br>$${product.precio}</p>
                <button class="comprar" data-id="${product.id_productos}" data-unidades-disponibles="${product.unidades_disponibles}">Añadir al carrito</button>
            </div>
            `
                })
                .join("")

            productsContainer.innerHTML = productsHTML

            // Actualizar la URL
            this.updateURL(`/categoria/${products[0]?.id_categoria || ""}`)
        }
    }

    /**
     * Muestra los resultados de búsqueda
     * @param {Array} products - Lista de productos encontrados
     * @param {string} searchTerm - Término de búsqueda
     */
    showSearchResults(products, searchTerm) {
        // Validar el término de búsqueda primero
        if (!searchTerm || typeof searchTerm !== "string") {
            this.showMessage("Término de búsqueda inválido", "error")
            return
        }

        const trimmedSearchTerm = searchTerm.trim()

        if (!this.showTemplate("plantilla-resultados-productos", "container-principal")) {
            this.showMessage("Error al cargar la plantilla de resultados", "error")
            return
        }

        const resultsContainer = document.getElementById("resultados-productos")
        if (!resultsContainer) {
            console.error("No se encontró el contenedor de resultados")
            return
        }

        // Limpiar y mostrar estado inicial
        resultsContainer.innerHTML = "<div class='loading'>Buscando productos...</div>"

        // Simular pequeño retraso para evitar parpadeo
        setTimeout(() => {
            resultsContainer.innerHTML = ""

            if (!products || !Array.isArray(products)) {
                this.showMessage("Error en los datos de productos", "error")
                return
            }

            if (products.length === 0) {
                resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-magnifying-glass"></i>
                <p>No se encontraron productos para "${trimmedSearchTerm}"</p>
            </div>
        `
                return
            }

            // Construir HTML de resultados
            const productsHTML = products
                .map(
                    (product) => `
            <div class="contenedor-producto producto-resultado">
                <img style="cursor: pointer" class="imagen-individual-producto" 
                        src="${product.imagen_url || "ruta/por/defecto.jpg"}" 
                        alt="${product.nombre_producto}" 
                        title="Ver detalles de ${product.nombre_producto}">
                <div class="info-producto">
                    <h3>${product.nombre_producto}</h3>
                    <p class="precio">$${product.precio?.toLocaleString() || "N/A"}</p>
                    <button class="comprar" 
                            data-id="${product.id_productos}" 
                            data-unidades="${product.unidades_disponibles || 0}">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `,
                )
                .join("")

            resultsContainer.innerHTML = productsHTML

            // Actualizar URL después de renderizar
            this.updateURL(`/busqueda?q=${encodeURIComponent(trimmedSearchTerm)}`, {
                searchTerm: trimmedSearchTerm,
                resultsCount: products.length,
            })

            // DEBUG: Verificar en consola
            console.log(`Mostrando ${products.length} resultados para:`, trimmedSearchTerm)
        }, 100) // Pequeño delay para mejor UX
    }

    /**
     * Muestra los detalles de un producto
     * @param {Object} product - Datos del producto
     */
    showProductDetails(product) {
        const containerPrincipal = document.getElementById("container-principal")

        if (!containerPrincipal) {
            console.error("No se encontró el contenedor principal")
            return
        }

        // Crear el contenido HTML para el detalle del producto
        const contenidoHTML = `
        <div class="contenedor-detalle-producto">
            <div class="titulo-seccion">
                <h4>${product.nombre_producto}</h4>
            </div>
            
            <div class="contenido-detalle-producto">
                <div class="imagen-detalle-producto">
                    <img src="${product.imagen_url}" alt="${product.nombre_producto}" width="100%" height="auto">
                </div>
            
            <div class="info-detalle-producto">
                <div class="precio-detalle-producto">
                    <h3>Precio:</h3>
                    <p>$${product.precio}</p>
                </div>
                
                <div class="descripcion-detalle-producto">
                    <h3>Descripción:</h3>
                    <p>${product.descripcion || "Sin descripción disponible"}</p>
                </div>
                
                <div class="acciones-detalle-producto">
                    <button class="comprar" data-id="${product.id_productos}" data-unidades-disponibles="${product.unidades_disponibles || 0}">
                    Añadir al carrito
                    </button>
                </div>
            </div>
            </div>
        </div>
        `

        // Mostrar el contenido en el contenedor principal
        containerPrincipal.innerHTML = contenidoHTML
    }

    /**
     * Muestra las opiniones de un producto
     * @param {Array} reviews - Lista de opiniones
     * @param {number} limit - Límite de opiniones a mostrar inicialmente
     */
    showProductReviews(reviews, limit = 2) {
        // Crear el contenedor de opiniones si no existe
        let reviewsContainer = document.getElementById("opiniones-container")

        if (!reviewsContainer) {
            reviewsContainer = document.createElement("div")
            reviewsContainer.id = "opiniones-container"
            reviewsContainer.className = "opiniones-container"

            const containerPrincipal = document.getElementById("container-principal")
            if (containerPrincipal) {
                containerPrincipal.appendChild(reviewsContainer)
            } else {
                console.error("No se encontró el contenedor principal")
                return
            }
        }

        reviewsContainer.innerHTML = "" // Limpiar el contenedor

        // Título de la sección
        const reviewsTitle = document.createElement("div")
        reviewsTitle.className = "titulo-seccion"
        reviewsTitle.innerHTML = "<h4>Opiniones de los usuarios</h4>"
        reviewsContainer.appendChild(reviewsTitle)

        // Si no hay opiniones, mostrar mensaje
        if (!reviews || reviews.length === 0) {
            const noReviews = document.createElement("p")
            noReviews.className = "sin-opiniones"
            noReviews.textContent = "Aún no hay opiniones para este producto. ¡Sé el primero en opinar!"
            reviewsContainer.appendChild(noReviews)
            return
        }

        // Crear lista de opiniones
        const reviewsList = document.createElement("div")
        reviewsList.className = "lista-opiniones"

        // Determinar cuántas opiniones mostrar inicialmente
        const reviewsToShow = reviews.slice(0, limit)
        const hasMoreReviews = reviews.length > limit

        // Agregar cada opinión a la lista (limitado)
        reviewsToShow.forEach((review) => {
            const reviewElement = document.createElement("div")
            reviewElement.className = "opinion-item"

            // Determinar el nombre a mostrar
            const userName = review.es_anonimo === 1 ? "Usuario anónimo" : review.nombre_usuario || "Usuario"

            // Formatear la fecha
            const date = new Date(review.fecha).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })

            // Crear el HTML de la opinión
            reviewElement.innerHTML = `
            <div class="opinion-header">
                <span class="opinion-usuario">${userName}</span>
                <span class="opinion-fecha">${date}</span>
            </div>
            <div class="opinion-contenido">
                <p>${review.opinion}</p>
            </div>
        `

            reviewsList.appendChild(reviewElement)
        })

        reviewsContainer.appendChild(reviewsList)

        // Si hay más opiniones, mostrar botón "Ver más"
        if (hasMoreReviews) {
            const showMoreBtn = document.createElement("button")
            showMoreBtn.className = "boton-ver-mas"
            showMoreBtn.textContent = `Ver más opiniones (${reviews.length - limit} restantes)`

            // Al hacer clic en "Ver más", mostrar todas las opiniones
            showMoreBtn.addEventListener("click", () => {
                // Eliminar el botón "Ver más"
                showMoreBtn.remove()

                // Mostrar todas las opiniones
                this.showAllReviews(reviews, reviewsList)
            })

            reviewsContainer.appendChild(showMoreBtn)
        }
    }

    /**
     * Muestra todas las opiniones de un producto
     * @param {Array} reviews - Lista de opiniones
     * @param {HTMLElement} reviewsList - Contenedor de la lista de opiniones
     */
    showAllReviews(reviews, reviewsList) {
        // Limpiar la lista actual
        reviewsList.innerHTML = ""

        // Mostrar todas las opiniones
        reviews.forEach((review) => {
            const reviewElement = document.createElement("div")
            reviewElement.className = "opinion-item"

            // Determinar el nombre a mostrar
            const userName = review.es_anonimo === 1 ? "Usuario anónimo" : review.nombre_usuario || "Usuario"

            // Formatear la fecha
            const date = new Date(review.fecha).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })

            // Crear el HTML de la opinión
            reviewElement.innerHTML = `
            <div class="opinion-header">
                <span class="opinion-usuario">${userName}</span>
                <span class="opinion-fecha">${date}</span>
            </div>
            <div class="opinion-contenido">
                <p>${review.opinion}</p>
            </div>
        `

            reviewsList.appendChild(reviewElement)
        })
    }

    /**
     * Agrega el formulario para enviar opiniones
     * @param {string} productId - ID del producto
     * @param {Function} submitHandler - Función para manejar el envío del formulario
     */
    addReviewForm(productId, submitHandler) {
        const containerPrincipal = document.getElementById("container-principal")

        if (!containerPrincipal) {
            console.error("No se encontró el contenedor principal")
            return
        }

        // Crear el contenedor del formulario
        const formContainer = document.createElement("div")
        formContainer.className = "seccion-opiniones"

        // Título del formulario
        const formTitle = document.createElement("div")
        formTitle.className = "titulo-seccion"
        formTitle.innerHTML = "<h4>Deja tu opinión</h4>"
        formContainer.appendChild(formTitle)

        // Crear el formulario
        const form = document.createElement("form")
        form.id = "formulario-opiniones"
        form.innerHTML = `
        <textarea id="opinion" placeholder="Escribe tu opinión aquí..." required></textarea>
        <div class="opciones-opinion">
            <label class="checkbox-container">
            <input type="checkbox" id="anonimo"> Quiero permanecer anónimo
            </label>
        </div>
        <button type="submit" class="boton-enviar-opinion">Enviar Opinión</button>
        `

        // Agregar evento de envío al formulario
        form.addEventListener("submit", (event) => {
            event.preventDefault()

            const opinionInput = document.getElementById("opinion")
            const anonymousCheckbox = document.getElementById("anonimo")

            if (opinionInput && anonymousCheckbox) {
                const reviewData = {
                    productId,
                    opinion: opinionInput.value.trim(),
                    anonymous: anonymousCheckbox.checked,
                }

                submitHandler(reviewData)
            }
        })

        formContainer.appendChild(form)

        // Agregar el formulario al contenedor principal
        containerPrincipal.appendChild(formContainer)
    }

    /**
     * Configura los eventos para los botones de agregar al carrito
     * @param {Function} clickHandler - Función a ejecutar cuando se hace clic en un botón
     */
    setupAddToCartButtons(clickHandler) {
        // Seleccionar todos los botones de comprar
        document.querySelectorAll(".comprar").forEach((button) => {
            // Eliminar cualquier event listener existente para evitar duplicados
            button.removeEventListener("click", clickHandler)
            // Agregar el nuevo event listener
            button.addEventListener("click", clickHandler)
        })
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
        <div class="contenedor-producto">
            <img style="cursor: pointer" class="imagen-individual-producto" src="${product.imagen_url}" alt="Imagen del producto" width="50%" height="auto" title="Ver los detalles del producto">
            <h3>${product.nombre_producto}</h3>
            <p>Precio: <br> $${product.precio}</p>
            <button class="comprar" data-id="${product.id_productos}" data-unidades-disponibles="${product.unidades_disponibles}">Añadir al carrito</button>
        </div>
        `
            })
            .join("")

        featuredProductsContainer.innerHTML = productsHTML
    }
}

export default ProductView

