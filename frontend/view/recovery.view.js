// frontend/view/recovery.view.js

/**
 * Vista para la recuperación de contraseña
 */
class RecoveryView {
    constructor() {
        // Asegurarse de que los estilos estén cargados
        this.loadStyles()
    }

    /**
     * Carga los estilos necesarios para la recuperación de contraseña
     */
    loadStyles() {
        // Verificar si los estilos ya están cargados
        if (!document.getElementById("recovery-styles")) {
            const link = document.createElement("link")
            link.id = "recovery-styles"
            link.rel = "stylesheet"
            link.href = "frontend/assets/css/recovery.css"
            document.head.appendChild(link)
        }
    }

    /**
     * Muestra la página de recuperación de contraseña
     * @returns {boolean} - True si se mostró correctamente
     */
    showRecoveryPage() {
        // Obtener el contenedor principal
        const container = document.getElementById("container-principal")
        if (!container) return false

        // Obtener la plantilla
        const template = document.getElementById("plantilla-recuperar-contrasena")
        if (!template) return false

        // Mostrar la plantilla
        container.innerHTML = template.innerHTML

        // Mostrar el primer paso por defecto
        this.showRecoveryStep(1)

        return true
    }

    /**
     * Muestra un paso específico del proceso de recuperación
     * @param {number} step - Número del paso a mostrar (1-4)
     */
    showRecoveryStep(step) {
        // Ocultar todos los pasos
        const steps = document.querySelectorAll(".recovery-step")
        steps.forEach((stepElement) => {
            stepElement.classList.remove("active")
        })

        // Mostrar el paso actual
        let stepId
        switch (step) {
            case 1:
                stepId = "paso-email"
                break
            case 2:
                stepId = "paso-password"
                break
            case 3:
                stepId = "paso-codigo"
                break
            case 4:
                stepId = "paso-exito"
                break
            default:
                stepId = "paso-email"
        }

        const currentStep = document.getElementById(stepId)
        if (currentStep) {
            currentStep.classList.add("active")
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
            errorElement.style.color = "#dc3545"
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
            element.style.color = "#28a745"
        }
    }

    /**
     * Limpia un mensaje de error o éxito
     * @param {string} elementId - ID del elemento donde limpiar el mensaje
     */
    clearMessage(elementId) {
        const element = document.getElementById(elementId)
        if (element) {
            element.textContent = ""
            element.style.color = ""
        }
    }

    /**
     * Actualiza el estado de un botón (cargando/normal)
     * @param {string} buttonId - ID del botón
     * @param {boolean} isLoading - True si está cargando
     * @param {string} loadingText - Texto a mostrar durante la carga
     * @param {string} normalText - Texto normal del botón
     */
    updateButtonState(buttonId, isLoading, loadingText = "Procesando...", normalText = "Continuar") {
        const button = document.getElementById(buttonId)
        if (button) {
            button.disabled = isLoading
            button.innerHTML = isLoading
                ? `<i class="fa-solid fa-spinner fa-spin"></i> ${loadingText}`
                : normalText
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
     * Actualiza la visualización de los requisitos de contraseña
     * @param {Object} requirements - Estado de los requisitos
     */
    updatePasswordRequirements(requirements) {
        Object.keys(requirements).forEach((req) => {
            const element = document.getElementById(`req-${req}`)
            if (element) {
                if (requirements[req]) {
                    element.classList.add("valid")
                    element.innerHTML = '<i class="fa-solid fa-check"></i> ' + element.textContent.split(" ").slice(1).join(" ")
                } else {
                    element.classList.remove("valid")
                    element.innerHTML = '<i class="fa-solid fa-circle"></i> ' + element.textContent.split(" ").slice(1).join(" ")
                }
            }
        })
    }

    /**
     * Configura los inputs para el código de verificación
     * @param {Function} onComplete - Función a llamar cuando se complete el código
     */
    setupVerificationInputs(onComplete) {
        const inputs = document.querySelectorAll(".verification-input")

        inputs.forEach((input, index) => {
            // Al escribir en un input, pasar al siguiente
            input.addEventListener("input", (e) => {
                const value = e.target.value

                // Asegurarse de que solo se ingresen números
                if (!/^\d*$/.test(value)) {
                    input.value = input.value.replace(/\D/g, "")
                    return
                }

                // Si se ingresó un valor, mover al siguiente input
                if (value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus()
                }

                // Verificar si todos los campos están llenos
                if (this.areAllInputsFilled(inputs)) {
                    onComplete(this.getVerificationCode(inputs))
                }
            })

            // Manejar teclas especiales (borrar, flechas)
            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && index > 0 && input.value === "") {
                    // Si se presiona borrar en un input vacío, volver al anterior
                    inputs[index - 1].focus()
                } else if (e.key === "ArrowLeft" && index > 0) {
                    // Flecha izquierda para ir al input anterior
                    inputs[index - 1].focus()
                } else if (e.key === "ArrowRight" && index < inputs.length - 1) {
                    // Flecha derecha para ir al input siguiente
                    inputs[index + 1].focus()
                }
            })
        })

        // Permitir pegar el código completo
        inputs[0].addEventListener("paste", (e) => {
            e.preventDefault()
            const pastedData = e.clipboardData.getData("text")

            // Si el texto pegado tiene 6 dígitos, distribuirlo en los inputs
            if (/^\d{6}$/.test(pastedData)) {
                inputs.forEach((input, i) => {
                    input.value = pastedData[i]
                })

                // Verificar si todos los campos están llenos
                if (this.areAllInputsFilled(inputs)) {
                    onComplete(this.getVerificationCode(inputs))
                }
            }
        })
    }

    /**
     * Verifica si todos los inputs del código están llenos
     * @param {NodeList} inputs - Inputs del código
     * @returns {boolean} - True si todos están llenos
     */
    areAllInputsFilled(inputs) {
        return Array.from(inputs).every(input => input.value.length === 1)
    }

    /**
     * Obtiene el código de verificación de los inputs
     * @param {NodeList} inputs - Inputs del código
     * @returns {string} - Código de verificación
     */
    getVerificationCode(inputs) {
        return Array.from(inputs).map(input => input.value).join("")
    }

    /**
     * Inicia la cuenta regresiva para el reenvío del código
     * @param {Function} onCountdownEnd - Función a llamar cuando termine la cuenta regresiva
     * @param {number} seconds - Segundos para la cuenta regresiva
     */
    startResendCountdown(onCountdownEnd, seconds = 60) {
        const resendBtn = document.getElementById("resend-code")
        const countdownElement = document.getElementById("countdown")
        const countdownTimer = document.getElementById("countdown-timer")

        if (!resendBtn || !countdownElement || !countdownTimer) return

        let remainingSeconds = seconds
        countdownElement.textContent = remainingSeconds
        resendBtn.disabled = true
        countdownTimer.style.display = "block"

        const countdownInterval = setInterval(() => {
            remainingSeconds--
            countdownElement.textContent = remainingSeconds

            if (remainingSeconds <= 0) {
                clearInterval(countdownInterval)
                resendBtn.disabled = false
                countdownTimer.style.display = "none"
                if (onCountdownEnd) onCountdownEnd()
            }
        }, 1000)

        // Guardar el intervalo para poder limpiarlo después
        this.countdownInterval = countdownInterval
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
     * Anima los inputs de verificación cuando el código es incorrecto
     */
    shakeVerificationInputs() {
        const inputs = document.querySelectorAll(".verification-input")

        inputs.forEach((input) => {
            input.style.borderColor = "#dc3545"
            input.style.animation = "shake 0.5s"

            // Eliminar la animación después de que termine
            setTimeout(() => {
                input.style.animation = ""
            }, 500)
        })
    }

    /**
     * Muestra una notificación
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de notificación (success, error, warning, info)
     */
    showNotification(message, type = "info") {
        const notification = document.createElement("div")

        // Define más colores contrastantes según el tipo
        let bgColor, textColor, borderColor, icon

        switch (type) {
            case "success":
                bgColor = "#28a745"
                textColor = "#ffffff"
                borderColor = "#1e7e34"
                icon = "fa-check-circle"
                break
            case "error":
                bgColor = "#dc3545"
                textColor = "#ffffff"
                borderColor = "#bd2130"
                icon = "fa-exclamation-circle"
                break
            case "warning":
                bgColor = "#ffc107"
                textColor = "#000000" // Texto más oscuro para mejor contraste en amarillo
                borderColor = "#d39e00"
                icon = "fa-exclamation-triangle"
                break
            default: // info
                bgColor = "#17a2b8"
                textColor = "#ffffff"
                borderColor = "#138496"
                icon = "fa-info-circle"
        }

        notification.className = `alert alert-${type} mensaje-notificacion`
        notification.setAttribute("role", "alert")
        notification.innerHTML = `
        <div class="d-flex align-items-center">
          <i class="fa-solid ${icon} me-2" style="font-size: 1.25rem;"></i>
          <span style="font-weight: 500;">${message}</span>
        </div>
      `

        // Aplicar estilos directamente para mayor contraste
        notification.style.position = "fixed"
        notification.style.top = "20px"
        notification.style.right = "20px"
        notification.style.zIndex = "9999"
        notification.style.maxWidth = "400px"
        notification.style.opacity = "0"
        notification.style.transform = "translateY(-20px)"
        notification.style.transition = "all 0.3s ease"
        notification.style.backgroundColor = bgColor
        notification.style.color = textColor
        notification.style.borderColor = borderColor
        notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)" // Sombra más fuerte
        notification.style.fontWeight = "bold"
        notification.style.padding = "15px 20px"
        notification.style.borderRadius = "5px"
        notification.style.border = `2px solid ${borderColor}` // Borde más grueso
        notification.style.fontSize = "1.05rem" // Texto ligeramente más grande

        document.body.appendChild(notification)

        // Añadir un evento de clic para descartar la notificación
        notification.addEventListener("click", () => {
            notification.style.opacity = "0"
            notification.style.transform = "translateY(-20px)"
            setTimeout(() => notification.remove(), 300)
        })

        setTimeout(() => {
            notification.style.opacity = "1"
            notification.style.transform = "translateY(0)"
        }, 100)

        setTimeout(() => {
            notification.style.opacity = "0"
            notification.style.transform = "translateY(-20px)"
            setTimeout(() => notification.remove(), 300)
        }, 7000) // Mostrar durante más tiempo (7 segundos)
    }
}

export default RecoveryView