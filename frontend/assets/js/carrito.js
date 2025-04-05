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
    mostrarPasarelaDePagos()
}

// Función para mostrar la pasarela de pagos
function mostrarPasarelaDePagos() {
    // Obtener el contenedor principal donde se mostrará la plantilla
    const containerPrincipal = document.getElementById("container-principal");
    
    // Obtener la plantilla de la pasarela de pagos
    const template = document.getElementById("pasarela-de-pagos-simulada");
    
    // Verificar si la plantilla existe
    if (!template) {
        console.error("La plantilla de la pasarela de pagos no existe");
        mostrarMensaje("Error al cargar la pasarela de pagos", "error");
        return;
    }
    
    // Clonar la plantilla
    const clon = template.content.cloneNode(true);
    
    // Limpiar el contenedor principal y agregar la plantilla
    containerPrincipal.innerHTML = "";
    containerPrincipal.appendChild(clon);
    
    // Cargar los productos del carrito en el resumen de compra
    cargarResumenCompra();
    
    // Configurar los event listeners para la pasarela de pagos
    configurarPasarelaPagos();
}

// Función para cargar el resumen de compra en la pasarela de pagos
function cargarResumenCompra() {
    // Obtener los productos del carrito
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Obtener el contenedor del resumen de productos
    const resumenProductos = document.getElementById("resumen-productos");
    const totalPagar = document.getElementById("total-pagar");
    
    if (!resumenProductos || !totalPagar) {
        console.error("No se encontraron los elementos del resumen de compra");
        return;
    }
    
    // Limpiar el contenedor
    resumenProductos.innerHTML = "";
    
    // Si no hay productos, mostrar mensaje
    if (carrito.length === 0) {
        resumenProductos.innerHTML = "<p>No hay productos en el carrito</p>";
        totalPagar.textContent = "$0";
        return;
    }
    
    // Calcular el total
    let total = 0;
    
    // Agregar cada producto al resumen
    carrito.forEach(producto => {
        const precio = Number.parseFloat(producto.precio);
        const subtotal = precio * producto.cantidad;
        total += subtotal;
        
        const productoElement = document.createElement("div");
        productoElement.className = "producto-resumen";
        productoElement.innerHTML = `
            <div class="producto-info">
                <img src="${producto.imagen_url}" alt="${producto.nombre_producto}" class="producto-imagen">
                <div class="producto-detalles">
                    <div class="producto-nombre">${producto.nombre_producto}</div>
                    <div class="producto-cantidad">Cantidad: ${producto.cantidad}</div>
                </div>
            </div>
            <div class="producto-precio">$${isNaN(subtotal) ? 0 : subtotal.toLocaleString()}</div>
        `;
        
        resumenProductos.appendChild(productoElement);
    });
    
    // Mostrar el total
    totalPagar.textContent = `$${total.toLocaleString()}`;
}

// Función para configurar los event listeners y validaciones de la pasarela de pagos
function configurarPasarelaPagos() {
    // Configurar los métodos de pago
    const opcionesPago = document.querySelectorAll('input[name="metodo-pago"]');
    if (opcionesPago.length > 0) {
        opcionesPago.forEach(opcion => {
            opcion.addEventListener('change', cambiarMetodoPago);
        });
    }
    
    // Configurar el botón de volver al carrito
    const volverCarrito = document.getElementById("volver-carrito");
    if (volverCarrito) {
        volverCarrito.addEventListener("click", mostrarCarrito);
    }
    
    // Configurar el formulario de pago
    const formularioPago = document.getElementById("formulario-pago");
    if (formularioPago) {
        formularioPago.addEventListener("submit", procesarPago);
    }
    
    // Configurar eventos para la tarjeta simulada
    configurarEventosTarjeta();
}

// Función para cambiar el método de pago
function cambiarMetodoPago(event) {
    const metodo = event.target.value;
    
    // Ocultar todos los formularios
    document.querySelectorAll('.formulario-metodo-pago').forEach(form => {
        form.style.display = 'none';
    });
    
    // Mostrar el formulario correspondiente
    const formularioActivo = document.getElementById(`formulario-${metodo}`);
    if (formularioActivo) {
        formularioActivo.style.display = 'block';
    }
}

// Función para configurar los eventos de la tarjeta simulada
function configurarEventosTarjeta() {
    // Eventos para la tarjeta simulada
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('focus', voltearTarjeta);
        cvvInput.addEventListener('blur', voltearTarjeta);
    }
    
    // Eventos para actualizar la tarjeta simulada
    const numeroTarjeta = document.getElementById('numero-tarjeta');
    const titularTarjeta = document.getElementById('titular-tarjeta');
    const fechaVencimiento = document.getElementById('fecha-vencimiento');
    
    if (numeroTarjeta) {
        numeroTarjeta.addEventListener('input', actualizarNumeroTarjeta);
    }
    
    if (titularTarjeta) {
        titularTarjeta.addEventListener('input', actualizarTitularTarjeta);
    }
    
    if (fechaVencimiento) {
        fechaVencimiento.addEventListener('input', actualizarFechaVencimiento);
    }
    
    if (cvvInput) {
        cvvInput.addEventListener('input', actualizarCVV);
    }
}

// Función para voltear la tarjeta
function voltearTarjeta() {
    const tarjeta = document.querySelector('.tarjeta-simulada');
    if (tarjeta) {
        tarjeta.classList.toggle('flip');
    }
}

// Función para actualizar el número de tarjeta en la simulación
function actualizarNumeroTarjeta(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    
    // Formatear con espacios cada 4 dígitos
    if (value.length > 0) {
        value = value.match(/.{1,4}/g).join(' ');
    }
    
    // Actualizar el input
    input.value = value;
    
    // Actualizar la visualización en la tarjeta
    const numeroTarjetaDisplay = document.querySelector('.numero-tarjeta-display');
    if (numeroTarjetaDisplay) {
        if (value.length > 0) {
            numeroTarjetaDisplay.textContent = value;
        } else {
            numeroTarjetaDisplay.textContent = '•••• •••• •••• ••••';
        }
    }
}

// Función para actualizar el titular de la tarjeta en la simulación
function actualizarTitularTarjeta(event) {
    const input = event.target;
    const value = input.value.toUpperCase();
    
    // Actualizar la visualización en la tarjeta
    const titularTarjetaDisplay = document.querySelector('.titular-tarjeta-display');
    if (titularTarjetaDisplay) {
        if (value.length > 0) {
            titularTarjetaDisplay.textContent = value;
        } else {
            titularTarjetaDisplay.textContent = 'NOMBRE DEL TITULAR';
        }
    }
}

// Función para actualizar la fecha de vencimiento en la simulación
function actualizarFechaVencimiento(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    
    // Formatear como MM/AA
    if (value.length > 0) {
        if (value.length <= 2) {
            value = value;
        } else {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
    }
    
    // Actualizar el input
    input.value = value;
    
    // Actualizar la visualización en la tarjeta
    const fechaTarjetaDisplay = document.querySelector('.fecha-tarjeta-display');
    if (fechaTarjetaDisplay) {
        if (value.length > 0) {
            fechaTarjetaDisplay.textContent = value;
        } else {
            fechaTarjetaDisplay.textContent = 'MM/AA';
        }
    }
}

// Función para actualizar el CVV en la simulación
function actualizarCVV(event) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    
    // Actualizar el input
    input.value = value;
    
    // Actualizar la visualización en la tarjeta
    const cvvDisplay = document.querySelector('.cvv-display');
    if (cvvDisplay) {
        if (value.length > 0) {
            cvvDisplay.textContent = value;
        } else {
            cvvDisplay.textContent = '•••';
        }
    }
}

// Función para procesar el pago
function procesarPago(event) {
    event.preventDefault();
    
    // Mostrar pantalla de procesamiento
    document.getElementById('formulario-pago').style.display = 'none';
    document.getElementById('procesando-pago').style.display = 'block';
    
    // Simular procesamiento (en un caso real, aquí iría la llamada al API de pago)
    setTimeout(() => {
        // Simular resultado aleatorio (éxito o error)
        const exito = Math.random() > 0.3; // 70% de probabilidad de éxito
        
        if (exito) {
            mostrarPagoExitoso();
        } else {
            mostrarPagoFallido();
        }
    }, 3000);
}

// Función para mostrar la pantalla de pago exitoso
function mostrarPagoExitoso() {
    document.getElementById('procesando-pago').style.display = 'none';
    document.getElementById('pago-exitoso').style.display = 'block';
    
    // Generar número de pedido aleatorio
    const numeroPedido = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    document.getElementById('numero-pedido').textContent = numeroPedido;
    
    // Limpiar el carrito
    localStorage.removeItem('carrito');
    
    // Configurar el botón de volver al inicio
    const volverInicio = document.getElementById('volver-inicio');
    if (volverInicio) {
        volverInicio.addEventListener('click', () => {
            // Redirigir al inicio (asumiendo que existe una función para esto)
            if (typeof mostrarPantallaInicio === 'function') {
                mostrarPantallaInicio();
            } else {
                // Recargar la página como fallback
                window.location.reload();
            }
        });
    }
}

// Función para mostrar la pantalla de pago fallido
function mostrarPagoFallido() {
    document.getElementById('procesando-pago').style.display = 'none';
    document.getElementById('pago-fallido').style.display = 'block';
    
    // Generar mensaje de error aleatorio
    const mensajesError = [
        'La transacción fue rechazada por el banco emisor.',
        'Fondos insuficientes en la cuenta.',
        'La tarjeta ha expirado.',
        'Error de comunicación con la entidad bancaria.',
        'La tarjeta ha sido reportada como perdida o robada.'
    ];
    
    const mensajeError = mensajesError[Math.floor(Math.random() * mensajesError.length)];
    document.getElementById('mensaje-error').textContent = mensajeError;
    
    // Configurar el botón de intentar nuevamente
    const intentarNuevamente = document.getElementById('intentar-nuevamente');
    if (intentarNuevamente) {
        intentarNuevamente.addEventListener('click', () => {
            document.getElementById('formulario-pago').style.display = 'block';
            document.getElementById('pago-fallido').style.display = 'none';
        });
    }
}