// CartController.js - Controla las operaciones del carrito
import { CartModel } from '../models/CartModel.js';
import { CartView } from '../views/CartView.js';

export class CartController {
    constructor() {
        this.model = new CartModel();
        this.view = new CartView();

        // Configurar manejadores de eventos
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Configurar manejadores de eventos para la vista del carrito
        this.view.setupEventListeners({
            updateQuantity: (productId, quantity) => this.updateQuantity(productId, quantity),
            removeProduct: (productId) => this.removeProduct(productId),
            checkout: () => this.proceedToCheckout()
        });

        // Evento para agregar producto al carrito (global)
        window.agregarAlCarrito = (productId) => this.addToCart(productId);
    }

    async addToCart(productId) {
        try {
            // Verificar si el ID es correcto
            console.log("ID recibido:", productId);

            // Si el ID no es una cadena, intentar obtenerlo del botón que se hizo clic
            if (typeof productId !== "string" && event && event.target) {
                const button = event.target.closest("button");
                if (button && button.getAttribute("data-id")) {
                    productId = button.getAttribute("data-id");
                    console.log("ID corregido desde data-id:", productId);
                }
            }

            // Verificar que tengamos un ID válido
            if (!productId) {
                this.view.showMessage("ID de producto no válido", "error");
                return;
            }

            // Agregar producto al carrito
            await this.model.addProduct(productId);

            // Actualizar visualización del carrito
            this.displayCart();

            // Mostrar mensaje de éxito
            this.view.showMessage("Producto agregado al carrito", "success");
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            this.view.showMessage("No se pudo agregar el producto al carrito: " + error.message, "error");
        }
    }

    updateQuantity(productId, quantity) {
        try {
            this.model.updateQuantity(productId, quantity);
            this.displayCart();
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
            this.view.showMessage("Error al actualizar la cantidad", "error");
        }
    }

    removeProduct(productId) {
        try {
            this.model.removeProduct(productId);
            this.displayCart();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            this.view.showMessage("Error al eliminar el producto", "error");
        }
    }

    displayCart() {
        const cartItems = this.model.getCart();
        const total = this.model.calculateTotal();
        this.view.renderCart(cartItems, total);
    }

    proceedToCheckout() {
        const cartItems = this.model.getCart();

        if (cartItems.length === 0) {
            this.view.showMessage("Tu carrito está vacío. Agrega productos antes de proceder al pago.", "warning");
            return;
        }

        // Verificar si el usuario está autenticado
        const userModel = new (require('../models/UserModel.js').UserModel)();

        if (!userModel.isLoggedIn()) {
            // Si no está autenticado, mostrar pantalla de autenticación
            const authController = new (require('./AuthController.js').AuthController)();
            authController.showAuthScreen();
        } else {
            // Si está autenticado, mostrar directamente la pasarela de pagos
            const paymentController = new (require('./PaymentController.js').PaymentController)();
            paymentController.showPaymentScreen();
        }
    }
}