    /**
     * Controlador para la autenticación
     */
    class AuthController {
        /**
         * @param {Object} model - Modelo de usuario
         * @param {Object} view - Vista de autenticación
         */
        constructor(model, view) {
        this.model = model
        this.view = view
        }
    
        /**
         * Muestra las opciones de autenticación
         */
        showAuthOptions() {
        if (this.model.isAuthenticated()) {
            this.showProfilePage()
        } else {
            this.view.showAuthOptions()
        }
        }
    
        /**
         * Muestra la página de inicio de sesión
         */
        showLoginPage() {
        this.view.showLoginPage()
        this.setupAuthForms()
        }
    
        /**
         * Muestra la página de registro
         */
        showRegisterPage() {
        this.view.showRegisterPage()
        this.setupAuthForms()
        }
    
        /**
         * Muestra la página de perfil del usuario
         */
        showProfilePage() {
        const user = this.model.getCurrentUser()
        this.view.showProfilePage(user)
        this.setupLogoutButton()
        }
    
        /**
         * Configura los formularios de autenticación
         */
        setupAuthForms() {
        this.view.setupAuthForms(
            (event) => this.handleLogin(event),
            (event) => this.handleRegister(event),
        )
        }
    
        /**
         * Configura el botón de cerrar sesión
         */
        setupLogoutButton() {
        this.view.setupLogoutButton(() => this.handleLogout())
        }
    
        /**
         * Maneja el inicio de sesión
         * @param {Event} event - Evento del formulario
         */
        async handleLogin(event) {
        event.preventDefault()
        const form = event.target
    
        // Obtener los datos del formulario
        const email = form.correo.value
        const password = form.contraseña.value
    
        // Validar los datos
        if (!email || !password) {
            this.view.showFormError("login-error", "Por favor, completa todos los campos")
            return
        }
    
        // Mostrar indicador de carga
        this.view.showMessage("Iniciando sesión...", "warning")
    
        // Llamar al modelo para iniciar sesión
        const result = await this.model.login(email, password)
    
        if (result.success) {
            // Actualizar la interfaz
            this.view.updateUserInterface(result.user)
    
            // Mostrar mensaje de éxito
            this.view.showMessage("¡Inicio de sesión exitoso!", "success")
    
            // Redirigir al perfil
            setTimeout(() => {
            this.showProfilePage()
            }, 1000)
        } else {
            this.view.showFormError("login-error", result.error)
        }
        }
    
        /**
         * Maneja el registro de usuario
         * @param {Event} event - Evento del formulario
         */
        async handleRegister(event) {
        event.preventDefault()
        const form = event.target
    
        // Obtener los datos del formulario
        const userData = {
            nombre_completo: form.nombre_completo.value,
            numero_identificacion: form.numero_identificacion.value,
            correo: form.correo.value,
            contraseña: form.contraseña.value,
        }
        const confirmarContraseña = form.confirmar_contraseña.value
        const terminos = form.terminos.checked
    
        // Validar los datos
        if (
            !userData.nombre_completo ||
            !userData.numero_identificacion ||
            !userData.correo ||
            !userData.contraseña ||
            !confirmarContraseña
        ) {
            this.view.showFormError("registro-error", "Por favor, completa todos los campos")
            return
        }
    
        if (userData.contraseña !== confirmarContraseña) {
            this.view.showFormError("registro-error", "Las contraseñas no coinciden")
            return
        }
    
        if (!terminos) {
            this.view.showFormError("registro-error", "Debes aceptar los términos y condiciones")
            return
        }
    
        // Mostrar indicador de carga
        this.view.showMessage("Creando cuenta...", "warning")
    
        // Llamar al modelo para registrar el usuario
        const result = await this.model.register(userData)
    
        if (result.success) {
            // Actualizar la interfaz
            this.view.updateUserInterface(result.user)
    
            // Mostrar mensaje de éxito
            this.view.showMessage("¡Cuenta creada exitosamente!", "success")
    
            // Redirigir al perfil
            setTimeout(() => {
            this.showProfilePage()
            }, 1000)
        } else {
            this.view.showFormError("registro-error", result.error)
        }
        }
    
        /**
         * Maneja el cierre de sesión
         */
        handleLogout() {
        // Llamar al modelo para cerrar sesión
        this.model.logout()
    
        // Actualizar la interfaz
        this.view.updateUserInterface(null)
    
        // Mostrar mensaje de éxito
        this.view.showMessage("Sesión cerrada correctamente", "success")
    
        // Redirigir a la página de inicio
        window.dispatchEvent(new CustomEvent("showHomePage"))
        }
    }
    
    export default AuthController
    
    