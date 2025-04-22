// Importar el módulo que vamos a probar
const productService = require('../product.model');
const database = require('../../config/database');
const mysql2 = require('mysql2');

// Mock de la conexión a la base de datos
jest.mock('../../config/database', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));

// Mock de mysql2 para probar el formato de las consultas
jest.mock('mysql2', () => ({
    format: jest.fn((query, values) => {
        // Simulamos el formato de la consulta reemplazando los placeholders
        return values.reduce((q, val, i) => q.replace(`?`, val), query);
    })
}));

describe('Servicio de Productos', () => {
    // Limpiar todos los mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllProducts', () => {
        it('debería ejecutar la consulta correcta para obtener todos los productos', async () => {
            // Configurar el mock para devolver datos de prueba
            const mockProducts = [{ id: 1, nombre: 'Producto 1' }];
            database.promise().query.mockResolvedValue([mockProducts]);

            // Ejecutar la función
            const result = await productService.getAllProducts();

            // Verificar que se llamó a la consulta correcta
            expect(database.promise().query).toHaveBeenCalledWith(
                'SELECT id_productos, nombre_producto, precio, unidades_disponibles, fk_id_categoria, imagen_url FROM productos;'
            );

            // Verificar que devuelve los datos esperados
            expect(result).toEqual([mockProducts]);
        });
    });

    describe('getSimilarProducts', () => {
        it('debería ejecutar una consulta con LIKE para buscar productos similares', async () => {
            const searchTerm = 'camiseta';
            const mockProducts = [{ id: 1, nombre: 'Camiseta Azul' }];
            database.promise().query.mockResolvedValue([mockProducts]);

            const result = await productService.getSimilarProducts(searchTerm);

            // Verificar que mysql2.format fue llamado correctamente
            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM productos WHERE nombre_producto LIKE ?;',
                [`%${searchTerm}%`]
            );

            // Verificar que la consulta formateada se pasó a la base de datos
            expect(database.promise().query).toHaveBeenCalledWith(
                `SELECT * FROM productos WHERE nombre_producto LIKE %${searchTerm}%;`
            );

            expect(result).toEqual([mockProducts]);
        });
    });

    describe('getFeaturedProducts', () => {
        it('debería obtener solo los productos destacados', async () => {
            const mockFeaturedProducts = [{ id: 1, nombre: 'Producto Destacado', destacado: 1 }];
            database.promise().query.mockResolvedValue([mockFeaturedProducts]);

            const result = await productService.getFeaturedProducts();

            expect(database.promise().query).toHaveBeenCalledWith(
                'SELECT id_productos, nombre_producto, precio, unidades_disponibles, descripcion, fk_id_categoria, imagen_url FROM productos WHERE destacado = 1;'
            );

            expect(result).toEqual([mockFeaturedProducts]);
        });
    });

    describe('getProductCategory', () => {
        it('debería obtener productos por categoría específica', async () => {
            const categoryId = 3;
            const mockProducts = [{ id: 1, nombre: 'Producto Categoría 3', fk_id_categoria: 3 }];
            database.promise().query.mockResolvedValue([mockProducts]);

            const result = await productService.getProductCategory(categoryId);

            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM productos INNER JOIN categorias ON productos.fk_id_categoria = categorias.id_categoria WHERE productos.fk_id_categoria = ?;',
                [categoryId]
            );

            expect(database.promise().query).toHaveBeenCalledWith(
                `SELECT * FROM productos INNER JOIN categorias ON productos.fk_id_categoria = categorias.id_categoria WHERE productos.fk_id_categoria = ${categoryId};`
            );

            expect(result).toEqual([mockProducts]);
        });
    });

    describe('readProduct', () => {
        it('debería obtener un producto por su ID', async () => {
            const productId = 5;
            const mockProduct = [{ id: productId, nombre: 'Producto Específico' }];
            database.promise().query.mockResolvedValue([mockProduct]);

            const result = await productService.readProduct(productId);

            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM productos WHERE id_productos = ?;',
                [productId]
            );

            expect(database.promise().query).toHaveBeenCalledWith(
                `SELECT * FROM productos WHERE id_productos = ${productId};`
            );

            expect(result).toEqual([mockProduct]);
        });
    });

    describe('createProduct', () => {
        it('debería insertar un nuevo producto en la base de datos', async () => {
            const newProduct = {
                id_productos: 10,
                nombre_producto: 'Nuevo Producto',
                unidades_stock: 100,
                unidades_disponibles: 100,
                fk_id_categoria: 2,
                precio: 19.99,
                imagen_url: 'imagen.jpg'
            };

            const mockResult = { insertId: 10 };
            database.promise().query.mockResolvedValue([mockResult]);

            const result = await productService.createProduct(
                newProduct.id_productos,
                newProduct.nombre_producto,
                newProduct.unidades_stock,
                newProduct.unidades_disponibles,
                newProduct.fk_id_categoria,
                newProduct.precio,
                newProduct.imagen_url
            );

            expect(mysql2.format).toHaveBeenCalledWith(
                'INSERT INTO productos (id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?);',
                [
                    newProduct.id_productos,
                    newProduct.nombre_producto,
                    newProduct.unidades_stock,
                    newProduct.unidades_disponibles,
                    newProduct.fk_id_categoria,
                    newProduct.precio,
                    newProduct.imagen_url
                ]
            );

            expect(database.promise().query).toHaveBeenCalledWith(
                `INSERT INTO productos (id_productos, nombre_producto, unidades_stock, unidades_disponibles, fk_id_categoria, precio, imagen_url) VALUES (${newProduct.id_productos}, ${newProduct.nombre_producto}, ${newProduct.unidades_stock}, ${newProduct.unidades_disponibles}, ${newProduct.fk_id_categoria}, ${newProduct.precio}, ${newProduct.imagen_url});`
            );

            expect(result).toEqual([mockResult]);
        });
    });

    describe('updateProduct', () => {
        it('debería actualizar un producto existente', async () => {
            const productId = 5;
            const updatedData = {
                nombre_producto: 'Producto Actualizado',
                unidades_stock: 50,
                unidades_disponibles: 50,
                fk_id_categoria: 3,
                precio: 29.99
            };

            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValue([mockResult]);

            const result = await productService.updateProduct(
                productId,
                updatedData.nombre_producto,
                updatedData.unidades_stock,
                updatedData.unidades_disponibles,
                updatedData.fk_id_categoria,
                updatedData.precio
            );

            expect(mysql2.format).toHaveBeenCalledWith(
                'UPDATE productos SET nombre_producto=?, unidades_stock=?, unidades_disponibles=?, fk_id_categoria=?, precio=? WHERE id_productos=?;',
                [
                    updatedData.nombre_producto,
                    updatedData.unidades_stock,
                    updatedData.unidades_disponibles,
                    updatedData.fk_id_categoria,
                    updatedData.precio,
                    productId
                ]
            );

            expect(database.promise().query).toHaveBeenCalledWith(
                `UPDATE productos SET nombre_producto=${updatedData.nombre_producto}, unidades_stock=${updatedData.unidades_stock}, unidades_disponibles=${updatedData.unidades_disponibles}, fk_id_categoria=${updatedData.fk_id_categoria}, precio=${updatedData.precio} WHERE id_productos=${productId};`
            );

            expect(result).toEqual([mockResult]);
        });
    });

    describe('deleteProduct', () => {
        it('debería eliminar un producto por su ID', async () => {
            const productId = 8;
            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValue([mockResult]);

            const result = await productService.deleteProduct(productId);

            expect(mysql2.format).toHaveBeenCalledWith(
                'DELETE FROM productos WHERE id_productos = ?;',
                [productId]
            );

            expect(database.promise().query).toHaveBeenCalledWith(
                `DELETE FROM productos WHERE id_productos = ${productId};`
            );

            expect(result).toEqual([mockResult]);
        });
    });
});