    /**
     * Controlador principal de la aplicación
     */
    class AppController {
    /**
     * @param {Object} controllers - Objeto con los controladores de la aplicación
     */
    constructor(controllers) {
        this.controllers = controllers;
        this.setupGlobalEventListeners();
    }

    /**
     * Inicializa la aplicación
     */
    init() {
        // Mostrar la página de inicio por defecto
        this.controllers.homeController.showHomePage();

        // Inicializar el observador de cambios en el DOM
        this.initDOMObserver();
    }

    /**
     * Configura los event listeners globales
     */
    setupGlobalEventListeners() {
        // Event listeners para la navegación principal
        document.addEventListener("click", (event) => {
        const target = event.target.closest("a");
        if (!target) return;

        // Prevenir la navegación por defecto
        if (target.getAttribute("href") === "#") {
            event.preventDefault();
        }

        // Manejar los diferentes enlaces de navegación
        if (target.getAttribute("onclick")) {
            const onclickAttr = target.getAttribute("onclick");

            if (onclickAttr.includes("mostrarPantallaInicio")) {
            event.preventDefault();
            this.controllers.homeController.showHomePage();
            } else if (onclickAttr.includes("mostrarPantallaSesion")) {
            event.preventDefault();
            this.controllers.authController.showAuthOptions();
            } else if (onclickAttr.includes("mostrarPantallaCarrito")) {
            event.preventDefault();
            this.controllers.cartController.showCart();
            } else if (onclickAttr.includes("mostrarPantallaUbicacion")) {
            event.preventDefault();
            this.controllers.locationController.showLocationPage();
            } else if (onclickAttr.includes("mostrarPantallaAtencionCliente")) {
            event.preventDefault();
            this.controllers.customerSupportController.showCustomerSupportPage();
            } else if (onclickAttr.includes("mostrarPantallaInicioSesion")) {
            event.preventDefault();
            this.controllers.authController.showLoginPage();
            } else if (onclickAttr.includes("mostrarPantallaRegistro")) {
            event.preventDefault();
            this.controllers.authController.showRegisterPage();
            }
        }
        });

        // Event listener para la búsqueda
        const searchBar = document.getElementById("search-bar");
        const searchButton = document.getElementById("search-button");

        if (searchButton) {
        searchButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (searchBar) {
            this.controllers.productController.searchProducts(searchBar.value);
            }
        });
        }

        if (searchBar) {
        searchBar.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
            event.preventDefault();
            this.controllers.productController.searchProducts(searchBar.value);
            }
        });
        }
    }

    /**
     * Inicializa el observador de cambios en el DOM
     */
    initDOMObserver() {
        // Crear un nuevo observador
        const observer = new MutationObserver((mutations) => {
        // Para cada mutación
        mutations.forEach((mutation) => {
            // Si se agregaron nodos
            if (mutation.addedNodes.length) {
            // Verificar si hay imágenes de productos y agregar event listeners
            this.controllers.productController.setupProductImageEvents();

            // Verificar si hay botones de agregar al carrito y agregar event listeners
            this.controllers.cartController.setupAddToCartButtons();
            }
        });
        });

        // Configurar el observador para observar cambios en el contenedor principal
        const containerPrincipal = document.getElementById("container-principal");
        if (containerPrincipal) {
        observer.observe(containerPrincipal, { childList: true, subtree: true });
        }
    }
    }

    export default AppController;
