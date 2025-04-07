/**
 * Controlador para el carrito de compras (Versión mejorada)
 */
class CartController {
    constructor(model, view, productModel) {
        this.model = model;
        this.view = view;
        this.productModel = productModel;
        this.isInitialized = false;
        
        this.init();
    }

    /**
     * Inicializa el controlador
     */
    async init() {
        if (this.isInitialized) return;
        
        // Configurar event listeners
        this.setupGlobalEventListeners();
        
        // Mostrar el carrito inicial
        await this.updateCartDisplay();
        
        this.isInitialized = true;
    }

    /**
     * Configura los event listeners globales
     */
    setupGlobalEventListeners() {
        // Delegación de eventos para los botones "comprar"
        document.addEventListener('click', async (e) => {
            const addToCartBtn = e.target.closest('.comprar');
            if (addToCartBtn) {
                e.preventDefault();
                await this.handleAddToCartClick(addToCartBtn);
            }
        });

        // Evento personalizado para agregar al carrito
        window.addEventListener('addToCart', async (e) => {
            const { productId } = e.detail;
            await this.addToCart(productId);
        });

        // Evento para actualizar la vista del carrito
        window.addEventListener('cartUpdated', () => {
            this.updateCartDisplay();
        });
    }

    /**
     * Maneja el clic en el botón "comprar"
     * @param {HTMLElement} button - Botón que disparó el evento
     */
    async handleAddToCartClick(button) {
        const productId = button.getAttribute('data-id');
        if (!productId) return;

        // Deshabilitar el botón durante la operación
        button.disabled = true;
        const originalText = button.textContent;
        button.textContent = 'Agregando...';

        try {
            await this.addToCart(productId);
        } finally {
            // Restaurar el botón
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    /**
     * Agrega un producto al carrito
     * @param {string} productId - ID del producto
     */
    async addToCart(productId) {
        try {
            // Verificar si el producto ya está en el carrito
            if (this.model.isProductInCart(productId)) {
                this.view.showMessage("El producto ya está en tu carrito", "info");
                return;
            }

            // Obtener los detalles del producto
            const product = await this.productModel.getProductDetails(productId);
            if (!product) {
                this.view.showMessage("No se pudo obtener la información del producto", "error");
                return;
            }

            // Agregar al carrito
            const result = await this.model.addToCart(product);

            if (result.success) {
                this.view.showMessage("Producto agregado al carrito", "success");
                window.dispatchEvent(new CustomEvent('cartUpdated'));
                
                // Actualizar botones de agregar al carrito
                this.updateAddToCartButtons(productId);
            } else {
                this.view.showMessage(result.error || "Error al agregar al carrito", "error");
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            this.view.showMessage("Error al agregar el producto al carrito", "error");
        }
    }

    /**
     * Actualiza los botones de "Agregar al carrito" para un producto específico
     * @param {string} productId - ID del producto
     */
    updateAddToCartButtons(productId) {
        document.querySelectorAll(`.comprar[data-id="${productId}"]`).forEach(button => {
            if (this.model.isProductInCart(productId)) {
                button.disabled = true;
                button.textContent = "En el carrito";
            } else {
                button.disabled = false;
                button.textContent = "Comprar";
            }
        });
    }

    /**
     * Actualiza la visualización del carrito
     */
    async updateCartDisplay() {
        const cartItems = this.model.getCartItems();
        const total = this.model.getCartTotal();
        this.view.updateCartDisplay(cartItems, total);
    }

    /**
     * Muestra el carrito de compras
     */
    async showCart() {
        await this.updateCartDisplay();
        
        // Configurar eventos del carrito
        this.view.setupCartEvents({
            updateQuantity: async (productId, quantity) => {
                const result = await this.model.updateQuantity(productId, quantity);
                if (result.success) {
                    this.updateCartDisplay();
                } else {
                    this.view.showMessage(result.error, "error");
                }
            },
            removeItem: async (productId) => {
                const result = await this.model.removeFromCart(productId);
                if (result.success) {
                    this.view.showMessage("Producto eliminado del carrito", "success");
                    this.updateCartDisplay();
                    this.updateAddToCartButtons(productId);
                } else {
                    this.view.showMessage(result.error, "error");
                }
            },
            checkout: () => this.proceedToCheckout(),
        });
    }

    /**
     * Procede al checkout
     */
    async proceedToCheckout() {
        const cartItems = this.model.getCartItems();

        if (cartItems.length === 0) {
            this.view.showMessage("Tu carrito está vacío", "warning");
            return;
        }

        const total = this.model.getCartTotal();
        this.view.showCheckout(cartItems, total);

        // Configurar eventos del checkout
        this.view.setupCheckoutFormEvents({
            processPayment: () => this.processPayment(),
            backToCart: () => this.showCart(),
            backToHome: () => window.dispatchEvent(new CustomEvent("showHomePage")),
            tryAgain: () => {
                document.getElementById("formulario-pago").style.display = "block";
                document.getElementById("pago-fallido").style.display = "none";
            },
        });
    }

    /**
     * Procesa el pago
     */
    async processPayment() {
        this.view.showProcessingPayment();

        // Simular procesamiento de pago
        setTimeout(async () => {
            const success = Math.random() > 0.3; // 70% de probabilidad de éxito

            if (success) {
                await this.handlePaymentSuccess();
            } else {
                this.handlePaymentFailure();
            }
        }, 3000);
    }

    /**
     * Maneja el pago exitoso
     */
    async handlePaymentSuccess() {
        this.view.showPaymentSuccess();
        await this.model.clearCart();
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    /**
     * Maneja el pago fallido
     */
    handlePaymentFailure() {
        const errorMessages = [
            "La transacción fue rechazada por el banco emisor.",
            "Fondos insuficientes en la cuenta.",
            "La tarjeta ha expirado.",
            "Error de comunicación con la entidad bancaria.",
            "La tarjeta ha sido reportada como perdida o robada.",
        ];
        const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        this.view.showPaymentFailure(errorMessage);
    }
}

export default CartController;