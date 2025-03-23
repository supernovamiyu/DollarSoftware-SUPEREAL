
class Vista {
    constructor(){}

    /**
     *  Despliega el contenido de una plantilla en el destino correspondiente
     * @param {str} plantilla :id de la plantilla de origen
     * @param {str} destino :id de la etiqueta de destino
     */
    mostrarPlantilla(plantilla, destino){
        const template = document.getElementById(plantilla);
        const clone = document.importNode(template.content, true);
        const dest = document.getElementById(destino);
        if (template && dest) {
            dest.innerHTML="";
            dest.appendChild(clone);
            
            if (plantilla === "plantilla-inicio") {
                mostrarProductosDestacados();
            }
        }
    }
}


function mostrarProductosDestacados() {
    fetch('http://localhost:3000/products/destacados')
    .then (response => response.json())
    .then(data => {
        const productosDestacados = document.getElementById('productos-populares');
        productosDestacados.innerHTML = '';

        const productosLimitados = data.slice(0,4);

        const contenidoProductos = productosLimitados.map(producto => {
            return `
            <div>
                <img id="imagen-individual-producto" src="${producto.imagen_url}" alt="Imagen del producto" width="50%" height="auto" title="Ver los detalles del producto">
                <h3>${producto.nombre_producto}</h3>
                <p>Precio: <br> $${producto.precio}</p>
                <button class="comprar" onclick="agregarAlCarrito(${producto.id})" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Añadir al carrito</button>
            </div>
            `;
        }).join('');

        productosDestacados.innerHTML = contenidoProductos;
    })
    .catch(error => console.error('Error al obtener los productos: '. error));
};

// Llama a la función cuando la plantilla se carga o se actualiza
function mostrarPantallaCategoriasProductos(event) {
    const categoria = event.target.closest('button').getAttribute('data-categoria');
    mostrarProductos(categoria);
}

function actualizarURL(url) {
    window.history.pushState({}, "", url);
}

function mostrarProductos(categoria) {
    fetch(`http://localhost:3000/products/categoria/${categoria}`)
        .then(response => response.json())
        .then(data => {
            const plantillaProductos = document.getElementById('plantilla-categorias-productos').innerHTML;
            const contenido = document.getElementById('container-principal');
            contenido.innerHTML = plantillaProductos;

            const tituloCategoria = document.getElementById('titulo-seccion-categoria');
            const productosCategorias = document.getElementById('productos-categorias');
           // Limpiar contenido previo

            tituloCategoria.innerHTML = '';
            productosCategorias.innerHTML = ''; 

            if (data.message) {
                productosCategorias.innerHTML = `<p>${data.message}</p>`;
                return;
            }
            const nombreCategoria = data[0].nombre_categoria;

            tituloCategoria.innerHTML = `<h2 style="width: 100%; text-align: center">${nombreCategoria}</h2>`;

            const contenidoProductos = data.map(producto => {
                return `
                    <div>
                        <img id="imagen-individual-producto" src="${producto.imagen_url}" alt="${producto.nombre_producto}" width="50%" height="auto" title="Ver los detalles del producto">
                        <h3>${producto.nombre_producto}</h3>
                        <p>Precio: <br>$${producto.precio}</p>
                    <button class="comprar" onclick="agregarAlCarrito(${producto.id})" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}"data-id="${producto.id_productos}">Añadir al carrito</button>
                    </div>
                `;
            }).join('');

            productosCategorias.innerHTML += contenidoProductos;

            const url = `/categoria/${categoria}`;
            actualizarURL(url);
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

document.getElementById('boton-inicio').addEventListener('click', function() {
    actualizarURL('http://127.0.0.1:5501/index.html')
})

const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const container2 = document.getElementById('container-principal');

// Evento para el botón de búsqueda
searchButton.addEventListener('click', buscarProductos);

// Evento para la tecla Enter
searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscarProductos();
    }
});

function buscarProductos(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    const searchTerm = searchBar.value.trim().toLowerCase();
    if (searchTerm.length < 3) {
        alert('Por favor, ingrese al menos 3 caracteres');
        return;
    }

    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `http://localhost:3000/products/search/${encodedSearchTerm}`;

    // Actualizar la URL
    window.history.pushState({}, "", `/search?q=${encodedSearchTerm}`);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarResultadosDeBusqueda(data);
        })
        .catch(error => console.error('Error al buscar productos:', error));
}


function mostrarResultadosDeBusqueda(data) {
    const plantillaResultados = document.getElementById('plantilla-resultados-productos').innerHTML;
    container2.innerHTML = plantillaResultados;
    const resultadosProductos = document.getElementById('resultados-productos');
    resultadosProductos.innerHTML = '';

    if (data.message) {
        resultadosProductos.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const contenidoProductos = data.map(producto => {
        return `
            <div>
                <img id="imagen-individual-producto" src="${producto.imagen_url}" alt="${producto.nombre_producto}" width="50%" height="auto" title="Ver los detalles del producto">
                <h3>${producto.nombre_producto}</h3>
                <p>Precio: <br>$${producto.precio}</p>
                <button class="comprar" onclick="agregarAlCarrito(${producto.id})" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Añadir al carrito</button>
            </div>
        `;
    }).join('');

    resultadosProductos.innerHTML += contenidoProductos;
}


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