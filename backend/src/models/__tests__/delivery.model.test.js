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


const pedidos = require('../delivery.model');
const database = require('../../config/database');
const mysql2 = require('mysql2');

// Mock de la base de datos y mysql2
jest.mock('../../config/database');
jest.mock('mysql2');

describe('Módulo de Pedidos', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    describe('readIdDelivery', () => {
        it('debería buscar un pedido por ID correctamente', async () => {
            const mockPedido = { id_pedido: 1, fk_id_usuario: 1, total: 100 };
            const mockQueryResult = [[mockPedido], []]; // Estructura típica de mysql2

            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue(mockQueryResult)
            });

            const id_pedido = 1;
            const result = await pedidos.readIdDelivery(id_pedido);

            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM pedidos WHERE id_pedido = ?;',
                [id_pedido]
            );
            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual(mockQueryResult);
        });

        it('debería manejar errores al buscar un pedido por ID', async () => {
            database.promise.mockReturnValue({
                query: jest.fn().mockRejectedValue(new Error('Error de base de datos'))
            });

            await expect(pedidos.readIdDelivery(1)).rejects.toThrow('Error de base de datos');
        });
    });

    describe('readUserDelivery', () => {
        it('debería buscar pedidos por usuario correctamente', async () => {
            const mockPedidos = [
                { id_pedido: 1, fk_id_usuario: 1, total: 100 },
                { id_pedido: 2, fk_id_usuario: 1, total: 200 }
            ];
            const mockQueryResult = [mockPedidos, []];

            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue(mockQueryResult)
            });

            const fk_id_usuario = 1;
            const result = await pedidos.readUserDelivery(fk_id_usuario);

            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM pedidos WHERE fk_id_usuario = ?;',
                [fk_id_usuario]
            );
            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual(mockQueryResult);
        });
    });

    describe('createUserDelivery', () => {
        it('debería crear un nuevo pedido correctamente', async () => {
            const mockInsertResult = { affectedRows: 1, insertId: 5 };
            const mockQueryResult = [mockInsertResult, undefined];

            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue(mockQueryResult)
            });

            const pedidoData = {
                fk_id_usuario: 1,
                fk_id_metodo_envio: 2,
                fecha_de_pedido: '2023-01-01',
                fk_id_ciudad: 3,
                direccion: 'Calle Falsa 123',
                fk_id_estado_envio: 1,
                subtotal: 90,
                impuesto: 10,
                total: 100,
                vigencia_factura: 1
            };

            const result = await pedidos.createUserDelivery(
                pedidoData.fk_id_usuario,
                pedidoData.fk_id_metodo_envio,
                pedidoData.fecha_de_pedido,
                pedidoData.fk_id_ciudad,
                pedidoData.direccion,
                pedidoData.fk_id_estado_envio,
                pedidoData.subtotal,
                pedidoData.impuesto,
                pedidoData.total,
                pedidoData.vigencia_factura
            );

            expect(mysql2.format).toHaveBeenCalledWith(
                'INSERT INTO pedidos (fk_id_usuario, fk_id_metodo_envio, fecha_de_pedido, fk_id_ciudad, direccion, fk_id_estado_envio, subtotal, impuesto, total, vigencia_factura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                Object.values(pedidoData)
            );
            expect(result).toEqual(mockQueryResult);
        });
    });

    describe('updateUserDelivery', () => {
        it('debería actualizar un pedido existente correctamente', async () => {
            const mockUpdateResult = { affectedRows: 1 };
            const mockQueryResult = [mockUpdateResult, undefined];

            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue(mockQueryResult)
            });

            const pedidoData = {
                id_pedido: 1,
                fk_id_metodo_envio: 3,
                fecha_de_pedido: '2023-01-02',
                fk_id_ciudad: 4,
                direccion: 'Calle Verdadera 456',
                fk_id_estado_envio: 2,
                subtotal: 180,
                impuesto: 20,
                total: 200,
                vigencia_factura: 0
            };

            const result = await pedidos.updateUserDelivery(
                pedidoData.id_pedido,
                pedidoData.fk_id_metodo_envio,
                pedidoData.fecha_de_pedido,
                pedidoData.fk_id_ciudad,
                pedidoData.direccion,
                pedidoData.fk_id_estado_envio,
                pedidoData.subtotal,
                pedidoData.impuesto,
                pedidoData.total,
                pedidoData.vigencia_factura
            );

            expect(mysql2.format).toHaveBeenCalledWith(
                'UPDATE pedidos SET fk_id_metodo_envio=?, fecha_de_pedido=?, fk_id_ciudad=?, direccion=?, fk_id_estado_envio=?, subtotal=?, impuesto=?, total=?, vigencia_factura=? WHERE id_pedido=?;',
                [
                    pedidoData.fk_id_metodo_envio,
                    pedidoData.fecha_de_pedido,
                    pedidoData.fk_id_ciudad,
                    pedidoData.direccion,
                    pedidoData.fk_id_estado_envio,
                    pedidoData.subtotal,
                    pedidoData.impuesto,
                    pedidoData.total,
                    pedidoData.vigencia_factura,
                    pedidoData.id_pedido
                ]
            );
            expect(result).toEqual(mockQueryResult);
        });
    });

    describe('deleteUserDelivery', () => {
        it('debería eliminar un pedido correctamente', async () => {
            const mockDeleteResult = { affectedRows: 1 };
            const mockQueryResult = [mockDeleteResult, undefined];

            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue(mockQueryResult)
            });

            const id_pedido = 1;
            const result = await pedidos.deleteUserDelivery(id_pedido);

            expect(mysql2.format).toHaveBeenCalledWith(
                'DELETE FROM pedidos WHERE id_pedido = ?;',
                [id_pedido]
            );
            expect(result).toEqual(mockQueryResult);
        });

        it('debería manejar errores al eliminar un pedido', async () => {
            database.promise.mockReturnValue({
                query: jest.fn().mockRejectedValue(new Error('Error al eliminar'))
            });

            await expect(pedidos.deleteUserDelivery(1)).rejects.toThrow('Error al eliminar');
        });
    });
});