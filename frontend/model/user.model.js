class UserModel {
    constructor() {
        this.currentUser = null;
        this.initSession();
    }

    initSession() {
        const savedSession = localStorage.getItem("sesionUsuario");
        if (savedSession) {
            try {
                this.currentUser = JSON.parse(savedSession);
                return true;
            } catch (error) {
                console.error("Error al recuperar la sesión:", error);
                localStorage.removeItem("sesionUsuario");
                return false;
            }
        }
        return false;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    async login(email, password) {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
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
            const response = await fetch("http://localhost:3000/auth/register", {
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
                `http://localhost:3000/users/${this.currentUser.id_usuario}`,
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

    async getOrderProducts(orderId) {
        try {
            const response = await fetch(`http://localhost:3000/delivery/pedido/${orderId}/productos`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al obtener productos del pedido:", error);
            return [];
        }
    }

    async getUserOrders() {
        try {
            if (!this.isAuthenticated()) {
                throw new Error("Usuario no autenticado");
            }
    
            const userId = this.currentUser.id_usuario;
            console.log(`Obteniendo pedidos para usuario ID: ${userId}`);
            
            const response = await fetch(`http://localhost:3000/delivery/usuario/${userId}`);
            
            if (response.status === 404) {
                return [];
            }
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
    
            const data = await response.json();
            console.log("Datos recibidos del backend:", data);
    
            // Asegurarnos que siempre trabajamos con un array
            const pedidos = Array.isArray(data) ? data : [data];
            
            console.log("Pedidos procesados:", pedidos);
    
            const pedidosConProductos = await Promise.all(
                pedidos.map(async (pedido) => {
                    const productos = await this.getOrderProducts(pedido.id_pedido || pedido.id_pedito);
                    
                    const estadoMap = {
                        'PRE': 'pendiente',
                        'ENV': 'en_proceso',
                        'ENT': 'entregado',
                        'CAN': 'cancelado'
                    };
    
                    return {
                        id: pedido.id_pedido || pedido.id_pedito,
                        id_pedido: pedido.id_pedido || pedido.id_pedito,
                        fecha_pedido: pedido.fecha_de_pedido,
                        fecha: pedido.fecha_de_pedido,
                        productos: productos,
                        total: pedido.total || 0,
                        estado: estadoMap[pedido.fk_id_estado_envio] || pedido.fk_id_estado_envio || 'pendiente',
                        direccion_entrega: pedido.direction || pedido.direccion || 'No especificada',
                        metodo_envio: pedido.fk_id_metodo_envio || 'No especificado',
                        vigencia_factura: pedido.vigencia_factura || 'No especificada'
                    };
                })
            );
    
            console.log("Pedidos transformados:", pedidosConProductos);
            return pedidosConProductos;
        } catch (error) {
            console.error("Error al obtener pedidos:", error);
            return [];
        }
    }

    async getProductHistory() {
        try {
            if (!this.isAuthenticated()) {
                throw new Error("Usuario no autenticado");
            }

            const token = localStorage.getItem("authToken");
            const response = await fetch(
                `http://localhost:3000/users/${this.currentUser.id_usuario}/history`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al obtener historial");
            }

            return await response.json();
        } catch (error) {
            console.error("Error al obtener historial:", error);
            return [];
        }
    }

    async getOrderDetails(orderId) {
        try {
            const response = await fetch(
                `http://localhost:3000/delivery/idPedidos/${orderId}`
            );

            if (!response.ok) {
                throw new Error("Error al obtener detalles del pedido");
            }

            const pedido = await response.json();
            const productos = await this.getOrderProducts(orderId);
            
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