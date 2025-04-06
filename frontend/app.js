// app.js - Punto de entrada principal de la aplicación
import { AppController } from "./controllers/AppController.js"

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
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
})


