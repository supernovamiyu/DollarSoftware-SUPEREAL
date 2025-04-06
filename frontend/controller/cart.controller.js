    /**
     * Controlador para el carrito de compras
     */
    class CartController {
        /**
         * @param {Object} model - Modelo del carrito
         * @param {Object} view - Vista del carrito
         * @param {Object} productModel - Modelo de productos
         */
        constructor(model, view, productModel) {
        this.model = model
        this.view = view
        this.productModel = productModel
    
        // Configurar event listeners globales
        this.setupGlobalEventListeners()
        }
    
        /**
         * Configura los event listeners globales
         */
        setupGlobalEventListeners() {
        // Escuchar evento de agregar al carrito
        window.addEventListener("addToCart", async (event) => {
            const { productId } = event.detail
            await this.addToCart(productId)
        })
        }
    
        /**
         * Muestra el carrito de compras
         */
        showCart() {
        const cartItems = this.model.getCartItems()
        const total = this.model.getCartTotal()
    
        this.view.showCart(cartItems, total)
    
        // Configurar eventos del carrito
        this.view.setupCartEvents({
            updateQuantity: (productId, quantity) => this.updateQuantity(productId, quantity),
            removeItem: (productId) => this.removeFromCart(productId),
            checkout: () => this.proceedToCheckout(),
        })
        }
    
        /**
         * Agrega un producto al carrito
         * @param {string} productId - ID del producto
         */
        async addToCart(productId) {
        try {
            // Obtener los detalles del producto
            const product = await this.productModel.getProductDetails(productId)
    
            if (!product) {
            this.view.showMessage("No se pudo obtener la información del producto", "error")
            return
            }
    
            // Agregar al carrito
            const result = this.model.addToCart(product)
    
            if (result.success) {
            this.view.showMessage("Producto agregado al carrito", "success")
            } else {
            this.view.showMessage(result.error, "error")
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error)
            this.view.showMessage("Error al agregar el producto al carrito", "error")
        }
        }
    
        /**
         * Actualiza la cantidad de un producto en el carrito
         * @param {string} productId - ID del producto
         * @param {number} quantity - Nueva cantidad
         */
        updateQuantity(productId, quantity) {
        const result = this.model.updateQuantity(productId, quantity)
    
        if (result.success) {
            this.showCart() // Actualizar la vista del carrito
        } else {
            this.view.showMessage(result.error, "error")
        }
        }
    
        /**
         * Elimina un producto del carrito
         * @param {string} productId - ID del producto
         */
        removeFromCart(productId) {
        const result = this.model.removeFromCart(productId)
    
        if (result.success) {
            this.showCart() // Actualizar la vista del carrito
            this.view.showMessage("Producto eliminado del carrito", "success")
        } else {
            this.view.showMessage(result.error, "error")
        }
        }
    
        /**
         * Procede al checkout
         */
        proceedToCheckout() {
        const cartItems = this.model.getCartItems()
    
        if (cartItems.length === 0) {
            this.view.showMessage("Tu carrito está vacío", "warning")
            return
        }
    
        const total = this.model.getCartTotal()
        this.view.showCheckout(cartItems, total)
    
        // Configurar eventos del formulario de checkout
        this.view.setupCheckoutFormEvents({
            processPayment: () => this.processPayment(),
            backToCart: () => this.showCart(),
            backToHome: () => window.dispatchEvent(new CustomEvent("showHomePage")),
            tryAgain: () => {
            document.getElementById("formulario-pago").style.display = "block"
            document.getElementById("pago-fallido").style.display = "none"
            },
        })
        }
    
        /**
         * Procesa el pago
         */
        processPayment() {
        // Mostrar pantalla de procesamiento
        this.view.showProcessingPayment()
    
        // Simular procesamiento (en un caso real, aquí iría la llamada al API de pago)
        setTimeout(() => {
            // Simular resultado aleatorio (éxito o error)
            const success = Math.random() > 0.3 // 70% de probabilidad de éxito
    
            if (success) {
            this.handlePaymentSuccess()
            } else {
            this.handlePaymentFailure()
            }
        }, 3000)
        }
    
        /**
         * Maneja el pago exitoso
         */
        handlePaymentSuccess() {
        this.view.showPaymentSuccess()
    
        // Vaciar el carrito
        this.model.clearCart()
        }
    
        /**
         * Maneja el pago fallido
         */
        handlePaymentFailure() {
        // Generar mensaje de error aleatorio
        const errorMessages = [
            "La transacción fue rechazada por el banco emisor.",
            "Fondos insuficientes en la cuenta.",
            "La tarjeta ha expirado.",
            "Error de comunicación con la entidad bancaria.",
            "La tarjeta ha sido reportada como perdida o robada.",
        ]
    
        const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]
        this.view.showPaymentFailure(errorMessage)
        }
    
        /**
         * Configura los eventos para los botones de agregar al carrito
         */
        setupAddToCartButtons() {
        document.querySelectorAll(".comprar").forEach((button) => {
            button.addEventListener("click", async (event) => {
            const productId = event.target.getAttribute("data-id")
            if (productId) {
                await this.addToCart(productId)
            }
            })
        })
        }
    }
    
    export default CartController
    
    