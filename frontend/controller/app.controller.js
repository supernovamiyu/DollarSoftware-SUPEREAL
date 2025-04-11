/**
 * Controlador principal de la aplicación
 */
class AppController {
  /**
   * @param {Object} controllers - Objeto con los controladores de la aplicación
   */
  constructor(controllers) {
    this.controllers = controllers
    this.currentPath = window.location.pathname
    this.setupGlobalEventListeners()
    this.setupRouter()
  }

  /**
   * Inicializa la aplicación
   */
  init() {
    // Manejar la ruta inicial
    this.handleRouteChange()
  }

  /**
   * Configura el sistema de enrutamiento
   */
  setupRouter() {
    // Manejar cambios de ruta (back/forward)
    window.addEventListener("popstate", () => this.handleRouteChange())

    // Escuchar eventos personalizados de cambio de URL
    window.addEventListener("urlChanged", () => this.handleRouteChange())
  }

  /**
   * Maneja los cambios de ruta
   */
  handleRouteChange() {
    const path = window.location.pathname
    const searchParams = new URLSearchParams(window.location.search)

    // Evitar manejar la misma ruta dos veces
    if (path === this.currentPath) return

    this.currentPath = path
    console.log(`Navegando a: ${path}`)

    // Determinar qué vista mostrar basado en la ruta
    if (path === "/" || path === "/inicio") {
      this.controllers.homeController.showHomePage()
    } else if (path === "/auth" || path === "/sesion") {
      this.controllers.authController.showAuthOptions()
    } else if (path === "/login" || path === "/iniciar-sesion") {
      this.controllers.authController.showLoginPage()
    } else if (path === "/registro") {
      this.controllers.authController.showRegisterPage()
    } else if (path === "/carrito") {
      this.controllers.cartController.showCart()
    } else if (path === "/ubicacion") {
      this.controllers.locationController.showLocationPage()
    } else if (path === "/atencion-cliente") {
      this.controllers.customerSupportController.showCustomerSupportPage()
    } else if (path.startsWith("/atencion-cliente/")) {
      const helpType = path.split("/")[2]
      this.controllers.customerSupportController.showHelpDetails(helpType)
    } else if (path.startsWith("/categoria/")) {
      const categoryId = path.split("/")[2]
      this.controllers.productController.showProductsByCategory(categoryId)
    } else if (path.startsWith("/busqueda")) {
      const searchTerm = searchParams.get("q") || ""
      this.controllers.productController.searchProducts(searchTerm)
    } else if (path.startsWith("/producto/")) {
      const productName = path.split("/")[2]
      this.controllers.productController.showProductDetails(decodeURIComponent(productName))
    } else {
      // Ruta no encontrada - podrías mostrar una vista 404
      console.warn(`Ruta no encontrada: ${path}`)
      this.controllers.homeController.showHomePage()
    }
  }

  /**
   * Navega a una nueva ruta
   * @param {string} path - Ruta de destino
   * @param {Object} state - Estado para asociar a la ruta
   */
  navigateTo(path, state = {}) {
    // Normalizar la ruta
    if (!path.startsWith("/")) {
      path = `/${path}`
    }

    // Solo actualizar si es una nueva ruta
    if (path !== this.currentPath) {
      window.history.pushState(state, "", path)
      this.handleRouteChange()
    }
  }

  /**
   * Configura los event listeners globales
   */
  setupGlobalEventListeners() {
    // Event listeners para la navegación principal
    document.addEventListener("click", (event) => {
      const target = event.target.closest("a")
      if (!target) return

      // Si el enlace tiene un manejador onclick específico, no interferir con él
      if (target.hasAttribute("onclick")) {
        // No prevenir el comportamiento por defecto aquí
        // Solo manejar la navegación si no es un enlace de autenticación
        const onclickAttr = target.getAttribute("onclick")
        if (!onclickAttr.includes("mostrarPantallaInicioSesion") && !onclickAttr.includes("mostrarPantallaRegistro")) {
          // Prevenir la navegación por defecto para otros enlaces internos
          if (target.getAttribute("href") === "#") {
            event.preventDefault()
          }

          // Mapear funciones onclick a rutas
          const routeMap = {
            mostrarPantallaInicio: "/",
            mostrarPantallaSesion: "/auth",
            mostrarPantallaCarrito: "/carrito",
            mostrarPantallaUbicacion: "/ubicacion",
            mostrarPantallaAtencionCliente: "/atencion-cliente",
          }

          for (const [func, route] of Object.entries(routeMap)) {
            if (onclickAttr.includes(func)) {
              event.preventDefault()
              this.navigateTo(route)
              break
            }
          }
        }
      }
    })

    // Event listener para la búsqueda
    const searchBar = document.getElementById("search-bar")
    const searchButton = document.getElementById("search-button")

    if (searchButton) {
      searchButton.addEventListener("click", (event) => {
        event.preventDefault()
        if (searchBar && searchBar.value.trim()) {
          this.navigateTo(`/busqueda?q=${encodeURIComponent(searchBar.value.trim())}`)
        }
      })
    }

    if (searchBar) {
      searchBar.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && searchBar.value.trim()) {
          event.preventDefault()
          this.navigateTo(`/busqueda?q=${encodeURIComponent(searchBar.value.trim())}`)
        }
      })
    }
  }
}

export default AppController
