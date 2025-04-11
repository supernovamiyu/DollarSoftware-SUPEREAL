    import BaseView from "./base.view.js"
    /**
     * Vista para la ubicación de tiendas
     */
    class LocationView extends BaseView {
        /**
       * Muestra la página de ubicación
       */
        showLocationPage() {
        if (this.showTemplate("plantilla-ubicacion", "container-principal")) {
          // Inicializar el mapa después de que la plantilla se haya cargado
            setTimeout(() => this.initMap(), 100)
        }
        }
    
        /**
       * Inicializa el mapa de ubicaciones
       */
        initMap() {
        // Verificar si el elemento del mapa existe
        const mapElement = document.getElementById("mapa")
        if (!mapElement) {
            console.error("No se encontró el elemento del mapa")
            return
        }
    
        // Verificar si ya hay un mapa inicializado
        if (this.map) {
            console.log("El mapa ya está inicializado")
            return
        }
    
        try {
          // Inicializar el mapa con Leaflet
            const map = L.map("mapa").setView([4.60971, -74.081749], 12)
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map)
    
          // Guardar la referencia del mapa para usarla más tarde
            this.map = map
        } catch (error) {
            console.error("Error al inicializar el mapa:", error)
        }
        }
    
        /**
       * Actualiza las opciones de zona según la ciudad seleccionada
       * @param {Array} zones - Lista de zonas disponibles
       */
        updateZoneOptions(zones) {
        const zoneSelect = document.getElementById("zona")
        if (!zoneSelect) {
            console.error("No se encontró el selector de zona")
            return
        }
    
        // Limpiar opciones anteriores
        zoneSelect.innerHTML = ""
    
        // Agregar nuevas opciones
        zones.forEach((zone) => {
            const option = document.createElement("option")
            option.value = zone
            option.textContent = this.formatZoneName(zone)
            zoneSelect.appendChild(option)
        })
        }
    
        /**
       * Formatea el nombre de la zona para mostrar
       * @param {string} zoneName - Nombre de la zona en formato kebab-case
       * @returns {string} - Nombre formateado
       */
        formatZoneName(zoneName) {
            return zoneName
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        }
        
        /**
         * Muestra las tiendas en el mapa y en la lista
         * @param {Array} stores - Lista de tiendas
         */
        showStores(stores) {
            if (!this.map) {
            console.error("El mapa no está inicializado")
            return
            }
        
            // Limpiar marcadores anteriores
            this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                this.map.removeLayer(layer)
            }
            })
        
            // Limpiar detalles anteriores
            const storesDetailsContainer = document.getElementById("detalles-tiendas")
            if (storesDetailsContainer) {
            storesDetailsContainer.innerHTML = ""
            }
        
            if (stores.length === 0) {
            this.showMessage("No hay tiendas disponibles en esta zona", "warning")
            return
            }
        
            // Agregar marcadores al mapa y mostrar detalles
            stores.forEach((store) => {
            // Crear marcador en el mapa
            L.marker([store.lat, store.lng])
                .addTo(this.map)
                .bindPopup(`<b>${store.nombre}</b><br>${store.direccion}<br>${store.horario}`)
        
            // Mostrar detalles en la página
            if (storesDetailsContainer) {
                const storeElement = document.createElement("div")
                storeElement.className = "tienda-ubicada"
                storeElement.innerHTML = `
                <i id="pin-ubicacion-tiendas" class="fa-solid fa-location-dot fa-xl"></i>
                <div class="textos-ubicacion-tiendas">
                    <h5 class="elemento-ubicacion-tiendas">${store.nombre}</h5>
                    <p class="elemento-ubicacion-tiendas">Dirección: ${store.direccion}</p>
                    <p class="elemento-ubicacion-tiendas">Horario: ${store.horario}</p>
                </div>
                `
                storesDetailsContainer.appendChild(storeElement)
            }
            })
        
            // Centrar el mapa en la primera tienda
            if (stores.length > 0) {
            this.map.setView([stores[0].lat, stores[0].lng], 15)
            }
        }
        
        /**
         * Configura los eventos para el formulario de ubicación
         * @param {Function} cityChangeHandler - Manejador para el cambio de ciudad
         * @param {Function} searchStoresHandler - Manejador para la búsqueda de tiendas
         */
        setupLocationEvents(cityChangeHandler, searchStoresHandler) {
            // Configurar evento de cambio de ciudad
            const citySelect = document.getElementById("ciudad")
            if (citySelect) {
            citySelect.addEventListener("change", cityChangeHandler)
            }
        
            // Configurar evento de búsqueda de tiendas
            const locationForm = document.getElementById("formulario-ubicacion")
            if (locationForm) {
            locationForm.addEventListener("submit", (event) => {
                event.preventDefault()
                searchStoresHandler()
            })
            }
        }
        }
        
        export default LocationView
        
        