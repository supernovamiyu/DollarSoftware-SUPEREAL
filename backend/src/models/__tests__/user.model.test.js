// Importar el módulo que vamos a probar
const userService = require('../user.model'); // Ajusta la ruta según tu estructura
const mysql2 = require('mysql2');
const database = require("../../config/database");

// Mockear la conexión a la base de datos para no hacer llamadas reales
jest.mock('../../config/database', () => ({
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
}));

// Mockear mysql2 para controlar el formato de las consultas
jest.mock('mysql2', () => ({
    format: jest.fn((sql, params) => sql.replace('?', params[0])) // Implementación simplificada
}));

describe('Servicio de Usuarios', () => {
    // Limpiar todos los mocks después de cada prueba
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('readUser', () => {
        it('debería buscar un usuario por ID correctamente', async () => {
            const mockUser = { id_usuario: 1, nombre_completo: 'Test User' };
            database.promise().query.mockResolvedValueOnce([[mockUser]]);

            const result = await userService.readUser(1);

            // Verificar que se llamó a mysql2.format con los parámetros correctos
            expect(mysql2.format).toHaveBeenCalledWith(
                "SELECT * FROM usuarios WHERE id_usuario = ?;",
                [1]
            );

            // Verificar que se ejecutó la consulta en la base de datos
            expect(database.promise().query).toHaveBeenCalled();

            // Verificar que el resultado es el esperado
            expect(result).toEqual([[mockUser]]);
        });

        it('debería manejar errores al buscar un usuario', async () => {
            database.promise().query.mockRejectedValueOnce(new Error('Error de base de datos'));

            await expect(userService.readUser(1)).rejects.toThrow('Error de base de datos');
        });
    });

    describe('createUser', () => {
        it('debería crear un nuevo usuario correctamente', async () => {
            const mockResult = { insertId: 1 };
            database.promise().query.mockResolvedValueOnce([mockResult]);

            const userData = {
                correo: 'test@example.com',
                contraseña: 'password123',
                nombre_completo: 'Test User',
                numero_identificacion: '123456789'
            };

            const result = await userService.createUser(
                userData.correo,
                userData.contraseña,
                userData.nombre_completo,
                userData.numero_identificacion
            );

            // Verificar el formato de la consulta
            expect(mysql2.format).toHaveBeenCalledWith(
                "INSERT INTO usuarios (correo, contraseña, nombre_completo, numero_identificacion) VALUES (?, ?, ?, ?);",
                [userData.correo, userData.contraseña, userData.nombre_completo, userData.numero_identificacion]
            );

            // Verificar que se ejecutó la consulta
            expect(database.promise().query).toHaveBeenCalled();

            // Verificar el resultado
            expect(result).toEqual([mockResult]);
        });
    });

    describe('updateUser', () => {
        it('debería actualizar un usuario existente correctamente', async () => {
            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValueOnce([mockResult]);

            const updateData = {
                id_usuario: 1,
                correo: 'nuevo@example.com',
                contraseña: 'nuevacontraseña',
                nombre_completo: 'Usuario Actualizado'
            };

            const result = await userService.updateUser(
                updateData.id_usuario,
                updateData.correo,
                updateData.contraseña,
                updateData.nombre_completo
            );

            // Verificar el formato de la consulta
            expect(mysql2.format).toHaveBeenCalledWith(
                "UPDATE usuarios SET correo=?, contraseña=?, nombre_completo=? WHERE id_usuario=?;",
                [updateData.correo, updateData.contraseña, updateData.nombre_completo, updateData.id_usuario]
            );

            // Verificar el resultado
            expect(result).toEqual([mockResult]);
        });
    });

    describe('deleteUser', () => {
        it('debería eliminar un usuario correctamente', async () => {
            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValueOnce([mockResult]);

            const result = await userService.deleteUser(1);

            // Verificar el formato de la consulta
            expect(mysql2.format).toHaveBeenCalledWith(
                "DELETE FROM usuarios WHERE id_usuario = ?;",
                [1]
            );

            // Verificar el resultado
            expect(result).toEqual([mockResult]);
        });
    });

    describe('findByEmail', () => {
        it('debería buscar un usuario por correo electrónico correctamente', async () => {
            const mockUser = { id_usuario: 1, correo: 'test@example.com' };
            database.promise().query.mockResolvedValueOnce([[mockUser]]);

            const result = await userService.findByEmail('test@example.com');

            // Verificar el formato de la consulta
            expect(mysql2.format).toHaveBeenCalledWith(
                'SELECT * FROM usuarios WHERE correo = ?;',
                ['test@example.com']
            );

            // Verificar el resultado
            expect(result).toEqual([[mockUser]]);
        });
    });

    describe('updatePassword', () => {
        it('debería actualizar solo la contraseña de un usuario', async () => {
            const mockResult = { affectedRows: 1 };
            database.promise().query.mockResolvedValueOnce([mockResult]);

            const result = await userService.updatePassword(1, 'nuevacontraseñahash');

            // Verificar el formato de la consulta
            expect(mysql2.format).toHaveBeenCalledWith(
                "UPDATE usuarios SET contraseña=? WHERE id_usuario=?;",
                ['nuevacontraseñahash', 1]
            );

            // Verificar el resultado
            expect(result).toEqual([mockResult]);
        });
    });
});