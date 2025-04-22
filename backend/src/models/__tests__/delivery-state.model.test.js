const {
    readDeliveryState,
    createDeliveryState,
    updateDeliveryState,
    deleteDeliveryState
} = require('../delivery-state.model'); // Ajusta la ruta según tu estructura
const database = require('../../config/database');
const mysql2 = require('mysql2');

// Mockeando mysql2 y la conexión a la base de datos

jest.mock('mysql2', () => ({
    format: jest.fn().mockImplementation((query, params) => {
        // Implementación simple del formateo
        return query.replace('?', params[0]);
    })
}));

jest.mock('../../config/database', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));


describe('Pruebas para el CRUD de estados de pedido', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
    });

    // Pruebas para readDeliveryState
    describe('readDeliveryState', () => {
        it('debe llamar a la consulta correcta para leer un estado de pedido', async () => {
            const mockId = 1;
            const mockResults = [{ id_estado_envio: 1, denominacion: 'En preparación' }];

            database.promise().query.mockResolvedValueOnce([mockResults]);

            const result = await readDeliveryState(mockId);

            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM estado_del_pedido WHERE id_estado_envio = ?;',
                [mockId]
            );
            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual([mockResults]);
        });

        it('debe manejar errores de la base de datos', async () => {
            const mockId = 1;
            const mockError = new Error('Error de base de datos');

            database.promise().query.mockRejectedValueOnce(mockError);

            await expect(readDeliveryState(mockId)).rejects.toThrow(mockError);
        });
    });

    // Pruebas para createDeliveryState
    describe('createDeliveryState', () => {
        it('debe crear un nuevo estado de pedido correctamente', async () => {
            const mockId = 5;
            const mockDenominacion = 'Nuevo estado';
            const mockResults = { affectedRows: 1 };

            database.promise().query.mockResolvedValueOnce([mockResults]);

            const result = await createDeliveryState(mockId, mockDenominacion);

            expect(mysql2.format).toHaveBeenCalledWith(
                'INSERT INTO estado_del_pedido (id_estado_envio, denominacion) VALUES (?, ?);',
                [mockId, mockDenominacion]
            );
            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual([mockResults]);
        });

        it('debe manejar errores al crear un estado de pedido', async () => {
            const mockId = 5;
            const mockDenominacion = 'Nuevo estado';
            const mockError = new Error('Error de inserción');

            database.promise().query.mockRejectedValueOnce(mockError);

            await expect(createDeliveryState(mockId, mockDenominacion)).rejects.toThrow(mockError);
        });
    });

    // Pruebas para updateDeliveryState
    describe('updateDeliveryState', () => {
        it('debe actualizar un estado de pedido correctamente', async () => {
            const mockId = 2;
            const mockDenominacion = 'Estado actualizado';
            const mockResults = { affectedRows: 1 };

            database.promise().query.mockResolvedValueOnce([mockResults]);

            const result = await updateDeliveryState(mockId, mockDenominacion);

            expect(mysql2.format).toHaveBeenCalledWith(
                'UPDATE estado_del_pedido SET denominacion = ? WHERE id_estado_envio = ?;',
                [mockDenominacion, mockId]
            );
            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual([mockResults]);
        });

        it('debe manejar errores al actualizar un estado de pedido', async () => {
            const mockId = 2;
            const mockDenominacion = 'Estado actualizado';
            const mockError = new Error('Error de actualización');

            database.promise().query.mockRejectedValueOnce(mockError);

            await expect(updateDeliveryState(mockId, mockDenominacion)).rejects.toThrow(mockError);
        });
    });

    // Pruebas para deleteDeliveryState
    describe('deleteDeliveryState', () => {
        it('debe eliminar un estado de pedido correctamente', async () => {
            const mockId = 3;
            const mockResults = { affectedRows: 1 };

            database.promise().query.mockResolvedValueOnce([mockResults]);

            const result = await deleteDeliveryState(mockId);

            expect(mysql2.format).toHaveBeenCalledWith(
                'DELETE FROM estado_del_pedido WHERE id_estado_envio = ?;',
                [mockId]
            );
            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual([mockResults]);
        });

        it('debe manejar errores al eliminar un estado de pedido', async () => {
            const mockId = 3;
            const mockError = new Error('Error de eliminación');

            database.promise().query.mockRejectedValueOnce(mockError);

            await expect(deleteDeliveryState(mockId)).rejects.toThrow(mockError);
        });
    });
});