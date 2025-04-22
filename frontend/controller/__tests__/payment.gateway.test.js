import PaymentGateway from '../payment.gateway'

describe('Pasarela de Pagos - PaymentGateway', () => {
    let gateway

    beforeEach(() => {
        gateway = new PaymentGateway()
    })

    describe('Método validateCardNumber', () => {
        it('valida correctamente un número válido (Luhn)', () => {
            expect(gateway.validateCardNumber("4111 1111 1111 1111")).toBe(true)
        })

        it('detecta un número inválido (Luhn)', () => {
            expect(gateway.validateCardNumber("1234 5678 9012 3456")).toBe(false)
        })
    })

    describe('Método validateExpiryDate', () => {
        it('acepta una fecha válida futura (MM/YY)', () => {
            expect(gateway.validateExpiryDate("12/30")).toBe(true)
        })

        it('rechaza una fecha ya vencida', () => {
            expect(gateway.validateExpiryDate("01/20")).toBe(false)
        })

        it('rechaza una fecha con formato incorrecto', () => {
            expect(gateway.validateExpiryDate("13/2025")).toBe(false)
        })
    })

    describe('Método validatePaymentData', () => {
        it('valida datos de tarjeta válidos', () => {
            const data = {
                cardNumber: "4111 1111 1111 1111",
                cardHolder: "Juan Pérez",
                expiryDate: "12/30",
                cvv: "123"
            }
            const result = gateway.validatePaymentData(data, 'card')
            expect(result.valid).toBe(true)
        })

        it('detecta falta de campos en PayPal', () => {
            const data = {
                email: "",
                password: "123456"
            }
            const result = gateway.validatePaymentData(data, 'paypal')
            expect(result.valid).toBe(false)
            expect(result.error).toMatch(/correo electrónico/i)
        })

        it('detecta cuenta bancaria no válida', () => {
            const data = {
                bankName: "Banco Nacional",
                accountNumber: "abc123"
            }
            const result = gateway.validatePaymentData(data, 'transfer')
            expect(result.valid).toBe(false)
        })
    })

    describe('Método processPayment (simulado)', () => {
        it('procesa correctamente tarjeta de prueba exitosa', async () => {
            const data = {
                cardNumber: "4111 1111 1111 1111",
                cardHolder: "Cliente Ficticio",
                expiryDate: "12/30",
                cvv: "123"
            }
            const result = await gateway.processPayment(data, 'card')
            expect(result.success).toBe(true)
            expect(result.transactionId).toBeDefined()
        })

        it('rechaza tarjeta de prueba "decline"', async () => {
            const data = {
                cardNumber: "4000 0000 0000 0002",
                cardHolder: "Cliente Ficticio",
                expiryDate: "12/30",
                cvv: "123"
            }
            const result = await gateway.processPayment(data, 'card')
            expect(result.success).toBe(false)
            expect(result.error).toMatch(/rechazada/i)
        })

        it('retorna error de validación si faltan datos', async () => {
            const data = {
                cardNumber: "",
                cardHolder: "",
                expiryDate: "",
                cvv: ""
            }
            const result = await gateway.processPayment(data, 'card')
            expect(result.success).toBe(false)
            expect(result.code).toBe("VALIDATION_ERROR")
        })
    })

    describe('Métodos auxiliares', () => {
        it('getPaymentMethods devuelve métodos disponibles', () => {
            const methods = gateway.getPaymentMethods()
            expect(methods.card).toBeDefined()
            expect(methods.paypal).toBeDefined()
            expect(methods.transfer).toBeDefined()
        })

        it('getTestCards incluye tarjeta de prueba exitosa', () => {
            const cards = gateway.getTestCards()
            expect(cards.success).toBe("4111 1111 1111 1111")
        })

        it('getBanks devuelve lista de bancos', () => {
            const banks = gateway.getBanks()
            expect(banks.length).toBeGreaterThan(0)
        })
    })
})
