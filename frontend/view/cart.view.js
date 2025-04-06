    import BaseView from "./base.view.js"

    /**
     * Vista para el carrito de compras
     */
    class CartView extends BaseView {
    /**
     * Muestra el carrito de compras
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    showCart(cartItems, total) {
        if (this.showTemplate("plantilla-carrito", "container-principal")) {
        const cartContainer = document.getElementById("contenedor-productos-carrito")

        if (!cartContainer) {
            console.error("No se encontró el contenedor del carrito")
            return
        }

        cartContainer.innerHTML = ""

        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>¡No hay productos en el carrito!</p>"
            return
        }

        // Renderizar cada producto
        cartItems.forEach((item) => {
            cartContainer.innerHTML += this.renderCartItem(item)
        })

        // Agregar el total y botón de pago
        cartContainer.innerHTML += `
            <div class="contenedor-total-compra-carrito">
            <h3 class="titulo-total-compra-carrito">Total:</h3>
            <p class="total-compra-del-carrito">$${total.toLocaleString()}</p>
            </div>
            <div class="contenedor-boton-proceder-al-pago">
            <button class="boton-proceder-al-pago">Proceder al pago</button>
            </div>
        `
        }
    }

    /**
     * Renderiza un item del carrito
     * @param {Object} item - Item del carrito
     * @returns {string} - HTML del item
     */
    renderCartItem(item) {
        // Asegurarse de que el precio sea un número antes de multiplicar
        const price = Number.parseFloat(item.precio)
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
     * Muestra la pasarela de pagos
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    showCheckout(cartItems, total) {
        if (this.showTemplate("pasarela-de-pagos-simulada", "container-principal")) {
        this.loadCheckoutSummary(cartItems, total)
        this.setupCheckoutEvents()
        }
    }

    /**
     * Carga el resumen de compra en la pasarela de pagos
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    loadCheckoutSummary(cartItems, total) {
        const summaryContainer = document.getElementById("resumen-productos")
        const totalElement = document.getElementById("total-pagar")

        if (!summaryContainer || !totalElement) {
        console.error("No se encontraron los elementos del resumen de compra")
        return
        }

        summaryContainer.innerHTML = ""

        if (cartItems.length === 0) {
        summaryContainer.innerHTML = "<p>No hay productos en el carrito</p>"
        totalElement.textContent = "$0"
        return
        }

        // Agregar cada producto al resumen
        cartItems.forEach((item) => {
        const price = Number.parseFloat(item.precio)
        const subtotal = price * item.cantidad

        const productElement = document.createElement("div")
        productElement.className = "producto-resumen"
        productElement.innerHTML = `
            <div class="producto-info">
            <img src="${item.imagen_url}" alt="${item.nombre_producto}" class="producto-imagen">
            <div class="producto-detalles">
                <div class="producto-nombre">${item.nombre_producto}</div>
                <div class="producto-cantidad">Cantidad: ${item.cantidad}</div>
            </div>
            </div>
            <div class="producto-precio">$${isNaN(subtotal) ? 0 : subtotal.toLocaleString()}</div>
        `

        summaryContainer.appendChild(productElement)
        })

        // Mostrar el total
        totalElement.textContent = `$${total.toLocaleString()}`
    }

    /**
     * Configura los eventos para la pasarela de pagos
     */
    setupCheckoutEvents() {
        // Configurar los métodos de pago
        const paymentOptions = document.querySelectorAll('input[name="metodo-pago"]')
        if (paymentOptions.length > 0) {
        paymentOptions.forEach((option) => {
            option.addEventListener("change", this.handlePaymentMethodChange)
        })
        }

        // Configurar eventos para la tarjeta simulada
        this.setupCardEvents()
    }

    /**
     * Maneja el cambio de método de pago
     * @param {Event} event - Evento de cambio
     */
    handlePaymentMethodChange(event) {
        const method = event.target.value

        // Ocultar todos los formularios
        document.querySelectorAll(".formulario-metodo-pago").forEach((form) => {
        form.style.display = "none"
        })

        // Mostrar el formulario correspondiente
        const activeForm = document.getElementById(`formulario-${method}`)
        if (activeForm) {
        activeForm.style.display = "block"
        }
    }

    /**
     * Configura los eventos para la tarjeta simulada
     */
    setupCardEvents() {
        // Eventos para la tarjeta simulada
        const cvvInput = document.getElementById("cvv")
        if (cvvInput) {
        cvvInput.addEventListener("focus", this.flipCard)
        cvvInput.addEventListener("blur", this.flipCard)
        }

        // Eventos para actualizar la tarjeta simulada
        const cardNumber = document.getElementById("numero-tarjeta")
        const cardHolder = document.getElementById("titular-tarjeta")
        const expiryDate = document.getElementById("fecha-vencimiento")

        if (cardNumber) {
        cardNumber.addEventListener("input", this.updateCardNumber)
        }

        if (cardHolder) {
        cardHolder.addEventListener("input", this.updateCardHolder)
        }

        if (expiryDate) {
        expiryDate.addEventListener("input", this.updateExpiryDate)
        }

        if (cvvInput) {
        cvvInput.addEventListener("input", this.updateCVV)
        }
    }

    /**
     * Voltea la tarjeta simulada
     */
    flipCard() {
        const card = document.querySelector(".tarjeta-simulada")
        if (card) {
        card.classList.toggle("flip")
        }
    }

    /**
     * Actualiza el número de tarjeta en la simulación
     * @param {Event} event - Evento de input
     */
    updateCardNumber(event) {
        const input = event.target
        let value = input.value.replace(/\D/g, "")

        // Formatear con espacios cada 4 dígitos
        if (value.length > 0) {
        value = value.match(/.{1,4}/g).join(" ")
        }

        // Actualizar el input
        input.value = value

        // Actualizar la visualización en la tarjeta
        const cardNumberDisplay = document.querySelector(".numero-tarjeta-display")
        if (cardNumberDisplay) {
        if (value.length > 0) {
            cardNumberDisplay.textContent = value
        } else {
            cardNumberDisplay.textContent = "•••• •••• •••• ••••"
        }
        }
    }

    /**
     * Actualiza el titular de la tarjeta en la simulación
     * @param {Event} event - Evento de input
     */
    updateCardHolder(event) {
        const input = event.target
        const value = input.value.toUpperCase()

        // Actualizar la visualización en la tarjeta
        const cardHolderDisplay = document.querySelector(".titular-tarjeta-display")
        if (cardHolderDisplay) {
        if (value.length > 0) {
            cardHolderDisplay.textContent = value
        } else {
            cardHolderDisplay.textContent = "NOMBRE DEL TITULAR"
        }
        }
    }

    /**
     * Actualiza la fecha de vencimiento en la simulación
     * @param {Event} event - Evento de input
     */
    updateExpiryDate(event) {
        const input = event.target
        let value = input.value.replace(/\D/g, "")

        // Formatear como MM/AA
        if (value.length > 0) {
        if (value.length <= 2) {
            value = value
        } else {
            value = value.substring(0, 2) + "/" + value.substring(2, 4)
        }
        }

        // Actualizar el input
        input.value = value

        // Actualizar la visualización en la tarjeta
        const expiryDateDisplay = document.querySelector(".fecha-tarjeta-display")
        if (expiryDateDisplay) {
        if (value.length > 0) {
            expiryDateDisplay.textContent = value
        } else {
            expiryDateDisplay.textContent = "MM/AA"
        }
        }
    }

    /**
     * Actualiza el CVV en la simulación
     * @param {Event} event - Evento de input
     */
    updateCVV(event) {
        const input = event.target
        const value = input.value.replace(/\D/g, "")

        // Actualizar el input
        input.value = value

        // Actualizar la visualización en la tarjeta
        const cvvDisplay = document.querySelector(".cvv-display")
        if (cvvDisplay) {
        if (value.length > 0) {
            cvvDisplay.textContent = value
        } else {
            cvvDisplay.textContent = "•••"
        }
        }
    }

    /**
     * Muestra la pantalla de procesamiento de pago
     */
    showProcessingPayment() {
        document.getElementById("formulario-pago").style.display = "none"
        document.getElementById("procesando-pago").style.display = "block"
    }

    /**
     * Muestra la pantalla de pago exitoso
     */
    showPaymentSuccess() {
        document.getElementById("procesando-pago").style.display = "none"
        document.getElementById("pago-exitoso").style.display = "block"

        // Generar número de pedido aleatorio
        const orderNumber = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
        document.getElementById("numero-pedido").textContent = orderNumber
    }

    /**
     * Muestra la pantalla de pago fallido
     * @param {string} errorMessage - Mensaje de error
     */
    showPaymentFailure(errorMessage) {
        document.getElementById("procesando-pago").style.display = "none"
        document.getElementById("pago-fallido").style.display = "block"
        document.getElementById("mensaje-error").textContent = errorMessage
    }

    /**
     * Configura los eventos para los botones del carrito
     * @param {Object} handlers - Objeto con los manejadores de eventos
     */
    setupCartEvents(handlers) {
        // Configurar botones de actualizar cantidad
        document.querySelectorAll(".actualizar-cantidad-producto-carrito").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id")
            const action = event.target.getAttribute("data-action")

            if (productId && action && handlers.updateQuantity) {
            const currentQuantity = Number.parseInt(
                event.target.parentElement.querySelector(".cantidad-producto-individual-carrito").textContent,
            )
            const newQuantity = action === "increase" ? currentQuantity + 1 : currentQuantity - 1

            handlers.updateQuantity(productId, newQuantity)
            }
        })
        })

        // Configurar botones de eliminar
        document.querySelectorAll(".eliminar-producto-individual-carrito").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id")

            if (productId && handlers.removeItem) {
            handlers.removeItem(productId)
            }
        })
        })

        // Configurar botón de proceder al pago
        const checkoutButton = document.querySelector(".boton-proceder-al-pago")
        if (checkoutButton && handlers.checkout) {
        checkoutButton.addEventListener("click", handlers.checkout)
        }
    }

    /**
     * Configura los eventos para la pasarela de pagos
     * @param {Object} handlers - Objeto con los manejadores de eventos
     */
    setupCheckoutFormEvents(handlers) {
        // Configurar formulario de pago
        const paymentForm = document.getElementById("formulario-pago")
        if (paymentForm && handlers.processPayment) {
        paymentForm.addEventListener("submit", (event) => {
            event.preventDefault()
            handlers.processPayment()
        })
        }

        // Configurar botón de volver al carrito
        const backToCartButton = document.getElementById("volver-carrito")
        if (backToCartButton && handlers.backToCart) {
        backToCartButton.addEventListener("click", handlers.backToCart)
        }

        // Configurar botón de volver al inicio después de pago exitoso
        const backToHomeButton = document.getElementById("volver-inicio")
        if (backToHomeButton && handlers.backToHome) {
        backToHomeButton.addEventListener("click", handlers.backToHome)
        }

        // Configurar botón de intentar nuevamente después de pago fallido
        const tryAgainButton = document.getElementById("intentar-nuevamente")
        if (tryAgainButton && handlers.tryAgain) {
        tryAgainButton.addEventListener("click", handlers.tryAgain)
        }
    }
    }

    export default CartView

