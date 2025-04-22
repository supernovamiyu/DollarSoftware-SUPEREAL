const RecoveryModel = require('../../models/recovery.model');
const databaseConnection = require('../../config/database');
const bcrypt = require('bcrypt');

// Mockear las dependencias
jest.mock('../../config/database', () => ({
    query: jest.fn(),
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword')
}));

describe('RecoveryModel', () => {
    beforeEach(() => {
        // Limpiar todos los mocks y el Map de verificationCodes antes de cada prueba
        jest.clearAllMocks();
        RecoveryModel.verificationCodes.clear();
    });

    describe('checkUserEmail', () => {
        it('debe devolver true si el usuario existe', async () => {
            const mockResults = [{ id: 1, correo: 'test@example.com' }];
            databaseConnection.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const result = await RecoveryModel.checkUserEmail('test@example.com');
            expect(result).toBe(true);
        });

        it('debe devolver false si el usuario no existe', async () => {
            databaseConnection.query.mockImplementation((query, params, callback) => {
                callback(null, []);
            });

            const result = await RecoveryModel.checkUserEmail('nonexistent@example.com');
            expect(result).toBe(false);
        });

        it('debe rechazar con error si hay un problema en la base de datos', async () => {
            const mockError = new Error('Database error');
            databaseConnection.query.mockImplementation((query, params, callback) => {
                callback(mockError, null);
            });

            await expect(RecoveryModel.checkUserEmail('test@example.com')).rejects.toThrow(mockError);
        });
    });

    describe('saveVerificationCode', () => {
        it('debe guardar correctamente un código de verificación', async () => {
            const email = 'test@example.com';
            const code = '123456';

            const result = await RecoveryModel.saveVerificationCode(email, code);

            expect(result).toBe(true);
            expect(RecoveryModel.verificationCodes.has(email)).toBe(true);
            const storedData = RecoveryModel.verificationCodes.get(email);
            expect(storedData).toEqual({
                code,
                expiresAt: expect.any(Number)
            });
        });

        it('debe establecer el tiempo de expiración correctamente', async () => {
            const email = 'test@example.com';
            const code = '123456';
            const expirationMinutes = 5;
            const now = Date.now();

            jest.spyOn(Date, 'now').mockReturnValue(now);

            await RecoveryModel.saveVerificationCode(email, code, expirationMinutes);

            const storedData = RecoveryModel.verificationCodes.get(email);
            expect(storedData.expiresAt).toBe(now + expirationMinutes * 60 * 1000);
        });
    });

    describe('verifyCode', () => {
        it('debe devolver true para un código válido', async () => {
            const email = 'test@example.com';
            const code = '123456';
            await RecoveryModel.saveVerificationCode(email, code);

            const result = await RecoveryModel.verifyCode(email, code);
            expect(result).toBe(true);
        });

        it('debe devolver false para un código incorrecto', async () => {
            const email = 'test@example.com';
            const code = '123456';
            await RecoveryModel.saveVerificationCode(email, code);

            const result = await RecoveryModel.verifyCode(email, 'wrongcode');
            expect(result).toBe(false);
        });

        it('debe devolver false para un código expirado', async () => {
            const email = 'test@example.com';
            const code = '123456';
            const now = Date.now();

            // Guardar código con tiempo pasado de expiración
            RecoveryModel.verificationCodes.set(email, {
                code,
                expiresAt: now - 1000 // Expiró hace 1 segundo
            });

            jest.spyOn(Date, 'now').mockReturnValue(now);

            const result = await RecoveryModel.verifyCode(email, code);
            expect(result).toBe(false);
            expect(RecoveryModel.verificationCodes.has(email)).toBe(false); // Debe eliminarse
        });

        it('debe devolver false para un email no existente', async () => {
            const result = await RecoveryModel.verifyCode('nonexistent@example.com', '123456');
            expect(result).toBe(false);
        });
    });

    describe('updatePassword', () => {
        it('debe actualizar la contraseña correctamente', async () => {
            const email = 'test@example.com';
            const newPassword = 'newPassword123';
            const mockResults = { affectedRows: 1 };

            databaseConnection.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const result = await RecoveryModel.updatePassword(email, newPassword);

            expect(result).toBe(true);
            expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
            expect(databaseConnection.query).toHaveBeenCalledWith(
                "UPDATE usuarios SET contraseña = ? WHERE correo = ?",
                ['hashedPassword', email],
                expect.any(Function)
            );
            expect(RecoveryModel.verificationCodes.has(email)).toBe(false); // Debe eliminarse el código
        });

        it('debe devolver false si no se actualiza ninguna fila', async () => {
            const email = 'nonexistent@example.com';
            const newPassword = 'newPassword123';
            const mockResults = { affectedRows: 0 };

            databaseConnection.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const result = await RecoveryModel.updatePassword(email, newPassword);
            expect(result).toBe(false);
        });

        it('debe rechazar con error si hay un problema en la base de datos', async () => {
            const email = 'test@example.com';
            const newPassword = 'newPassword123';
            const mockError = new Error('Database error');

            databaseConnection.query.mockImplementation((query, params, callback) => {
                callback(mockError, null);
            });

            await expect(RecoveryModel.updatePassword(email, newPassword)).rejects.toThrow(mockError);
        });
    });

    describe('deleteVerificationCode', () => {
        it('debe eliminar correctamente un código de verificación', async () => {
            const email = 'test@example.com';
            const code = '123456';
            await RecoveryModel.saveVerificationCode(email, code);

            const result = await RecoveryModel.deleteVerificationCode(email);

            expect(result).toBe(true);
            expect(RecoveryModel.verificationCodes.has(email)).toBe(false);
        });

        it('debe devolver true incluso si el código no existe', async () => {
            const result = await RecoveryModel.deleteVerificationCode('nonexistent@example.com');
            expect(result).toBe(true);
        });
    });
});