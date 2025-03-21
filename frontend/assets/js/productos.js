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

