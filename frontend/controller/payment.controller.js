// PaymentController.js - Controla el proceso de pago
import { UserModel } from '../models/UserModel.js';
import { CartModel } from '../models/CartModel.js';
import { OrderModel } from '../models/OrderModel.js';
import { PaymentView } from '../views/PaymentView.js';
import { CartController } from './CartController.js';

export class PaymentController {
    constructor() {
        this.userModel = new UserModel();
        this.cartModel = new CartModel();
        this.orderModel = new OrderModel(this.userModel, this.cartModel);
        this.view = new PaymentView();
    }

    async showPaymentScreen() {
        // Verificar si el usuario está autenticado
        if (!this.userModel.isLoggedIn()) {
            const AuthController = require('./AuthController.js').AuthController;
            const authController = new AuthController();
            authController.showAuthScreen();
            return;
        }

        // Renderizar pantalla de pago
        if (this.view.renderPaymentScreen()) {
            try {
                // Cargar datos del usuario
                const userData = await this.userModel.getUserProfile();
                this.view.fillUserData(userData);

                // Cargar resumen del carrito
                const cartItems = this.cartModel.getCart();
                const total = this.cartModel.calculateTotal();
                this.view.loadOrderSummary(cartItems, total);

                // Configurar manejadores de eventos
                this.view.setupEventListeners({
                    backToCart: () => this.backToCart(),
                    processPayment: (shippingData) => this.processPayment(shippingData),
                    backToHome: () => this.backToHome()
                });
            } catch (error) {
                console.error("Error al cargar pantalla de pago:", error);
            }
        }
    }

    backToCart() {
        const cartController = new CartController();
        cartController.displayCart();
    }

    backToHome() {
        // Redirigir a la página de inicio
        window.location.href = '/';
    }

    async processPayment(shippingData) {
        try {
            // Mostrar pantalla de procesamiento
            this.view.showProcessingScreen();

            // Crear pedido
            const orderData = await this.orderModel.createOrder(shippingData);

            // Simular procesamiento de pago
            setTimeout(() => {
                // Mostrar pantalla de éxito
                this.view.showSuccessScreen(orderData.id_pedido);

                // Limpiar carrito
                this.cartModel.clearCart();
            }, 2000);
        } catch (error) {
            console.error("Error al procesar pago:", error);
            this.view.showErrorScreen(error.message || "Ha ocurrido un error al procesar su pago");
        }
    }
}