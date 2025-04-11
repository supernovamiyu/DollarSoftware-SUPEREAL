    /**
     * Controlador para el perfil de usuario
     */
    class ProfileController {
        /**
         * @param {Object} model - Modelo de usuario
         * @param {Object} view - Vista de perfil
         */
        constructor(model, view) {
        this.model = model
        this.view = view
        }
    
        /**
         * Muestra la página de perfil del usuario
         */
        showProfilePage() {
        const user = this.model.getCurrentUser()
    
        if (!user) {
            // Si no hay usuario autenticado, redirigir a la página de autenticación
            window.dispatchEvent(new CustomEvent("showAuthOptions"))
            return
        }
    
        if (this.view.showProfilePage(user)) {
            console.log("Perfil mostrado correctamente, configurando eventos...")
            setTimeout(() => this.setupProfileEvents(), 200)
        } else {
            console.error("Error al mostrar el perfil de usuario")
        }
        }
    
        /**
         * Configura los eventos para la página de perfil
         */
        setupProfileEvents() {
        console.log("Configurando eventos del perfil")
    
        // Configurar botones del perfil
        this.view.setupProfileButtons((buttonId) => {
            console.log("Botón clickeado:", buttonId)
            this.handleProfileButtonClick(buttonId)
        })
    
        // Configurar botón de cerrar sesión
        const logoutButton = document.getElementById("logoutButton")
        if (logoutButton) {
            console.log("Configurando botón de logout")
            logoutButton.removeEventListener("click", () => window.dispatchEvent(new CustomEvent("logout")))
            logoutButton.addEventListener("click", () => {
            console.log("Cerrando sesión...")
            window.dispatchEvent(new CustomEvent("logout"))
            })
        } else {
            console.log("Botón de logout no encontrado, buscando alternativas...")
            // Buscar por texto
            document.querySelectorAll("button").forEach((button) => {
            if (button.textContent.trim() === "Cerrar Sesión") {
                console.log("Botón de logout encontrado por texto")
                button.id = "logoutButton"
                button.removeEventListener("click", () => window.dispatchEvent(new CustomEvent("logout")))
                button.addEventListener("click", () => {
                console.log("Cerrando sesión...")
                window.dispatchEvent(new CustomEvent("logout"))
                })
            }
            })
        }
        }
    
        /**
         * Maneja el clic en los botones del perfil
         * @param {string} buttonId - ID del botón
         */
        handleProfileButtonClick(buttonId) {
        console.log("Manejando clic en botón:", buttonId)
    
        // Obtener el ID de la sección correspondiente al botón
        const sectionId = this.getSectionIdFromButtonId(buttonId)
        console.log("Sección correspondiente:", sectionId)
    
        if (sectionId) {
            // Mostrar la sección
            this.view.showProfileSection(sectionId)
    
            // Si es la sección de modificar datos, configurar el formulario
            if (sectionId === "seccion-modificar-datos") {
            setTimeout(() => this.setupDataForm(), 100)
            }
        } else {
            console.error("No se pudo determinar la sección para el botón:", buttonId)
        }
        }
    
        /**
         * Obtiene el ID de la sección correspondiente a un botón
         * @param {string} buttonId - ID del botón
         * @returns {string} - ID de la sección
         */
        getSectionIdFromButtonId(buttonId) {
        switch (buttonId) {
            case "gestion-de-pedidos-boton-perfil":
            return "seccion-gestion-pedidos"
            case "historial-de-productos-boton-perfil":
            return "seccion-historial-productos"
            case "agregar-o-modificar-datos-boton-perfil":
            return "seccion-modificar-datos"
            default:
            return ""
        }
        }
    
        /**
         * Configura el formulario de modificación de datos
         */
        setupDataForm() {
        this.view.setupDataForm((formData) => this.handleDataFormSubmit(formData))
        }
    
        /**
         * Maneja el envío del formulario de modificación de datos
         * @param {Object} formData - Datos del formulario
         */
        async handleDataFormSubmit(formData) {
        try {
            const result = await this.model.updateUserData(formData)
    
            if (result.success) {
            this.view.showMessage("Datos guardados correctamente", "success")
            this.view.updateProfileInfo(result.user)
            } else {
            this.view.showMessage(result.error, "error")
            }
        } catch (error) {
            console.error("Error al guardar datos:", error)
            this.view.showMessage("Error al guardar los datos", "error")
        }
        }
    }
    
    export default ProfileController
    