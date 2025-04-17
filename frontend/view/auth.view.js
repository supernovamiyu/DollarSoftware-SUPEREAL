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
    /**
     * Actualiza la interfaz según el estado de autenticación
     * @param {Object|null} user - Datos del usuario o null si no hay sesión
     */
    updateUserInterface(user) {
        // Obtener todos los elementos que muestran el estado de autenticación
        const authElements = {
            userIcon: document.querySelector(".fa-user"),
            userNameElement: document.querySelector(".nombre-usuario"),
            userNavInfo: document.querySelector(".user-nav-info")
        };

        if (user) {
            // Actualizar nombre en la barra de navegación
            if (authElements.userNavInfo) {
                authElements.userNavInfo.textContent = user.nombre_completo.split(" ")[0];
            }

            // Actualizar icono de usuario
            if (authElements.userIcon) {
                let userNameElement = authElements.userIcon.parentElement.querySelector(".nombre-usuario");
                
                if (!userNameElement) {
                    userNameElement = document.createElement("span");
                    userNameElement.className = "nombre-usuario";
                    // ... estilos ...
                    authElements.userIcon.parentElement.appendChild(userNameElement);
                }
                userNameElement.textContent = user.nombre_completo.split(" ")[0];
            }
        } else {
            // Limpiar información de usuario
            if (authElements.userNavInfo) {
                authElements.userNavInfo.textContent = "Cuenta Personal";
            }

            if (authElements.userNameElement) {
                authElements.userNameElement.remove();
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

