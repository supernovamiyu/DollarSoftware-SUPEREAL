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

        const productosLimitados = data.slice(0,3);

        const contenidoProductos = productosLimitados.map(producto => {
            return `
            <div>
                <img src="${producto.imagen_url}" alt="Imagen del producto" width="100%" height="auto">
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
            const contenido = document.getElementById('container-2');
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
                        <img src="${producto.imagen_url}" alt="${producto.nombre_producto}" width="100%" height="auto">
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

document.getElementById('boton-inicio').addEventListener('click', function() {
    actualizarURL('http://127.0.0.1:5500/index.html')
})

const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const container2 = document.getElementById('container-2');

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
                <img src="${producto.imagen_url}" alt="${producto.nombre_producto}" width="100%" height="auto">
                <h3>${producto.nombre_producto}</h3>
                <p>Precio: <br>$${producto.precio}</p>
                <button class="comprar" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Añadir al carrito</button>
            </div>
        `;
    }).join('');

    resultadosProductos.innerHTML += contenidoProductos;
}
