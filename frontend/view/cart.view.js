import BaseView from "./base.view.js"
import NotificationUtils from "../utils/message.utils.js"

/**
 * Vista para el carrito de compras (Versión mejorada)
 */
class CartView extends BaseView {
    constructor() {
        super()
        // Bandera para rastrear si los event listeners ya están configurados
        this.eventListenersConfigured = false

        // Almacenar datos de la pasarela de pagos
        this.paymentMethods = null
        this.testCards = null
        this.banks = null
    }

    /**
     * Actualiza la visualización del carrito
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    updateCartDisplay(cartItems, total) {
        if (this.showTemplate("plantilla-carrito", "container-principal")) {
            const cartContainer = document.getElementById("contenedor-productos-carrito")

            if (!cartContainer) {
                console.error("No se encontró el contenedor del carrito")
                return
            }

            // Renderizar el contenido del carrito
            cartContainer.innerHTML =
                cartItems.length === 0
                    ? `
                    <div class="contenedor-carrito-vacio">
                        <i class="fa-solid fa-face-frown imagen-carita-triste elemento-carrito-vacio" style="color: #c4c6ca;"></i>
                        <p class='carrito-vacio elemento-carrito-vacio'>¡No hay productos en el carrito!</p>
                    </div>`
                    : this.renderCartItems(cartItems, total)

            // Configurar eventos si hay productos
            if (cartItems.length > 0) {
                this.setupCartInteraction()
            }
        }
    }

    /**
     * Renderiza todos los items del carrito
     * @param {Array} items - Items del carrito
     * @param {number} total - Total del carrito
     * @returns {string} - HTML completo del carrito
     */
    renderCartItems(items, total) {
        return `
            ${items.map((item) => this.renderCartItem(item)).join("")}
            <div class="cart-summary">
                <div class="contenedor-total-compra-carrito">
                    <h3 class="titulo-total-compra-carrito">Total:</h3>
                    <p class="total-compra-del-carrito">$${total.toLocaleString()}</p>
                </div>
                <div class="contenedor-boton-proceder-al-pago">
                    <button class="boton-proceder-al-pago">Proceder al pago</button>
                </div>
            </div>
        `
    }

    /**
     * Renderiza un item individual del carrito
     * @param {Object} item - Item del carrito
     * @returns {string} - HTML del item
     */
    renderCartItem(item) {
        const price = Number.parseFloat(item.precio) || 0
        const subtotal = price * item.cantidad

        return `
        <div class="contenedor-producto-unico-carrito">
            <div class="producto-individual-carrito">
            <img class="imagen-producto-individual-carrito" src="${item.imagen_url}" alt="${item.nombre_producto}">
            <div class="informacion-producto-carrito">
                <h3 class="nombre-producto-en-el-carrito">${item.nombre_producto}</h3>
                <div class="botones-productos-carrito-compras">
                <button class="actualizar-cantidad-producto-carrito" data-id="${item.id_productos}" data-action="decrease">-</button>
                <span class="cantidad-producto-individual-carrito">${item.cantidad}</span>
                <button class="actualizar-cantidad-producto-carrito" data-id="${item.id_productos}" data-action="increase">+</button>
                </div>
                <p class="precio-unitario-producto-carrito">Precio unitario: $${isNaN(price) ? 0 : price.toLocaleString()}</p>
            </div>
            </div>
            <div class="contenedor-subtotal-eliminar-producto">
            <p class="subtotal-producto-carrito">$${isNaN(subtotal) ? 0 : subtotal.toLocaleString()}</p>
            <button class="eliminar-producto-individual-carrito" data-id="${item.id_productos}">Eliminar</button>
            </div>
        </div>
        `
    }

    /**
     * Configura las interacciones del carrito
     */
    setupCartInteraction() {
        // Limpiar event listeners previos
        this.removeCartEventListeners()

        // Configurar botones de cantidad
        document.querySelectorAll(".actualizar-cantidad-producto-carrito").forEach((button) => {
            button.addEventListener("click", this.handleQuantityButtonClick)
        })

        // Configurar botones de eliminar
        document.querySelectorAll(".eliminar-producto-individual-carrito").forEach((button) => {
            button.addEventListener("click", this.handleRemoveButtonClick)
        })

        // Configurar botón de checkout
        const checkoutBtn = document.querySelector(".boton-proceder-al-pago")
        if (checkoutBtn) {
            checkoutBtn.addEventListener("click", this.handleCheckoutButtonClick)
        }
    }

    /**
     * Elimina los event listeners del carrito para evitar duplicados
     */
    removeCartEventListeners() {
        document.querySelectorAll(".actualizar-cantidad-producto-carrito").forEach((button) => {
            button.removeEventListener("click", this.handleQuantityButtonClick)
        })

        document.querySelectorAll(".eliminar-producto-individual-carrito").forEach((button) => {
            button.removeEventListener("click", this.handleRemoveButtonClick)
        })

        const checkoutBtn = document.querySelector(".boton-proceder-al-pago")
        if (checkoutBtn) {
            checkoutBtn.removeEventListener("click", this.handleCheckoutButtonClick)
        }
    }

    /**
     * Manejador para los botones de cantidad
     */
    handleQuantityButtonClick = (e) => {
        e.stopPropagation()
        const button = e.currentTarget
        const productId = button.getAttribute("data-id")
        const action = button.getAttribute("data-action")

        // Encontrar el elemento de cantidad correspondiente
        const quantityElement = button.parentElement.querySelector(".cantidad-producto-individual-carrito")
        let newQuantity = Number.parseInt(quantityElement.textContent)

        newQuantity = action === "increase" ? newQuantity + 1 : newQuantity - 1

        // Disparar evento de actualización
        if (newQuantity > 0) {
            // Actualizar la UI inmediatamente para mejor experiencia de usuario
            quantityElement.textContent = newQuantity

            // Disparar el evento para que el controlador actualice el modelo
            window.dispatchEvent(
                new CustomEvent("updateQuantity", {
                    detail: { productId, quantity: newQuantity },
                }),
            )
        }
    }

    /**
     * Manejador para los botones de eliminar
     */
    handleRemoveButtonClick = (e) => {
        e.preventDefault()
        const button = e.currentTarget
        const productId = button.getAttribute("data-id")

        // Disparar el evento para que el controlador actualice el modelo
        window.dispatchEvent(
            new CustomEvent("removeItem", {
                detail: { productId },
            }),
        )
    }

    /**
     * Manejador para el botón de checkout
     */
    handleCheckoutButtonClick = (e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent("checkout"))
    }

    /**
     * Muestra la pasarela de pagos
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     * @param {Object} paymentMethods - Métodos de pago disponibles
     * @param {Object} testCards - Tarjetas de prueba
     * @param {Array} banks - Bancos disponibles
     */
    showCheckout(cartItems, total, paymentMethods, testCards, banks) {
        // Guardar datos para uso posterior
        this.paymentMethods = paymentMethods || {}
        this.testCards = testCards || {}
        this.banks = banks || []

        if (this.showTemplate("pasarela-de-pagos-simulada", "container-principal")) {
            this.renderCheckoutSummary(cartItems, total)
            this.renderPaymentMethods()
            this.setupCheckoutEvents()
        }
    }

    /**
     * Renderiza el resumen del checkout
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    renderCheckoutSummary(cartItems, total) {
        const summaryContainer = document.getElementById("resumen-productos")
        const totalElement = document.getElementById("total-pagar")

        if (!summaryContainer || !totalElement) return

        summaryContainer.innerHTML = cartItems
            .map(
                (item) => `
            <div class="checkout-item">
                <img src="${item.imagen_url}" 
                        alt="${item.nombre_producto}" 
                        class="checkout-item-image"
                        onerror="this.src='img/default-product.png'">
                <div class="checkout-item-details">
                    <h4>${item.nombre_producto}</h4>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>
                <div class="checkout-item-price">
                    $${(Number.parseFloat(item.precio) * item.cantidad).toLocaleString()}
                </div>
            </div>
        `,
            )
            .join("")

        totalElement.textContent = `$${total.toLocaleString()}`
    }

    /**
     * Renderiza los métodos de pago disponibles
     */
    renderPaymentMethods() {
        const methodsContainer = document.getElementById("metodos-pago")
        if (!methodsContainer || !this.paymentMethods) return

        // Contenedor para los métodos de pago
        methodsContainer.innerHTML = `
            <div class="payment-methods-container">
                <h3>Selecciona un método de pago</h3>
                <div class="payment-methods-list">
                    ${Object.entries(this.paymentMethods)
                .map(
                    ([key, method]) => `
                        <div class="payment-method-option">
                            <input type="radio" name="metodo-pago" id="metodo-${key}" value="${key}" ${key === "card" ? "checked" : ""}>
                            <label for="metodo-${key}">
                                <i class="fa ${method.icon}"></i>
                                ${method.name}
                            </label>
                        </div>
                    `,
                )
                .join("")}
                </div>
            </div>
            
            <div id="payment-forms-container">
                ${this.renderCardForm()}
                ${this.renderPayPalForm()}
                ${this.renderTransferForm()}
            </div>
            
            ${this.renderTestCardsInfo()}
        `

        // Mostrar el formulario de tarjeta por defecto
        this.showPaymentMethodForm("card")
    }

    /**
     * Renderiza el formulario de tarjeta de crédito
     * @returns {string} - HTML del formulario
     */
    renderCardForm() {
        return `
            <div id="formulario-card" class="formulario-metodo-pago">
                <div class="tarjeta-simulada">
                    <div class="tarjeta-frente">
                        <div class="chip-tarjeta"></div>
                        <div class="numero-tarjeta-display">•••• •••• •••• ••••</div>
                        <div class="datos-tarjeta">
                            <div class="titular-tarjeta-display">NOMBRE DEL TITULAR</div>
                            <div class="fecha-expiracion-display">MM/AA</div>
                        </div>
                    </div>
                    <div class="tarjeta-reverso">
                        <div class="banda-magnetica"></div>
                        <div class="cvv-container">
                            <div class="cvv-titulo">CVV</div>
                            <div class="cvv-display">•••</div>
                        </div>
                    </div>
                </div>
                
                <form id="card-form" class="payment-form">
                    <div class="form-group">
                        <label for="numero-tarjeta">Número de tarjeta</label>
                        <input type="text" id="numero-tarjeta" placeholder="1234 5678 9012 3456" maxlength="19" autocomplete="cc-number">
                    </div>
                    
                    <div class="form-group">
                        <label for="titular-tarjeta">Titular de la tarjeta</label>
                        <input type="text" id="titular-tarjeta" placeholder="Nombre como aparece en la tarjeta" autocomplete="cc-name">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fecha-vencimiento">Fecha de vencimiento</label>
                            <input type="text" id="fecha-vencimiento" placeholder="MM/AA" maxlength="5" autocomplete="cc-exp">
                        </div>
                        
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="4" autocomplete="cc-csc">
                        </div>
                    </div>
                </form>
            </div>
        `
    }

    /**
     * Renderiza el formulario de PayPal
     * @returns {string} - HTML del formulario
     */
    renderPayPalForm() {
        return `
            <div id="formulario-paypal" class="formulario-metodo-pago">
                <div class="paypal-logo">
                    <i class="fa-brands fa-paypal"></i> PayPal
                </div>
                
                <form id="paypal-form" class="payment-form">
                    <div class="form-group">
                        <label for="paypal-email">Correo electrónico</label>
                        <input type="email" id="paypal-email" placeholder="tu@email.com" autocomplete="email">
                    </div>
                    
                    <div class="form-group">
                        <label for="paypal-password">Contraseña</label>
                        <input type="password" id="paypal-password" placeholder="Tu contraseña de PayPal" autocomplete="current-password">
                    </div>
                </form>
            </div>
        `
    }

    /**
     * Renderiza el formulario de transferencia bancaria
     * @returns {string} - HTML del formulario
     */
    renderTransferForm() {
        return `
            <div id="formulario-transfer" class="formulario-metodo-pago">
                <div class="bank-transfer-icon">
                    <i class="fa fa-university"></i> Transferencia Bancaria
                </div>
                
                <form id="transfer-form" class="payment-form">
                    <div class="form-group">
                        <label for="bank-name">Selecciona tu banco</label>
                        <select id="bank-name">
                            <option value="">Selecciona un banco</option>
                            ${this.banks
                .map(
                    (bank) => `
                                <option value="${bank.id}">${bank.name}</option>
                            `,
                )
                .join("")}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="account-number">Número de cuenta</label>
                        <input type="text" id="account-number" placeholder="Número de cuenta bancaria">
                    </div>
                </form>
            </div>
        `
    }

    /**
     * Renderiza la información de tarjetas de prueba
     * @returns {string} - HTML con la información
     */
    renderTestCardsInfo() {
        if (!this.testCards) return ""

        return `
            <div class="test-cards-info">
                <h4>Tarjetas de prueba</h4>
                <p>Puedes usar estas tarjetas para probar diferentes escenarios:</p>
                <ul>
                    <li><strong>Aprobada:</strong> ${this.testCards.success}</li>
                    <li><strong>Rechazada:</strong> ${this.testCards.decline}</li>
                    <li><strong>Fondos insuficientes:</strong> ${this.testCards.insufficient}</li>
                    <li><strong>Expirada:</strong> ${this.testCards.expired}</li>
                </ul>
                <p class="test-card-note">Para cualquier tarjeta, usa una fecha futura y cualquier CVV de 3 dígitos.</p>
            </div>
        `
    }

    /**
     * Muestra el formulario de un método de pago específico
     * @param {string} method - Método de pago a mostrar
     */
    showPaymentMethodForm(method) {
        // Ocultar todos los formularios
        document.querySelectorAll(".formulario-metodo-pago").forEach((form) => {
            form.style.display = "none"
        })

        // Mostrar el formulario seleccionado
        const formElement = document.getElementById(`formulario-${method}`)
        if (formElement) {
            formElement.style.display = "block"
        }

        // Marcar el radio button correspondiente
        const radioButton = document.getElementById(`metodo-${method}`)
        if (radioButton) {
            radioButton.checked = true
        }
    }

    /**
     * Configura los eventos del checkout
     */
    setupCheckoutEvents() {
        // Limpiar event listeners previos
        this.removeCheckoutEventListeners()

        // Configurar métodos de pago
        document.querySelectorAll('input[name="metodo-pago"]').forEach((radio) => {
            radio.addEventListener("change", this.handlePaymentMethodChange)
        })

        // Configurar tarjeta simulada
        this.setupCardSimulation()

        // Configurar botón de pago
        const payButton = document.getElementById("boton-pagar")
        if (payButton) {
            payButton.addEventListener("click", this.handlePayButtonClick)
        }

        // Configurar botones de navegación
        document.getElementById("volver-carrito")?.addEventListener("click", this.handleBackToCartClick)
        document.getElementById("volver-inicio")?.addEventListener("click", this.handleBackToHomeClick)
        document.getElementById("intentar-nuevamente")?.addEventListener("click", this.handleTryAgainClick)
    }

    /**
     * Elimina los event listeners del checkout para evitar duplicados
     */
    removeCheckoutEventListeners() {
        document.querySelectorAll('input[name="metodo-pago"]').forEach((radio) => {
            radio.removeEventListener("change", this.handlePaymentMethodChange)
        })

        const payButton = document.getElementById("boton-pagar")
        if (payButton) {
            payButton.removeEventListener("click", this.handlePayButtonClick)
        }

        document.getElementById("volver-carrito")?.removeEventListener("click", this.handleBackToCartClick)
        document.getElementById("volver-inicio")?.removeEventListener("click", this.handleBackToHomeClick)
        document.getElementById("intentar-nuevamente")?.removeEventListener("click", this.handleTryAgainClick)
    }

    /**
     * Manejador para el cambio de método de pago
     */
    handlePaymentMethodChange = (e) => {
        const method = e.target.value
        window.dispatchEvent(
            new CustomEvent("changePaymentMethod", {
                detail: { method },
            }),
        )
    }

    /**
     * Manejador para el botón de pago
     */
    handlePayButtonClick = (e) => {
        e.preventDefault()

        // Obtener el método de pago seleccionado
        const selectedMethod = document.querySelector('input[name="metodo-pago"]:checked')?.value || "card"

        // Recopilar datos del formulario según el método
        const formData = this.collectFormData(selectedMethod)

        // Disparar evento de procesamiento de pago
        window.dispatchEvent(
            new CustomEvent("processPayment", {
                detail: {
                    method: selectedMethod,
                    formData,
                },
            }),
        )
    }

    /**
     * Recopila los datos del formulario según el método de pago
     * @param {string} method - Método de pago
     * @returns {Object} - Datos del formulario
     */
    collectFormData(method) {
        let formData = {}

        if (method === "card") {
            formData = {
                cardNumber: document.getElementById("numero-tarjeta")?.value || "",
                cardHolder: document.getElementById("titular-tarjeta")?.value || "",
                expiryDate: document.getElementById("fecha-vencimiento")?.value || "",
                cvv: document.getElementById("cvv")?.value || "",
            }
        } else if (method === "paypal") {
            formData = {
                email: document.getElementById("paypal-email")?.value || "",
                password: document.getElementById("paypal-password")?.value || "",
            }
        } else if (method === "transfer") {
            formData = {
                bankName: document.getElementById("bank-name")?.value || "",
                accountNumber: document.getElementById("account-number")?.value || "",
            }
        }

        return formData
    }

    /**
     * Manejador para el botón de volver al carrito
     */
    handleBackToCartClick = (e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent("backToCart"))
    }

    /**
     * Manejador para el botón de volver al inicio
     */
    handleBackToHomeClick = (e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent("backToHome"))
    }

    /**
     * Manejador para el botón de intentar nuevamente
     */
    handleTryAgainClick = (e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent("tryAgain"))
    }

    /**
     * Configura la simulación de la tarjeta de crédito
     */
    setupCardSimulation() {
        const cardNumber = document.getElementById("numero-tarjeta")
        const cardHolder = document.getElementById("titular-tarjeta")
        const expiryDate = document.getElementById("fecha-vencimiento")
        const cvv = document.getElementById("cvv")

        const cardNumberDisplay = document.querySelector(".numero-tarjeta-display")
        const cardHolderDisplay = document.querySelector(".titular-tarjeta-display")
        const expiryDateDisplay = document.querySelector(".fecha-expiracion-display")
        const cvvDisplay = document.querySelector(".cvv-display")

        if (cardNumber) {
            cardNumber.addEventListener("input", (e) => {
                // Formatear número de tarjeta (4 dígitos separados por espacios)
                const value = e.target.value.replace(/\D/g, "")
                let formattedValue = ""

                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formattedValue += " "
                    }
                    formattedValue += value[i]
                }

                e.target.value = formattedValue

                // Actualizar display
                if (cardNumberDisplay) {
                    cardNumberDisplay.textContent = formattedValue || "•••• •••• •••• ••••"
                }
            })
        }

        if (cardHolder) {
            cardHolder.addEventListener("input", (e) => {
                if (cardHolderDisplay) {
                    cardHolderDisplay.textContent = e.target.value.toUpperCase() || "NOMBRE DEL TITULAR"
                }
            })
        }

        if (expiryDate) {
            expiryDate.addEventListener("input", (e) => {
                // Formatear fecha de expiración (MM/AA)
                let value = e.target.value.replace(/\D/g, "")

                if (value.length > 0) {
                    value = value.substring(0, 4)
                    if (value.length > 2) {
                        value = value.substring(0, 2) + "/" + value.substring(2)
                    }
                }

                e.target.value = value

                // Actualizar display
                if (expiryDateDisplay) {
                    expiryDateDisplay.textContent = value || "MM/AA"
                }
            })
        }

        if (cvv) {
            cvv.addEventListener("input", (e) => {
                // Solo permitir números
                e.target.value = e.target.value.replace(/\D/g, "").substring(0, 4)

                // Actualizar display
                if (cvvDisplay) {
                    cvvDisplay.textContent = e.target.value || "•••"
                }
            })

            // Voltear tarjeta al enfocar/desenfocar CVV
            cvv.addEventListener("focus", () => {
                document.querySelector(".tarjeta-simulada")?.classList.add("flipped")
            })

            cvv.addEventListener("blur", () => {
                document.querySelector(".tarjeta-simulada")?.classList.remove("flipped")
            })
        }
    }

    /**
     * Muestra el formulario de checkout
     */
    showCheckoutForm() {
        document.getElementById("formulario-pago").style.display = "block"
        document.getElementById("procesando-pago").style.display = "none"
        document.getElementById("pago-exitoso").style.display = "none"
        document.getElementById("pago-fallido").style.display = "none"
    }

    /**
     * Muestra el procesamiento de pago
     */
    showProcessingPayment() {
        // Ocultar el formulario de pago
        document.getElementById("formulario-pago").style.display = "none"

        // Mostrar el indicador de procesamiento
        const processingElement = document.getElementById("procesando-pago")
        processingElement.style.display = "flex"

        // Asegurarnos que los otros estados estén ocultos
        document.getElementById("pago-exitoso").style.display = "none"
        document.getElementById("pago-fallido").style.display = "none"

        // Hacer scroll al inicio para asegurar que el usuario vea el indicador
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    /**
     * Muestra el pago exitoso
     * @param {Object} result - Resultado del pago
     */
    showPaymentSuccess(result) {
        // Ocultar el procesamiento
        document.getElementById("procesando-pago").style.display = "none"

        // Mostrar el éxito
        document.getElementById("pago-exitoso").style.display = "block"

        // Mostrar ID de transacción
        document.getElementById("numero-pedido").textContent =
            result.transactionId ||
            Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0")

        // Mostrar fecha y hora
        const timestamp = new Date(result.timestamp || Date.now())
        document.getElementById("fecha-hora-pedido").textContent =
            timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString()

        // Hacer scroll al inicio para asegurar que el usuario vea el mensaje
        window.scrollTo({ top: 0, behavior: "smooth" })
        const successContainer = document.getElementById("pago-exitoso");
        if (successContainer) {
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "auth-button primary-button";
            downloadBtn.style.marginTop = "15px";
            downloadBtn.innerHTML = '<i class="fa fa-download"></i> Descargar factura';
            downloadBtn.addEventListener("click", () => {
                // Disparar evento para generar PDF
                window.dispatchEvent(new CustomEvent("downloadInvoice", { 
                    detail: { result } 
                }));
            });
            
            const buttonsContainer = successContainer.querySelector(".botones-navegacion");
            if (buttonsContainer) {
                buttonsContainer.appendChild(downloadBtn);
            }
        }
    
    }

    /**
     * Muestra el pago fallido
     * @param {string} message - Mensaje de error
     */
    showPaymentFailure(message) {
        // Ocultar el procesamiento
        document.getElementById("procesando-pago").style.display = "none"

        // Mostrar el error
        document.getElementById("pago-fallido").style.display = "block"
        document.getElementById("mensaje-error").textContent = message

        // Hacer scroll al inicio para asegurar que el usuario vea el mensaje
        window.scrollTo({ top: 0, behavior: "smooth" })
    
        const failureContainer = document.getElementById("pago-fallido");
        if (failureContainer) {
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "auth-button primary-button";
            downloadBtn.style.marginTop = "15px";
            downloadBtn.innerHTML = '<i class="fa fa-download"></i> Descargar volante';
            downloadBtn.addEventListener("click", () => {
                // Disparar evento para generar PDF
                window.dispatchEvent(new CustomEvent("downloadFailedTransaction", { 
                    detail: { error: message } 
                }));
            });
            
            const buttonsContainer = failureContainer.querySelector(".botones-navegacion");
            if (buttonsContainer) {
                buttonsContainer.insertBefore(downloadBtn, buttonsContainer.firstChild);
            }
        }
    }

    /**
     * Muestra un mensaje al usuario utilizando NotificationUtils
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de mensaje (success, error, info, warning)
     */
    showMessage(message, type = "info") {
        // Utilizar NotificationUtils para mostrar el mensaje
        switch (type) {
            case "success":
                NotificationUtils.showSuccess(message)
                break
            case "error":
                NotificationUtils.showError(message)
                break
            case "warning":
                NotificationUtils.showWarning(message)
                break
            case "info":
                NotificationUtils.showInfo(message)
                break
            default:
                NotificationUtils.showMessage(message, type)
                break
        }
    }
}

export default CartView
