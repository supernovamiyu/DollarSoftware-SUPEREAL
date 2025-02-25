
let vista = null;

window.onload = function(){
    vista = new Vista();
    // Mostrar la página inicial
    vista.mostrarPlantilla("plantilla-inicio", "container-2")

}

function mostrarPantallaSesion(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-sesion", "container-2")
    
}

function mostrarPantallaCarrito(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-carrito", "container-2")
    
}

function mostrarPantallaInicio(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-inicio", "container-2")
}

function mostrarPantallaAtencionCliente(event){
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-atencion-cliente", "container-2")
}

function mostrarPantallaUbicacion(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-ubicacion", "container-2")
}