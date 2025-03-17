// VISTA

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
                <img src="${producto.imagen_url}" alt="Imagen del producto" width="50%" height="auto">
                <h3>${producto.nombre_producto}</h3>
                <p>Precio: <br> $${producto.precio}</p>
                <button class="comprar" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Añadir al carrito</button>
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

            const tituloCategoria = document.querySelector('.titulo-seccion-categoria');
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
                        <img src="${producto.imagen_url}" alt="${producto.nombre_producto}" width="50%" height="auto">
                        <h3>${producto.nombre_producto}</h3>
                        <p>Precio: <br>$${producto.precio}</p>
                    <button class="comprar" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Añadir al carrito</button>
                    </div>
                `;
            }).join('');

            productosCategorias.innerHTML += contenidoProductos;

            const url = `/categoria/${categoria}`;
            actualizarURL(url);
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

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
                <img src="${producto.imagen_url}" alt="${producto.nombre_producto}" width="50%" height="auto">
                <h3>${producto.nombre_producto}</h3>
                <p>Precio: <br>$${producto.precio}</p>
                <button class="comprar" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Añadir al carrito</button>
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
                <p>Aquí encontrarás información sobre cómo manejar la página web.</p>
                <ul>
                    <li><strong>Navegación:</strong> Usa el menú principal para acceder a las diferentes secciones.</li>
                    <li><strong>Búsqueda:</strong> Utiliza la barra de búsqueda para encontrar productos rápidamente.</li>
                </ul>
            `
        },
        'gestion-pedidos': {
            titulo: 'Gestión de pedidos',
            contenido: `
                <p>Aquí encontrarás información sobre cómo gestionar tus pedidos.</p>
                <p>Puedes <a href="/mis-pedidos">ver el estado de tus pedidos</a> en cualquier momento.</p>
            `
        },
        'navegacion-productos': {
            titulo: 'Navegación por los productos',
            contenido: `
                <p>Aquí encontrarás información sobre cómo navegar por los productos.</p>
                <p>Usa los filtros para refinar tu búsqueda y encontrar lo que necesitas.</p>
            `
        },
        'cuenta-ultracommerce': {
            titulo: 'Cuenta UltraCommerce',
            contenido: `
                <p>Aquí encontrarás información sobre tu cuenta UltraCommerce.</p>
                <p>Accede a <a href="/mi-cuenta">tu cuenta</a> para gestionar tus datos y preferencias.</p>
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