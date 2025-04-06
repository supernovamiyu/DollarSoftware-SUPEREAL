    // ProductView.js - Vista para la visualización de productos
    import { BaseView } from "./base.view.js"

    class ProductView extends BaseView {
    constructor() {
        super()
    }

    // Mostrar productos destacados en la página de inicio
    showFeaturedProducts(products) {
        const featuredContainer = document.getElementById("productos-populares")
        if (!featuredContainer) return false

        featuredContainer.innerHTML = ""

        // Limitar a 4 productos
        const limitedProducts = products.slice(0, 4)

        const productsHTML = limitedProducts
        .map((product) => {
            return `
            <div>
            <img id="imagen-individual-producto" src="${product.imagen_url}" alt="Imagen del producto" width="50%" height="auto" title="Ver los detalles del producto" data-id="${product.id}">
            <h3>${product.nombre_producto}</h3>
            <p>Precio: <br> $${product.precio}</p>
            <button class="comprar" data-id="${product.id}" data-unidades-disponibles="${product.unidades_disponibles}">Añadir al carrito</button>
            </div>
        `
        })
        .join("")

        featuredContainer.innerHTML = productsHTML
        return true
    }

    // Mostrar productos por categoría
    showProductsByCategory(products, categoryName) {
        // Mostrar la plantilla de categorías
        this.showTemplate("plantilla-categorias-productos", "container-principal")

        const categoryTitle = document.getElementById("titulo-seccion-categoria")
        const productsContainer = document.getElementById("productos-categorias")

        if (!categoryTitle || !productsContainer) return false

        // Limpiar contenido previo
        categoryTitle.innerHTML = ""
        productsContainer.innerHTML = ""

        if (products.message) {
        productsContainer.innerHTML = `<p>${products.message}</p>`
        return true
        }

        // Mostrar el nombre de la categoría
        categoryTitle.innerHTML = `<h2 style="width: 100%; text-align: center">${categoryName || products[0]?.nombre_categoria || "Productos"}</h2>`

        // Mostrar los productos
        const productsHTML = products
        .map((product) => {
            return `
            <div>
            <img id="imagen-individual-producto" src="${product.imagen_url}" alt="${product.nombre_producto}" width="50%" height="auto" title="Ver los detalles del producto" data-id="${product.id}">
            <h3>${product.nombre_producto}</h3>
            <p>Precio: <br>$${product.precio}</p>
            <button class="comprar" data-id="${product.id}" data-unidades-disponibles="${product.unidades_disponibles}">Añadir al carrito</button>
            </div>
        `
        })
        .join("")

        productsContainer.innerHTML = productsHTML
        return true
    }

    // Mostrar resultados de búsqueda
    showSearchResults(products, searchTerm) {
        // Mostrar la plantilla de resultados
        this.showTemplate("plantilla-resultados-productos", "container-principal")

        const resultsContainer = document.getElementById("resultados-productos")
        if (!resultsContainer) return false

        resultsContainer.innerHTML = ""

        if (products.message || products.length === 0) {
        resultsContainer.innerHTML = `<p>No se encontraron productos para "${searchTerm}"</p>`
        return true
        }

        // Mostrar los productos encontrados
        const productsHTML = products
        .map((product) => {
            return `
            <div>
            <img id="imagen-individual-producto" src="${product.imagen_url}" alt="${product.nombre_producto}" width="50%" height="auto" title="Ver los detalles del producto" data-id="${product.id}">
            <h3>${product.nombre_producto}</h3>
            <p>Precio: <br>$${product.precio}</p>
            <button class="comprar" data-id="${product.id}" data-unidades-disponibles="${product.unidades_disponibles}">Añadir al carrito</button>
            </div>
        `
        })
        .join("")

        resultsContainer.innerHTML = productsHTML
        return true
    }

    // Mostrar detalles de un producto
    showProductDetails(product) {
        const containerPrincipal = document.getElementById("container-principal")
        if (!containerPrincipal) return false

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
                <button class="comprar" data-id="${product.id}" data-unidades-disponibles="${product.unidades_disponibles || 0}">
                    Añadir al carrito
                </button>
                </div>
            </div>
            </div>
        </div>
        `

        // Mostrar el contenido en el contenedor principal
        containerPrincipal.innerHTML = contenidoHTML

        // Crear un contenedor para las opiniones
        const opinionesContainer = document.createElement("div")
        opinionesContainer.id = "opiniones-container"
        containerPrincipal.appendChild(opinionesContainer)

        return true
    }

    // Mostrar opiniones de un producto
    showOpinions(opinions, limit = 2) {
        // Obtener el contenedor de opiniones
        const opinionsContainer = document.getElementById("opiniones-container")
        if (!opinionsContainer) return false

        opinionsContainer.innerHTML = "" // Limpiar el contenedor
        opinionsContainer.className = "opiniones-container"

        // Título de la sección
        const opinionsTitle = document.createElement("div")
        opinionsTitle.className = "titulo-seccion"
        opinionsTitle.innerHTML = "<h4>Opiniones de los usuarios</h4>"
        opinionsContainer.appendChild(opinionsTitle)

        // Si no hay opiniones, mostrar mensaje
        if (!opinions || opinions.length === 0) {
        const noOpinions = document.createElement("p")
        noOpinions.className = "sin-opiniones"
        noOpinions.textContent = "Aún no hay opiniones para este producto. ¡Sé el primero en opinar!"
        opinionsContainer.appendChild(noOpinions)
        } else {
        // Crear lista de opiniones
        const opinionsList = document.createElement("div")
        opinionsList.className = "lista-opiniones"

        // Determinar cuántas opiniones mostrar inicialmente
        const opinionsToShow = opinions.slice(0, limit)
        const hasMoreOpinions = opinions.length > limit

        // Agregar cada opinión a la lista (limitado)
        opinionsToShow.forEach((opinion) => {
            const opinionElement = document.createElement("div")
            opinionElement.className = "opinion-item"

            // Determinar el nombre a mostrar
            const userName = opinion.es_anonimo === 1 ? "Usuario anónimo" : opinion.nombre_usuario || "Usuario"

            // Formatear la fecha
            const date = new Date(opinion.fecha).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            })

            // Crear el HTML de la opinión
            opinionElement.innerHTML = `
            <div class="opinion-header">
                <span class="opinion-usuario">${userName}</span>
                <span class="opinion-fecha">${date}</span>
            </div>
            <div class="opinion-contenido">
                <p>${opinion.opinion}</p>
            </div>
            `

            opinionsList.appendChild(opinionElement)
        })

        opinionsContainer.appendChild(opinionsList)

        // Si hay más opiniones, mostrar botón "Ver más"
        if (hasMoreOpinions) {
            const showMoreBtn = document.createElement("button")
            showMoreBtn.className = "boton-ver-mas"
            showMoreBtn.textContent = `Ver más opiniones (${opinions.length - limit} restantes)`
            showMoreBtn.dataset.allOpinions = JSON.stringify(opinions)

            opinionsContainer.appendChild(showMoreBtn)
        }
        }

        return true
    }

    // Mostrar todas las opiniones
    showAllOpinions(opinions) {
        return this.showOpinions(opinions, opinions.length)
    }

    // Agregar formulario para enviar opiniones
    addOpinionForm(productId) {
        const containerPrincipal = document.getElementById("container-principal")
        if (!containerPrincipal) return false

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

        formContainer.appendChild(form)

        // Agregar el formulario al contenedor principal
        containerPrincipal.appendChild(formContainer)

        return true
    }
    }

    export { ProductView }

