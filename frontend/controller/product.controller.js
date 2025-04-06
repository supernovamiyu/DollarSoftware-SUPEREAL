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
        }
    
        /**
         * Muestra los productos destacados
         */
        async showFeaturedProducts() {
        try {
            const products = await this.model.getFeaturedProducts()
            this.view.showFeaturedProducts(products)
            this.setupProductEvents()
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
    
            // Obtener el nombre de la categoría del primer producto
            const categoryName = products.length > 0 ? products[0].nombre_categoria : "Categoría"
    
            this.view.showProductsByCategory(products, categoryName)
            this.setupProductEvents()
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
            // Validar el término de búsqueda
            if (!searchTerm || searchTerm.trim().length < 3) {
            this.view.showMessage("Por favor, ingresa al menos 3 caracteres para buscar", "warning")
            return
            }
    
            const products = await this.model.searchProducts(searchTerm)
            this.view.showSearchResults(products, searchTerm)
            this.setupProductEvents()
        } catch (error) {
            console.error("Error al buscar productos:", error)
            this.view.showMessage("Error al buscar productos", "error")
        }
        }
    
        /**
         * Muestra los detalles de un producto
         * @param {string} productId - ID del producto
         */
        async showProductDetails(productId) {
        try {
            const product = await this.model.getProductDetails(productId)
    
            if (!product) {
            this.view.showMessage("Producto no encontrado", "error")
            return
            }
    
            this.view.showProductDetails(product)
    
            // Cargar y mostrar las opiniones
            this.loadProductReviews(productId)
    
            // Agregar el formulario de opiniones
            this.view.addReviewForm(productId, (reviewData) => this.handleReviewSubmit(reviewData))
    
            // Configurar eventos
            this.setupProductEvents()
        } catch (error) {
            console.error("Error al mostrar detalles del producto:", error)
            this.view.showMessage("Error al cargar los detalles del producto", "error")
        }
        }
    
        /**
         * Carga las opiniones de un producto
         * @param {string} productId - ID del producto
         */
        async loadProductReviews(productId) {
        try {
            const reviews = await this.model.getProductReviews(productId)
            this.view.showProductReviews(reviews)
        } catch (error) {
            console.error("Error al cargar opiniones:", error)
            // No mostrar mensaje de error para no interrumpir la experiencia del usuario
        }
        }
    
        /**
         * Maneja el envío de una opinión
         * @param {Object} reviewData - Datos de la opinión
         */
        async handleReviewSubmit(reviewData) {
        try {
            // Preparar los datos para enviar
            const opinionData = {
            fk_id_productos: reviewData.productId,
            fk_id_usuario: null, // En una implementación real, obtendríamos el ID del usuario autenticado
            es_anonimo: reviewData.anonymous ? 1 : 0,
            opinion: reviewData.opinion,
            // La fecha se generará en el servidor
            }
    
            // Validar que la opinión no esté vacía
            if (!opinionData.opinion) {
            this.view.showMessage("Por favor, escribe tu opinión", "error")
            return
            }
    
            // Enviar la opinión
            const result = await this.model.submitProductReview(opinionData)
    
            if (result.success) {
            this.view.showMessage("¡Opinión enviada con éxito!", "success")
    
            // Limpiar el formulario
            const opinionInput = document.getElementById("opinion")
            const anonymousCheckbox = document.getElementById("anonimo")
    
            if (opinionInput) opinionInput.value = ""
            if (anonymousCheckbox) anonymousCheckbox.checked = false
    
            // Recargar las opiniones
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
        // Configurar eventos para las imágenes de productos
        this.setupProductImageEvents()
    
        // Configurar eventos para los botones de agregar al carrito
        this.setupAddToCartButtons()
        }
    
        /**
         * Configura los eventos para las imágenes de productos
         */
        setupProductImageEvents() {
        this.view.setupProductImageEvents((event) => {
            // Obtener el elemento que disparó el evento
            const image = event.target
            // Obtener el contenedor del producto (div padre)
            const productContainer = image.closest("div")
    
            if (!productContainer) {
            console.error("No se pudo encontrar el contenedor del producto")
            return
            }
    
            // Buscar el botón de comprar dentro del contenedor para obtener el ID del producto
            const buyButton = productContainer.querySelector(".comprar")
    
            if (!buyButton) {
            console.error("No se pudo encontrar el botón de comprar")
            return
            }
    
            // Obtener el ID del producto desde el atributo data-id del botón
            const productId = buyButton.getAttribute("data-id")
    
            if (!productId) {
            console.error("No se pudo obtener el ID del producto")
            return
            }
    
            // Mostrar los detalles del producto
            this.showProductDetails(productId)
        })
        }
    
        /**
         * Configura los eventos para los botones de agregar al carrito
         */
        setupAddToCartButtons() {
        this.view.setupAddToCartButtons((event) => {
            const button = event.target
            const productId = button.getAttribute("data-id")
    
            if (productId) {
            // Disparar un evento personalizado para agregar al carrito
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
    
