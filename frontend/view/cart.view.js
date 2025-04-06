    // CartView.js - Vista para el carrito de compras
    import { BaseView } from "./BaseView.js"

    class CartView extends BaseView {
    constructor() {
        super()
    }

    // Mostrar el carrito de compras
    showCart(cartItems, total) {
        // Mostrar la plantilla del carrito
        const result = this.showTemplate("plantilla-carrito", "container-principal")
        if (!result) return false

        const cartContainer = document.getElementById("contenedor-carrito")
        if (!cartContainer) return false

        // Si el carrito está vacío
        if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="carrito-vacio">
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos para comenzar a comprar</p>
            <button id="seguir-comprando" class="boton-seguir-comprando">Seguir comprando</button>
            </div>
        `
        return true
        }

        // Mostrar los items del carrito
        let cartHTML = `
        <div class="carrito-items">
            <table class="tabla-carrito">
            <thead>
                <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        `

        cartItems.forEach((item) => {
        cartHTML += `
            <tr data-id="${item.id}">
            <td>
                <div class="producto-carrito">
                <img src="${item.image}" alt="${item.name}" width="50">
                <span>${item.name}</span>
                </div>
            </td>
            <td>$${item.price}</td>
            <td>
                <div class="cantidad-control">
                <button class="btn-cantidad btn-menos" data-id="${item.id}">-</button>
                <input type="number" class="input-cantidad" value="${item.quantity}" min="1" data-id="${item.id}">
                <button class="btn-cantidad btn-mas" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn-eliminar" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
        `
        })

        cartHTML += `
            </tbody>
            </table>
        </div>
        <div class="carrito-resumen">
            <div class="resumen-total">
            <h3>Resumen del pedido</h3>
            <div class="linea-resumen">
                <span>Subtotal:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="linea-resumen">
                <span>Envío:</span>
                <span>Gratis</span>
            </div>
            <div class="linea-resumen total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button id="btn-checkout" class="btn-checkout">Proceder al pago</button>
            <button id="seguir-comprando" class="boton-seguir-comprando">Seguir comprando</button>
            </div>
        </div>
        `

        cartContainer.innerHTML = cartHTML
        return true
    }

    // Actualizar la cantidad de un producto en el carrito
    updateItemQuantity(productId, quantity) {
        const quantityInput = document.querySelector(`.input-cantidad[data-id="${productId}"]`)
        if (quantityInput) {
        quantityInput.value = quantity

        // Actualizar el subtotal
        const row = quantityInput.closest("tr")
        if (row) {
            const priceCell = row.querySelector("td:nth-child(2)")
            const subtotalCell = row.querySelector("td:nth-child(4)")

            if (priceCell && subtotalCell) {
            const price = Number.parseFloat(priceCell.textContent.replace("$", ""))
            subtotalCell.textContent = `$${(price * quantity).toFixed(2)}`
            }
        }

        return true
        }
        return false
    }

    // Actualizar el total del carrito
    updateCartTotal(total) {
        const totalElement = document.querySelector(".linea-resumen.total span:last-child")
        if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`
        return true
        }
        return false
    }

    // Eliminar un producto del carrito
    removeCartItem(productId) {
        const row = document.querySelector(`tr[data-id="${productId}"]`)
        if (row) {
        row.remove()
        return true
        }
        return false
    }

    // Mostrar la pantalla de pago
    showCheckout(userData, cartItems, total) {
        // Mostrar la plantilla de pago
        const result = this.showTemplate("plantilla-checkout", "container-principal")
        if (!result) return false

        // Rellenar los datos del usuario
        if (userData) {
        const nameInput = document.getElementById("checkout-nombre")
        const emailInput = document.getElementById("checkout-email")
        const phoneInput = document.getElementById("checkout-telefono")
        const addressInput = document.getElementById("checkout-direccion")

        if (nameInput) nameInput.value = userData.nombre_completo || ""
        if (emailInput) emailInput.value = userData.correo || ""
        if (phoneInput) phoneInput.value = userData.telefono || ""
        if (addressInput) addressInput.value = userData.direccion || ""
        }

        // Mostrar resumen del pedido
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

        return true
    }

    // Mostrar pantalla de procesamiento de pago
    showProcessingScreen() {
        const checkoutContainer = document.getElementById("checkout-container")
        if (!checkoutContainer) return false

        checkoutContainer.innerHTML = `
        <div class="procesando-pago">
            <h2>Procesando su pago</h2>
            <div class="spinner"></div>
            <p>Por favor espere mientras procesamos su pago...</p>
        </div>
        `

        return true
    }

    // Mostrar pantalla de éxito
    showSuccessScreen(orderId) {
        const checkoutContainer = document.getElementById("checkout-container")
        if (!checkoutContainer) return false

        checkoutContainer.innerHTML = `
        <div class="pago-exitoso">
            <h2>¡Pago completado con éxito!</h2>
            <p>Su pedido ha sido procesado correctamente.</p>
            <p>Número de pedido: <strong>${orderId}</strong></p>
            <p>Recibirá un correo electrónico con los detalles de su compra.</p>
            <button id="volver-inicio" class="btn-volver-inicio">Volver al inicio</button>
        </div>
        `

        return true
    }

    // Mostrar pantalla de error
    showErrorScreen(errorMessage) {
        const checkoutContainer = document.getElementById("checkout-container")
        if (!checkoutContainer) return false

        checkoutContainer.innerHTML = `
        <div class="pago-error">
            <h2>Error en el proceso de pago</h2>
            <p>${errorMessage}</p>
            <button id="reintentar-pago" class="btn-reintentar">Reintentar</button>
            <button id="volver-carrito" class="btn-volver-carrito">Volver al carrito</button>
        </div>
        `

        return true
    }
    }

    export { CartView }

