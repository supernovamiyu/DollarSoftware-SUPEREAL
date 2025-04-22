import CartView from '../cart.view.js';
import NotificationUtils from '../../utils/message.utils.js';

// Mock de BaseView que no depende del DOM
jest.mock('../base.view.js', () => {
    return class MockBaseView {
        constructor() {
            this.container = null;
            this.templates = new Map();
        }

        showTemplate() {
            return true;
        }
    };
});

jest.mock('../../utils/message.utils.js');

describe('CartView', () => {
    let cartView;
    const mockCartItems = [
        {
            id_productos: 1,
            nombre_producto: 'Producto Test',
            precio: 100,
            cantidad: 2,
            imagen_url: 'test.jpg'
        }
    ];

    beforeEach(() => {
        // Configurar DOM
        document.body.innerHTML = `
        <div id="container-principal"></div>
    
        <template id="plantilla-carrito">
            <div id="contenedor-productos-carrito">
            <div class="carrito-vacio">El carrito está vacío</div>
            </div>
            <button class="boton-proceder-al-pago">Proceder al pago</button>
            <button class="actualizar-cantidad-producto-carrito" data-action="increase">+</button>
            <button class="eliminar-producto-individual-carrito">Eliminar</button>
        </template>
    
        <template id="pasarela-de-pagos-simulada">
            <div id="metodos-pago">
                <div class="payment-method-option"></div>
                <div class="payment-method-option"></div>
            </div>
            <input type="radio" id="metodo-paypal" name="payment-method" value="paypal">
            <input type="text" id="numero-tarjeta">
            <div id="homeDeliveryFields" style="display:none;"></div>
            <div id="storePickupFields" style="display:block;"></div>
        </template>
    `;
    

        // Crear instancia después de configurar el DOM
        cartView = new CartView();
        cartView.container = document.getElementById('container-principal');

        // Sobrescribir el método showTemplate con implementación real
        cartView.showTemplate = (templateId, containerId) => {
            const template = document.getElementById(templateId);
            const container = document.getElementById(containerId);

            if (!template || !container) return false;

            const clone = document.importNode(template.content, true);
            container.innerHTML = '';
            container.appendChild(clone);
            return true;
        };

        window.dispatchEvent = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('updateCartDisplay', () => {
        it('debe mostrar carrito vacío cuando no hay items', () => {
            cartView.updateCartDisplay([], 0);
            const container = document.getElementById('contenedor-productos-carrito');
            expect(container.innerHTML).toContain('carrito-vacio');
        });

        it('debe renderizar items correctamente', () => {
            cartView.updateCartDisplay(mockCartItems, 200);
            const items = document.querySelectorAll('.contenedor-producto-unico-carrito');
            expect(items.length).toBe(1);
            expect(items[0].textContent).toContain('Producto Test');
        });
    });

    describe('Manejo de Eventos del Carrito', () => {
        beforeEach(() => {
            cartView.updateCartDisplay(mockCartItems, 200);
        });

        it('debe manejar aumento de cantidad', () => {
            const increaseBtn = document.querySelector('[data-action="increase"]');
            increaseBtn.click();

            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'updateQuantity',
                    detail: expect.objectContaining({
                        productId: '1',
                        quantity: 3
                    })
                })
            );
        });

        it('debe manejar eliminación de producto', () => {
            const removeBtn = document.querySelector('.eliminar-producto-individual-carrito');
            removeBtn.click();

            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'removeItem',
                    detail: { productId: '1' }
                })
            );
        });
    });

    describe('Checkout Process', () => {
        const paymentMethods = {
            card: { name: 'Tarjeta', icon: 'fa-credit-card' },
            paypal: { name: 'PayPal', icon: 'fa-paypal' }
        };

        it('debe renderizar métodos de pago', () => {
            cartView.showCheckout(mockCartItems, 200, paymentMethods, {}, []);
            const methods = document.querySelectorAll('.payment-method-option');
            expect(methods.length).toBe(2);
        });

        it('debe manejar cambio de método de pago', () => {
            cartView.showCheckout(mockCartItems, 200, paymentMethods, {}, []);
            const paypalRadio = document.querySelector('#metodo-paypal');
            paypalRadio.click();

            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'changePaymentMethod',
                    detail: { method: 'paypal' }
                })
            );
        });

        it('debe recolectar datos de tarjeta correctamente', () => {
            cartView.showCheckout(mockCartItems, 200, paymentMethods, {}, []);
            document.getElementById('numero-tarjeta').value = '4111 1111 1111 1111';
            const formData = cartView.collectFormData('card');

            expect(formData).toEqual({
                cardNumber: '4111 1111 1111 1111',
                cardHolder: '',
                expiryDate: '',
                cvv: ''
            });
        });
    });

    describe("Manejo de Errores", () => {
        it("debe manejar contenedor no encontrado", () => {
            // Simula que no existe el contenedor
            document.getElementById = jest.fn().mockReturnValue(null);
    
            // Espía a console.error
            jest.spyOn(console, "error").mockImplementation(() => {});
    
            // Instancia la vista y llama al método
            const cartView = new CartView();
            cartView.showTemplate = jest.fn().mockReturnValue(true);
            cartView.updateCartDisplay([], 200);
    
            // Verifica que se llamó a console.error
            expect(console.error).toHaveBeenCalledWith("No se encontró el contenedor del carrito");
    
            // Limpieza
            console.error.mockRestore();
        });
    });
    

    describe('Notificaciones', () => {
        it('debe mostrar mensajes de notificación', () => {
            cartView.showMessage('Test message', 'success');
            expect(NotificationUtils.showSuccess).toHaveBeenCalledWith('Test message');
        });
    });
});