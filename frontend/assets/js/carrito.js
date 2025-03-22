// Escuchar el evento carritoCargado
document.addEventListener('carritoCargado', function () {
    // Llamar a mostrarCarrito cuando se dispare el evento
    mostrarCarrito();
});


// Función para agregar un producto al carrito
async function agregarAlCarrito(productoId) {
    try {
        // Verificar si el ID es correcto
        console.log("ID recibido:", productoId);

        // Si el ID no es una cadena, intentar obtenerlo del botón que se hizo clic
        if (typeof productoId !== "string" && event && event.target) {
            const boton = event.target.closest("button");
            if (boton && boton.getAttribute("data-id")) {
                productoId = boton.getAttribute("data-id");
                console.log("ID corregido desde data-id:", productoId);
            }
        }

        // Verificar que tengamos un ID válido
        if (!productoId) {
            alert("ID de producto no válido");
            return
        }

        const response = await fetch(`http://localhost:3000/products/${productoId}`);

        if (!response.ok) {
            throw new Error(`Error al obtener el producto: ${response.status}`);
        }

        const producto = await response.json();
        console.log("Producto recibido de la API:", producto);

        // Verifica que el producto tenga los datos necesarios
        if (!producto || !producto.id_productos) {
            mostrarMensaje("No se pudo obtener la información del producto");
            return
        }

        const carrito = JSON.parse(localStorage.getItem("carrito")) || []
        const productoExistente = carrito.find((item) => item.id_productos === producto.id_productos);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            // Guardamos el producto con los nombres exactos de las propiedades de la base de datos
            carrito.push({
                id_productos: producto.id_productos,
                nombre_producto: producto.nombre_producto,
                precio: producto.precio,
                imagen_url: producto.imagen_url,
                cantidad: 1,
            })
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito(); // Actualiza el carrito después de agregar un producto
        mostrarMensaje("Producto agregado al carrito");
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        mostrarMensaje("No se pudo agregar el producto al carrito: " + error.message);
    }
}

function renderizarProducto(producto) {
    // Asegurarse de que el precio sea un número antes de multiplicar
    const precio = Number.parseFloat(producto.precio);
    const subtotal = precio * producto.cantidad;

    return `
            <div class="contenedor-producto-unico-carrito">
                <div class="producto-individual-carrito">
                    <img class = "imagen-producto-individual-carrito" src="${producto.imagen_url}" alt="${producto.nombre_producto}">
                    <div class = "informacion-producto-carrito">
                        <h3 class ="nombre-producto-en-el-carrito">${producto.nombre_producto}</h3>
                        <div class="botones-productos-carrito-compras">
                            <button class="actualizar-cantidad-producto-carrito" onclick="actualizarCantidad('${producto.id_productos}', ${producto.cantidad - 1})">-</button>
                            <span class="cantidad-producto-individual-carrito">${producto.cantidad}</span>
                            <button class="actualizar-cantidad-producto-carrito" onclick="actualizarCantidad('${producto.id_productos}', ${producto.cantidad + 1})">+</button>
                        </div>
                        <p class="precio-unitario-producto-carrito">Precio unitario: $${isNaN(precio) ? 0 : precio.toLocaleString()}</p>
                    </div>
                </div>
                <div class="contenedor-subtotal-eliminar-producto">
                    <p class="subtotal-producto-carrito">$${isNaN(subtotal) ? 0 : subtotal.toLocaleString()}</p>
                    <button class="eliminar-producto-individual-carrito" onclick="eliminarDelCarrito('${producto.id_productos}')">Eliminar</button>
                </div>
            </div>
        `
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const containerPrincipal = document.getElementById("container-principal");
    const template = document.getElementById("plantilla-carrito");
    const clon = template.content.cloneNode(true);
    containerPrincipal.innerHTML = "";
    containerPrincipal.appendChild(clon);

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedorCarrito = document.getElementById("contenedor-productos-carrito");

    if (!contenedorCarrito) {
        console.error("El contenedor del carrito no existe.");
        return
    }

    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>¡No hay productos en el carrito!</p>";
        return
    }

    let total = 0;

    carrito.forEach((producto) => {
        contenedorCarrito.innerHTML += renderizarProducto(producto);
        const precio = Number.parseFloat(producto.precio);
        if (!isNaN(precio)) {
            total += precio * producto.cantidad;
        }
    })

    // Agregar el total al final del carrito
    contenedorCarrito.innerHTML += `
            <div class="contenedor-total-compra-carrito">
                <h3 class="titulo-total-compra-carrito">Total:</h3>
                <p class ="total-compra-del-carrito">$${total.toLocaleString()}</p>
            </div>
            <div class="contenedor-boton-proceder-al-pago">
                <button class="boton-proceder-al-pago" onclick="procederAlPago()">Proceder al pago</button>
            </div>
        `
}

function actualizarCantidad(productoId, nuevaCantidad) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoIndex = carrito.findIndex((item) => item.id_productos === productoId);

    if (productoIndex !== -1) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(productoId);
        } else {
            carrito[productoIndex].cantidad = nuevaCantidad;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito(); // Actualiza la visualización del carrito
        }
    }
}

function eliminarDelCarrito(productoId) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter((item) => item.id_productos !== productoId);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(); // Actualiza la visualización del carrito
}

function procederAlPago() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        mostrarMensaje("Tu carrito está vacío. Agrega productos antes de proceder al pago.");
        return
    }
    // Aquí puedes redirigir al usuario a una página de pago o mostrar un formulario de pago
    mostrarMensaje("Funcionalidad de pago en desarrollo.");
}

