document.addEventListener("DOMContentLoaded", () => {
    // Verificar si estamos en la página de perfil
    const perfilContainer = document.querySelector(".user-profile-container")
    if (perfilContainer) {
        configurarBotonesPerfil()
    }

    // Usar event delegation para capturar cuando se cargue dinámicamente el perfil
    document.addEventListener("click", (event) => {
        // Verificar si se hizo clic en algún botón del perfil
        if (event.target && event.target.closest(".user-option-button button")) {
            const boton = event.target.closest(".user-option-button button")
            manejarClickBotonPerfil(boton.id)
        }
    })
})

// Configurar los botones del perfil cuando se carga la página
function configurarBotonesPerfil() {
    const gestionPedidosBtn = document.getElementById("gestion-de-pedidos-boton-perfil")
    const historialProductosBtn = document.getElementById("historial-de-productos-boton-perfil")
    const modificarDatosBtn = document.getElementById("agregar-o-modificar-datos-boton-perfil")

    if (gestionPedidosBtn) {
        gestionPedidosBtn.addEventListener("click", () => manejarClickBotonPerfil("gestion-de-pedidos-boton-perfil"))
    }

    if (historialProductosBtn) {
        historialProductosBtn.addEventListener("click", () => manejarClickBotonPerfil("historial-de-productos-boton-perfil"),
        )
    }

    if (modificarDatosBtn) {
        modificarDatosBtn.addEventListener("click", () => manejarClickBotonPerfil("agregar-o-modificar-datos-boton-perfil"))
    }

}

// Manejar el clic en los botones del perfil
function manejarClickBotonPerfil(botonId) {
    // Ocultar todas las secciones primero
    ocultarTodasLasSecciones()

    // Mostrar la sección correspondiente según el botón
    switch (botonId) {
        case "gestion-de-pedidos-boton-perfil":
            mostrarSeccionPerfil("seccion-gestion-pedidos")
            break
        case "historial-de-productos-boton-perfil":
            mostrarSeccionPerfil("seccion-historial-productos")
            break
        case "agregar-o-modificar-datos-boton-perfil":
            mostrarSeccionPerfil("seccion-modificar-datos")
            break
    }

    // Actualizar estilos de los botones
    actualizarEstilosBotones(botonId)
}

// Mostrar una sección específica del perfil
function mostrarSeccionPerfil(seccionId) {
    // Verificar si la sección ya existe
    let seccion = document.getElementById(seccionId)

    if (!seccion) {
        // Si no existe, crear la sección
        seccion = document.createElement("div")
        seccion.id = seccionId
        seccion.className = "seccion-perfil"

        // Agregar la sección después de los botones
        const perfilContainer = document.querySelector(".user-profile-container")
        if (perfilContainer) {
            perfilContainer.appendChild(seccion)
        }

        // Cargar el contenido según la sección
        cargarContenidoSeccion(seccionId, seccion)
    }

    // Mostrar la sección
    seccion.style.display = "block"
}

// Cargar el contenido específico para cada sección
function cargarContenidoSeccion(seccionId, seccionElement) {
    switch (seccionId) {
        case "seccion-gestion-pedidos":
            // Crear el contenido para la gestión de los pedidos

            seccionElement.innerHTML = `
                    <section id="contenedor-gestion-pedidos">
                        <div class="titulo-seccion">
                            <h4>Gestión de Pedidos</h4>
                        </div>
                        <div class="contenedor-pedidos">
                            <table class="tabla-de-pedidos">
                                <thead>
                                    <tr>
                                        <th>Identificador del Pedido</th>
                                        <th>Fecha del Pedido</th>
                                        <th>Ciudad</th>
                                        <th>Dirección</th>
                                        <th>Estado del Pedido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Identificador 1234567890</td>
                                        <td>15/03/2023</td>
                                        <td>Bogotá D.C.</td>
                                        <td>Carrera X #Z-Y</td>
                                        <td>En preparación</td>
                                    </tr>
                                    <tr>
                                        <td>Identificador 1234567890</td>
                                        <td>15/03/2023</td>
                                        <td>Bogotá D.C.</td>
                                        <td>Carrera X #Z-Y</td>
                                        <td>En preparación</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
            `
            break

        case "seccion-historial-productos":
            // Crear contenido para historial de productos
            seccionElement.innerHTML = `
                    <section id="contenedor-historial-productos">
                        <div class="titulo-seccion">
                            <h4>Historial de productos</h4>
                        </div>
                        <div class="contenedor-historial">
                            <table class="tabla-de-historial">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Fecha de compra</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Smartphone XYZ</td>
                                        <td>15/03/2023</td>
                                        <td>$599.99</td>
                                        <td>Entregado</td>
                                        <td><a href="#">Ver detalles</a></td>
                                    </tr>
                                    <tr>
                                        <td>Laptop ABC</td>
                                        <td>02/01/2023</td>
                                        <td>$1299.99</td>
                                        <td>Entregado</td>
                                        <td><a href="#">Ver detalles</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                `
            break

        case "seccion-modificar-datos":
            // Crear contenido para modificar datos
            seccionElement.innerHTML = `
                    <section id="contenedor-modificar-datos">
                        <div class="titulo-seccion">
                            <h4>Modificar datos personales</h4>
                        </div>
                        <form id="form-modificar-datos" class="form-datos-personales">
                            <div class="form-group">
                                <label for="nombre_completo">Nombre completo:</label>
                                <input type="text" id="nombre_completo" name="nombre_completo" class="form-input" value="${usuarioActual ? usuarioActual.nombre_completo : ""}" required>
                            </div>
                            <div class="form-group">
                                <label for="correo">Correo electrónico:</label>
                                <input type="email" id="correo" name="correo" class="form-input" value="${usuarioActual ? usuarioActual.correo : ""}" required>
                            </div>
                            <div class="form-group">
                                <label for="telefono">Teléfono:</label>
                                <input type="tel" id="telefono" name="telefono" class="form-input" placeholder="Ingrese su número telefónico">
                            </div>
                            <div class="form-group">
                                <label for="direccion">Dirección:</label>
                                <input type="text" id="direccion" name="direccion" class="form-input" placeholder="Ingrese su dirección">
                            </div>
                            <button type="submit" class="auth-button primary-button">
                                <i class="fa-solid fa-save"></i>
                                Guardar cambios
                            </button>
                        </form>
                    </section>
                `

            // Agregar event listener para el formulario
            const formModificarDatos = seccionElement.querySelector("#form-modificar-datos")
            if (formModificarDatos) {
                formModificarDatos.addEventListener("submit", (event) => {
                    event.preventDefault()
                    guardarDatosUsuario(formModificarDatos)
                })
            }
            break
    }
}

// Ocultar todas las secciones del perfil
function ocultarTodasLasSecciones() {
    const secciones = document.querySelectorAll(".seccion-perfil")
    secciones.forEach((seccion) => {
        seccion.style.display = "none"
    })
}

// Actualizar los estilos de los botones para mostrar cuál está activo
function actualizarEstilosBotones(botonActivoId) {
    const botones = document.querySelectorAll(".user-option-button button")
    botones.forEach((boton) => {
        if (boton.id === botonActivoId) {
            boton.classList.add("active")
        } else {
            boton.classList.remove("active")
        }
    })
}

// Guardar los datos del usuario
function guardarDatosUsuario(formulario) {
    // Aquí implementarías la lógica para guardar los datos
    // Por ahora, solo mostraremos un mensaje de éxito
    mostrarMensaje("Datos guardados correctamente", "success")
}

