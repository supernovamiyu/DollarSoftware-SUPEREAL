// Funcionalidad para la vista de producto individual

// Función para cargar y mostrar un producto individual
async function cargarProductoIndividual(id_productos) {
    try {
        // Verificar que tenemos un ID válido
        if (!id_productos) {
            console.error("ID de producto no proporcionado")
            return
        }

        // Obtener el contenedor principal
        const containerPrincipal = document.getElementById("container-principal")

        // Obtener la plantilla
        const plantillaProducto = document.getElementById("plantilla-vista-productos-individuales")

        if (!containerPrincipal || !plantillaProducto) {
            console.error("No se encontraron los elementos necesarios en el DOM")
            return
        }

        // Limpiar el contenedor
        containerPrincipal.innerHTML = ""

        // Clonar la plantilla
        const contenidoProducto = plantillaProducto.content.cloneNode(true)

        // Agregar el contenido al contenedor
        containerPrincipal.appendChild(contenidoProducto)

        // Realizar la petición a la API para obtener los datos del producto
        const respuesta = await fetch(`http://localhost:3000/products/${id_productos}`)

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el producto: ${respuesta.status}`)
        }

        const producto = await respuesta.json()

        // Actualizar la interfaz con los datos del producto
        actualizarInterfazProducto(producto)

        // Configurar los eventos de la interfaz
        configurarEventosProducto(producto)
    } catch (error) {
        console.error("Error al cargar el producto:", error)

        // Mostrar mensaje de error en la interfaz
        const tituloProducto = document.querySelector(".titulo-producto-individual")
        if (tituloProducto) {
            tituloProducto.innerHTML = "<h4>Error al cargar el producto</h4>"
        }

            const resultadoProducto = document.getElementById("resultado-producto")
            if (resultadoProducto) {
                resultadoProducto.innerHTML = `
                    <div class="error-mensaje">
                        <p>No se pudo cargar la información del producto. Por favor, intente nuevamente más tarde.</p>
                        <button onclick="mostrarPantallaInicio(event)" class="boton-volver">Volver al inicio</button>
                    </div>
                `
            }
        }
    }

    // Función para actualizar la interfaz con los datos del producto
    function actualizarInterfazProducto(producto) {
        // Actualizar título
        const tituloProducto = document.querySelector(".titulo-producto-individual")
        if (tituloProducto) {
            tituloProducto.innerHTML = `<h4>${producto.nombre_producto}</h4>`
        }

        // Actualizar contenido principal
        const resultadoProducto = document.getElementById("resultado-producto")
        if (resultadoProducto) {
            resultadoProducto.innerHTML = `
                <div class="vista-producto-container">
                    <div class="producto-galeria">
                        <div class="producto-imagen-principal">
                            <img id="producto-imagen-principal" src="${producto.imagen_url}" alt="${producto.nombre_producto}">
                        </div>
                        <div class="producto-miniaturas">
                            <div class="miniatura-item active"><img src="${producto.imagen_url}" alt="${producto.nombre_producto}"></div>
                            ${producto.imagenes_adicionales
                    ? producto.imagenes_adicionales
                        .map(
                            (url, index) =>
                                `<div class="miniatura-item"><img src="${url}" alt="${producto.nombre_producto} - Imagen ${index + 1}"></div>`,
                        )
                        .join("")
                    : ""
                }
                        </div>
                    </div>
                    
                    <div class="producto-detalles">
                        <div class="producto-descripcion">
                            <h5>Descripción y especificaciones:</h5>
                            <p id="producto-descripcion">${producto.descripcion || "No hay descripción disponible para este producto."}</p>
                        </div>
                        
                        <div class="producto-compra">
                            <div class="producto-cantidad">
                                <button class="btn-cantidad btn-disminuir">-</button>
                                <span id="cantidad-producto">1</span>
                                <button class="btn-cantidad btn-aumentar">+</button>
                            </div>
                            
                            <div class="producto-precio">
                                <span id="producto-precio">$${Number.parseInt(producto.precio).toLocaleString()}</span>
                            </div>
                            
                            <button id="btn-agregar-carrito" class="boton-agregar-carrito">Añadir al carrito</button>
                        </div>
                    </div>
                    
                    <div class="producto-opiniones">
                        <h5>Opiniones</h5>
                        <div class="producto-calificacion">
                            <span class="estrellas">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </span>
                            <span class="calificacion-texto">4.0/5.0 (12 opiniones)</span>
                        </div>
                        
                        <div id="producto-comentarios" class="producto-comentarios">
                            <p>No hay comentarios para este producto.</p>
                        </div>
                        
                        <div class="producto-comentario-nuevo">
                            <textarea id="comentario-nuevo" placeholder="Escribe aquí tu reseña..."></textarea>
                            <button id="btn-enviar-comentario">Enviar</button>
                        </div>
                    </div>
                </div>
            `
        }
    }

// Función para configurar los eventos de la interfaz
function configurarEventosProducto(producto) {
    // Configurar botones de cantidad
    const btnDisminuir = document.querySelector(".btn-disminuir")
    const btnAumentar = document.querySelector(".btn-aumentar")
    const cantidadProducto = document.getElementById("cantidad-producto")

    let cantidad = 1

    if (btnDisminuir && btnAumentar && cantidadProducto) {
        btnDisminuir.addEventListener("click", () => {
            if (cantidad > 1) {
                cantidad--
                cantidadProducto.textContent = cantidad
            }
        })

        btnAumentar.addEventListener("click", () => {
            // Aquí podrías verificar contra el stock disponible
            cantidad++
            cantidadProducto.textContent = cantidad
        })
    }

    // Configurar botón de agregar al carrito
    const btnAgregarCarrito = document.getElementById("btn-agregar-carrito")
    if (btnAgregarCarrito) {
        btnAgregarCarrito.addEventListener("click", () => {
            agregarAlCarrito(
                producto.id_productos,
                producto.nombre_producto,
                Number.parseInt(producto.precio),
                producto.imagen_url,
                cantidad,
            )
        })
    }

    // Configurar miniaturas (si hay)
    const miniaturas = document.querySelectorAll(".miniatura-item")
    const imagenPrincipal = document.getElementById("producto-imagen-principal")

    if (miniaturas.length > 0 && imagenPrincipal) {
        miniaturas.forEach((miniatura) => {
            miniatura.addEventListener("click", () => {
                // Remover clase activa de todas las miniaturas
                miniaturas.forEach((m) => m.classList.remove("active"))

                // Agregar clase activa a la miniatura seleccionada
                miniatura.classList.add("active")

                // Actualizar imagen principal
                const miniaturaImg = miniatura.querySelector("img")
                if (miniaturaImg && miniaturaImg.src) {
                    imagenPrincipal.src = miniaturaImg.src
                }
            })
        })
    }

    // Configurar envío de comentarios
    const btnEnviarComentario = document.getElementById("btn-enviar-comentario")
    const comentarioNuevo = document.getElementById("comentario-nuevo")

    if (btnEnviarComentario && comentarioNuevo) {
        btnEnviarComentario.addEventListener("click", async () => {
            const texto = comentarioNuevo.value.trim()

            if (!texto) {
                mostrarMensaje("Por favor, escribe un comentario antes de enviar.", "warning")
                return
            }

            try {
                // Aquí iría la lógica para enviar el comentario a tu API
                // Por ahora, solo simulamos la acción
                mostrarMensaje("Funcionalidad de comentarios en desarrollo.", "info")
                comentarioNuevo.value = ""
            } catch (error) {
                console.error("Error al enviar comentario:", error)
                mostrarMensaje("No se pudo enviar el comentario. Intente nuevamente más tarde.", "error")
            }
        })
    }
}

// Función para mostrar la pantalla de producto individual
function mostrarPantallaProductoIndividual(event, id_productos) {
    if (event) {
        event.preventDefault()
    }

    // Cargar el producto
    cargarProductoIndividual(id_productos)
}

// Agregar la función al objeto window para que sea accesible globalmente
window.mostrarPantallaProductoIndividual = mostrarPantallaProductoIndividual

// Declaración de funciones globales (simuladas para el ejemplo)
function agregarAlCarrito(id_productos, nombre_producto, precio, imagen_url, cantidad) {
    console.log("Producto agregado al carrito:", { id_productos, nombre_producto, precio, imagen_url, cantidad })
}

function mostrarMensaje(mensaje, tipo) {
    console.log("Mensaje:", mensaje, "Tipo:", tipo)
}

