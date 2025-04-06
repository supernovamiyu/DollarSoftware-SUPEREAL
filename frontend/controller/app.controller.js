// AppController.js - Controlador principal de la aplicación

import { UserModel } from "../models/UserModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { CartModel } from "../models/CartModel.js";
import { OpinionModel } from "../models/OpinionModel.js";
import { StoreModel } from "../models/StoreModel.js";
import { OrderModel } from "../models/OrderModel.js";

import { BaseView } from "../views/BaseView.js";
import { AuthView } from "../views/AuthView.js";
import { ProductView } from "../views/ProductView.js";
import { CartView } from "../views/CartView.js";
import { StoreView } from "../views/StoreView.js";
import { HelpView } from "../views/HelpView.js";
import { CarouselView } from "../views/CarouselView.js";

import { AuthController } from "./AuthController.js";
import { ProductController } from "./ProductController.js";
import { CartController } from "./CartController.js";
import { StoreController } from "./StoreController.js";
import { HelpController } from "./HelpController.js";

class AppController {
    constructor() {
    // Inicializar modelos
    this.userModel = new UserModel();
    this.productModel = new ProductModel();
    this.cartModel = new CartModel();
    this.opinionModel = new OpinionModel();
    this.storeModel = new StoreModel();
    this.orderModel = new OrderModel(this.userModel, this.cartModel);

    // Inicializar vistas
    this.baseView = new BaseView();
    this.authView = new AuthView();
    this.productView = new ProductView();
    this.cartView = new CartView();
    this.storeView = new StoreView();
    this.helpView = new HelpView();
    this.carouselView = new CarouselView();

    // Inicializar controladores
    this.authController = new AuthController(this.userModel, this.authView);
    this.productController = new ProductController(
        this.productModel,
        this.opinionModel,
        this.productView
    );
    this.cartController = new CartController(
        this.cartModel,
        this.userModel,
        this.orderModel,
        this.cartView
    );
    this.storeController = new StoreController(this.storeModel, this.storeView);
    this.helpController = new HelpController(this.helpView);

    // Configurar eventos globales
    this.setupEventListeners();
    }

  // Inicializar la aplicación
    init() {
    console.log("Inicializando aplicación...");

    // Verificar si hay una sesión de usuario
    if (this.userModel.isLoggedIn()) {
        this.authView.updateUserInterface(this.userModel.getCurrentUser());
    }

    // Configurar eventos para los elementos que ya existen en el DOM
    this.setupInitialEvents();

    // Cargar la página de inicio si estamos en la ruta principal
    if (
        window.location.pathname === "/" ||
        window.location.pathname === "/index.html"
    ) {
        this.loadHomePage();
    } else {
      // Manejar otras rutas (implementación futura)
        this.handleRoutes();
    }
    }

  // Cargar la página de inicio
    loadHomePage() {
    // Mostrar la plantilla de inicio
    const vista = new BaseView();
    vista.showTemplate("plantilla-inicio", "container-principal");

    // Cargar productos destacados
    this.productController.loadFeaturedProducts();

    // Inicializar el carrusel si existe
        setTimeout(() => {
        this.carouselView.tryInitCarousel();
        }, 100);
    }

    // Manejar rutas de la aplicación
    handleRoutes() {
        const path = window.location.pathname;

        // Extraer la ruta principal
        const mainPath = path.split("/")[1];

        switch (mainPath) {
        case "categoria":
            const category = path.split("/")[2];
            if (category) {
            this.productController.loadProductsByCategory(category);
            }
            break;

        case "producto":
            const productId = path.split("/")[2];
            if (productId) {
            this.productController.loadProductDetails(productId);
            }
            break;

        case "search":
            const searchParams = new URLSearchParams(window.location.search);
            const query = searchParams.get("q");
            if (query) {
            this.productController.searchProducts(query);
            }
            break;

        case "carrito":
            this.cartController.displayCart();
            break;

        case "checkout":
            this.cartController.showCheckout();
            break;

        case "perfil":
            this.authController.showProfileScreen();
            break;

        case "ubicacion":
            this.storeController.showStoreLocator();
            break;

        case "atencion-cliente":
            const helpType = path.split("/")[2];
            if (helpType) {
            this.helpController.showHelpDetails(helpType);
            } else {
            this.helpController.showHelpScreen();
            }
            break;

        default:
            // Si no coincide con ninguna ruta conocida, cargar la página de inicio
            this.loadHomePage();
        }
    }

    // Configurar eventos iniciales
    setupInitialEvents() {
        // Configurar evento para el botón de inicio
        const homeButton = document.getElementById("boton-inicio");
        if (homeButton) {
        homeButton.addEventListener("click", () => {
            this.baseView.updateURL("/");
            this.loadHomePage();
        });
        }

        // Configurar evento para el icono de usuario
        const userIcon = document.querySelector(".fa-user");
        if (userIcon) {
        userIcon.parentElement.addEventListener("click", (event) => {
            event.preventDefault();
            this.authController.handleUserIconClick();
        });
        }

        // Configurar evento para el icono de carrito
        const cartIcon = document.querySelector(".fa-cart-shopping");
        if (cartIcon) {
        cartIcon.parentElement.addEventListener("click", (event) => {
            event.preventDefault();
            this.cartController.displayCart();
        });
        }

        // Configurar evento para el icono de ubicación
        const locationIcon = document.getElementById("icono-ubicacion");
        if (locationIcon) {
        locationIcon.addEventListener("click", () => {
            this.storeController.showStoreLocator();
        });
        }

        // Configurar evento para la búsqueda
        const searchBar = document.getElementById("search-bar");
        const searchButton = document.getElementById("search-button");

        if (searchButton && searchBar) {
        searchButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.productController.searchProducts(searchBar.value);
        });

        searchBar.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
            event.preventDefault();
            this.productController.searchProducts(searchBar.value);
            }
        });
        }
    }

    // Configurar eventos globales
    setupEventListeners() {
        // Usar event delegation para manejar clics en botones de categoría
        document.addEventListener("click", (event) => {
        const categoryButton = event.target.closest("[data-categoria]");
        if (categoryButton) {
            event.preventDefault();
            const category = categoryButton.getAttribute("data-categoria");
            this.productController.loadProductsByCategory(category);
        }

        // Manejar clics en imágenes de productos
        const productImage = event.target.closest("#imagen-individual-producto");
        if (productImage) {
            event.preventDefault();
            const productId =
            productImage.getAttribute("data-id") ||
            productImage.closest("[data-id]")?.getAttribute("data-id");
            if (productId) {
            this.productController.loadProductDetails(productId);
            }
        }

        // Manejar clics en botones de agregar al carrito
        const addToCartButton = event.target.closest(".comprar");
        if (addToCartButton) {
            event.preventDefault();
            const productId = addToCartButton.getAttribute("data-id");
            if (productId) {
            this.cartController.addToCart(productId);
            }
        }

        // Manejar clics en botones de ayuda
        const helpButton = event.target.closest("[data-help-type]");
        if (helpButton) {
            event.preventDefault();
            const helpType = helpButton.getAttribute("data-help-type");
            this.helpController.showHelpDetails(helpType);
        }
        });

        // Manejar cambios en la URL (navegación por historial)
        window.addEventListener("popstate", () => {
        this.handleRoutes();
        });
    }
    }

export { AppController };
