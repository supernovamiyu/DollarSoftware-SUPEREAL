/**
 * Modelo para manejar los datos y la lógica de negocio relacionada con el carrito de compras
 * Versión mejorada con protección contra duplicados y operaciones concurrentes
 */
class CartModel {
    constructor() {
        this.cartItems = this.loadCart();
        this.pendingOperations = new Map(); // Para rastrear operaciones en curso por producto
        this.lock = false; // Bloqueo general para operaciones críticas
    }

    /**
     * Carga los items del carrito desde localStorage
     * @returns {Array} - Items del carrito
     */
    loadCart() {
        try {
            const cartData = localStorage.getItem("carrito");
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            return [];
        }
    }

    /**
     * Guarda los items del carrito en localStorage
     */
    saveCart() {
        localStorage.setItem("carrito", JSON.stringify(this.cartItems));
    }

    /**
     * Obtiene todos los items del carrito
     * @returns {Array} - Items del carrito
     */
    getCartItems() {
        return [...this.cartItems]; // Devolver copia para evitar modificaciones directas
    }

    /**
     * Agrega un producto al carrito con protección contra duplicados
     * @param {Object} product - Producto a agregar
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async addToCart(product) {
        // Verificar si ya hay una operación en curso para este producto
        if (this.pendingOperations.has(product.id_productos)) {
            return {
                success: false,
                error: "Este producto ya está siendo agregado"
            };
        }

        this.pendingOperations.set(product.id_productos, true);

        try {
            // Bloqueo para operaciones críticas
            while (this.lock) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            this.lock = true;

            if (!product || !product.id_productos) {
                throw new Error("Producto inválido");
            }

            // Buscar producto existente (comparación segura)
            const existingProduct = this.cartItems.find(item => 
                String(item.id_productos) === String(product.id_productos)
            );

            if (existingProduct) {
                existingProduct.cantidad++;
            } else {
                this.cartItems.push({
                    id_productos: product.id_productos,
                    nombre_producto: product.nombre_producto,
                    precio: product.precio,
                    imagen_url: product.imagen_url,
                    cantidad: 1,
                });
            }

            this.saveCart();
            return { success: true };
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            return {
                success: false,
                error: error.message || "No se pudo agregar el producto al carrito",
            };
        } finally {
            this.lock = false;
            this.pendingOperations.delete(product.id_productos);
        }
    }

    /**
     * Verifica si un producto ya está en el carrito
     * @param {string|number} productId - ID del producto
     * @returns {boolean} - True si el producto está en el carrito
     */
    isProductInCart(productId) {
        return this.cartItems.some(item => 
            String(item.id_productos) === String(productId)
        );
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {string} productId - ID del producto
     * @param {number} quantity - Nueva cantidad
     * @returns {Object} - Resultado de la operación
     */
    async updateQuantity(productId, quantity) {
        if (this.pendingOperations.has(productId)) {
            return {
                success: false,
                error: "Operación en curso para este producto"
            };
        }

        this.pendingOperations.set(productId, true);

        try {
            while (this.lock) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            this.lock = true;

            const productIndex = this.cartItems.findIndex(item => 
                String(item.id_productos) === String(productId)
            );

            if (productIndex === -1) {
                throw new Error("Producto no encontrado en el carrito");
            }

            if (quantity <= 0) {
                return await this.removeFromCart(productId);
            }

            this.cartItems[productIndex].cantidad = quantity;
            this.saveCart();
            return { success: true };
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
            return {
                success: false,
                error: error.message || "No se pudo actualizar la cantidad del producto",
            };
        } finally {
            this.lock = false;
            this.pendingOperations.delete(productId);
        }
    }

    /**
     * Elimina un producto del carrito
     * @param {string} productId - ID del producto a eliminar
     * @returns {Object} - Resultado de la operación
     */
    async removeFromCart(productId) {
        if (this.pendingOperations.has(productId)) {
            return {
                success: false,
                error: "Operación en curso para este producto"
            };
        }

        this.pendingOperations.set(productId, true);

        try {
            while (this.lock) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            this.lock = true;

            const initialLength = this.cartItems.length;
            this.cartItems = this.cartItems.filter(item => 
                String(item.id_productos) !== String(productId)
            );

            if (this.cartItems.length === initialLength) {
                throw new Error("Producto no encontrado en el carrito");
            }

            this.saveCart();
            return { success: true };
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
            return {
                success: false,
                error: error.message || "No se pudo eliminar el producto del carrito",
            };
        } finally {
            this.lock = false;
            this.pendingOperations.delete(productId);
        }
    }

    /**
     * Calcula el total del carrito
     * @returns {number} - Total del carrito
     */
    getCartTotal() {
        return this.cartItems.reduce((total, item) => {
            const price = Number.parseFloat(item.precio);
            return total + (isNaN(price) ? 0 : price * item.cantidad);
        }, 0);
    }

    /**
     * Vacía el carrito
     * @returns {Object} - Resultado de la operación
     */
    async clearCart() {
        try {
            while (this.lock) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            this.lock = true;

            this.cartItems = [];
            this.saveCart();
            return { success: true };
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            return {
                success: false,
                error: error.message || "No se pudo vaciar el carrito",
            };
        } finally {
            this.lock = false;
        }
    }

    /**
     * Obtiene la cantidad de un producto específico en el carrito
     * @param {string|number} productId - ID del producto
     * @returns {number} - Cantidad del producto en el carrito (0 si no existe)
     */
    getProductQuantity(productId) {
        const product = this.cartItems.find(item => 
            String(item.id_productos) === String(productId)
        );
        return product ? product.cantidad : 0;
    }
    
    /**
     * Verifica si un email está registrado en el sistema
     * @param {string} email - Email a verificar
     * @returns {Promise<boolean>} - True si el email está registrado
     */
    async verifyUserEmail(email) {
        try {
            const response = await fetch('http://localhost:3000/api/users/email/' + encodeURIComponent(email));
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
    
            const userData = await response.json();
            return userData;
            
        } catch (error) {
            console.error('Error al verificar el email:', error);
            return false;
        }
    }

}

export default CartModel;