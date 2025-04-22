// Importar el módulo que vamos a probar
const sendMethods = require('../send-method.model');
const database = require('../../config/database');
const mysql2 = require('mysql2');

// Mock de la conexión a la base de datos para no hacer llamadas reales durante las pruebas
jest.mock('../../config/database', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));

// Mock de mysql2 para controlar el formato de las consultas
jest.mock('mysql2', () => ({
    format: jest.fn((query, params) => query.replace('?', params[0]))
}));

describe('Pruebas para el CRUD de métodos de envío', () => {
    // Limpiar todos los mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('readSendMethod', () => {
        it('debería ejecutar una consulta SELECT correctamente', async () => {
            // Datos de prueba
            const testId = 1;
            const mockResults = [{ id_metodo_envio: 1, nombre_m_envio: 'Estándar' }];
            
            // Configurar el mock para devolver resultados simulados
            database.promise().query.mockResolvedValue([mockResults]);
            
            // Llamar a la función
            const result = await sendMethods.readSendMethod(testId);
            
            // Verificar que se llamó a la base de datos con la consulta correcta
            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM metodo_de_envio WHERE id_metodo_envio = ?;',
                [testId]
            );
            
            // Verificar que se llamó al método query
            expect(database.promise().query).toHaveBeenCalled();
            
            // Verificar que el resultado es el esperado
            expect(result).toEqual([mockResults]);
        });

        it('debería manejar errores correctamente', async () => {
            const testId = 1;
            const mockError = new Error('Error de base de datos');
            
            // Configurar el mock para rechazar con un error
            database.promise().query.mockRejectedValue(mockError);
            
            // Verificar que la función rechaza con el error
            await expect(sendMethods.readSendMethod(testId)).rejects.toThrow(mockError);
        });
    });

    describe('createSendMethod', () => {
        it('debería ejecutar una consulta INSERT correctamente', async () => {
            // Datos de prueba
            const testId = 2;
            const testName = 'Express';
            const mockResults = { affectedRows: 1 };
            
            // Configurar el mock
            database.promise().query.mockResolvedValue([mockResults]);
            
            // Llamar a la función
            const result = await sendMethods.createSendMethod(testId, testName);
            
            // Verificar la consulta SQL
            expect(mysql2.format).toHaveBeenCalledWith(
                'INSERT INTO metodo_de_envio (id_metodo_envio, nombre_m_envio) VALUES (?, ?);',
                [testId, testName]
            );
            
            // Verificar la llamada a la base de datos
            expect(database.promise().query).toHaveBeenCalled();
            
            // Verificar el resultado
            expect(result).toEqual([mockResults]);
        });
    });

    describe('updateSendMethod', () => {
        it('debería ejecutar una consulta UPDATE correctamente', async () => {
            // Datos de prueba
            const testId = 1;
            const newName = 'Premium';
            const mockResults = { affectedRows: 1 };
            
            // Configurar el mock
            database.promise().query.mockResolvedValue([mockResults]);
            
            // Llamar a la función
            const result = await sendMethods.updateSendMethod(testId, newName);
            
            // Verificar la consulta SQL
            expect(mysql2.format).toHaveBeenCalledWith(
                'UPDATE metodo_de_envio SET nombre_m_envio=? WHERE id_metodo_envio=?;',
                [newName, testId]
            );
            
            // Verificar el resultado
            expect(result).toEqual([mockResults]);
        });
    });

    describe('deleteSendMethod', () => {
        it('debería ejecutar una consulta DELETE correctamente', async () => {
            // Datos de prueba
            const testId = 1;
            const mockResults = { affectedRows: 1 };
            
            // Configurar el mock
            database.promise().query.mockResolvedValue([mockResults]);
            
            // Llamar a la función
            const result = await sendMethods.deleteSendMethod(testId);
            
            // Verificar la consulta SQL
            expect(mysql2.format).toHaveBeenCalledWith(
                'DELETE FROM metodo_de_envio WHERE id_metodo_envio = ?;',
                [testId]
            );
            
            // Verificar el resultado
            expect(result).toEqual([mockResults]);
        });
    });
});