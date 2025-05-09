    /**
     * Vista base que proporciona funcionalidad común para todas las vistas
     */
class BaseView {
    constructor() {
        // Initialize common properties or methods for all views
    }

    /**
     * Muestra una plantilla HTML en un contenedor específico.
     * @param {string} templateId - ID de la plantilla a mostrar.
     * @param {string} containerId - ID del contenedor donde se mostrará la plantilla.
     * @returns {boolean} - True si la plantilla se mostró correctamente, false en caso contrario.
     */
    showTemplate(templateId, containerId) {
        const template = document.getElementById(templateId)
        const container = document.getElementById(containerId)

        if (template && container) {
            container.innerHTML = template.innerHTML
            return true
        } else {
            console.error(`Template "${templateId}" or container "${containerId}" not found.`)
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
            try {
                if (typeof url !== 'string') {
                    console.log('Error no crítico al actualizar URL: URL inválida')
                    return;
                }
                
                const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
                
                // Solo actualizar si es diferente a la actual
                if (window.location.pathname !== normalizedUrl) {
                    window.history.pushState(state, '', normalizedUrl);
                    // Disparar evento sin propagación de errores
                    try {
                        window.dispatchEvent(new CustomEvent('urlChanged', {
                            detail: { url: normalizedUrl, state }
                        }));
                    } catch (e) {
                        console.log('Evento urlChanged no crítico:', e);
                    }
                }
            } catch (error) {
                console.log('Error no crítico al actualizar URL:', error);
            }
        }
    }
    
    export default BaseView
    
