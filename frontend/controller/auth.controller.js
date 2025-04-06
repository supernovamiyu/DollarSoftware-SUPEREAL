// AuthController.js - Controla la autenticación
import { UserModel } from '../model/user.model.js';
import { AuthView } from '../view/auth.view.js';
import { PaymentController } from './payment.controller.js';

export class AuthController {
    constructor() {
        this.model = new UserModel();
        this.view = new AuthView();
    }

    showAuthScreen() {
        // Si el usuario ya está autenticado, ir directamente al pago
        if (this.model.isLoggedIn()) {
            const paymentController = new PaymentController();
            paymentController.showPaymentScreen();
            return;
        }

        // Renderizar pantalla de autenticación
        if (this.view.renderAuthScreen()) {
            // Configurar manejadores de eventos
            this.view.setupEventListeners({
                login: (email, password) => this.login(email, password),
                register: (userData) => this.register(userData)
            });
        }
    }

    async login(email, password) {
        try {
            // Mostrar mensaje de carga
            this.view.showFormError("login-error-pago", "Iniciando sesión...");

            // Intentar inicio de sesión
            await this.model.login(email, password);

            // Mostrar mensaje de éxito
            this.view.showFormError("login-error-pago", "¡Inicio de sesión exitoso!");

            // Redirigir a la pantalla de pago
            setTimeout(() => {
                const paymentController = new PaymentController();
                paymentController.showPaymentScreen();
            }, 1000);
        } catch (error) {
            console.error("Error de inicio de sesión:", error);
            this.view.showFormError("login-error-pago", error.message || "Error al iniciar sesión. Verifica tus credenciales.");
        }
    }

    async register(userData) {
        try {
            // Mostrar mensaje de carga
            this.view.showFormError("registro-error-pago", "Creando cuenta...");

            // Intentar registro
            await this.model.register(userData);

            // Mostrar mensaje de éxito
            this.view.showFormError("registro-error-pago", "¡Cuenta creada exitosamente!");

            // Redirigir a la pantalla de pago
            setTimeout(() => {
                const paymentController = new PaymentController();
                paymentController.showPaymentScreen();
            }, 1000);
        } catch (error) {
            console.error("Error de registro:", error);
            this.view.showFormError("registro-error-pago", error.message || "Error al crear la cuenta. Inténtalo de nuevo.");
        }
    }
}