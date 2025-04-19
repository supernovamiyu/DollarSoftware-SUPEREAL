const { jsPDF } = window.jspdf;

/**
 * Controlador para el carrito de compras (Versión mejorada)
 */
class CartController {
    constructor(model, view, productModel) {
        this.model = model
        this.view = view
        this.productModel = productModel
        this.isInitialized = false
        
        // Importar la pasarela de pagos
        import('./payment.gateway.js').then(module => {
            this.paymentGateway = new module.default();
            this.init();
        }).catch(error => {
            console.error("Error al cargar la pasarela de pagos:", error);
            this.init();
        });
    }

    /**
     * Inicializa el controlador
     */
    async init() {
        if (this.isInitialized) return

        // Configurar event listeners
        this.setupGlobalEventListeners()

        // Mostrar el carrito inicial
        await this.updateCartDisplay()

        this.isInitialized = true
        console.log("CartController inicializado")
    }

    /**
     * Configura los event listeners globales
     */
    setupGlobalEventListeners() {
        // Delegación de eventos para los botones "comprar"
        document.addEventListener("click", async (e) => {
            const addToCartBtn = e.target.closest(".comprar")
            if (addToCartBtn) {
                e.preventDefault()
                await this.handleAddToCartClick(addToCartBtn)
            }
        })

        // Evento para actualizar la vista del carrito
        window.addEventListener("cartUpdated", () => {
            this.updateCartDisplay()
        })

        // Configurar eventos del carrito directamente aquí
        window.addEventListener("updateQuantity", async (e) => {
            console.log("Evento updateQuantity recibido en controller:", e.detail)
            const { productId, quantity } = e.detail
            await this.updateQuantity(productId, quantity)
        })

        window.addEventListener("removeItem", async (e) => {
            console.log("Evento removeItem recibido en controller:", e.detail)
            const { productId } = e.detail
            await this.removeItem(productId)
        })

        window.addEventListener("checkout", () => {
            console.log("Evento checkout recibido en controller")
            this.proceedToCheckout()
        })

        // Configurar eventos del checkout
        window.addEventListener("processPayment", (e) => {
            console.log("Evento processPayment recibido en controller", e.detail)
            this.processPayment(e.detail)
        })

        window.addEventListener("backToCart", () => {
            console.log("Evento backToCart recibido en controller")
            this.showCart()
        })

        window.addEventListener("backToHome", () => {
            console.log("Evento backToHome recibido en controller")
            window.dispatchEvent(new CustomEvent("showHomePage"))
        })

        window.addEventListener("tryAgain", () => {
            console.log("Evento tryAgain recibido en controller")
            this.view.showCheckoutForm()
        })
        
        // Nuevo evento para cambiar método de pago
        window.addEventListener("changePaymentMethod", (e) => {
            console.log("Evento changePaymentMethod recibido en controller", e.detail)
            this.view.showPaymentMethodForm(e.detail.method)
        })

        // Configurar eventos de descarga de PDF
        window.addEventListener("downloadInvoice", (e) => {
            this.generateInvoicePDF(e.detail.result);
        });

        window.addEventListener("downloadFailedTransaction", (e) => {
            this.generateFailedTransactionPDF({ error: e.detail.error });
        });
    }

    /**
     * Maneja el clic en el botón "comprar"
     * @param {HTMLElement} button - Botón que disparó el evento
     */
    async handleAddToCartClick(button) {
        const productId = button.getAttribute("data-id")
        if (!productId) return

        // Deshabilitar el botón durante la operación
        button.disabled = true
        const originalText = button.textContent
        button.textContent = "Agregando..."

        try {
            await this.addToCart(productId)
        } finally {
            // Restaurar el botón
            button.textContent = originalText
            button.disabled = false
        }
    }

    /**
     * Agrega un producto al carrito
     * @param {string} productId - ID del producto
     */
    async addToCart(productId) {
        try {
            // Verificar si el producto ya está en el carrito
            if (this.model.isProductInCart(productId)) {
                this.view.showMessage("El producto ya está en tu carrito", "info")
                return
            }

            // Obtener los detalles del producto
            const product = await this.productModel.getProductDetails(productId)
            if (!product) {
                this.view.showMessage("No se pudo obtener la información del producto", "error")
                return
            }

            // Agregar al carrito
            const result = await this.model.addToCart(product)

            if (result.success) {
                this.view.showMessage("Producto agregado al carrito", "success")
                window.dispatchEvent(new CustomEvent("cartUpdated"))

                // Actualizar botones de agregar al carrito
                this.updateAddToCartButtons(productId)
            } else {
                this.view.showMessage(result.error || "Error al agregar al carrito", "error")
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error)
            this.view.showMessage("Error al agregar el producto al carrito", "error")
        }
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {string} productId - ID del producto
     * @param {number} quantity - Nueva cantidad
     */
    async updateQuantity(productId, quantity) {
        console.log(`Actualizando cantidad para producto ${productId} a ${quantity}`)
        try {
            const result = await this.model.updateQuantity(productId, quantity)
            if (result.success) {
                console.log("Cantidad actualizada con éxito")
                await this.updateCartDisplay()
            } else {
                console.error("Error al actualizar cantidad:", result.error)
                this.view.showMessage(result.error || "Error al actualizar cantidad", "error")
            }
        } catch (error) {
            console.error("Error al actualizar cantidad:", error)
            this.view.showMessage("Error al actualizar la cantidad del producto", "error")
        }
    }

    /**
     * Elimina un producto del carrito
     * @param {string} productId - ID del producto
     */
    async removeItem(productId) {
        console.log(`Eliminando producto ${productId}`)
        try {
            const result = await this.model.removeFromCart(productId)
            if (result.success) {
                this.view.showMessage("Producto eliminado del carrito", "success")
                this.updateAddToCartButtons(productId)
                await this.updateCartDisplay()
            } else {
                this.view.showMessage(result.error || "Error al eliminar producto", "error")
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error)
            this.view.showMessage("Error al eliminar el producto del carrito", "error")
        }
    }

    /**
     * Actualiza los botones de "Agregar al carrito" para un producto específico
     * @param {string} productId - ID del producto
     */
    updateAddToCartButtons(productId) {
        document.querySelectorAll(`.comprar[data-id="${productId}"]`).forEach((button) => {
            if (this.model.isProductInCart(productId)) {
                button.disabled = true
                button.textContent = "En el carrito"
            } else {
                button.disabled = false
                button.textContent = "Comprar"
            }
        })
    }

    /**
     * Actualiza la visualización del carrito
     */
    async updateCartDisplay() {
        const cartItems = this.model.getCartItems()
        const total = this.model.getCartTotal()
        console.log("Actualizando vista del carrito con", cartItems.length, "productos")
        this.view.updateCartDisplay(cartItems, total)
    }

    /**
     * Muestra el carrito de compras
     */
    async showCart() {
        await this.updateCartDisplay()
    }

    /**
     * Procede al checkout
     */
    async proceedToCheckout() {
        const cartItems = this.model.getCartItems()

        if (cartItems.length === 0) {
            this.view.showMessage("Tu carrito está vacío", "warning")
            return
        }

        const total = this.model.getCartTotal()
        
        // Pasar los métodos de pago disponibles a la vista
        const paymentMethods = this.paymentGateway ? this.paymentGateway.getPaymentMethods() : null;
        const testCards = this.paymentGateway ? this.paymentGateway.getTestCards() : null;
        const banks = this.paymentGateway ? this.paymentGateway.getBanks() : null;
        
        this.view.showCheckout(cartItems, total, paymentMethods, testCards, banks)
    }

    /**
     * Procesa el pago
     * @param {Object} paymentData - Datos del pago
     */
    async processPayment(paymentData) {
        if (!this.paymentGateway) {
            this.view.showMessage("Error: Pasarela de pagos no disponible", "error");
            return;
        }
        
        this.view.showProcessingPayment();

        try {
            // Usar la pasarela de pagos para procesar el pago
            const result = await this.paymentGateway.processPayment(
                paymentData.formData, 
                paymentData.method
            );
            
            if (result.success) {
                await this.handlePaymentSuccess(result);
            } else {
                this.handlePaymentFailure(result);
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            this.handlePaymentFailure({
                error: "Error inesperado al procesar el pago. Por favor, inténtalo de nuevo."
            });
        }
    }

    /**
     * Maneja el pago exitoso
     * @param {Object} result - Resultado del pago
     */
    async handlePaymentSuccess(result) {
        const cartItems = [...this.model.getCartItems()];;
        const total = this.model.getCartTotal();

        console.log(cartItems);

        this.view.showPaymentSuccess(result);
        await this.model.clearCart();
        window.dispatchEvent(new CustomEvent("cartUpdated"));
        
        // Generar factura PDF
        this.generateInvoicePDF(result, cartItems, total);
    }

    /**
     * Maneja el pago fallido
     * @param {Object} result - Resultado del pago
     */
    handlePaymentFailure(result) {
        this.view.showPaymentFailure(result.error || "Error desconocido al procesar el pago");
        
        // Generar volante de transacción fallida
        this.generateFailedTransactionPDF(result);
    }
    // Generar facturas 
    generateInvoicePDF(paymentResult, cartItems, total) {
        const now = new Date();
        const doc = new jsPDF();
        
        // Configuración inicial
        doc.setProperties({
            title: `Factura ${paymentResult.transactionId || '000000'}`,
            subject: 'Compra en Ultra Commerce',
            author: 'Dollar Software'
        });
    
        // Encabezado
        doc.setFontSize(22);
        doc.setTextColor(113, 137, 255);
        doc.text('FACTURA DE COMPRA', 105, 20, { align: 'center' });
        
        // Información de la factura
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`N°: ${paymentResult.transactionId || '000000'}`, 15, 30);
        doc.text(`Fecha: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 15, 36);
        
        // Mostrar leyenda de precios con IVA incluido
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('* Todos los precios incluyen IVA (19%)', 15, 50);
        
        // Logo
        try {
            const logoUrl = '/frontend/assets/img/logo-moradito.png';
            doc.addImage(logoUrl, 'PNG', 160, 20, 30, 15);
        } catch (e) {
            console.log('Error al cargar el logo:', e);
        }
        
        // Línea separadora
        doc.setDrawColor(113, 137, 255);
        doc.setLineWidth(0.5);
        doc.line(15, 45, 195, 45);
        
        // Detalles de productos
        doc.setFontSize(14);
        doc.text('Detalles de la compra', 15, 55);
        
        // Preparamos los datos para la tabla
        const headers = [['Producto', 'Cantidad', 'Precio (IVA incluido)', 'Subtotal']];
        const data = cartItems.map(item => [
            item.nombre_producto.substring(0, 30),
            item.cantidad,
            `$${Number(item.precio).toFixed(2)}`, // Precio ya incluye IVA
            `$${(Number(item.precio) * item.cantidad).toFixed(2)}`
        ]);
        
        // Añadimos la tabla
        doc.autoTable({
            startY: 60,
            head: headers,
            body: data,
            theme: 'grid',
            headStyles: {
                fillColor: [113, 137, 255],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 20 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 }
            },
            styles: {
                fontSize: 10,
                cellPadding: 3,
                overflow: 'linebreak'
            },
            didDrawPage: function(data) {
                // Footer en cada página
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(
                    `Página ${data.pageCount}`,
                    data.settings.margin.left,
                    doc.internal.pageSize.height - 10
                );
            }
        });
        
        // Sección de totales (modificada)
        const finalY = doc.lastAutoTable.finalY + 15;
            
        // Desglose del IVA
        const base = total / 1.19;
        const iva = total - base; 
        
        doc.setFontSize(10);
        doc.text('Desglose de impuestos:', 15, finalY);
        
        doc.text('Subtotal:', 150, finalY);
        doc.text(`$${base.toFixed(2)}`, 170, finalY);
        
        doc.text('IVA (19%):', 150, finalY + 8);
        doc.text(`$${iva.toFixed(2)}`, 170, finalY + 8);
        
        // Total
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('TOTAL:', 150, finalY + 20);
        doc.text(`$${total.toFixed(2)}`, 170, finalY + 20);
        
        // Método de pago
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Método de pago: ${paymentResult.method || 'Tarjeta de crédito'}`, 15, finalY + 30);
        
        // Pie de página
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('Gracias por su compra - Dollar Software Ultra Commerce', 105, 280, { align: 'center' });
        doc.text('Si tiene alguna pregunta, contacte a: atencioncliente@dollarsoftware.com', 105, 285, { align: 'center' });
        
        // Guardar PDF
        doc.save(`factura_${paymentResult.transactionId || now.getTime()}.pdf`);
    }
        
        // Generar volantes de transacción fallida

        generateFailedTransactionPDF(paymentResult) {
            const now = new Date();
            const doc = new jsPDF();
            
            // Encabezado
            doc.setFontSize(22);
            doc.setTextColor(255, 0, 0);
            doc.text('TRANSACCIÓN NO COMPLETADA', 105, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Fecha: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 15, 30);
            
            // Logo
            doc.addImage('/frontend/assets/img/logo-moradito.png', 'PNG', 160, 20, 30, 15);
            
            // Línea separadora
            doc.setDrawColor(255, 0, 0);
            doc.setLineWidth(0.5);
            doc.line(15, 45, 195, 45);
            
            // Mensaje de error
            doc.setFontSize(14);
            doc.text('Detalles del error:', 15, 55);
            doc.setFontSize(12);
            
            const errorMessage = paymentResult.error || 'Error desconocido al procesar el pago';
            const splitMessage = doc.splitTextToSize(errorMessage, 180);
            doc.text(splitMessage, 15, 65);
            
            // Instrucciones
            doc.setFontSize(14);
            doc.text('¿Qué puedes hacer?', 15, 85);
            doc.setFontSize(12);
            doc.text('1. Verifica los datos de tu método de pago', 15, 95);
            doc.text('2. Intenta nuevamente con otra tarjeta o método', 15, 105);
            doc.text('3. Contacta a tu banco para verificar el problema', 15, 115);
            doc.text('4. Si el problema persiste, contáctanos', 15, 125);
            
            // Pie de página
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Dollar Software Ultra Commerce - Atención al cliente', 105, 280, { align: 'center' });
            
            // Guardar PDF
            doc.save(`volante_error_pago_${now.getTime()}.pdf`);
        }

    }


export default CartController
