    // StoreController.js - Controlador para la ubicación de tiendas

    class StoreController {
        constructor(storeModel, storeView) {
        this.model = storeModel
        this.view = storeView
        this.map = null
        }
    
        // Mostrar el localizador de tiendas
        showStoreLocator() {
        console.log("StoreController: Mostrando localizador de tiendas")
    
        // Mostrar la plantilla
        const result = this.view.showStoreLocator()
    
        if (result) {
            // Inicializar el mapa
            setTimeout(() => {
            this.initializeMap()
            }, 100)
        }
        }
    
        // Inicializar el mapa y configurar eventos
        initializeMap() {
        console.log("StoreController: Inicializando mapa")
    
        // Inicializar el mapa
        this.map = this.view.initMap()
    
        if (!this.map) {
            console.error("No se pudo inicializar el mapa")
            return
        }
    
        // Configurar eventos
        this.setupEvents()
        }
    
        // Configurar eventos
        setupEvents() {
        console.log("StoreController: Configurando eventos")
    
        // Evento de cambio de ciudad
        const citySelect = document.querySelector("#ciudad")
        if (citySelect) {
            citySelect.addEventListener("change", (e) => {
            const city = e.target.value
            this.updateZones(city)
            })
    
            // Disparar el evento para cargar las zonas iniciales
            const event = new Event("change")
            citySelect.dispatchEvent(event)
        } else {
            console.error("No se encontró el selector de ciudad")
        }
    
        // Evento de envío del formulario
        const form = document.querySelector("#formulario-ubicacion")
        if (form) {
            form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.searchStores()
            })
        } else {
            console.error("No se encontró el formulario de ubicación")
        }
        }
    
        // Actualizar las zonas según la ciudad seleccionada
        updateZones(city) {
        console.log(`StoreController: Actualizando zonas para la ciudad ${city}`)
    
        const zones = this.model.getZones(city)
        this.view.updateZoneOptions(city, zones)
        }
    
        // Buscar tiendas según la ciudad y zona seleccionadas
        searchStores() {
        console.log("StoreController: Buscando tiendas")
    
        const citySelect = document.querySelector("#ciudad")
        const zoneSelect = document.querySelector("#zona")
    
        if (!citySelect || !zoneSelect) {
            console.error("No se encontraron los selectores de ciudad y zona")
            return
        }
    
        const city = citySelect.value
        const zone = zoneSelect.value
    
        console.log(`StoreController: Buscando tiendas en ${city}, zona ${zone}`)
    
        // Obtener las tiendas
        const stores = this.model.getStores(city, zone)
    
        // Mostrar las tiendas en el mapa y en la lista
        this.view.showStores(stores, this.map)
        }
    }
    
    export { StoreController }
    
  