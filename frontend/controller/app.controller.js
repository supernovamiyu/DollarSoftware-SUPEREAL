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
            const user = this.userModel.getCurrentUser();
            console.log("Usuario autenticado:", user);
            this.authController.view.updateUserInterface(user);
            this.profileController.view.updateProfileInfo(user);
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
        const normalizedPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
        console.log("Manejando ruta:", normalizedPath);

        // Rutas protegidas
        const protectedRoutes = ["/perfil", "/carrito"];
        if (protectedRoutes.includes(normalizedPath)) {
            if (!this.userModel.isAuthenticated()) {
                console.log("Redirigiendo a auth");
                this.navigateTo("/auth");
                return;
            }
        }

        // Redirigir autenticados que intentan acceder a login/register
        if (["/auth", "/login", "/registro"].includes(normalizedPath)) {
            if (this.userModel.isAuthenticated()) {
                console.log("Redirigiendo a perfil");
                this.navigateTo("/perfil");
                return;
            }
        }

        const routeHandler = this.routes[normalizedPath];
        if (routeHandler) {
            routeHandler();
        } else {
            this.handleUnknownRoute(normalizedPath);
        }
    }

    syncAuthState() {
        const isAuthenticated = this.userModel.isAuthenticated();
        const user = isAuthenticated ? this.userModel.getCurrentUser() : null;
        
        // Actualizar todas las vistas que necesitan el estado de autenticación
        this.authController.view.updateUserInterface(user);
        this.profileController.view.updateProfileInfo(user);
        
        // Actualizar la barra de navegación
        this.updateNavbarAuthState(user);
    }

    updateNavbarAuthState(user) {
        const userNavElement = document.querySelector(".user-nav-info");
        if (userNavElement) {
            if (user) {
                userNavElement.textContent = user.nombre_completo.split(" ")[0];
            } else {
                userNavElement.textContent = "Cuenta Personal";
            }
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