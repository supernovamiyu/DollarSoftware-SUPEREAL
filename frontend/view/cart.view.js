// CartView.js - Maneja la renderización de la interfaz del carrito
export class CartView {
    constructor() {
        this.containerSelector = "#container-principal";
        this.cartTemplateSelector = "#plantilla-carrito";
        this.cartContainerSelector = "#contenedor-productos-carrito";
    }

    getContainer() {
        return document.querySelector(this.containerSelector);
    }

    renderCart(cartItems, total) {
        const container = this.getContainer();
        const template = document.querySelector(this.cartTemplateSelector);

        if (!container || !template) {
            console.error("Elementos DOM requeridos no encontrados");
            return;
        }

        // Clonar la plantilla
        const clone = template.content.cloneNode(true);
        container.innerHTML = "";
        container.appendChild(clone);

        const cartContainer = document.querySelector(this.cartContainerSelector);

        if (!cartContainer) {
            console.error("Contenedor del carrito no encontrado");
            return;
        }

        cartContainer.innerHTML = "";

        if (cartItems.length === 0) {
            cartContainer.innerHTML = "<p>¡No hay productos en el carrito!</p>";
            return;
        }

        // Renderizar cada producto
        cartItems.forEach(product => {
            cartContainer.innerHTML += this.renderProduct(product);
        });

        // Agregar el total
        cartContainer.innerHTML += this.renderTotal(total);
    }

    renderProduct(product) {
        const price = Number.parseFloat(product.precio);
        const subtotal = price * product.cantidad;

        return `
        <div class="contenedor-producto-unico-carrito">
            <div class="producto-individual-carrito">
            <img class="imagen-producto-individual-carrito" src="${product.imagen_url}" alt="${product.nombre_producto}">
            <div class="informacion-producto-carrito">
                <h3 class="nombre-producto-en-el-carrito">${product.nombre_producto}</h3>
                <div class="botones-productos-carrito-compras">
                <button class="actualizar-cantidad-producto-carrito" data-action="decrease" data-id="${product.id_productos}">-</button>
                <span class="cantidad-producto-individual-carrito">${product.cantidad}</span>
                <button class="actualizar-cantidad-producto-carrito" data-action="increase" data-id="${product.id_productos}">+</button>
                </div>
                <p class="precio-unitario-producto-carrito">Precio unitario: $${isNaN(price) ? 0 : price.toLocaleString()}</p>
            </div>
            </div>
            <div class="contenedor-subtotal-eliminar-producto">
            <p class="subtotal-producto-carrito">$${isNaN(subtotal) ? 0 : subtotal.toLocaleString()}</p>
            <button class="eliminar-producto-individual-carrito" data-action="remove" data-id="${product.id_productos}">Eliminar</button>
            </div>
        </div>
        `;
    }

    renderTotal(total) {
        return `
        <div class="contenedor-total-compra-carrito">
            <h3 class="titulo-total-compra-carrito">Total:</h3>
            <p class="total-compra-del-carrito">$${total.toLocaleString()}</p>
        </div>
        <div class="contenedor-boton-proceder-al-pago">
            <button class="boton-proceder-al-pago" data-action="checkout">Proceder al pago</button>
        </div>
        `;
    }

    showMessage(message, type = "info") {
        // Implementación de visualización de mensajes
        alert(message); // Implementación simple, reemplazar con una mejor UI
    }

    setupEventListeners(handlers) {
        const container = this.getContainer();

        if (!container) return;

        // Delegación de eventos para acciones del carrito
        container.addEventListener('click', (event) => {
            const target = event.target;
            const action = target.getAttribute('data-action');
            const id = target.getAttribute('data-id');

            if (!action) return;

            switch (action) {
                case 'increase':
                    if (handlers.updateQuantity && id) {
                        const currentQuantity = parseInt(target.parentElement.querySelector('.cantidad-producto-individual-carrito').textContent);
                        handlers.updateQuantity(id, currentQuantity + 1);
                    }
                    break;
                case 'decrease':
                    if (handlers.updateQuantity && id) {
                        const currentQuantity = parseInt(target.parentElement.querySelector('.cantidad-producto-individual-carrito').textContent);
                        handlers.updateQuantity(id, currentQuantity - 1);
                    }
                    break;
                case 'remove':
                    if (handlers.removeProduct && id) {
                        handlers.removeProduct(id);
                    }
                    break;
                case 'checkout':
                    if (handlers.checkout) {
                        handlers.checkout();
                    }
                    break;
            }
        });
    }
}