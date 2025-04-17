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
            "/atencion-cliente/manejo-pagina": () => this.customerSupportController.showHelpSection("manejo-pagina"),
            "/atencion-cliente/gestion-pedidos": () => this.customerSupportController.showHelpSection("gestion-pedidos"),
            "/atencion-cliente/navegacion-productos": () =>
                this.customerSupportController.showHelpSection("navegacion-productos"),
            "/atencion-cliente/cuenta-ultracommerce": () =>
                this.customerSupportController.showHelpSection("cuenta-ultracommerce"),
        }
    }

    init() {
        this.checkAuthStatus()
        this.setupNavigationEvents()
        this.handleInitialRoute()
    }

    checkAuthStatus() {
        if (this.userModel.isAuthenticated()) {
            const user = this.userModel.getCurrentUser()
            this.authController.view.updateUserInterface(user)
        }
    }

    setupNavigationEvents() {
        window.addEventListener("popstate", (event) => {
            this.handleRoute(window.location.pathname)
        })
        this.setupNavigationHandlers()
    }

    setupNavigationHandlers() {
        const setupHandlers = () => {
            const navLinks = document.querySelectorAll(".barra-navegacion a")
            navLinks.forEach((link) => {
                link.addEventListener("click", (event) => {
                    event.preventDefault()
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
                    this.navigateTo(route)
                })
            })
            this.setupHelpSectionButtons()
        }

        setupHandlers()
        document.addEventListener("DOMContentLoaded", setupHandlers)
    }

    setupHelpSectionButtons() {
        const helpButtons = document.querySelectorAll(".boton-ayuda-individual")
        if (helpButtons.length > 0) {
            helpButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    event.preventDefault()
                    const helpType = button.getAttribute("data-ayuda")
                    if (helpType) {
                        this.navigateTo(`/atencion-cliente/${helpType}`)
                    }
                })
            })
        }
    }

    handleInitialRoute() {
        const currentPath = window.location.pathname
        this.handleRoute(currentPath)
    }

    handleRoute(path) {
        const normalizedPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path
        console.log("Manejando ruta:", normalizedPath)

        const routeHandler = this.routes[normalizedPath]
        if (routeHandler) {
            routeHandler()
            console.log(`Navegando a: ${normalizedPath}`)
        } else {
            this.handleUnknownRoute(normalizedPath)
        }
    }

    handleUnknownRoute(path) {
        if (path.startsWith("/producto/")) {
            const productIdentifier = path.split("/").pop()
            if (productIdentifier) {
                // Pasamos el identificador completo (puede ser ID o slug)
                this.productController.showProductDetails(productIdentifier)
                return
            }
        } else if (path.startsWith("/categoria/")) {
            const category = path.split("/").pop()
            if (category) {
                this.productController.showProductsByCategory(category)
                return
            }
        } else if (path.startsWith("/atencion-cliente/")) {
            const helpSection = path.split("/").pop()
            if (helpSection) {
                this.customerSupportController.showHelpSection(helpSection)
                return
            }
        }

        console.log(`Ruta no encontrada: ${path}, redirigiendo a inicio`)
        this.homeController.showHomePage()
        window.history.replaceState({}, "", "/")
    }

    navigateTo(path) {
        window.history.pushState({}, "", path)
        this.handleRoute(path)
    }
}

export default AppController