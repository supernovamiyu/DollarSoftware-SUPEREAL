    // PaymentView.js - Vista para la pantalla de pago
    import { BaseView } from "./BaseView.js"

    class PaymentView extends BaseView {
    constructor() {
        super()
    }

    // Renderizar la pantalla de pago
    renderPaymentScreen() {
        const result = this.showTemplate("plantilla-pago", "container-principal")
        return result
    }

    // Rellenar los datos del usuario en el formulario
    fillUserData(userData) {
        const nameInput = document.getElementById("nombre")
        const emailInput = document.getElementById("correo")
        const addressInput = document.getElementById("direccion")
        const cityInput = document.getElementById("ciudad")
        const postalCodeInput = document.getElementById("codigo-postal")
        const phoneInput = document.getElementById("telefono")

        if (nameInput) nameInput.value = userData.nombre_completo || ""
        if (emailInput) emailInput.value = userData.correo || ""
        if (addressInput) addressInput.value = userData.direccion || ""
        if (cityInput) cityInput.value = userData.ciudad || ""
        if (postalCodeInput) postalCodeInput.value = userData.codigo_postal || ""
        if (phoneInput) phoneInput.value = userData.telefono || ""
    }

    // Cargar el resumen del pedido
    loadOrderSummary(cartItems, total) {
        const orderSummary = document.getElementById("resumen-pedido")
        if (orderSummary) {
        let summaryHTML = ""

        cartItems.forEach((item) => {
            summaryHTML += `
            <div class="item-resumen">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            `
        })

        summaryHTML += `
            <div class="item-resumen total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
            </div>
        `

        orderSummary.innerHTML = summaryHTML
        }
    }

    // Configurar los event listeners
    setupEventListeners(handlers) {
        const backToCartButton = document.getElementById("back-to-cart")
        const processPaymentButton = document.getElementById("process-payment")
        const backToHomeButton = document.getElementById("back-to-home")

        if (backToCartButton) {
        backToCartButton.addEventListener("click", handlers.backToCart)
        }

        if (processPaymentButton) {
        processPaymentButton.addEventListener("click", () => {
            const shippingData = this.getShippingData()
            handlers.processPayment(shippingData)
        })
        }

        if (backToHomeButton) {
        backToHomeButton.addEventListener("click", handlers.backToHome)
        }
    }

    // Obtener los datos de envío del formulario
    getShippingData() {
        const form = document.getElementById("payment-form")

        if (!form) {
        console.error("No se encontró el formulario de pago")
        return {}
        }

        return {
        direccion: form.direccion.value,
        ciudad: form.ciudad.value,
        codigo_postal: form["codigo-postal"].value,
        telefono: form.telefono.value,
        }
    }

    // Mostrar pantalla de procesamiento de pago
    showProcessingScreen() {
        const containerPrincipal = document.getElementById("container-principal")
        if (!containerPrincipal) return

        containerPrincipal.innerHTML = `
        <div class="procesando-pago">
            <h2>Procesando su pago</h2>
            <div class="spinner"></div>
            <p>Por favor espere mientras procesamos su pago...</p>
        </div>
        `
    }

    // Mostrar pantalla de éxito
    showSuccessScreen(orderId) {
        const containerPrincipal = document.getElementById("container-principal")
        if (!containerPrincipal) return

        containerPrincipal.innerHTML = `
        <div class="pago-exitoso">
            <h2>¡Pago completado con éxito!</h2>
            <p>Su pedido ha sido procesado correctamente.</p>
            <p>Número de pedido: <strong>${orderId}</strong></p>
            <p>Recibirá un correo electrónico con los detalles de su compra.</p>
            <button id="back-to-home">Volver al inicio</button>
        </div>
        `

        const backToHomeButton = document.getElementById("back-to-home")
        if (backToHomeButton) {
        backToHomeButton.addEventListener("click", () => {
            window.location.href = "/"
        })
        }
    }

    // Mostrar pantalla de error
    showErrorScreen(errorMessage) {
        const containerPrincipal = document.getElementById("container-principal")
        if (!containerPrincipal) return

        containerPrincipal.innerHTML = `
        <div class="pago-error">
            <h2>Error en el proceso de pago</h2>
            <p>${errorMessage}</p>
            <button id="back-to-cart">Volver al carrito</button>
        </div>
        `

        const backToCartButton = document.getElementById("back-to-cart")
        if (backToCartButton) {
        backToCartButton.addEventListener("click", () => {
            const CartController = require("../controllers/CartController.js").CartController
            const cartController = new CartController()
            cartController.displayCart()
        })
        }
    }
    }

    export { PaymentView }

