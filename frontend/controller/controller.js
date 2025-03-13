
let vista = null;

window.onload = function(){
    vista = new Vista();
    // Mostrar la página inicial
    vista.mostrarPlantilla("plantilla-inicio", "container-principal")

}

function mostrarPantallaSesion(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-sesion", "container-principal")
    
}

function mostrarPantallaCarrito(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-carrito", "container-principal")
    
}

function mostrarPantallaInicio(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-inicio", "container-principal")
}

function mostrarPantallaAtencionCliente(event){
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-atencion-cliente", "container-principal")
}

function mostrarPantallaUbicacion(event) {
    event.preventDefault();
    vista.mostrarPlantilla("plantilla-ubicacion", "container-principal")
}
