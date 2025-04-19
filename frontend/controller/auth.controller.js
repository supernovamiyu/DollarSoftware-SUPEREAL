/**
 * Controlador para la autenticación de usuarios
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
     * Configura los event listeners para la autenticación
     */
    setupEventListeners() {
        // Configurar formulario de login
        const loginForm = document.getElementById("login-form")
        if (loginForm) {
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault()
                const formData = {
                    correo: loginForm.correo.value,
                    contraseña: loginForm.contraseña.value,
                }
                this.handleLogin(formData)
            })
        }

        // Configurar formulario de registro
        const registroForm = document.getElementById("registro-form")
        if (registroForm) {
            registroForm.addEventListener("submit", (event) => {
                event.preventDefault()
                const formData = {
                    nombre_completo: registroForm.nombre_completo.value,
                    numero_identificacion: registroForm.numero_identificacion.value,
                    correo: registroForm.correo.value,
                    contraseña: registroForm.contraseña.value,
                    confirmar_contraseña: registroForm.confirmar_contraseña.value,
                }
                this.handleRegister(formData)
            })
        }
    }

    /**
     * Muestra las opciones de autenticación (login/registro)
     */
    showAuthOptions() {
        this.view.showAuthOptions()
        this.setupEventListeners() // Configurar eventos después de mostrar la plantilla
    }

    /**
     * Muestra la página de login
     */
    showLoginPage() {
        this.view.showLoginPage()
        this.setupEventListeners() // Configurar eventos después de mostrar la plantilla
    }

    /**
     * Muestra la página de registro
     */
    showRegisterPage() {
        this.view.showRegisterPage()
        this.setupEventListeners() // Configurar eventos después de mostrar la plantilla
    }

    /**
     * Maneja el proceso de login
     * @param {Object} formData - Datos del formulario de login
     */
// En auth.controller.js
async handleLogin(formData) {
    try {
        const result = await this.model.login(formData.correo, formData.contraseña);

        if (result.success) {
            this.view.showMessage("Inicio de sesión exitoso", "success");
            
            // Actualizar toda la UI con el nuevo usuario
            const user = this.model.getCurrentUser();
            this.view.updateUserInterface(user);
            
            // Forzar actualización en todos los controladores
            window.dispatchEvent(new CustomEvent("userLoggedIn", { detail: user }));

            // Redirigir al perfil
            setTimeout(() => {
                window.dispatchEvent(
                    new CustomEvent("navigateTo", {
                        detail: { path: "/perfil" },
                    })
                );
            }, 1000);
        } else {
            this.view.showMessage(result.error, "error");
        }
    } catch (error) {
        console.error("Error en el proceso de login:", error);
        this.view.showMessage("Error en el proceso de autenticación", "error");
    }
}

    /**
     * Maneja el proceso de registro
     * @param {Object} formData - Datos del formulario de registro
     */
    async handleRegister(formData) {
        // Validar que las contraseñas coincidan
        if (formData.contraseña !== formData.confirmar_contraseña) {
            this.view.showMessage("Las contraseñas no coinciden", "error")
            const errorElement = document.getElementById("registro-error")
            if (errorElement) {
                errorElement.textContent = "Las contraseñas no coinciden"
            }
            return
        }

        try {
            // Eliminar el campo de confirmación antes de enviar al servidor
            const { confirmar_contraseña, ...userData } = formData

            const result = await this.model.register(userData)

            if (result.success) {
                this.view.showMessage("Registro exitoso. Redirigiendo...", "success")
                this.view.updateUserInterface(result.user)

                // Redirigir al perfil después de 1.5 segundos
                setTimeout(() => {
                    window.dispatchEvent(
                        new CustomEvent("navigateTo", {
                            detail: { path: "/perfil" },
                        }),
                    )
                }, 1500)
            } else {
                this.view.showMessage(result.error, "error")
                const errorElement = document.getElementById("registro-error")
                if (errorElement) {
                    errorElement.textContent = result.error
                }
            }
        } catch (error) {
            console.error("Error en el proceso de registro:", error)
            this.view.showMessage("Error en el proceso de registro", "error")
        }
    }

    /**
     * Maneja el cierre de sesión
     */
    handleLogout() {
        this.model.logout()
        this.view.updateUserInterface(null)
        this.view.showMessage("Sesión cerrada correctamente", "success")

        // Redirigir a la página de auth después de cerrar sesión
        setTimeout(() => {
            window.dispatchEvent(
                new CustomEvent("navigateTo", {
                    detail: { path: "/auth" },
                }),
            )
        }, 1000)
    }
}

export default AuthController
