    import BaseView from "./base.view.js"

    /**
     * Vista para el perfil de usuario
     */
    class ProfileView extends BaseView {
    /**
     * Muestra la página de perfil del usuario
     * @param {Object} user - Datos del usuario
     */
    showProfilePage(user) {
        if (this.showTemplate("plantilla-perfil-usuario", "container-principal")) {
        this.updateProfileInfo(user)
        // Mostrar la sección de gestión de pedidos por defecto
        setTimeout(() => {
            const defaultButton = document.getElementById("gestion-de-pedidos-boton-perfil")
            if (defaultButton) {
            defaultButton.click()
            }
        }, 100)
        return true
        }
        return false
    }

    /**
     * Actualiza la información del perfil con los datos del usuario
     * @param {Object} user - Datos del usuario
     */
    updateProfileInfo(user) {
        if (!user) return

        const userInfoName = document.getElementById("userInfoName")
        const userInfoEmail = document.getElementById("userInfoEmail")
        const userInfoInitial = document.getElementById("userInfoInitial")

        if (userInfoName) userInfoName.textContent = user.nombre_completo
        if (userInfoEmail) userInfoEmail.textContent = user.correo
        if (userInfoInitial) userInfoInitial.textContent = user.nombre_completo.charAt(0).toUpperCase()
    }

    /**
     * Muestra una sección específica del perfil
     * @param {string} sectionId - ID de la sección a mostrar
     */
    showProfileSection(sectionId) {
        console.log("Mostrando sección:", sectionId)

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
        } else {
            // Si no encuentra el contenedor específico, intentar con otro contenedor general
            const generalContainer =
            document.querySelector(".profile-content") || document.querySelector(".profile-container")
            if (generalContainer) {
            generalContainer.appendChild(section)
            } else {
            // Último recurso: agregar al final del contenedor principal
            const mainContainer = document.getElementById("container-principal")
            if (mainContainer) {
                mainContainer.appendChild(section)
            }
            }
        }

        // Cargar el contenido según la sección
        this.loadSectionContent(sectionId, section)
        }

        // Mostrar la sección
        section.style.display = "block"

        // Actualizar estilos de los botones
        this.updateButtonStyles(sectionId)
    }

    /**
     * Oculta todas las secciones del perfil
     */
    hideAllSections() {
        const sections = document.querySelectorAll(".seccion-perfil")
        sections.forEach((section) => {
        section.style.display = "none"
        })
    }

    /**
     * Actualiza los estilos de los botones para mostrar cuál está activo
     * @param {string} activeSectionId - ID de la sección activa
     */
    updateButtonStyles(activeSectionId) {
        const buttons = document.querySelectorAll(".profile-button, .user-option-button button")
        buttons.forEach((button) => {
        const buttonSectionId = this.getButtonSectionId(button.id || button.getAttribute("data-section"))
        if (buttonSectionId === activeSectionId) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
        })
    }

    /**
     * Obtiene el ID de la sección correspondiente a un botón
     * @param {string} buttonId - ID del botón o atributo data-section
     * @returns {string} - ID de la sección
     */
    getButtonSectionId(buttonId) {
        if (!buttonId) return ""

        // Mapeo directo de IDs de botones a IDs de secciones
        const buttonToSectionMap = {
        "gestion-de-pedidos-boton-perfil": "seccion-gestion-pedidos",
        "historial-de-productos-boton-perfil": "seccion-historial-productos",
        "agregar-o-modificar-datos-boton-perfil": "seccion-modificar-datos",
        }

        return buttonToSectionMap[buttonId] || ""
    }

    /**
     * Carga el contenido específico para cada sección
     * @param {string} sectionId - ID de la sección
     * @param {HTMLElement} sectionElement - Elemento de la sección
     */
    loadSectionContent(sectionId, sectionElement) {
        switch (sectionId) {
        case "seccion-gestion-pedidos":
            // Crear el contenido para la gestión de los pedidos
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
            // Obtener el usuario actual
            const currentUser = window.usuarioActual || { nombre_completo: "", correo: "" }

            // Crear contenido para modificar datos
            sectionElement.innerHTML = `
            <section id="contenedor-modificar-datos">
                <div class="titulo-seccion">
                <h4>Modificar datos personales</h4>
                </div>
                <form id="form-modificar-datos" class="form-datos-personales">
                <div class="form-group">
                    <label for="nombre_completo">Nombre completo:</label>
                    <input type="text" id="nombre_completo" name="nombre_completo" class="form-input" value="${currentUser.nombre_completo}" required>
                </div>
                <div class="form-group">
                    <label for="correo">Correo electrónico:</label>
                    <input type="email" id="correo" name="correo" class="form-input" value="${currentUser.correo}" required>
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
            break
        }
    }

    /**
     * Configura los eventos para los botones del perfil
     * @param {Function} buttonClickHandler - Manejador para los botones del perfil
     */
    setupProfileButtons(buttonClickHandler) {
        console.log("Configurando botones del perfil")

        // Buscar botones por clase o por texto
        const profileButtons = document.querySelectorAll(
        ".profile-button, button:contains('Gestión de Pedidos'), button:contains('Historial de Productos'), button:contains('Agregar o modificar datos')",
        )

        if (profileButtons.length === 0) {
        console.log("No se encontraron botones del perfil por clase o texto. Buscando por IDs específicos...")

        // Intentar encontrar botones por IDs específicos
        const buttonIds = [
            "gestion-de-pedidos-boton-perfil",
            "historial-de-productos-boton-perfil",
            "agregar-o-modificar-datos-boton-perfil",
        ]

        buttonIds.forEach((id) => {
            const button = document.getElementById(id)
            if (button) {
            console.log(`Botón encontrado: ${id}`)
            button.removeEventListener("click", () => buttonClickHandler(id))
            button.addEventListener("click", () => buttonClickHandler(id))
            } else {
            console.log(`Botón no encontrado: ${id}`)
            }
        })

        // Buscar por texto dentro de los botones
        document.querySelectorAll("button").forEach((button) => {
            const buttonText = button.textContent.trim()
            let buttonId = null

            if (buttonText === "Gestión de Pedidos") {
            buttonId = "gestion-de-pedidos-boton-perfil"
            button.id = buttonId
            } else if (buttonText === "Historial de Productos") {
            buttonId = "historial-de-productos-boton-perfil"
            button.id = buttonId
            } else if (buttonText === "Agregar o modificar datos") {
            buttonId = "agregar-o-modificar-datos-boton-perfil"
            button.id = buttonId
            }

            if (buttonId) {
            console.log(`Asignando ID y evento a botón por texto: ${buttonText} -> ${buttonId}`)
            button.removeEventListener("click", () => buttonClickHandler(buttonId))
            button.addEventListener("click", () => buttonClickHandler(buttonId))
            }
        })
        } else {
        console.log(`Se encontraron ${profileButtons.length} botones del perfil`)

        // Asignar IDs y eventos a los botones encontrados
        profileButtons.forEach((button) => {
            const buttonText = button.textContent.trim()
            let buttonId = button.id

            if (!buttonId) {
            if (buttonText === "Gestión de Pedidos") {
                buttonId = "gestion-de-pedidos-boton-perfil"
            } else if (buttonText === "Historial de Productos") {
                buttonId = "historial-de-productos-boton-perfil"
            } else if (buttonText === "Agregar o modificar datos") {
                buttonId = "agregar-o-modificar-datos-boton-perfil"
            }

            if (buttonId) {
                button.id = buttonId
            }
            }

            if (buttonId) {
            console.log(`Configurando evento para botón: ${buttonId}`)
            button.removeEventListener("click", () => buttonClickHandler(buttonId))
            button.addEventListener("click", () => buttonClickHandler(buttonId))
            }
        })
        }

        // Agregar soporte para botones con data-section
        document.querySelectorAll("[data-section]").forEach((button) => {
        const sectionId = button.getAttribute("data-section")
        if (sectionId) {
            button.removeEventListener("click", () => buttonClickHandler(button.id || sectionId))
            button.addEventListener("click", () => buttonClickHandler(button.id || sectionId))
        }
        })
    }

    /**
     * Configura el formulario de modificación de datos
     * @param {Function} submitHandler - Manejador para el envío del formulario
     */
    setupDataForm(submitHandler) {
        const dataForm = document.getElementById("form-modificar-datos")
        if (dataForm) {
        dataForm.addEventListener("submit", (event) => {
            event.preventDefault()

            // Recopilar los datos del formulario
            const formData = {
            nombre_completo: dataForm.nombre_completo.value,
            correo: dataForm.correo.value,
            telefono: dataForm.telefono.value,
            direccion: dataForm.direccion.value,
            }

            submitHandler(formData)
        })
        }
    }
    }

    export default ProfileView
