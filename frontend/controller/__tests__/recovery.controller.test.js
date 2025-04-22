// recoveryController.test.js
import RecoveryController from '../recovery.controller';

// Mock para el modelo y la vista
const mockModel = {
    checkUserEmail: jest.fn(),
    requestVerificationCode: jest.fn(),
    verifyCode: jest.fn(),
    resetPassword: jest.fn()
};

const mockView = {
    showRecoveryPage: jest.fn(),
    setupEventListeners: jest.fn(),
    showError: jest.fn(),
    clearMessage: jest.fn(),
    updateButtonState: jest.fn(),
    showRecoveryStep: jest.fn(),
    displayEmail: jest.fn(),
    startResendCountdown: jest.fn(),
    shakeVerificationInputs: jest.fn(),
    clearCountdownInterval: jest.fn(),
    showNotification: jest.fn(),
    showSuccess: jest.fn(),
    updatePasswordRequirements: jest.fn(),
    setupVerificationInputs: jest.fn()
};

describe('RecoveryController', () => {
    let controller;

    beforeEach(() => {
        // Limpiar todos los mocks antes de cada prueba
        jest.clearAllMocks();
        controller = new RecoveryController(mockModel, mockView);
    });

    describe('Constructor', () => {
        it('debería inicializar correctamente con los valores por defecto', () => {
            expect(controller.model).toBe(mockModel);
            expect(controller.view).toBe(mockView);
            expect(controller.currentStep).toBe(1);
            expect(controller.recoveryEmail).toBe("");
            expect(controller.newPassword).toBe("");
            expect(controller.verificationCode).toBe("");
            expect(controller.maxAttempts).toBe(3);
            expect(controller.currentAttempts).toBe(0);
        });
    });

    describe('showRecoveryPage', () => {
        it('debería llamar a showRecoveryPage de la vista y configurar los listeners', () => {
            const spySetupListeners = jest.spyOn(controller, 'setupEventListeners');
            controller.showRecoveryPage();
            expect(mockView.showRecoveryPage).toHaveBeenCalled();
            expect(spySetupListeners).toHaveBeenCalled();
            spySetupListeners.mockRestore();
        });
    });

    describe('handleEmailSubmit', () => {
        it('debería mostrar error si el correo está vacío', async () => {
            document.body.innerHTML = `
        <form id="form-solicitar-codigo">
            <input id="correo-recuperacion" value="">
            <button id="form-solicitar-codigo-btn"></button>
        </form>
        <div id="email-error"></div>
        `;

            await controller.handleEmailSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "email-error",
                "Por favor, ingresa tu correo electrónico."
            );
        });

        it('debería mostrar error si el correo no es válido', async () => {
            document.body.innerHTML = `
        <form id="form-solicitar-codigo">
            <input id="correo-recuperacion" value="correo-invalido">
            <button id="form-solicitar-codigo-btn"></button>
        </form>
        <div id="email-error"></div>
        `;

            await controller.handleEmailSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "email-error",
                "Por favor, ingresa un correo electrónico válido."
            );
        });

        it('debería verificar el correo con el modelo si es válido', async () => {
            const email = "test@example.com";
            document.body.innerHTML = `
        <form id="form-solicitar-codigo">
            <input id="correo-recuperacion" value="${email}">
            <button id="form-solicitar-codigo-btn"></button>
        </form>
        <div id="email-error"></div>
        `;

            mockModel.checkUserEmail.mockResolvedValue(true);

            await controller.handleEmailSubmit();

            expect(mockView.updateButtonState).toHaveBeenCalledWith(
                "form-solicitar-codigo-btn",
                true,
                "Verificando..."
            );
            expect(mockModel.checkUserEmail).toHaveBeenCalledWith(email);
            expect(controller.recoveryEmail).toBe(email);
            expect(mockView.showRecoveryStep).toHaveBeenCalledWith(2);
            expect(mockView.updateButtonState).toHaveBeenCalledWith(
                "form-solicitar-codigo-btn",
                false,
                "Continuar"
            );
        });

        it('debería mostrar error si el correo no existe', async () => {
            const email = "test@example.com";
            document.body.innerHTML = `
        <form id="form-solicitar-codigo">
            <input id="correo-recuperacion" value="${email}">
            <button id="form-solicitar-codigo-btn"></button>
        </form>
        <div id="email-error"></div>
        `;

            mockModel.checkUserEmail.mockResolvedValue(false);

            await controller.handleEmailSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "email-error",
                "No existe una cuenta con este correo electrónico."
            );
        });

        it('debería manejar errores al verificar el correo', async () => {
            const email = "test@example.com";
            document.body.innerHTML = `
        <form id="form-solicitar-codigo">
            <input id="correo-recuperacion" value="${email}">
            <button id="form-solicitar-codigo-btn"></button>
        </form>
        <div id="email-error"></div>
        `;

            mockModel.checkUserEmail.mockRejectedValue(new Error("Error de red"));

            await controller.handleEmailSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "email-error",
                "Error al verificar el correo. Inténtalo de nuevo."
            );
        });
    });

    describe('handlePasswordSubmit', () => {
        beforeEach(() => {
            controller.recoveryEmail = "test@example.com";
            document.body.innerHTML = `
        <form id="form-nueva-password">
            <input id="nueva-password" value="Password1">
            <input id="confirmar-password" value="Password1">
            <button id="form-nueva-password-btn"></button>
        </form>
        <div id="password-error"></div>
        `;
        });

        it('debería mostrar error si la contraseña no cumple los requisitos', async () => {
            document.getElementById("nueva-password").value = "weak";
            document.getElementById("confirmar-password").value = "weak";

            await controller.handlePasswordSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "password-error",
                "La contraseña no cumple con todos los requisitos."
            );
        });

        it('debería mostrar error si las contraseñas no coinciden', async () => {
            document.getElementById("nueva-password").value = "Password1";
            document.getElementById("confirmar-password").value = "Password2";

            await controller.handlePasswordSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "password-error",
                "Las contraseñas no coinciden."
            );
        });

        it('debería solicitar código de verificación si todo es válido', async () => {
            mockModel.requestVerificationCode.mockResolvedValue(true);

            await controller.handlePasswordSubmit();

            expect(mockView.updateButtonState).toHaveBeenCalledWith(
                "form-nueva-password-btn",
                true,
                "Procesando..."
            );
            expect(mockModel.requestVerificationCode).toHaveBeenCalledWith("test@example.com");
            expect(controller.newPassword).toBe("Password1");
            expect(mockView.displayEmail).toHaveBeenCalledWith("test@example.com");
            expect(mockView.startResendCountdown).toHaveBeenCalled();
            expect(mockView.showRecoveryStep).toHaveBeenCalledWith(3);
            expect(mockView.updateButtonState).toHaveBeenCalledWith(
                "form-nueva-password-btn",
                false,
                "Continuar"
            );
        });

        it('debería manejar errores al solicitar el código', async () => {
            mockModel.requestVerificationCode.mockRejectedValue(new Error("Error de red"));

            await controller.handlePasswordSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "password-error",
                "Error al enviar el código de verificación. Inténtalo de nuevo."
            );
        });
    });

    describe('handleCodeSubmit', () => {
        beforeEach(() => {
            controller.recoveryEmail = "test@example.com";
            controller.newPassword = "Password1";
            document.body.innerHTML = `
        <form id="form-verificar-codigo">
            <input class="verification-input" value="1">
            <input class="verification-input" value="2">
            <input class="verification-input" value="3">
            <input class="verification-input" value="4">
            <input class="verification-input" value="5">
            <input class="verification-input" value="6">
            <button id="form-verificar-codigo-btn"></button>
        </form>
        <div id="codigo-error"></div>
        `;
        });

        it('debería mostrar error si el código no está completo', async () => {
            document.querySelectorAll(".verification-input").forEach(input => {
                input.value = "";
            });

            await controller.handleCodeSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "codigo-error",
                "Por favor, ingresa el código completo."
            );
        });

        it('debería mostrar error si el código es incorrecto', async () => {
            mockModel.verifyCode.mockResolvedValue(false);

            await controller.handleCodeSubmit();

            expect(mockView.updateButtonState).toHaveBeenCalledWith(
                "form-verificar-codigo-btn",
                true,
                "Verificando..."
            );
            expect(mockModel.verifyCode).toHaveBeenCalledWith("test@example.com", "123456");
            expect(controller.currentAttempts).toBe(1);
            expect(mockView.showError).toHaveBeenCalledWith(
                "codigo-error",
                "Código incorrecto. Te quedan 2 intentos."
            );
            expect(mockView.shakeVerificationInputs).toHaveBeenCalled();
            expect(mockView.updateButtonState).toHaveBeenCalledWith(
                "form-verificar-codigo-btn",
                false,
                "Verificar código"
            );
        });

        it('debería bloquear después de máximo de intentos', async () => {
            controller.currentAttempts = 2; // 3er intento
            mockModel.verifyCode.mockResolvedValue(false);

            await controller.handleCodeSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "codigo-error",
                "Demasiados intentos fallidos. Solicita un nuevo código."
            );
            expect(mockView.updateButtonState).toHaveBeenCalledWith(
                "form-verificar-codigo-btn",
                true,
                "Verificar código"
            );
        });

        it('debería resetear la contraseña si el código es válido', async () => {
            mockModel.verifyCode.mockResolvedValue(true);
            mockModel.resetPassword.mockResolvedValue(true);

            await controller.handleCodeSubmit();

            expect(mockModel.resetPassword).toHaveBeenCalledWith(
                "test@example.com",
                "Password1",
                "123456"
            );
            expect(mockView.clearCountdownInterval).toHaveBeenCalled();
            expect(mockView.showRecoveryStep).toHaveBeenCalledWith(4);
            expect(mockView.showNotification).toHaveBeenCalledWith(
                "¡Contraseña actualizada correctamente!",
                "success"
            );
        });

        it('debería manejar errores al resetear la contraseña', async () => {
            mockModel.verifyCode.mockResolvedValue(true);
            mockModel.resetPassword.mockRejectedValue(new Error("Error de red"));

            await controller.handleCodeSubmit();

            expect(mockView.showError).toHaveBeenCalledWith(
                "codigo-error",
                "Error al actualizar la contraseña. Inténtalo de nuevo."
            );
        });
    });

    describe('resendVerificationCode', () => {
        beforeEach(() => {
            controller.recoveryEmail = "test@example.com";
            document.body.innerHTML = `
        <button id="resend-code">Reenviar código</button>
        <div id="codigo-error"></div>
        `;
        });

        it('debería reenviar el código correctamente', async () => {
            mockModel.requestVerificationCode.mockResolvedValue(true);

            await controller.resendVerificationCode();

            expect(document.getElementById("resend-code").disabled).toBe(true);
            expect(controller.currentAttempts).toBe(0);
            expect(mockModel.requestVerificationCode).toHaveBeenCalledWith("test@example.com");
            expect(mockView.startResendCountdown).toHaveBeenCalled();
            expect(mockView.showSuccess).toHaveBeenCalledWith(
                "codigo-error",
                "Código reenviado correctamente."
            );
        });

        it('debería manejar errores al reenviar el código', async () => {
            mockModel.requestVerificationCode.mockRejectedValue(new Error("Error de red"));

            await controller.resendVerificationCode();

            expect(mockView.showError).toHaveBeenCalledWith(
                "codigo-error",
                "Error al reenviar el código. Inténtalo de nuevo."
            );
            expect(document.getElementById("resend-code").disabled).toBe(false);
        });
    });

    describe('togglePasswordVisibility', () => {
        it('debería cambiar la visibilidad de la contraseña', () => {
            document.body.innerHTML = `
        <input id="nueva-password" type="password">
        <input id="confirmar-password" type="password">
        <button id="toggle-password"><i class="fa-solid fa-eye"></i></button>
        `;

            controller.togglePasswordVisibility();
            expect(document.getElementById("nueva-password").type).toBe("text");
            expect(document.getElementById("confirmar-password").type).toBe("text");

            controller.togglePasswordVisibility();
            expect(document.getElementById("nueva-password").type).toBe("password");
            expect(document.getElementById("confirmar-password").type).toBe("password");
        });
    });

    describe('validatePasswordRequirements', () => {
        it('debería validar correctamente los requisitos de la contraseña', () => {
            const requirements = {
                length: true,
                uppercase: true,
                lowercase: true,
                number: true
            };

            controller.validatePasswordRequirements("Valid1Password");

            expect(mockView.updatePasswordRequirements).toHaveBeenCalledWith(requirements);
        });
    });

    describe('goToStep', () => {
        it('debería actualizar el paso actual y mostrarlo en la vista', () => {
            controller.goToStep(2);
            expect(controller.currentStep).toBe(2);
            expect(mockView.showRecoveryStep).toHaveBeenCalledWith(2);
        });
    });

    describe('isValidEmail', () => {
        it('debería validar correctamente los correos electrónicos', () => {
            expect(controller.isValidEmail("test@example.com")).toBe(true);
            expect(controller.isValidEmail("correo-invalido")).toBe(false);
            expect(controller.isValidEmail("test@")).toBe(false);
            expect(controller.isValidEmail("@example.com")).toBe(false);
        });
    });

    describe('isValidPassword', () => {
        it('debería validar correctamente las contraseñas', () => {
            expect(controller.isValidPassword("Valid1Password")).toBe(true);
            expect(controller.isValidPassword("short")).toBe(false); // Muy corta
            expect(controller.isValidPassword("alllowercase1")).toBe(false); // Falta mayúscula
            expect(controller.isValidPassword("ALLUPPERCASE1")).toBe(false); // Falta minúscula
            expect(controller.isValidPassword("NoNumbers")).toBe(false); // Falta número
        });
    });
});