    // ProductModel.js - Maneja los datos y la lógica relacionada con los productos

    class ProductModel {
        constructor() {
        this.featuredProducts = []
        this.searchResults = []
        this.categoryProducts = {}
        this.productDetails = {}
        }
    
        // Obtener productos destacados
        async getFeaturedProducts() {
        try {
            if (this.featuredProducts.length > 0) {
            return this.featuredProducts
            }
    
            const response = await fetch("http://localhost:3000/products/destacados")
            const data = await response.json()
            this.featuredProducts = data
            return data
        } catch (error) {
            console.error("Error al obtener productos destacados:", error)
            return []
        }
        }
    
        // Obtener productos por categoría
        async getProductsByCategory(category) {
        try {
            // Si ya tenemos los productos de esta categoría en caché, los devolvemos
            if (this.categoryProducts[category]) {
            return this.categoryProducts[category]
            }
    
            const response = await fetch(`http://localhost:3000/products/categoria/${category}`)
            const data = await response.json()
    
            // Guardar en caché
            this.categoryProducts[category] = data
    
            return data
        } catch (error) {
            console.error("Error al obtener productos por categoría:", error)
            return []
        }
        }
    
        // Buscar productos
        async searchProducts(searchTerm) {
        try {
            if (searchTerm.length < 3) {
            return { error: "Por favor, ingrese al menos 3 caracteres" }
            }
    
            const encodedSearchTerm = encodeURIComponent(searchTerm)
            const response = await fetch(`http://localhost:3000/products/search/${encodedSearchTerm}`)
            const data = await response.json()
    
            // Guardar resultados de búsqueda
            this.searchResults = data
    
            return data
        } catch (error) {
            console.error("Error al buscar productos:", error)
            return []
        }
        }
    
        // Obtener detalles de un producto
        async getProductDetails(productId) {
        try {
            // Si ya tenemos los detalles de este producto en caché, los devolvemos
            if (this.productDetails[productId]) {
            return this.productDetails[productId]
            }
    
            const response = await fetch(`http://localhost:3000/products/${productId}`)
    
            if (!response.ok) {
            throw new Error("No se pudo obtener la información del producto")
            }
    
            const data = await response.json()
    
            // Guardar en caché
            this.productDetails[productId] = data
    
            return data
        } catch (error) {
            console.error("Error al obtener detalles del producto:", error)
            throw error
        }
        }
    }
    
    export { ProductModel }
    
