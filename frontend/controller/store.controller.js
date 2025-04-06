    // StoreController.js - Controlador para la ubicación de tiendas

    class StoreController {
        constructor(storeModel, storeView) {
        this.model = storeModel
        this.view = storeView
        this.map = null
        }
    
        // Mostrar el localizador de tiendas
        showStoreLocator() {
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
        }
    
        // Evento de envío del formulario
        const form = document.querySelector("#formulario-ubicacion")
        if (form) {
            form.addEventListener("submit", (e) => {
            e.preventDefault()
            this.searchStores()
            })
        }
        }
    
        // Actualizar las zonas según la ciudad seleccionada
        updateZones(city) {
        const zones = this.model.getZones(city)
        this.view.updateZoneOptions(city, zones)
        }
    
        // Buscar tiendas según la ciudad y zona seleccionadas
        searchStores() {
        const citySelect = document.querySelector("#ciudad")
        const zoneSelect = document.querySelector("#zona")
    
        if (!citySelect || !zoneSelect) {
            console.error("No se encontraron los selectores de ciudad y zona")
            return
        }
    
        const city = citySelect.value
        const zone = zoneSelect.value
    
        // Obtener las tiendas
        const stores = this.model.getStores(city, zone)
    
        // Mostrar las tiendas en el mapa y en la lista
        this.view.showStores(stores, this.map)
        }
    }
    
    export { StoreController }
    
