    /**
     * Controlador para la atención al cliente
     */
    class CustomerSupportController {
        /**
         * @param {Object} view - Vista de atención al cliente
         */
        constructor(view) {
        this.view = view
        }
    
        /**
         * Muestra la página de atención al cliente
         */
        showCustomerSupportPage() {
        this.view.showCustomerSupportPage()
        this.setupHelpButtons()
        }
    
        /**
         * Configura los botones de ayuda
         */
        setupHelpButtons() {
        this.view.setupHelpButtons((helpType) => this.showHelpDetails(helpType))
        }
    
        /**
         * Muestra los detalles de un aspecto de ayuda
         * @param {string} helpType - Tipo de ayuda
         */
        showHelpDetails(helpType) {
        this.view.showHelpDetails(helpType)
        }
    }
    
    export default CustomerSupportController
    
    