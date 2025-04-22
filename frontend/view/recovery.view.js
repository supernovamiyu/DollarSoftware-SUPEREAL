import BaseView from "./base.view.js"

/**
 * Vista para la recuperación de contraseña
 */
class RecoveryView extends BaseView {
    constructor() {
        super()
        this.countdownInterval = null
    }

    /**
     * Muestra la página de recuperación de contraseña
     */
    showRecoveryPage() {
        if (this.showTemplate("plantilla-recuperar-contrasena", "container-principal")) {
            console.log("Página de recuperación de contraseña mostrada correctamente")
            // Mostrar solo el primer paso inicialmente
            this.showRecoveryStep(1)
            return true
        }
        return false
    }

    /**
     * Muestra un paso específico del proceso de recuperación
     * @param {number} step - Número del paso (1-4)
     */
    showRecoveryStep(step) {
        // Ocultar todos los pasos
        document.querySelectorAll(".recovery-step").forEach((el) => {
            el.classList.remove("active")
        })

        // Mostrar el paso actual
        const currentStep = document.getElementById(`paso-${this.getStepId(step)}`)
        if (currentStep) {
            currentStep.classList.add("active")
        }
    }

    /**
     * Obtiene el ID del paso
     * @param {number} step - Número del paso
     * @returns {string} - ID del paso
     */
    getStepId(step) {
        const stepMap = {
            1: "email",
            2: "password",
            3: "codigo",
            4: "exito",
        }
        return stepMap[step] || "email"
    }

    /**
     * Configura los inputs para el código de verificación
     * @param {Function} callback - Función a llamar cuando se complete el código
     */
    setupVerificationInputs(callback) {
        const inputs = document.querySelectorAll(".verification-input")

        inputs.forEach((input, index) => {
            // Enfocar el primer input
            if (index === 0) {
                setTimeout(() => {
                    input.focus()
                }, 100)
            }

            // Manejar entrada de dígitos
            input.addEventListener("input", (e) => {
                // Permitir solo números
                const value = e.target.value.replace(/[^0-9]/g, "")
                e.target.value = value.slice(0, 1)

                // Si hay un valor y no es el último input, mover al siguiente
                if (value && index < inputs.length - 1) {
                    inputs[index + 1].focus()
                }

                // Verificar si todos los inputs tienen valor
                let code = ""
                let isComplete = true
                inputs.forEach((inp) => {
                    code += inp.value
                    if (!inp.value) {
                        isComplete = false
                    }
                })

                // Si el código está completo, llamar al callback
                if (isComplete && callback) {
                    callback(code)
                }
            })

            // Manejar teclas especiales
            input.addEventListener("keydown", (e) => {
                // Si se presiona Backspace y el input está vacío, mover al anterior
                if (e.key === "Backspace" && !e.target.value && index > 0) {
                    inputs[index - 1].focus()
                }
            })

            // Manejar pegado de código
            input.addEventListener("paste", (e) => {
                e.preventDefault()
                const pastedData = e.clipboardData.getData("text")
                const digits = pastedData.replace(/[^0-9]/g, "").slice(0, inputs.length)

                if (digits) {
                    // Distribuir los dígitos en los inputs
                    digits.split("").forEach((digit, i) => {
                        if (i < inputs.length) {
                            inputs[i].value = digit
                        }
                    })

                    // Enfocar el siguiente input vacío o el último si todos están llenos
                    const nextEmptyIndex = digits.length < inputs.length ? digits.length : inputs.length - 1
                    inputs[nextEmptyIndex].focus()

                    // Verificar si el código está completo
                    if (digits.length === inputs.length && callback) {
                        callback(digits)
                    }
                }
            })
        })
    }

    /**
     * Hace vibrar los inputs de verificación para indicar error
     */
    shakeVerificationInputs() {
        const inputs = document.querySelectorAll(".verification-input")
        inputs.forEach((input) => {
            input.classList.add("shake")
            setTimeout(() => {
                input.classList.remove("shake")
            }, 500)
        })
    }

    /**
     * Inicia la cuenta regresiva para reenviar el código
     * @param {Function} callback - Función a llamar cuando termine la cuenta regresiva
     */
    startResendCountdown(callback) {
        // Limpiar intervalo existente
        this.clearCountdownInterval()

        const countdownElement = document.getElementById("countdown")
        const countdownTimer = document.getElementById("countdown-timer")
        const resendButton = document.getElementById("resend-code")

        if (!countdownElement || !countdownTimer || !resendButton) return

        // Mostrar el contador y ocultar el botón
        countdownTimer.style.display = "inline"
        resendButton.style.display = "none"
        resendButton.disabled = true

        // Iniciar cuenta regresiva desde 60 segundos
        let seconds = 60
        countdownElement.textContent = seconds

        this.countdownInterval = setInterval(() => {
            seconds--
            countdownElement.textContent = seconds

            if (seconds <= 0) {
                this.clearCountdownInterval()
                countdownTimer.style.display = "none"
                resendButton.style.display = "inline"
                resendButton.disabled = false

                if (callback) callback()
            }
        }, 1000)
    }

    /**
     * Limpia el intervalo de cuenta regresiva
     */
    clearCountdownInterval() {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval)
            this.countdownInterval = null
        }
    }

    /**
     * Muestra el correo en la pantalla de verificación
     * @param {string} email - Correo electrónico
     */
    displayEmail(email) {
        const emailDisplay = document.getElementById("email-display")
        if (emailDisplay) {
            emailDisplay.textContent = email
        }
    }

    /**
     * Actualiza el estado de un botón
     * @param {string} buttonId - ID del botón
     * @param {boolean} isLoading - Indica si está cargando
     * @param {string} text - Texto a mostrar
     */
    updateButtonState(buttonId, isLoading, text) {
        const button = document.getElementById(buttonId)
        if (!button) return

        button.disabled = isLoading
        button.innerHTML = isLoading
            ? `<i class="fa-solid fa-spinner fa-spin"></i> ${text}`
            : `<i class="fa-solid ${this.getButtonIcon(buttonId)}"></i> ${text}`
    }

    /**
     * Obtiene el icono para un botón
     * @param {string} buttonId - ID del botón
     * @returns {string} - Clase del icono
     */
    getButtonIcon(buttonId) {
        const icons = {
            "form-solicitar-codigo-btn": "fa-paper-plane",  // Agregar fa-
            "form-nueva-password-btn": "fa-check",          // Agregar fa-
            "form-verificar-codigo-btn": "fa-check-double", // Agregar fa-
        }
        return icons[buttonId] || "fa-check"
    }

    /**
     * Actualiza los indicadores de requisitos de contraseña
     * @param {Object} requirements - Estado de los requisitos
     */
    updatePasswordRequirements(requirements) {
        for (const [req, isMet] of Object.entries(requirements)) {
            const element = document.getElementById(`req-${req}`)
            if (element) {
                const icon = element.querySelector("i")
                if (icon) {
                    icon.className = isMet ? "fa-solid fa-circle-check text-success" : "fa-solid fa-circle text-muted"
                }
                element.className = isMet ? "text-success" : "text-muted"
            }
        }
    }

    /**
     * Muestra un mensaje de error
     * @param {string} elementId - ID del elemento donde mostrar el error
     * @param {string} message - Mensaje de error
     */
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId)
        if (errorElement) {
            errorElement.textContent = message
            errorElement.style.display = "block"
            errorElement.className = "error-message"
        }
    }

    /**
     * Muestra un mensaje de éxito
     * @param {string} elementId - ID del elemento donde mostrar el mensaje
     * @param {string} message - Mensaje de éxito
     */
    showSuccess(elementId, message) {
        const element = document.getElementById(elementId)
        if (element) {
            element.textContent = message
            element.style.display = "block"
            element.className = "success-message"
        }
    }

    /**
     * Limpia un mensaje
     * @param {string} elementId - ID del elemento donde limpiar el mensaje
     */
    clearMessage(elementId) {
        const element = document.getElementById(elementId)
        if (element) {
            element.textContent = ""
            element.style.display = "none"
        }
    }

    /**
     * Muestra una notificación
     * @param {string} message - Mensaje de la notificación
     * @param {string} type - Tipo de notificación (success, error, info, warning)
     */
    showNotification(message, type = "info") {
        // Usar el método de la clase base
        this.showMessage(message, type)
    }
}

export default RecoveryView
