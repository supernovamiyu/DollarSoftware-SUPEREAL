import ProfileController from '../profile.controller'

describe('ProfileController', () => {
    let modelMock, viewMock, controller

    beforeEach(() => {
        modelMock = {
            isAuthenticated: jest.fn(),
            getCurrentUser: jest.fn(),
            getUserOrders: jest.fn(),
            logout: jest.fn(),
            updateUserData: jest.fn()
        }

        viewMock = {
            controller: null,
            showMessage: jest.fn(),
            showProfilePage: jest.fn().mockReturnValue(true),
            updateProfileInfo: jest.fn(),
            showProfileSection: jest.fn(),
            setupProfileButtons: jest.fn(),
            setupDataForm: jest.fn(),
            createOrderManagementHTML: jest.fn()
        }

        controller = new ProfileController(modelMock, viewMock)
    })

    test('redirige a /auth si el usuario no está autenticado', async () => {
        modelMock.isAuthenticated.mockReturnValue(false)
        window.location.pathname = "/perfil"

        const dispatchSpy = jest.spyOn(window, 'dispatchEvent')
        await controller.showProfilePage()

        expect(viewMock.showMessage).toHaveBeenCalledWith(
            "Debes iniciar sesión para acceder al perfil",
            "warning"
        )
        expect(dispatchSpy).toHaveBeenCalledWith(expect.any(CustomEvent))
    })

    test('muestra el perfil si el usuario está autenticado', async () => {
        modelMock.isAuthenticated.mockReturnValue(true)
        modelMock.getCurrentUser.mockReturnValue({ nombre: "Usuario" })
        modelMock.getUserOrders.mockResolvedValue([])

        await controller.showProfilePage()

        expect(viewMock.showProfilePage).toHaveBeenCalledWith({ nombre: "Usuario" })
        expect(viewMock.updateProfileInfo).toHaveBeenCalledWith({ nombre: "Usuario" })
    })

    test('handleLogout cierra sesión y redirige', () => {
        const dispatchSpy = jest.spyOn(window, 'dispatchEvent')
        controller.handleLogout()

        expect(modelMock.logout).toHaveBeenCalled()
        expect(viewMock.showMessage).toHaveBeenCalledWith("Sesión cerrada correctamente", "success")
        setTimeout(() => {
            expect(dispatchSpy).toHaveBeenCalled()
        }, 1000)
    })

    test('getSectionIdFromButtonId devuelve la sección correcta', () => {
        const result = controller.getSectionIdFromButtonId("historial-de-productos-boton-perfil")
        expect(result).toBe("seccion-historial-productos")
    })

    test('handleDataFormSubmit muestra mensaje si falta información', async () => {
        await controller.handleDataFormSubmit({ nombre_completo: "", correo: "" })
        expect(viewMock.showMessage).toHaveBeenCalledWith("Por favor completa todos los campos requeridos", "error")
    })

    test('refreshUserOrders actualiza pedidos y HTML si está en sección activa', async () => {
        controller.currentSection = "seccion-gestion-pedidos"
        modelMock.getUserOrders.mockResolvedValue([{ id: 1 }])
        document.body.innerHTML = '<div id="seccion-gestion-pedidos"></div>'

        viewMock.createOrderManagementHTML.mockReturnValue("<p>Pedido</p>")

        const result = await controller.refreshUserOrders()

        expect(viewMock.createOrderManagementHTML).toHaveBeenCalled()
        expect(result).toBe(true)
    })
})
