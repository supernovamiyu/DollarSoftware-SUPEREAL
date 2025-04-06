// CartModel.js - Maneja los datos y operaciones del carrito
export class CartModel {
    constructor() {
        this.storageKey = 'carrito';
    }

    getCart() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }

    async getProductById(productId) {
        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`);

            if (!response.ok) {
                throw new Error(`Error al obtener el producto: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error al obtener producto:", error);
            throw error;
        }
    }

    async addProduct(productId) {
        try {
            const product = await this.getProductById(productId);

            if (!product || !product.id_productos) {
                throw new Error("No se pudo obtener la información del producto");
            }

            const cart = this.getCart();
            const existingProduct = cart.find(item => item.id_productos === product.id_productos);

            if (existingProduct) {
                existingProduct.cantidad++;
            } else {
                cart.push({
                    id_productos: product.id_productos,
                    nombre_producto: product.nombre_producto,
                    precio: product.precio,
                    imagen_url: product.imagen_url,
                    cantidad: 1
                });
            }

            this.saveCart(cart);
            return true;
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            throw error;
        }
    }

    updateQuantity(productId, newQuantity) {
        const cart = this.getCart();
        const productIndex = cart.findIndex(item => item.id_productos === productId);

        if (productIndex !== -1) {
            if (newQuantity <= 0) {
                return this.removeProduct(productId);
            } else {
                cart[productIndex].cantidad = newQuantity;
                this.saveCart(cart);
                return true;
            }
        }
        return false;
    }

    removeProduct(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id_productos !== productId);
        this.saveCart(cart);
        return true;
    }

    calculateTotal() {
        const cart = this.getCart();
        return cart.reduce((total, product) => {
            const price = Number.parseFloat(product.precio);
            return total + (isNaN(price) ? 0 : price * product.cantidad);
        }, 0);
    }

    clearCart() {
        localStorage.removeItem(this.storageKey);
    }
}