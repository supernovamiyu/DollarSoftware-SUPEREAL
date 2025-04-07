import BaseView from "./base.view.js";

/**
 * Vista para el carrito de compras (Versión mejorada)
 */
class CartView extends BaseView {
    /**
     * Actualiza la visualización del carrito
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    updateCartDisplay(cartItems, total) {
        if (this.showTemplate("plantilla-carrito", "container-principal")) {
            const cartContainer = document.getElementById("contenedor-productos-carrito");
            
            if (!cartContainer) {
                console.error("No se encontró el contenedor del carrito");
                return;
            }

            // Renderizar el contenido del carrito
            cartContainer.innerHTML = cartItems.length === 0
                ? "<p class='carrito-vacio'>¡No hay productos en el carrito!</p>"
                : this.renderCartItems(cartItems, total);
            
            // Configurar eventos si hay productos
            if (cartItems.length > 0) {
                this.setupCartInteraction();
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
            ${items.map(item => this.renderCartItem(item)).join('')}
            <div class="cart-summary">
                <div class="contenedor-total-compra-carrito">
                    <h3 class="titulo-total-compra-carrito">Total:</h3>
                    <p class="total-compra-del-carrito">$${total.toLocaleString()}</p>
                </div>
                <div class="contenedor-boton-proceder-al-pago">
                    <button class="boton-proceder-al-pago">Proceder al pago</button>
                </div>
            </div>
        `;
    }

    /**
     * Renderiza un item individual del carrito
     * @param {Object} item - Item del carrito
     * @returns {string} - HTML del item
     */
    renderCartItem(item) {
        const price = Number.parseFloat(item.precio) || 0;
        const subtotal = price * item.cantidad;

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
        `;
    }

    /**
     * Configura las interacciones del carrito
     */
    setupCartInteraction() {
        // Configurar botones de cantidad
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = button.getAttribute('data-id');
                const action = button.classList.contains('increase') ? 'increase' : 'decrease';
                
                // Encontrar el elemento de cantidad correspondiente
                const quantityElement = button.parentElement.querySelector('.quantity');
                let newQuantity = parseInt(quantityElement.textContent);
                
                newQuantity = action === 'increase' ? newQuantity + 1 : newQuantity - 1;
                
                // Disparar evento de actualización
                if (newQuantity > 0) {
                    window.dispatchEvent(new CustomEvent('updateQuantity', {
                        detail: { productId, quantity: newQuantity }
                    }));
                }
            });
        });

        // Configurar botones de eliminar
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-id');
                window.dispatchEvent(new CustomEvent('removeItem', {
                    detail: { productId }
                }));
            });
        });

        // Configurar botón de checkout
        const checkoutBtn = document.querySelector('.boton-proceder-al-pago');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('checkout'));
            });
        }
    }

    /**
     * Muestra la pasarela de pagos
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    showCheckout(cartItems, total) {
        if (this.showTemplate("pasarela-de-pagos-simulada", "container-principal")) {
            this.renderCheckoutSummary(cartItems, total);
            this.setupCheckoutEvents();
        }
    }

    /**
     * Renderiza el resumen del checkout
     * @param {Array} cartItems - Items del carrito
     * @param {number} total - Total del carrito
     */
    renderCheckoutSummary(cartItems, total) {
        const summaryContainer = document.getElementById("resumen-productos");
        const totalElement = document.getElementById("total-pagar");

        if (!summaryContainer || !totalElement) return;

        summaryContainer.innerHTML = cartItems.map(item => `
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
        `).join('');

        totalElement.textContent = `$${total.toLocaleString()}`;
    }

    /**
     * Configura los eventos del checkout
     */
    setupCheckoutEvents() {
        // Configurar métodos de pago
        document.querySelectorAll('input[name="metodo-pago"]').forEach(radio => {
            radio.addEventListener('change', this.handlePaymentMethodChange);
        });

        // Configurar tarjeta simulada
        this.setupCardSimulation();

        // Configurar formulario de pago
        const paymentForm = document.getElementById("formulario-pago");
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('processPayment'));
            });
        }

        // Configurar botones de navegación
        document.getElementById("volver-carrito")?.addEventListener('click', (e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('backToCart'));
        });

        document.getElementById("volver-inicio")?.addEventListener('click', (e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('backToHome'));
        });

        document.getElementById("intentar-nuevamente")?.addEventListener('click', (e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('tryAgain'));
        });
    }

    /**
     * Maneja el cambio de método de pago
     */
    handlePaymentMethodChange(e) {
        const method = e.target.value;
        document.querySelectorAll(".formulario-metodo-pago").forEach(form => {
            form.style.display = "none";
        });
        document.getElementById(`formulario-${method}`).style.display = "block";
    }

    /**
     * Configura la simulación de la tarjeta de crédito
     */
    setupCardSimulation() {
        const cardNumber = document.getElementById("numero-tarjeta");
        const cardHolder = document.getElementById("titular-tarjeta");
        const expiryDate = document.getElementById("fecha-vencimiento");
        const cvv = document.getElementById("cvv");

        if (cardNumber) {
            cardNumber.addEventListener('input', this.updateCardDisplay);
            cardNumber.addEventListener('keypress', this.formatCardNumber);
        }

        if (cardHolder) {
            cardHolder.addEventListener('input', this.updateCardDisplay);
        }

        if (expiryDate) {
            expiryDate.addEventListener('input', this.updateCardDisplay);
            expiryDate.addEventListener('keypress', this.formatExpiryDate);
        }

        if (cvv) {
            cvv.addEventListener('input', this.updateCardDisplay);
            cvv.addEventListener('focus', () => {
                document.querySelector(".tarjeta-simulada").classList.add("flipped");
            });
            cvv.addEventListener('blur', () => {
                document.querySelector(".tarjeta-simulada").classList.remove("flipped");
            });
        }
    }

    /**
     * Muestra el procesamiento de pago
     */
    showProcessingPayment() {
        document.getElementById("formulario-pago").style.display = "none";
        document.getElementById("procesando-pago").style.display = "flex";
    }

    /**
     * Muestra el pago exitoso
     */
    showPaymentSuccess() {
        document.getElementById("procesando-pago").style.display = "none";
        document.getElementById("pago-exitoso").style.display = "block";
        document.getElementById("numero-pedido").textContent = 
            Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    /**
     * Muestra el pago fallido
     * @param {string} message - Mensaje de error
     */
    showPaymentFailure(message) {
        document.getElementById("procesando-pago").style.display = "none";
        document.getElementById("pago-fallido").style.display = "block";
        document.getElementById("mensaje-error").textContent = message;
    }

    /**
     * Configura los eventos del carrito
     * @param {Object} handlers - Manejadores de eventos
     */
    setupCartEvents(handlers) {
        // Configurar eventos globales
        window.addEventListener('updateQuantity', (e) => {
            handlers.updateQuantity(e.detail.productId, e.detail.quantity);
        });

        window.addEventListener('removeItem', (e) => {
            handlers.removeItem(e.detail.productId);
        });

        window.addEventListener('checkout', () => {
            handlers.checkout();
        });
    }

    /**
     * Configura los eventos del formulario de checkout
     * @param {Object} handlers - Manejadores de eventos
     */
    setupCheckoutFormEvents(handlers) {
        window.addEventListener('processPayment', () => {
            handlers.processPayment();
        });

        window.addEventListener('backToCart', () => {
            handlers.backToCart();
        });

        window.addEventListener('backToHome', () => {
            handlers.backToHome();
        });

        window.addEventListener('tryAgain', () => {
            handlers.tryAgain();
        });
    }
}

export default CartView;