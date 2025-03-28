let vista = null;

window.onload = function () {
    vista = new Vista();
    vista.mostrarPlantilla("plantilla-inicio", "container-principal");
};

function mostrarPantallaInicio(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-inicio", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaSesion(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-sesion-registro", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaCarrito(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-carrito", "container-principal");
        
        // Disparar un evento personalizado para notificar que la plantilla del carrito se ha cargado
        const eventoCarritoCargado = new CustomEvent('carritoCargado');
        document.dispatchEvent(eventoCarritoCargado);
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaInicio(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-inicio", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaAtencionCliente(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-atencion-cliente", "container-principal");

        // Actualizar la URL
        const nuevaURL = "/atencion-cliente";
        window.history.pushState({}, "", nuevaURL);

        // Agregar event listeners a los botones de ayuda
        const botonesAyuda = document.querySelectorAll('.boton-ayuda-individual');
        botonesAyuda.forEach(boton => {
            boton.addEventListener('click', function() {
                const tipoAyuda = this.getAttribute('data-ayuda');
                mostrarDetallesAyuda(tipoAyuda);
            });
        });
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaUbicacion(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-ubicacion", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaInicioSesion(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-iniciar-sesion", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaRegistro(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-registro", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}