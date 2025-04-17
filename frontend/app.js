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
    appController.navigateTo("/ayuda")
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


})
