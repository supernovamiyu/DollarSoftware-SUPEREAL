    // Función para agregar un producto al carrito
    async function agregarAlCarrito(productoId) {
        try {
        // Verificar si el ID es correcto
        console.log("ID recibido:", productoId)
    
        // Si el ID no es una cadena, intentar obtenerlo del botón que se hizo clic
        if (typeof productoId !== "string" && event && event.target) {
            const boton = event.target.closest("button")
            if (boton && boton.getAttribute("data-id")) {
            productoId = boton.getAttribute("data-id")
            console.log("ID corregido desde data-id:", productoId)
            }
        }
    
        // Verificar que tengamos un ID válido
        if (!productoId) {
            alert("ID de producto no válido")
            return
        }
    
        const response = await fetch(`http://localhost:3000/products/${productoId}`)
    
        if (!response.ok) {
            throw new Error(`Error al obtener el producto: ${response.status}`)
        }
    
        const producto = await response.json()
        console.log("Producto recibido de la API:", producto)
    
        // Verifica que el producto tenga los datos necesarios
        if (!producto || !producto.id_productos) {
            alert("No se pudo obtener la información del producto")
            return
        }
    
        const carrito = JSON.parse(localStorage.getItem("carrito")) || []
        const productoExistente = carrito.find((item) => item.id_productos === producto.id_productos)
    
        if (productoExistente) {
            productoExistente.cantidad++
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
    
        localStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito() // Actualiza el carrito después de agregar un producto
        alert("Producto agregado al carrito")
        } catch (error) {
        console.error("Error al agregar al carrito:", error)
        alert("No se pudo agregar el producto al carrito: " + error.message)
        }
    }
    
    function renderizarProducto(producto) {
        // Asegurarse de que el precio sea un número antes de multiplicar
        const precio = Number.parseFloat(producto.precio)
        const subtotal = precio * producto.cantidad
    
        return `
            <div class="producto-carrito" style="margin: 10px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; flex: 1;">
                    <img src="${producto.imagen_url}" alt="${producto.nombre_producto}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px; border-radius: 4px;">
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 5px 0; font-size: 16px;">${producto.nombre_producto}</h3>
                        <div style="display: flex; align-items: center; margin-bottom: 5px;">
                            <button onclick="actualizarCantidad('${producto.id_productos}', ${producto.cantidad - 1})" style="width: 25px; height: 25px; border: 1px solid #ddd; border-radius: 4px; background: #f8f8f8; cursor: pointer;">-</button>
                            <span style="margin: 0 10px; font-weight: bold;">${producto.cantidad}</span>
                            <button onclick="actualizarCantidad('${producto.id_productos}', ${producto.cantidad + 1})" style="width: 25px; height: 25px; border: 1px solid #ddd; border-radius: 4px; background: #f8f8f8; cursor: pointer;">+</button>
                        </div>
                        <p style="margin: 0; font-size: 14px; color: #666;">Precio unitario: $${isNaN(precio) ? 0 : precio.toLocaleString()}</p>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; min-width: 120px;">
                    <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 16px;">$${isNaN(subtotal) ? 0 : subtotal.toLocaleString()}</p>
                    <button onclick="eliminarDelCarrito('${producto.id_productos}')" style="padding: 5px 10px; border: none; border-radius: 4px; background: #ff4d4d; color: white; cursor: pointer;">Eliminar</button>
                </div>
            </div>
        `
    }
    
    // Función para mostrar el carrito
    function mostrarCarrito() {
        const containerPrincipal = document.getElementById("container-principal")
        const template = document.getElementById("plantilla-carrito")
        const clon = template.content.cloneNode(true)
        containerPrincipal.innerHTML = ""
        containerPrincipal.appendChild(clon)
    
        const carrito = JSON.parse(localStorage.getItem("carrito")) || []
        const contenedorCarrito = document.getElementById("contenedor-productos-carrito")
    
        if (!contenedorCarrito) {
        console.error("El contenedor del carrito no existe.")
        return
        }
    
        contenedorCarrito.innerHTML = ""
    
        if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>No hay productos en el carrito</p>"
        return
        }
    
        let total = 0
    
        carrito.forEach((producto) => {
        contenedorCarrito.innerHTML += renderizarProducto(producto)
        const precio = Number.parseFloat(producto.precio)
        if (!isNaN(precio)) {
            total += precio * producto.cantidad
        }
        })
    
        // Agregar el total al final del carrito
        contenedorCarrito.innerHTML += `
            <div style="margin-top: 20px; padding: 15px; border-top: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-size: 18px;">Total:</h3>
                <p style="margin: 0; font-weight: bold; font-size: 20px;">$${total.toLocaleString()}</p>
            </div>
            <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
                <button onclick="procederAlPago()" style="padding: 10px 20px; border: none; border-radius: 4px; background: rgb(113, 137, 255); color: white; cursor: pointer; font-weight: bold; margin-bottom: 20px;">Proceder al pago</button>
            </div>
        `
    }
    
    function actualizarCantidad(productoId, nuevaCantidad) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || []
        const productoIndex = carrito.findIndex((item) => item.id_productos === productoId)
    
        if (productoIndex !== -1) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(productoId)
        } else {
            carrito[productoIndex].cantidad = nuevaCantidad
            localStorage.setItem("carrito", JSON.stringify(carrito))
            mostrarCarrito() // Actualiza la visualización del carrito
        }
        }
    }
    
    function eliminarDelCarrito(productoId) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || []
        carrito = carrito.filter((item) => item.id_productos !== productoId)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        mostrarCarrito() // Actualiza la visualización del carrito
    }
    
    function procederAlPago() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || []
        if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de proceder al pago.")
        return
        }
        // Aquí puedes redirigir al usuario a una página de pago o mostrar un formulario de pago
        alert("Funcionalidad de pago en desarrollo.")
    }
    
    