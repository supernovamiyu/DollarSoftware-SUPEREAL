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

    async getOrderProducts(orderId) {
        try {
            const response = await fetch(`http://localhost:3000/api/detail-delivery/${orderId}`);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            
            const productDetail = await response.json();
            
            // Transformar los datos a un formato consistente
            return Array.isArray(productDetail) ? 
                productDetail.map(item => ({
                    id: item.fk_id_producto,
                    nombre: item.nombre_producto || `Producto ${item.fk_id_producto}`,
                    precio: parseFloat(item.precio_unitario),
                    cantidad: item.cantidad,
                    imagen: item.imagen_url || 'frontend/assets/img/default-product.png',
                    descripcion: item.descripcion || ''
                })) : 
                [{
                    id: productDetail.fk_id_producto,
                    nombre: productDetail.nombre_producto || `Producto ${productDetail.fk_id_producto}`,
                    precio: parseFloat(productDetail.precio_unitario),
                    cantidad: productDetail.cantidad,
                    imagen: productDetail.imagen_url || 'frontend/assets/img/default-product.png',
                    descripcion: productDetail.descripcion || ''
                }];
        } catch (error) {
            console.error(`Error al obtener productos del pedido ${orderId}:`, error);
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
            
            const response = await fetch(`http://localhost:3000/api/delivery/usuario/${userId}`);
            
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
    
            // Obtener todos los pedidos del usuario
            const userId = this.currentUser.id_usuario;
            const ordersResponse = await fetch(`http://localhost:3000/api/delivery/usuario/${userId}`);
            
            if (!ordersResponse.ok) {
                throw new Error("Error al obtener pedidos del usuario");
            }
            
            const orders = await ordersResponse.json();
            const validOrders = Array.isArray(orders) ? orders : [orders];
            
            // Obtener productos de todos los pedidos
            const allProducts = await Promise.all(
                validOrders.map(order => 
                    this.getOrderProducts(order.id_pedido || order.id)
                        .catch(e => {
                            console.error(`Error obteniendo productos para pedido ${order.id_pedido}:`, e);
                            return [];
                        })
                )
            );
            
            // Aplanar el array y eliminar duplicados
            const uniqueProducts = [];
            const productIds = new Set();
            
            allProducts.flat().forEach(product => {
                if (!productIds.has(product.id)) {
                    productIds.add(product.id);
                    uniqueProducts.push({
                        ...product,
                        fecha_visto: new Date().toISOString() // Fecha actual como valor por defecto
                    });
                }
            });
            
            return uniqueProducts;
        } catch (error) {
            console.error("Error al obtener historial de productos:", error);
            return [];
        }
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