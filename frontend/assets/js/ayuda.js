 // Función para mostrar los detalles de cada aspecto de ayuda
function mostrarDetallesAyuda(tipoAyuda) {
    const contenedorPrincipal = document.getElementById('container-principal');
    const templateAyuda = document.getElementById('plantilla-contenido-boton-atencion-ayuda');

    if (!templateAyuda || !contenedorPrincipal) {
        console.error("No se encontró el template o el contenedor principal.");
        return;
    }

    const contenidoAyuda = document.importNode(templateAyuda.content, true);

    const tituloAyuda = contenidoAyuda.querySelector('#titulo-del-aspecto-de-ayuda'); // Ahora es un <h4>
    const contenido = contenidoAyuda.querySelector('.contenido-aspecto-ayuda');

    if (!tituloAyuda || !contenido) {
        console.error("No se encontraron los elementos esperados en el template.");
        return;
    }

    const detallesAyuda = {
        'manejo-pagina': {
            titulo: 'Manejo de la página web',
            contenido: `
                <p>La página web cuenta con varios componentes:</p>
                <p><strong>Menú de Navegación</strong></p>
                <ul>
                    <li><strong>Ubicación de Tiendas:</strong> En la barra de navegación está representado como un ícono de pin, en el cual el usuario puede seleccionar la ciudad y la zona que desea consultar, visualizando en un mapa las tiendas existentes.</li>
                    <li><strong>Audífonos:</strong> Utiliza la barra de búsqueda para encontrar productos rápidamente.</li>
                    <li><strong>Logo de la empresa:</strong> En este logo, se puede acceder a la página principal.</li>
                    <li><strong>Carrito:</strong> Allí, el usuario puede visualizar los productos que seleccionó para adquirir.</li>
                    <li><strong>Persona:</strong> Aquí, se podrá crear la cuenta UltraCommerce, para la gestión de sus productos y datos personales.</li>
                    <li><strong>Búsqueda:</strong> Aquí se podrá buscar el producto de su preferencia.</li>
                </ul>
                <p><strong>Sección Intermedia</strong></p>
                <ul>
                    <li><strong>Caja de descuentos:</strong> Visualización en forma de imágenes de los descuentos y promociones disponibles de la empresa.</li>
                    <li><strong>Botones de categorías:</strong>  Se dividen todas las categorías de productos que tiene la tienda.</li>
                    <li><strong>Productos destacados: </strong>  Se muestra la selección de productos destacados, ya sea por selección hecha por el administrador o por su popularidad en ventas.</li>
                </ul>
                <p><strong>Sección Inferior</strong></p>
                <ul>
                    <li><strong>Información adicional:</strong> Se muestra toda la información relevante de la empresa.</li>
                </ul>
                <p>Para poder navegar entre cada una de estas secciones, basta con darle click al ícono de su preferencia y, posteriormente, se mostrará la información correspondiente.</p>
            `
        },
        'gestion-pedidos': {
            titulo: 'Gestión de pedidos',
            contenido: `
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
            `
        },
        'navegacion-productos': {
            titulo: 'Navegación por los productos',
            contenido: `
            <p>Para navegar entre los productos, usted debe de seleccionar la categoría deseada que se encuentra abajo de la información de descuentos.<br> Después, en la página web, se mostrarán todos los productos disponibles.</p>
            <p>También, en la barra de búsqueda de la página web, puede digitar el producto que desea encontrar, dar clic en la lupa y se visualizarán todos los resultados disponibles para ese producto.</p>
            <p>Al hacer clic en uno de los productos, se mostrarán todas sus especificaciones, incluyendo precio, imágenes relacionadas al producto y sus reseñas.</p>
            <p>Usted podrá agregar el producto al carrito, añadir las unidades deseadas o eliminar el producto o sus unidades del carrito.</p>
            <p>Tenga en cuenta que usted podrá filtrar los resultados de los productos, para que pueda tener una mejor visualización del stock disponible.</p>
            <p>Al añadir el producto al carrito, usted podrá dirigirse al carrito haciendo clic en el mismo atajo.</p>
            `
        },
        'cuenta-ultracommerce': {
            titulo: 'Cuenta UltraCommerce',
            contenido: `
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
            `
        }
    };

    const ayudaSeleccionada = detallesAyuda[tipoAyuda] || {
        titulo: 'Ayuda no disponible',
        contenido: '<p>Lo sentimos, no hay información disponible para este aspecto de ayuda.</p>'
    };

    tituloAyuda.textContent = ayudaSeleccionada.titulo; // El título ahora es un <h4>
    contenido.innerHTML = ayudaSeleccionada.contenido;

    contenedorPrincipal.innerHTML = '';
    contenedorPrincipal.appendChild(contenidoAyuda);

    // Actualizar la URL con el tipo de ayuda seleccionado
    const nuevaURL = `/atencion-cliente/${tipoAyuda}`;
    window.history.pushState({}, "", nuevaURL);
}