// app.js - Punto de entrada principal de la aplicación
import { CartController } from "./controller/cart.controller.js";
import { AuthController } from "./controller/auth.controller.js";
import { PaymentController } from "./controller/payment.controller.js";

// Inicializar controladores cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    const cartController = new CartController();
    const authController = new AuthController();
    const paymentController = new PaymentController();

  // Escuchar el evento de carrito cargado
    document.addEventListener("carritoCargado", () => {
    cartController.displayCart();
    });

  // Disparar el evento para cargar el carrito inicialmente
    document.dispatchEvent(new Event("carritoCargado"));
});
