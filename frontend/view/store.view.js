    // StoreView.js - Vista para la ubicación de tiendas
    import { BaseView } from "./BaseView.js";
    import L from "leaflet"; // Import Leaflet library

    class StoreView extends BaseView {
    constructor() {
        super();
    }

    // Mostrar la pantalla de ubicación de tiendas
    showStoreLocator() {
        const result = this.showTemplate(
        "plantilla-ubicacion",
        "container-principal"
        );
        return result;
    }

    // Inicializar el mapa
    initMap(defaultLat = 4.60971, defaultLng = -74.081749, defaultZoom = 12) {
        // Verificar si el mapa ya existe
        if (window.storeMap) {
        window.storeMap.remove();
        }

        // Crear el mapa
        const map = L.map("mapa").setView([defaultLat, defaultLng], defaultZoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Guardar referencia global al mapa
        window.storeMap = map;

        return map;
    }

    // Actualizar las opciones de zona según la ciudad seleccionada
    updateZoneOptions(city, zones) {
        const zoneSelect = document.querySelector("#zona");
        if (!zoneSelect) return false;

        // Limpiar opciones anteriores
        zoneSelect.innerHTML = "";

        // Agregar nuevas opciones según la ciudad
        zones.forEach((zone) => {
        const option = document.createElement("option");
        option.value = zone;
        option.textContent = this.formatZoneName(zone);
        zoneSelect.appendChild(option);
        });

        return true;
    }

    // Formatear el nombre de la zona para mostrar
    formatZoneName(zoneName) {
        // Convertir guiones a espacios y capitalizar cada palabra
        return zoneName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // Mostrar tiendas en el mapa y en la lista
    showStores(stores, map) {
        if (!map) return false;

        // Limpiar marcadores anteriores
        map.eachLayer((layer) => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
        });

        // Limpiar detalles anteriores
        const detailsDiv = document.querySelector("#detalles-tiendas");
        if (!detailsDiv) return false;

        detailsDiv.innerHTML = "";

        // Si no hay tiendas
        if (!stores || stores.length === 0) {
        detailsDiv.innerHTML = "<p>No hay tiendas disponibles en esta zona.</p>";
        return true;
        }

        // Agregar marcadores al mapa y mostrar detalles
        stores.forEach((store) => {
        // Crear marcador en el mapa
        L.marker([store.lat, store.lng])
            .addTo(map)
            .bindPopup(
            `<b>${store.nombre}</b><br>${store.direccion}<br>${store.horario}`
            );

        // Mostrar detalles en la página
        const storeHTML = `
            <div class="tienda-ubicada">
            <i id="pin-ubicacion-tiendas" class="fa-solid fa-location-dot fa-xl"></i>
            <div class="textos-ubicacion-tiendas">
                <h5 class="elemento-ubicacion-tiendas">${store.nombre}</h5>
                <p class="elemento-ubicacion-tiendas">Dirección: ${store.direccion}</p>
                <p class="elemento-ubicacion-tiendas">Horario: ${store.horario}</p>
            </div>
            </div>
        `;
        detailsDiv.insertAdjacentHTML("beforeend", storeHTML);
        });

        // Centrar el mapa en la primera tienda
        if (stores.length > 0) {
        map.setView([stores[0].lat, stores[0].lng], 15);
        }

        return true;
    }
    }

    export { StoreView };
