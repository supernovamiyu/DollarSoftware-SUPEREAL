// Importar la conexión a la base de datos
const databaseConnection = require('../config/database');
const bcrypt = require('bcrypt');

// Almacenamiento temporal de códigos (en producción, usar la base de datos)
const verificationCodes = new Map();

class RecoveryModel {
    /**
     * Verifica si existe un usuario con el correo proporcionado
     * @param {string} email - Correo electrónico a verificar
     * @returns {Promise<boolean>} - True si el usuario existe
     */
    async checkUserEmail(email) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM usuarios WHERE correo = ?";

            databaseConnection.query(query, [email], (err, results) => {
                if (err) {
                    console.error("Error al verificar el correo:", err);
                    reject(err);
                } else {
                    resolve(results.length > 0);
                }
            });
        });
    }

    /**
     * Guarda un código de verificación para un correo electrónico
     * @param {string} email - Correo electrónico
     * @param {string} code - Código de verificación
     * @param {number} expirationMinutes - Minutos hasta la expiración
     * @returns {Promise<boolean>} - True si se guardó correctamente
     */
    async saveVerificationCode(email, code, expirationMinutes = 10) {
        try {
            // Guardar el código con tiempo de expiración
            verificationCodes.set(email, {
                code,
                expiresAt: Date.now() + expirationMinutes * 60 * 1000
            });
            return true;
        } catch (error) {
            console.error("Error al guardar el código:", error);
            throw error;
        }
    }

    /**
     * Verifica si un código es válido para un correo electrónico
     * @param {string} email - Correo electrónico
     * @param {string} code - Código de verificación
     * @returns {Promise<boolean>} - True si el código es válido
     */
    async verifyCode(email, code) {
        try {
            const storedData = verificationCodes.get(email);

            if (!storedData) {
                return false;
            }

            if (Date.now() > storedData.expiresAt) {
                verificationCodes.delete(email);
                return false;
            }

            return storedData.code === code;
        } catch (error) {
            console.error("Error al verificar el código:", error);
            throw error;
        }
    }

    /**
     * Actualiza la contraseña de un usuario
     * @param {string} email - Correo electrónico
     * @param {string} newPassword - Nueva contraseña
     * @returns {Promise<boolean>} - True si la actualización fue exitosa
     */
    async updatePassword(email, newPassword) {
        return new Promise(async (resolve, reject) => {
            try {
                // Hashear la contraseña
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

                // Actualizar la contraseña en la base de datos
                const query = "UPDATE usuarios SET contraseña = ? WHERE correo = ?";

                databaseConnection.query(query, [hashedPassword, email], (err, results) => {
                    if (err) {
                        console.error("Error al actualizar la contraseña:", err);
                        reject(err);
                    } else if (results.affectedRows === 0) {
                        resolve(false);
                    } else {
                        // Eliminar el código de verificación
                        verificationCodes.delete(email);
                        resolve(true);
                    }
                });
            } catch (error) {
                console.error("Error en updatePassword:", error);
                reject(error);
            }
        });
    }

    /**
     * Elimina un código de verificación
     * @param {string} email - Correo electrónico
     * @returns {Promise<boolean>} - True si se eliminó correctamente
     */
    async deleteVerificationCode(email) {
        try {
            verificationCodes.delete(email);
            return true;
        } catch (error) {
            console.error("Error al eliminar el código:", error);
            throw error;
        }
    }
}

module.exports = new RecoveryModel();