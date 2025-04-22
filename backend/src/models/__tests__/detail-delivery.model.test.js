jest.mock('mysql2', () => ({
    format: jest.fn().mockImplementation((query, params) => {
        // Implementación simple del formateo
        return query.replace('?', params[0]);
    })
}));

jest.mock('../../config/database', () => ({
    promise: jest.fn(() => ({
        query: jest.fn()
    }))
}));

// Importar el módulo que vamos a probar
const deliveryDetails = require('../detail-delivery.model');
const mysql2 = require('mysql2');
const database = require('../../config/database');

// Mockear la conexión a la base de datos para no hacer llamadas reales durante las pruebas
jest.mock('../../config/database', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));

// Mockear mysql2 para controlar el formato de las consultas
jest.mock('mysql2', () => ({
    format: jest.fn().mockImplementation((query, params) => {
        return query.replace('?', params.join(', '));
    })
}));

describe('Funciones CRUD para Detalle de Pedido', () => {
    afterEach(() => {
        // Limpiar todos los mocks después de cada prueba
        jest.clearAllMocks();
    });

    describe('readDeliveryDetails', () => {
        it('debería ejecutar la consulta correcta para leer detalles de un pedido', async () => {
            const mockPedidoId = 123;
            const mockQueryResult = [{ id: 1, nombre_producto: 'Producto 1' }];

            // Configurar el mock para devolver un resultado específico
            database.promise().query.mockResolvedValue([mockQueryResult]);

            // Llamar a la función
            const result = await deliveryDetails.readDeliveryDetails(mockPedidoId);

            // Verificar que se llamó a mysql2.format con los parámetros correctos
            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT dp.*, p.imagen_url, p.nombre_producto FROM detalle_pedido dp INNER JOIN productos p ON dp.fk_id_producto = p.id_productos WHERE dp.fk_id_pedido = ?;',
                [mockPedidoId]
            );

            // Verificar que se llamó a la base de datos
            expect(database.promise().query).toHaveBeenCalled();

            // Verificar que el resultado es el esperado
            expect(result).toEqual([mockQueryResult]);
        });

        it('debería manejar errores al leer detalles de un pedido', async () => {
            const mockError = new Error('Error de base de datos');
            database.promise().query.mockRejectedValue(mockError);

            // Verificar que la función lanza el error
            await expect(deliveryDetails.readDeliveryDetails(123)).rejects.toThrow(mockError);
        });
    });

    describe('createDeliveryDetails', () => {
        it('debería crear correctamente un nuevo detalle de pedido', async () => {
            const mockParams = {
                fk_id_producto: 456,
                cantidad: 2,
                precio_unitario: 19.99
            };

            const mockInsertResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValue([mockInsertResult]);

            const result = await deliveryDetails.createDeliveryDetails(
                mockParams.fk_id_producto,
                mockParams.cantidad,
                mockParams.precio_unitario
            );

            // Verificar que la consulta se formateó correctamente
            expect(mysql2.format).toHaveBeenCalledWith(
                'INSERT INTO detalle_pedido (fk_id_pedido, fk_id_producto, cantidad, precio_unitario) VALUES (?, ?, ?);',
                [mockParams.fk_id_producto, mockParams.cantidad, mockParams.precio_unitario]
            );

            expect(result).toEqual([mockInsertResult]);
        });

        it('debería manejar errores al crear un detalle de pedido', async () => {
            const mockError = new Error('Error de inserción');
            database.promise().query.mockRejectedValue(mockError);

            await expect(deliveryDetails.createDeliveryDetails(1, 1, 10)).rejects.toThrow(mockError);
        });
    });

    describe('updateDeliveryDetails', () => {
        it('debería actualizar correctamente un detalle de pedido existente', async () => {
            const mockParams = {
                fk_id_pedido: 123,
                cantidad: 3,
                precio_unitario: 15.99,
                precio_total: 47.97
            };

            const mockUpdateResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValue([mockUpdateResult]);

            const result = await deliveryDetails.updateDeliveryDetails(
                mockParams.fk_id_pedido,
                mockParams.cantidad,
                mockParams.precio_unitario,
                mockParams.precio_total
            );

            expect(mysql2.format).toHaveBeenCalledWith(
                'UPDATE detalle_pedido SET cantidad=?, precio_unitario=?, precio_total=? WHERE fk_id_pedido=?;',
                [mockParams.cantidad, mockParams.precio_unitario, mockParams.precio_total, mockParams.fk_id_pedido]
            );

            expect(result).toEqual([mockUpdateResult]);
        });

        it('debería manejar errores al actualizar un detalle de pedido', async () => {
            const mockError = new Error('Error de actualización');
            database.promise().query.mockRejectedValue(mockError);

            await expect(deliveryDetails.updateDeliveryDetails(123, 1, 10, 10)).rejects.toThrow(mockError);
        });
    });

    describe('deleteDeliveryDetails', () => {
        it('debería eliminar correctamente un detalle de pedido', async () => {
            const mockPedidoId = 123;
            const mockDeleteResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValue([mockDeleteResult]);

            const result = await deliveryDetails.deleteDeliveryDetails(mockPedidoId);

            expect(mysql2.format).toHaveBeenCalledWith(
                'DELETE FROM detalle_pedido WHERE fk_id_pedido = ?;',
                [mockPedidoId]
            );

            expect(result).toEqual([mockDeleteResult]);
        });

        it('debería manejar errores al eliminar un detalle de pedido', async () => {
            const mockError = new Error('Error de eliminación');
            database.promise().query.mockRejectedValue(mockError);

            await expect(deliveryDetails.deleteDeliveryDetails(123)).rejects.toThrow(mockError);
        });
    });
});