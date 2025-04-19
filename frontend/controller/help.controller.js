/**
 * Controlador para la sección de atención al cliente
 */
class CustomerSupportController {
    /**
     * @param {Object} view - Vista de atención al cliente
     */
    constructor(view) {
        this.view = view
        this.currentSection = null
    }

    /**
     * Muestra la página principal de atención al cliente
     */
    showCustomerSupportPage() {
        this.view.showCustomerSupportPage()
        this.setupHelpButtons()
    }

    /**
     * Muestra una sección específica de ayuda
     * @param {string} sectionType - Tipo de sección de ayuda
     */
    showHelpSection(sectionType) {
        // Primero mostrar la página principal de atención al cliente
        this.view.showCustomerSupportPage()

        // Luego mostrar la sección específica
        setTimeout(() => {
            this.view.showHelpContent(sectionType)
            this.currentSection = sectionType

            // Configurar los botones después de mostrar la sección
            this.setupHelpButtons()
        }, 100)
    }

    /**
     * Configura los botones de ayuda
     */
    setupHelpButtons() {
        const helpButtons = document.querySelectorAll(".boton-ayuda-individual")

        helpButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault()

                const helpType = button.getAttribute("data-ayuda")
                if (helpType) {
                    this.showHelpContent(helpType)

                    // Actualizar la URL para reflejar la sección actual
                    window.dispatchEvent(
                        new CustomEvent("navigateTo", {
                            detail: { path: `/atencion-cliente/${helpType}` },
                        }),
                    )
                }
            })
        })
    }

    /**
     * Muestra el contenido de ayuda específico
     * @param {string} helpType - Tipo de ayuda
     */
    showHelpContent(helpType) {
        this.view.showHelpContent(helpType)
        this.currentSection = helpType
    }
}

export default CustomerSupportController
