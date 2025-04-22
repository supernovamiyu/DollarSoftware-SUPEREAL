import AuthController from '../auth.controller'

describe('AuthController', () => {
    let mockModel, mockView, authController

    beforeEach(() => {
        // Mock del console.error para evitar output en las pruebas
        jest.spyOn(console, 'error').mockImplementation(() => { })

        mockModel = {
            login: jest.fn(),
            register: jest.fn(),
            logout: jest.fn(),
            getCurrentUser: jest.fn()
        }

        mockView = {
            showAuthOptions: jest.fn(),
            showLoginPage: jest.fn(),
            showRegisterPage: jest.fn(),
            showMessage: jest.fn(),
            updateUserInterface: jest.fn()
        }

        authController = new AuthController(mockModel, mockView)

        // Espiamos el método setupEventListeners del prototipo
        jest.spyOn(AuthController.prototype, 'setupEventListeners')
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    describe('Constructor', () => {
        test('debería inicializar correctamente con modelo y vista', () => {
            expect(authController.model).toBe(mockModel)
            expect(authController.view).toBe(mockView)
        })
    })

    describe('setupEventListeners', () => {
        test('debería configurar el event listener para el formulario de login si existe', () => {
            const mockLoginForm = {
                addEventListener: jest.fn(),
                correo: { value: 'test@example.com' },
                contraseña: { value: 'password123' }
            }
            document.getElementById = jest.fn().mockReturnValueOnce(mockLoginForm)

            authController.setupEventListeners()

            expect(document.getElementById).toHaveBeenCalledWith('login-form')
            expect(mockLoginForm.addEventListener).toHaveBeenCalledWith('submit', expect.any(Function))
        })

        test('debería configurar el event listener para el formulario de registro si existe', () => {
            const mockRegistroForm = {
                addEventListener: jest.fn(),
                nombre_completo: { value: 'Test User' },
                numero_identificacion: { value: '123456' },
                correo: { value: 'test@example.com' },
                contraseña: { value: 'password123' },
                confirmar_contraseña: { value: 'password123' }
            }
            document.getElementById = jest.fn()
                .mockReturnValueOnce(null)
                .mockReturnValueOnce(mockRegistroForm)

            authController.setupEventListeners()

            expect(document.getElementById).toHaveBeenCalledWith('registro-form')
            expect(mockRegistroForm.addEventListener).toHaveBeenCalledWith('submit', expect.any(Function))
        })
    })

    describe('showAuthOptions', () => {
        test('debería llamar a showAuthOptions de la vista y configurar event listeners', () => {
            authController.showAuthOptions()
            expect(mockView.showAuthOptions).toHaveBeenCalled()
            expect(AuthController.prototype.setupEventListeners).toHaveBeenCalled()
        })
    })

    describe('showLoginPage', () => {
        test('debería llamar a showLoginPage de la vista y configurar event listeners', () => {
            authController.showLoginPage()
            expect(mockView.showLoginPage).toHaveBeenCalled()
            expect(AuthController.prototype.setupEventListeners).toHaveBeenCalled()
        })
    })

    describe('showRegisterPage', () => {
        test('debería llamar a showRegisterPage de la vista y configurar event listeners', () => {
            authController.showRegisterPage()
            expect(mockView.showRegisterPage).toHaveBeenCalled()
            expect(AuthController.prototype.setupEventListeners).toHaveBeenCalled()
        })
    })

    describe('handleLogin', () => {
        const formData = {
            correo: 'test@example.com',
            contraseña: 'password123'
        }

        test('debería manejar un login exitoso correctamente', async () => {
            mockModel.login.mockResolvedValue({ success: true })
            mockModel.getCurrentUser.mockReturnValue({ name: 'Test User' })

            await authController.handleLogin(formData)

            expect(mockModel.login).toHaveBeenCalledWith(formData.correo, formData.contraseña)
            expect(mockView.showMessage).toHaveBeenCalledWith('Inicio de sesión exitoso', 'success')
            expect(mockView.updateUserInterface).toHaveBeenCalledWith({ name: 'Test User' })
        })

        test('debería manejar un login fallido correctamente', async () => {
            mockModel.login.mockResolvedValue({ success: false, error: 'Credenciales inválidas' })

            await authController.handleLogin(formData)

            expect(mockModel.login).toHaveBeenCalledWith(formData.correo, formData.contraseña)
            expect(mockView.showMessage).toHaveBeenCalledWith('Credenciales inválidas', 'error')
            expect(mockView.updateUserInterface).not.toHaveBeenCalled()
        })

        test('debería manejar errores durante el login', async () => {
            mockModel.login.mockRejectedValue(new Error('Error de red'))

            await authController.handleLogin(formData)

            expect(mockModel.login).toHaveBeenCalledWith(formData.correo, formData.contraseña)
            expect(mockView.showMessage).toHaveBeenCalledWith('Error en el proceso de autenticación', 'error')
        })
    })

    describe('handleRegister', () => {
        const formData = {
            nombre_completo: 'Test User',
            numero_identificacion: '123456',
            correo: 'test@example.com',
            contraseña: 'password123',
            confirmar_contraseña: 'password123'
        }

        test('debería rechazar el registro si las contraseñas no coinciden', async () => {
            const invalidFormData = { ...formData, confirmar_contraseña: 'different' }

            await authController.handleRegister(invalidFormData)

            expect(mockView.showMessage).toHaveBeenCalledWith('Las contraseñas no coinciden', 'error')
            expect(mockModel.register).not.toHaveBeenCalled()
        })

        test('debería manejar un registro exitoso correctamente', async () => {
            const userData = { ...formData }
            delete userData.confirmar_contraseña

            mockModel.register.mockResolvedValue({
                success: true,
                user: { name: 'Test User' }
            })

            await authController.handleRegister(formData)

            expect(mockModel.register).toHaveBeenCalledWith(userData)
            expect(mockView.showMessage).toHaveBeenCalledWith('Registro exitoso. Redirigiendo...', 'success')
            expect(mockView.updateUserInterface).toHaveBeenCalledWith({ name: 'Test User' })
        })

        test('debería manejar un registro fallido correctamente', async () => {
            mockModel.register.mockResolvedValue({
                success: false,
                error: 'El correo ya está registrado'
            })

            await authController.handleRegister(formData)

            expect(mockView.showMessage).toHaveBeenCalledWith('El correo ya está registrado', 'error')
        })

        test('debería manejar errores durante el registro', async () => {
            mockModel.register.mockRejectedValue(new Error('Error de red'))

            await authController.handleRegister(formData)

            expect(mockView.showMessage).toHaveBeenCalledWith('Error en el proceso de registro', 'error')
        })
    })

    describe('handleLogout', () => {
        test('debería manejar el logout correctamente', () => {
            window.dispatchEvent = jest.fn()

            authController.handleLogout()

            expect(mockModel.logout).toHaveBeenCalled()
            expect(mockView.updateUserInterface).toHaveBeenCalledWith(null)
            expect(mockView.showMessage).toHaveBeenCalledWith('Sesión cerrada correctamente', 'success')
            expect(window.dispatchEvent).toHaveBeenCalled()
        })
    })
})