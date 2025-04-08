    /**
     * Vista base que proporciona funcionalidad común para todas las vistas
     */
    class BaseView {
        /**
         * Muestra una plantilla en un contenedor
         * @param {string} templateId - ID de la plantilla
         * @param {string} containerId - ID del contenedor
         * @returns {boolean} - true si se mostró correctamente, false en caso contrario
         */
        showTemplate(templateId, containerId) {
        try {
            const template = document.getElementById(templateId)
            const container = document.getElementById(containerId)
    
            if (!template || !container) {
            console.error(`No se encontró la plantilla ${templateId} o el contenedor ${containerId}`)
            return false
            }
    
            const content = document.importNode(template.content, true)
            container.innerHTML = ""
            container.appendChild(content)
    
            return true
        } catch (error) {
            console.error("Error al mostrar la plantilla:", error)
            return false
        }
        }
    
        /**
         * Muestra un mensaje de notificación
         * @param {string} message - Mensaje a mostrar
         * @param {string} type - Tipo de mensaje (success, error, warning, info)
         * @returns {HTMLElement} - Elemento del mensaje
         */
        showMessage(message, type = "success") {
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
         * Muestra un error en un formulario
         * @param {string} elementId - ID del elemento donde mostrar el error
         * @param {string} message - Mensaje de error
         */
        showFormError(elementId, message) {
        const errorElement = document.getElementById(elementId)
        if (errorElement) {
            errorElement.textContent = message
            errorElement.style.display = "block"
        }
        }
    
        /**
         * Actualiza la URL del navegador sin recargar la página
         * @param {string} url - Nueva URL
         */
        updateURL(url, state = {}) {
            if (typeof url !== 'string') {
                console.error('La URL debe ser un string');
                return;
            }
        
            const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
            
            if (window.location.pathname !== normalizedUrl) {
                window.history.pushState(state, '', normalizedUrl);
                window.dispatchEvent(new CustomEvent('urlChanged', {
                    detail: { url: normalizedUrl, state }
                }));
            }
        }
    }
    
    export default BaseView
    
