    // OpinionModel.js - Maneja los datos y la lógica relacionada con las opiniones de productos

    class OpinionModel {
        constructor() {
        this.opinions = {}
        }
    
        // Obtener opiniones de un producto
        async getOpinions(productId) {
        try {
            // Si ya tenemos las opiniones en caché, las devolvemos
            if (this.opinions[productId]) {
            return this.opinions[productId]
            }
    
            const response = await fetch(`http://localhost:3000/opinions/${productId}`)
    
            if (!response.ok) {
            throw new Error("No se pudieron cargar las opiniones")
            }
    
            const data = await response.json()
    
            // Guardar en caché
            this.opinions[productId] = data
    
            return data
        } catch (error) {
            console.error("Error al cargar opiniones:", error)
            return []
        }
        }
    
        // Enviar una nueva opinión
        async addOpinion(opinionData) {
        try {
            const response = await fetch("http://localhost:3000/opinions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(opinionData),
            })
    
            if (!response.ok) {
            throw new Error("Error al enviar la opinión")
            }
    
            const data = await response.json()
    
            // Actualizar la caché de opiniones
            if (this.opinions[opinionData.fk_id_productos]) {
            // Si ya tenemos opiniones para este producto, agregamos la nueva
            this.opinions[opinionData.fk_id_productos].push({
                ...opinionData,
                fecha: new Date().toISOString(),
                id: data.id || Date.now(), // Usar el ID devuelto por el servidor o un timestamp
            })
            }
    
            return { success: true, data }
        } catch (error) {
            console.error("Error al enviar opinión:", error)
            return { success: false, error: error.message }
        }
        }
    }
    
    export { OpinionModel }
    
