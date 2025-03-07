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

// function cargarProductos() {
//     fetch('http://localhost:3000/products/')
//         .then(response => response.json())
//         .then(data => {
//             const productosContenedor = document.getElementById('productos-populares');
            
//             productosContenedor.innerHTML = '';

//             data.forEach(producto => {
//                 const productoHTML = `
//             <div>
//                 <img src="${producto.imagen_url}" alt="Imagen del producto" width="100%" height="auto">
//                 <h3>${producto.nombre_producto}</h3>
//                 <p>Precio: $${producto.precio}</p>
//                 <button class="comprar" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Añadir al carrito</button>
//             </div>
//             `;
    
//                 productosContenedor.insertAdjacentHTML('beforeend', productoHTML);
//             });
    
//             // Agrega evento de clic a los botones de comprar
//             const comprarBotones = document.querySelectorAll('.comprar');
    
//             comprarBotones.forEach(boton => {
//                 boton.addEventListener('click', function () {
//                     const id = this.getAttribute('data-id');
//                     let unidadesDisponibles = parseInt(this.getAttribute('data-unidades-disponibles'));
    
//                     if (unidadesDisponibles > 0) {
//                         // Actualiza el stock en el backend
//                         fetch(`/products/${id}`, {
//                             method: 'PUT',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body: JSON.stringify({ unidades_disponibles: unidadesDisponibles - 1 })
//                         })
//                             .then(response => response.json())
//                             .then(data => {
//                                 console.log(data);
//                                 // Actualiza el stock en la interfaz
//                                 unidadesDisponibles--;
//                                 this.setAttribute('data-unidades-disponibles', unidadesDisponibles);
//                                 const stockElement = this.parentNode.querySelector('p:nth-child(2)');
//                                 stockElement.textContent = `Stock: ${unidadesDisponibles}`;
//                             });
//                     } else {
//                         alert('No hay stock disponible para este producto.');
//                     }
//                 });
//             });
//         })
//         .catch(error => console.error('Error:', error));
// }

// Llama a la función cuando la plantilla se carga o se actualiza
function mostrarPantallaCategoriasProductos(event) {
    const categoria = event.target.closest('button').getAttribute('data-categoria');
    mostrarProductos(categoria);
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
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

