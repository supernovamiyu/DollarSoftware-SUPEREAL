// app.js - Punto de entrada principal de la aplicación
import { AppController } from "./controller/app.controller.js"

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando aplicación...")

  try {
    // Crear e inicializar el controlador principal
    const app = new AppController()
    app.init()

    // Exponer funciones globales necesarias
    window.mostrarPantallaSesion = (event) => {
      if (event) event.preventDefault()
      app.authController.handleUserIconClick()
    }

    window.mostrarDetalleProducto = (productId) => {
      app.productController.loadProductDetails(productId)
    }

    window.agregarAlCarrito = (productId) => {
      app.cartController.addToCart(productId)
    }

    window.mostrarProductosDestacados = () => {
      app.productController.loadFeaturedProducts()
    }

    window.mostrarDetallesAyuda = (helpType) => {
      app.helpController.showHelpDetails(helpType)
    }

    window.initCarouselAfterTemplateLoad = () => {
      app.carouselView.initCarouselAfterTemplateLoad()
    }

    // Crear una instancia global de Vista para compatibilidad con código existente
    window.Vista = class Vista {
      mostrarPlantilla(plantilla, destino) {
        console.log(`Intentando mostrar plantilla: ${plantilla} en ${destino}`)
        const baseView = new app.baseView.constructor()
        const result = baseView.showTemplate(plantilla, destino)

        // Si se muestra la plantilla de inicio, cargar productos destacados
        if (result && plantilla === "plantilla-inicio") {
          window.mostrarProductosDestacados()
        }

        return result
      }
    }

    // Función global para mostrar mensajes
    window.mostrarMensaje = (mensaje, tipo) => {
      app.baseView.showMessage(mensaje, tipo)
    }

    // Compatibilidad con funciones existentes
    window.mostrarPantallaInicio = (event) => {
      if (event) event.preventDefault()
      app.loadHomePage()
    }

    window.mostrarPantallaUbicacion = (event) => {
      if (event) event.preventDefault()
      app.storeController.showStoreLocator()
    }

    window.mostrarPantallaAtencionCliente = (event) => {
      if (event) event.preventDefault()
      app.helpController.showHelpScreen()
    }

    window.mostrarPantallaCarrito = (event) => {
      if (event) event.preventDefault()
      app.cartController.displayCart()
    }

    window.mostrarPantallaInicioSesion = (event) => {
      if (event) event.preventDefault()
      app.authController.showAuthScreen()
    }

    window.mostrarPantallaRegistro = (event) => {
      if (event) event.preventDefault()
      // Mostrar la plantilla de registro
      const baseView = new app.baseView.constructor()
      baseView.showTemplate("plantilla-registro", "container-principal")
    }

    window.mostrarPantallaCategoriasProductos = (event) => {
      if (event) event.preventDefault()
      const categoria = event.currentTarget.getAttribute("data-categoria")
      if (categoria) {
        app.productController.loadProductsByCategory(categoria)
      }
    }

    console.log("Aplicación inicializada correctamente")
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error)
  }
})




