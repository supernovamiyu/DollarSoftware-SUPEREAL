// Importar el modelo de la recuperación de usuarios
import RecoveryModel from '../recovery.model';

// Mock global de fetch
global.fetch = jest.fn();

describe('RecoveryModel', () => {
    let recoveryModel;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada test
        fetch.mockClear();
        recoveryModel = new RecoveryModel();
    });

    describe('checkUserEmail', () => {
        it('debe retornar true cuando el usuario existe', async () => {
            // Configurar el mock para simular una respuesta exitosa
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ exists: true }),
            });

            const result = await recoveryModel.checkUserEmail('test@example.com');
            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledWith('/api/auth/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'test@example.com' }),
            });
        });

        it('debe lanzar un error cuando la respuesta no es ok', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            await expect(recoveryModel.checkUserEmail('test@example.com')).rejects.toThrow(
                'Error HTTP: 404'
            );
        });

        it('debe lanzar un error cuando hay un problema de red', async () => {
            fetch.mockRejectedValueOnce(new Error('Network error'));

            await expect(recoveryModel.checkUserEmail('test@example.com')).rejects.toThrow(
                'Network error'
            );
        });
    });

    describe('requestVerificationCode', () => {
        it('debe retornar true cuando el envío es exitoso', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
            });

            const result = await recoveryModel.requestVerificationCode('test@example.com');
            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledWith('/api/auth/send-verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'test@example.com' }),
            });
        });

        it('debe lanzar un error con el mensaje del servidor cuando la respuesta no es ok', async () => {
            const errorMessage = 'El correo no está registrado';
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ message: errorMessage }),
            });

            await expect(
                recoveryModel.requestVerificationCode('test@example.com')
            ).rejects.toThrow(errorMessage);
        });

        it('debe lanzar un error genérico cuando no hay mensaje en la respuesta', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({}),
            });

            await expect(
                recoveryModel.requestVerificationCode('test@example.com')
            ).rejects.toThrow('Error al enviar el código de verificación');
        });
    });

    describe('verifyCode', () => {
        it('debe retornar true cuando el código es correcto', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
            });

            const result = await recoveryModel.verifyCode('test@example.com', '123456');
            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledWith('/api/auth/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'test@example.com', code: '123456' }),
            });
        });

        it('debe lanzar un error con el mensaje del servidor cuando el código es incorrecto', async () => {
            const errorMessage = 'Código inválido';
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ message: errorMessage }),
            });

            await expect(
                recoveryModel.verifyCode('test@example.com', 'wrongcode')
            ).rejects.toThrow(errorMessage);
        });

        it('debe lanzar un error genérico cuando no hay mensaje en la respuesta', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({}),
            });

            await expect(
                recoveryModel.verifyCode('test@example.com', '123456')
            ).rejects.toThrow('Error al verificar el código');
        });
    });

    describe('resetPassword', () => {
        it('debe retornar true cuando el restablecimiento es exitoso', async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true }),
            });

            const result = await recoveryModel.resetPassword(
                'test@example.com',
                'newPassword123',
                '123456'
            );
            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledWith('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'test@example.com',
                    newPassword: 'newPassword123',
                    code: '123456',
                }),
            });
        });

        it('debe lanzar un error con el mensaje del servidor cuando el restablecimiento falla', async () => {
            const errorMessage = 'El código ha expirado';
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({ message: errorMessage }),
            });

            await expect(
                recoveryModel.resetPassword('test@example.com', 'newPassword123', 'expiredcode')
            ).rejects.toThrow(errorMessage);
        });

        it('debe lanzar un error genérico cuando no hay mensaje en la respuesta', async () => {
            fetch.mockResolvedValueOnce({
                ok: false,
                json: async () => ({}),
            });

            await expect(
                recoveryModel.resetPassword('test@example.com', 'newPassword123', '123456')
            ).rejects.toThrow('Error al actualizar la contraseña');
        });
    });
});