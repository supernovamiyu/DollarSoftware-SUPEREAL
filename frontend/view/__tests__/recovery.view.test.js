import BaseView from "../base.view.js"
import RecoveryView from '../recovery.view.js'


describe('RecoveryView', () => {
    let view
    let mockContainer

    beforeEach(() => {
        // Configurar el DOM simulado
        document.body.innerHTML = `
        <div id="container-principal"></div>
        <template id="plantilla-recuperar-contrasena">
            <div id="paso-email" class="recovery-step"></div>
            <div id="paso-password" class="recovery-step"></div>
            <div id="paso-codigo" class="recovery-step">
            <div id="email-display"></div>
            <div class="verification-inputs">
                <input type="text" class="verification-input" maxlength="1">
                <input type="text" class="verification-input" maxlength="1">
                <input type="text" class="verification-input" maxlength="1">
                <input type="text" class="verification-input" maxlength="1">
                <input type="text" class="verification-input" maxlength="1">
                <input type="text" class="verification-input" maxlength="1">
            </div>
            <div id="countdown-timer">
                <span id="countdown">60</span>
            </div>
            <button id="resend-code" style="display:none;"></button>
            </div>
            <div id="paso-exito" class="recovery-step"></div>
        </template>
    `

        view = new RecoveryView()
        mockContainer = document.getElementById('container-principal')
    })

    afterEach(() => {
        jest.clearAllMocks()
        jest.useRealTimers()
    })

    describe('showRecoveryPage', () => {
        it('debería mostrar la página de recuperación correctamente', () => {
            const result = view.showRecoveryPage()

            expect(result).toBe(true)
            expect(mockContainer.innerHTML).not.toBe('')
            expect(document.getElementById('paso-email').classList.contains('active')).toBe(true)
        })

        it('debería retornar false si no puede mostrar el template', () => {
            document.body.innerHTML = '<div id="container-principal"></div>' // Sin template
            const result = view.showRecoveryPage()

            expect(result).toBe(false)
        })
    })

    describe('showRecoveryStep', () => {
        beforeEach(() => {
            view.showRecoveryPage()
        })

        it('debería mostrar el paso 1 (email) correctamente', () => {
            view.showRecoveryStep(1)

            expect(document.getElementById('paso-email').classList.contains('active')).toBe(true)
            expect(document.getElementById('paso-password').classList.contains('active')).toBe(false)
        })

        it('debería mostrar el paso 2 (password) correctamente', () => {
            view.showRecoveryStep(2)

            expect(document.getElementById('paso-password').classList.contains('active')).toBe(true)
            expect(document.getElementById('paso-email').classList.contains('active')).toBe(false)
        })

        it('debería manejar pasos inválidos mostrando el paso de email por defecto', () => {
            view.showRecoveryStep(99) // Paso inválido

            expect(document.getElementById('paso-email').classList.contains('active')).toBe(true)
        })
    })

    describe('getStepId', () => {
        it('debería retornar el id correcto para cada paso', () => {
            expect(view.getStepId(1)).toBe('email')
            expect(view.getStepId(2)).toBe('password')
            expect(view.getStepId(3)).toBe('codigo')
            expect(view.getStepId(4)).toBe('exito')
            expect(view.getStepId(99)).toBe('email') // Valor por defecto
        })
    })

    describe('setupVerificationInputs', () => {
        let callbackMock

        beforeEach(() => {
            view.showRecoveryPage()
            callbackMock = jest.fn()
            view.setupVerificationInputs(callbackMock)
        })

        it('debería enfocar el primer input al inicializar', () => {
            const inputs = document.querySelectorAll('.verification-input')

            // Usar fake timers y avanzar el tiempo
            jest.useFakeTimers()
            view.setupVerificationInputs(jest.fn())
            jest.advanceTimersByTime(150)

            expect(document.activeElement).toBe(inputs[0])
        })

        it('debería mover al siguiente input al ingresar un dígito', () => {
            const inputs = document.querySelectorAll('.verification-input')

            // Simular entrada en el primer input
            inputs[0].value = '1'
            inputs[0].dispatchEvent(new Event('input'))

            expect(document.activeElement).toBe(inputs[1])
        })

        it('debería llamar al callback cuando se completa el código', () => {
            const inputs = document.querySelectorAll('.verification-input')

            // Llenar todos los inputs
            inputs.forEach((input, index) => {
                input.value = (index + 1).toString()
                input.dispatchEvent(new Event('input'))
            })

            expect(callbackMock).toHaveBeenCalledWith('123456')
        })

        it('debería manejar el pegado de código correctamente', () => {
            const inputs = document.querySelectorAll('.verification-input')
            const firstInput = inputs[0]

            // Simular pegado
            const pasteEvent = new Event('paste', { bubbles: true })
            pasteEvent.clipboardData = {
                getData: () => '654321'
            }
            firstInput.dispatchEvent(pasteEvent)

            // Verificar que todos los inputs tengan los valores correctos
            expect(inputs[0].value).toBe('6')
            expect(inputs[1].value).toBe('5')
            expect(inputs[2].value).toBe('4')
            expect(inputs[3].value).toBe('3')
            expect(inputs[4].value).toBe('2')
            expect(inputs[5].value).toBe('1')
            expect(callbackMock).toHaveBeenCalledWith('654321')
        })

        it('debería manejar Backspace correctamente', () => {
            const inputs = document.querySelectorAll('.verification-input')

            // Mover al segundo input
            inputs[0].value = '1'
            inputs[0].dispatchEvent(new Event('input'))

            // Simular Backspace en input vacío
            const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' })
            inputs[1].dispatchEvent(backspaceEvent)

            expect(document.activeElement).toBe(inputs[0])
        })
    })

    describe('shakeVerificationInputs', () => {
        it('debería agregar y remover la clase shake', () => {
            jest.useFakeTimers()
            view.showRecoveryPage()
            view.setupVerificationInputs(jest.fn())

            const inputs = document.querySelectorAll('.verification-input')

            view.shakeVerificationInputs()

            inputs.forEach(input => {
                expect(input.classList.contains('shake')).toBe(true)
            })

            // Avanzar el tiempo correctamente
            jest.advanceTimersByTime(500)

            inputs.forEach(input => {
                expect(input.classList.contains('shake')).toBe(false)
            })
        });
    });

    describe('startResendCountdown', () => {
        beforeEach(() => {
            jest.useFakeTimers()
            view.showRecoveryPage()
        })

        it('debería iniciar la cuenta regresiva correctamente', () => {
            const callbackMock = jest.fn()
            const countdownElement = document.getElementById('countdown')
            const resendButton = document.getElementById('resend-code')

            view.startResendCountdown(callbackMock)

            // Verificar estado inicial
            expect(countdownElement.textContent).toBe('60')
            expect(resendButton.style.display).toBe('none')

            // Avanzar el tiempo 59 segundos
            jest.advanceTimersByTime(59000)
            expect(countdownElement.textContent).toBe('1')
            expect(callbackMock).not.toHaveBeenCalled()

            // Avanzar 1 segundo más (total 60s)
            jest.advanceTimersByTime(1000)
            expect(countdownElement.textContent).toBe('0')
            expect(resendButton.style.display).toBe('inline')
            expect(callbackMock).toHaveBeenCalled()
        })

        it('debería limpiar el intervalo existente al iniciar uno nuevo', () => {
            const clearSpy = jest.spyOn(view, 'clearCountdownInterval')

            view.startResendCountdown(jest.fn())
            view.startResendCountdown(jest.fn())

            expect(clearSpy).toHaveBeenCalled()
        })
    })

    describe('clearCountdownInterval', () => {
        it('debería limpiar el intervalo correctamente', () => {
            jest.useFakeTimers()
            view.showRecoveryPage()

            view.startResendCountdown(jest.fn())
            expect(view.countdownInterval).not.toBeNull()

            view.clearCountdownInterval()
            expect(view.countdownInterval).toBeNull()
        })
    })

    describe('displayEmail', () => {
        it('debería mostrar el email correctamente', () => {
            view.showRecoveryPage()

            const testEmail = 'test@example.com'
            view.displayEmail(testEmail)

            expect(document.getElementById('email-display').textContent).toBe(testEmail)
        })
    })

    describe('updateButtonState', () => {
        beforeEach(() => {
            document.body.innerHTML += `
                <button id="form-solicitar-codigo-btn"></button>
                <button id="form-nueva-password-btn"></button>
                <button id="form-verificar-codigo-btn"></button>
                <i class="fa-solid"></i> <!-- Agregar iconos Font Awesome -->
            `
        });

        it('debería actualizar el estado del botón a loading', () => {
            const buttonId = 'form-solicitar-codigo-btn'
            view.updateButtonState(buttonId, true, 'Enviando...')

            const button = document.getElementById(buttonId)
            expect(button.disabled).toBe(true)
            expect(button.innerHTML).toContain('fa-spinner')
            expect(button.innerHTML).toContain('Enviando...')
        })

        it('debería actualizar el estado del botón a normal', () => {
            const buttonId = 'form-nueva-password-btn'
            view.updateButtonState(buttonId, false, 'Continuar')

            const button = document.getElementById(buttonId)
            expect(button.disabled).toBe(false)
            expect(button.innerHTML).toContain('fa-check')
            expect(button.innerHTML).toContain('Continuar')
        })
    })

    describe('updatePasswordRequirements', () => {
        beforeEach(() => {
            document.body.innerHTML += `
        <div id="req-length"><i class="fa-solid fa-circle"></i></div>
        <div id="req-uppercase"><i class="fa-solid fa-circle"></i></div>
        <div id="req-number"><i class="fa-solid fa-circle"></i></div>
        `
        })

        it('debería actualizar los requisitos correctamente', () => {
            const requirements = {
                length: true,
                uppercase: false,
                number: true
            }

            view.updatePasswordRequirements(requirements)

            expect(document.getElementById('req-length').className).toBe('text-success')
            expect(document.getElementById('req-uppercase').className).toBe('text-muted')
            expect(document.getElementById('req-number').className).toBe('text-success')

            expect(document.querySelector('#req-length i').className).toContain('fa-circle-check')
            expect(document.querySelector('#req-uppercase i').className).toContain('fa-circle')
        })
    })

    describe('message handling', () => {
        beforeEach(() => {
            document.body.innerHTML += `
        <div id="error-element"></div>
        <div id="success-element"></div>
        <div id="generic-element"></div>
        `
        })

        it('debería mostrar un mensaje de error', () => {
            view.showError('error-element', 'Error de prueba')

            const element = document.getElementById('error-element')
            expect(element.textContent).toBe('Error de prueba')
            expect(element.style.display).toBe('block')
            expect(element.className).toBe('error-message')
        })

        it('debería mostrar un mensaje de éxito', () => {
            view.showSuccess('success-element', 'Éxito de prueba')

            const element = document.getElementById('success-element')
            expect(element.textContent).toBe('Éxito de prueba')
            expect(element.style.display).toBe('block')
            expect(element.className).toBe('success-message')
        })

        it('debería limpiar un mensaje', () => {
            const element = document.getElementById('generic-element')
            element.textContent = 'Mensaje previo'
            element.style.display = 'block'

            view.clearMessage('generic-element')

            expect(element.textContent).toBe('')
            expect(element.style.display).toBe('none')
        })
    })

    describe('showNotification', () => {
        it('debería llamar al método showMessage de la clase base', () => {
            const showMessageSpy = jest.spyOn(BaseView.prototype, 'showMessage')

            view.showNotification('Mensaje de prueba', 'success')

            expect(showMessageSpy).toHaveBeenCalledWith('Mensaje de prueba', 'success')
        })
    })
})