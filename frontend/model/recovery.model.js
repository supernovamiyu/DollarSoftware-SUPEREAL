// frontend/model/recovery.model.js

/**
 * Modelo para la recuperación de contraseña
 */
class RecoveryModel {
    constructor() {
        this.apiUrl = "/api" // Base URL para las llamadas a la API
    }

    /**
     * Verifica si existe un usuario con el correo proporcionado
     * @param {string} email - Correo electrónico a verificar
     * @returns {Promise<boolean>} - True si el usuario existe
     */
    async checkUserEmail(email) {
        try {
            const response = await fetch(`${this.apiUrl}/auth/check-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const data = await response.json()
            return data.exists
        } catch (error) {
            console.error("Error en checkUserEmail:", error)
            throw error
        }
    }

    /**
     * Solicita el envío de un código de verificación al correo del usuario
     * @param {string} email - Correo electrónico del usuario
     * @returns {Promise<boolean>} - True si el envío fue exitoso
     */
    async requestVerificationCode(email) {
        try {
            const response = await fetch(`${this.apiUrl}/auth/send-verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al enviar el código de verificación")
            }

            const data = await response.json()
            return data.success
        } catch (error) {
            console.error("Error en requestVerificationCode:", error)
            throw error
        }
    }

    /**
     * Verifica si el código es correcto
     * @param {string} email - Correo electrónico del usuario
     * @param {string} code - Código de verificación
     * @returns {Promise<boolean>} - True si el código es correcto
     */
    async verifyCode(email, code) {
        try {
            const response = await fetch(`${this.apiUrl}/auth/verify-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al verificar el código")
            }

            const data = await response.json()
            return data.success
        } catch (error) {
            console.error("Error en verifyCode:", error)
            throw error
        }
    }

    /**
     * Actualiza la contraseña del usuario
     * @param {string} email - Correo electrónico del usuario
     * @param {string} newPassword - Nueva contraseña
     * @param {string} code - Código de verificación
     * @returns {Promise<boolean>} - True si la actualización fue exitosa
     */
    async resetPassword(email, newPassword, code) {
        try {
            const response = await fetch(`${this.apiUrl}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword, code }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar la contraseña")
            }

            const data = await response.json()
            return data.success
        } catch (error) {
            console.error("Error en resetPassword:", error)
            throw error
        }
    }
}

export default RecoveryModel