    // AuthView.js - Vista para la autenticación de usuarios
    import { BaseView } from "./base.view.js"

    class AuthView extends BaseView {
    constructor() {
        super()
        this.setupEventListeners()
    }

    // Mostrar la pantalla de inicio de sesión/registro
    showAuthScreen() {
        const result = this.showTemplate("plantilla-sesion-registro", "container-principal")
        if (result) {
        // Configurar los formularios después de mostrar la plantilla
        this.setupForms()
        }
        return result
    }

    // Mostrar la pantalla de perfil de usuario
    showProfileScreen(userData) {
        const result = this.showTemplate("plantilla-perfil-usuario", "container-principal")
        if (result && userData) {
        this.updateProfileInfo(userData)
        this.setupProfileButtons()
        }
        return result
    }

    // Actualizar la información del perfil con los datos del usuario
    updateProfileInfo(userData) {
        const userInfoName = document.getElementById("userInfoName")
        const userInfoEmail = document.getElementById("userInfoEmail")
        const userInfoInitial = document.getElementById("userInfoInitial")

        if (userInfoName) userInfoName.textContent = userData.nombre_completo
        if (userInfoEmail) userInfoEmail.textContent = userData.correo
        if (userInfoInitial) userInfoInitial.textContent = userData.nombre_completo.charAt(0).toUpperCase()
    }

    // Configurar los botones del perfil
    setupProfileButtons() {
        const logoutButton = document.getElementById("logoutButton")
        if (logoutButton) {
        // No agregamos el event listener aquí, lo haremos desde el controlador
        logoutButton.removeEventListener("click", () => {})
        }

        const gestionPedidosBtn = document.getElementById("gestion-de-pedidos-boton-perfil")
        const historialProductosBtn = document.getElementById("historial-de-productos-boton-perfil")
        const modificarDatosBtn = document.getElementById("agregar-o-modificar-datos-boton-perfil")

        // Limpiamos los event listeners existentes
        if (gestionPedidosBtn) {
        gestionPedidosBtn.removeEventListener("click", () => {})
        }
        if (historialProductosBtn) {
        historialProductosBtn.removeEventListener("click", () => {})
        }
        if (modificarDatosBtn) {
        modificarDatosBtn.removeEventListener("click", () => {})
        }
    }

    // Configurar los formularios de autenticación
    setupForms() {
        const loginForm = document.getElementById("login-form")
        const registerForm = document.getElementById("registro-form")

        // Limpiamos los event listeners existentes
        if (loginForm) {
        loginForm.removeEventListener("submit", () => {})
        }
        if (registerForm) {
        registerForm.removeEventListener("submit", () => {})
        }
    }

    // Configurar los event listeners globales
    setupEventListeners() {
        // Usamos event delegation para capturar los formularios cuando se carguen dinámicamente
        document.removeEventListener("submit", this.handleFormSubmit)
        document.addEventListener("submit", this.handleFormSubmit)
    }

    // Manejador de eventos para los formularios
    handleFormSubmit(event) {
        // Este método será sobrescrito por el controlador
    }

    // Mostrar error en un formulario
    showFormError(elementId, message) {
        const errorElement = document.getElementById(elementId)
        if (errorElement) {
        errorElement.textContent = message
        errorElement.style.display = "block"
        }
    }

    // Actualizar la interfaz según el estado de autenticación
    updateUserInterface(user) {
        // Obtener el icono de usuario
        const userIcon = document.querySelector(".fa-user")

        if (user) {
        // Si hay un usuario autenticado, mostrar su nombre debajo del icono
        if (userIcon) {
            // Verificar si ya existe el contenedor del nombre
            let userNameElement = userIcon.parentElement.querySelector(".nombre-usuario")

            if (!userNameElement) {
            // Crear el elemento para mostrar el nombre
            userNameElement = document.createElement("span")
            userNameElement.className = "nombre-usuario"
            userNameElement.style.display = "block"
            userNameElement.style.fontSize = "12px"
            userNameElement.style.textAlign = "center"
            userNameElement.style.marginTop = "5px"
            userNameElement.style.color = "white"

            // Insertar después del icono
            userIcon.parentElement.appendChild(userNameElement)
            }

            // Actualizar el texto con el nombre del usuario
            userNameElement.textContent = user.nombre_completo.split(" ")[0]
        }
        } else {
        // Si no hay usuario autenticado, eliminar el nombre si existe
        if (userIcon) {
            const userNameElement = userIcon.parentElement.querySelector(".nombre-usuario")
            if (userNameElement) {
            userNameElement.remove()
            }
        }
        }
    }

    // Mostrar sección específica del perfil
    showProfileSection(sectionId) {
        // Ocultar todas las secciones primero
        this.hideAllSections()

        // Verificar si la sección ya existe
        let section = document.getElementById(sectionId)

        if (!section) {
        // Si no existe, crear la sección
        section = document.createElement("div")
        section.id = sectionId
        section.className = "seccion-perfil"

        // Agregar la sección después de los botones
        const profileContainer = document.querySelector(".user-profile-container")
        if (profileContainer) {
            profileContainer.appendChild(section)
        }

        // Cargar el contenido según la sección
        this.loadSectionContent(sectionId, section)
        }

        // Mostrar la sección
        section.style.display = "block"

        // Actualizar estilos de los botones
        this.updateButtonStyles(sectionId)
    }

    // Cargarar el contenido específico para cada sección
    loadSectionContent(sectionId, sectionElement) {
        switch (sectionId) {
        case "seccion-gestion-pedidos":
            sectionElement.innerHTML = `
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
                    <tbody id="tabla-pedidos-body">
                    <!-- Los pedidos se cargarán dinámicamente -->
                    </tbody>
                </table>
                </div>
            </section>
            `
            break

        case "seccion-historial-productos":
            sectionElement.innerHTML = `
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
                    <tbody id="tabla-historial-body">
                    <!-- El historial se cargará dinámicamente -->
                    </tbody>
                </table>
                </div>
            </section>
            `
            break

        case "seccion-modificar-datos":
            const userData = window.usuarioActual || {}
            sectionElement.innerHTML = `
            <section id="contenedor-modificar-datos">
                <div class="titulo-seccion">
                <h4>Modificar datos personales</h4>
                </div>
                <form id="form-modificar-datos" class="form-datos-personales">
                <div class="form-group">
                    <label for="nombre_completo">Nombre completo:</label>
                    <input type="text" id="nombre_completo" name="nombre_completo" class="form-input" value="${userData.nombre_completo || ""}" required>
                </div>
                <div class="form-group">
                    <label for="correo">Correo electrónico:</label>
                    <input type="email" id="correo" name="correo" class="form-input" value="${userData.correo || ""}" required>
                </div>
                <div class="form-group">
                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" class="form-input" placeholder="Ingrese su número telefónico" value="${userData.telefono || ""}">
                </div>
                <div class="form-group">
                    <label for="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" class="form-input" placeholder="Ingrese su dirección" value="${userData.direccion || ""}">
                </div>
                <button type="submit" class="auth-button primary-button">
                    <i class="fa-solid fa-save"></i>
                    Guardar cambios
                </button>
                </form>
            </section>
            `

            // El event listener para el formulario se agregará desde el controlador
            break
        }
    }

    // Ocultar todas las secciones del perfil
    hideAllSections() {
        const sections = document.querySelectorAll(".seccion-perfil")
        sections.forEach((section) => {
        section.style.display = "none"
        })
    }

    // Actualizar los estilos de los botones para mostrar cuál está activo
    updateButtonStyles(activeSectionId) {
        const buttons = document.querySelectorAll(".user-option-button button")
        buttons.forEach((button) => {
        if (button.id === this.getSectionButtonId(activeSectionId)) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
        })
    }

    // Obtener el ID del botón correspondiente a una sección
    getSectionButtonId(sectionId) {
        switch (sectionId) {
        case "seccion-gestion-pedidos":
            return "gestion-de-pedidos-boton-perfil"
        case "seccion-historial-productos":
            return "historial-de-productos-boton-perfil"
        case "seccion-modificar-datos":
            return "agregar-o-modificar-datos-boton-perfil"
        default:
            return ""
        }
    }
    }

    export { AuthView }

