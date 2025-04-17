class AppController {
    constructor(controllers) {
        this.homeController = controllers.homeController
        this.authController = controllers.authController
        this.productController = controllers.productController
        this.cartController = controllers.cartController
        this.locationController = controllers.locationController
        this.customerSupportController = controllers.customerSupportController
        this.profileController = controllers.profileController
        this.userModel = controllers.userModel

        // Mapa de rutas para facilitar la navegación
        this.routes = {
            "/": () => this.homeController.showHomePage(),
            "/auth": () => this.authController.showAuthOptions(),
            "/login": () => this.authController.showLoginPage(),
            "/registro": () => this.authController.showRegisterPage(),
            "/perfil": () => this.profileController.showProfilePage(),
            "/carrito": () => this.cartController.showCart(),
            "/ubicacion": () => this.locationController.showLocationPage(),
            "/ayuda": () => this.customerSupportController.showCustomerSupportPage(),
        }
    }

    init() {
        // Verificar si hay un usuario autenticado
        this.checkAuthStatus()

        // Configurar el manejo de eventos de navegación
        this.setupNavigationEvents()

        // Manejar la ruta inicial basada en la URL actual
        this.handleInitialRoute()
    }

    checkAuthStatus() {
        // Verificar si hay un token en localStorage
        const token = localStorage.getItem("authToken")
        if (token) {
            this.userModel
                .getCurrentUser()
                .then((user) => {
                    if (user) {
                        // Actualizar la interfaz para un usuario autenticado
                        this.authController.updateUserInterface(user)
                    }
                })
                .catch((error) => {
                    console.error("Error al verificar el estado de autenticación:", error)
                    // Si hay un error, eliminar el token
                    localStorage.removeItem("authToken")
                })
        }
    }

    setupNavigationEvents() {
        // Manejar el evento popstate (cuando el usuario usa los botones de navegación del navegador)
        window.addEventListener("popstate", (event) => {
            this.handleRoute(window.location.pathname)
        })
    }

    handleInitialRoute() {
        // Obtener la ruta actual de la URL
        const currentPath = window.location.pathname

        // Manejar la ruta actual
        this.handleRoute(currentPath)
    }

    handleRoute(path) {
        // Normalizar la ruta (eliminar barras finales, etc.)
        const normalizedPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path

        // Buscar la función de manejo para esta ruta
        const routeHandler = this.routes[normalizedPath]

        if (routeHandler) {
            // Si existe un manejador para esta ruta, ejecutarlo
            routeHandler()
        } else {
            // Si no hay un manejador, mostrar la página de inicio por defecto
            console.log(`Ruta no encontrada: ${normalizedPath}, redirigiendo a inicio`)
            this.homeController.showHomePage()

            // Actualizar la URL a la página de inicio
            window.history.replaceState({}, "", "/")
        }
    }

    navigateTo(path) {
        // Actualizar la URL sin recargar la página
        window.history.pushState({}, "", path)

        // Manejar la nueva ruta
        this.handleRoute(path)
    }
}

export default AppController
