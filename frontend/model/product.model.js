    /**
     * Modelo para manejar los datos y la lógica de negocio relacionada con los productos
     */
    class ProductModel {
        /**
         * Obtiene los productos destacados
         * @returns {Promise<Array>} - Lista de productos destacados
         */
        async getFeaturedProducts() {
        try {
            const response = await fetch("http://localhost:3000/api/products/destacados")
            if (!response.ok) {
            throw new Error("Error al obtener productos destacados")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error("Error al obtener productos destacados:", error)
            return []
        }
        }
    
        /**
         * Obtiene los productos por categoría
         * @param {string} categoryId - ID de la categoría
         * @returns {Promise<Array>} - Lista de productos de la categoría
         */
        async getProductsByCategory(categoryId) {
        try {
            const response = await fetch(`http://localhost:3000/api/products/categoria/${categoryId}`)
            if (!response.ok) {
            throw new Error("Error al obtener productos por categoría")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error("Error al obtener productos por categoría:", error)
            return []
        }
        }
    
        /**
         * Busca productos por término
         * @param {string} searchTerm - Término de búsqueda
         * @returns {Promise<Array>} - Lista de productos que coinciden con la búsqueda
         */
        async searchProducts(searchTerm) {
        try {
            const encodedSearchTerm = encodeURIComponent(searchTerm)
            const response = await fetch(`http://localhost:3000/api/products/search/${encodedSearchTerm}`)
            if (!response.ok) {
            throw new Error("Error al buscar productos")
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error("Error al buscar productos:", error)
            return []
        }
        }
    
        /**
         * Obtiene los detalles de un producto
         * @param {string} productId - ID del producto
         * @returns {Promise<Object|null>} - Detalles del producto o null si no se encuentra
         */
        async getProductDetails(productId) {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`)
                if (!response.ok) {
                    throw new Error("Error al obtener detalles del producto")
                }
                const data = await response.json()
                return data
            } catch (error) {
                console.error("Error al obtener detalles del producto:", error)
                return null
            }
        }
    
        /**
         * Obtiene las opiniones de un producto
         * @param {string} productId - ID del producto
         * @returns {Promise<Array>} - Lista de opiniones del producto
         */
        async getProductReviews(productId) {
            try {
                const response = await fetch(`http://localhost:3000/api/opinions/${productId}`)
                if (!response.ok) {
                throw new Error("Error al obtener opiniones del producto")
                }
                const data = await response.json()
                return data
            } catch (error) {
                console.error("Error al obtener opiniones del producto:", error)
                return []
            }
        }
    
        /**
         * Envía una opinión sobre un producto
         * @param {Object} reviewData - Datos de la opinión
         * @returns {Promise<Object>} - Resultado de la operación
         */
        async submitProductReview(reviewData) {
        try {
            const response = await fetch("http://localhost:3000/api/opinions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
            })
    
            if (!response.ok) {
            throw new Error("Error al enviar la opinión")
            }
    
            const data = await response.json()
            return { success: true, data }
        } catch (error) {
            console.error("Error al enviar opinión:", error)
            return {
            success: false,
            error: error.message || "No se pudo enviar la opinión. Intenta de nuevo más tarde.",
            }
        }
        }
    }
    
    export default ProductModel
    
    