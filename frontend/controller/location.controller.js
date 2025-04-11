    /**
     * Controlador para la ubicación de tiendas
     */
    class LocationController {
        /**
         * @param {Object} model - Modelo de ubicación
         * @param {Object} view - Vista de ubicación
         */
        constructor(model, view) {
        this.model = model
        this.view = view
        }
    
        /**
         * Muestra la página de ubicación
         */
        showLocationPage() {
        this.view.showLocationPage()
        this.setupLocationEvents()
        }
    
        /**
         * Configura los eventos para la página de ubicación
         */
        setupLocationEvents() {
        this.view.setupLocationEvents(
            (event) => this.handleCityChange(event),
            () => this.handleSearchStores(),
        )
        }
    
        /**
         * Maneja el cambio de ciudad
         * @param {Event} event - Evento de cambio
         */
        handleCityChange(event) {
        const city = event.target.value
        const zones = this.model.getZonesByCity(city)
        this.view.updateZoneOptions(zones)
        }
    
        /**
         * Maneja la búsqueda de tiendas
         */
        handleSearchStores() {
        const citySelect = document.getElementById("ciudad")
        const zoneSelect = document.getElementById("zona")
    
        if (!citySelect || !zoneSelect) {
            console.error("No se encontraron los selectores de ciudad y zona")
            return
        }
    
        const city = citySelect.value
        const zone = zoneSelect.value
    
        const stores = this.model.getStoresByCityAndZone(city, zone)
        this.view.showStores(stores)
        }
    }
    
    export default LocationController
    
    