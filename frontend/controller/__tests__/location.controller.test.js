// LocationController.test.js
import LocationController from '../location.controller'

describe('LocationController', () => {
    let controller;
    let mockModel;
    let mockView;

    // Configuración inicial antes de cada prueba
    beforeEach(() => {
        // Crear mocks para el modelo y la vista
        mockModel = {
            getZonesByCity: jest.fn(),
            getStoresByCityAndZone: jest.fn()
        };

        mockView = {
            showLocationPage: jest.fn(),
            setupLocationEvents: jest.fn(),
            updateZoneOptions: jest.fn(),
            showStores: jest.fn()
        };

        controller = new LocationController(mockModel, mockView);
    });

    describe('Constructor', () => {
        it('debería inicializar correctamente con modelo y vista', () => {
            expect(controller.model).toBe(mockModel);
            expect(controller.view).toBe(mockView);
        });
    });

    describe('showLocationPage', () => {
        it('debería llamar a showLocationPage de la vista y configurar eventos', () => {
            controller.showLocationPage();

            expect(mockView.showLocationPage).toHaveBeenCalled();
            expect(mockView.setupLocationEvents).toHaveBeenCalled();
        });
    });

    describe('setupLocationEvents', () => {
        it('debería configurar los eventos con los handlers correctos', () => {
            controller.setupLocationEvents();

            expect(mockView.setupLocationEvents).toHaveBeenCalledWith(
                expect.any(Function), // handler para cambio de ciudad
                expect.any(Function)  // handler para búsqueda de tiendas
            );
        });
    });

    describe('handleCityChange', () => {
        it('debería actualizar las opciones de zona cuando cambia la ciudad', () => {
            const mockEvent = {
                target: { value: 'Madrid' }
            };
            const mockZones = ['Centro', 'Chamartín', 'Salamanca'];

            mockModel.getZonesByCity.mockReturnValue(mockZones);

            controller.handleCityChange(mockEvent);

            expect(mockModel.getZonesByCity).toHaveBeenCalledWith('Madrid');
            expect(mockView.updateZoneOptions).toHaveBeenCalledWith(mockZones);
        });
    });

    describe('handleSearchStores', () => {
        beforeEach(() => {
            // Mock del DOM
            document.body.innerHTML = `
            <select id="ciudad" value="Barcelona">
                <option value="Barcelona">Barcelona</option>
            </select>
            <select id="zona" value="Eixample">
                <option value="Eixample">Eixample</option>
            </select>
        `;
        });

        it('debería buscar tiendas cuando se selecciona ciudad y zona', () => {
            const mockStores = [{ nombre: 'Tienda 1', direccion: 'Calle Ejemplo 123' }];
            mockModel.getStoresByCityAndZone.mockReturnValue(mockStores);

            controller.handleSearchStores();

            expect(mockModel.getStoresByCityAndZone).toHaveBeenCalledWith('Barcelona', 'Eixample');
            expect(mockView.showStores).toHaveBeenCalledWith(mockStores);
        });

        it('debería manejar el caso cuando no encuentra los selectores', () => {
            // Limpiar el DOM
            document.body.innerHTML = '';
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            controller.handleSearchStores();

            expect(consoleSpy).toHaveBeenCalledWith('No se encontraron los selectores de ciudad y zona');
            expect(mockModel.getStoresByCityAndZone).not.toHaveBeenCalled();
            expect(mockView.showStores).not.toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });
});