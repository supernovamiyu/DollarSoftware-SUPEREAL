const { jsPDF } = window.jspdf

/**
 * Controlador para el carrito de compras (Versión mejorada)
 */
class CartController {
    constructor(model, view, productModel, userModel) {
        this.model = model
        this.view = view
        this.productModel = productModel
        this.userModel = userModel
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
     * Inicializa el controlador sin mostrar el carrito
     */
    async initWithoutDisplay() {
        if (this.isInitialized) return

        // Configurar event listeners
        this.setupGlobalEventListeners()

        this.isInitialized = true
        console.log("CartController inicializado (sin mostrar carrito)")
    }

    /**
     * Inicializa el controlador completo (para cuando se navega explícitamente al carrito)
     */
    async init() {
        if (!this.isInitialized) {
            // Si no está inicializado, configurar event listeners
            this.setupGlobalEventListeners()
            this.isInitialized = true
            console.log("CartController inicializado completamente")
        }

        // Mostrar el carrito (solo cuando se llama explícitamente)
        await this.updateCartDisplay()
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
            this.generateInvoicePDF(e.detail.result)
        })

        window.addEventListener("downloadFailedTransaction", (e) => {
            this.generateFailedTransactionPDF({ error: e.detail.error })
        })

        window.addEventListener("validateDeliveryEmail", async (e) => {
            const { email } = e.detail
            await this.handleEmailValidation(email)
        })

        // Agregar evento para "addToCart" global
        window.addEventListener("addToCart", async (e) => {
            console.log("Evento addToCart recibido en controller:", e.detail)
            const { productId } = e.detail
            if (productId) {
                await this.addToCart(productId)
            }
        })
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
        const paymentMethods = this.paymentGateway ? this.paymentGateway.getPaymentMethods() : null
        const testCards = this.paymentGateway ? this.paymentGateway.getTestCards() : null
        const banks = this.paymentGateway ? this.paymentGateway.getBanks() : null

        this.view.showCheckout(cartItems, total, paymentMethods, testCards, banks)
    }

    /**
     * Procesa el pago
     * @param {Object} paymentData - Datos del pago
     */
    async processPayment(paymentData) {
        try {
            const deliveryMethodRadio = document.querySelector('input[name="deliveryMethod"]:checked')
            const deliveryMethod = deliveryMethodRadio ? deliveryMethodRadio.value : "STORE_PICKUP"

            // Obtener datos del formulario
            const email = document.getElementById("deliveryEmail").value

            // Verificar si el usuario está registrado
            const isRegistered = await this.model.verifyUserEmail(email)

            // Recolectar datos de entrega
            const deliveryDetails = {
                email,
                isRegistered,
                method: deliveryMethod,
                address: deliveryMethod === "HOME_DELIVERY" ? document.getElementById("deliveryAddress").value : null,
                city:
                    deliveryMethod === "HOME_DELIVERY"
                        ? document.getElementById("deliveryCity").value
                        : document.getElementById("pickupCity").value,
                store: deliveryMethod === "STORE_PICKUP" ? document.getElementById("pickupStore").value : null,
                phone: deliveryMethod === "HOME_DELIVERY" ? document.getElementById("deliveryPhone").value : null,
            }

            // Mostrar procesamiento de pago
            this.view.showProcessingPayment()

            // Procesar pago
            const paymentResult = await this.paymentGateway.processPayment(paymentData.formData, paymentData.method, {
                deliveryDetails,
            })

            if (paymentResult.success) {
                // Crear el pedido en la base de datos
                const orderResult = await this.createOrder(paymentResult, deliveryDetails)

                if (orderResult.success) {
                    await this.handlePaymentSuccess(orderResult, deliveryDetails)
                } else {
                    this.handlePaymentFailure(orderResult.error)
                }
            } else {
                this.handlePaymentFailure(paymentResult.error)
            }
        } catch (error) {
            console.error("Error en processPayment:", error)
            this.handlePaymentFailure({
                error: error.message || "Error al procesar el pago",
            })
        }
    }

    /**
     * Maneja el pago exitoso
     * @param {Object} result - Resultado del pago
     */
    async handlePaymentSuccess(result, deliveryDetails) {
        const cartItems = [...this.model.getCartItems()]
        const total = this.model.getCartTotal()

        // Generar factura PDF
        await this.generateInvoicePDF(result, cartItems, total, deliveryDetails)

        // Limpiar carrito
        await this.model.clearCart()
        window.dispatchEvent(new CustomEvent("cartUpdated"))

        // Comportamiento diferente según tipo de usuario
        if (deliveryDetails.isRegistered) {
            // Para usuarios registrados
            this.view.showMessage("Pedido confirmado. Puedes hacer seguimiento desde tu perfil.", "success")

            // Ocultar opción de descarga (ya está en su perfil)
            this.view.showPaymentSuccess(result, true)

            // Disparar evento para actualizar pedidos en perfil
            window.dispatchEvent(new CustomEvent("userOrderCreated"))
        } else {
            // Para usuarios no registrados
            this.view.showMessage("Pedido confirmado. Se ha descargado tu factura.", "success")

            // Mostrar botón de descarga por si necesitan otra copia
            this.view.showPaymentSuccess(result, false)
        }
    }

    /**
     * Maneja el pago fallido
     * @param {Object} result - Resultado del pago
     */
    handlePaymentFailure(result) {
        this.view.showPaymentFailure(result.error || "Error desconocido al procesar el pago")

        // Generar volante de transacción fallida
        this.generateFailedTransactionPDF(result)
    }
    // Generar facturas
    generateInvoicePDF(paymentResult, cartItems, total, deliveryDetails) {
        const now = new Date()
        const doc = new jsPDF()

        // Configuración inicial
        doc.setProperties({
            title: `Factura ${paymentResult.transactionId || "000000"}`,
            subject: "Compra en Ultra Commerce",
            author: "Dollar Software",
        })

        // Encabezado
        doc.setFontSize(22)
        doc.setTextColor(113, 137, 255)
        doc.text("FACTURA DE COMPRA", 105, 20, { align: "center" })

        // Información de la factura
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        doc.text(`N°: ${paymentResult.transactionId || "000000"}`, 15, 30)
        doc.text(`Fecha: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 15, 36)

        // Mostrar leyenda de precios con IVA incluido
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        doc.text("* Todos los precios incluyen IVA (19%)", 15, 50)

        // Logo
        try {
            const logoUrl = "/frontend/assets/img/logo-moradito.png"
            doc.addImage(logoUrl, "PNG", 160, 20, 30, 15)
        } catch (e) {
            console.log("Error al cargar el logo:", e)
        }

        // Línea separadora
        doc.setDrawColor(113, 137, 255)
        doc.setLineWidth(0.5)
        doc.line(15, 45, 195, 45)

        // Detalles de productos
        doc.setFontSize(14)
        doc.text("Detalles de la compra", 15, 55)

        // Preparamos los datos para la tabla
        const headers = [["Producto", "Cantidad", "Precio (IVA incluido)", "Subtotal"]]
        const data = cartItems.map((item) => [
            item.nombre_producto.substring(0, 30),
            item.cantidad,
            `$${Number(item.precio).toFixed(2)}`,
            `$${(Number(item.precio) * item.cantidad).toFixed(2)}`,
        ])

        // Añadimos la tabla
        doc.autoTable({
            startY: 60,
            head: headers,
            body: data,
            theme: "grid",
            headStyles: {
                fillColor: [113, 137, 255],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            columnStyles: {
                0: { cellWidth: "auto" },
                1: { cellWidth: 20 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 },
            },
            styles: {
                fontSize: 10,
                cellPadding: 3,
                overflow: "linebreak",
            },
            didDrawPage: (data) => {
                // Footer en cada página
                doc.setFontSize(8)
                doc.setTextColor(150)
                doc.text(`Página ${data.pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10)
            },
        })

        // Sección de totales
        const finalY = doc.lastAutoTable.finalY + 15

        // Desglose del IVA
        const base = total / 1.19
        const iva = total - base

        doc.setFontSize(10)
        doc.text("Desglose de impuestos:", 15, finalY)

        doc.text("Subtotal:", 150, finalY)
        doc.text(`$${base.toFixed(2)}`, 170, finalY)

        doc.text("IVA (19%):", 150, finalY + 8)
        doc.text(`$${iva.toFixed(2)}`, 170, finalY + 8)

        // Total
        doc.setFontSize(14)
        doc.setFont(undefined, "bold")
        doc.text("TOTAL:", 150, finalY + 20)
        doc.text(`$${total.toFixed(2)}`, 170, finalY + 20)

        // Método de pago
        doc.setFontSize(10)
        doc.setFont(undefined, "normal")
        doc.text(`Método de pago: ${paymentResult.method || "Tarjeta de crédito"}`, 15, finalY + 30)

        // Sección de envío
        const deliveryY = finalY + 40
        doc.setFontSize(12)
        doc.text("Información de envío:", 15, deliveryY)

        if (deliveryDetails && deliveryDetails.method === "STORE_PICKUP") {
            doc.text("Método: Recogida en tienda", 15, deliveryY + 8)
            doc.text(
                `Ubicación: ${deliveryDetails.store || "No especificada"}, ${deliveryDetails.city || "No especificada"}`,
                15,
                deliveryY + 16,
            )
        } else if (deliveryDetails && deliveryDetails.method === "HOME_DELIVERY") {
            doc.text("Método: Envío a domicilio", 15, deliveryY + 8)
            doc.text(
                `Dirección: ${deliveryDetails.address || "No especificada"}, ${deliveryDetails.city || "No especificada"}`,
                15,
                deliveryY + 16,
            )
            doc.text(`Teléfono: ${deliveryDetails.phone || "No especificado"}`, 15, deliveryY + 24)
        }

        // Mensaje según tipo de usuario
        const messageY = deliveryY + (deliveryDetails?.method === "STORE_PICKUP" ? 24 : 32)
        doc.setFontSize(10)

        if (deliveryDetails?.isRegistered) {
            doc.setTextColor(0, 100, 0) // Verde oscuro
            doc.text("Puedes hacer seguimiento de tu pedido desde tu perfil de usuario.", 15, messageY)
        } else {
            doc.setTextColor(100, 100, 100) // Gris
            doc.text("Para consultas sobre tu pedido, contáctanos a atencioncliente@dollarsoftware.com", 15, messageY)
        }

        // Restaurar color
        doc.setTextColor(0, 0, 0)

        // Pie de página
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        doc.text("Gracias por su compra - Dollar Software Ultra Commerce", 105, 280, { align: "center" })
        doc.text("Si tiene alguna pregunta, contacte a: atencioncliente@dollarsoftware.com", 105, 285, { align: "center" })

        // Guardar PDF
        doc.save(`factura_${paymentResult.transactionId || now.getTime()}.pdf`)
    }

    // Generar volantes de transacción fallida

    generateFailedTransactionPDF(paymentResult) {
        const now = new Date()
        const doc = new jsPDF()

        // Encabezado
        doc.setFontSize(22)
        doc.setTextColor(255, 0, 0)
        doc.text("TRANSACCIÓN NO COMPLETADA", 105, 20, { align: "center" })

        doc.setFontSize(12)
        doc.setTextColor(0, 0, 0)
        doc.text(`Fecha: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 15, 30)

        // Logo
        doc.addImage("/frontend/assets/img/logo-moradito.png", "PNG", 160, 20, 30, 15)

        // Línea separadora
        doc.setDrawColor(255, 0, 0)
        doc.setLineWidth(0.5)
        doc.line(15, 45, 195, 45)

        // Mensaje de error
        doc.setFontSize(14)
        doc.text("Detalles del error:", 15, 55)
        doc.setFontSize(12)

        const errorMessage = paymentResult.error || "Error desconocido al procesar el pago"
        const splitMessage = doc.splitTextToSize(errorMessage, 180)
        doc.text(splitMessage, 15, 65)

        // Instrucciones
        doc.setFontSize(14)
        doc.text("¿Qué puedes hacer?", 15, 85)
        doc.setFontSize(12)
        doc.text("1. Verifica los datos de tu método de pago", 15, 95)
        doc.text("2. Intenta nuevamente con otra tarjeta o método", 15, 105)
        doc.text("3. Contacta a tu banco para verificar el problema", 15, 115)
        doc.text("4. Si el problema persiste, contáctanos", 15, 125)

        // Pie de página
        doc.setFontSize(10)
        doc.setTextColor(100, 100, 100)
        doc.text("Dollar Software Ultra Commerce - Atención al cliente", 105, 280, { align: "center" })

        // Guardar PDF
        doc.save(`volante_error_pago_${now.getTime()}.pdf`)
    }

    async createOrder(paymentResult, deliveryDetails) {
        try {
            const cartItems = this.model.getCartItems()
            const total = this.model.getCartTotal()
            const subtotal = total / 1.19 // Asumiendo 19% de IVA
            const impuesto = total - subtotal

            // Datos básicos del pedido
            const orderData = {
                fk_id_metodo_envio: deliveryDetails.method === "HOME_DELIVERY" ? "EAD" : "RET",
                fecha_de_pedido: new Date().toISOString().slice(0, 19).replace("T", " "),
                fk_id_ciudad: deliveryDetails.city,
                direccion: deliveryDetails.address || "Recogida en tienda: " + deliveryDetails.store,
                fk_id_estado_envio: "PRE", // Estado inicial: Pendiente
                subtotal: subtotal.toFixed(2),
                impuesto: impuesto.toFixed(2),
                total: total.toFixed(2),
                vigencia_factura: "30 días",
            }

            // Para usuarios registrados
            if (deliveryDetails.isRegistered) {
                // Obtener el ID del usuario desde el modelo de usuario
                const user = this.userModel.getCurrentUser()
                if (!user) {
                    throw new Error("Usuario no autenticado")
                }
                orderData.fk_id_usuario = user.id_usuario

                const response = await fetch("http://localhost:3000/api/delivery/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                })

                if (!response.ok) {
                    throw new Error("Error al crear el pedido")
                }

                return {
                    success: true,
                    orderData: await response.json(),
                }
            }
            // Para usuarios no registrados
            else {
                return {
                    success: true,
                    orderData: {
                        ...orderData,
                        id_pedido: "TEMP-" + Date.now(), // ID temporal
                    },
                }
            }
        } catch (error) {
            console.error("Error al crear pedido:", error)
            return {
                success: false,
                error: error.message || "Error al crear el pedido",
            }
        }
    }
}

export default CartController
