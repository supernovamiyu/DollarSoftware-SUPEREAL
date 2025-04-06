    // HelpController.js - Controlador para la sección de ayuda

    class HelpController {
    constructor(helpView) {
        this.view = helpView;
    }

    // Mostrar la pantalla principal de ayuda
    showHelpScreen() {
        const result = this.view.showHelpScreen();

        if (result) {
        // Configurar eventos para los botones de ayuda
        this.setupHelpButtons();
        }
    }

    // Configurar los botones de ayuda
    setupHelpButtons() {
        const helpButtons = document.querySelectorAll("[data-help-type]");

        helpButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const helpType = button.getAttribute("data-help-type");
            this.showHelpDetails(helpType);
        });
        });
    }

    // Mostrar detalles de un aspecto específico de ayuda
    showHelpDetails(helpType) {
        this.view.showHelpDetails(helpType);
    }
    }

    export { HelpController };
