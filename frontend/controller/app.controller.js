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
            "/atencion-cliente": () => this.customerSupportController.showCustomerSupportPage(),
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

        // Reemplazar los manejadores de eventos de navegación existentes
        this.setupNavigationHandlers()
    }

    setupNavigationHandlers() {
        // Obtener todos los enlaces de navegación
        const navLinks = document.querySelectorAll(".barra-navegacion a")

        // Configurar cada enlace para usar el sistema de rutas
        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault()

                // Determinar la ruta basada en el atributo onclick
                let route = "/"
                if (link.getAttribute("onclick")?.includes("mostrarPantallaUbicacion")) {
                    route = "/ubicacion"
                } else if (link.getAttribute("onclick")?.includes("mostrarPantallaAtencionCliente")) {
                    route = "/atencion-cliente"
                } else if (link.getAttribute("onclick")?.includes("mostrarPantallaInicio")) {
                    route = "/"
                } else if (link.getAttribute("onclick")?.includes("mostrarPantallaCarrito")) {
                    route = "/carrito"
                } else if (link.getAttribute("onclick")?.includes("mostrarPantallaSesion")) {
                    route = "/auth"
                }

                // Navegar a la ruta
                this.navigateTo(route)
            })
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
            console.log(`Navegando a: ${normalizedPath}`)
        } else {
            // Si no hay un manejador específico, intentar determinar la ruta
            this.handleUnknownRoute(normalizedPath)
        }
    }

    handleUnknownRoute(path) {
        // Intentar determinar la ruta basada en patrones
        if (path.startsWith("/producto/")) {
            // Extraer el ID del producto de la URL
            const productId = path.split("/").pop()
            if (productId) {
                this.productController.showProductDetail(productId)
                return
            }
        } else if (path.startsWith("/categoria/")) {
            // Extraer la categoría de la URL
            const category = path.split("/").pop()
            if (category) {
                this.productController.showProductsByCategory(category)
                return
            }
        }

        // Si no se puede determinar la ruta, mostrar la página de inicio
        console.log(`Ruta no encontrada: ${path}, redirigiendo a inicio`)
        this.homeController.showHomePage()

        // Actualizar la URL a la página de inicio sin recargar
        window.history.replaceState({}, "", "/")
    }

    navigateTo(path) {
        // Actualizar la URL sin recargar la página
        window.history.pushState({}, "", path)

        // Manejar la nueva ruta
        this.handleRoute(path)
    }
}

export default AppController
