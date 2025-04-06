    // BaseView.js - Clase base para todas las vistas

    class BaseView {
        constructor() {
        this.templates = {}
        }
    
        // Método para mostrar una plantilla en un contenedor
        showTemplate(templateId, containerId) {
        const template = document.getElementById(templateId)
        const container = document.getElementById(containerId)
    
        if (!template || !container) {
            console.error(`No se encontró la plantilla ${templateId} o el contenedor ${containerId}`)
            return false
        }
    
        const clone = document.importNode(template.content, true)
        container.innerHTML = ""
        container.appendChild(clone)
    
        return true
        }
    
        // Método para crear un elemento HTML a partir de una cadena HTML
        createElementFromHTML(htmlString) {
        const div = document.createElement("div")
        div.innerHTML = htmlString.trim()
        return div.firstChild
        }
    
        // Método para mostrar un mensaje al usuario
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
    
        // Método para actualizar la URL del navegador
        updateURL(url) {
        window.history.pushState({}, "", url)
        }
    }
    
    export { BaseView }
