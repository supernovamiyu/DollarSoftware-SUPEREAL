// Importando el modelo del carrito de compras
import CartModel from '../cart.model';

describe('CartModel', () => {
    let cartModel;
    const mockProduct = {
        id_productos: '1',
        nombre_producto: 'Producto de prueba',
        precio: '10.99',
        imagen_url: 'imagen.jpg'
    };
    const mockProduct2 = {
        id_productos: '2',
        nombre_producto: 'Otro producto',
        precio: '5.50',
        imagen_url: 'imagen2.jpg'
    };

    // Configuración inicial antes de cada prueba
    beforeEach(() => {
        // Limpiar localStorage antes de cada prueba
        localStorage.clear();
        cartModel = new CartModel();
        
        // Mock para fetch
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Constructor y carga inicial', () => {
        test('debería inicializar un carrito vacío si no hay datos en localStorage', () => {
            expect(cartModel.getCartItems()).toEqual([]);
        });

        test('debería cargar items existentes desde localStorage', () => {
            const testItems = [mockProduct];
            localStorage.setItem('carrito', JSON.stringify(testItems));
            
            const newCartModel = new CartModel();
            expect(newCartModel.getCartItems()).toEqual(testItems);
        });

        test('debería manejar errores al cargar datos inválidos de localStorage', () => {
            localStorage.setItem('carrito', 'datos inválidos');
            
            const newCartModel = new CartModel();
            expect(newCartModel.getCartItems()).toEqual([]);
        });
    });

    describe('addToCart', () => {
        test('debería agregar un nuevo producto al carrito', async () => {
            const result = await cartModel.addToCart(mockProduct);
            
            expect(result.success).toBe(true);
            expect(cartModel.getCartItems()).toHaveLength(1);
            expect(cartModel.getCartItems()[0]).toEqual({
                ...mockProduct,
                cantidad: 1
            });
        });

        test('debería incrementar la cantidad si el producto ya está en el carrito', async () => {
            await cartModel.addToCart(mockProduct);
            const result = await cartModel.addToCart(mockProduct);
            
            expect(result.success).toBe(true);
            expect(cartModel.getCartItems()).toHaveLength(1);
            expect(cartModel.getCartItems()[0].cantidad).toBe(2);
        });

        test('debería manejar productos con IDs como números o strings', async () => {
            const numericIdProduct = { ...mockProduct, id_productos: 123 };
            await cartModel.addToCart(numericIdProduct);
            
            const stringIdProduct = { ...mockProduct, id_productos: '123' };
            const result = await cartModel.addToCart(stringIdProduct);
            
            expect(result.success).toBe(true);
            expect(cartModel.getCartItems()).toHaveLength(1);
            expect(cartModel.getCartItems()[0].cantidad).toBe(2);
        });

        test('debería devolver error si el producto es inválido', async () => {
            const result = await cartModel.addToCart({});
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Producto inválido');
        });

        test('debería manejar operaciones concurrentes para el mismo producto', async () => {
            // Simulamos una operación en curso
            cartModel.pendingOperations.set(mockProduct.id_productos, true);
            
            const result = await cartModel.addToCart(mockProduct);
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Este producto ya está siendo agregado');
        });
    });

    describe('isProductInCart', () => {
        test('debería devolver true si el producto está en el carrito', async () => {
            await cartModel.addToCart(mockProduct);
            expect(cartModel.isProductInCart(mockProduct.id_productos)).toBe(true);
        });

        test('debería devolver false si el producto no está en el carrito', () => {
            expect(cartModel.isProductInCart('999')).toBe(false);
        });

        test('debería manejar diferentes tipos de IDs (string/number)', async () => {
            await cartModel.addToCart({ ...mockProduct, id_productos: 123 });
            expect(cartModel.isProductInCart('123')).toBe(true);
        });
    });

    describe('updateQuantity', () => {
        beforeEach(async () => {
            await cartModel.addToCart(mockProduct);
        });

        test('debería actualizar la cantidad de un producto existente', async () => {
            const result = await cartModel.updateQuantity(mockProduct.id_productos, 5);
            
            expect(result.success).toBe(true);
            expect(cartModel.getProductQuantity(mockProduct.id_productos)).toBe(5);
        });

        test('debería eliminar el producto si la cantidad es 0 o menor', async () => {
            // Agregar producto inicial
            const addResult = await cartModel.addToCart(mockProduct);
            expect(addResult.success).toBe(true);
            expect(cartModel.isProductInCart(mockProduct.id_productos)).toBe(true);
            
            // Caso cantidad = 0
            const zeroResult = await cartModel.updateQuantity(mockProduct.id_productos, 0);
            expect(zeroResult.success).toBe(true);
            expect(cartModel.isProductInCart(mockProduct.id_productos)).toBe(false);
            
            // Agregar nuevamente para probar cantidad negativa
            await cartModel.addToCart(mockProduct);
            
            // Caso cantidad negativa
            const negativeResult = await cartModel.updateQuantity(mockProduct.id_productos, -1);
            expect(negativeResult.success).toBe(true);
            expect(cartModel.isProductInCart(mockProduct.id_productos)).toBe(false);
        });

        test('debería devolver error si el producto no existe', async () => {
            const result = await cartModel.updateQuantity('999', 2);
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Producto no encontrado en el carrito');
        });

        test('debería manejar operaciones concurrentes para el mismo producto', async () => {
            cartModel.pendingOperations.set(mockProduct.id_productos, true);
            
            const result = await cartModel.updateQuantity(mockProduct.id_productos, 3);
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Operación en curso para este producto');
        });
    });

    describe('removeFromCart', () => {
        beforeEach(async () => {
            await cartModel.addToCart(mockProduct);
            await cartModel.addToCart(mockProduct2);
        });

        test('debería eliminar un producto existente', async () => {
            const initialCount = cartModel.getCartItems().length;
            const result = await cartModel.removeFromCart(mockProduct.id_productos);
            
            expect(result.success).toBe(true);
            expect(cartModel.getCartItems()).toHaveLength(initialCount - 1);
            expect(cartModel.isProductInCart(mockProduct.id_productos)).toBe(false);
        });

        test('debería devolver error si el producto no existe', async () => {
            const result = await cartModel.removeFromCart('999');
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Producto no encontrado en el carrito');
        });

        test('debería manejar operaciones concurrentes para el mismo producto', async () => {
            cartModel.pendingOperations.set(mockProduct.id_productos, true);
            
            const result = await cartModel.removeFromCart(mockProduct.id_productos);
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Operación en curso para este producto');
        });
    });

    describe('getCartTotal', () => {
        test('debería calcular el total correctamente con múltiples productos', async () => {
            await cartModel.addToCart(mockProduct);
            await cartModel.addToCart(mockProduct);
            await cartModel.addToCart(mockProduct2);
            
            const expectedTotal = (10.99 * 2) + 5.50;
            expect(cartModel.getCartTotal()).toBeCloseTo(expectedTotal);
        });

        test('debería devolver 0 para un carrito vacío', () => {
            expect(cartModel.getCartTotal()).toBe(0);
        });

        test('debería manejar precios inválidos', async () => {
            const invalidPriceProduct = {
                ...mockProduct,
                precio: 'inválido'
            };
            await cartModel.addToCart(invalidPriceProduct);
            
            expect(cartModel.getCartTotal()).toBe(0);
        });
    });

    describe('clearCart', () => {
        test('debería vaciar el carrito completamente', async () => {
            await cartModel.addToCart(mockProduct);
            await cartModel.addToCart(mockProduct2);
            
            const result = await cartModel.clearCart();
            
            expect(result.success).toBe(true);
            expect(cartModel.getCartItems()).toHaveLength(0);
        });
    });

    describe('verifyUserEmail', () => {
        test('debería devolver los datos del usuario si el email existe', async () => {
            const mockUser = { id: 1, email: 'test@example.com' };
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser
            });
            
            const result = await cartModel.verifyUserEmail('test@example.com');
            expect(result).toEqual(mockUser);
        });

        test('debería devolver false si el email no existe', async () => {
            fetch.mockResolvedValueOnce({
                ok: false
            });
            
            const result = await cartModel.verifyUserEmail('noexiste@example.com');
            expect(result).toBe(false);
        });

        test('debería devolver false si hay un error en la petición', async () => {
            fetch.mockRejectedValueOnce(new Error('Error de red'));
            
            const result = await cartModel.verifyUserEmail('error@example.com');
            expect(result).toBe(false);
        });
    });

    describe('Concurrencia', () => {
        test('debería manejar múltiples operaciones concurrentes', async () => {
            // Simulamos múltiples operaciones concurrentes
            const promises = [];
            for (let i = 0; i < 5; i++) {
                promises.push(cartModel.addToCart(mockProduct));
            }
            
            const results = await Promise.all(promises);
            
            // Verificamos que todas las operaciones hayan tenido éxito
            results.forEach(result => {
                expect(result.success).toBe(true);
            });
            
            // Verificamos que la cantidad sea correcta
            expect(cartModel.getProductQuantity(mockProduct.id_productos)).toBe(5);
        });
    });
});