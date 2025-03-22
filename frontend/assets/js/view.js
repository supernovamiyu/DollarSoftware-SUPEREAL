
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
