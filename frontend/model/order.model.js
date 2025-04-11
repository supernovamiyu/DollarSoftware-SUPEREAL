    // OrderModel.js - Maneja los datos y la lógica relacionada con los pedidos

    class OrderModel {
    constructor(userModel, cartModel) {
        this.userModel = userModel;
        this.cartModel = cartModel;
        this.orders = [];
        this.loadOrders();
    }

    // Cargar pedidos desde localStorage
    loadOrders() {
        try {
        const currentUser = this.userModel.getCurrentUser();
        if (currentUser) {
            const userId = currentUser.id;
            const savedOrders = localStorage.getItem(`orders_${userId}`);
            if (savedOrders) {
            this.orders = JSON.parse(savedOrders);
            }
        }
        } catch (error) {
        console.error("Error al cargar pedidos:", error);
        this.orders = [];
        }
    }

    // Guardar pedidos en localStorage
    saveOrders() {
        const currentUser = this.userModel.getCurrentUser();
        if (currentUser) {
        const userId = currentUser.id;
        localStorage.setItem(`orders_${userId}`, JSON.stringify(this.orders));
        }
    }

    // Obtener todos los pedidos del usuario actual
    getOrders() {
        return this.orders;
    }

    // Crear un nuevo pedido
    async createOrder(shippingData) {
        try {
        const currentUser = this.userModel.getCurrentUser();

        if (!currentUser) {
            throw new Error("Usuario no autenticado");
        }

        const cartItems = this.cartModel.getCart();

        if (cartItems.length === 0) {
            throw new Error("El carrito está vacío");
        }

        // En una aplicación real, aquí se enviaría la información al servidor
        // Por ahora, simulamos la creación de un pedido localmente

        const newOrder = {
            id_pedido: `ORD-${Date.now()}`,
            fecha: new Date().toISOString(),
            usuario_id: currentUser.id,
            items: [...cartItems],
            total: this.cartModel.calculateTotal(),
            estado: "En preparación",
            direccion_envio: shippingData.direccion,
            ciudad: shippingData.ciudad,
            codigo_postal: shippingData.codigo_postal,
            telefono: shippingData.telefono,
        };

        // Agregar el nuevo pedido a la lista
        this.orders.unshift(newOrder);
        this.saveOrders();

        return newOrder;
        } catch (error) {
        console.error("Error al crear pedido:", error);
        throw error;
        }
    }

    // Obtener un pedido específico por ID
    getOrderById(orderId) {
        return this.orders.find((order) => order.id_pedido === orderId);
    }

    // Actualizar el estado de un pedido
    updateOrderStatus(orderId, newStatus) {
        const orderIndex = this.orders.findIndex(
        (order) => order.id_pedido === orderId
        );

        if (orderIndex >= 0) {
        this.orders[orderIndex].estado = newStatus;
        this.saveOrders();
        return true;
        }

        return false;
    }
    }

    export { OrderModel };
