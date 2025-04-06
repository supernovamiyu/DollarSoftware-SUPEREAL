    /**
     * Modelo para manejar los datos y la lógica de negocio relacionada con las ubicaciones de tiendas
     */
    class LocationModel {
        constructor() {
        // Datos ficticios de las tiendas
        this.stores = {
            bogota: {
            engativa: [
                {
                nombre: "Sucursal #1 - Parque Simón Bolívar",
                direccion: "Calle Falsa #123",
                horario: "9 AM - 6 PM",
                lat: 4.657,
                lng: -74.093,
                },
                {
                nombre: "Sucursal #2 - Parque San Andrés",
                direccion: "Carrera Verdadera #456",
                horario: "10 AM - 7 PM",
                lat: 4.712934,
                lng: -74.112192,
                },
            ],
            "puente-aranda": [
                {
                nombre: "Sucursal #3 - C.C. Plaza Central",
                direccion: "Calle Dorada #789",
                horario: "8 AM - 5 PM",
                lat: 4.630062,
                lng: -74.116559,
                },
            ],
            usme: [
                {
                nombre: "Outlet #1 - C.C. Altavista",
                direccion: "Calle Dorada #209",
                horario: "10 AM - 6 PM",
                lat: 4.532279,
                lng: -74.11817,
                },
            ],
            },
            medellin: {
            "parque-berrio": [
                {
                nombre: "Outlet #2 - Barrio Candelaria",
                direccion: "Calle Medellín #321",
                horario: "9 AM - 6 PM",
                lat: 6.247,
                lng: -75.563,
                },
            ],
            "museo-de-antioquia": [
                {
                nombre: "Sucursal #1 - Museo de Antioquia",
                direccion: "Carrera Antioquia #654",
                horario: "10 AM - 7 PM",
                lat: 6.251,
                lng: -75.565,
                },
            ],
            },
            cali: {
            "parque-del-gato": [
                {
                nombre: "Sucursal #1 - Parque del Gato",
                direccion: "Calle Cali #901",
                horario: "9 AM - 6 PM",
                lat: 3.420556,
                lng: -76.522222,
                },
                {
                nombre: "Sucursal #2 - Barrio El Peñón",
                direccion: "Carrera Cali #111",
                horario: "10 AM - 7 PM",
                lat: 3.421111,
                lng: -76.523333,
                },
            ],
            "museo-de-la-caña-de-azucar": [
                {
                nombre: "Outlet #3 - Museo de la Caña de Azucar",
                direccion: "Calle Museo #456",
                horario: "8 AM - 5 PM",
                lat: 3.6232,
                lng: -76.226476,
                },
            ],
            },
            barranquilla: {
            "parque-fernando-villa": [
                {
                nombre: "Outlet #4 - Parque Fernando Villa",
                direccion: "Calle Barranquilla #789",
                horario: "9 AM - 6 PM",
                lat: 10.966667,
                lng: -74.783333,
                },
            ],
            "museo-del-caribe": [
                {
                nombre: "Sucursal #1 - Museo del Caribe",
                direccion: "Calle Museo #654",
                horario: "8 AM - 5 PM",
                lat: 10.968333,
                lng: -74.785555,
                },
            ],
            },
        }
        }
    
        /**
         * Obtiene las zonas disponibles para una ciudad
         * @param {string} city - Ciudad
         * @returns {Array} - Lista de zonas disponibles
         */
        getZonesByCity(city) {
        if (!this.stores[city]) {
            return []
        }
    
        return Object.keys(this.stores[city])
        }
    
        /**
         * Obtiene las tiendas por ciudad y zona
         * @param {string} city - Ciudad
         * @param {string} zone - Zona
         * @returns {Array} - Lista de tiendas
         */
        getStoresByCityAndZone(city, zone) {
        if (!this.stores[city] || !this.stores[city][zone]) {
            return []
        }
    
        return this.stores[city][zone]
        }
    
        /**
         * Obtiene todas las ciudades disponibles
         * @returns {Array} - Lista de ciudades
         */
        getAllCities() {
        return Object.keys(this.stores)
        }
    }
    
    export default LocationModel
    
    