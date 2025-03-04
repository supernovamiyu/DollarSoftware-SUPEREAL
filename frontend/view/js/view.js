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
        }
    }
}

fetch('http://localhost:3000/products/')
    .then(response => response.json())
    .then(data => {
        const productosContenedor = document.getElementById('productos-populares');

        data.forEach(producto => {
            const productoHTML = `
        <div class="producto">
            <h3>${producto.nombre_producto}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="comprar" data-id="${producto.id_productos}" data-unidades-disponibles="${producto.unidades_disponibles}">Comprar</button>
        </div>
        `;

            productosContenedor.insertAdjacentHTML('beforeend', productoHTML);
        });

        // Agrega evento de clic a los botones de comprar
        const comprarBotones = document.querySelectorAll('.comprar');

        comprarBotones.forEach(boton => {
            boton.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                let unidadesDisponibles = parseInt(this.getAttribute('data-unidades-disponibles'));

                if (unidadesDisponibles > 0) {
                    // Actualiza el stock en el backend
                    fetch(`/products/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ unidades_disponibles: unidadesDisponibles - 1 })
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            // Actualiza el stock en la interfaz
                            unidadesDisponibles--;
                            this.setAttribute('data-unidades-disponibles', unidadesDisponibles);
                            const stockElement = this.parentNode.querySelector('p:nth-child(3)');
                            stockElement.textContent = `Stock: ${unidadesDisponibles}`;
                        });
                } else {
                    alert('No hay stock disponible para este producto.');
                }
            });
        });
    });

