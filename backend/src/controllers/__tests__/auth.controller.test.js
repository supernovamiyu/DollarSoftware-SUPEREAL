const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authController = require('../auth.controller');
const userModel = require('../../models/user.model');

// Mock de los módulos necesarios
jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../../models/user.model', () => ({
    findByEmail: jest.fn(),
    updatePassword: jest.fn(),
    createUser: jest.fn(),
    readUser: jest.fn()
}));

// Mock de process.env
process.env.JWT_SECRET = 'test_secret';
process.env.JWT_EXPIRES_IN = '1h';

describe('Auth Controller', () => {
    let mockRequest, mockResponse, nextFunction;

    beforeEach(() => {
        // Resetear todos los mocks antes de cada test
        jest.clearAllMocks();

        // Configurar objetos mock de request y response
        mockRequest = {
            body: {},
            headers: {},
            user: {}
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        nextFunction = jest.fn();
    });

    describe('login', () => {
        it('debería retornar error 400 si faltan credenciales', async () => {
            await authController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'El correo y la contraseña son obligatorios'
            });
        });

        it('debería retornar error 401 si el usuario no existe', async () => {
            mockRequest.body = { correo: 'noexiste@test.com', contraseña: '123' };
            userModel.findByEmail.mockResolvedValue([[]]);

            await authController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Credenciales incorrectas'
            });
        });

        it('debería retornar error 401 si la contraseña no coincide (texto plano)', async () => {
            mockRequest.body = { correo: 'test@test.com', contraseña: 'wrongpass' };
            userModel.findByEmail.mockResolvedValue([[{
                id_usuario: 1,
                correo: 'test@test.com',
                contraseña: 'correctpass', // contraseña en texto plano
                nombre_completo: 'Test User'
            }]]);

            await authController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Credenciales incorrectas'
            });
        });

        it('debería retornar error 401 si la contraseña no coincide (hash)', async () => {
            mockRequest.body = { correo: 'test@test.com', contraseña: 'wrongpass' };
            const hashedPass = await bcrypt.hash('correctpass', 10);
            userModel.findByEmail.mockResolvedValue([[{
                id_usuario: 1,
                correo: 'test@test.com',
                contraseña: hashedPass,
                nombre_completo: 'Test User'
            }]]);
            bcrypt.compare.mockResolvedValue(false);

            await authController.login(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Credenciales incorrectas'
            });
        });

        it('debería generar token y retornar usuario si las credenciales son correctas (texto plano)', async () => {
            mockRequest.body = { correo: 'test@test.com', contraseña: 'correctpass' };
            userModel.findByEmail.mockResolvedValue([[{
                id_usuario: 1,
                correo: 'test@test.com',
                contraseña: 'correctpass', // texto plano
                nombre_completo: 'Test User'
            }]]);

            // Mockear la actualización del hash
            userModel.updatePassword.mockResolvedValue();

            // Mockear la generación del token
            jwt.sign.mockReturnValue('mock-token');

            await authController.login(mockRequest, mockResponse);

            expect(userModel.updatePassword).toHaveBeenCalled();
            expect(jwt.sign).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Inicio de sesión exitoso',
                token: 'mock-token',
                usuario: {
                    id_usuario: 1,
                    nombre_completo: 'Test User',
                    correo: 'test@test.com'
                }
            });
        });

        it('debería generar token y retornar usuario si las credenciales son correctas (hash)', async () => {
            const hashedPass = '$2a$10$fakehashedpassword';
            mockRequest.body = { correo: 'test@test.com', contraseña: 'correctpass' };
            userModel.findByEmail.mockResolvedValue([[{
                id_usuario: 1,
                correo: 'test@test.com',
                contraseña: hashedPass,
                nombre_completo: 'Test User'
            }]]);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mock-token');

            await authController.login(mockRequest, mockResponse);

            expect(bcrypt.compare).toHaveBeenCalledWith('correctpass', hashedPass);
            expect(jwt.sign).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Inicio de sesión exitoso',
                token: 'mock-token',
                usuario: {
                    id_usuario: 1,
                    nombre_completo: 'Test User',
                    correo: 'test@test.com'
                }
            });
        });
    });

    describe('register', () => {
        it('debería retornar error 400 si faltan campos obligatorios', async () => {
            await authController.register(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Todos los campos son obligatorios'
            });
        });

        it('debería retornar error 400 si el correo ya existe', async () => {
            mockRequest.body = {
                correo: 'existente@test.com',
                contraseña: '123',
                nombre_completo: 'Test User',
                numero_identificacion: '123456'
            };

            userModel.findByEmail.mockResolvedValue([[{ id_usuario: 1 }]]);

            await authController.register(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'El correo electrónico ya está registrado'
            });
        });

        it('debería crear usuario y retornar token si los datos son válidos', async () => {
            mockRequest.body = {
                correo: 'nuevo@test.com',
                contraseña: '123',
                nombre_completo: 'Test User',
                numero_identificacion: '123456'
            };

            userModel.findByEmail.mockResolvedValue([[]]);
            userModel.createUser.mockResolvedValue([{ insertId: 1 }]);
            bcrypt.hash.mockResolvedValue('hashed-pass');
            jwt.sign.mockReturnValue('mock-token');

            await authController.register(mockRequest, mockResponse);

            expect(bcrypt.hash).toHaveBeenCalledWith('123', 10);
            expect(userModel.createUser).toHaveBeenCalledWith(
                'nuevo@test.com',
                'hashed-pass',
                'Test User',
                '123456'
            );
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Usuario registrado con éxito',
                token: 'mock-token',
                usuario: {
                    id_usuario: 1,
                    nombre_completo: 'Test User',
                    correo: 'nuevo@test.com'
                }
            });
        });
    });

    describe('getProfile', () => {
        it('debería retornar error 404 si el usuario no existe', async () => {
            mockRequest.user = { id: 1 };
            userModel.readUser.mockResolvedValue([[]]);

            await authController.getProfile(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'Usuario no encontrado'
            });
        });

        it('debería retornar los datos del usuario si existe', async () => {
            mockRequest.user = { id: 1 };
            userModel.readUser.mockResolvedValue([[{
                id_usuario: 1,
                correo: 'test@test.com',
                nombre_completo: 'Test User',
                numero_identificacion: '123456',
                contraseña: 'hashed-pass' // No debería aparecer en la respuesta
            }]]);

            await authController.getProfile(mockRequest, mockResponse);

            expect(mockResponse.json).toHaveBeenCalledWith({
                id_usuario: 1,
                nombre_completo: 'Test User',
                correo: 'test@test.com',
                numero_identificacion: '123456'
            });
        });
    });

    describe('verifyToken', () => {
        it('debería retornar error 401 si no hay token', () => {
            authController.verifyToken(mockRequest, mockResponse, nextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'No autorizado. Token no proporcionado'
            });
            expect(nextFunction).not.toHaveBeenCalled();
        });

        it('debería retornar error 401 si el token es inválido', () => {
            mockRequest.headers.authorization = 'Bearer invalid-token';
            jwt.verify.mockImplementation(() => {
                throw new Error('Token inválido');
            });

            authController.verifyToken(mockRequest, mockResponse, nextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({
                mensaje: 'No autorizado. Token inválido'
            });
            expect(nextFunction).not.toHaveBeenCalled();
        });

        it('debería llamar a next() si el token es válido', () => {
            mockRequest.headers.authorization = 'Bearer valid-token';
            jwt.verify.mockReturnValue({ id: 1, correo: 'test@test.com' });

            authController.verifyToken(mockRequest, mockResponse, nextFunction);

            expect(mockRequest.user).toEqual({ id: 1, correo: 'test@test.com' });
            expect(nextFunction).toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
        });
    });
});