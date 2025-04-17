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
            // Añadir rutas específicas para cada sección de atención al cliente
            "/atencion-cliente/manejo-pagina": () => this.customerSupportController.showHelpSection("manejo-pagina"),
            "/atencion-cliente/gestion-pedidos": () => this.customerSupportController.showHelpSection("gestion-pedidos"),
            "/atencion-cliente/navegacion-productos": () =>
                this.customerSupportController.showHelpSection("navegacion-productos"),
            "/atencion-cliente/cuenta-ultracommerce": () =>
                this.customerSupportController.showHelpSection("cuenta-ultracommerce"),
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
        // Verificar si hay un usuario autenticado
        if (this.userModel.isAuthenticated()) {
            const user = this.userModel.getCurrentUser()
            this.authController.view.updateUserInterface(user)
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
        // Configurar después de que el DOM esté completamente cargado
        const setupHandlers = () => {
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

            // Configurar los botones de ayuda en la sección de atención al cliente
            this.setupHelpSectionButtons()
        }

        // Intentar configurar inmediatamente
        setupHandlers()

        // También configurar cuando el DOM esté completamente cargado
        document.addEventListener("DOMContentLoaded", setupHandlers)
    }

    setupHelpSectionButtons() {
        // Buscar todos los botones de ayuda
        const helpButtons = document.querySelectorAll(".boton-ayuda-individual")

        if (helpButtons.length > 0) {
            console.log("Configurando botones de sección de ayuda:", helpButtons.length)

            helpButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    event.preventDefault()

                    // Obtener el tipo de ayuda del atributo data-ayuda
                    const helpType = button.getAttribute("data-ayuda")
                    if (helpType) {
                        // Navegar a la ruta específica de esa sección de ayuda
                        this.navigateTo(`/atencion-cliente/${helpType}`)
                    }
                })
            })
        }
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

        console.log("Manejando ruta:", normalizedPath)

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
        } else if (path.startsWith("/atencion-cliente/")) {
            // Si es una ruta de atención al cliente pero no está en las rutas conocidas
            // Extraer la sección de ayuda
            const helpSection = path.split("/").pop()
            if (helpSection) {
                this.customerSupportController.showHelpSection(helpSection)
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

