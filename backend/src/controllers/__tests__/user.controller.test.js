const userController = require('../user.controller');
const userModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');

// Mockear los módulos necesarios
jest.mock('../../models/user.model');
jest.mock('jsonwebtoken');

// Función para crear un mock de request
const mockRequest = (params = {}, body = {}, headers = {}, user = {}) => ({
    params,
    body,
    headers,
    user
});

jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockReturnValue({
        connect: jest.fn(),
        end: jest.fn(),
        query: jest.fn((sql, params, callback) => callback(null, []))
    })
}));

// Función para crear un mock de response
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('User Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        // Configurar mocks para cada test
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
        process.env.JWT_SECRET = 'test-secret';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Middleware verifyToken', () => {
        it('retornar error 401 si el token falta', () => {
            req.headers = {};

            userController.verifyToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Token de autenticación requerido'
            });
        });

        it('retorna error 403 si el token es inválido', () => {
            req.headers = { authorization: 'Bearer invalid-token' };
            jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

            userController.verifyToken(req, res, next);

            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Token de autenticación inválido o expirado'
            });
        });

        it('llamar al siguiente método si el token es válido', () => {
            const mockUser = { id: 1 };
            req.headers = { authorization: 'Bearer valid-token' };
            jwt.verify.mockReturnValue(mockUser);

            userController.verifyToken(req, res, next);

            expect(req.user).toEqual(mockUser);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('readUser', () => {
        it('retorna error 404 si el ID del usuario falta', async () => {
            req.params = {};

            await userController.readUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'El ID del usuario es obligatorio' });
        });

        it('retornar el usuario si este se encuentra', async () => {
            const mockUser = { id: 1, nombre: 'Test User' };
            req.params = { id_usuario: '1' };
            userModel.readUser.mockResolvedValue([[mockUser]]);

            await userController.readUser(req, res);

            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('retornar un mensaje de no encontrado si el usuario no existe', async () => {
            req.params = { id_usuario: '999' };
            userModel.readUser.mockResolvedValue([[]]);

            await userController.readUser(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado :(' });
        });

        it('debe manejar los errores', async () => {
            req.params = { id_usuario: '1' };
            userModel.readUser.mockRejectedValue(new Error('DB Error'));

            await userController.readUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('createUser', () => {
        it('retornar error 404 si algún campo hace falta', async () => {
            req.body = { correo: 'test@test.com' }; // Faltan otros campos

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todos los campos son obligatorios' });
        });

        it('debe crear el usuario y retornar un mensaje de éxito', async () => {
            req.body = {
                correo: 'test@test.com',
                contraseña: 'password',
                nombre_completo: 'Test User',
                numero_identificacion: '123456'
            };
            userModel.createUser.mockResolvedValue([{ insertId: 1 }]);

            await userController.createUser(req, res);

            expect(res.json).toHaveBeenCalledWith({
                message: 'Usuario creado con éxito. El id del usuario es: 1'
            });
        });

        it('debe manejar errores', async () => {
            req.body = {
                correo: 'test@test.com',
                contraseña: 'password',
                nombre_completo: 'Test User',
                numero_identificacion: '123456'
            };
            userModel.createUser.mockRejectedValue(new Error('DB Error'));

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('updateUser', () => {
        it('actualizar el usuario con su contraseña', async () => {
            req.user = { id: 1 };
            req.params = { id_usuario: '1' };
            req.body = {
                correo: 'new@test.com',
                nombre_completo: 'Updated User',
                contraseña: 'newpassword'
            };
            
            userModel.updateUser.mockResolvedValue([{}]);
            userModel.readUser.mockResolvedValue([[{
                id: 1,
                correo: 'new@test.com',
                nombre_completo: 'Updated User'
            }]]);
            
            await userController.updateUser(req, res);
            
            expect(userModel.updateUser).toHaveBeenCalledWith(
                '1',
                'new@test.com',
                'newpassword',
                'Updated User'
            );
        });
    
    });

    describe('deleteUser', () => {
        it('retornar error 400 si falta el ID del usuario', async () => {
            req.params = {};

            await userController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'El ID del usuario es obligatorio' });
        });

        it('debe eliminar el usuario y mostrar un mensaje de éxito', async () => {
            req.params = { id_usuario: '1' };
            userModel.deleteUser.mockResolvedValue();

            await userController.deleteUser(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado con éxito' });
        });

        it('debe manejar errores', async () => {
            req.params = { id_usuario: '1' };
            userModel.deleteUser.mockRejectedValue(new Error('DB Error'));

            await userController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });

    describe('findByEmail', () => {
        it('retornar error 400 si el email no se provee', async () => {
            req.params = {};

            await userController.findByEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'El correo electrónico es obligatorio' });
        });

        it('debe retornar el usuario con su respectivo correo', async () => {
            const mockUser = { id: 1, correo: 'test@test.com' };
            req.params = { correo: 'test@test.com' };
            userModel.findByEmail.mockResolvedValue([[mockUser]]);

            await userController.findByEmail(req, res);

            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('debe retornar un mensaje de no encontrado en caso de no hallar el usuario con el correo', async () => {
            req.params = { correo: 'notfound@test.com' };
            userModel.findByEmail.mockResolvedValue([[]]);

            await userController.findByEmail(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado :(' });
        });

        it('manejar errores', async () => {
            req.params = { correo: 'test@test.com' };
            userModel.findByEmail.mockRejectedValue(new Error('DB Error'));

            await userController.findByEmail(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
        });
    });
});