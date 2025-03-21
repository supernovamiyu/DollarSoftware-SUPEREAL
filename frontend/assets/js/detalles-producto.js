    // Función para mostrar los detalles de un producto
    function mostrarDetalleProducto(productoId) {
        // Hacer la petición a la API para obtener los detalles del producto
        fetch(`http://localhost:3000/products/${productoId}`)
        .then((response) => {
            if (!response.ok) {
            throw new Error("No se pudo obtener la información del producto")
            }
            return response.json()
        })
        .then((producto) => {
            // Actualizar la URL
            actualizarURL(`/producto/${producto.nombre_producto.replace(/ /g, "-").toLowerCase()}`)
    
            // Mostrar la plantilla de detalle del producto
            const containerPrincipal = document.getElementById("container-principal")
    
            // Crear el contenido HTML para el detalle del producto
            const contenidoHTML = `
                    <div class="contenedor-detalle-producto">
                        <div class="titulo-seccion">
                            <h4>${producto.nombre_producto}</h4>
                        </div>
                        
                        <div class="contenido-detalle-producto">
                            <div class="imagen-detalle-producto">
                                <img src="${producto.imagen_url}" alt="${producto.nombre_producto}" width="100%" height="auto">
                            </div>
                            
                            <div class="info-detalle-producto">
                                <div class="precio-detalle-producto">
                                    <h3>Precio:</h3>
                                    <p>$${producto.precio}</p>
                                </div>
                                
                                <div class="descripcion-detalle-producto">
                                    <h3>Descripción:</h3>
                                    <p>${producto.descripcion || "Sin descripción disponible"}</p>
                                </div>
                                
                                <div class="acciones-detalle-producto">
                                    <button class="comprar" onclick="agregarAlCarrito('${producto.id_productos}')" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles || 0}">
                                        Añadir al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    
            // Mostrar el contenido en el contenedor principal
            containerPrincipal.innerHTML = contenidoHTML
        })
        .catch((error) => {
            console.error("Error al cargar los detalles del producto:", error)
            alert("No se pudo cargar los detalles del producto")
        })
    }
    
    // Función para agregar event listeners a las imágenes de productos
    function agregarClickAImagenesProductos() {
        // Seleccionar todas las imágenes de productos
        document.querySelectorAll("#imagen-individual-producto").forEach((imagen) => {
        // Eliminar cualquier event listener existente para evitar duplicados
        imagen.removeEventListener("click", manejarClickImagen)
        // Agregar el nuevo event listener
        imagen.addEventListener("click", manejarClickImagen)
        // Cambiar el cursor para indicar que es clickeable
        imagen.style.cursor = "pointer"
        })
    }
    
    // Función que maneja el click en la imagen
    function manejarClickImagen(event) {
        // Obtener el elemento que disparó el evento
        const imagen = event.target
        // Obtener el contenedor del producto (div padre)
        const contenedorProducto = imagen.closest("div")
    
        if (!contenedorProducto) {
        console.error("No se pudo encontrar el contenedor del producto")
        return
        }
    
        // Buscar el botón de comprar dentro del contenedor para obtener el ID del producto
        const botonComprar = contenedorProducto.querySelector(".comprar")
    
        if (!botonComprar) {
        console.error("No se pudo encontrar el botón de comprar")
        return
        }
    
        // Obtener el ID del producto desde el atributo data-id del botón
        const productoId = botonComprar.getAttribute("data-id")
    
        if (!productoId) {
        console.error("No se pudo obtener el ID del producto")
        return
        }
    
        // Mostrar los detalles del producto
        mostrarDetalleProducto(productoId)
    }
    
    // Función para observar cambios en el DOM y agregar event listeners a las imágenes
    function observarCambiosDOM() {
        // Crear un nuevo observador
        const observer = new MutationObserver((mutations) => {
        // Para cada mutación
        mutations.forEach((mutation) => {
            // Si se agregaron nodos
            if (mutation.addedNodes.length) {
            // Verificar si hay imágenes de productos y agregar event listeners
            agregarClickAImagenesProductos()
            }
        })
        })
    
        // Configurar el observador para observar cambios en el contenedor principal
        const containerPrincipal = document.getElementById("container-principal")
        if (containerPrincipal) {
        observer.observe(containerPrincipal, { childList: true, subtree: true })
        }
    
        // También agregar event listeners a las imágenes existentes
        agregarClickAImagenesProductos()
    }
    
    // Función para actualizar la URL del navegador
    function actualizarURL(url) {
        history.pushState({}, "", url)
    }
    
    // Inicializar cuando el DOM esté completamente cargado
    document.addEventListener("DOMContentLoaded", () => {
        // Iniciar la observación de cambios en el DOM
        observarCambiosDOM()
    })
    
    