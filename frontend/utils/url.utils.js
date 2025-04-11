class URLUtils {
    /**
     * Actualiza la URL del navegador sin recargar la página
     * @param {string} url - Nueva URL
     * @param {Object} [state={}] - Estado para asociar a la nueva entrada del historial
     */
    static updateURL(url, state = {}) {
        window.history.pushState(state, "", url);
        // Dispara un evento personalizado para notificar el cambio
        window.dispatchEvent(new CustomEvent('urlChanged', { detail: { url, state } }));
    }

    /**
     * Obtiene los parámetros de la URL actual
     * @returns {Object} - Objeto con los parámetros de la URL
     */
    static getURLParams() {
        const params = {};
        const queryString = window.location.search.substring(1);

        if (queryString) {
            const pairs = queryString.split("&");
            for (const pair of pairs) {
                const [key, value] = pair.split("=");
                params[decodeURIComponent(key)] = decodeURIComponent(value || "");
            }
        }

        return params;
    }

    /**
     * Obtiene el segmento de ruta actual
     * @returns {string} - El segmento de ruta actual
     */
    static getCurrentPath() {
        return window.location.pathname;
    }

    /**
     * Configura el manejador de eventos para cambios de URL (atrás/adelante)
     * @param {Function} handler - Función que manejará los cambios
     */
    static setupPopStateHandler(handler) {
        window.addEventListener('popstate', (event) => {
            handler(event.state);
        });
    }
}

export default URLUtils;