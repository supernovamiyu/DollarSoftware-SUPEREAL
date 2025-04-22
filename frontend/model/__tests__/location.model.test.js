import LocationModel from '../location.model'; // Asegúrate de ajustar la ruta según tu estructura

describe('LocationModel', () => {
    let model;

    beforeEach(() => {
        model = new LocationModel();
    });

    describe('getAllCities', () => {
        it('debería devolver todas las ciudades disponibles', () => {
            const result = model.getAllCities();
            expect(result).toEqual(['bogota', 'medellin', 'cali', 'barranquilla']);
        });

        it('el resultado debería ser un array', () => {
            const result = model.getAllCities();
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe('getZonesByCity', () => {
        it('debería devolver las zonas para una ciudad existente', () => {
            const result = model.getZonesByCity('bogota');
            expect(result).toEqual(['engativa', 'puente-aranda', 'usme']);
        });

        it('debería devolver un array vacío para una ciudad inexistente', () => {
            const result = model.getZonesByCity('ciudad-inexistente');
            expect(result).toEqual([]);
        });

        it('debería ser case sensitive', () => {
            const result = model.getZonesByCity('Bogota');
            expect(result).toEqual([]);
        });
    });

    describe('getStoresByCityAndZone', () => {
        it('debería devolver las tiendas para una ciudad y zona existentes', () => {
            const result = model.getStoresByCityAndZone('bogota', 'engativa');
            expect(result.length).toBe(2);
            expect(result[0]).toHaveProperty('nombre');
            expect(result[0]).toHaveProperty('direccion');
            expect(result[0]).toHaveProperty('horario');
            expect(result[0]).toHaveProperty('lat');
            expect(result[0]).toHaveProperty('lng');
        });

        it('debería devolver un array vacío para una ciudad inexistente', () => {
            const result = model.getStoresByCityAndZone('ciudad-inexistente', 'engativa');
            expect(result).toEqual([]);
        });

        it('debería devolver un array vacío para una zona inexistente', () => {
            const result = model.getStoresByCityAndZone('bogota', 'zona-inexistente');
            expect(result).toEqual([]);
        });

        it('debería devolver la estructura correcta de los objetos tienda', () => {
            const result = model.getStoresByCityAndZone('medellin', 'parque-berrio');
            expect(result[0]).toEqual({
                nombre: expect.any(String),
                direccion: expect.any(String),
                horario: expect.any(String),
                lat: expect.any(Number),
                lng: expect.any(Number)
            });
        });
    });

    describe('estructura de datos', () => {
        it('debería tener las ciudades correctas', () => {
            const cities = model.getAllCities();
            expect(cities).toContain('bogota');
            expect(cities).toContain('medellin');
            expect(cities).toContain('cali');
            expect(cities).toContain('barranquilla');
        });

        it('cada tienda debería tener las propiedades requeridas', () => {
            const allStores = [];
            const cities = model.getAllCities();

            cities.forEach(city => {
                const zones = model.getZonesByCity(city);
                zones.forEach(zone => {
                    const stores = model.getStoresByCityAndZone(city, zone);
                    allStores.push(...stores);
                });
            });

            allStores.forEach(store => {
                expect(store).toHaveProperty('nombre');
                expect(store).toHaveProperty('direccion');
                expect(store).toHaveProperty('horario');
                expect(store).toHaveProperty('lat');
                expect(store).toHaveProperty('lng');
            });
        });
    });
});