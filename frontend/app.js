// Importar modelos
import UserModel from "./model/user.model.js"
import ProductModel from "./model/product.model.js"
import CartModel from "./model/cart.model.js"
import LocationModel from "./model/location.model.js"

// Importar vistas
import BaseView from "./view/base.view.js"
import HomeView from "./view/home.view.js"
import AuthView from "./view/auth.view.js"
import ProductView from "./view/product.view.js"
import CartView from "./view/cart.view.js"
import LocationView from "./view/location.view.js"
import CustomerSupportView from "./view/help.view.js"
import ProfileView from "./view/profile.view.js"

// Importar controladores
import AppController from "./controller/app.controller.js"
import AuthController from "./controller/auth.controller.js"
import ProductController from "./controller/product.controller.js"
import CartController from "./controller/cart.controller.js"
import HomeController from "./controller/home.controller.js"
import LocationController from "./controller/location.controller.js"
import CustomerSupportController from "./controller/help.controller.js"
import ProfileController from "./controller/profile.controller.js"

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar modelos
  const userModel = new UserModel()

  // Verificación de sesión iniciada

  if (userModel.isAuthenticated()) {

    const user = userModel.getCurrentUser();
    console.log('Usuario autenticado al cargar: ', user)
  
  }
  const productModel = new ProductModel()
  const cartModel = new CartModel()
  const locationModel = new LocationModel()

  // Inicializar vistas
  const baseView = new BaseView()
  const homeView = new HomeView()
  const authView = new AuthView()
  const productView = new ProductView()
  const cartView = new CartView()
  const locationView = new LocationView()
  const customerSupportView = new CustomerSupportView()
  const profileView = new ProfileView()

  // Inicializar controladores
  const productController = new ProductController(productModel, productView)
  const homeController = new HomeController(homeView, productController)
  const authController = new AuthController(userModel, authView)
  const cartController = new CartController(cartModel, cartView, productModel)
  const locationController = new LocationController(locationModel, locationView)
  const customerSupportController = new CustomerSupportController(customerSupportView)
  const profileController = new ProfileController(userModel, profileView)

  // Inicializar el controlador principal
  const appController = new AppController({
    homeController,
    authController,
    productController,
    cartController,
    locationController,
    customerSupportController,
    profileController,
    userModel,
  })

  // Iniciar la aplicación
  appController.init()

  // Exponer funciones globales necesarias
  window.mostrarMensaje = baseView.showMessage.bind(baseView)

  // Configurar eventos personalizados
  window.addEventListener("showHomePage", () => appController.navigateTo("/"))
  window.addEventListener("showAuthOptions", () => appController.navigateTo("/auth"))
  window.addEventListener("logout", () => authController.handleLogout())

  // Configurar evento para verificar autenticación en cada navegación
  window.addEventListener('navigateTo', (event) => {
    if (event.detail && event.detail.path) {
      console.log('Navegando a: ', event.detail.path);
      appController.navigateTo(event.detail.path);

      // Verificar autenticación después de navegar
      setTimeout(() => {
        appController.checkAuthStatus();
      }, 100)
    }
  })

  // Configurar el formulario de búsqueda
  setupSearchForm(productController)

  // Reemplazar las funciones globales existentes con funciones que usan el sistema de rutas
  window.mostrarPantallaInicio = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/")
  }

  window.mostrarPantallaSesion = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/auth")
  }

  window.mostrarPantallaCarrito = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/carrito")
  }

  window.mostrarPantallaUbicacion = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/ubicacion")
  }

  window.mostrarPantallaAtencionCliente = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/atencion-cliente")
  }

  // Asegurarnos de que las funciones de navegación para autenticación estén correctamente definidas
  window.mostrarPantallaInicioSesion = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/login")
  }

  window.mostrarPantallaRegistro = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/registro")
  }

  window.mostrarPantallaPerfil = (event) => {
    if (event) event.preventDefault()
    appController.navigateTo("/perfil")
  }

  // Verificar si hay un usuario autenticado al cargar la página
  if (userModel.isAuthenticated()) {
    const user = userModel.getCurrentUser()
    authView.updateUserInterface(user)
  }
})

/**
 * Configura el formulario de búsqueda
 * @param {Object} productController - Controlador de productos
 */
function setupSearchForm(productController) {
  // Configurar el formulario de búsqueda cuando el DOM esté listo
  const setupForm = () => {
    const searchForm = document.querySelector(".search form")
    const searchInput = document.getElementById("search-bar")

    if (searchForm && searchInput) {
      console.log("Configurando formulario de búsqueda")

      // Eliminar event listeners previos para evitar duplicados
      const newForm = searchForm.cloneNode(true)
      searchForm.parentNode.replaceChild(newForm, searchForm)

      // Obtener la nueva referencia al input
      const newSearchInput = document.getElementById("search-bar")

      // Agregar event listener al nuevo formulario
      newForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const searchTerm = newSearchInput.value.trim()

        console.log("Búsqueda enviada:", searchTerm)

        if (searchTerm.length >= 3) {
          productController.searchProducts(searchTerm)
        } else {
          window.mostrarMensaje("Ingresa al menos 3 caracteres para buscar", "warning")
        }
      })
    } else {
      console.warn("Formulario de búsqueda no encontrado, intentando de nuevo en 500ms")
      setTimeout(setupForm, 500) // Reintentar si no se encuentra el formulario
    }
  }

  // Intentar configurar el formulario inmediatamente
  setupForm()

  // También configurar cuando cambie la URL (para asegurar que funcione después de navegar)
  window.addEventListener("popstate", setupForm)
  window.addEventListener("urlChanged", setupForm)

  // Configurar después de cada navegación
  document.addEventListener("DOMContentLoaded", setupForm)
}
