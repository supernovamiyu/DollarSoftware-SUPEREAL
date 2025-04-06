    // MessageUtils.js - Funciones de utilidad para mostrar mensajes
    export function showMessage(message, type = "info") {
    // Crear elemento de mensaje
    const messageElement = document.createElement("div")
    messageElement.className = `message message-${type}`
    messageElement.textContent = message

    // Estilos inline para asegurar que se vea correctamente
    messageElement.style.position = "fixed"
    messageElement.style.top = "20px"
    messageElement.style.left = "50%"
    messageElement.style.transform = "translateX(-50%)"
    messageElement.style.backgroundColor =
        type === "success" ? "#4CAF50" : type === "error" ? "#F44336" : type === "warning" ? "#FF9800" : "#2196F3"
    messageElement.style.color = "white"
    messageElement.style.padding = "10px 20px"
    messageElement.style.borderRadius = "4px"
    messageElement.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)"
    messageElement.style.zIndex = "9999"
    messageElement.style.opacity = "0"
    messageElement.style.transition = "opacity 0.3s, transform 0.3s"

    // Agregar al documento
    document.body.appendChild(messageElement)

    // Mostrar con animación
    setTimeout(() => {
        messageElement.style.opacity = "1"
    }, 10)

    // Eliminar después de un tiempo
    setTimeout(() => {
        messageElement.style.opacity = "0"
        setTimeout(() => {
        document.body.removeChild(messageElement)
        }, 500)
    }, 3000)
    }

    // Hacer la función disponible globalmente
    window.mostrarMensaje = showMessage

