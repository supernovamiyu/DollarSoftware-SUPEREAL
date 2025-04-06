    // CartModel.js - Maneja los datos y la lógica relacionada con el carrito de compras

    class CartModel {
        constructor() {
        this.items = []
        this.loadCart()
        }
    
        // Cargar el carrito desde localStorage
        loadCart() {
        try {
            const savedCart = localStorage.getItem("carrito")
            if (savedCart) {
            this.items = JSON.parse(savedCart)
            }
        } catch (error) {
            console.error("Error al cargar el carrito:", error)
            this.items = []
            localStorage.removeItem("carrito")
        }
        }
    
        // Guardar el carrito en localStorage
        saveCart() {
        localStorage.setItem("carrito", JSON.stringify(this.items))
        }
    
        // Obtener todos los items del carrito
        getCart() {
        return this.items
        }
    
        // Agregar un producto al carrito
        addToCart(product, quantity = 1) {
        // Verificar si el producto ya está en el carrito
        const existingItemIndex = this.items.findIndex((item) => item.id === product.id)
    
        if (existingItemIndex >= 0) {
            // Actualizar cantidad si ya existe
            this.items[existingItemIndex].quantity += quantity
        } else {
            // Agregar nuevo item
            this.items.push({
            id: product.id,
            name: product.nombre_producto,
            price: product.precio,
            image: product.imagen_url,
            quantity: quantity,
            })
        }
    
        this.saveCart()
        return true
        }
    
        // Actualizar la cantidad de un producto
        updateQuantity(productId, quantity) {
        const itemIndex = this.items.findIndex((item) => item.id === productId)
    
        if (itemIndex >= 0) {
            if (quantity <= 0) {
            // Eliminar el producto si la cantidad es 0 o menos
            this.items.splice(itemIndex, 1)
            } else {
            // Actualizar la cantidad
            this.items[itemIndex].quantity = quantity
            }
    
            this.saveCart()
            return true
        }
    
        return false
        }
    
        // Eliminar un producto del carrito
        removeFromCart(productId) {
        const itemIndex = this.items.findIndex((item) => item.id === productId)
    
        if (itemIndex >= 0) {
            this.items.splice(itemIndex, 1)
            this.saveCart()
            return true
        }
    
        return false
        }
    
        // Vaciar el carrito
        clearCart() {
        this.items = []
        this.saveCart()
        }
    
        // Calcular el total del carrito
        calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + item.price * item.quantity
        }, 0)
        }
    
        // Obtener el número total de items en el carrito
        getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0)
        }
    }
    
    export { CartModel }
    
    