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


const { readCity, createCity, updateCity, deleteCity } = require('../city.model');
const database = require('../../config/database');
const mysql2 = require('mysql2');

// Mock de la conexión a la base de datos
jest.mock('../../config/database');
jest.mock('mysql2');

describe('Pruebas para el CRUD de ciudades', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();

        // Mock de database.promise().query
        database.promise = jest.fn().mockReturnValue({
            query: jest.fn()
        });
    });

    describe('readCity', () => {
        it('debería llamar a la consulta SQL correcta para leer una ciudad', async () => {
            const mockId = 1;
            const mockResult = [{ id_ciudad: 1, nombre_ciudad: 'Madrid' }];

            // Configurar el mock para devolver un resultado específico
            database.promise().query.mockResolvedValue([mockResult]);

            const result = await readCity(mockId);

            // Verificar que se llamó a la función con los parámetros correctos
            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM ciudades WHERE id_ciudad = ?;',
                [mockId]
            );

            // Verificar que se llamó a la función query
            expect(database.promise().query).toHaveBeenCalled();

            // Verificar que el resultado es el esperado
            expect(result).toEqual([mockResult]);
        });

        it('debería manejar errores de la base de datos', async () => {
            const mockId = 1;
            const mockError = new Error('Error de base de datos');

            // Configurar el mock para lanzar un error
            database.promise().query.mockRejectedValue(mockError);

            // Verificar que la función lanza el error
            await expect(readCity(mockId)).rejects.toThrow(mockError);
        });
    });

    describe('createCity', () => {
        it('debería crear una nueva ciudad correctamente', async () => {
            const mockId = 2;
            const mockNombre = 'Barcelona';
            const mockResult = { affectedRows: 1 };

            database.promise().query.mockResolvedValue([mockResult]);

            const result = await createCity(mockId, mockNombre);

            expect(mysql2.format).toHaveBeenCalledWith(
                'INSERT INTO ciudades (id_ciudad, nombre_ciudad) VALUES (?, ?);',
                [mockId, mockNombre]
            );

            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual([mockResult]);
        });

        it('debería manejar errores al crear una ciudad', async () => {
            const mockError = new Error('Error al insertar');
            database.promise().query.mockRejectedValue(mockError);

            await expect(createCity(2, 'Barcelona')).rejects.toThrow(mockError);
        });
    });

    describe('updateCity', () => {
        it('debería actualizar una ciudad existente correctamente', async () => {
            const mockId = 1;
            const mockNombre = 'Valencia';
            const mockResult = { affectedRows: 1 };

            database.promise().query.mockResolvedValue([mockResult]);

            const result = await updateCity(mockId, mockNombre);

            expect(mysql2.format).toHaveBeenCalledWith(
                'UPDATE ciudades SET nombre_ciudad = ? WHERE id_ciudad = ?;',
                [mockNombre, mockId]
            );

            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual([mockResult]);
        });

        it('debería manejar errores al actualizar una ciudad', async () => {
            const mockError = new Error('Error al actualizar');
            database.promise().query.mockRejectedValue(mockError);

            await expect(updateCity(1, 'Valencia')).rejects.toThrow(mockError);
        });
    });

    describe('deleteCity', () => {
        it('debería eliminar una ciudad correctamente', async () => {
            const mockId = 1;
            const mockResult = { affectedRows: 1 };

            database.promise().query.mockResolvedValue([mockResult]);

            const result = await deleteCity(mockId);

            expect(mysql2.format).toHaveBeenCalledWith(
                'DELETE FROM ciudades WHERE id_ciudad = ?;',
                [mockId]
            );

            expect(database.promise().query).toHaveBeenCalled();
            expect(result).toEqual([mockResult]);
        });

        it('debería manejar errores al eliminar una ciudad', async () => {
            const mockError = new Error('Error al eliminar');
            database.promise().query.mockRejectedValue(mockError);

            await expect(deleteCity(1)).rejects.toThrow(mockError);
        });
    });
});