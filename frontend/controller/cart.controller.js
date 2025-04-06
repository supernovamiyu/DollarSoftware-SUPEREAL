    // CartController.js - Controlador para el carrito de compras

    class CartController {
    constructor(cartModel, userModel, orderModel, cartView) {
        this.cartModel = cartModel;
        this.userModel = userModel;
        this.orderModel = orderModel;
        this.view = cartView;

        // Configurar manejadores de eventos
        this.setupEventHandlers();
    }

    // Configurar manejadores de eventos
    setupEventHandlers() {
        // Usar event delegation para los botones del carrito
        document.addEventListener("click", (event) => {
        // Botón de aumentar cantidad
        if (event.target.classList.contains("btn-mas")) {
            const productId = event.target.getAttribute("data-id");
            if (productId) {
            this.increaseQuantity(productId);
            }
        }

        // Botón de disminuir cantidad
        else if (event.target.classList.contains("btn-menos")) {
            const productId = event.target.getAttribute("data-id");
            if (productId) {
            this.decreaseQuantity(productId);
            }
        }

        // Botón de eliminar producto
        else if (event.target.closest(".btn-eliminar")) {
            const productId = event.target
            .closest(".btn-eliminar")
            .getAttribute("data-id");
            if (productId) {
            this.removeFromCart(productId);
            }
        }

        // Botón de seguir comprando
        else if (event.target.id === "seguir-comprando") {
            event.preventDefault();
            window.history.back();
        }

        // Botón de proceder al pago
        else if (event.target.id === "btn-checkout") {
            event.preventDefault();
            this.showCheckout();
        }

        // Botón de procesar pago
        else if (event.target.id === "btn-process-payment") {
            event.preventDefault();
            this.processPayment();
        }

        // Botón de volver al inicio (después del pago exitoso)
        else if (event.target.id === "volver-inicio") {
            event.preventDefault();
            window.location.href = "/";
        }

        // Botón de reintentar pago
        else if (event.target.id === "reintentar-pago") {
            event.preventDefault();
            this.showCheckout();
        }

        // Botón de volver al carrito
        else if (event.target.id === "volver-carrito") {
            event.preventDefault();
            this.displayCart();
        }
        });

        // Manejar cambios en los inputs de cantidad
        document.addEventListener("change", (event) => {
        if (event.target.classList.contains("input-cantidad")) {
            const productId = event.target.getAttribute("data-id");
            const quantity = Number.parseInt(event.target.value);

            if (productId && !isNaN(quantity) && quantity >= 0) {
            this.updateQuantity(productId, quantity);
            }
        }
        });
    }

    // Mostrar el carrito
    displayCart() {
        const cartItems = this.cartModel.getCart();
        const total = this.cartModel.calculateTotal();

        this.view.showCart(cartItems, total);
        this.view.updateURL("/carrito");
    }

    // Agregar un producto al carrito
    async addToCart(productId) {
        try {
        // Obtener los detalles del producto
        const product = await this.getProductDetails(productId);

        // Agregar al carrito
        const result = this.cartModel.addToCart(product);

        if (result) {
            this.view.showMessage("Producto agregado al carrito", "success");
        } else {
            throw new Error("No se pudo agregar el producto al carrito");
        }
        } catch (error) {
        console.error("Error al agregar al carrito:", error);
        this.view.showMessage(
            "No se pudo agregar el producto al carrito",
            "error"
        );
        }
    }

    // Obtener detalles de un producto
    async getProductDetails(productId) {
        // Aquí normalmente llamaríamos al ProductModel, pero para evitar dependencias circulares,
        // hacemos la petición directamente
        try {
        const response = await fetch(
            `http://localhost:3000/products/${productId}`
        );

        if (!response.ok) {
            throw new Error("No se pudo obtener la información del producto");
        }

        return await response.json();
        } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
        throw error;
        }
    }

    // Aumentar la cantidad de un producto
    increaseQuantity(productId) {
        // Obtener la cantidad actual
        const cartItems = this.cartModel.getCart();
        const item = cartItems.find((item) => item.id === productId);

        if (item) {
        // Aumentar en 1
        const newQuantity = item.quantity + 1;
        this.updateQuantity(productId, newQuantity);
        }
    }

    // Disminuir la cantidad de un producto
    decreaseQuantity(productId) {
        // Obtener la cantidad actual
        const cartItems = this.cartModel.getCart();
        const item = cartItems.find((item) => item.id === productId);

        if (item && item.quantity > 1) {
        // Disminuir en 1
        const newQuantity = item.quantity - 1;
        this.updateQuantity(productId, newQuantity);
        } else if (item && item.quantity === 1) {
        // Si la cantidad es 1, preguntar si quiere eliminar
        if (confirm("¿Desea eliminar este producto del carrito?")) {
            this.removeFromCart(productId);
        }
        }
    }

    // Actualizar la cantidad de un producto
    updateQuantity(productId, quantity) {
        // Actualizar en el modelo
        const result = this.cartModel.updateQuantity(productId, quantity);

        if (result) {
        // Actualizar en la vista
        this.view.updateItemQuantity(productId, quantity);

        // Actualizar el total
        const total = this.cartModel.calculateTotal();
        this.view.updateCartTotal(total);

        // Si la cantidad es 0, eliminar el producto
        if (quantity === 0) {
            this.view.removeCartItem(productId);
        }
        }
    }

    // Eliminar un producto del carrito
    removeFromCart(productId) {
        // Eliminar del modelo
        const result = this.cartModel.removeFromCart(productId);

        if (result) {
        // Eliminar de la vista
        this.view.removeCartItem(productId);

        // Actualizar el total
        const total = this.cartModel.calculateTotal();
        this.view.updateCartTotal(total);

        // Mostrar mensaje
        this.view.showMessage("Producto eliminado del carrito", "success");

        // Si el carrito está vacío, recargar la vista
        if (this.cartModel.getCart().length === 0) {
            this.displayCart();
        }
        }
    }

    // Mostrar la pantalla de pago
    showCheckout() {
        // Verificar si hay productos en el carrito
        const cartItems = this.cartModel.getCart();

        if (cartItems.length === 0) {
        this.view.showMessage("El carrito está vacío", "error");
        return;
        }

        // Verificar si el usuario está autenticado
        if (!this.userModel.isLoggedIn()) {
        this.view.showMessage(
            "Debe iniciar sesión para continuar con la compra",
            "warning"
        );

        // Redirigir a la pantalla de inicio de sesión
        setTimeout(() => {
            window.mostrarPantallaSesion();
        }, 1000);

        return;
        }

        // Mostrar la pantalla de pago
        const userData = this.userModel.getCurrentUser();
        const total = this.cartModel.calculateTotal();

        this.view.showCheckout(userData, cartItems, total);
        this.view.updateURL("/checkout");
    }

    // Procesar el pago
    async processPayment() {
        try {
        // Obtener los datos del formulario
        const form = document.getElementById("checkout-form");

        if (!form) {
            throw new Error("No se encontró el formulario de pago");
        }

        // Validar el formulario
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Recopilar los datos de envío
        const shippingData = {
            nombre: form.querySelector("#checkout-nombre").value,
            correo: form.querySelector("#checkout-email").value,
            telefono: form.querySelector("#checkout-telefono").value,
            direccion: form.querySelector("#checkout-direccion").value,
            ciudad: form.querySelector("#checkout-ciudad").value,
            codigo_postal: form.querySelector("#checkout-codigo-postal").value,
            metodo_pago: form.querySelector('input[name="metodo-pago"]:checked')
            .value,
        };

        // Mostrar pantalla de procesamiento
        this.view.showProcessingScreen();

        // Crear el pedido
        const orderData = await this.orderModel.createOrder(shippingData);

        // Simular procesamiento de pago
        setTimeout(() => {
            // Mostrar pantalla de éxito
            this.view.showSuccessScreen(orderData.id_pedido);

            // Limpiar carrito
            this.cartModel.clearCart();
        }, 2000);
        } catch (error) {
        console.error("Error al procesar pago:", error);
        this.view.showErrorScreen(
            error.message || "Ha ocurrido un error al procesar su pago"
        );
        }
    }
    }

    export { CartController };
