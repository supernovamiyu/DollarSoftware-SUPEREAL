const RecoveryController = require('../recovery.controller');
const recoveryModel = require('../../models/recovery.model');
const { sendVerificationCode } = require('../../config/nodemailer.config');

// Mockear todas las dependencias
jest.mock('../../models/recovery.model');
jest.mock('../../config/nodemailer.config');
jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockReturnValue({
        connect: jest.fn(),
        end: jest.fn(),
        query: jest.fn((sql, params, callback) => callback(null, []))
    })
}));

describe('RecoveryController', () => {
    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        // Mockear console.error para no ver los logs en las pruebas
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        // Restaurar console.error
        console.error.mockRestore();
    });

    describe('checkEmail', () => {
        it('debe retornar true cuando el email existe', async () => {
            recoveryModel.checkUserEmail.mockResolvedValue(true);

            const result = await RecoveryController.checkEmail('test@example.com');
            expect(result).toBe(true);
            expect(recoveryModel.checkUserEmail).toHaveBeenCalledWith('test@example.com');
        });

        it('debe lanzar un error cuando el modelo falla', async () => {
            recoveryModel.checkUserEmail.mockRejectedValue(new Error('DB Error'));

            await expect(RecoveryController.checkEmail('test@example.com'))
                .rejects.toThrow('DB Error');
            expect(console.error).toHaveBeenCalledWith(
                "Error en checkEmail:",
                expect.any(Error)
            );
        });
    });

    describe('sendVerification', () => {
        it('debe generar un código, guardarlo y enviarlo por email', async () => {
            recoveryModel.saveVerificationCode.mockResolvedValue(true);
            sendVerificationCode.mockResolvedValue(true);

            const result = await RecoveryController.sendVerification('test@example.com');

            expect(result).toBe(true);
            expect(recoveryModel.saveVerificationCode).toHaveBeenCalled();
            expect(sendVerificationCode).toHaveBeenCalled();

            // Verificar que el código generado es de 6 dígitos
            const savedCode = recoveryModel.saveVerificationCode.mock.calls[0][1];
            expect(savedCode).toMatch(/^\d{6}$/);
        });

        it('debe lanzar un error si falla el guardado del código', async () => {
            recoveryModel.saveVerificationCode.mockRejectedValue(new Error('Save failed'));

            await expect(RecoveryController.sendVerification('test@example.com'))
                .rejects.toThrow('Save failed');
            expect(console.error).toHaveBeenCalledWith(
                "Error en sendVerification:",
                expect.any(Error)
            );
        });

        it('debe lanzar un error si falla el envío del email', async () => {
            recoveryModel.saveVerificationCode.mockResolvedValue(true);
            sendVerificationCode.mockRejectedValue(new Error('Email failed'));

            await expect(RecoveryController.sendVerification('test@example.com'))
                .rejects.toThrow('Email failed');
        });
    });

    describe('verifyCode', () => {
        it('debe retornar true cuando el código es válido', async () => {
            recoveryModel.verifyCode.mockResolvedValue(true);

            const result = await RecoveryController.verifyCode('test@example.com', '123456');
            expect(result).toBe(true);
            expect(recoveryModel.verifyCode).toHaveBeenCalledWith('test@example.com', '123456');
        });

        it('debe retornar false cuando el código es inválido', async () => {
            recoveryModel.verifyCode.mockResolvedValue(false);

            const result = await RecoveryController.verifyCode('test@example.com', 'wrongcode');
            expect(result).toBe(false);
        });

        it('debe lanzar un error cuando la verificación falla', async () => {
            recoveryModel.verifyCode.mockRejectedValue(new Error('Verification failed'));

            await expect(RecoveryController.verifyCode('test@example.com', '123456'))
                .rejects.toThrow('Verification failed');
            expect(console.error).toHaveBeenCalledWith(
                "Error en verifyCode:",
                expect.any(Error)
            );
        });
    });

    describe('resetPassword', () => {
        it('debe actualizar la contraseña cuando el código es válido', async () => {
            recoveryModel.verifyCode.mockResolvedValue(true);
            recoveryModel.updatePassword.mockResolvedValue(true);

            const result = await RecoveryController.resetPassword(
                'test@example.com',
                'newPassword123',
                '123456'
            );

            expect(result).toBe(true);
            expect(recoveryModel.verifyCode).toHaveBeenCalledWith('test@example.com', '123456');
            expect(recoveryModel.updatePassword).toHaveBeenCalledWith('test@example.com', 'newPassword123');
        });

        it('debe retornar false cuando el código es inválido', async () => {
            recoveryModel.verifyCode.mockResolvedValue(false);

            const result = await RecoveryController.resetPassword(
                'test@example.com',
                'newPassword123',
                'wrongcode'
            );

            expect(result).toBe(false);
            expect(recoveryModel.updatePassword).not.toHaveBeenCalled();
        });

        it('debe lanzar un error si falla la actualización de contraseña', async () => {
            recoveryModel.verifyCode.mockResolvedValue(true);
            recoveryModel.updatePassword.mockRejectedValue(new Error('Update failed'));

            await expect(RecoveryController.resetPassword(
                'test@example.com',
                'newPassword123',
                '123456'
            )).rejects.toThrow('Update failed');
            expect(console.error).toHaveBeenCalledWith(
                "Error en resetPassword:",
                expect.any(Error)
            );
        });
    });
});