// MessageUtils.js - Funciones de utilidad para mostrar mensajes
export function showMessage(message, type = "info") {
    // Crear elemento de mensaje
    const messageElement = document.createElement("div");
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;

    // Agregar al documento
    document.body.appendChild(messageElement);

    // Eliminar después de un tiempo
    setTimeout(() => {
        messageElement.classList.add("message-hide");
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 500);
    }, 3000);
}

// Hacer la función disponible globalmente
window.mostrarMensaje = showMessage;