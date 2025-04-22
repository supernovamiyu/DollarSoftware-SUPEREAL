// Importamos el controlador a probar
import ProfileController from '../profile.controller';

// Mock del modelo y la vista para las pruebas
const mockModel = {
    isAuthenticated: jest.fn(),
    getCurrentUser: jest.fn(),
    getUserOrders: jest.fn(),
    logout: jest.fn(),
    updateUserData: jest.fn()
};

const mockView = {
    controller: null,
    showProfilePage: jest.fn(),
    showMessage: jest.fn(),
    updateProfileInfo: jest.fn(),
    showProfileSection: jest.fn(),
    setupProfileButtons: jest.fn(),
    setupDataForm: jest.fn(),
    createOrderManagementHTML: jest.fn()
};

// Mock de console
const originalConsole = global.console;
global.console = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

// Mock de eventos globales
window.dispatchEvent = jest.fn();
document.dispatchEvent = jest.fn();
document.getElementById = jest.fn();

// Mock para window.location
delete window.location;
window.location = {
    pathname: '/',
    assign: jest.fn()
};

describe('ProfileController', () => {
    let controller;

    beforeEach(() => {
        // Limpiamos todos los mocks antes de cada prueba
        jest.clearAllMocks();

        // Creamos una nueva instancia del controlador para cada prueba
        controller = new ProfileController(mockModel, mockView);

        // Configuramos algunos mocks por defecto
        mockModel.isAuthenticated.mockReturnValue(true);
        mockModel.getCurrentUser.mockReturnValue({ id: 1, name: 'Test User' });
        mockView.showProfilePage.mockReturnValue(true);
        document.getElementById.mockImplementation((id) => {
            if (id === 'logoutButton') return { addEventListener: jest.fn() };
            if (id === 'seccion-gestion-pedidos') return { innerHTML: '' };
            return null;
        });
    });

    afterAll(() => {
        // Restauramos console original
        global.console = originalConsole;
    });

    describe('Constructor', () => {
        test('debería inicializar correctamente con modelo y vista', () => {
            expect(controller.model).toBe(mockModel);
            expect(controller.view).toBe(mockView);
            expect(controller.view.controller).toBe(controller);
        });
    });

    describe('showProfilePage', () => {
        test('debería redirigir a auth si el usuario no está autenticado', async () => {
            mockModel.isAuthenticated.mockReturnValue(false);

            await controller.showProfilePage();

            expect(mockModel.isAuthenticated).toHaveBeenCalled();
            expect(mockView.showMessage).toHaveBeenCalledWith(
                "Debes iniciar sesión para acceder al perfil",
                "warning"
            );
            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'navigateTo',
                    detail: { path: "/auth" }
                })
            );
        });

        test('no debería mostrar mensaje si ya estamos en la página de auth', async () => {
            mockModel.isAuthenticated.mockReturnValue(false);
            // Simulamos que estamos en la página de auth
            window.location.pathname = '/auth';

            await controller.showProfilePage();

            expect(mockView.showMessage).not.toHaveBeenCalled();
        });

        test('debería cargar datos del usuario y configurar eventos cuando está autenticado', async () => {
            await controller.showProfilePage();

            expect(mockModel.getCurrentUser).toHaveBeenCalled();
            expect(mockView.showProfilePage).toHaveBeenCalledWith({ id: 1, name: 'Test User' });
            expect(mockView.updateProfileInfo).toHaveBeenCalledWith({ id: 1, name: 'Test User' });
            expect(mockView.setupProfileButtons).toHaveBeenCalled();

            // Verificamos que se configuró el evento para el botón de logout
            expect(document.getElementById).toHaveBeenCalledWith('logoutButton');
        });

        test('debería manejar errores al cargar datos del usuario', async () => {
            const error = new Error('Error de prueba');
            mockModel.getUserOrders.mockRejectedValue(error);

            await controller.showProfilePage();

            expect(console.error).toHaveBeenCalledWith("Error al cargar perfil:", error);
            expect(mockView.showMessage).toHaveBeenCalledWith(
                "Error al cargar datos del perfil",
                "error"
            );
        });
    });

    describe('loadUserData', () => {
        test('debería cargar los pedidos del usuario correctamente', async () => {
            const mockOrders = [{ id: 1, product: 'Producto 1' }];
            mockModel.getUserOrders.mockResolvedValue(mockOrders);

            await controller.loadUserData();

            expect(mockModel.getUserOrders).toHaveBeenCalled();
            expect(controller.userOrders).toEqual(mockOrders);
        });

        test('debería manejar errores al cargar pedidos', async () => {
            const error = new Error('Error de prueba');
            mockModel.getUserOrders.mockRejectedValue(error);

            await expect(controller.loadUserData()).rejects.toThrow(error);
            expect(controller.userOrders).toEqual([]);
        });
    });

    describe('handleLogout', () => {
        test('debería cerrar sesión y redirigir a auth', () => {
            jest.useFakeTimers();

            controller.handleLogout();

            expect(mockModel.logout).toHaveBeenCalled();
            expect(mockView.showMessage).toHaveBeenCalledWith(
                "Sesión cerrada correctamente",
                "success"
            );

            // Avanzamos el tiempo para probar el setTimeout
            jest.advanceTimersByTime(1000);

            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'navigateTo',
                    detail: { path: "/auth" }
                })
            );

            jest.useRealTimers();
        });
    });

    describe('handleProfileButtonClick', () => {
        test('debería mostrar la sección correcta según el botón', () => {
            jest.useFakeTimers();

            controller.handleProfileButtonClick("gestion-de-pedidos-boton-perfil");

            expect(controller.currentSection).toBe("seccion-gestion-pedidos");
            expect(mockView.showProfileSection).toHaveBeenCalledWith("seccion-gestion-pedidos");

            // Avanzamos el tiempo para probar el setTimeout
            jest.advanceTimersByTime(300);

            expect(document.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'profileSectionLoaded',
                    detail: "seccion-gestion-pedidos"
                })
            );

            jest.useRealTimers();
        });

        test('no debería hacer nada si el botón no tiene sección asociada', () => {
            controller.handleProfileButtonClick("boton-invalido");

            expect(controller.currentSection).toBeNull();
            expect(mockView.showProfileSection).not.toHaveBeenCalled();
            expect(document.dispatchEvent).not.toHaveBeenCalled();
        });
    });

    describe('getSectionIdFromButtonId', () => {
        test('debería mapear correctamente los botones a secciones', () => {
            expect(controller.getSectionIdFromButtonId("gestion-de-pedidos-boton-perfil"))
                .toBe("seccion-gestion-pedidos");
            expect(controller.getSectionIdFromButtonId("historial-de-productos-boton-perfil"))
                .toBe("seccion-historial-productos");
            expect(controller.getSectionIdFromButtonId("agregar-o-modificar-datos-boton-perfil"))
                .toBe("seccion-modificar-datos");
            expect(controller.getSectionIdFromButtonId("boton-invalido")).toBe("");
        });
    });

    describe('handleDataFormSubmit', () => {
        test('debería validar datos antes de enviar', async () => {
            const formData = { nombre_completo: '', correo: '' };

            await controller.handleDataFormSubmit(formData);

            expect(mockView.showMessage).toHaveBeenCalledWith(
                "Por favor completa todos los campos requeridos",
                "error"
            );
            expect(mockModel.updateUserData).not.toHaveBeenCalled();
        });

        test('debería actualizar datos cuando el formulario es válido', async () => {
            const formData = { nombre_completo: 'Nuevo Nombre', correo: 'nuevo@email.com' };
            const mockResult = { success: true, user: { id: 1, name: 'Nuevo Nombre' } };
            mockModel.updateUserData.mockResolvedValue(mockResult);

            await controller.handleDataFormSubmit(formData);

            expect(mockModel.updateUserData).toHaveBeenCalledWith(formData);
            expect(mockView.showMessage).toHaveBeenCalledWith(
                "¡Datos actualizados correctamente!",
                "success"
            );
            expect(mockView.updateProfileInfo).toHaveBeenCalledWith(mockResult.user);
            expect(window.dispatchEvent).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'userDataUpdated',
                    detail: mockResult.user
                })
            );
        });

        test('debería manejar errores del servidor', async () => {
            const formData = { nombre_completo: 'Nuevo Nombre', correo: 'nuevo@email.com' };
            const mockResult = { success: false, error: "Error del servidor" };
            mockModel.updateUserData.mockResolvedValue(mockResult);

            await controller.handleDataFormSubmit(formData);

            expect(mockView.showMessage).toHaveBeenCalledWith(
                "Error del servidor",
                "error"
            );
        });

        test('debería manejar errores de conexión', async () => {
            const formData = { nombre_completo: 'Nuevo Nombre', correo: 'nuevo@email.com' };
            const error = new Error("Error de conexión");
            mockModel.updateUserData.mockRejectedValue(error);

            await controller.handleDataFormSubmit(formData);

            expect(mockView.showMessage).toHaveBeenCalledWith(
                "Error de conexión con el servidor",
                "error"
            );
        });
    });

    describe('refreshUserOrders', () => {
        test('debería actualizar la lista de pedidos correctamente', async () => {
            const mockOrders = [{ id: 1, product: 'Producto 1' }];
            mockModel.getUserOrders.mockResolvedValue(mockOrders);
            controller.currentSection = "seccion-gestion-pedidos";
            mockView.createOrderManagementHTML.mockReturnValue('<div>Mock HTML</div>');

            const result = await controller.refreshUserOrders();

            expect(result).toBe(true);
            expect(controller.userOrders).toEqual(mockOrders);
            expect(mockView.createOrderManagementHTML).toHaveBeenCalledWith(mockOrders);
        });

        test('debería manejar errores al actualizar pedidos', async () => {
            const error = new Error("Error de prueba");
            mockModel.getUserOrders.mockRejectedValue(error);

            const result = await controller.refreshUserOrders();

            expect(result).toBe(false);
            expect(mockView.showMessage).toHaveBeenCalledWith(
                "Error al actualizar la lista de pedidos",
                "error"
            );
        });
    });
});