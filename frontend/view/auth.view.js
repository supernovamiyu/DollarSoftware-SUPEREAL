// AuthView.js - Maneja la interfaz de autenticación
export class AuthView {
    constructor() {
        this.containerSelector = "#container-principal";
        this.authTemplateSelector = "#plantilla-autenticacion-pago";
    }

    getContainer() {
        return document.querySelector(this.containerSelector);
    }

    renderAuthScreen() {
        const container = this.getContainer();
        const template = document.querySelector(this.authTemplateSelector);

        if (!container || !template) {
            console.error("Elementos DOM requeridos no encontrados");
            return false;
        }

        // Clonar la plantilla
        const clone = template.content.cloneNode(true);
        container.innerHTML = "";
        container.appendChild(clone);

        // Mostrar formulario de login por defecto
        this.showForm('login');

        return true;
    }

    showForm(type) {
        const loginContainer = document.getElementById("login-container-pago");
        const registerContainer = document.getElementById("registro-container-pago");

        if (!loginContainer || !registerContainer) return;

        if (type === "login") {
            loginContainer.style.display = "block";
            registerContainer.style.display = "none";
        } else {
            loginContainer.style.display = "none";
            registerContainer.style.display = "block";
        }
    }

    showFormError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    setupEventListeners(handlers) {
        // Configurar formulario de login
        const loginForm = document.getElementById("login-form-pago");
        if (loginForm) {
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const email = loginForm.correo.value;
                const password = loginForm.contraseña.value;

                if (!email || !password) {
                    this.showFormError("login-error-pago", "Por favor, completa todos los campos");
                    return;
                }

                if (handlers.login) {
                    handlers.login(email, password);
                }
            });
        }

        // Configurar formulario de registro
        const registerForm = document.getElementById("registro-form-pago");
        if (registerForm) {
            registerForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const fullName = registerForm.nombre_completo.value;
                const idNumber = registerForm.numero_identificacion.value;
                const email = registerForm.correo.value;
                const password = registerForm.contraseña.value;
                const confirmPassword = registerForm.confirmar_contraseña.value;
                const terms = registerForm.terminos.checked;

                // Validar formulario
                if (!fullName || !idNumber || !email || !password || !confirmPassword) {
                    this.showFormError("registro-error-pago", "Por favor, completa todos los campos");
                    return;
                }

                if (password !== confirmPassword) {
                    this.showFormError("registro-error-pago", "Las contraseñas no coinciden");
                    return;
                }

                if (!terms) {
                    this.showFormError("registro-error-pago", "Debes aceptar los términos y condiciones");
                    return;
                }

                if (handlers.register) {
                    handlers.register({
                        nombre_completo: fullName,
                        numero_identificacion: idNumber,
                        correo: email,
                        contraseña: password
                    });
                }
            });
        }

        // Configurar enlaces para cambiar entre formularios
        const registerLink = document.getElementById("enlace-registro-pago");
        const loginLink = document.getElementById("enlace-login-pago");

        if (registerLink) {
            registerLink.addEventListener("click", (event) => {
                event.preventDefault();
                this.showForm("registro");
            });
        }

        if (loginLink) {
            loginLink.addEventListener("click", (event) => {
                event.preventDefault();
                this.showForm("login");
            });
        }
    }
}