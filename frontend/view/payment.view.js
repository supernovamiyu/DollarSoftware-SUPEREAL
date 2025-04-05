// PaymentView.js - Maneja la interfaz de pagos
export class PaymentView {
    constructor() {
        this.containerSelector = "#container-principal";
        this.paymentTemplateSelector = "#pasarela-de-pagos-simulada";
        this.currentPaymentMethod = 'tarjeta'; // Método de pago por defecto
        this.cardFlipped = false;
    }

    getContainer() {
        return document.querySelector(this.containerSelector);
    }

    renderPaymentScreen() {
        const container = this.getContainer();
        const template = document.querySelector(this.paymentTemplateSelector);

        if (!container || !template) {
            console.error("Elementos DOM requeridos no encontrados");
            return false;
        }

        // Clonar la plantilla
        const clone = template.content.cloneNode(true);
        container.innerHTML = "";
        container.appendChild(clone);

        return true;
    }

    fillUserData(userData) {
        const cardholderInput = document.getElementById("titular-tarjeta");
        const addressInput = document.getElementById("direccion");
        const cityInput = document.getElementById("ciudad");

        if (cardholderInput && userData.nombre_completo) {
            cardholderInput.value = userData.nombre_completo;
            this.updateCardholderDisplay(userData.nombre_completo);
        }

        if (addressInput && userData.direccion) {
            addressInput.value = userData.direccion;
        }

        if (cityInput && userData.ciudad) {
            cityInput.value = userData.ciudad;
        }
    }

    loadOrderSummary(cartItems, total) {
        const productsContainer = document.getElementById("resumen-productos");
        const totalElement = document.getElementById("total-pagar");

        if (!productsContainer || !totalElement) {
            console.error("Elementos del resumen de pedido no encontrados");
            return;
        }

        productsContainer.innerHTML = "";

        if (cartItems.length === 0) {
            productsContainer.innerHTML = "<p>No hay productos en el carrito</p>";
            totalElement.textContent = "$0";
            return;
        }

        // Agregar cada producto al resumen
        cartItems.forEach(product => {
            const price = Number.parseFloat(product.precio);
            const subtotal = price * product.cantidad;

            const productElement = document.createElement("div");
            productElement.className = "producto-resumen";
            productElement.innerHTML = `
          <div class="producto-info">
            <img src="${product.imagen_url}" alt="${product.nombre_producto}" class="producto-imagen">
            <div class="producto-detalles">
              <div class="producto-nombre">${product.nombre_producto}</div>
              <div class="producto-cantidad">Cantidad: ${product.cantidad}</div>
            </div>
          </div>
          <div class="producto-precio">$${isNaN(subtotal) ? 0 : subtotal.toLocaleString()}</div>
        `;

            productsContainer.appendChild(productElement);
        });

        // Mostrar total
        totalElement.textContent = `$${total.toLocaleString()}`;
    }

    showPaymentMethod(method) {
        this.currentPaymentMethod = method;

        // Ocultar todos los formularios de pago
        document.querySelectorAll('.formulario-metodo-pago').forEach(form => {
            form.style.display = 'none';
        });

        // Mostrar el formulario seleccionado
        const activeForm = document.getElementById(`formulario-${method}`);
        if (activeForm) {
            activeForm.style.display = 'block';
        }
    }

    flipCard() {
        const card = document.querySelector('.tarjeta-simulada');
        if (card) {
            this.cardFlipped = !this.cardFlipped;
            if (this.cardFlipped) {
                card.classList.add('flip');
            } else {
                card.classList.remove('flip');
            }
        }
    }

    updateCardNumberDisplay(value) {
        const cardNumberDisplay = document.querySelector('.numero-tarjeta-display');
        if (cardNumberDisplay) {
            if (value.length > 0) {
                cardNumberDisplay.textContent = value;
            } else {
                cardNumberDisplay.textContent = '•••• •••• •••• ••••';
            }
        }
    }

    updateCardholderDisplay(value) {
        const cardholderDisplay = document.querySelector('.titular-tarjeta-display');
        if (cardholderDisplay) {
            if (value.length > 0) {
                cardholderDisplay.textContent = value.toUpperCase();
            } else {
                cardholderDisplay.textContent = 'NOMBRE DEL TITULAR';
            }
        }
    }

    updateExpiryDisplay(value) {
        const expiryDisplay = document.querySelector('.fecha-tarjeta-display');
        if (expiryDisplay) {
            if (value.length > 0) {
                expiryDisplay.textContent = value;
            } else {
                expiryDisplay.textContent = 'MM/AA';
            }
        }
    }

    updateCVVDisplay(value) {
        const cvvDisplay = document.querySelector('.cvv-display');
        if (cvvDisplay) {
            if (value.length > 0) {
                cvvDisplay.textContent = value;
            } else {
                cvvDisplay.textContent = '•••';
            }
        }
    }

    showProcessingScreen() {
        const paymentForm = document.getElementById('formulario-pago');
        const processingScreen = document.getElementById('procesando-pago');

        if (paymentForm) paymentForm.style.display = 'none';
        if (processingScreen) processingScreen.style.display = 'block';
    }

    showSuccessScreen(orderId) {
        const processingScreen = document.getElementById('procesando-pago');
        const successScreen = document.getElementById('pago-exitoso');

        if (processingScreen) processingScreen.style.display = 'none';
        if (successScreen) successScreen.style.display = 'block';

        const orderNumberElement = document.getElementById('numero-pedido');
        if (orderNumberElement) {
            orderNumberElement.textContent = orderId || Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        }
    }

    showErrorScreen(errorMessage) {
        const processingScreen = document.getElementById('procesando-pago');
        const errorScreen = document.getElementById('pago-fallido');

        if (processingScreen) processingScreen.style.display = 'none';
        if (errorScreen) errorScreen.style.display = 'block';

        const errorMessageElement = document.getElementById('mensaje-error');
        if (errorMessageElement) {
            errorMessageElement.textContent = errorMessage || 'Ha ocurrido un error al procesar su pago.';
        }
    }

    showFormError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    validatePaymentForm() {
        // Validar según el método de pago
        if (this.currentPaymentMethod === 'tarjeta') {
            return this.validateCardForm();
        } else if (this.currentPaymentMethod === 'pse') {
            return this.validatePSEForm();
        } else if (this.currentPaymentMethod === 'efectivo') {
            return this.validateCashForm();
        }

        // Validar dirección y términos
        return this.validateAddress() && this.validateTerms();
    }

    validateCardForm() {
        const cardNumber = document.getElementById('numero-tarjeta');
        const cardholder = document.getElementById('titular-tarjeta');
        const expiryDate = document.getElementById('fecha-vencimiento');
        const cvv = document.getElementById('cvv');

        let isValid = true;

        if (!cardNumber || !cardNumber.value.trim()) {
            this.showFormError('error-numero-tarjeta', 'El número de tarjeta es obligatorio');
            isValid = false;
        } else if (cardNumber.value.replace(/\s/g, '').length < 16) {
            this.showFormError('error-numero-tarjeta', 'El número de tarjeta debe tener al menos 16 dígitos');
            isValid = false;
        }

        if (!cardholder || !cardholder.value.trim()) {
            this.showFormError('error-titular-tarjeta', 'El nombre del titular es obligatorio');
            isValid = false;
        }

        if (!expiryDate || !expiryDate.value.trim()) {
            this.showFormError('error-fecha-vencimiento', 'La fecha de vencimiento es obligatoria');
            isValid = false;
        }

        if (!cvv || !cvv.value.trim()) {
            this.showFormError('error-cvv', 'El CVV es obligatorio');
            isValid = false;
        } else if (!/^\d{3,4}$/.test(cvv.value)) {
            this.showFormError('error-cvv', 'El CVV debe tener 3 o 4 dígitos');
            isValid = false;
        }

        return isValid;
    }

    validatePSEForm() {
        const bank = document.getElementById('banco');

        let isValid = true;

        if (!bank || !bank.value) {
            this.showFormError('error-banco', 'Seleccione un banco');
            isValid = false;
        }

        return isValid;
    }

    validateCashForm() {
        const paymentPoint = document.getElementById('punto-pago');

        let isValid = true;

        if (!paymentPoint || !paymentPoint.value) {
            this.showFormError('error-punto-pago', 'Seleccione un punto de pago');
            isValid = false;
        }

        return isValid;
    }

    validateAddress() {
        const address = document.getElementById('direccion');

        let isValid = true;

        if (!address || !address.value.trim()) {
            this.showFormError('error-direccion', 'La dirección es obligatoria');
            isValid = false;
        }

        return isValid;
    }

    validateTerms() {
        const terms = document.getElementById('aceptar-terminos');

        let isValid = true;

        if (!terms || !terms.checked) {
            this.showFormError('error-terminos', 'Debe aceptar los términos y condiciones');
            isValid = false;
        }

        return isValid;
    }

    setupEventListeners(handlers) {
        // Selección de método de pago
        const paymentOptions = document.querySelectorAll('input[name="metodo-pago"]');
        if (paymentOptions.length > 0) {
            paymentOptions.forEach(option => {
                option.addEventListener('change', (event) => {
                    this.showPaymentMethod(event.target.value);
                });
            });
        }

        // Botón de volver al carrito
        const backToCartButton = document.getElementById("volver-carrito");
        if (backToCartButton && handlers.backToCart) {
            backToCartButton.addEventListener("click", handlers.backToCart);
        }

        // Formulario de pago
        const paymentForm = document.getElementById("formulario-pago");
        if (paymentForm && handlers.processPayment) {
            paymentForm.addEventListener("submit", (event) => {
                event.preventDefault();

                if (this.validatePaymentForm()) {
                    // Obtener datos de envío
                    const address = document.getElementById("direccion").value;
                    const city = document.getElementById("ciudad").value;

                    handlers.processPayment({
                        direccion: address,
                        ciudad: city,
                        metodo_pago: this.currentPaymentMethod
                    });
                }
            });
        }

        // Eventos de simulación de tarjeta de crédito
        this.setupCardEvents();

        // Botón de intentar nuevamente
        const tryAgainButton = document.getElementById('intentar-nuevamente');
        if (tryAgainButton) {
            tryAgainButton.addEventListener('click', () => {
                const errorScreen = document.getElementById('pago-fallido');
                const paymentForm = document.getElementById('formulario-pago');

                if (errorScreen) errorScreen.style.display = 'none';
                if (paymentForm) paymentForm.style.display = 'block';
            });
        }

        // Botón de volver al inicio
        const backToHomeButton = document.getElementById('volver-inicio');
        if (backToHomeButton) {
            backToHomeButton.addEventListener('click', () => {
                if (handlers.backToHome) {
                    handlers.backToHome();
                }
            });
        }
    }

    setupCardEvents() {
        // Eventos de enfoque del CVV
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('focus', () => this.flipCard());
            cvvInput.addEventListener('blur', () => this.flipCard());
        }

        // Input del número de tarjeta
        const cardNumberInput = document.getElementById('numero-tarjeta');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (event) => {
                const input = event.target;
                let value = input.value.replace(/\D/g, '');

                // Formatear con espacios cada 4 dígitos
                if (value.length > 0) {
                    value = value.match(/.{1,4}/g).join(' ');
                }

                // Actualizar input y visualización
                input.value = value;
                this.updateCardNumberDisplay(value);
            });
        }

        // Input del titular de la tarjeta
        const cardholderInput = document.getElementById('titular-tarjeta');
        if (cardholderInput) {
            cardholderInput.addEventListener('input', (event) => {
                const value = event.target.value.toUpperCase();
                this.updateCardholderDisplay(value);
            });
        }

        // Input de la fecha de vencimiento
        const expiryInput = document.getElementById('fecha-vencimiento');
        if (expiryInput) {
            expiryInput.addEventListener('input', (event) => {
                const input = event.target;
                let value = input.value.replace(/\D/g, '');

                // Formatear como MM/AA
                if (value.length > 0) {
                    if (value.length <= 2) {
                        value = value;
                    } else {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                    }
                }

                // Actualizar input y visualización
                input.value = value;
                this.updateExpiryDisplay(value);
            });
        }

        // Input del CVV
        if (cvvInput) {
            cvvInput.addEventListener('input', (event) => {
                const input = event.target;
                const value = input.value.replace(/\D/g, '');

                // Actualizar input y visualización
                input.value = value;
                this.updateCVVDisplay(value);
            });
        }
    }
}