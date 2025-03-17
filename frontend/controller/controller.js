let vista = null;

window.onload = function () {
    vista = new Vista();

    // Verificar la URL inicial
    const rutaActual = window.location.pathname;
    if (rutaActual === "/index.html" || rutaActual === "/") {
        // Redirigir a /inicio
        const nuevaURL = "/inicio";
        window.history.replaceState({}, "", nuevaURL);
    }

    // Mostrar la página inicial
    vista.mostrarPlantilla("plantilla-inicio", "container-principal");
};

function mostrarPantallaInicio(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-inicio", "container-principal");

        // Actualizar la URL
        const nuevaURL = "/inicio";
        window.history.pushState({}, "", nuevaURL);
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaSesion(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-sesion", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}

function mostrarPantallaCarrito(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-carrito", "container-principal");
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

window.addEventListener('popstate', function(event) {
    const rutaActual = window.location.pathname;

    if (rutaActual === "/inicio") {
        mostrarPantallaInicio(event);
    } else if (rutaActual === "/atencion-cliente") {
        mostrarPantallaAtencionCliente(event);
    }
});

function mostrarPantallaUbicacion(event) {
    event.preventDefault();
    if (vista) {
        vista.mostrarPlantilla("plantilla-ubicacion", "container-principal");
    } else {
        console.error("vista no está inicializado.");
    }
}

