    /**
     * Modelo para manejar los datos y la lógica de negocio relacionada con el carrito de compras
     */
    class CartModel {
        constructor() {
        this.cartItems = this.loadCart()
        }
    
        /**
         * Carga los items del carrito desde localStorage
         * @returns {Array} - Items del carrito
         */
        loadCart() {
        try {
            const cartData = localStorage.getItem("carrito")
            return cartData ? JSON.parse(cartData) : []
        } catch (error) {
            console.error("Error al cargar el carrito:", error)
            return []
        }
        }
    
        /**
         * Guarda los items del carrito en localStorage
         */
        saveCart() {
        localStorage.setItem("carrito", JSON.stringify(this.cartItems))
        }
    
        /**
         * Obtiene todos los items del carrito
         * @returns {Array} - Items del carrito
         */
        getCartItems() {
        return this.cartItems
        }
    
        /**
         * Agrega un producto al carrito
         * @param {Object} product - Producto a agregar
         * @returns {Object} - Resultado de la operación
         */
        addToCart(product) {
        try {
            if (!product || !product.id_productos) {
            throw new Error("Producto inválido")
            }
    
            const existingProduct = this.cartItems.find((item) => item.id_productos === product.id_productos)
    
            if (existingProduct) {
            existingProduct.cantidad++
            } else {
            this.cartItems.push({
                id_productos: product.id_productos,
                nombre_producto: product.nombre_producto,
                precio: product.precio,
                imagen_url: product.imagen_url,
                cantidad: 1,
            })
            }
    
            this.saveCart()
            return { success: true }
        } catch (error) {
            console.error("Error al agregar al carrito:", error)
            return {
            success: false,
            error: error.message || "No se pudo agregar el producto al carrito",
            }
        }
        }
    
        /**
         * Actualiza la cantidad de un producto en el carrito
         * @param {string} productId - ID del producto
         * @param {number} quantity - Nueva cantidad
         * @returns {Object} - Resultado de la operación
         */
        updateQuantity(productId, quantity) {
        try {
            const productIndex = this.cartItems.findIndex((item) => item.id_productos === productId)
    
            if (productIndex === -1) {
            throw new Error("Producto no encontrado en el carrito")
            }
    
            if (quantity <= 0) {
            return this.removeFromCart(productId)
            }
    
            this.cartItems[productIndex].cantidad = quantity
            this.saveCart()
            return { success: true }
        } catch (error) {
            console.error("Error al actualizar cantidad:", error)
            return {
            success: false,
            error: error.message || "No se pudo actualizar la cantidad del producto",
            }
        }
        }
    
        /**
         * Elimina un producto del carrito
         * @param {string} productId - ID del producto a eliminar
         * @returns {Object} - Resultado de la operación
         */
        removeFromCart(productId) {
        try {
            this.cartItems = this.cartItems.filter((item) => item.id_productos !== productId)
            this.saveCart()
            return { success: true }
        } catch (error) {
            console.error("Error al eliminar del carrito:", error)
            return {
            success: false,
            error: error.message || "No se pudo eliminar el producto del carrito",
            }
        }
        }
    
        /**
         * Calcula el total del carrito
         * @returns {number} - Total del carrito
         */
        getCartTotal() {
        return this.cartItems.reduce((total, item) => {
            const price = Number.parseFloat(item.precio)
            return total + (isNaN(price) ? 0 : price * item.cantidad)
        }, 0)
        }
    
        /**
         * Vacía el carrito
         * @returns {Object} - Resultado de la operación
         */
        clearCart() {
        try {
            this.cartItems = []
            this.saveCart()
            return { success: true }
        } catch (error) {
            console.error("Error al vaciar el carrito:", error)
            return {
            success: false,
            error: error.message || "No se pudo vaciar el carrito",
            }
        }
        }
    }
    
    export default CartModel
    
