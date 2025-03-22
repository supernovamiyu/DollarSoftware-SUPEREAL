    // Sistema de notificaciones mejorado para la tienda
    document.addEventListener("DOMContentLoaded", () => {
        // Reemplazar las funciones mostrarMensaje existentes
        window.mostrarMensaje = (mensaje, tipo = "success") => {
        console.log(`Mostrando mensaje: ${mensaje}, tipo: ${tipo}`)
    
        // Eliminar cualquier notificación existente para evitar acumulación
        const notificacionesExistentes = document.querySelectorAll(".mensaje-notificacion")
        notificacionesExistentes.forEach((notif) => notif.remove())
    
        // Crear el elemento del mensaje
        const mensajeElement = document.createElement("div")
        mensajeElement.className = `mensaje-notificacion mensaje-${tipo}`
        mensajeElement.textContent = mensaje
    
        // Asegurarse de que el mensaje sea visible
        mensajeElement.style.opacity = "0"
        mensajeElement.style.transform = "translateY(-20px)"
        mensajeElement.style.zIndex = "9999"
    
        // Agregar el mensaje al body
        document.body.appendChild(mensajeElement)
    
        // Forzar un reflow para asegurar que las transiciones funcionen
        mensajeElement.offsetHeight
    
        // Mostrar el mensaje con animación
        setTimeout(() => {
            mensajeElement.style.opacity = "1"
            mensajeElement.style.transform = "translateY(0)"
        }, 10)
    
        // Ocultar y eliminar el mensaje después de un tiempo
        setTimeout(() => {
            mensajeElement.style.opacity = "0"
            mensajeElement.style.transform = "translateY(-20px)"
    
            // Eliminar el elemento después de que termine la animación
            setTimeout(() => {
            mensajeElement.remove()
            }, 500)
        }, 1000)
    
        return mensajeElement
        }
    
        // Mejorar la función agregarAlCarrito para asegurar que muestre notificaciones
        const originalAgregarAlCarrito = window.agregarAlCarrito
        if (originalAgregarAlCarrito) {
        window.agregarAlCarrito = (productoId) => {
            try {
            const resultado = originalAgregarAlCarrito(productoId)
            // Asegurar que se muestre la notificación incluso si la función original no lo hace
            window.mostrarMensaje("Producto agregado al carrito", "success")
            return resultado
            } catch (error) {
            console.error("Error al agregar al carrito:", error)
            window.mostrarMensaje("No se pudo agregar el producto al carrito", "error")
            }
        }
        }
    
        // Mejorar la función enviarOpinion para asegurar que muestre notificaciones
        const originalEnviarOpinion = window.enviarOpinion
        if (originalEnviarOpinion) {
        window.enviarOpinion = (productoId) => {
            try {
            const resultado = originalEnviarOpinion(productoId)
            // Asegurar que se muestre la notificación incluso si la función original no lo hace
            setTimeout(() => {
                window.mostrarMensaje("¡Opinión enviada con éxito!", "success")
            }, 500)
            return resultado
            } catch (error) {
            console.error("Error al enviar opinión:", error)
            window.mostrarMensaje("No se pudo enviar la opinión", "error")
            }
        }
        }
    
    })
    
    
    