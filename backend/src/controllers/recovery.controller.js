// Importar los módulos necesarios
const recoveryModel = require('../models/recovery.model');
const { sendVerificationCode } = require('../config/nodemailer.config');

class RecoveryController {
    /**
     * Verifica si existe un usuario con el correo proporcionado
     * @param {string} email - Correo electrónico a verificar
     * @returns {Promise<boolean>} - True si el usuario existe
     */
    async checkEmail(email) {
        try {
            return await recoveryModel.checkUserEmail(email);
        } catch (error) {
            console.error("Error en checkEmail:", error);
            throw error;
        }
    }

    /**
     * Genera y envía un código de verificación
     * @param {string} email - Correo electrónico
     * @returns {Promise<boolean>} - True si el envío fue exitoso
     */
    async sendVerification(email) {
        try {
            // Generar código de 6 dígitos
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            // Guardar el código
            await recoveryModel.saveVerificationCode(email, code);

            // Enviar el código por correo
            await sendVerificationCode(email, code);

            return true;
        } catch (error) {
            console.error("Error en sendVerification:", error);
            throw error;
        }
    }

    /**
     * Verifica si un código es válido
     * @param {string} email - Correo electrónico
     * @param {string} code - Código de verificación
     * @returns {Promise<boolean>} - True si el código es válido
     */
    async verifyCode(email, code) {
        try {
            return await recoveryModel.verifyCode(email, code);
        } catch (error) {
            console.error("Error en verifyCode:", error);
            throw error;
        }
    }

    /**
     * Restablece la contraseña de un usuario
     * @param {string} email - Correo electrónico
     * @param {string} newPassword - Nueva contraseña
     * @param {string} code - Código de verificación
     * @returns {Promise<boolean>} - True si el restablecimiento fue exitoso
     */
    async resetPassword(email, newPassword, code) {
        try {
            // Verificar el código primero
            const isCodeValid = await recoveryModel.verifyCode(email, code);

            if (!isCodeValid) {
                return false;
            }

            // Actualizar la contraseña
            return await recoveryModel.updatePassword(email, newPassword);
        } catch (error) {
            console.error("Error en resetPassword:", error);
            throw error;
        }
    }
}

module.exports = new RecoveryController();