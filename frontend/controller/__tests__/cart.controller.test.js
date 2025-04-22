// cart.controller.test.js
import CartController from '../cart.controller';

// Mock para window.jspdf
window.jspdf = {
    jsPDF: jest.fn().mockImplementation(() => ({
        setProperties: jest.fn(),
        setFontSize: jest.fn(),
        setTextColor: jest.fn(),
        text: jest.fn(),
        setDrawColor: jest.fn(),
        setLineWidth: jest.fn(),
        line: jest.fn(),
        addImage: jest.fn(),
        autoTable: jest.fn(),
        lastAutoTable: { finalY: 100 },
        internal: { pageSize: { height: 200 } },
        setFont: jest.fn(),
        splitTextToSize: jest.fn().mockReturnValue(['línea 1', 'línea 2']),
        save: jest.fn()
    }))
};

// Mocks para los modelos y la vista
const mockModel = {
    addToCart: jest.fn(),
    updateQuantity: jest.fn(),
    removeFromCart: jest.fn(),
    getCartItems: jest.fn().mockReturnValue([]),
    getCartTotal: jest.fn().mockReturnValue(0),
    isProductInCart: jest.fn(),
    clearCart: jest.fn(),
    verifyUserEmail: jest.fn()
};

const mockView = {
    updateCartDisplay: jest.fn(),
    showMessage: jest.fn(),
    showCheckout: jest.fn(),
    showCheckoutForm: jest.fn(),
    showProcessingPayment: jest.fn(),
    showPaymentSuccess: jest.fn(),
    showPaymentFailure: jest.fn(),
    showPaymentMethodForm: jest.fn()
};

const mockProductModel = {
    getProductDetails: jest.fn()
};

const mockUserModel = {};
const mockCartModel = {};

// Mock para módulo de la pasarela de pagos
jest.mock('../payment.gateway.js', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            getPaymentMethods: jest.fn().mockReturnValue(['credit_card', 'paypal', 'bank_transfer']),
            getTestCards: jest.fn().mockReturnValue([{ number: '4111111111111111', type: 'visa' }]),
            getBanks: jest.fn().mockReturnValue([{ id: 'banco1', name: 'Banco 1' }]),
            processPayment: jest.fn()
        }))
    };
});

// Mock para el fetch API
global.fetch = jest.fn();

// Mock para CustomEvent
global.CustomEvent = jest.fn().mockImplementation((event, options) => ({
    type: event,
    detail: options?.detail
}));

describe('CartController', () => {
    let controller;
    let originalAddEventListener;
    let eventListeners;

    beforeEach(() => {
        // Limpiar todos los mocks
        jest.clearAllMocks();

        // Mock para addEventListener global
        eventListeners = {};
        originalAddEventListener = window.addEventListener;
        window.addEventListener = jest.fn((event, callback) => {
            if (!eventListeners[event]) {
                eventListeners[event] = [];
            }
            eventListeners[event].push(callback);
        });

        // Mock para dispatchEvent global
        window.dispatchEvent = jest.fn((event) => {
            const callbacks = eventListeners[event.type] || [];
            callbacks.forEach(callback => callback(event));
        });

        // Iniciar controlador
        controller = new CartController(mockModel, mockView, mockProductModel, mockUserModel, mockCartModel);
    });

    afterEach(() => {
        // Restaurar addEventListener original
        window.addEventListener = originalAddEventListener;
    });

    describe('constructor e inicialización', () => {
        test('debe inicializarse correctamente', async () => {
            // Simular que se completa la importación
            await Promise.resolve();

            expect(controller.model).toBe(mockModel);
            expect(controller.view).toBe(mockView);
            expect(controller.isInitialized).toBe(true);
        });
    });

    describe('initWithoutDisplay', () => {
        test('no debe volver a inicializar si ya está inicializado', async () => {
            controller.isInitialized = true;
            const spy = jest.spyOn(controller, 'setupGlobalEventListeners');

            await controller.initWithoutDisplay();

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('init', () => {
        test('debe inicializar completamente y mostrar el carrito', async () => {
            controller.isInitialized = false;
            const setupSpy = jest.spyOn(controller, 'setupGlobalEventListeners');
            const updateSpy = jest.spyOn(controller, 'updateCartDisplay').mockResolvedValue();

            await controller.init();

            expect(setupSpy).toHaveBeenCalled();
            expect(updateSpy).toHaveBeenCalled();
            expect(controller.isInitialized).toBe(true);
        });

        test('solo debe actualizar la vista si ya está inicializado', async () => {
            controller.isInitialized = true;
            const setupSpy = jest.spyOn(controller, 'setupGlobalEventListeners');
            const updateSpy = jest.spyOn(controller, 'updateCartDisplay').mockResolvedValue();

            await controller.init();

            expect(setupSpy).not.toHaveBeenCalled();
            expect(updateSpy).toHaveBeenCalled();
        });
    });

    describe('setupGlobalEventListeners', () => {
        test('debe configurar los listeners de eventos correctamente', () => {
            controller.setupGlobalEventListeners();

            // Verificar que se agregaron los event listeners esperados
            expect(window.addEventListener).toHaveBeenCalledWith('cartUpdated', expect.any(Function));
            expect(window.addEventListener).toHaveBeenCalledWith('updateQuantity', expect.any(Function));
            expect(window.addEventListener).toHaveBeenCalledWith('removeItem', expect.any(Function));
            expect(window.addEventListener).toHaveBeenCalledWith('checkout', expect.any(Function));
            expect(window.addEventListener).toHaveBeenCalledWith('processPayment', expect.any(Function));
            expect(window.addEventListener).toHaveBeenCalledWith('addToCart', expect.any(Function));
        });
    });

    describe('handleAddToCartClick', () => {
        test('debe deshabilitar el botón durante la operación y restaurarlo después', async () => {
            const button = {
                getAttribute: jest.fn().mockReturnValue('123'),
                disabled: false,
                textContent: 'Comprar'
            };

            const addToCartSpy = jest.spyOn(controller, 'addToCart').mockResolvedValue();

            await controller.handleAddToCartClick(button);

            expect(button.disabled).toBe(false); // Después de la operación
            expect(button.textContent).toBe('Comprar'); // Restaurado
            expect(addToCartSpy).toHaveBeenCalledWith('123');
        });
    });

    describe('addToCart', () => {
        test('debe mostrar mensaje si el producto ya está en el carrito', async () => {
            mockModel.isProductInCart.mockReturnValue(true);

            await controller.addToCart('123');

            expect(mockView.showMessage).toHaveBeenCalledWith('El producto ya está en tu carrito', 'info');
            expect(mockModel.addToCart).not.toHaveBeenCalled();
        });

        test('debe agregar producto al carrito si no está presente', async () => {
            const mockProduct = { id: '123', nombre: 'Test Product', precio: 100 };
            mockModel.isProductInCart.mockReturnValue(false);
            mockProductModel.getProductDetails.mockResolvedValue(mockProduct);
            mockModel.addToCart.mockResolvedValue({ success: true });

            await controller.addToCart('123');

            expect(mockModel.addToCart).toHaveBeenCalledWith(mockProduct);
            expect(mockView.showMessage).toHaveBeenCalledWith('Producto agregado al carrito', 'success');
            expect(window.dispatchEvent).toHaveBeenCalled();
        });

        test('debe manejar error al obtener detalles del producto', async () => {
            mockModel.isProductInCart.mockReturnValue(false);
            mockProductModel.getProductDetails.mockResolvedValue(null);

            await controller.addToCart('123');

            expect(mockView.showMessage).toHaveBeenCalledWith('No se pudo obtener la información del producto', 'error');
            expect(mockModel.addToCart).not.toHaveBeenCalled();
        });

        test('debe manejar error al agregar al carrito', async () => {
            const mockProduct = { id: '123', nombre: 'Test Product', precio: 100 };
            mockModel.isProductInCart.mockReturnValue(false);
            mockProductModel.getProductDetails.mockResolvedValue(mockProduct);
            mockModel.addToCart.mockResolvedValue({ success: false, error: 'Error de prueba' });

            await controller.addToCart('123');

            expect(mockView.showMessage).toHaveBeenCalledWith('Error de prueba', 'error');
        });
    });

    describe('updateQuantity', () => {
        test('debe actualizar la cantidad y refrescar el carrito si es exitoso', async () => {
            mockModel.updateQuantity.mockResolvedValue({ success: true });
            const updateCartSpy = jest.spyOn(controller, 'updateCartDisplay').mockResolvedValue();

            await controller.updateQuantity('123', 2);

            expect(mockModel.updateQuantity).toHaveBeenCalledWith('123', 2);
            expect(updateCartSpy).toHaveBeenCalled();
        });

        test('debe mostrar mensaje de error si la actualización falla', async () => {
            mockModel.updateQuantity.mockResolvedValue({ success: false, error: 'Error de cantidad' });

            await controller.updateQuantity('123', 2);

            expect(mockView.showMessage).toHaveBeenCalledWith('Error de cantidad', 'error');
        });
    });

    describe('removeItem', () => {
        test('debe eliminar producto y refrescar el carrito si es exitoso', async () => {
            mockModel.removeFromCart.mockResolvedValue({ success: true });
            const updateCartSpy = jest.spyOn(controller, 'updateCartDisplay').mockResolvedValue();
            const updateBtnSpy = jest.spyOn(controller, 'updateAddToCartButtons');

            await controller.removeItem('123');

            expect(mockModel.removeFromCart).toHaveBeenCalledWith('123');
            expect(mockView.showMessage).toHaveBeenCalledWith('Producto eliminado del carrito', 'success');
            expect(updateCartSpy).toHaveBeenCalled();
            expect(updateBtnSpy).toHaveBeenCalledWith('123');
        });

        test('debe mostrar mensaje de error si la eliminación falla', async () => {
            mockModel.removeFromCart.mockResolvedValue({ success: false, error: 'Error al eliminar' });

            await controller.removeItem('123');

            expect(mockView.showMessage).toHaveBeenCalledWith('Error al eliminar', 'error');
        });
    });

    describe('updateCartDisplay', () => {
        test('debe actualizar la vista con los elementos del carrito', async () => {
            const mockItems = [{ id: '123', nombre_producto: 'Producto 1', precio: 100, cantidad: 2 }];
            const mockTotal = 200;
            mockModel.getCartItems.mockReturnValue(mockItems);
            mockModel.getCartTotal.mockReturnValue(mockTotal);

            await controller.updateCartDisplay();

            expect(mockView.updateCartDisplay).toHaveBeenCalledWith(mockItems, mockTotal);
        });
    });

    describe('proceedToCheckout', () => {
        test('debe mostrar mensaje si el carrito está vacío', async () => {
            mockModel.getCartItems.mockReturnValue([]);

            await controller.proceedToCheckout();

            expect(mockView.showMessage).toHaveBeenCalledWith('Tu carrito está vacío', 'warning');
            expect(mockView.showCheckout).not.toHaveBeenCalled();
        });

        test('debe mostrar el checkout si hay productos en el carrito', async () => {
            const mockItems = [{ id: '123', nombre_producto: 'Producto 1', precio: 100, cantidad: 2 }];
            const mockTotal = 200;
            mockModel.getCartItems.mockReturnValue(mockItems);
            mockModel.getCartTotal.mockReturnValue(mockTotal);

            // Aseguramos que paymentGateway esté definido
            controller.paymentGateway = {
                getPaymentMethods: jest.fn().mockReturnValue(['credit_card', 'paypal']),
                getTestCards: jest.fn().mockReturnValue([{ number: '4111111111111111' }]),
                getBanks: jest.fn().mockReturnValue([{ id: 'banco1' }])
            };

            await controller.proceedToCheckout();

            expect(mockView.showCheckout).toHaveBeenCalledWith(
                mockItems,
                mockTotal,
                ['credit_card', 'paypal'],
                [{ number: '4111111111111111' }],
                [{ id: 'banco1' }]
            );
        });
    });

    describe('processPayment', () => {
        beforeEach(() => {
            // Setup para simular el DOM
            document.body.innerHTML = `
        <input id="deliveryEmail" value="test@example.com">
        <input name="deliveryMethod" value="STORE_PICKUP" checked>
        <select id="pickupCity"><option value="city1">Ciudad 1</option></select>
        <select id="pickupStore"><option value="store1">Tienda 1</option></select>
      `;

            // Setup para gateway de pagos
            controller.paymentGateway = {
                processPayment: jest.fn()
            };
        });

        test('debe procesar el pago correctamente para recogida en tienda', async () => {
            const paymentData = {
                method: 'credit_card',
                formData: { cardNumber: '4111111111111111' }
            };

            mockModel.verifyUserEmail.mockResolvedValue(null); // Usuario no registrado
            controller.paymentGateway.processPayment.mockResolvedValue({ success: true, transactionId: '123456' });

            // Mock para createOrder
            jest.spyOn(controller, 'createOrder').mockResolvedValue({
                success: true,
                orderData: { id_pedido: '123456' }
            });

            // Mock para handlePaymentSuccess
            jest.spyOn(controller, 'handlePaymentSuccess').mockResolvedValue();

            // Mock para querySelector
            document.querySelector = jest.fn().mockReturnValue({ value: 'STORE_PICKUP' });

            const result = await controller.processPayment(paymentData);

            expect(mockModel.verifyUserEmail).toHaveBeenCalledWith('test@example.com');
            expect(controller.paymentGateway.processPayment).toHaveBeenCalled();
            expect(controller.createOrder).toHaveBeenCalled();
            expect(controller.handlePaymentSuccess).toHaveBeenCalled();
            expect(result.success).toBe(true);
        });

        test('debe manejar errores en el proceso de pago', async () => {
            const paymentData = {
                method: 'credit_card',
                formData: { cardNumber: '4111111111111111' }
            };

            controller.paymentGateway.processPayment.mockRejectedValue(new Error('Error en el pago'));

            // Mock para handlePaymentFailure
            jest.spyOn(controller, 'handlePaymentFailure').mockImplementation();

            // Mock para querySelector
            document.querySelector = jest.fn().mockReturnValue({ value: 'STORE_PICKUP' });

            const result = await controller.processPayment(paymentData);

            expect(controller.handlePaymentFailure).toHaveBeenCalled();
            expect(result.success).toBe(false);
        });
    });

    describe('handlePaymentSuccess', () => {
        test('debe limpiar el carrito y mostrar mensaje de confirmación para usuario registrado', async () => {
            const result = { transactionId: '123456' };
            const deliveryDetails = { isRegistered: { id_usuario: '123' } };

            // Mock para generar factura
            jest.spyOn(controller, 'generateInvoicePDF').mockImplementation();

            await controller.handlePaymentSuccess(result, deliveryDetails);

            expect(mockModel.clearCart).toHaveBeenCalled();
            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'userOrderCreated'
                })
            );
            expect(mockView.showMessage).toHaveBeenCalledWith(
                'Pedido confirmado. Puedes hacer seguimiento desde tu perfil.',
                'success'
            );
            expect(mockView.showPaymentSuccess).toHaveBeenCalledWith(result, true);
        });

        test('debe mostrar mensaje diferente para usuario no registrado', async () => {
            const result = { transactionId: '123456' };
            const deliveryDetails = { isRegistered: null };

            // Mock para generar factura
            jest.spyOn(controller, 'generateInvoicePDF').mockImplementation();

            await controller.handlePaymentSuccess(result, deliveryDetails);

            expect(mockView.showMessage).toHaveBeenCalledWith(
                'Pedido confirmado. Se ha descargado tu factura.',
                'success'
            );
            expect(mockView.showPaymentSuccess).toHaveBeenCalledWith(result, false);
        });
    });

    describe('handlePaymentFailure', () => {
        test('debe mostrar mensaje de error y generar PDF de transacción fallida', () => {
            const result = { error: 'Error en el pago' };

            // Mock para generar PDF
            jest.spyOn(controller, 'generateFailedTransactionPDF').mockImplementation();

            controller.handlePaymentFailure(result);

            expect(mockView.showPaymentFailure).toHaveBeenCalledWith('Error en el pago');
            expect(controller.generateFailedTransactionPDF).toHaveBeenCalledWith(result);
        });
    });

    describe('createOrder', () => {
        test('debe crear orden para usuario registrado', async () => {
            const paymentResult = {
                transactionId: '123456',
                method: 'credit_card'
            };

            const deliveryDetails = {
                isRegistered: { id_usuario: '123' },
                method: 'STORE_PICKUP',
                store: 'Tienda Central',
                city: 'city1',
                email: 'test@example.com'
            };

            // Mock para respuesta de API
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({ id_pedido: '123456' })
            });

            const result = await controller.createOrder(paymentResult, deliveryDetails);

            expect(result.success).toBe(true);
            expect(result.orderData).toHaveProperty('id_pedido', '123456');
            expect(global.fetch).toHaveBeenCalled();
        });

        test('debe crear orden temporal para usuario no registrado', async () => {
            const paymentResult = {
                transactionId: '123456',
                method: 'credit_card'
            };

            const deliveryDetails = {
                isRegistered: null,
                method: 'HOME_DELIVERY',
                address: 'Calle Principal 123',
                city: 'city1',
                email: 'test@example.com',
                phone: '123456789'
            };

            const result = await controller.createOrder(paymentResult, deliveryDetails);

            expect(result.success).toBe(true);
            expect(result.orderData).toHaveProperty('id_pedido');
            expect(result.orderData.id_pedido).toMatch(/^TEMP-/);
            expect(global.fetch).not.toHaveBeenCalled();
        });

        test('debe manejar errores en la creación de la orden', async () => {
            const paymentResult = {
                transactionId: '123456',
                method: 'credit_card'
            };

            const deliveryDetails = {
                isRegistered: { id_usuario: '123' },
                method: 'STORE_PICKUP',
                store: 'Tienda Central',
                city: 'city1'
            };

            // Mock para respuesta de API con error
            global.fetch.mockResolvedValue({
                ok: false,
                json: jest.fn().mockResolvedValue({ message: 'Error en el servidor' })
            });

            const result = await controller.createOrder(paymentResult, deliveryDetails);

            expect(result.success).toBe(false);
            expect(result.error).toBe('Error en el servidor');
        });
    });

    describe('generateInvoicePDF y generateFailedTransactionPDF', () => {
        let pdfInstance;
    
        beforeEach(() => {
            // Crear una instancia mock limpia para cada test
            pdfInstance = {
                setProperties: jest.fn(),
                setFontSize: jest.fn(),
                setTextColor: jest.fn(),
                text: jest.fn(),
                setDrawColor: jest.fn(),
                setLineWidth: jest.fn(),
                line: jest.fn(),
                addImage: jest.fn(),
                autoTable: jest.fn(),
                lastAutoTable: { finalY: 100 },
                internal: { pageSize: { height: 200 } },
                setFont: jest.fn(),
                splitTextToSize: jest.fn().mockReturnValue(['línea 1', 'línea 2']),
                save: jest.fn().mockReturnThis()
            };
            
            window.jspdf = {
                jsPDF: jest.fn(() => pdfInstance)
            };
        });
    
        test('debe generar correctamente la factura PDF', () => {
            const paymentResult = { transactionId: '123456', method: 'credit_card' };
            const cartItems = [
                { nombre_producto: 'Producto 1', cantidad: 2, precio: 100 }
            ];
            const total = 200;
            const deliveryDetails = {
                method: 'STORE_PICKUP',
                store: 'Tienda Central',
                city: 'Ciudad Principal',
                email: 'test@example.com',
                isRegistered: true
            };
    
            controller.generateInvoicePDF(paymentResult, cartItems, total, deliveryDetails);
    
            // Verificar que se creó una instancia de jsPDF
            expect(window.jspdf.jsPDF).toHaveBeenCalled();
            // Verificar que se llamó a save
            expect(pdfInstance.save).toHaveBeenCalled();
        });
    
        test('debe generar correctamente el PDF de transacción fallida', () => {
            const paymentResult = { error: 'Error en el pago' };
    
            controller.generateFailedTransactionPDF(paymentResult);
    
            // Verificar que se creó una instancia de jsPDF
            expect(window.jspdf.jsPDF).toHaveBeenCalled();
            // Verificar que se llamó a save
            expect(pdfInstance.save).toHaveBeenCalled();
        });
    });
});