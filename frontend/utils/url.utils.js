    /**
     * Utilidades para manejar URLs
     */
    class URLUtils {
        /**
         * Actualiza la URL del navegador sin recargar la página
         * @param {string} url - Nueva URL
         */
        static updateURL(url) {
        window.history.pushState({}, "", url)
        }
    
        /**
         * Obtiene los parámetros de la URL actual
         * @returns {Object} - Objeto con los parámetros de la URL
         */
        static getURLParams() {
        const params = {}
        const queryString = window.location.search.substring(1)
    
        if (queryString) {
            const pairs = queryString.split("&")
            for (const pair of pairs) {
            const [key, value] = pair.split("=")
            params[decodeURIComponent(key)] = decodeURIComponent(value || "")
            }
        }
    
        return params
        }
    
        /**
         * Obtiene el segmento de ruta actual
         * @returns {string} - El segmento de ruta actual
         */
        static getCurrentPath() {
        return window.location.pathname
        }
    }
    
    export default URLUtils
    
