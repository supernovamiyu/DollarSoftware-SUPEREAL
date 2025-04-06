    // BaseView.js - Clase base para todas las vistas

    class BaseView {
    constructor() {
        this.templates = {};
    }

    // Método para mostrar una plantilla en un contenedor
    showTemplate(templateId, containerId) {
        console.log(
        `BaseView.showTemplate: Buscando plantilla ${templateId} para mostrar en ${containerId}`
        );

        const template = document.getElementById(templateId);
        const container = document.getElementById(containerId);

        if (!template) {
        console.error(`No se encontró la plantilla con ID: ${templateId}`);
        return false;
        }

        if (!container) {
        console.error(`No se encontró el contenedor con ID: ${containerId}`);
        return false;
        }

        console.log(`Plantilla y contenedor encontrados, clonando contenido...`);

        try {
        const clone = document.importNode(template.content, true);
        container.innerHTML = "";
        container.appendChild(clone);

        // Si la plantilla es la de inicio, inicializar el carrusel
        if (
            templateId === "plantilla-inicio" &&
            window.initCarouselAfterTemplateLoad
        ) {
            setTimeout(() => {
            window.initCarouselAfterTemplateLoad();
            }, 100);
        }

        console.log(`Plantilla ${templateId} mostrada correctamente`);
        return true;
        } catch (error) {
        console.error(`Error al mostrar la plantilla ${templateId}:`, error);
        return false;
        }
    }

    // Método para crear un elemento HTML a partir de una cadena HTML
    createElementFromHTML(htmlString) {
        const div = document.createElement("div");
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    // Método para mostrar un mensaje al usuario
    showMessage(message, type = "success") {
        console.log(`Mostrando mensaje: ${message}, tipo: ${type}`);

        // Eliminar cualquier notificación existente para evitar acumulación
        const existingNotifications = document.querySelectorAll(
        ".mensaje-notificacion"
        );
        existingNotifications.forEach((notif) => notif.remove());

        // Crear el elemento del mensaje
        const messageElement = document.createElement("div");
        messageElement.className = `mensaje-notificacion mensaje-${type}`;
        messageElement.textContent = message;

        // Asegurarse de que el mensaje sea visible con estilos inline
        messageElement.style.position = "fixed";
        messageElement.style.top = "20px";
        messageElement.style.left = "50%";
        messageElement.style.transform = "translateX(-50%)";
        messageElement.style.backgroundColor =
        type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#F44336"
            : type === "warning"
            ? "#FF9800"
            : "#2196F3";
        messageElement.style.color = "white";
        messageElement.style.padding = "10px 20px";
        messageElement.style.borderRadius = "4px";
        messageElement.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
        messageElement.style.zIndex = "9999";
        messageElement.style.opacity = "0";
        messageElement.style.transition = "opacity 0.3s, transform 0.3s";

        // Agregar el mensaje al body
        document.body.appendChild(messageElement);

        // Forzar un reflow para asegurar que las transiciones funcionen
        messageElement.offsetHeight;

        // Mostrar el mensaje con animación
        setTimeout(() => {
        messageElement.style.opacity = "1";
        }, 10);

        // Ocultar y eliminar el mensaje después de un tiempo
        setTimeout(() => {
        messageElement.style.opacity = "0";

        // Eliminar el elemento después de que termine la animación
        setTimeout(() => {
            messageElement.remove();
        }, 500);
        }, 3000);

        return messageElement;
    }

    // Método para actualizar la URL del navegador
    updateURL(url) {
        window.history.pushState({}, "", url);
    }
    }

    export { BaseView };
