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
const opinionProductService = require('../opinions.model');
const database = require('../../config/database');
const mysql2 = require('mysql2');

// Mockear la conexión a la base de datos para no hacer llamadas reales durante las pruebas
jest.mock('../../config/database');
jest.mock('mysql2');

describe('Servicio de Opiniones de Productos', () => {
    // Limpiar todos los mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('readOpinionProduct', () => {
        it('debería buscar opiniones de un producto específico', async () => {
            // Configurar el mock para simular la respuesta de la base de datos
            const mockOpiniones = [{ id_opinion: 1, opinion: 'Excelente producto', fk_id_productos: 1 }];
            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue([mockOpiniones])
            });

            // Llamar a la función que estamos probando
            const fk_id_productos = 1;
            const result = await opinionProductService.readOpinionProduct(fk_id_productos);

            // Verificar que se llamó a la función query con los parámetros correctos
            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM opiniones WHERE fk_id_productos = ?;',
                [fk_id_productos]
            );

            // Verificar que se devolvieron los datos esperados
            expect(result).toEqual([mockOpiniones]);
        });

        it('debería manejar errores al buscar opiniones', async () => {
            // Configurar el mock para simular un error
            database.promise.mockReturnValue({
                query: jest.fn().mockRejectedValue(new Error('Error de base de datos'))
            });

            // Verificar que la función lanza el error esperado
            await expect(opinionProductService.readOpinionProduct(1)).rejects.toThrow('Error de base de datos');
        });
    });

    describe('createOpinionProduct', () => {
        it('debería crear una nueva opinión para un producto', async () => {
            // Configurar el mock
            const mockResult = { insertId: 1 };
            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue([mockResult])
            });

            // Datos de prueba
            const es_anonimo = false;
            const opinion = 'Muy buen producto';
            const fk_id_productos = 1;

            // Llamar a la función
            const result = await opinionProductService.createOpinionProduct(
                es_anonimo,
                opinion,
                fk_id_productos
            );

            // Verificar parámetros
            expect(mysql2.format).toHaveBeenCalledWith(
                'INSERT INTO opiniones (es_anonimo, opinion, fk_id_productos) VALUES (?, ?, ?);',
                [es_anonimo, opinion, fk_id_productos]
            );

            // Verificar resultado
            expect(result).toEqual([mockResult]);
        });
    });

    describe('updateOpinionProduct', () => {
        it('debería actualizar una opinión existente', async () => {
            // Configurar mock
            const mockResult = { affectedRows: 1 };
            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue([mockResult])
            });

            // Datos de prueba
            const id_opinion = 1;
            const es_anonimo = true;
            const opinion = 'Opinión actualizada';
            const fk_id_productos = 1;

            // Llamar a la función
            const result = await opinionProductService.updateOpinionProduct(
                id_opinion,
                es_anonimo,
                opinion,
                fk_id_productos
            );

            // Verificar parámetros
            expect(mysql2.format).toHaveBeenCalledWith(
                'UPDATE opiniones SET es_anonimo = ?, opinion = ?, fk_id_productos = ? WHERE id_opinion = ?;',
                [es_anonimo, opinion, fk_id_productos, id_opinion]
            );

            // Verificar resultado
            expect(result).toEqual([mockResult]);
        });

        it('debería manejar errores al actualizar', async () => {
            database.promise.mockReturnValue({
                query: jest.fn().mockRejectedValue(new Error('Error al actualizar'))
            });

            await expect(
                opinionProductService.updateOpinionProduct(1, true, 'test', 1)
            ).rejects.toThrow('Error al actualizar');
        });
    });

    describe('deleteOpinionProduct', () => {
        it('debería eliminar una opinión existente', async () => {
            // Configurar mock
            const mockResult = { affectedRows: 1 };
            database.promise.mockReturnValue({
                query: jest.fn().mockResolvedValue([mockResult])
            });

            // ID de prueba
            const id_opinion = 1;

            // Llamar a la función
            const result = await opinionProductService.deleteOpinionProduct(id_opinion);

            // Verificar parámetros
            expect(mysql2.format).toHaveBeenCalledWith(
                'DELETE FROM opiniones WHERE id_opinion = ?;',
                [id_opinion]
            );

            // Verificar resultado
            expect(result).toEqual([mockResult]);
        });

        it('debería manejar errores al eliminar', async () => {
            database.promise.mockReturnValue({
                query: jest.fn().mockRejectedValue(new Error('Error al eliminar'))
            });

            await expect(
                opinionProductService.deleteOpinionProduct(1)
            ).rejects.toThrow('Error al eliminar');
        });
    });
});