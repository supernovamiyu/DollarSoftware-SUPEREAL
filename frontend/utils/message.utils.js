/**
 * Utilidades para mostrar notificaciones
 */
class NotificationUtils {
    /**
     * Muestra un mensaje de notificación
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de mensaje (success, error, warning, info)
     * @returns {HTMLElement} - Elemento del mensaje
     */
    static showMessage(message, type = "success") {
        console.log(`Mostrando mensaje: ${message}, tipo: ${type}`)

        // Eliminar cualquier notificación existente para evitar acumulación
        const existingNotifications = document.querySelectorAll(".mensaje-notificacion")
        existingNotifications.forEach((notif) => notif.remove())

        // Crear el elemento del mensaje
        const messageElement = document.createElement("div")
        messageElement.className = `mensaje-notificacion mensaje-${type}`
        messageElement.textContent = message

        // Aplicar estilos directamente para garantizar visibilidad
        messageElement.style.position = "fixed"
        messageElement.style.top = "20px"
        messageElement.style.right = "20px"
        messageElement.style.padding = "12px 20px"
        messageElement.style.borderRadius = "4px"
        messageElement.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)"
        messageElement.style.opacity = "0"
        messageElement.style.transform = "translateY(-20px)"
        messageElement.style.transition = "opacity 0.3s ease, transform 0.3s ease"
        messageElement.style.zIndex = "9999"
        messageElement.style.minWidth = "250px"
        messageElement.style.textAlign = "center"

        // Aplicar colores según el tipo
        switch (type) {
            case "success":
                messageElement.style.backgroundColor = "#4CAF50"
                messageElement.style.color = "#fff"
                break
            case "error":
                messageElement.style.backgroundColor = "#F44336"
                messageElement.style.color = "#fff"
                break
            case "warning":
                messageElement.style.backgroundColor = "#FF9800"
                messageElement.style.color = "#fff"
                break
            case "info":
                messageElement.style.backgroundColor = "#2196F3"
                messageElement.style.color = "#fff"
                break
            default:
                messageElement.style.backgroundColor = "#333"
                messageElement.style.color = "#fff"
        }

        // Agregar el mensaje al body
        document.body.appendChild(messageElement)

        // Forzar un reflow para asegurar que las transiciones funcionen
        messageElement.offsetHeight

        // Mostrar el mensaje con animación (sin setTimeout para mayor fiabilidad)
        requestAnimationFrame(() => {
            messageElement.style.opacity = "1"
            messageElement.style.transform = "translateY(0)"
        })

        // Ocultar y eliminar el mensaje después de un tiempo
        setTimeout(() => {
            messageElement.style.opacity = "0"
            messageElement.style.transform = "translateY(-20px)"

            // Eliminar el elemento después de que termine la animación
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement)
                }
            }, 500)
        }, 3000)

        return messageElement
    }

    /**
     * Muestra un mensaje de éxito
     * @param {string} message - Mensaje a mostrar
     * @returns {HTMLElement} - Elemento del mensaje
     */
    static showSuccess(message) {
        return this.showMessage(message, "success")
    }

    /**
     * Muestra un mensaje de error
     * @param {string} message - Mensaje a mostrar
     * @returns {HTMLElement} - Elemento del mensaje
     */
    static showError(message) {
        return this.showMessage(message, "error")
    }

    /**
     * Muestra un mensaje de advertencia
     * @param {string} message - Mensaje a mostrar
     * @returns {HTMLElement} - Elemento del mensaje
     */
    static showWarning(message) {
        return this.showMessage(message, "warning")
    }

    /**
     * Muestra un mensaje de información
     * @param {string} message - Mensaje a mostrar
     * @returns {HTMLElement} - Elemento del mensaje
     */
    static showInfo(message) {
        return this.showMessage(message, "info")
    }
}

export default NotificationUtils

