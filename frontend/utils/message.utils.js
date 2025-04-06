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
    
        // Asegurarse de que el mensaje sea visible
        messageElement.style.opacity = "0"
        messageElement.style.transform = "translateY(-20px)"
        messageElement.style.zIndex = "9999"
    
        // Agregar el mensaje al body
        document.body.appendChild(messageElement)
    
        // Forzar un reflow para asegurar que las transiciones funcionen
        messageElement.offsetHeight
    
        // Mostrar el mensaje con animación
        setTimeout(() => {
            messageElement.style.opacity = "1"
            messageElement.style.transform = "translateY(0)"
        }, 10)
    
        // Ocultar y eliminar el mensaje después de un tiempo
        setTimeout(() => {
            messageElement.style.opacity = "0"
            messageElement.style.transform = "translateY(-20px)"
    
            // Eliminar el elemento después de que termine la animación
            setTimeout(() => {
            messageElement.remove()
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
    
    