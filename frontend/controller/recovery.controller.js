// frontend/controller/recovery.controller.js

/**
 * Controlador para la recuperación de contraseña
 */
class RecoveryController {
    constructor(model, view) {
        this.model = model
        this.view = view
        this.currentStep = 1
        this.recoveryEmail = ""
        this.newPassword = ""
        this.verificationCode = ""
        this.maxAttempts = 3
        this.currentAttempts = 0
    }

    /**
     * Inicializa la vista de recuperación de contraseña
     */
    showRecoveryPage() {
        this.view.showRecoveryPage()
        this.setupEventListeners()
    }

    /**
     * Configura los listeners de eventos para los formularios
     */
    setupEventListeners() {
        // Formulario de solicitud de código
        const emailForm = document.getElementById("form-solicitar-codigo")
        if (emailForm) {
            emailForm.addEventListener("submit", (e) => {
                e.preventDefault()
                this.handleEmailSubmit()
            })
        }

        // Formulario de nueva contraseña
        const passwordForm = document.getElementById("form-nueva-password")
        if (passwordForm) {
            passwordForm.addEventListener("submit", (e) => {
                e.preventDefault()
                this.handlePasswordSubmit()
            })

            // Toggle de visibilidad de contraseña
            const toggleBtn = document.getElementById("toggle-password")
            if (toggleBtn) {
                toggleBtn.addEventListener("click", () => {
                    this.togglePasswordVisibility()
                })
            }

            // Validación en tiempo real de la contraseña
            const passwordInput = document.getElementById("nueva-password")
            if (passwordInput) {
                passwordInput.addEventListener("input", () => {
                    this.validatePasswordRequirements(passwordInput.value)
                })
            }
        }

        // Formulario de verificación de código
        const codeForm = document.getElementById("form-verificar-codigo")
        if (codeForm) {
            codeForm.addEventListener("submit", (e) => {
                e.preventDefault()
                this.handleCodeSubmit()
            })

            // Configurar inputs de código de verificación
            this.view.setupVerificationInputs((code) => {
                // Opcional: auto-submit cuando se complete el código
                // this.verificationCode = code
                // this.handleCodeSubmit()
            })

            // Botón de reenvío de código
            const resendBtn = document.getElementById("resend-code")
            if (resendBtn) {
                resendBtn.addEventListener("click", () => {
                    this.resendVerificationCode()
                })
            }
        }

        // Botón para ir al perfil
        const profileBtn = document.getElementById("ir-a-perfil")
        if (profileBtn) {
            profileBtn.addEventListener("click", () => {
                window.dispatchEvent(
                    new CustomEvent("navigateTo", {
                        detail: { path: "/perfil" },
                    })
                )
            })
        }
    }

    /**
     * Maneja el envío del formulario de correo electrónico
     */
    async handleEmailSubmit() {
        const emailInput = document.getElementById("correo-recuperacion")
        const errorElementId = "email-error"
        this.view.clearMessage(errorElementId)

        if (!emailInput || !emailInput.value) {
            this.view.showError(errorElementId, "Por favor, ingresa tu correo electrónico.")
            return
        }

        const email = emailInput.value.trim()

        // Validar formato de correo
        if (!this.isValidEmail(email)) {
            this.view.showError(errorElementId, "Por favor, ingresa un correo electrónico válido.")
            return
        }

        try {
            // Mostrar indicador de carga
            this.view.updateButtonState("form-solicitar-codigo-btn", true, "Verificando...")

            // Verificar si el correo existe en la base de datos
            const userExists = await this.model.checkUserEmail(email)

            if (!userExists) {
                this.view.showError(errorElementId, "No existe una cuenta con este correo electrónico.")
                this.view.updateButtonState("form-solicitar-codigo-btn", false, "Continuar")
                return
            }

            // Guardar el correo y avanzar al siguiente paso
            this.recoveryEmail = email
            this.goToStep(2)

            this.view.updateButtonState("form-solicitar-codigo-btn", false, "Continuar")
        } catch (error) {
            console.error("Error al verificar el correo:", error)
            this.view.showError(errorElementId, "Error al verificar el correo. Inténtalo de nuevo.")
            this.view.updateButtonState("form-solicitar-codigo-btn", false, "Continuar")
        }
    }

    /**
     * Maneja el envío del formulario de nueva contraseña
     */
    async handlePasswordSubmit() {
        const passwordInput = document.getElementById("nueva-password")
        const confirmInput = document.getElementById("confirmar-password")
        const errorElementId = "password-error"
        this.view.clearMessage(errorElementId)

        if (!passwordInput || !confirmInput) return

        const password = passwordInput.value
        const confirmPassword = confirmInput.value

        // Validar que la contraseña cumpla con los requisitos
        if (!this.isValidPassword(password)) {
            this.view.showError(errorElementId, "La contraseña no cumple con todos los requisitos.")
            return
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            this.view.showError(errorElementId, "Las contraseñas no coinciden.")
            return
        }

        try {
            // Mostrar indicador de carga
            this.view.updateButtonState("form-nueva-password-btn", true, "Procesando...")

            // Guardar la nueva contraseña
            this.newPassword = password

            // Generar y enviar código de verificación
            await this.model.requestVerificationCode(this.recoveryEmail)

            // Mostrar el correo en la pantalla de verificación
            this.view.displayEmail(this.recoveryEmail)

            // Iniciar el contador para reenvío
            this.view.startResendCountdown(() => {
                // Callback cuando termine la cuenta regresiva
                console.log("Cuenta regresiva terminada, se puede reenviar el código")
            })

            // Avanzar al siguiente paso
            this.goToStep(3)

            this.view.updateButtonState("form-nueva-password-btn", false, "Continuar")
        } catch (error) {
            console.error("Error al enviar el código de verificación:", error)
            this.view.showError(errorElementId, "Error al enviar el código de verificación. Inténtalo de nuevo.")
            this.view.updateButtonState("form-nueva-password-btn", false, "Continuar")
        }
    }

    /**
     * Maneja el envío del formulario de verificación de código
     */
    async handleCodeSubmit() {
        const inputs = document.querySelectorAll(".verification-input")
        const errorElementId = "codigo-error"
        this.view.clearMessage(errorElementId)

        let code = ""
        inputs.forEach((input) => {
            code += input.value
        })

        if (code.length !== 6) {
            this.view.showError(errorElementId, "Por favor, ingresa el código completo.")
            return
        }

        try {
            // Mostrar indicador de carga
            this.view.updateButtonState("form-verificar-codigo-btn", true, "Verificando...")

            // Verificar el código
            const isCodeValid = await this.model.verifyCode(this.recoveryEmail, code)

            if (!isCodeValid) {
                this.currentAttempts++

                if (this.currentAttempts >= this.maxAttempts) {
                    this.view.showError(errorElementId, "Demasiados intentos fallidos. Solicita un nuevo código.")
                    this.view.shakeVerificationInputs()

                    // Deshabilitar el botón de verificar y habilitar solo el de reenviar
                    this.view.updateButtonState("form-verificar-codigo-btn", true, "Verificar código")

                    const resendBtn = document.getElementById("resend-code")
                    if (resendBtn) {
                        resendBtn.disabled = false
                        document.getElementById("countdown-timer").style.display = "none"
                    }

                    return
                }

                this.view.showError(
                    errorElementId,
                    `Código incorrecto. Te quedan ${this.maxAttempts - this.currentAttempts} intentos.`
                )
                this.view.shakeVerificationInputs()
                this.view.updateButtonState("form-verificar-codigo-btn", false, "Verificar código")

                return
            }

            // Actualizar la contraseña
            const success = await this.model.resetPassword(this.recoveryEmail, this.newPassword, code)

            if (!success) {
                this.view.showError(errorElementId, "Error al actualizar la contraseña. Inténtalo de nuevo.")
                this.view.updateButtonState("form-verificar-codigo-btn", false, "Verificar código")
                return
            }

            // Limpiar el intervalo de cuenta regresiva
            this.view.clearCountdownInterval()

            // Avanzar al paso final
            this.goToStep(4)

            this.view.updateButtonState("form-verificar-codigo-btn", false, "Verificar código")

            // Mostrar notificación de éxito
            this.view.showNotification("¡Contraseña actualizada correctamente!", "success")
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error)
            this.view.showError(errorElementId, "Error al actualizar la contraseña. Inténtalo de nuevo.")
            this.view.updateButtonState("form-verificar-codigo-btn", false, "Verificar código")
        }
    }

    /**
     * Reenvía el código de verificación
     */
    async resendVerificationCode() {
        const errorElementId = "codigo-error"
        this.view.clearMessage(errorElementId)

        try {
            // Mostrar indicador de carga
            const resendBtn = document.getElementById("resend-code")
            if (resendBtn) {
                resendBtn.disabled = true
                resendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
            }

            // Reiniciar contador de intentos
            this.currentAttempts = 0

            // Habilitar el botón de verificar si estaba deshabilitado
            this.view.updateButtonState("form-verificar-codigo-btn", false, "Verificar código")

            // Enviar el nuevo código
            await this.model.requestVerificationCode(this.recoveryEmail)

            // Reiniciar la cuenta regresiva
            this.view.startResendCountdown(() => {
                // Callback cuando termine la cuenta regresiva
                console.log("Cuenta regresiva terminada, se puede reenviar el código")
            })

            // Limpiar los inputs
            const inputs = document.querySelectorAll(".verification-input")
            inputs.forEach((input) => {
                input.value = ""
            })

            // Enfocar el primer input
            if (inputs.length > 0) {
                inputs[0].focus()
            }

            // Mostrar mensaje de éxito
            this.view.showSuccess(errorElementId, "Código reenviado correctamente.")

            // Restaurar el botón
            if (resendBtn) {
                resendBtn.innerHTML = "Reenviar código"
            }

            // Limpiar el mensaje después de 3 segundos
            setTimeout(() => {
                this.view.clearMessage(errorElementId)
            }, 3000)
        } catch (error) {
            console.error("Error al reenviar el código:", error)
            this.view.showError(errorElementId, "Error al reenviar el código. Inténtalo de nuevo.")

            const resendBtn = document.getElementById("resend-code")
            if (resendBtn) {
                resendBtn.disabled = false
                resendBtn.innerHTML = "Reenviar código"
            }
        }
    }

    /**
     * Cambia la visibilidad de la contraseña
     */
    togglePasswordVisibility() {
        const passwordInput = document.getElementById("nueva-password")
        const confirmInput = document.getElementById("confirmar-password")
        const toggleBtn = document.getElementById("toggle-password")

        if (!passwordInput || !toggleBtn) return

        if (passwordInput.type === "password") {
            passwordInput.type = "text"
            if (confirmInput) confirmInput.type = "text"
            toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
        } else {
            passwordInput.type = "password"
            if (confirmInput) confirmInput.type = "password"
            toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i>'
        }
    }

    /**
     * Valida los requisitos de la contraseña en tiempo real
     * @param {string} password - Contraseña a validar
     * @returns {boolean} - True si la contraseña cumple con todos los requisitos
     */
    validatePasswordRequirements(password) {
        // Requisitos
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        }

        // Actualizar UI para cada requisito
        this.view.updatePasswordRequirements(requirements)

        return Object.values(requirements).every(Boolean)
    }

    /**
     * Avanza al paso especificado
     * @param {number} step - Número del paso
     */
    goToStep(step) {
        this.currentStep = step
        this.view.showRecoveryStep(step)
    }

    /**
     * Valida el formato de un correo electrónico
     * @param {string} email - Correo electrónico a validar
     * @returns {boolean} - True si el formato es válido
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    /**
     * Valida que la contraseña cumpla con todos los requisitos
     * @param {string} password - Contraseña a validar
     * @returns {boolean} - True si la contraseña cumple con todos los requisitos
     */
    isValidPassword(password) {
        const hasMinLength = password.length >= 8
        const hasUppercase = /[A-Z]/.test(password)
        const hasLowercase = /[a-z]/.test(password)
        const hasNumber = /[0-9]/.test(password)

        return hasMinLength && hasUppercase && hasLowercase && hasNumber
    }
}

export default RecoveryController