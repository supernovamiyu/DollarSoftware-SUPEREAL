// app.js - Punto de entrada principal de la aplicación
import { AppController } from "./controller/app.controller.js"

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando aplicación...")

  try {
    // Crear e inicializar el controlador principal
    const app = new AppController()
    app.init()

    // Exponer funciones globales necesarias para mantener compatibilidad con HTML existente
    window.mostrarPantallaSesion = (event) => {
      if (event) event.preventDefault()
      app.authController.handleUserIconClick()
    }

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
      const baseView = new app.baseView.constructor()
      baseView.showTemplate("plantilla-iniciar-sesion", "container-principal")
    }

    window.mostrarPantallaRegistro = (event) => {
      if (event) event.preventDefault()
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

    // Función para cambiar slides del carrusel
    window.changeSlide = (n) => {
      if (app.carouselView) {
        app.carouselView.changeSlide(n)
      }
    }

    // Función global para mostrar mensajes
    window.mostrarMensaje = (mensaje, tipo) => {
      app.baseView.showMessage(mensaje, tipo)
    }

    console.log("Aplicación inicializada correctamente")
  } catch (error) {
    console.error("Error al inicializar la aplicación:", error)
  }
})

