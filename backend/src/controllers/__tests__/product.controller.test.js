const {
    getAllProducts,
    getSimilarProducts,
    getFeaturedProducts,
    getProductCategory,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    errorHandler
} = require('../product.controller');
const productModel = require('../../models/product.model');

// Mockear el modelo de productos
jest.mock('../../models/product.model', () => ({
    getAllProducts: jest.fn(),
    getSimilarProducts: jest.fn(),
    getFeaturedProducts: jest.fn(),
    getProductCategory: jest.fn(),
    readProduct: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    errorHandler: jest.fn()
}));

describe('Product Controller', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        // Configurar objetos mock de request, response y next
        mockReq = {
            params: {},
            body: {}
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        mockNext = jest.fn();

        // Limpiar todos los mocks antes de cada test
        jest.clearAllMocks();
    });

    describe('getAllProducts', () => {
        it('debería devolver todos los productos', async () => {
            const mockProducts = [{ id: 1, name: 'Producto 1' }, { id: 2, name: 'Producto 2' }];
            productModel.getAllProducts.mockResolvedValue([mockProducts]);

            await getAllProducts(mockReq, mockRes);

            expect(productModel.getAllProducts).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
        });

        it('debería manejar errores correctamente', async () => {
            const mockError = new Error('Error de base de datos');
            productModel.getAllProducts.mockRejectedValue(mockError);

            await getAllProducts(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('getSimilarProducts', () => {
        it('debería devolver productos similares', async () => {
            const searchTerm = 'term';
            const mockProducts = [{ id: 1, name: 'Producto similar' }];
            mockReq.params.searchTerm = searchTerm;
            productModel.getSimilarProducts.mockResolvedValue([mockProducts]);

            await getSimilarProducts(mockReq, mockRes);

            expect(productModel.getSimilarProducts).toHaveBeenCalledWith(searchTerm);
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
        });
    });

    describe('getFeaturedProducts', () => {
        it('debería devolver productos destacados', async () => {
            const mockProducts = [{ id: 1, name: 'Producto destacado' }];
            productModel.getFeaturedProducts.mockResolvedValue([mockProducts]);

            await getFeaturedProducts(mockReq, mockRes);

            expect(productModel.getFeaturedProducts).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
        });

        it('debería devolver mensaje cuando no hay productos destacados', async () => {
            productModel.getFeaturedProducts.mockResolvedValue([[]]);

            await getFeaturedProducts(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({ message: 'No se encontraron productos destacados' });
        });
    });

    describe('getProductCategory', () => {
        it('debería devolver productos por categoría', async () => {
            const categoryId = '1';
            const mockProducts = [{ id: 1, name: 'Producto categoría 1' }];
            mockReq.params.fk_id_categoria = categoryId;
            productModel.getProductCategory.mockResolvedValue([mockProducts]);

            await getProductCategory(mockReq, mockRes);

            expect(productModel.getProductCategory).toHaveBeenCalledWith(categoryId);
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
        });

        it('debería devolver mensaje cuando no hay productos en la categoría', async () => {
            mockReq.params.fk_id_categoria = '999';
            productModel.getProductCategory.mockResolvedValue([[]]);

            await getProductCategory(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'No han sido encontrados productos con esta categoría :('
            });
        });
    });

    describe('readProduct', () => {
        it('debería devolver un producto específico', async () => {
            const productId = '123';
            const mockProduct = { id: productId, name: 'Producto específico' };
            mockReq.params.id_productos = productId;
            productModel.readProduct.mockResolvedValue([[mockProduct]]);

            await readProduct(mockReq, mockRes);

            expect(productModel.readProduct).toHaveBeenCalledWith(productId);
            expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
        });

        it('debería devolver mensaje cuando el producto no existe', async () => {
            mockReq.params.id_productos = '999';
            productModel.readProduct.mockResolvedValue([[]]);

            await readProduct(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Producto no encontrado :('
            });
        });
    });

    describe('createProduct', () => {
        it('debería crear un nuevo producto', async () => {
            const mockProduct = {
                id_productos: '123',
                nombre_producto: 'Nuevo producto',
                unidades_stock: 10,
                unidades_disponibles: 10,
                fk_id_categoria: '1',
                precio: 99.99,
                imagen_url: 'imagen.jpg'
            };
            mockReq.body = mockProduct;

            await createProduct(mockReq, mockRes);

            expect(productModel.createProduct).toHaveBeenCalledWith(
                mockProduct.id_productos,
                mockProduct.nombre_producto,
                mockProduct.unidades_stock,
                mockProduct.unidades_disponibles,
                mockProduct.fk_id_categoria,
                mockProduct.precio,
                mockProduct.imagen_url
            );
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Producto creado con éxito'
            });
        });

        it('debería devolver error cuando faltan campos obligatorios', async () => {
            mockReq.body = {
                id_productos: '123',
                // Faltan otros campos
            };

            await createProduct(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
            expect(productModel.createProduct).not.toHaveBeenCalled();
        });
    });

    describe('updateProduct', () => {
        it('debería actualizar un producto existente', async () => {
            const productId = '123';
            const mockUpdate = {
                nombre_producto: 'Producto actualizado',
                unidades_stock: 20,
                unidades_disponibles: 15,
                fk_id_categoria: '2',
                precio: 129.99
            };
            mockReq.params.id_productos = productId;
            mockReq.body = mockUpdate;

            await updateProduct(mockReq, mockRes);

            expect(productModel.updateProduct).toHaveBeenCalledWith(
                productId,
                mockUpdate.nombre_producto,
                mockUpdate.unidades_stock,
                mockUpdate.unidades_disponibles,
                mockUpdate.fk_id_categoria,
                mockUpdate.precio
            );
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Producto actualizado con éxito'
            });
        });

        it('debería devolver error cuando faltan campos obligatorios', async () => {
            mockReq.params.id_productos = '123';
            mockReq.body = {
                nombre_producto: 'Solo nombre',
                // Faltan otros campos
            };

            await updateProduct(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Todos los campos son obligatorios'
            });
            expect(productModel.updateProduct).not.toHaveBeenCalled();
        });
    });

    describe('deleteProduct', () => {
        it('debería eliminar un producto existente', async () => {
            const productId = '123';
            mockReq.params.id_productos = productId;

            await deleteProduct(mockReq, mockRes);

            expect(productModel.deleteProduct).toHaveBeenCalledWith(productId);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Producto eliminado con éxito'
            });
        });

        it('debería devolver error cuando falta el ID del producto', async () => {
            mockReq.params = {}; // Sin ID

            await deleteProduct(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'El ID del producto es obligatorio'
            });
            expect(productModel.deleteProduct).not.toHaveBeenCalled();
        });
    });

    describe('errorHandler', () => {
        it('debería manejar errores y enviar respuesta 500', () => {
            const mockError = new Error('Error de prueba');

            errorHandler(mockError, mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'Error interno del servidor'
            });
        });
    });
});