// url.utils.test.js
import URLUtils from '../url.utils';

describe('URLUtils', () => {

    // Setup inicial para restablecer los mocks después de cada prueba
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('updateURL', () => {
        test('debe actualizar la URL y disparar un evento urlChanged', () => {
            // Mock para history.pushState
            const pushStateSpy = jest.spyOn(window.history, 'pushState').mockImplementation();

            // Mock para window.dispatchEvent
            const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation();

            const url = '/nueva-ruta';
            const state = { id: 123 };

            URLUtils.updateURL(url, state);

            // Verificamos que pushState fue llamado con los argumentos correctos
            expect(pushStateSpy).toHaveBeenCalledWith(state, "", url);

            // Verificamos que se disparó el evento urlChanged con los detalles correctos
            expect(dispatchEventSpy).toHaveBeenCalled();
            const eventArg = dispatchEventSpy.mock.calls[0][0];
            expect(eventArg instanceof CustomEvent).toBe(true);
            expect(eventArg.type).toBe('urlChanged');
            expect(eventArg.detail).toEqual({ url, state });
        });

        test('debe usar un objeto vacío como estado por defecto', () => {
            // Mock para history.pushState
            const pushStateSpy = jest.spyOn(window.history, 'pushState').mockImplementation();

            // Mock para window.dispatchEvent
            const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent').mockImplementation();

            const url = '/otra-ruta';

            URLUtils.updateURL(url);

            // Verificamos que pushState fue llamado con un objeto vacío como estado
            expect(pushStateSpy).toHaveBeenCalledWith({}, "", url);
        });
    });

    describe('getURLParams', () => {
        test('debe retornar un objeto vacío si no hay parámetros', () => {
            // Mock para window.location
            Object.defineProperty(window, 'location', {
                value: {
                    search: '',
                },
                writable: true
            });

            const result = URLUtils.getURLParams();
            expect(result).toEqual({});
        });

        test('debe parsear correctamente los parámetros de la URL', () => {
            // Mock para window.location con query string
            Object.defineProperty(window, 'location', {
                value: {
                    search: '?nombre=Juan&edad=30&ciudad=Madrid',
                },
                writable: true
            });

            const result = URLUtils.getURLParams();
            expect(result).toEqual({
                nombre: 'Juan',
                edad: '30',
                ciudad: 'Madrid'
            });
        });

        test('debe manejar correctamente los caracteres codificados', () => {
            // Mock para window.location con caracteres que necesitan ser decodificados
            Object.defineProperty(window, 'location', {
                value: {
                    search: '?nombre=Juan%20P%C3%A9rez&categoria=A%26B',
                },
                writable: true
            });

            const result = URLUtils.getURLParams();
            expect(result).toEqual({
                nombre: 'Juan Pérez',
                categoria: 'A&B'
            });
        });

        test('debe manejar parámetros sin valor', () => {
            Object.defineProperty(window, 'location', {
                value: {
                    search: '?flag=&name=test',
                },
                writable: true
            });

            const result = URLUtils.getURLParams();
            expect(result).toEqual({
                flag: '',
                name: 'test'
            });
        });
    });

    describe('getCurrentPath', () => {
        test('debe retornar la ruta actual del navegador', () => {
            // Mock para window.location
            Object.defineProperty(window, 'location', {
                value: {
                    pathname: '/productos/categoria/1',
                },
                writable: true
            });

            const result = URLUtils.getCurrentPath();
            expect(result).toBe('/productos/categoria/1');
        });

        test('debe retornar "/" para la ruta raíz', () => {
            // Mock para window.location
            Object.defineProperty(window, 'location', {
                value: {
                    pathname: '/',
                },
                writable: true
            });

            const result = URLUtils.getCurrentPath();
            expect(result).toBe('/');
        });
    });

    describe('setupPopStateHandler', () => {
        test('debe configurar un manejador para el evento popstate', () => {
            // Spy para addEventListener de window
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener').mockImplementation();

            const handler = jest.fn();
            URLUtils.setupPopStateHandler(handler);

            // Verificamos que addEventListener fue llamado con los argumentos correctos
            expect(addEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));

            // Simulamos la ejecución del callback
            const popstateCallback = addEventListenerSpy.mock.calls[0][1];
            const mockState = { page: 2 };
            popstateCallback({ state: mockState });

            // Verificamos que el handler fue llamado con el estado correcto
            expect(handler).toHaveBeenCalledWith(mockState);
        });
    });
});