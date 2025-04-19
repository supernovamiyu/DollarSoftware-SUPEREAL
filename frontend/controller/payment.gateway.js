/**
 * Clase para manejar la pasarela de pagos simulada
 * Proporciona una experiencia más realista sin implementar una pasarela real
 */
class PaymentGateway {
    constructor() {
        this.paymentMethods = {
            card: {
                name: "Tarjeta de crédito/débito",
                fields: ["cardNumber", "cardHolder", "expiryDate", "cvv"],
                icon: "fa-credit-card",
            },
            paypal: {
                name: "PayPal",
                fields: ["email", "password"],
                icon: "fa-brands fa-paypal",
            },
            transfer: {
                name: "Transferencia bancaria",
                fields: ["bankName", "accountNumber"],
                icon: "fa-university",
            },
        }

        // Configuración de tarjetas de prueba (para simulación)
        this.testCards = {
            success: "4111 1111 1111 1111", // Siempre exitosa
            decline: "4000 0000 0000 0002", // Siempre rechazada
            insufficient: "4000 0000 0000 9995", // Fondos insuficientes
            expired: "4000 0000 0000 0069", // Tarjeta expirada
        }

        // Bancos disponibles para transferencia
        this.banks = [
            { id: "banco1", name: "Banco Nacional" },
            { id: "banco2", name: "Banco Provincial" },
            { id: "banco3", name: "Banco Internacional" },
            { id: "banco4", name: "Banco Mercantil" },
        ]
    }

    /**
     * Procesa un pago simulado
     * @param {Object} paymentData - Datos del pago
     * @param {string} method - Método de pago
     * @returns {Promise<Object>} - Resultado del pago
     */
    async processPayment(paymentData, method) {
        // Validar los datos según el método de pago
        const validationResult = this.validatePaymentData(paymentData, method)
        if (!validationResult.valid) {
            return {
                success: false,
                error: validationResult.error,
                code: "VALIDATION_ERROR",
            }
        }

        // Simular tiempo de procesamiento (1-3 segundos)
        const processingTime = 1000 + Math.random() * 2000
        await new Promise((resolve) => setTimeout(resolve, processingTime))

        // Para tarjetas, verificar si es una tarjeta de prueba
        if (method === "card") {
            const cleanCardNumber = paymentData.cardNumber.replace(/\s+/g, "")

            // Verificar tarjetas de prueba
            if (this.testCards.success.replace(/\s+/g, "") === cleanCardNumber) {
                return this.createSuccessResponse()
            } else if (this.testCards.decline.replace(/\s+/g, "") === cleanCardNumber) {
                return this.createErrorResponse("La tarjeta fue rechazada por el banco emisor.")
            } else if (this.testCards.insufficient.replace(/\s+/g, "") === cleanCardNumber) {
                return this.createErrorResponse("Fondos insuficientes en la cuenta.")
            } else if (this.testCards.expired.replace(/\s+/g, "") === cleanCardNumber) {
                return this.createErrorResponse("La tarjeta ha expirado.")
            }
        }

        // Para otros métodos o tarjetas normales, usar probabilidad de éxito
        // Aumentamos la probabilidad de éxito al 80%
        const success = Math.random() < 0.8

        if (success) {
            return this.createSuccessResponse()
        } else {
            return this.createErrorResponse()
        }
    }

    /**
     * Valida los datos de pago según el método
     * @param {Object} data - Datos a validar
     * @param {string} method - Método de pago
     * @returns {Object} - Resultado de la validación
     */
    validatePaymentData(data, method) {
        if (!method || !this.paymentMethods[method]) {
            return { valid: false, error: "Método de pago no válido" }
        }

        const requiredFields = this.paymentMethods[method].fields

        // Verificar campos requeridos
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === "") {
                return {
                    valid: false,
                    error: `El campo ${this.getFieldLabel(field)} es obligatorio`,
                }
            }
        }

        // Validaciones específicas por método
        if (method === "card") {
            // Validar número de tarjeta (Luhn algorithm)
            if (!this.validateCardNumber(data.cardNumber)) {
                return { valid: false, error: "Número de tarjeta no válido" }
            }

            // Validar fecha de expiración
            if (!this.validateExpiryDate(data.expiryDate)) {
                return { valid: false, error: "Fecha de expiración no válida o tarjeta vencida" }
            }

            // Validar CVV (3-4 dígitos)
            if (!/^\d{3,4}$/.test(data.cvv)) {
                return { valid: false, error: "Código de seguridad (CVV) no válido" }
            }
        } else if (method === "paypal") {
            // Validar email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                return { valid: false, error: "Correo electrónico no válido" }
            }

            // Validar que la contraseña tenga al menos 6 caracteres
            if (data.password.length < 6) {
                return { valid: false, error: "La contraseña debe tener al menos 6 caracteres" }
            }
        } else if (method === "transfer") {
            // Validar número de cuenta (solo dígitos)
            if (!/^\d+$/.test(data.accountNumber)) {
                return { valid: false, error: "Número de cuenta no válido" }
            }
        }

        return { valid: true }
    }

    /**
     * Valida un número de tarjeta usando el algoritmo de Luhn
     * @param {string} cardNumber - Número de tarjeta
     * @returns {boolean} - True si es válido
     */
    validateCardNumber(cardNumber) {
        // Eliminar espacios y guiones
        const value = cardNumber.replace(/\D/g, "")

        // Debe tener entre 13 y 19 dígitos
        if (value.length < 13 || value.length > 19) {
            return false
        }

        // Implementación del algoritmo de Luhn
        let sum = 0
        let shouldDouble = false

        // Recorrer de derecha a izquierda
        for (let i = value.length - 1; i >= 0; i--) {
            let digit = Number.parseInt(value.charAt(i))

            if (shouldDouble) {
                digit *= 2
                if (digit > 9) digit -= 9
            }

            sum += digit
            shouldDouble = !shouldDouble
        }

        return sum % 10 === 0
    }

    /**
     * Valida una fecha de expiración
     * @param {string} expiryDate - Fecha en formato MM/YY o MM/YYYY
     * @returns {boolean} - True si es válida y no ha expirado
     */
    validateExpiryDate(expiryDate) {
        // Formato esperado: MM/YY o MM/YYYY
        const parts = expiryDate.split("/")
        if (parts.length !== 2) return false

        const month = Number.parseInt(parts[0], 10)
        let year = Number.parseInt(parts[1], 10)

        // Validar mes (1-12)
        if (isNaN(month) || month < 1 || month > 12) return false

        // Ajustar año si es formato YY
        if (year < 100) {
            year += 2000
        }

        // Validar año
        if (isNaN(year)) return false

        // Verificar que no haya expirado
        const now = new Date()
        const currentMonth = now.getMonth() + 1 // getMonth() es 0-indexed
        const currentYear = now.getFullYear()

        return year > currentYear || (year === currentYear && month >= currentMonth)
    }

    /**
     * Obtiene la etiqueta legible de un campo
     * @param {string} fieldName - Nombre del campo
     * @returns {string} - Etiqueta legible
     */
    getFieldLabel(fieldName) {
        const labels = {
            cardNumber: "número de tarjeta",
            cardHolder: "titular de la tarjeta",
            expiryDate: "fecha de vencimiento",
            cvv: "código de seguridad (CVV)",
            email: "correo electrónico",
            password: "contraseña",
            bankName: "banco",
            accountNumber: "número de cuenta",
        }

        return labels[fieldName] || fieldName
    }

    /**
     * Crea una respuesta de éxito
     * @returns {Object} - Respuesta de éxito
     */
    createSuccessResponse() {
        return {
            success: true,
            transactionId: this.generateTransactionId(),
            timestamp: new Date().toISOString(),
            message: "Pago procesado correctamente",
        }
    }

    /**
     * Crea una respuesta de error
     * @param {string} message - Mensaje de error personalizado
     * @returns {Object} - Respuesta de error
     */
    createErrorResponse(message) {
        const errorMessages = [
            "La transacción fue rechazada por el banco emisor.",
            "Fondos insuficientes en la cuenta.",
            "La tarjeta ha expirado.",
            "Error de comunicación con la entidad bancaria.",
            "La tarjeta ha sido reportada como perdida o robada.",
            "Transacción sospechosa detectada por nuestro sistema de seguridad.",
        ]

        return {
            success: false,
            error: message || errorMessages[Math.floor(Math.random() * errorMessages.length)],
            code: "PAYMENT_ERROR",
            timestamp: new Date().toISOString(),
        }
    }

    /**
     * Genera un ID de transacción único
     * @returns {string} - ID de transacción
     */
    generateTransactionId() {
        const timestamp = Date.now().toString(36)
        const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
        return `TX-${timestamp}-${randomStr}`
    }

    /**
     * Obtiene los métodos de pago disponibles
     * @returns {Object} - Métodos de pago
     */
    getPaymentMethods() {
        return this.paymentMethods
    }

    /**
     * Obtiene las tarjetas de prueba
     * @returns {Object} - Tarjetas de prueba
     */
    getTestCards() {
        return this.testCards
    }

    /**
     * Obtiene los bancos disponibles para transferencia
     * @returns {Array} - Lista de bancos
     */
    getBanks() {
        return this.banks
    }
}

export default PaymentGateway
