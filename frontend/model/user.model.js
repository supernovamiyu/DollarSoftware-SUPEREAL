class UserModel {
    constructor() {
        this.currentUser = null;
        this.token = null;
        this.initSession();
    }

    initSession() {
        const savedSession = localStorage.getItem("sesionUsuario");
        const savedToken = localStorage.getItem("authToken");
        
        if (savedSession && savedToken) {
            try {
                this.currentUser = JSON.parse(savedSession);
                this.token = savedToken;
                console.log("Sesión recuperada:", this.currentUser);
                return true;
            } catch (error) {
                console.error("Error al recuperar la sesión:", error);
                this.clearSession();
                return false;
            }
        }
        return false;
    }

    clearSession() {
        this.currentUser = null;
        this.token = null;
        localStorage.removeItem("sesionUsuario");
        localStorage.removeItem("authToken");
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    async login(email, password) {
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo: email, contraseña: password }),
            });

            const data = await response.json();
            console.log("Datos del usuario recibidos:", data.usuario); // Log para depuración

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al iniciar sesión");
            }

            this.currentUser = data.usuario;
            localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser));
            localStorage.setItem("authToken", data.token);

            window.dispatchEvent(new CustomEvent("loginSuccess"));

            return { success: true, user: data.usuario };
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return {
                success: false,
                error: error.message || "Error al iniciar sesión. Verifica tus credenciales.",
            };
        }
    }

    async register(userData) {
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al registrar usuario");
            }

            this.currentUser = data.usuario;
            localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser));
            localStorage.setItem("authToken", data.token);

            return { success: true, user: data.usuario };
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            return {
                success: false,
                error: error.message || "Error al crear la cuenta. Inténtalo de nuevo.",
            };
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem("sesionUsuario");
        localStorage.removeItem("authToken");
        return true;
    }

    async updateUserData(userData) {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
                `http://localhost:3000/api/users/${this.currentUser.id_usuario}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar datos");
            }

            this.currentUser = { ...this.currentUser, ...userData };
            localStorage.setItem("sesionUsuario", JSON.stringify(this.currentUser));

            return { success: true, user: this.currentUser };
        } catch (error) {
            console.error("Error al actualizar datos del usuario:", error);
            return {
                success: false,
                error: error.message || "Error al actualizar los datos. Inténtalo de nuevo.",
            };
        }
    }

    async getUserOrders() {
        try {
            if (!this.isAuthenticated()) {
                return [];
            }
    
            const userId = this.currentUser.id_usuario;
            const response = await fetch(`http://localhost:3000/api/delivery/usuario/${userId}`);
            
            if (!response.ok) {
                throw new Error(`Error al obtener pedidos: ${response.status}`);
            }
    
            const orders = await response.json();
            
            // Asegurarse de que orders es un array
            if (!Array.isArray(orders)) {
                console.error("La respuesta de pedidos no es un array:", orders);
                return [];
            }
            
            // Procesar los pedidos para la vista
            const processedOrders = orders.map(order => ({
                id: order.id_pedido,
                fecha_pedido: order.fecha_de_pedido,
                estado: this.mapOrderStatus(order.fk_id_estado_envio),
                total: order.total,
                direccion: order.direccion,
                metodo_envio: order.fk_id_metodo_envio === 'ENV' ? 'Envío a domicilio' : 'Recogida en tienda'
            }));
    
            return processedOrders;
        } catch (error) {
            console.error("Error al obtener pedidos:", error);
            return [];
        }
    }
    
    mapOrderStatus(status) {
        const statusMap = {
            'PRE': 'Pendiente',
            'ENV': 'Enviado',
            'ENT': 'Entregado',
            'CAN': 'Cancelado'
        };
        return statusMap[status] || status;
    }
    

    async getOrderDetails(orderId) {
        try {
            const response = await fetch(
                `http://localhost:3000/api/delivery/idPedidos/${orderId}`
            );

            if (!response.ok) {
                throw new Error("Error al obtener detalles del pedido");
            }

            const pedido = await response.json();
            
            const estadoMap = {
                'PRE': 'pendiente',
                'ENV': 'en_proceso',
                'ENT': 'entregado',
                'CAN': 'cancelado'
            };

            return {
                ...pedido,
                id_pedido: pedido.id_pedido || pedido.id,
                fecha_pedido: pedido.fecha_de_pedido || pedido.fecha,
                productos: productos,
                total: pedido.total || productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0),
                estado: estadoMap[pedido.fk_id_estado_envio] || pedido.fk_id_estado_envio || 'pendiente',
                direccion_entrega: pedido.direccion || 'No especificada'
            };
        } catch (error) {
            console.error("Error al obtener detalles del pedido:", error);
            return null;
        }
    }
}

export default UserModel;