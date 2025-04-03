    // Función para cargar las opiniones existentes del producto
    function cargarOpiniones(productoId) {

        function mostrarOpiniones(opiniones) {
        // Implementación de la función mostrarOpiniones
        console.log("Opiniones:", opiniones) // Ejemplo: mostrar en la consola
        // Aquí deberías agregar la lógica para mostrar las opiniones en el DOM
        }

        fetch(`http://localhost:3000/opinions/${productoId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudieron cargar las opiniones")
            }
            return response.json()
        })
        .then((opiniones) => {
            mostrarOpiniones(opiniones)
        })
        .catch((error) => {
            console.error("Error al cargar opiniones:", error)
        })
    }
    
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
    
            // Crear un contenedor para las opiniones
            const opinionesContainer = document.createElement("div")
            opinionesContainer.id = "opiniones-container"
            containerPrincipal.appendChild(opinionesContainer)
    
            // Cargar y mostrar las opiniones existentes
            cargarOpiniones(producto.id_productos)
    
            // Añadir el formulario de opiniones
            agregarFormularioOpiniones(producto.id_productos)
        })
        .catch((error) => {
            console.error("Error al cargar los detalles del producto:", error)
            alert("No se pudo cargar los detalles del producto")
        })
    }
    
    // Función para cargar las opiniones existentes del producto
    function cargarOpiniones(productoId) {
        const url = `http://localhost:3000/opinions/${productoId}`
        console.log("Intentando cargar opiniones desde:", url)
    
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las opiniones")
                }
                return response.json()
            })
            .then((opiniones) => {
                console.log("Opiniones recibidas:", opiniones)
                mostrarOpiniones(opiniones)
            })
            .catch((error) => {
                console.error("Error al cargar opiniones:", error)
                // No mostramos alerta para no interrumpir la experiencia del usuario
            })
    }
    
    // Función para mostrar las opiniones en la página
    function mostrarOpiniones(opiniones, limite = 2) {
        // Obtener el contenedor de opiniones
        const opinionesContainer = document.getElementById("opiniones-container")
        opinionesContainer.innerHTML = "" // Limpiar el contenedor antes de agregar nuevas opiniones
        opinionesContainer.className = "opiniones-container"
    
        // Título de la sección
        const tituloOpiniones = document.createElement("div")
        tituloOpiniones.className = "titulo-seccion"
        tituloOpiniones.innerHTML = "<h4>Opiniones de los usuarios</h4>"
        opinionesContainer.appendChild(tituloOpiniones)
    
        // Si no hay opiniones, mostrar mensaje
        if (!opiniones || opiniones.length === 0) {
        const sinOpiniones = document.createElement("p")
        sinOpiniones.className = "sin-opiniones"
        sinOpiniones.textContent = "Aún no hay opiniones para este producto. ¡Sé el primero en opinar!"
        opinionesContainer.appendChild(sinOpiniones)
        } else {
        // Crear lista de opiniones
        const listaOpiniones = document.createElement("div")
        listaOpiniones.className = "lista-opiniones"
    
        // Determinar cuántas opiniones mostrar inicialmente
        const opinionesAMostrar = opiniones.slice(0, limite)
        const hayMasOpiniones = opiniones.length > limite
    
        // Agregar cada opinión a la lista (limitado)
        opinionesAMostrar.forEach((opinion) => {
            const opinionElement = document.createElement("div")
            opinionElement.className = "opinion-item"
    
            // Determinar el nombre a mostrar
            const nombreUsuario = opinion.es_anonimo === 1 ? "Usuario anónimo" : opinion.nombre_usuario || "Usuario"
    
            // Formatear la fecha
            const fecha = new Date(opinion.fecha).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            })
    
            // Crear el HTML de la opinión
            opinionElement.innerHTML = `
                    <div class="opinion-header">
                        <span class="opinion-usuario">${nombreUsuario}</span>
                        <span class="opinion-fecha">${fecha}</span>
                    </div>
                    <div class="opinion-contenido">
                        <p>${opinion.opinion}</p>
                    </div>
                `
    
            listaOpiniones.appendChild(opinionElement)
        })
    
        opinionesContainer.appendChild(listaOpiniones)
    
        // Si hay más opiniones, mostrar botón "Ver más"
        if (hayMasOpiniones) {
            const verMasBtn = document.createElement("button")
            verMasBtn.className = "boton-ver-mas"
            verMasBtn.textContent = `Ver más opiniones (${opiniones.length - limite} restantes)`
    
            // Al hacer clic en "Ver más", mostrar todas las opiniones
            verMasBtn.addEventListener("click", () => {
            // Eliminar el botón "Ver más"
            verMasBtn.remove()
    
            // Mostrar todas las opiniones
            mostrarTodasLasOpiniones(opiniones, listaOpiniones)
            })
    
            opinionesContainer.appendChild(verMasBtn)
        }
        }
    }
    
    // Función auxiliar para mostrar todas las opiniones
    function mostrarTodasLasOpiniones(opiniones, listaOpiniones) {
        // Limpiar la lista actual
        listaOpiniones.innerHTML = ""
    
        // Mostrar todas las opiniones
        opiniones.forEach((opinion) => {
        const opinionElement = document.createElement("div")
        opinionElement.className = "opinion-item"
    
        // Determinar el nombre a mostrar
        const nombreUsuario = opinion.es_anonimo === 1 ? "Usuario anónimo" : opinion.nombre_usuario || "Usuario"
    
        // Formatear la fecha
        const fecha = new Date(opinion.fecha).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    
        // Crear el HTML de la opinión
        opinionElement.innerHTML = `
                <div class="opinion-header">
                    <span class="opinion-usuario">${nombreUsuario}</span>
                    <span class="opinion-fecha">${fecha}</span>
                </div>
                <div class="opinion-contenido">
                    <p>${opinion.opinion}</p>
                </div>
            `
    
        listaOpiniones.appendChild(opinionElement)
        })
    }
    
    // Función para agregar el formulario de opiniones
    function agregarFormularioOpiniones(productoId) {
        const containerPrincipal = document.getElementById("container-principal")
    
        // Crear el contenedor del formulario
        const formularioContainer = document.createElement("div")
        formularioContainer.className = "seccion-opiniones"
    
        // Título del formulario
        const tituloFormulario = document.createElement("div")
        tituloFormulario.className = "titulo-seccion"
        tituloFormulario.innerHTML = "<h4>Deja tu opinión</h4>"
        formularioContainer.appendChild(tituloFormulario)
    
        // Crear el formulario
        const formulario = document.createElement("form")
        formulario.id = "formulario-opiniones"
        formulario.innerHTML = `
            <textarea id="opinion" placeholder="Escribe tu opinión aquí..." required></textarea>
            <div class="opciones-opinion">
                <label class="checkbox-container">
                    <input type="checkbox" id="anonimo"> Quiero permanecer anónimo
                </label>
            </div>
            <button type="submit" class="boton-enviar-opinion">Enviar Opinión</button>
        `
    
        // Agregar evento de envío al formulario
        formulario.addEventListener("submit", (event) => {
        event.preventDefault()
        enviarOpinion(productoId)
        })
    
        formularioContainer.appendChild(formulario)
    
        // Agregar el formulario al contenedor principal
        containerPrincipal.appendChild(formularioContainer)
    }
    
    // Función para verificar si el usuario está autenticado
    function verificarAutenticacion() {
        // Aquí deberías implementar la lógica para verificar si el usuario está autenticado
        // Por ejemplo, verificar si hay un token en localStorage o una cookie de sesión
    
        // Por ahora, simulamos que no hay usuario autenticado
        return {
        autenticado: false,
        id_usuario: null,
        }
    }
    
    // Función para enviar la opinión
    function enviarOpinion(productoId) {
        const opinionInput = document.getElementById("opinion")
        const anonimoCheckbox = document.getElementById("anonimo")
    
        const contenidoOpinion = opinionInput.value.trim()
        const esAnonimo = anonimoCheckbox.checked ? 1 : 0
    
        // Validar que la opinión no esté vacía
        if (contenidoOpinion === "") {
        mostrarMensaje("Por favor, escribe tu opinión.", "error")
        return
        }
    
        // Verificar si el usuario está autenticado
        const usuario = verificarAutenticacion()
    
        // Si no está autenticado y no es anónimo, redirigir a inicio de sesión
        if (!usuario.autenticado && esAnonimo === 0) {
        mostrarMensaje("Debes iniciar sesión para enviar una opinión con tu nombre.", "info")
        // Aquí deberías redirigir a la página de inicio de sesión
        // Por ahora, mostramos un mensaje
        setTimeout(() => {
            alert("Funcionalidad de inicio de sesión en desarrollo. Por favor, marca la opción 'Anónimo' para continuar.")
        }, 1000)
        return
        }
    
        // Preparar los datos para enviar
        const opinionData = {
        fk_id_productos: productoId,
        fk_id_usuario: usuario.autenticado ? usuario.id_usuario : null,
        es_anonimo: esAnonimo,
        opinion: contenidoOpinion,
        // La fecha se generará en el servidor
        }
    
        // Enviar la opinión al servidor
        fetch("http://localhost:3000/opinions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(opinionData),
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Error al enviar la opinión")
            }
            return response.json()
        })
        .then((data) => {
            mostrarMensaje("¡Opinión enviada con éxito!", "success")
            opinionInput.value = "" // Limpiar el campo de opinión
            anonimoCheckbox.checked = false // Desmarcar el checkbox
    
            // Recargar las opiniones para mostrar la nueva
            cargarOpiniones(productoId)
        })
        .catch((error) => {
            console.error("Error:", error)
            mostrarMensaje("No se pudo enviar la opinión. Intenta de nuevo más tarde.", "error")
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
    
    // Exportar funciones para que sean accesibles desde otros archivos
    window.mostrarDetalleProducto = mostrarDetalleProducto
    