import BaseView from "./base.view.js"

/**
 * Vista para la sección de atención al cliente
 */
class CustomerSupportView extends BaseView {
    /**
     * Muestra la página principal de atención al cliente
     */
    showCustomerSupportPage() {
        if (this.showTemplate("plantilla-atencion-cliente", "container-principal")) {
            console.log("Página de atención al cliente mostrada correctamente")
            return true
        }
        return false
    }

    /**
     * Muestra el contenido específico de una sección de ayuda
     * @param {string} helpType - Tipo de ayuda
     */
    showHelpContent(helpType) {
        // Verificar que la plantilla de atención al cliente esté cargada
        if (!document.querySelector(".seccion-atencion-cliente")) {
            this.showCustomerSupportPage()
        }

        // Obtener el botón correspondiente a este tipo de ayuda
        const button = document.querySelector(`.boton-ayuda-individual[data-ayuda="${helpType}"]`)

        if (!button) {
            console.error(`No se encontró el botón para el tipo de ayuda: ${helpType}`)
            return false
        }

        // Simular clic en el botón para mostrar el contenido
        this.showHelpContentFromButton(button)

        return true
    }

    /**
     * Muestra el contenido de ayuda basado en un botón
     * @param {HTMLElement} button - Botón de ayuda
     */
    showHelpContentFromButton(button) {
        const helpType = button.getAttribute("data-ayuda")
        const helpTitle = button.querySelector(".texto-boton-ayuda-individual").textContent

        // Mostrar la plantilla de contenido de ayuda
        if (this.showTemplate("plantilla-contenido-boton-atencion-ayuda", "container-principal")) {
            // Establecer el título
            const titleElement = document.getElementById("titulo-del-aspecto-de-ayuda")
            if (titleElement) {
                titleElement.textContent = helpTitle
            }

            // Mostrar el contenido específico según el tipo de ayuda
            const contentContainer = document.querySelector(".contenido-aspecto-ayuda")
            if (contentContainer) {
                contentContainer.innerHTML = this.getHelpContentHTML(helpType)
            }

            return true
        }

        return false
    }

    /**
     * Obtiene el HTML para un tipo de ayuda específico
     * @param {string} helpType - Tipo de ayuda
     * @returns {string} HTML del contenido
     */
    getHelpContentHTML(helpType) {
        const helpContent = {
            "manejo-pagina": `
            <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    ¿Qué puedo encontrar en la sección superior de la página web de UltraCommerce?
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul>
                            <li><strong>Ubicación de Tiendas:</strong> En la barra de navegación está representado como un ícono de pin, en el cual el usuario puede seleccionar la ciudad y la zona que desea consultar, visualizando en un mapa las tiendas existentes.</li>
                            <li><strong>Audífonos:</strong> Utiliza la barra de búsqueda para encontrar productos rápidamente.</li>
                            <li><strong>Logo de la empresa:</strong> En este logo, se puede acceder a la página principal.</li>
                            <li><strong>Carrito:</strong> Allí, el usuario puede visualizar los productos que seleccionó para adquirir.</li>
                            <li><strong>Persona:</strong> Aquí, se podrá crear la cuenta UltraCommerce, para la gestión de sus productos y datos personales.</li>
                            <li><strong>Búsqueda:</strong> Aquí se podrá buscar el producto de su preferencia.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    ¿Qué puedo encontrar en la sección intermedia de la página web de UltraCommerce?
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul>
                            <li><strong>Caja de descuentos:</strong> Visualización en forma de imágenes de los descuentos y promociones disponibles de la empresa.</li>
                            <li><strong>Botones de categorías:</strong>  Se dividen todas las categorías de productos que tiene la tienda.</li>
                            <li><strong>Productos destacados: </strong>  Se muestra la selección de productos destacados, ya sea por selección hecha por el administrador o por su popularidad en ventas.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    ¿Qué puedo encontrar en la sección inferior de la página web de UltraCommerce?
                </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ul>
                            <li><strong>Información adicional:</strong> Se muestra toda la información relevante de la empresa.</li>
                        </ul>
                        <p>Para poder navegar entre cada una de estas secciones, basta con darle click al ícono de su preferencia y, posteriormente, se mostrará la información correspondiente.</p>
                    </div>
                </div>
            </div>
            </div>`,
            "gestion-pedidos": `
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            ¿Cómo puedo gestionar mis pedidos en la página web?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>Para gestionar los pedidos, la persona debe de disponer de una cuenta en la página web, la cual debe ser creada de la siguiente forma: </p>
                            <ol>
                                <li>La persona da clic en el ícono de la persona, el cual se encuentra ubicado en la parte superior derecha de la pantalla. </li>
                                <li>La página web pedirá al usuario registrarse o iniciar sesión. Si es su primera vez en la página web o no se ha registrado, haga clic en "Registrarse", de lo contrario, haga clic en "Iniciar sesión".</li>
                                <li>Cuando se encuentre en el registro, se solicitará al usuario su número de identificación, su correo electrónico y una contraseña de números y letras.</li>
                                <li>Después de ello, debe dar clic en "Registrarse" y el sistema automáticamente iniciará su sesión.</li>
                                <li>Al salir de la página web, por seguridad, se cerrará su sesión, por lo tanto, tendrá que iniciar sesión haciendo los pasos 1 y 2 y digitar su correo electrónico y su contraseña.</li>
                            </ol>
                            <p>Cuando usted inicia sesión, la página web lo redireccionará a la página de inicio. </p>
                            <p>Para gestionar sus pedidos, dé clic en el ícono de la persona. Se redireccionará a su apartado de gestion de perfil. <br> Allí, encontrará una sección llamada "Gestión de pedidos". Dar clic en la sección y tendrá acceso a todos los pedidos realizados y sus estados.</p>
                        </div>
                    </div>
                </div>
            </div>`,
            "navegacion-productos": `
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ¿Cómo puedo navegar a través de los productos?
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <p>Para navegar entre los productos, usted debe de seleccionar la categoría deseada que se encuentra abajo de la información de descuentos.<br> Después, en la página web, se mostrarán todos los productos disponibles.</p>
                        <p>También, en la barra de búsqueda de la página web, puede digitar el producto que desea encontrar, dar clic en la lupa y se visualizarán todos los resultados disponibles para ese producto.</p>
                        <p>Al hacer clic en uno de los productos, se mostrarán todas sus especificaciones, incluyendo precio, imágenes relacionadas al producto y sus reseñas.</p>
                        <p>Usted podrá agregar el producto al carrito, añadir las unidades deseadas o eliminar el producto o sus unidades del carrito.</p>
                        <p>Tenga en cuenta que usted podrá filtrar los resultados de los productos, para que pueda tener una mejor visualización del stock disponible.</p>
                        <p>Al añadir el producto al carrito, usted podrá dirigirse al carrito haciendo clic en el mismo atajo.</p>
                    </div>
                </div>
            </div>`,
            "cuenta-ultracommerce": `
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ¿Qué es la cuenta UltraCommerce?
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>La cuenta Ultra Commerce es fundamental para poder gestionar sus pedidos, el historial de productos vistos por usted en la página web. Para crear o iniciar sesión en su cuenta haga los siguientes pasos:</p>
                            <ol>
                                <li>La persona da clic en el ícono de la persona, el cual se encuentra ubicado en la parte superior derecha de la pantalla. </li>
                                <li>La página web pedirá al usuario registrarse o iniciar sesión. Si es su primera vez en la página web o no se ha registrado, haga clic en "Registrarse", de lo contrario, haga clic en "Iniciar sesión".</li>
                                <li>Cuando se encuentre en el registro, se solicitará al usuario su número de identificación, su correo electrónico y una contraseña de números y letras.</li>
                                <li>Después de ello, debe dar clic en "Registrarse" y el sistema automáticamente iniciará su sesión.</li>
                                <li>Al salir de la página web, por seguridad, se cerrará su sesión, por lo tanto, tendrá que iniciar sesión haciendo los pasos 1 y 2 y digitar su correo electrónico y su contraseña.</li>
                            </ol>
                            <p>Cuando usted inicia sesión, la página web lo redireccionará a la página de inicio. </p>
                            <p>Para acceder a la gestión de su perfil, haga clic en el ícono de la persona. Al hacer click, encontrará el historial de los productos vistos, la gestión de pedidos y agregar o modificar datos personales. En esta última, usted podrá modificar o agregar datos como su correo, su celular y su dirección, mediante un formulario. Cuando estos datos se hayan modificado, haga clic en "Confirmar".</p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Accordion Item #2
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Accordion Item #3
                    </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                    </div>
                </div>
            </div>`
        }

        return helpContent[helpType] || `<p>No hay información disponible para esta sección.</p>`
    }
}

export default CustomerSupportView
