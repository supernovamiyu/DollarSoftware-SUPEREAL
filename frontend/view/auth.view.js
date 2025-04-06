    import BaseView from "./base.view.js"

    /**
     * Vista para la autenticación (login y registro)
     */
    class AuthView extends BaseView {
    /**
     * Muestra la página de opciones de autenticación
     */
    showAuthOptions() {
        this.showTemplate("plantilla-sesion-registro", "container-principal")
    }

    /**
     * Muestra la página de inicio de sesión
     */
    showLoginPage() {
        this.showTemplate("plantilla-iniciar-sesion", "container-principal")
    }

    /**
     * Muestra la página de registro
     */
    showRegisterPage() {
        this.showTemplate("plantilla-registro", "container-principal")
    }

    /**
     * Muestra la página de perfil del usuario
     * @param {Object} user - Datos del usuario
     */
    showProfilePage(user) {
        if (this.showTemplate("plantilla-perfil-usuario", "container-principal")) {
        this.updateProfileInfo(user)
        }
    }

    /**
     * Actualiza la información del perfil con los datos del usuario
     * @param {Object} user - Datos del usuario
     */
    updateProfileInfo(user) {
        if (!user) return

        const userInfoName = document.getElementById("userInfoName")
        const userInfoEmail = document.getElementById("userInfoEmail")
        const userInfoInitial = document.getElementById("userInfoInitial")

        if (userInfoName) userInfoName.textContent = user.nombre_completo
        if (userInfoEmail) userInfoEmail.textContent = user.correo
        if (userInfoInitial) userInfoInitial.textContent = user.nombre_completo.charAt(0).toUpperCase()
    }

    /**
     * Actualiza la interfaz según el estado de autenticación
     * @param {Object|null} user - Datos del usuario o null si no hay sesión
     */
    updateUserInterface(user) {
        // Obtener el icono de usuario
        const userIcon = document.querySelector(".fa-user")

        if (user) {
        // Si hay un usuario autenticado, mostrar su nombre debajo del icono
        if (userIcon) {
            // Verificar si ya existe el contenedor del nombre
            let userNameElement = userIcon.parentElement.querySelector(".nombre-usuario")

            if (!userNameElement) {
            // Crear el elemento para mostrar el nombre
            userNameElement = document.createElement("span")
            userNameElement.className = "nombre-usuario"
            userNameElement.style.display = "block"
            userNameElement.style.fontSize = "12px"
            userNameElement.style.textAlign = "center"
            userNameElement.style.marginTop = "5px"
            userNameElement.style.color = "white"

            // Insertar después del icono
            userIcon.parentElement.appendChild(userNameElement)
            }

            // Actualizar el texto con el nombre del usuario
            userNameElement.textContent = user.nombre_completo.split(" ")[0]
        }
        } else {
        // Si no hay usuario autenticado, eliminar el nombre si existe
        if (userIcon) {
            const userNameElement = userIcon.parentElement.querySelector(".nombre-usuario")
            if (userNameElement) {
            userNameElement.remove()
            }
        }
        }
    }

    /**
     * Configura los eventos para los formularios de autenticación
     * @param {Function} loginHandler - Manejador para el formulario de login
     * @param {Function} registerHandler - Manejador para el formulario de registro
     */
    setupAuthForms(loginHandler, registerHandler) {
        // Configurar formulario de login
        const loginForm = document.getElementById("login-form")
        if (loginForm) {
        loginForm.addEventListener("submit", loginHandler)
        }

        // Configurar formulario de registro
        const registerForm = document.getElementById("registro-form")
        if (registerForm) {
        registerForm.addEventListener("submit", registerHandler)
        }
    }

    /**
     * Configura el botón de cerrar sesión
     * @param {Function} logoutHandler - Manejador para el botón de cerrar sesión
     */
    setupLogoutButton(logoutHandler) {
        const logoutButton = document.getElementById("logoutButton")
        if (logoutButton) {
        logoutButton.addEventListener("click", logoutHandler)
        }
    }
    }

    export default AuthView

