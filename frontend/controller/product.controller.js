    /**
     * Controlador para los productos
     */
    class ProductController {
        /**
         * @param {Object} model - Modelo de productos
         * @param {Object} view - Vista de productos
         */
        constructor(model, view) {
        this.model = model
        this.view = view
        this.currentProductId = null
    
        // Configurar delegación de eventos globales para las imagenes de los productos
        this.setupGlobalProductClickHandler()
        }
        /**
         *  Configura la delegación de eventos globales para las imagenes de los productos
         */
    
        setupGlobalProductClickHandler() {
        document.body.addEventListener("click", (e) => {
            // Verificar si el clic fue en una imagen del producto
            const productImage = e.target.closest(".imagen-individual-producto")
            if (!productImage) return
    
            // Obtener el contenedor del producto
            const productContainer = productImage.closest(".contenedor-producto")
            if (!productContainer) return
    
            // Obtener el ID del producto desde el boton de compra
            const buyButton = productContainer.querySelector(".comprar")
            if (!buyButton) return
    
            const productId = buyButton.getAttribute("data-id")
            if (productId) {
            e.preventDefault()
            e.stopPropagation()
            this.showProductDetails(productId)
            }
        })
        }
    
        /**
         * Muestra los productos destacados
         */
        async showFeaturedProducts() {
        try {
            const products = await this.model.getFeaturedProducts()
            this.view.showFeaturedProducts(products)
            this.setupAddToCartButtons()
        } catch (error) {
            console.error("Error al mostrar productos destacados:", error)
            this.view.showMessage("Error al cargar los productos destacados", "error")
        }
        }
    
        /**
         * Muestra los productos por categoría
         * @param {string} categoryId - ID de la categoría
         */
        async showProductsByCategory(categoryId) {
        try {
            const products = await this.model.getProductsByCategory(categoryId)
            const categoryName = products.length > 0 ? products[0].nombre_categoria : "Categoría"
    
            this.view.showProductsByCategory(products, categoryName)
            this.setupAddToCartButtons()
    
            // Actualizar URL
            this.view.updateURL(`/categoria/${categoryId}`, {
            categoryId,
            categoryName,
            })
        } catch (error) {
            console.error("Error al mostrar productos por categoría:", error)
            this.view.showMessage("Error al cargar los productos de esta categoría", "error")
        }
        }
    
        /**
         * Busca productos por término
         * @param {string} searchTerm - Término de búsqueda
         */
        async searchProducts(searchTerm) {
        try {
            // Validación robusta del término
            const trimmedTerm = searchTerm ? searchTerm.trim() : ""
    
            if (trimmedTerm.length < 3) {
            this.view.showMessage("Ingresa al menos 3 caracteres", "warning")
            return
            }
    
            // Llamada al modelo con manejo de errores
            const products = await this.model.searchProducts(trimmedTerm).catch((error) => {
            throw new Error(`Error en la búsqueda: ${error.message}`)
            })
    
            if (!products || products.length === 0) {
            this.view.showMessage("No se encontraron resultados", "info")
            this.view.showSearchResults([], trimmedTerm) // Limpiar resultados anteriores
            return
            }
    
            // Actualizar vista y URL
            this.view.showSearchResults(products, trimmedTerm)
            this.view.updateURL(`/busqueda?q=${encodeURIComponent(trimmedTerm)}`, {
            searchTerm: trimmedTerm,
            resultsCount: products.length,
            })
    
            // Configurar eventos de los nuevos resultados
            this.setupAddToCartButtons()
        } catch (error) {
            console.error("Error en searchProducts:", error)
            this.view.showMessage(error.message || "Error al buscar productos", "error")
    
            // Fallback: Mostrar vista vacía
            this.view.showSearchResults([], searchTerm)
        }
        }
    
        /**
         * Muestra los detalles de un producto
         * @param {string} productId - ID del producto o slug del producto
         */
        async showProductDetails(productId) {
        try {
            // Validación inicial
            if (!productId) return
    
            // Obtener datos
            const product = await this.model.getProductDetails(productId)
    
            // Validación exhaustiva
            if (!product?.id_productos) {
            console.error("Producto inválido:", product)
            return
            }
    
            // Asegurar nombre (sin mostrar errores al usuario)
            if (!product.nombre_producto) {
            product.nombre_producto = `Producto ${product.id_productos}`
            }
    
            // Renderizar vista (sin actualizar URL aquí)
            this.view.showProductDetails(product)
    
            // Configuraciones adicionales
            this.loadProductReviews(product.id_productos)
            this.setupAddToCartButtons()
        } catch (error) {
            console.error("Error controlado:", error)
            // No mostrar mensajes al usuario para evitar popups
        }
        }
    
        /**
         * Carga un producto basado en su slug
         * @param {string} productSlug - Slug del producto
         */
        async loadProductBySlug(productSlug) {
        try {
            const productId = await this.model.getProductIdBySlug(productSlug)
            if (productId) {
            await this.showProductDetails(productId)
            } else {
            this.view.showMessage("Producto no encontrado", "error")
            this.view.showHomePage()
            }
        } catch (error) {
            console.error("Error al cargar producto por slug:", error)
            this.view.showMessage("Error al cargar el producto", "error")
        }
        }
    
        /**
         * Crea un slug amigable para URLs
         * @param {string} productName - Nombre del producto
         * @returns {string} Slug generado
         */
        createProductSlug(productName) {
        return productName
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "")
        }
    
        /**
         * Carga las opiniones de un producto
         * @param {string} productId - ID del producto
         */
        async loadProductReviews(productId) {
        try {
            // Validar ID del producto
            if (!productId) {
            console.error("ID de producto inválido para cargar opiniones")
            return
            }
    
            // Guardar el ID del producto actual
            this.currentProductId = productId
    
            // Mostrar estado de carga (opcional)
            this.view.showLoadingReviews()
    
            // Obtener opiniones
            const reviews = await this.model.getProductReviews(productId)
    
            // Validar respuesta
            if (!Array.isArray(reviews)) {
            console.error("Formato de opiniones inválido:", reviews)
            this.view.showMessage("Error al cargar opiniones", "error")
            return
            }
    
            // Mostrar opiniones
            this.view.showProductReviews(reviews)
    
            // Eliminar formularios existentes antes de agregar uno nuevo
            this.view.removeExistingReviewForms()
    
            // Agregar el formulario para enviar opiniones
            this.view.addReviewForm(productId, (reviewData) => {
            this.handleReviewSubmit(reviewData)
            })
        } catch (error) {
            console.error("Error al cargar opiniones:", error)
            this.view.showMessage("Error al cargar las opiniones", "error")
        }
        }
    
        /**
         * Maneja el envío de una opinión
         * @param {Object} reviewData - Datos de la opinión
         */
        async handleReviewSubmit(reviewData) {
        try {
            const opinionData = {
            fk_id_productos: reviewData.productId,
            fk_id_usuario: null,
            es_anonimo: reviewData.anonymous ? 1 : 0,
            opinion: reviewData.opinion,
            }
    
            if (!opinionData.opinion) {
            this.view.showMessage("Por favor, escribe tu opinión", "error")
            return
            }
    
            const result = await this.model.submitProductReview(opinionData)
    
            if (result.success) {
            this.view.showMessage("¡Opinión enviada con éxito!", "success")
            document.getElementById("opinion").value = ""
            document.getElementById("anonimo").checked = false
            this.loadProductReviews(reviewData.productId)
            } else {
            this.view.showMessage(result.error, "error")
            }
        } catch (error) {
            console.error("Error al enviar opinión:", error)
            this.view.showMessage("Error al enviar la opinión", "error")
        }
        }
    
        /**
         * Configura los eventos para los productos
         */
        setupProductEvents() {
        // Ya no necesitamos llamar a setupProductImageEvents aquí
        // porque lo hacemos a nivel global en el constructor
        this.setupAddToCartButtons()
        }
    
        /**
         * Configura los eventos para los botones de agregar al carrito
         */
        setupAddToCartButtons() {
        this.view.setupAddToCartButtons((event) => {
            const productId = event.target.getAttribute("data-id")
            if (productId) {
            window.dispatchEvent(
                new CustomEvent("addToCart", {
                detail: { productId },
                }),
            )
            }
        })
        }
    }
    
    export default ProductController
    